var sets = [];
var colors = [];
var colorsFilter = [];
var setsFilter = [];

document.getElementById("cardName").addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.code === 'Enter') {
        getCard();
    } else {
        document.getElementById("searchIcon").className = document.getElementById("searchIcon").className.replace("fa-sliders-h","fa-search"); 
    }
});

function checkSearch() {
    if (document.getElementById("searchIcon").classList.contains("fa-search")) {
        getCard();
    } else {
        flipFilters();
    }
}


async function getCard() {
    var results = document.getElementById("results");
    results.className += "loader";
    if (results.hasChildNodes()) {
        results.innerHTML = "";
    }
    let name = document.getElementById('cardName').value.trim();
    let url = window.location.href;
    url += `card/${name}/?`;
    if (colorsFilter.length > 0) {
        let temp = '';
        colorsFilter.forEach((color) => {
            temp += `${color}|`;
        });
        temp = temp.slice(0, temp.length - 1);
        url += `color=${temp}&`;
    }
    if (setsFilter.length > 0) {
        let temp = '';
        setsFilter.forEach((set) => {
            temp += `${set}|`;
        });
        temp = temp.slice(0, temp.length - 1);
        url += `set=${temp}&`;
    }
    fetch(url.slice(0, url.length - 1))
        .then(response => {
            results.className = "";
            // results.className = results.className.replace(" loader","");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setSets(data);
            setColors(data);
            data.forEach(card => {
                setCard(card);
            });
            document.getElementById("searchIcon").className = document.getElementById("searchIcon").className.replace("fa-search","fa-sliders-h"); 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });    
}

function setCard(card) {
    console.log(card);
    var cardResult = new MTGCard(card);
    var cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.addEventListener('click', () => {
        cardDiv.classList.toggle('clicked');
    });
    var innerDiv = document.createElement("div");
    innerDiv.className = "card-inner";
    var mtgCard = document.createElement("div");
    mtgCard.id = cardResult.id;
    mtgCard.className = "card-front";
    var mtgInfo = document.createElement("div");
    mtgInfo.id = `${cardResult.id}Info`;
    mtgInfo.className = "card-back";
    if (cardResult.imgUrl != null) {
        mtgCard.style.backgroundImage = `url('${cardResult.imgUrl}')`;
        mtgCard.style.backgroundSize = `100% 100%`;
    } else {
        return;
    }
    formatBack(cardResult, mtgInfo);
    innerDiv.append(mtgCard);
    innerDiv.append(mtgInfo);
    cardDiv.append(innerDiv);
    document.getElementById("results").append(cardDiv);
}

function formatBack(data, backDiv) {
    // Main background - black
    backDiv.style.backgroundColor = "black";
    // Card background color
    var colorBackground = document.createElement("div");
    colorBackground.className = "color-background";
    colorBackground.style.backgroundColor = data.colorId;
    // Title bar
    var titleBar = document.createElement("div");
    titleBar.className = "title-bar";
    titleBar.style.border = `0.125rem solid ${data.colorId}`;
    // Create title & append
    var title = document.createElement("div");
    title.className = "title";
    title.innerText = `${data.name} Rulings`;
    titleBar.append(title);
    // Create mana cost & append
    // var manaCost = document.createElement("div");
    // manaCost.className = "mana-cost";
    // manaCost.innerText = data.manaCost;
    // titleBar.append(manaCost);

    // Rulings
    var rulingDiv = document.createElement("div");
    var rulingText = document.createElement("p");
    if (data.rulings) {
        data.rulings.forEach(ruling => {
            let list = document.createElement("div");
            let sublist = document.createElement("ul");
            let date = document.createElement("h4");
            let rule = document.createElement("li");
            date.innerText = ruling.date;
            rule.innerText = ruling.text;
            list.append(date);
            sublist.append(rule);
            list.append(sublist);
            rulingText.append(list);
        });
    }
    rulingDiv.className = "rulings";
    rulingDiv.append(rulingText);
    if (colorBackground.style.backgroundColor === 'white') {
        colorBackground.style.color = 'black';
        titleBar.style.color = 'black';
    }
    colorBackground.append(titleBar);
    colorBackground.append(rulingDiv);
    backDiv.append(colorBackground);
}

function setSets(data) {
    document.getElementById("sets").innerHTML = "";
    data.forEach(card => {
        let cardSet = card.set.slice(card.set.length - 3, card.set.length);
        const found = sets.some(set => set.code === cardSet);
        if (!found) sets.push({"code": cardSet, "name": card.setName});
    });
    console.log(sets);
    sets.forEach(set => {
        let icon = document.createElement("i");
        icon.id = set.code.toLowerCase();
        icon.className = `ss ss-${set.code.toLowerCase()}`;
        icon.title = `${set.name}`
        icon.addEventListener('click', setFilters);
        document.getElementById("sets").append(icon);
    });
    sets = [];
}

function flipFilters() {
    var filters = document.getElementById("filters");
    if (filters.style.display === 'none') {
        filters.style.display = 'block';
        document.getElementById("mtgSearch").className += " active";
    } else {
        filters.style.display = 'none';
        document.getElementById("mtgSearch").className = document.getElementById("mtgSearch").className.replace(" active","");
    }
}

function setColors(data) {
    let colorElement = document.getElementById("colors");
    colorElement.innerHTML = "";
    data.forEach(card => {
        let cardColors = card.colors;
        if (cardColors) {
            cardColors.forEach(color => {
                const found = colors.some(colorA => colorA === color);
                if (!found) colors.push(color);
            });
        } else {
            return;
        }
    });
    console.log(colors);
    colors.forEach(colorI => {
        let span = document.createElement("span");
        switch (colorI) {
            case "White":
                span.className = 'plains';
                break;
            case "Black":
                span.className = 'swamp';
                break;
            case "Blue":
                span.className = 'island';
                break;
            case "Green":
                span.className = 'forest';
                break;
            case "Red":
                span.className = 'mountain';
                break;
            default:
                break;
        }
        span.className += ' land';
        span.id = colorI.toLowerCase();
        span.addEventListener("click", setFilters);
        colorElement.append(span);
    });
    colors = [];
}

function setFilters(e) {
    if (e.currentTarget.classList.contains('land')) {
        let color = e.currentTarget.id.toLowerCase();
        const found = colorsFilter.some(colorA => colorA === color);
        if (!found) {
            colorsFilter.push(color);
        } else {
            let index = colorsFilter.indexOf(color);
            if (index > -1) {
                colorsFilter.splice(index, 1);
            }
        }
    } else if (e.currentTarget.classList.contains('ss')) {
        let set = e.currentTarget.id.toLowerCase();
        const found = setsFilter.some(setA => setA === set);
        if (!found) {
            setsFilter.push(set);
            e.currentTarget.className += ' active';
        } else {
            let index = setsFilter.indexOf(set);
            if (index > -1) {
                setsFilter.splice(index, 1);
                e.currentTarget.className = e.currentTarget.className.replace(' active', '');
            }
        }
    }
    getCard();
}

class MTGCard {
    constructor(_card) {
        this.id = _card.id;
        this.name = _card.name;
        this.imgUrl = _card.imgUrl;
        this.colorId = _card.colors;
        this.setCode = _card.set;
        this.setName = _card.setName;
        this.rulings = _card.rulings;
    }
}