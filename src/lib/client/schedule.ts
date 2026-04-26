import { advisoryDay, regularDay, type SchedulePeriod, type ScheduleTemplate } from "../../data/schedule";

type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  types: string[];
};

const templates: Record<string, ScheduleTemplate> = {
  regular: regularDay,
  advisory: advisoryDay
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map((part) => Number(part));
  return hours * 60 + minutes;
};

const currentMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

const clear = (element: HTMLElement | null) => element?.replaceChildren();

const getCurrentPeriod = (periods: SchedulePeriod[], minutes: number) =>
  periods.find((period) => minutes >= toMinutes(period.start) && minutes < toMinutes(period.end));

const getNextPeriod = (periods: SchedulePeriod[], minutes: number) =>
  periods.find((period) => minutes < toMinutes(period.start));

const renderPeriods = (periods: SchedulePeriod[], minutes: number) => {
  const container = document.getElementById("schedule-period-list");
  if (!container) return;

  clear(container);
  const current = getCurrentPeriod(periods, minutes);
  const next = getNextPeriod(periods, minutes);

  for (const period of periods) {
    const article = document.createElement("article");
    const isCurrent = current?.id === period.id;
    const isNext = next?.id === period.id;
    article.style.borderColor = isCurrent ? "rgba(31,31,27,0.55)" : "rgba(31,31,27,0.12)";
    article.style.background = isCurrent ? "rgba(234,168,111,0.22)" : "rgba(255,255,255,0.56)";
    article.innerHTML = `
      <div class="card-topline">
        <span>${period.title}</span>
        <span>${period.plan ? "Plan" : ""}</span>
      </div>
      <h3>${period.start} - ${period.end}</h3>
      <p>${isCurrent ? "In progress now." : isNext ? "Next up." : "Scheduled block."}</p>
    `;
    container.appendChild(article);
  }
};

const renderHolidayList = (holidays: Holiday[], year: number) => {
  const container = document.getElementById("schedule-holiday-list");
  if (!container) return;

  clear(container);
  const now = new Date();

  for (const holiday of holidays.slice(0, 8)) {
    const holidayDate = new Date(`${holiday.date}T00:00:00`);
    const daysAway = Math.ceil((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const article = document.createElement("article");
    article.innerHTML = `
      <div class="eyebrow">${year}</div>
      <h3>${holiday.localName}</h3>
      <p>${formatDate(holidayDate)}</p>
      <p>${daysAway >= 0 ? `${daysAway} days away` : "Already passed"}</p>
    `;
    container.appendChild(article);
  }
};

const renderBanner = (holiday: Holiday | undefined, template: ScheduleTemplate, date: Date) => {
  const banner = document.getElementById("schedule-holiday-banner");
  const schoolStatus = document.getElementById("schedule-school-status");

  if (!banner) return;

  if (holiday) {
    banner.innerHTML = `
      <div class="eyebrow">School closed</div>
      <h3>${holiday.localName}</h3>
      <p>${formatDate(date)} is a public holiday in the United States, so the schedule is effectively paused.</p>
    `;
    if (schoolStatus) {
      schoolStatus.textContent = "Holiday";
    }
    return;
  }

  banner.innerHTML = `
    <div class="eyebrow">Active template</div>
    <h3>${template.title}</h3>
    <p>Using the local schedule config from src/data/schedule.ts.</p>
  `;
  if (schoolStatus) {
    schoolStatus.textContent = date.getDay() === 0 || date.getDay() === 6 ? "Weekend" : "School day";
  }
};

const refreshClock = () => {
  const clock = document.getElementById("schedule-clock");
  const dateLabel = document.getElementById("schedule-date");
  const now = new Date();
  if (clock) {
    clock.textContent = formatTime(now);
  }
  if (dateLabel) {
    dateLabel.textContent = formatDate(now);
  }
};

const loadHolidays = async (year: number) => {
  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`);
  if (!response.ok) {
    throw new Error(`Holiday lookup failed: ${response.status}`);
  }
  return (await response.json()) as Holiday[];
};

const populateYearOptions = () => {
  const select = document.getElementById("schedule-year") as HTMLSelectElement | null;
  if (!select) return;

  const years = [new Date().getFullYear(), new Date().getFullYear() + 1];
  select.replaceChildren();
  for (const year of years) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    if (year === new Date().getFullYear()) option.selected = true;
    select.appendChild(option);
  }
};

const renderState = async () => {
  const modeSelect = document.getElementById("schedule-mode") as HTMLSelectElement | null;
  const yearSelect = document.getElementById("schedule-year") as HTMLSelectElement | null;
  const currentMode = modeSelect?.value ?? "regular";
  const template = templates[currentMode] ?? regularDay;
  const now = new Date();
  const year = Number(yearSelect?.value ?? now.getFullYear());
  const minuteValue = currentMinutes(now);

  const currentPeriod = getCurrentPeriod(template.periods, minuteValue);
  const nextPeriod = getNextPeriod(template.periods, minuteValue);

  const currentPeriodEl = document.getElementById("schedule-current-period");
  const nextPeriodEl = document.getElementById("schedule-next-period");
  const templateName = document.getElementById("schedule-template-name");
  const status = document.getElementById("schedule-status");

  if (templateName) {
    templateName.textContent = template.title;
  }
  if (currentPeriodEl) {
    currentPeriodEl.textContent = currentPeriod ? currentPeriod.title : "No active period";
  }
  if (nextPeriodEl) {
    nextPeriodEl.textContent = nextPeriod ? `${nextPeriod.title} at ${nextPeriod.start}` : "Day is finished";
  }
  if (status) {
    status.textContent = `Tracking ${template.title.toLowerCase()} in the browser.`;
  }

  try {
    const holidays = await loadHolidays(year);
    const todayKey = now.toISOString().slice(0, 10);
    const holiday = holidays.find((entry) => entry.date === todayKey);
    renderBanner(holiday, template, now);
    renderPeriods(template.periods, minuteValue);
    renderHolidayList(holidays, year);
  } catch (error) {
    const banner = document.getElementById("schedule-holiday-banner");
    if (banner) {
      banner.innerHTML = `<div class="eyebrow">Holiday data unavailable</div><p>${error instanceof Error ? error.message : "Unable to load holiday data."}</p>`;
    }
    renderPeriods(template.periods, minuteValue);
  }
};

export const initSchedulePage = () => {
  populateYearOptions();
  refreshClock();
  void renderState();

  const modeSelect = document.getElementById("schedule-mode");
  const yearSelect = document.getElementById("schedule-year");

  modeSelect?.addEventListener("change", () => {
    void renderState();
  });
  yearSelect?.addEventListener("change", () => {
    void renderState();
  });

  window.setInterval(() => {
    refreshClock();
    void renderState();
  }, 30000);
};
