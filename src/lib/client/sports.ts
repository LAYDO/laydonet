interface EspnLogo {
  href?: string;
  rel?: string[];
}

interface EspnTeamSummary {
  team?: {
    id?: string;
    displayName?: string;
    shortDisplayName?: string;
    abbreviation?: string;
    color?: string;
    alternateColor?: string;
    logos?: EspnLogo[];
    record?: { items?: Array<{ summary?: string }> };
    standingSummary?: string;
    nextEvent?: EspnEvent[];
  };
}

interface EspnScoreboard {
  leagues?: Array<{
    name?: string;
    abbreviation?: string;
    season?: {
      year?: number;
      startDate?: string;
      endDate?: string;
      displayName?: string;
      type?: { id?: string; name?: string };
    };
    logos?: EspnLogo[];
  }>;
  events?: EspnEvent[];
}

interface EspnTeamRef {
  id?: string;
  displayName?: string;
  shortDisplayName?: string;
  abbreviation?: string;
  color?: string;
  alternateColor?: string;
  logo?: string;
  logos?: EspnLogo[];
}

interface EspnStatistic {
  name?: string;
  abbreviation?: string;
  displayName?: string;
  label?: string;
  displayValue?: string;
}

interface EspnCompetitor {
  homeAway?: string;
  team?: EspnTeamRef;
  score?: string | { value?: number; displayValue?: string };
  winner?: boolean;
  records?: Array<{ summary?: string }>;
  linescores?: Array<{ displayValue?: string; period?: number; value?: number }>;
  statistics?: EspnStatistic[];
}

interface EspnCompetition {
  id?: string;
  broadcasts?: Array<{ media?: { shortName?: string }; names?: string[] }>;
  competitors?: EspnCompetitor[];
  status?: { type?: { name?: string; state?: string; description?: string; detail?: string; shortDetail?: string }; displayClock?: string; period?: number };
  situation?: Record<string, unknown>;
  leaders?: Array<Record<string, unknown>>;
  venue?: { fullName?: string };
}

interface EspnEvent {
  id?: string;
  shortName?: string;
  name?: string;
  date?: string;
  status?: EspnCompetition["status"];
  competitions?: EspnCompetition[];
}

interface EspnSchedule {
  events?: EspnEvent[];
  season?: { name?: string; year?: number; type?: number };
  requestedSeason?: { name?: string; year?: number; type?: number };
}

interface EspnStandingEntry {
  id?: string;
  team?: string;
  logo?: EspnLogo[];
  stats?: Array<{ name?: string; abbreviation?: string; displayValue?: string }>;
}

interface EspnEventSummary {
  standings?: {
    groups?: Array<{
      header?: string;
      standings?: { entries?: EspnStandingEntry[] };
    }>;
  };
  header?: {
    competitions?: Array<{
      competitors?: EspnCompetitor[];
      status?: EspnCompetition["status"];
      situation?: Record<string, unknown>;
    }>;
  };
  boxscore?: {
    teams?: Array<{ team?: EspnTeamRef; statistics?: EspnStatistic[] }>;
    players?: Array<{
      team?: EspnTeamRef;
      statistics?: Array<{
        labels?: string[];
        athletes?: Array<{ athlete?: { id?: string; displayName?: string; shortName?: string; headshot?: { href?: string } | string }; stats?: string[] }>;
      }>;
    }>;
  };
  drives?: { current?: Record<string, unknown>; previous?: Array<Record<string, unknown>> };
  scoringPlays?: Array<Record<string, unknown>>;
  plays?: Array<Record<string, unknown>>;
  leaders?: Array<Record<string, unknown>>;
  winprobability?: Array<Record<string, unknown>>;
  gameInfo?: { venue?: { fullName?: string } };
}

interface ScheduleSeries {
  opponentId: string;
  opponentName: string;
  events: EspnEvent[];
  start: number;
  end: number;
}

interface TeamConfig {
  league: "mlb" | "nfl" | "ncaaf" | "nba";
  id: string;
  label: string;
}

interface TeamSnapshot {
  config: TeamConfig;
  team: NonNullable<EspnTeamSummary["team"]>;
  scoreboard: EspnScoreboard;
  schedule: EspnSchedule | null;
  scoreboardEvent: EspnEvent | null;
  nextEvent: EspnEvent | null;
  eventSummary: EspnEventSummary | null;
  season: number;
}

type SeasonPhase = "post" | "regular" | "pre" | "off";

const FEATURED_TEAMS: TeamConfig[] = [
  { league: "mlb", id: "12", label: "Seattle Mariners" },
  { league: "nfl", id: "9", label: "Green Bay Packers" },
  { league: "ncaaf", id: "265", label: "Washington State Cougars" },
  { league: "nba", id: "4", label: "Chicago Bulls" }
];

const LEAGUE_LABELS: Record<TeamConfig["league"], string> = {
  nfl: "NFL",
  ncaaf: "NCAAF",
  mlb: "MLB",
  nba: "NBA"
};

const TEAM_ENDPOINTS: Record<TeamConfig["league"], string> = {
  nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams",
  ncaaf: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams",
  mlb: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams",
  nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams"
};

const SCOREBOARD_ENDPOINTS: Record<TeamConfig["league"], string> = {
  nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  ncaaf: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",
  mlb: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
  nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
};

const EVENT_ENDPOINTS: Record<TeamConfig["league"], string> = {
  nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=",
  ncaaf: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event=",
  mlb: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=",
  nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event="
};

const DEFAULT_TEAM_LOGO =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2245%22%20fill%3D%22%23000020%22%20opacity%3D%22.18%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2262%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2248%22%20font-weight%3D%22700%22%20fill%3D%22%23fff8ed%22%3E%3F%3C%2Ftext%3E%3C%2Fsvg%3E";

