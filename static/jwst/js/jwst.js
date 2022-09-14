window.onload = () => {
    let jwst = new JWSTTelescope();
    jwst.init();
}

class JWSTTelescope {
    constructor() {

        this.jwstDisplay = document.getElementById('jwstDisplay');
        this.jwstCurrent = document.getElementsByClassName('jwst-side-info');
        this.jwstLoad = document.getElementById('jwstLoad');
        this.targetTitle = document.getElementById('targetTitle');
        this.timeTitles = document.getElementById('timeTitles');
        this.targetName = document.getElementById('targetName');
        this.iterateTarget = document.getElementById('iterateTarget');
        this.startTimeTimes = document.getElementById('startTimeTimes');
        this.categoryKeywords = document.getElementById('categoryKeywords');
        this.instruments = document.getElementById('instruments');
        this.a = 25;
        this.longD = 2 * this.a;
        this.shortD = Math.sqrt(3) * this.a;
        this.halfA = this.a / 2;
        this.scrollTarget;
        this.targetNode;

        this.buildJWST();
    }


    init() {
        let url = `${window.location.href}fetch`;
        this.fetchData(url);
    }

    fetchData(url) {
        this.toggleLoad(1);
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        }).then(data => {
            data = data.slice(-100);
            this.buildTable(data);
            setInterval(this.determineTarget.bind(this, data), 500);
            this.toggleLoad(0);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
            this.toggleLoad(0);
        });
    }

    buildJWST() {
        let svg = document.getElementById('jwstSVG');
        let startX = 100;
        let startY = 1;
        let ppa = [[startX, startY], [startX - this.halfA, startY + (this.shortD / 2)], [startX, startY + this.shortD], [startX + this.a, startY + this.shortD], [startX + (1.5 * this.a), startY + this.a], [startX + this.a, startY]];
        for (let i = 0; i < 19; i++) {
            let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            let diffX;
            let diffY;
            for (let value of ppa) {
                let point = svg.createSVGPoint();
                switch (i) {
                    case 0:
                    case 1:
                    case 2:
                        diffY = i * this.shortD;
                        diffX = 2 * (this.a + this.halfA); // 78;
                        point.y = value[1] + 42 + diffY;
                        break;
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        diffY = (i - 3) * this.shortD;
                        diffX = this.a + this.halfA; // 39
                        point.y = value[1] + 21 + diffY;
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        diffY = (i - 7) * this.shortD;
                        diffX = 0;
                        point.y = value[1] + diffY;
                        break;
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        diffY = (i - 12) * this.shortD;
                        diffX = -(this.a + this.halfA); // -39;
                        point.y = value[1] + 21 + diffY;
                        break;
                    case 16:
                    case 17:
                    case 18:
                        diffY = (i - 16) * this.shortD;
                        diffX = -2 * (this.a + this.halfA); // -78;
                        point.y = value[1] + 42 + diffY;
                        break;
                }
                point.x = value[0] - diffX;
                poly.points.appendItem(point);
            }
            poly.id = `tile${i}`;
            if (i == 9) {
                poly.style.fill = 'transparent';
            } else {
                poly.style.fill = 'gold';
            }
            poly.style.stroke = 'black';
            poly.style.strokeWidth = 3;
            svg.append(poly);
            if (window.matchMedia('(min-device-width: 600px)').matches) {
                svg.setAttribute('width', '250');
                svg.setAttribute('height', '250');
            }

        }
        document.getElementById('jwstIcon').addEventListener('click', this.scrolls);
    }

    toggleLoad(load) {
        let jwst;
        if (load) {
            for (let i = 0; i < this.jwstCurrent.length; i++) {
                this.jwstCurrent[i].style.visibility = 'hidden';
            }

            jwst = setInterval(function () {
                let i = Math.floor(Math.random() * 20);
                let tile = document.getElementById(`tile${i}`);
                if (tile) {
                    tile.classList = 'current';
                }
            }, 250);
            setTimeout(function () { clearInterval(jwst); }, 6000);
        } else {
            for (let i = 0; i < this.jwstCurrent.length; i++) {
                this.jwstCurrent[i].style.visibility = 'visible';
            }
            for (let x = 0; x < 20; x++) {
                let tile = document.getElementById(`tile${x}`);
                if (tile) {
                    tile.classList = '';
                }
            }
        }
    }

    scrolls() {
        let s = document.getElementsByClassName('scrollToItem');
        // console.log(s);
        if (s && s.length == 1) {
            s[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }

    async determineTarget(data) {
        let now = Date.now();
        let loop = true;
        let i = 0;
        let target;
        // https://stackoverflow.com/questions/34846814/correct-way-to-break-out-of-if-statement-within-for-loop
        while (loop && i < data.length) {
            let dur;
            let t = data[i];
            if (t['SCHEDULED START TIME']) {
                let dayDiff = t['DURATION'].split("/");
                if (dayDiff[1]) {
                    let dayInDiff = dayDiff[1].split(":");
                    dur = ((dayDiff[0] * 24 * 3600) + (dayInDiff[0] * 3600) + (dayInDiff[1] * 60) + (dayInDiff[2])) * 10;
                }
                let startTime = new Date(t['SCHEDULED START TIME']);
                let newTime = (startTime.getTime() + dur);
                let endTime = new Date(newTime);
                if ((now > startTime && now < endTime) || (now < startTime && now < endTime)) {
                    target = t
                    this.targetNode = i;
                    this.scrollTarget = t;
                    loop = false;
                } else {
                    i++;
                }
            }
        }
        this.buildTargetDisplay(target, now);
        this.formatTable(data, target, now);
    }

    buildTable(data) {
        data.forEach((d, idx) => {
            let item = document.createElement('div');
            item.classList = 'item';
            let times = document.createElement('div');
            times.classList = 'times';
            let timesDuration = document.createElement('div');
            timesDuration.className = 'duration';
            timesDuration.innerText = this.generateDurationString(d['DURATION']);
            let tStart = new Date(d['SCHEDULED START TIME']);
            let dateStart = document.createElement('div');
            dateStart.innerText = tStart.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
            dateStart.className = 'date-start';
            let timesStart = document.createElement('div');
            timesStart.innerText = tStart.toLocaleTimeString("en-US", { hour12: false });
            timesStart.className = 'times-start';
            times.append(dateStart);
            times.append(timesStart);
            times.append(timesDuration);
            item.append(times);
            let targetDiv = document.createElement('div');
            targetDiv.classList = 'target';
            let targetName = document.createElement('div');
            targetName.innerText = d['TARGET NAME'];
            targetName.className = 'target-name';
            let targetCategory = document.createElement('div');
            targetCategory.innerText = `${d['CATEGORY']}`;
            targetCategory.className = 'target-category';
            let targetKeywords = document.createElement('div');
            targetKeywords.innerText = d['KEYWORDS'];
            targetKeywords.className = 'target-keywords';
            let targetInstuments = document.createElement('div');
            targetInstuments.innerText = d['SCIENCE INSTRUMENT AND MODE'];
            targetInstuments.className = 'target-instrument';
            targetDiv.append(targetName);
            targetDiv.append(targetCategory);
            targetDiv.append(targetKeywords);
            targetDiv.append(targetInstuments);
            item.append(targetDiv);
            item.id = `target${("00" + idx).slice(-3)}`;
            this.iterateTarget.append(item);
        });
    }

    buildTargetDisplay(data, now) {
        let current = false;
        let target = data;
        let dur;
        if (target) {
            let dayDiff = target['DURATION'].split("/");
            if (dayDiff[1]) {
                let dayInDiff = dayDiff[1].split(":");
                dur = ((dayDiff[0] * 24 * 3600) + (dayInDiff[0] * 3600) + (dayInDiff[1] * 60) + (dayInDiff[2])) * 10;
            }
            let d = new Date(target["SCHEDULED START TIME"]);
            let newTime = (d.getTime() + dur);
            let endTime = new Date(newTime);
            let elapsed = this.generateDiffString(now, d);
            let remaining = this.generateDiffString(endTime, now);
            let countdown = this.generateDiffString(d, now);

            if (now > d && now < endTime) {
                this.targetTitle.innerText = "CURRENT TARGET";
                document.getElementById('jwstSVG').classList = 'current';
                current = true;
            } else {
                this.targetTitle.innerText = "NEXT TARGET";
                document.getElementById('jwstSVG').classList = '';
                current = false;
            }

            let noCategories = (target['CATEGORY'] == 'null' && target['KEYWORDS'] == 'null');
            this.timeTitles.innerText = `${current ? "ENDS:" : "STARTS:"}`;
            this.startTimeTimes.innerText = `${current ? endTime.toLocaleString("en-US", { }) : d.toLocaleString("en-US", { })} \n - ${current ? elapsed : countdown} \n + ${current ? remaining : this.generateDurationString(target['DURATION'])}`;
            this.targetName.innerText = target['TARGET NAME'];
            this.categoryKeywords.innerText = !noCategories ? `${target["CATEGORY"]} \n ${target["KEYWORDS"]}` : "None provided";
            this.instruments.innerText = `${target["SCIENCE INSTRUMENT AND MODE"]}`;
        }
    }

    generateDiffString(x, y) {
        let diff = Math.abs(x - y);
        diff = Math.round(diff / 1000);
        let secs = diff % 60;
        // console.log(`${diff} ${secs}`)
        secs = ('0' + secs).slice(-2);
        diff = Math.floor(diff / 60);
        let mins = diff % 60;
        mins = ('0' + mins).slice(-2);
        diff = Math.floor(diff / 60);
        let hours = diff % 24;
        hours = ('0' + hours).slice(-2);
        return `${hours}h ${mins}m ${secs}s`;
    }

    calculateEndTime(t) {
        let dur;
        let dayDiff = t['DURATION'].split("/");
        if (dayDiff[1]) {
            let dayInDiff = dayDiff[1].split(":");
            dur = ((dayDiff[0] * 24 * 3600) + (dayInDiff[0] * 3600) + (dayInDiff[1] * 60) + (dayInDiff[2])) * 10;
        }
        let startTime = new Date(t['SCHEDULED START TIME']);
        let newTime = (startTime.getTime() + dur);
        return new Date(newTime);

    }

    formatTable(data, target, now) {
        now = new Date(now);
        let targetHit = false;
        for (let i = 0; i < data.length; i++) {
            let divTop = document.getElementById('iterateTarget').getBoundingClientRect().top;
            let tth = document.getElementById(`target${("00" + i).slice(-3)}`);
            if (tth.getBoundingClientRect().top < divTop + 5 && tth.getBoundingClientRect().bottom > divTop) {
                document.getElementById('scrollDate').innerText = tth.getElementsByClassName('date-start')[0].innerText;
            }
            let tStart = new Date(data[i]['SCHEDULED START TIME']);
            tth.classList.remove('scrollToItem');
            tth.style.background = 'var(--glass-backdrop)';
            tth.style.fontWeight = 'normal';
            tth.style.color = 'var(--font-color)';
            if (data[i] == target) {
                targetHit = true;
                if (!tth.classList.contains('scrollToItem')) {
                    tth.classList.add('scrollToItem');
                }
                tth.style.color = 'var(--font-color)';
                // tth.style.fontWeight = 'bold';
                tth.style.border = '0.125rem solid var(--font-faded)';
                if (now > tStart && now < this.calculateEndTime(data[i])) {
                    tth.style.background = 'gold';
                    tth.style.color = 'var(--color-primary)';
                    tth.style.border = 'none';
                }
            }
        }
    }

    generateDurationString(string) {
        let split = string.split("/");
        let days = split[0];
        let hours = split[1].split(":")[0];
        let minutes = split[1].split(":")[1];
        let seconds = split[1].split(":")[2];

        return `${('00' + days).slice(-2)}d ${('00' + hours).slice(-2)}h ${('00' + minutes).slice(-2)}m ${('00' + seconds).slice(-2)}s`;
    }
}