const TEAM_CARD_SORT_PRIORITY: Record<Exclude<SeasonPhase, "post">, number> = {
  regular: 1,
  pre: 2,
  off: 3
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

function teamRoute(config: TeamConfig) {
  return `/sports/${config.league}/team/${config.id}/`;
}

function buildScheduleUrl(league: TeamConfig["league"], id: string, season: number) {
  return `${TEAM_ENDPOINTS[league]}/${id}/schedule?season=${season}&seasontype=2`;
}

function buildEventUrl(league: TeamConfig["league"], id: string) {
  return `${EVENT_ENDPOINTS[league]}${id}`;
}

function formatEventDate(date?: string) {
  if (!date) {
    return "TBD";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(new Date(date));
}

function pickLogo(logos?: EspnLogo[]) {
  return (
    logos?.find((logo) => logo.rel?.includes("default"))?.href ??
    logos?.find((logo) => logo.href)?.href ??
    ""
  );
}

function teamLogoUrl(team?: EspnTeamRef) {
  return team?.logo ?? (pickLogo(team?.logos) || DEFAULT_TEAM_LOGO);
}

function logoErrorFallback() {
  return `this.onerror=null;this.src='${DEFAULT_TEAM_LOGO}'`;
}

function pickLogoForTeamSurface(logos: EspnLogo[] | undefined, color?: string) {
  const ink = readableInk(color ?? "111111");
  const contrastRel = ink === "#fff8ed" ? "primary_logo_white" : "primary_logo_black";
  return (
    logos?.find((logo) => logo.rel?.includes("primary_logo_on_primary_color"))?.href ??
    logos?.find((logo) => logo.rel?.includes(contrastRel))?.href ??
    logos?.find((logo) => logo.rel?.includes(ink === "#fff8ed" ? "dark" : "default"))?.href ??
    pickLogo(logos)
  );
}

function broadcastName(competition?: EspnCompetition) {
  return (
    competition?.broadcasts?.[0]?.media?.shortName ??
    competition?.broadcasts?.[0]?.names?.[0] ??
    "Broadcast TBD"
  );
}

function recordSummary(team: NonNullable<EspnTeamSummary["team"]>) {
  return team.record?.items?.[0]?.summary ?? "0-0";
}

function scoreValue(competitor?: EspnCompetitor) {
  if (!competitor?.score) {
    return "";
  }
  if (typeof competitor.score === "string") {
    return competitor.score === "0" ? "" : competitor.score;
  }
  return competitor.score.displayValue ?? "";
}

function liveScoreValue(competitor?: EspnCompetitor) {
  if (!competitor?.score) {
    return "0";
  }
  if (typeof competitor.score === "string") {
    return competitor.score || "0";
  }
  return competitor.score.displayValue ?? String(competitor.score.value ?? 0);
}

function parseRecordPct(summary?: string) {
  const match = summary?.match(/^(\d+)-(\d+)/);
  if (!match) {
    return null;
  }
  const wins = Number(match[1]);
  const losses = Number(match[2]);
  const total = wins + losses;
  return total > 0 ? wins / total : null;
}

function firstCompetition(event?: EspnEvent | null) {
  return event?.competitions?.[0];
}

function eventStatus(event?: EspnEvent | null) {
  return event?.status?.type?.name ?? firstCompetition(event)?.status?.type?.name ?? "";
}

function eventState(event?: EspnEvent | null) {
  return event?.status?.type?.state ?? firstCompetition(event)?.status?.type?.state ?? "";
}

function isActiveEvent(event?: EspnEvent | null) {
  return eventState(event) === "in" || eventStatus(event) === "STATUS_IN_PROGRESS";
}

function eventStatusText(event?: EspnEvent | null) {
  return (
    event?.status?.type?.shortDetail ??
    event?.status?.type?.detail ??
    firstCompetition(event)?.status?.type?.shortDetail ??
    firstCompetition(event)?.status?.type?.detail ??
    firstCompetition(event)?.status?.type?.description ??
    ""
  );
}

function seasonPhase(snapshot: TeamSnapshot): SeasonPhase {
  const season = snapshot.scoreboard.leagues?.[0]?.season;
  const now = Date.now();
  const start = season?.startDate ? new Date(season.startDate).getTime() : null;
  const end = season?.endDate ? new Date(season.endDate).getTime() : null;
  if ((start && now < start) || (end && now > end)) {
    return "off";
  }

  const name = season?.type?.name?.toLowerCase() ?? "";
  if (name.includes("post")) {
    return "post";
  }
  if (name.includes("regular")) {
    return "regular";
  }
  if (name.includes("pre")) {
    return "pre";
  }
  return "off";
}

function seasonPhaseLabel(phase: SeasonPhase) {
  return {
    post: "Postseason",
    regular: "Regular Season",
    pre: "Preseason",
    off: "Offseason"
  }[phase];
}

function isParticipatingPostseasonTeam(snapshot: TeamSnapshot) {
  if (seasonPhase(snapshot) !== "post") {
    return false;
  }
  const scoreboardState = eventState(snapshot.scoreboardEvent);
  return (
    scoreboardState === "in" ||
    scoreboardState === "pre" ||
    Boolean(snapshot.nextEvent && isUpcomingOrActiveEvent(snapshot.nextEvent))
  );
}

function teamCardSortPriority(snapshot: TeamSnapshot | null) {
  if (!snapshot) {
    return 4;
  }

  const phase = seasonPhase(snapshot);
  if (phase === "post") {
    return isParticipatingPostseasonTeam(snapshot) ? 0 : 4;
  }

  return TEAM_CARD_SORT_PRIORITY[phase];
}

function snapshotStatus(snapshot: TeamSnapshot) {
  return snapshotEvent(snapshot)?.status ?? snapshotCompetition(snapshot)?.status ?? summaryCompetition(snapshot)?.status;
}

function gameTimeText(snapshot: TeamSnapshot) {
  const status = snapshotStatus(snapshot);
  const statusText = eventStatusText(snapshotEvent(snapshot)) || eventStatusText({ competitions: snapshotCompetition(snapshot) ? [snapshotCompetition(snapshot)!] : [] });
  if (snapshot.config.league === "mlb") {
    return statusText || "Inning pending";
  }
  if (status?.type?.state === "post") {
    return status?.type?.shortDetail ?? status?.type?.description ?? "Final";
  }
  if (status?.displayClock && status.period) {
    return `Q${status.period} ${status.displayClock}`;
  }
  return statusText || "Clock pending";
}

function eventTime(event?: EspnEvent | null) {
  return event?.date ? new Date(event.date).getTime() : 0;
}

function findRequestedCompetitor(event: EspnEvent, id: string) {
  return firstCompetition(event)?.competitors?.find((competitor) => competitor.team?.id === id);
}

function findOpponent(event: EspnEvent, id: string) {
  return firstCompetition(event)?.competitors?.find((competitor) => competitor.team?.id !== id);
}

function findScoreboardEvent(scoreboard: EspnScoreboard, id: string) {
  const teamEvents = (scoreboard.events ?? []).filter((event) => findRequestedCompetitor(event, id));
  return (
    teamEvents.find((event) => eventState(event) === "in") ??
    teamEvents.find((event) => eventState(event) === "pre") ??
    teamEvents.find((event) => eventState(event) === "post") ??
    null
  );
}

function isUpcomingOrActiveEvent(event: EspnEvent) {
  return isActiveEvent(event) || (eventStatus(event) === "STATUS_SCHEDULED" && eventTime(event) >= localDayStart(Date.now()));
}

function findNextEvent(team: NonNullable<EspnTeamSummary["team"]>, schedule: EspnSchedule | null, id: string) {
  const teamNextEvent = team.nextEvent?.[0] ?? null;
  if (teamNextEvent && isUpcomingOrActiveEvent(teamNextEvent)) {
    return teamNextEvent;
  }

  const scheduled = (schedule?.events ?? [])
    .filter((event) => isUpcomingOrActiveEvent(event))
    .sort((a, b) => eventTime(a) - eventTime(b));

  return scheduled.find((event) => findRequestedCompetitor(event, id)) ?? null;
}

function findSummaryEvent(scoreboardEvent: EspnEvent | null, nextEvent: EspnEvent | null, schedule: EspnSchedule | null, id: string) {
  if (scoreboardEvent?.id) {
    return scoreboardEvent;
  }

  if (nextEvent?.id) {
    return nextEvent;
  }

  const teamEvents = (schedule?.events ?? []).filter((event) => findRequestedCompetitor(event, id));
  const scheduled = teamEvents.find((event) => ["STATUS_SCHEDULED", "STATUS_IN_PROGRESS"].includes(eventStatus(event)));
  if (scheduled) {
    return scheduled;
  }

  return teamEvents
    .filter((event) => eventStatus(event) === "STATUS_FINAL")
    .sort((a, b) => eventTime(b) - eventTime(a))[0] ?? null;
}

async function loadTeamSnapshot(config: TeamConfig, options: { includeSchedule?: boolean; includeEventSummary?: boolean } = {}) {
  const { includeSchedule = true, includeEventSummary = true } = options;
  const [teamResponse, scoreboard] = await Promise.all([
    fetchJson<EspnTeamSummary>(`${TEAM_ENDPOINTS[config.league]}/${config.id}`),
    fetchJson<EspnScoreboard>(SCOREBOARD_ENDPOINTS[config.league])
  ]);
  const team = teamResponse.team ?? {};
  const season = scoreboard.leagues?.[0]?.season?.year ?? new Date().getFullYear();
  const schedule = includeSchedule ? await fetchJson<EspnSchedule>(buildScheduleUrl(config.league, config.id, season)) : null;
  const scoreboardEvent = findScoreboardEvent(scoreboard, config.id);
  const nextEvent = includeSchedule ? findNextEvent(team, schedule, config.id) : team.nextEvent?.[0] ?? null;
  const summaryEvent = includeEventSummary ? findSummaryEvent(scoreboardEvent, nextEvent, schedule, config.id) : null;
  const eventSummary = summaryEvent?.id ? await fetchJson<EspnEventSummary>(buildEventUrl(config.league, summaryEvent.id)) : null;

  return { config, team, scoreboard, schedule, scoreboardEvent, nextEvent, eventSummary, season };
}

function applyTeamTheme(element: HTMLElement, team: NonNullable<EspnTeamSummary["team"]>) {
  const primary = `#${team.color ?? "111111"}`;
  const secondary = `#${team.alternateColor ?? "c8c8c8"}`;
  element.style.setProperty("--team-primary", primary);
  element.style.setProperty("--team-secondary", secondary);
  element.style.setProperty("--team-ink", readableInk(team.color ?? "111111"));
}

function readableInk(hex: string) {
  const normalized = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 140 ? "#000020" : "#fff8ed";
}

function homeCardGameDetails(snapshot: TeamSnapshot) {
  const active = isActiveEvent(snapshot.scoreboardEvent) ? snapshot.scoreboardEvent : null;
  const event = active ?? snapshot.nextEvent;
  const competition = firstCompetition(event);
  const team = event ? findRequestedCompetitor(event, snapshot.config.id) : undefined;
  const opponent = event ? findOpponent(event, snapshot.config.id) : undefined;

  if (active) {
    const teamName = team?.team?.abbreviation ?? snapshot.team.abbreviation ?? snapshot.config.label;
    const opponentName = opponent?.team?.abbreviation ?? "TBD";
    return {
      label: "Live Now",
      title: active.shortName ?? `${teamName} vs ${opponentName}`,
      meta: `${teamName} ${liveScoreValue(team)} - ${opponentName} ${liveScoreValue(opponent)} • ${gameTimeText(snapshot)}`
    };
  }

  return {
    label: "Next Game",
    title: event?.shortName ?? "Schedule pending",
    meta: event ? `${formatEventDate(event.date)} • ${broadcastName(competition)}` : "Details pending"
  };
}

function renderTeamCard(root: HTMLElement, config: TeamConfig, snapshot?: TeamSnapshot, error?: unknown) {
  const link = document.createElement("a");
  link.className = "sports-team-card";
  link.href = teamRoute(config);
  link.dataset.sportsTeamCard = "";
  link.setAttribute("aria-label", `${config.label} team details`);
  link.innerHTML = `
    <div class="sports-team-card__identity">
      <div class="sports-team-card__logo-frame" data-team-logo-frame></div>
      <div>
        <div class="sports-team-card__league" data-team-league>${LEAGUE_LABELS[config.league]}</div>
        <h2 data-team-name>${config.label}</h2>
      </div>
    </div>
    <div class="sports-team-card__record">
      <strong data-team-record>Loading</strong>
      <span data-team-standing>ESPN summary</span>
    </div>
    <div class="sports-team-card__next">
      <span data-team-card-status>Loading</span>
      <strong data-team-next-title>Loading schedule</strong>
      <small data-team-next-meta></small>
    </div>
  `;
  root.appendChild(link);

  if (!snapshot) {
    link.querySelector("[data-team-record]")?.replaceChildren(document.createTextNode("Unavailable"));
    link
      .querySelector("[data-team-standing]")
      ?.replaceChildren(document.createTextNode(error instanceof Error ? error.message : "ESPN data failed"));
    link.querySelector("[data-team-card-status]")?.replaceChildren(document.createTextNode("Schedule"));
    link.querySelector("[data-team-next-title]")?.replaceChildren(document.createTextNode("Details unavailable"));
    return;
  }

  const team = snapshot.team;
  const logo = document.createElement("img");
  logo.src = pickLogoForTeamSurface(team.logos, team.color);
  logo.alt = team.displayName ?? config.label;
  logo.onerror = () => {
    logo.onerror = null;
    logo.src = DEFAULT_TEAM_LOGO;
  };
  const gameDetails = homeCardGameDetails(snapshot);
  const phase = seasonPhase(snapshot);
  link.dataset.seasonPhase = phase;
  applyTeamTheme(link, team);
  link.querySelector("[data-team-logo-frame]")?.replaceChildren(logo);
  link.querySelector("[data-team-league]")?.replaceChildren(document.createTextNode(`${LEAGUE_LABELS[config.league]} ${seasonPhaseLabel(phase)}`));
  link.querySelector("[data-team-name]")?.replaceChildren(document.createTextNode(team.displayName ?? config.label));
  link.querySelector("[data-team-record]")?.replaceChildren(document.createTextNode(recordSummary(team)));
  link.querySelector("[data-team-standing]")?.replaceChildren(document.createTextNode(team.standingSummary ?? seasonPhaseLabel(phase)));
  link.querySelector("[data-team-card-status]")?.replaceChildren(document.createTextNode(gameDetails.label));
  link.querySelector("[data-team-next-title]")?.replaceChildren(document.createTextNode(gameDetails.title));
  link.querySelector("[data-team-next-meta]")?.replaceChildren(document.createTextNode(gameDetails.meta));
  link.classList.add("is-loaded");
}

async function renderFeaturedTeamCards(root: HTMLElement, status: HTMLElement | null) {
  status && (status.textContent = "Loading ESPN team cards.");
  const results = await Promise.allSettled(
    FEATURED_TEAMS.map((config, index) =>
      loadTeamSnapshot(config, { includeSchedule: true, includeEventSummary: false }).then((snapshot) => ({ config, index, snapshot }))
    )
  );

  const cards = results.map((result, index) =>
    result.status === "fulfilled"
      ? result.value
      : {
          config: FEATURED_TEAMS[index],
          index,
          snapshot: null,
          error: result.reason
        }
  );

  cards.sort((a, b) => {
    return teamCardSortPriority(a.snapshot) - teamCardSortPriority(b.snapshot) || a.index - b.index;
  });

  root.replaceChildren();
  cards.forEach((card) => renderTeamCard(root, card.config, card.snapshot ?? undefined, "error" in card ? card.error : undefined));
  status && (status.textContent = "Live team cards: active score and game time when playing, otherwise next game details from ESPN.");
}

export function initSportsLanding(root: HTMLElement | null) {
  if (!root) {
    return;
  }

  const status = document.querySelector<HTMLElement>("[data-sports-status]");
  root.className = "sports-team-grid";
  root.replaceChildren();
  void renderFeaturedTeamCards(root, status);
}

function teamConfigFromPage(root: HTMLElement): TeamConfig | null {
  const league = root.dataset.league as TeamConfig["league"] | undefined;
  const id = root.dataset.teamId;
  const label = root.dataset.teamName ?? "Team";
  if (!league || !id || !(league in TEAM_ENDPOINTS)) {
    return null;
  }
  return { league, id, label };
}

function createPanel(title: string, className = "") {
  const panel = document.createElement("section");
  panel.className = `sports-detail-panel ${className}`.trim();
  const heading = document.createElement("h2");
  heading.textContent = title;
  panel.appendChild(heading);
  return panel;
}

function snapshotEvent(snapshot: TeamSnapshot) {
  return snapshot.scoreboardEvent ?? snapshot.nextEvent;
}

function summaryCompetition(snapshot: TeamSnapshot) {
  return snapshot.eventSummary?.header?.competitions?.[0];
}

function snapshotCompetition(snapshot: TeamSnapshot) {
  return firstCompetition(snapshotEvent(snapshot)) ?? summaryCompetition(snapshot);
}

function snapshotCompetitors(snapshot: TeamSnapshot) {
  return snapshotCompetition(snapshot)?.competitors ?? [];
}

function displayScore(competitor?: EspnCompetitor) {
  if (!competitor?.score) {
    return "";
  }
  if (typeof competitor.score === "string") {
    return competitor.score;
  }
  return competitor.score.displayValue ?? String(competitor.score.value ?? "");
}

function gameOutcome(team: EspnCompetitor | undefined, opponent: EspnCompetitor | undefined) {
  const teamScore = scoreValue(team);
  const opponentScore = scoreValue(opponent);
  if (teamScore && opponentScore && teamScore === opponentScore) {
    return "T";
  }
  return team?.winner === true ? "W" : team?.winner === false ? "L" : "";
}

function statValue(stats: EspnStatistic[] | undefined, ...keys: string[]) {
  return (
    stats?.find((stat) =>
      keys.some((key) => [stat.name, stat.abbreviation, stat.displayName, stat.label].some((value) => value?.toLowerCase() === key.toLowerCase()))
    )?.displayValue ?? ""
  );
}

function valueFromRecord(source: Record<string, unknown> | undefined, ...keys: string[]) {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }
  return "";
}

function displayNameFromRecord(source: unknown) {
  if (!source || typeof source !== "object") {
    return "";
  }
  const record = source as Record<string, unknown>;
  return valueFromRecord(record, "displayName", "shortName", "name", "abbreviation");
}

function latestPlay(summary: EspnEventSummary | null) {
  return summary?.plays?.slice(-1)[0];
}

function athleteNameById(summary: EspnEventSummary | null, id?: string | number) {
  if (!id) {
    return "";
  }
  const athleteId = String(id);
  for (const team of summary?.boxscore?.players ?? []) {
    for (const group of team.statistics ?? []) {
      const athlete = group.athletes?.find((entry) => String(entry.athlete?.id ?? "") === athleteId)?.athlete;
      if (athlete) {
        return athlete.displayName ?? athlete.shortName ?? "";
      }
    }
  }
  return "";
}

function latestParticipant(summary: EspnEventSummary | null, type: string) {
  const plays = summary?.plays ?? [];
  for (let index = plays.length - 1; index >= 0; index -= 1) {
    const play = plays[index];
    const participants = Array.isArray(play.participants) ? (play.participants as Array<Record<string, unknown>>) : [];
    const participant = participants.find((candidate) => candidate.type === type);
    const athlete = participant?.athlete as Record<string, unknown> | undefined;
    const name = displayNameFromRecord(athlete) || athleteNameById(summary, valueFromRecord(athlete, "id"));
    if (name) {
      return name;
    }
  }
  return "";
}

function dueUpBatterName(situation: Record<string, unknown> | undefined) {
  const dueUp = Array.isArray(situation?.dueUp) ? (situation.dueUp as Array<Record<string, unknown>>) : [];
  return displayNameFromRecord(dueUp[0]?.athlete);
}

function baseballParticipantName(snapshot: TeamSnapshot, situation: Record<string, unknown> | undefined, type: "batter" | "pitcher") {
  return (
    displayNameFromRecord(situation?.[type]) ||
    (type === "batter" ? dueUpBatterName(situation) : "") ||
    latestParticipant(snapshot.eventSummary, type)
  );
}

function competitorPrimaryColor(competitor: EspnCompetitor, snapshot: TeamSnapshot) {
  if (competitor.team?.color) {
    return `#${competitor.team.color}`;
  }
  if (competitor.team?.id === snapshot.config.id && snapshot.team.color) {
    return `#${snapshot.team.color}`;
  }
  return "#6f7385";
}

function matchupPrediction(snapshot: TeamSnapshot, competitors: EspnCompetitor[]) {
  if (competitors.length !== 2) {
    return null;
  }

  const firstProbability = snapshot.eventSummary?.winprobability?.find(
    (entry) => typeof entry.homeWinPercentage === "number" || typeof entry.awayWinPercentage === "number"
  );
  const values = competitors.map((competitor) => {
    if (firstProbability) {
      const key = competitor.homeAway === "home" ? "homeWinPercentage" : "awayWinPercentage";
      const value = Number(firstProbability[key]);
      if (Number.isFinite(value)) {
        return value;
      }
    }
    return parseRecordPct(competitor.records?.[0]?.summary);
  });

  let first = values[0] ?? null;
  let second = values[1] ?? null;
  if (first === null || second === null || first + second <= 0) {
    first = 0.5;
    second = 0.5;
  } else {
    const total = first + second;
    first = first / total;
    second = second / total;
  }

  return [
    { competitor: competitors[0], percent: Math.round(first * 100) },
    { competitor: competitors[1], percent: Math.round(second * 100) }
  ];
}

function renderMatchupPredictor(snapshot: TeamSnapshot, competitors: EspnCompetitor[]) {
  const prediction = matchupPrediction(snapshot, competitors);
  if (!prediction) {
    return null;
  }

  const panel = document.createElement("div");
  panel.className = "sports-matchup-predictor";
  const [left, right] = prediction;
  const leftColor = competitorPrimaryColor(left.competitor, snapshot);
  const rightColor = competitorPrimaryColor(right.competitor, snapshot);
  panel.style.setProperty("--predictor-left", leftColor);
  panel.style.setProperty("--predictor-right", rightColor);
  panel.style.setProperty("--predictor-left-percent", `${left.percent}%`);
  panel.innerHTML = `
    <div class="sports-matchup-predictor__title">Matchup Predictor</div>
    <div class="sports-matchup-predictor__body">
      <strong>${left.percent.toFixed(1)}<span>%</span></strong>
      <div class="sports-predictor-ring" aria-label="${left.competitor.team?.abbreviation ?? "Team"} ${left.percent} percent, ${right.competitor.team?.abbreviation ?? "Opponent"} ${right.percent} percent">
        <div class="sports-predictor-ring__logos">
          <img src="${teamLogoUrl(left.competitor.team)}" alt="${left.competitor.team?.displayName ?? "Team"}" onerror="${logoErrorFallback()}" />
          <img src="${teamLogoUrl(right.competitor.team)}" alt="${right.competitor.team?.displayName ?? "Opponent"}" onerror="${logoErrorFallback()}" />
        </div>
      </div>
      <strong>${right.percent.toFixed(1)}<span>%</span></strong>
    </div>
  `;
  return panel;
}

function gameCenterCompetitors(snapshot: TeamSnapshot) {
  const competitors = snapshotCompetitors(snapshot);
  if (snapshot.config.league !== "mlb") {
    return competitors;
  }

  return [...competitors].sort((a, b) => {
    const order = (competitor: EspnCompetitor) => (competitor.homeAway === "away" ? 0 : competitor.homeAway === "home" ? 1 : 2);
    return order(a) - order(b);
  });
}

function linescoreSummaryColumns(snapshot: TeamSnapshot, competitor: EspnCompetitor) {
  if (snapshot.config.league === "mlb") {
    return [
      statValue(competitor.statistics, "runs", "R") || displayScore(competitor),
      statValue(competitor.statistics, "hits", "H"),
      statValue(competitor.statistics, "errors", "E")
    ];
  }

  return [displayScore(competitor)];
}

function renderGameCenter(snapshot: TeamSnapshot) {
  const panel = createPanel("Game Center", "sports-game-panel");
  const event = snapshotEvent(snapshot);
  const competition = snapshotCompetition(snapshot);
  const competitors = gameCenterCompetitors(snapshot);
  const status = eventStatusText(event) || eventStatusText({ competitions: competition ? [competition] : [] }) || "Status pending";
  const state = eventState(event);
  const venue = competition?.venue?.fullName ?? snapshot.eventSummary?.gameInfo?.venue?.fullName ?? "";

  panel.insertAdjacentHTML(
    "beforeend",
    `
      <div class="sports-game-headline">
        <strong>${event?.shortName ?? "Matchup pending"}</strong>
        <span>${formatEventDate(event?.date)}${venue ? ` • ${venue}` : ""}</span>
        <small>${status}</small>
      </div>
    `
  );

  const matchup = document.createElement("div");
  matchup.className = "sports-scoreboard";
  competitors.forEach((competitor) => {
    const score = displayScore(competitor);
    const team = competitor.team;
    const item = document.createElement("article");
    item.className = competitor.team?.id === snapshot.config.id ? "is-current" : "";
    item.innerHTML = `
      <img src="${teamLogoUrl(team)}" alt="${team?.displayName ?? "Team"}" onerror="${logoErrorFallback()}" />
      <div>
        <strong>${team?.abbreviation ?? team?.shortDisplayName ?? "TBD"}</strong>
        <span>${competitor.records?.[0]?.summary ?? competitor.homeAway ?? ""}</span>
      </div>
      <b>${state === "pre" ? "" : score}</b>
    `;
    matchup.appendChild(item);
  });

  if (competitors.length) {
    panel.appendChild(matchup);
  }

  const predictor = renderMatchupPredictor(snapshot, competitors);
  if (predictor) {
    panel.appendChild(predictor);
  }

  const linescoreTeams = competitors.filter((competitor) => competitor.linescores?.length);
  if (linescoreTeams.length) {
    const periods = Math.max(...linescoreTeams.map((competitor) => competitor.linescores?.length ?? 0));
    const summaryLabels = snapshot.config.league === "mlb" ? ["R", "H", "E"] : ["Final"];
    const linescore = document.createElement("div");
    linescore.className = snapshot.config.league === "mlb" ? "sports-linescore sports-linescore--mlb" : "sports-linescore";
    linescore.innerHTML = `
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            ${Array.from({ length: periods }, (_, index) => `<th scope="col">${index + 1}</th>`).join("")}
            ${summaryLabels.map((label) => `<th scope="col">${label}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${linescoreTeams
            .map(
              (competitor) => `
                <tr>
                  <th scope="row">${competitor.team?.abbreviation ?? "TBD"}</th>
                  ${Array.from({ length: periods }, (_, index) => `<td>${competitor.linescores?.[index]?.displayValue ?? ""}</td>`).join("")}
                  ${linescoreSummaryColumns(snapshot, competitor).map((value) => `<td>${value}</td>`).join("")}
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
    panel.appendChild(linescore);
  }

  if (!competitors.length) {
    panel.insertAdjacentHTML("beforeend", `<p class="sports-empty-state">ESPN has not published matchup details for this team yet.</p>`);
  }

  return panel;
}

function renderBaseballPulse(snapshot: TeamSnapshot) {
  const panel = createPanel("Diamond Pulse", "sports-insight-panel sports-insight-panel--mlb");
  const situation = (snapshotCompetition(snapshot)?.situation ?? summaryCompetition(snapshot)?.situation) as Record<string, unknown> | undefined;
  const lastPlay = situation?.lastPlay as Record<string, unknown> | undefined;
  const batter = baseballParticipantName(snapshot, situation, "batter");
  const pitcher = baseballParticipantName(snapshot, situation, "pitcher");
  const onFirst = Boolean(situation?.onFirst);
  const onSecond = Boolean(situation?.onSecond);
  const onThird = Boolean(situation?.onThird);

  panel.insertAdjacentHTML(
    "beforeend",
    `
      <div class="sports-game-time"><span>Game Time</span><strong>${gameTimeText(snapshot)}</strong></div>
      <div class="sports-baseball-state">
        <div class="sports-diamond" aria-label="Base runners">
          <span class="${onSecond ? "is-occupied" : ""}"></span>
          <span class="${onThird ? "is-occupied" : ""}"></span>
          <span class="${onFirst ? "is-occupied" : ""}"></span>
        </div>
        <div class="sports-count-grid">
          <span><strong>${valueFromRecord(situation, "balls") || "-"}</strong>Balls</span>
          <span><strong>${valueFromRecord(situation, "strikes") || "-"}</strong>Strikes</span>
          <span><strong>${valueFromRecord(situation, "outs") || "-"}</strong>Outs</span>
        </div>
      </div>
      <div class="sports-micro-list">
        <div><span>Batter</span><strong>${batter || "Unavailable"}</strong></div>
        <div><span>Pitcher</span><strong>${pitcher || "Unavailable"}</strong></div>
        <div><span>Last Play</span><strong>${valueFromRecord(lastPlay, "text", "shortText") || "No live play feed right now"}</strong></div>
      </div>
    `
  );

  return panel;
}

function renderFootballPulse(snapshot: TeamSnapshot) {
  const panel = createPanel(snapshot.config.league === "ncaaf" ? "Drive Board" : "Drive Board", "sports-insight-panel sports-insight-panel--football");
  const drives = snapshot.eventSummary?.drives;
  const drive = drives?.current ?? drives?.previous?.slice(-1)[0];
  const scoringPlays = snapshot.eventSummary?.scoringPlays?.slice(-3).reverse() ?? [];
  const winProbability = snapshot.eventSummary?.winprobability?.slice(-1)[0];
  const possession = displayNameFromRecord((drive?.team as Record<string, unknown> | undefined) ?? undefined);

  panel.insertAdjacentHTML(
    "beforeend",
    `
      <div class="sports-game-time"><span>Game Time</span><strong>${gameTimeText(snapshot)}</strong></div>
      <div class="sports-drive-card">
        <span>${drives?.current ? "Current Drive" : "Latest Drive"}</span>
        <strong>${possession || valueFromRecord(drive, "displayResult", "result") || "Drive data pending"}</strong>
        <p>${valueFromRecord(drive, "description", "displayResult", "result") || "ESPN has not returned drive detail for this matchup."}</p>
      </div>
    `
  );

  if (winProbability) {
    const home = Number(winProbability.homeWinPercentage ?? 0);
    const away = Number(winProbability.awayWinPercentage ?? (home ? 1 - home : 0));
    const homePct = Math.round(home * 100);
    const awayPct = Math.round(away * 100);
    panel.insertAdjacentHTML(
      "beforeend",
      `<div class="sports-win-prob"><span style="width:${Math.max(0, Math.min(100, homePct))}%"></span></div><small class="sports-note">Win probability: home ${homePct || "-"}%, away ${awayPct || "-"}%</small>`
    );
  }

  const list = document.createElement("div");
  list.className = "sports-micro-list";
  if (scoringPlays.length) {
    scoringPlays.forEach((play) => {
      const clock = play.clock as Record<string, unknown> | undefined;
      list.insertAdjacentHTML(
        "beforeend",
        `<div><span>${valueFromRecord(clock, "displayValue") || "Scoring play"}</span><strong>${valueFromRecord(play, "text", "shortText")}</strong></div>`
      );
    });
  } else {
    list.innerHTML = `<p class="sports-empty-state">No scoring-play feed is available for this event yet.</p>`;
  }
  panel.appendChild(list);

  return panel;
}

function renderBasketballPulse(snapshot: TeamSnapshot) {
  const panel = createPanel("Court Pulse", "sports-insight-panel sports-insight-panel--nba");
  const teamRows = snapshot.eventSummary?.boxscore?.teams ?? [];
  const play = latestPlay(snapshot.eventSummary);
  const usefulStats = ["fieldGoalPct", "threePointPct", "rebounds", "assists", "turnovers"];

  if (teamRows.length) {
    const stats = document.createElement("div");
    stats.className = "sports-stat-compare";
    stats.innerHTML = `
      <div class="sports-stat-compare__head"><span></span>${teamRows
        .map((row) => `<strong>${row.team?.abbreviation ?? row.team?.shortDisplayName ?? "TBD"}</strong>`)
        .join("")}</div>
      ${usefulStats
        .map(
          (key) => `
            <div>
              <span>${key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase())}</span>
              ${teamRows.map((row) => `<b>${statValue(row.statistics, key) || "-"}</b>`).join("")}
            </div>
          `
        )
        .join("")}
    `;
    panel.appendChild(stats);
  }

  panel.insertAdjacentHTML(
    "beforeend",
    `
      <div class="sports-game-time"><span>Game Time</span><strong>${gameTimeText(snapshot)}</strong></div>
      <div class="sports-drive-card">
        <span>Latest Play</span>
        <strong>${valueFromRecord(play, "text", "shortText") || "Play feed pending"}</strong>
        <p>${valueFromRecord(play, "period", "clock") || "Live play-by-play appears here when ESPN returns it."}</p>
      </div>
    `
  );

  return panel;
}

function renderSportPulse(snapshot: TeamSnapshot) {
  if (snapshot.config.league === "mlb") {
    return renderBaseballPulse(snapshot);
  }
  if (snapshot.config.league === "nba") {
    return renderBasketballPulse(snapshot);
  }
  return renderFootballPulse(snapshot);
}

function renderHero(root: HTMLElement, snapshot: TeamSnapshot) {
  const hero = document.createElement("section");
  hero.className = "sports-team-hero";
  applyTeamTheme(hero, snapshot.team);
  hero.innerHTML = `
    <img src="${pickLogoForTeamSurface(snapshot.team.logos, snapshot.team.color)}" alt="${snapshot.team.displayName ?? snapshot.config.label}" />
    <div class="sports-team-hero__content">
      <div class="sports-team-card__league">${LEAGUE_LABELS[snapshot.config.league]} ${snapshot.season}</div>
      <h2>${snapshot.team.displayName ?? snapshot.config.label}</h2>
      <div class="sports-team-hero__meta">
        <strong>${recordSummary(snapshot.team)}</strong>
        <span>${snapshot.team.standingSummary ?? "Standing pending"}</span>
      </div>
    </div>
  `;
  root.appendChild(hero);
}

function renderNextGame(snapshot: TeamSnapshot) {
  const panel = createPanel("Next Game", "sports-next-panel");
  const event = snapshot.nextEvent;
  const competition = firstCompetition(event);
  const competitors = competition?.competitors ?? [];
  panel.insertAdjacentHTML(
    "beforeend",
    `
      <div class="sports-next-panel__headline">
        <strong>${event?.shortName ?? "Schedule pending"}</strong>
        <span>${formatEventDate(event?.date)} • ${broadcastName(competition)}</span>
      </div>
      <div class="sports-matchup">
        ${competitors
          .map(
            (competitor) => `
              <div class="sports-matchup__team">
                <img src="${teamLogoUrl(competitor.team)}" alt="${competitor.team?.displayName ?? "Team"}" onerror="${logoErrorFallback()}" />
                <strong>${competitor.team?.abbreviation ?? competitor.team?.shortDisplayName ?? "TBD"}</strong>
                <span>${competitor.records?.[0]?.summary ?? competitor.homeAway ?? ""}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `
  );
  return panel;
}

function renderStandings(snapshot: TeamSnapshot) {
  const group = snapshot.eventSummary?.standings?.groups?.find((candidate) =>
    candidate.standings?.entries?.some((entry) => entry.id === snapshot.config.id)
  );
  const entries = group?.standings?.entries ?? [];
  const panel = createPanel(group?.header ?? "Standings", "sports-standings-panel");
  const table = document.createElement("div");
  table.className = "sports-standings-table";
  table.innerHTML = "<div><span>Team</span><span>W</span><span>L</span><span>PCT</span><span>GB</span><span>STRK</span></div>";

  entries.forEach((entry) => {
    const stats = entry.stats ?? [];
    const value = (...names: string[]) =>
      stats.find((stat) => names.includes(stat.name ?? "") || names.includes(stat.abbreviation ?? ""))?.displayValue ?? "";
    const row = document.createElement("div");
    row.className = entry.id === snapshot.config.id ? "is-current" : "";
    row.innerHTML = `
      <span><img src="${pickLogo(entry.logo)}" alt="" />${entry.team ?? "Team"}</span>
      <span>${value("wins", "W") || value("overall")}</span>
      <span>${value("losses", "L") || value("vs. Conf.", "CONF")}</span>
      <span>${value("winPercent", "PCT")}</span>
      <span>${value("gamesBehind", "GB")}</span>
      <span>${value("streak", "STRK")}</span>
    `;
    table.appendChild(row);
  });

  if (!entries.length) {
    table.innerHTML = `<p class="sports-empty-state">ESPN did not return standings for the selected event.</p>`;
  }

  panel.appendChild(table);
  return panel;
}

function eventTimestamp(event: EspnEvent) {
  return event.date ? new Date(event.date).getTime() : 0;
}

function localDayStart(timestamp: number) {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function localDayEnd(timestamp: number) {
  const date = new Date(timestamp);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
}

function buildScheduleSeries(events: EspnEvent[], teamId: string) {
  const series: ScheduleSeries[] = [];
  events
    .filter((event) => findRequestedCompetitor(event, teamId) && eventTimestamp(event))
    .sort((a, b) => eventTimestamp(a) - eventTimestamp(b))
    .forEach((event) => {
      const opponent = findOpponent(event, teamId);
      const opponentId = opponent?.team?.id ?? event.shortName ?? "unknown";
      const last = series[series.length - 1];
      if (last && last.opponentId === opponentId) {
        last.events.push(event);
        last.end = eventTimestamp(event);
        return;
      }

      const timestamp = eventTimestamp(event);
      series.push({
        opponentId,
        opponentName: opponent?.team?.displayName ?? event.shortName ?? "Opponent TBD",
        events: [event],
        start: timestamp,
        end: timestamp
      });
    });
  return series;
}

function scheduleSections(snapshot: TeamSnapshot) {
  const events = snapshot.schedule?.events ?? [];
  if (snapshot.config.league === "nfl" || snapshot.config.league === "ncaaf") {
    const teamEvents = events
      .filter((event) => findRequestedCompetitor(event, snapshot.config.id) && eventTimestamp(event))
      .sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
    const today = localDayStart(Date.now());
    const nextGame = teamEvents.find((event) => eventTimestamp(event) >= today);
    return [
      nextGame ? { title: "Next Game", events: [nextGame] } : null,
      {
        title: "Full Schedule",
        events: teamEvents
      }
    ].filter(Boolean) as Array<{ title: string; events: EspnEvent[] }>;
  }

  const series = buildScheduleSeries(events, snapshot.config.id);
  const today = localDayStart(Date.now());
  const currentIndex = series.findIndex((candidate) => today >= localDayStart(candidate.start) && today <= localDayEnd(candidate.end));
  const currentSeries = currentIndex >= 0 ? series[currentIndex] : null;
  const nextSeries =
    series.find((candidate, index) => {
      if (candidate.start < today) {
        return false;
      }
      return currentSeries ? index > currentIndex && candidate.opponentId !== currentSeries.opponentId : true;
    }) ?? null;
  const cutoff = currentSeries?.start ?? nextSeries?.start ?? Date.now();
  const lastTen = events
    .filter((event) => findRequestedCompetitor(event, snapshot.config.id) && eventTimestamp(event) < localDayStart(cutoff))
    .sort((a, b) => eventTimestamp(b) - eventTimestamp(a))
    .slice(0, 10);

  return [
    nextSeries ? { title: `Next Series: ${nextSeries.opponentName}`, events: [...nextSeries.events].sort((a, b) => eventTimestamp(b) - eventTimestamp(a)) } : null,
    currentSeries ? { title: `Current Series: ${currentSeries.opponentName}`, events: [...currentSeries.events].sort((a, b) => eventTimestamp(b) - eventTimestamp(a)) } : null,
    lastTen.length ? { title: "Last 10 Games", events: lastTen } : null
  ].filter(Boolean) as Array<{ title: string; events: EspnEvent[] }>;
}

function scheduleSeasonLabel(snapshot: TeamSnapshot) {
  const season = snapshot.schedule?.requestedSeason?.year ?? snapshot.schedule?.season?.year ?? snapshot.season;
  const name = snapshot.schedule?.requestedSeason?.name ?? snapshot.schedule?.season?.name ?? "";
  return name && !String(name).includes(String(season)) ? `${season} ${name}` : String(season);
}

function scheduleHighlightEventId(snapshot: TeamSnapshot) {
  return isActiveEvent(snapshot.scoreboardEvent) ? snapshot.scoreboardEvent?.id : snapshot.nextEvent?.id;
}

function renderSchedule(snapshot: TeamSnapshot) {
  const panel = createPanel(`Schedule ${scheduleSeasonLabel(snapshot)}`, "sports-schedule-panel");
  const list = document.createElement("div");
  list.className = "sports-schedule-list";
  const sections = scheduleSections(snapshot);
  const highlightEventId = scheduleHighlightEventId(snapshot);
  let hasHighlightedScheduleRow = false;
  list.innerHTML = `
    <div class="sports-schedule-row sports-schedule-row--head">
      <span>Date</span>
      <span>Opponent</span>
      <span>Result</span>
    </div>
  `;

  sections.forEach((section) => {
    const sectionRow = document.createElement("div");
    sectionRow.className = "sports-schedule-section";
    sectionRow.textContent = section.title;
    list.appendChild(sectionRow);

    section.events.forEach((event) => {
      const competition = firstCompetition(event);
      const team = findRequestedCompetitor(event, snapshot.config.id);
      const opponent = findOpponent(event, snapshot.config.id);
      const teamScore = scoreValue(team);
      const opponentScore = scoreValue(opponent);
      const outcome = gameOutcome(team, opponent);
      const isHighlighted = !hasHighlightedScheduleRow && Boolean(event.id) && event.id === highlightEventId;
      if (isHighlighted) {
        hasHighlightedScheduleRow = true;
      }
      const row = document.createElement("article");
      row.className = isHighlighted ? "sports-schedule-row is-current" : "sports-schedule-row";
      row.innerHTML = `
        <time>${formatEventDate(event.date)}</time>
        <span class="sports-schedule-opponent">
          <span>${team?.homeAway === "home" ? "vs" : "@"}</span>
          <img src="${teamLogoUrl(opponent?.team)}" alt="" onerror="${logoErrorFallback()}" />
          <strong>${opponent?.team?.displayName ?? event.shortName ?? "Opponent TBD"}</strong>
        </span>
        <span class="sports-schedule-result">
          ${outcome ? `<b class="${outcome === "W" ? "is-win" : outcome === "L" ? "is-loss" : ""}">${outcome}</b>` : ""}
          <span>${teamScore && opponentScore ? `${teamScore}-${opponentScore}` : broadcastName(competition)}</span>
        </span>
      `;
      list.appendChild(row);
    });
  });

  if (!sections.length) {
    list.innerHTML = `<p class="sports-empty-state">ESPN did not return schedule events for this season.</p>`;
  }

  panel.appendChild(list);
  return panel;
}

export async function initSportsTeamPage(root: HTMLElement | null) {
  if (!root) {
    return;
  }

  const config = teamConfigFromPage(root);
  if (!config) {
    root.textContent = "Team route is missing league or team id.";
    return;
  }

  const status = document.querySelector<HTMLElement>("[data-sports-status]");
  status && (status.textContent = "Loading ESPN team details...");
  root.className = "sports-team-detail is-loading";
  root.replaceChildren();

  const renderSnapshot = (snapshot: TeamSnapshot) => {
    root.classList.remove("is-loading");
    root.replaceChildren();
    renderHero(root, snapshot);

    const layout = document.createElement("section");
    layout.className = "sports-detail-grid";
    layout.append(renderGameCenter(snapshot));
    if (isActiveEvent(snapshot.scoreboardEvent)) {
      layout.classList.add("has-active-insight");
      layout.append(renderSportPulse(snapshot));
    }
    layout.append(renderStandings(snapshot), renderSchedule(snapshot));
    root.appendChild(layout);
  };

  const refresh = async (initial = false) => {
    if (initial) {
      root.classList.add("is-loading");
    }
    try {
      const snapshot = await loadTeamSnapshot(config);
      renderSnapshot(snapshot);
      status && (status.textContent = "Team details loaded from ESPN public JSON endpoints.");
    } catch (error) {
      root.classList.remove("is-loading");
      if (initial) {
        root.innerHTML = `<p class="sports-empty-state">${error instanceof Error ? error.message : "Failed to load team details."}</p>`;
      }
      status && (status.textContent = "ESPN team details failed to load.");
    }
  };

  void refresh(true);
  if (root.dataset.refreshIntervalId) {
    window.clearInterval(Number(root.dataset.refreshIntervalId));
  }
  root.dataset.refreshIntervalId = String(window.setInterval(() => {
    void refresh();
  }, 15000));
}
