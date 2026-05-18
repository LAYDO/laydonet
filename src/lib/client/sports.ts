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
    competitions?: EspnCompetition[];
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

interface EspnRef {
  $ref?: string;
}

interface EspnGolfAthlete {
  id?: string;
  displayName?: string;
  shortName?: string;
  fullName?: string;
  headshot?: { href?: string; alt?: string };
  flag?: { href?: string; alt?: string; rel?: string[] };
}

interface EspnGolfScoreType {
  name?: string;
  displayName?: string;
  displayValue?: string;
}

interface EspnGolfLineScore {
  value?: number;
  displayValue?: string;
  period?: number;
  par?: number;
  scoreType?: EspnGolfScoreType;
  linescores?: EspnGolfLineScore[];
  statistics?: {
    categories?: Array<{
      stats?: Array<{ value?: number; displayValue?: string }>;
    }>;
  };
}

interface EspnGolfCompetitorStatus {
  period?: number;
  displayValue?: string;
  teeTime?: string;
  startHole?: number;
  thru?: number;
  position?: { id?: string; displayName?: string; isTie?: boolean };
  type?: { state?: string; description?: string; shortDetail?: string };
}

interface EspnGolfCompetitor {
  id?: string;
  order?: number;
  type?: string;
  athlete?: EspnGolfAthlete | EspnRef;
  status?: EspnGolfCompetitorStatus | EspnRef | null;
  score?: string | { value?: number; displayValue?: string; completedRoundsValue?: number; completedRoundsDisplayValue?: string } | EspnRef;
  linescores?: EspnGolfLineScore[] | EspnRef;
  statistics?: EspnRef | Array<Record<string, unknown>>;
  winner?: boolean;
  movement?: number;
  earnings?: number;
  amateur?: boolean;
}

interface EspnGolfCompetition {
  id?: string;
  date?: string;
  endDate?: string;
  competitors?: EspnGolfCompetitor[];
  status?: EspnCompetition["status"] | EspnRef;
}

interface EspnGolfEvent {
  id?: string;
  name?: string;
  shortName?: string;
  date?: string;
  endDate?: string;
  status?: EspnCompetition["status"];
  competitions?: EspnGolfCompetition[];
  links?: Array<{ href?: string; text?: string; shortText?: string; rel?: string[] }>;
}

interface EspnGolfCalendarEvent {
  id?: string;
  label?: string;
  startDate?: string;
  endDate?: string;
  event?: EspnRef;
}

interface EspnGolfScoreboard {
  leagues?: Array<{
    id?: string;
    name?: string;
    abbreviation?: string;
    slug?: string;
    season?: {
      year?: number;
      startDate?: string;
      endDate?: string;
      displayName?: string;
      type?: { id?: string; name?: string };
    };
    logos?: EspnLogo[];
    calendar?: EspnGolfCalendarEvent[];
  }>;
  events?: EspnGolfEvent[];
}

interface EspnGolfCoreEvent {
  id?: string;
  name?: string;
  shortName?: string;
  date?: string;
  endDate?: string;
  status?: EspnCompetition["status"];
  competitions?: EspnGolfCompetition[];
  venues?: EspnRef[];
  defendingChampion?: { athlete?: EspnGolfAthlete };
  winner?: { athlete?: EspnGolfAthlete | EspnRef };
  purse?: number;
  tournament?: EspnRef;
}

interface EspnGolfEventRefs {
  count?: number;
  items?: EspnRef[];
}

interface EspnGolfCourse {
  id?: string;
  name?: string;
  fullName?: string;
  address?: { city?: string; state?: string; country?: string };
  totalYards?: number;
  shotsToPar?: number;
  holes?: Array<{ number?: number; shotsToPar?: number; totalYards?: number }>;
}

interface EspnGolfStatistic {
  name?: string;
  displayName?: string;
  shortDisplayName?: string;
  abbreviation?: string;
  value?: number;
  displayValue?: string;
}

interface EspnGolfStatistics {
  splits?: {
    categories?: Array<{
      stats?: EspnGolfStatistic[];
    }>;
  };
}

interface EspnGolfLineScoreCollection {
  items?: EspnGolfLineScore[];
}

interface GolfLeaderboardRow {
  id: string;
  position: string;
  player: string;
  country: string;
  countryFlag?: string;
  total: string;
  today: string;
  thru: string;
  round: string;
  strokes: string;
  rounds: string[];
  currentRound?: EspnGolfLineScore;
  startHole?: string;
  status?: string;
  earnings?: string;
  fedExPoints?: string;
}

interface GolfScheduleEvent {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  status: "upcoming" | "current" | "completed";
  detail?: EspnGolfCoreEvent | null;
  course?: EspnGolfCourse | null;
  winnerName?: string;
  winnerEarnings?: string;
}

interface GolfSnapshot {
  scoreboard: EspnGolfScoreboard;
  event: EspnGolfEvent | null;
  detail: EspnGolfCoreEvent | null;
  course: EspnGolfCourse | null;
  leader: GolfLeaderboardRow | null;
  rows: GolfLeaderboardRow[];
  season: number;
  mode: "live" | "post" | "teeSheet";
  nextEvent?: EspnGolfCalendarEvent;
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

const PGA_ROUTE = "/sports/golf/pga/";
const PGA_SCOREBOARD_ENDPOINT = "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard";
const PGA_CORE_BASE = "https://sports.core.api.espn.com/v2/sports/golf/leagues/pga";

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

function formatShortDate(date?: string) {
  if (!date) {
    return "TBD";
  }
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(date));
}

function formatDateRange(start?: string, end?: string) {
  if (!start && !end) {
    return "Dates TBD";
  }
  if (!end || start === end) {
    return formatShortDate(start);
  }
  return `${formatShortDate(start)} - ${formatShortDate(end)}`;
}

function formatMoney(value?: number) {
  if (!value || Number.isNaN(value)) {
    return "-";
  }
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatFullMoney(value?: number) {
  if (!value || Number.isNaN(value)) {
    return "-";
  }
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
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
    return competitor.score;
  }
  return competitor.score.displayValue || (competitor.score.value === undefined ? "" : String(competitor.score.value));
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

function isScoredEvent(event?: EspnEvent | null) {
  const state = eventState(event);
  const status = eventStatus(event);
  return state === "in" || state === "post" || status === "STATUS_IN_PROGRESS" || status === "STATUS_FINAL";
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

function normalizeEspnRef(ref?: EspnRef | string) {
  const url = typeof ref === "string" ? ref : ref?.$ref;
  return url?.replace(/^http:\/\//, "https://").replace("sports.core.api.espn.pvt", "sports.core.api.espn.com") ?? "";
}

function idFromRef(ref?: EspnRef | string) {
  const url = normalizeEspnRef(ref);
  const match = url.match(/\/([^/?]+)(?:\?.*)?$/);
  return match?.[1] ?? "";
}

function isEspnRef(value: unknown): value is EspnRef {
  return Boolean(value && typeof value === "object" && "$ref" in value && Object.keys(value).length === 1);
}

async function fetchEspnRef<T>(ref?: EspnRef | string) {
  const url = normalizeEspnRef(ref);
  return url ? fetchJson<T>(url) : null;
}

function golfCompetition(event?: EspnGolfEvent | null) {
  return event?.competitions?.[0];
}

function golfEventState(event?: EspnGolfEvent | null) {
  return event?.status?.type?.state ?? "";
}

function golfEventStatusName(event?: EspnGolfEvent | null) {
  return event?.status?.type?.name ?? "";
}

function isGolfActive(event?: EspnGolfEvent | null) {
  return golfEventState(event) === "in" || golfEventStatusName(event) === "STATUS_IN_PROGRESS";
}

function golfCalendarEvent(calendarEvent: EspnGolfCalendarEvent, state: "pre" | "in" | "post" = "pre"): EspnGolfEvent {
  return {
    id: calendarEvent.id,
    name: calendarEvent.label,
    shortName: calendarEvent.label,
    date: calendarEvent.startDate,
    endDate: calendarEvent.endDate,
    status: {
      type: {
        name: state === "in" ? "STATUS_IN_PROGRESS" : state === "post" ? "STATUS_FINAL" : "STATUS_SCHEDULED",
        state,
        description: state === "in" ? "In Progress" : state === "post" ? "Final" : "Scheduled"
      }
    },
    competitions: [{ id: calendarEvent.id, date: calendarEvent.startDate, endDate: calendarEvent.endDate, competitors: [] }]
  };
}

function golfEventWithCalendarDates(event: EspnGolfEvent, scoreboard: EspnGolfScoreboard) {
  const calendarEvent = (scoreboard.leagues?.[0]?.calendar ?? []).find((item) => item.id === event.id);
  return calendarEvent
    ? {
        ...event,
        name: event.name ?? calendarEvent.label,
        shortName: event.shortName ?? calendarEvent.label,
        date: calendarEvent.startDate ?? event.date,
        endDate: calendarEvent.endDate ?? event.endDate
      }
    : event;
}

function golfCalendar(scoreboard: EspnGolfScoreboard) {
  return [...(scoreboard.leagues?.[0]?.calendar ?? [])].filter((event) => event.id);
}

function golfNextCalendarEvent(scoreboard: EspnGolfScoreboard, now = Date.now()) {
  return golfCalendar(scoreboard)
    .filter((event) => event.startDate && localDayEnd(new Date(event.startDate).getTime()) >= now)
    .sort((a, b) => new Date(a.startDate ?? "").getTime() - new Date(b.startDate ?? "").getTime())[0];
}

function golfPreviousCalendarEvent(scoreboard: EspnGolfScoreboard, now = Date.now()) {
  return golfCalendar(scoreboard)
    .filter((event) => event.endDate && new Date(event.endDate).getTime() < localDayStart(now))
    .sort((a, b) => new Date(b.endDate ?? "").getTime() - new Date(a.endDate ?? "").getTime())[0];
}

function isGolfTeeSheetWindow(event?: EspnGolfCalendarEvent, now = Date.now()) {
  if (!event?.startDate) {
    return false;
  }
  return localDayStart(now) >= localDayStart(new Date(event.startDate).getTime()) - 24 * 60 * 60 * 1000;
}

function chooseGolfDisplay(scoreboard: EspnGolfScoreboard): Pick<GolfSnapshot, "event" | "mode" | "nextEvent"> {
  const events = scoreboard.events ?? [];
  const live = events.find((event) => isGolfActive(event));
  if (live) {
    return { event: golfEventWithCalendarDates(live, scoreboard), mode: "live", nextEvent: golfNextCalendarEvent(scoreboard) };
  }

  const nextEvent = golfNextCalendarEvent(scoreboard);
  if (isGolfTeeSheetWindow(nextEvent)) {
    return { event: nextEvent ? golfCalendarEvent(nextEvent) : null, mode: "teeSheet", nextEvent };
  }

  const completed = events.find((event) => golfEventState(event) === "post" || golfEventStatusName(event) === "STATUS_FINAL");
  if (completed) {
    return { event: golfEventWithCalendarDates(completed, scoreboard), mode: "post", nextEvent };
  }

  const previous = golfPreviousCalendarEvent(scoreboard);
  if (previous) {
    return { event: golfCalendarEvent(previous, "post"), mode: "post", nextEvent };
  }

  const scheduled = events
    .filter((event) => golfEventState(event) === "pre" && (event.date ? new Date(event.date).getTime() >= localDayStart(Date.now()) : true))
    .sort((a, b) => eventTime(a as EspnEvent) - eventTime(b as EspnEvent))[0];
  if (scheduled) {
    return { event: golfEventWithCalendarDates(scheduled, scoreboard), mode: "teeSheet", nextEvent };
  }

  return { event: nextEvent ? golfCalendarEvent(nextEvent) : null, mode: "teeSheet", nextEvent };
}

function golfEventEndpoint(id: string) {
  return `${PGA_CORE_BASE}/events/${id}?lang=en&region=us`;
}

async function loadGolfEventDetail(id?: string) {
  return id ? fetchJson<EspnGolfCoreEvent>(golfEventEndpoint(id)) : null;
}

async function loadGolfEventRefs(season: number) {
  return fetchJson<EspnGolfEventRefs>(`${PGA_CORE_BASE}/events?season=${season}&seasontypes=2&limit=1000&lang=en&region=us`);
}

async function loadGolfCompetitionDetail(eventId?: string) {
  return eventId ? fetchJson<EspnGolfCompetition>(`${PGA_CORE_BASE}/events/${eventId}/competitions/${eventId}?lang=en&region=us`) : null;
}

async function loadGolfCourse(eventId?: string, detail?: EspnGolfCoreEvent | null) {
  const venueId = idFromRef(detail?.venues?.[0]);
  if (!eventId || !venueId) {
    return null;
  }

  try {
    return await fetchJson<EspnGolfCourse>(`${PGA_CORE_BASE}/events/${eventId}/courses/${venueId}?lang=en&region=us`);
  } catch {
    try {
      return await fetchJson<EspnGolfCourse>(`${PGA_CORE_BASE}/venues/${venueId}?lang=en&region=us`);
    } catch {
      return null;
    }
  }
}

function golfLocation(course?: EspnGolfCourse | null) {
  const address = course?.address;
  return [address?.city, address?.state || address?.country].filter(Boolean).join(", ") || "Location TBD";
}

function golfCourseName(course?: EspnGolfCourse | null) {
  return course?.name ?? course?.fullName ?? "Course TBD";
}

function golfAthleteName(athlete?: EspnGolfAthlete | EspnRef) {
  return athlete && !isEspnRef(athlete) ? athlete.displayName ?? athlete.fullName ?? athlete.shortName ?? "Player TBD" : "Player TBD";
}

function golfAthleteCountry(athlete?: EspnGolfAthlete | EspnRef) {
  return athlete && !isEspnRef(athlete) ? athlete.flag?.alt ?? "" : "";
}

function golfAthleteFlag(athlete?: EspnGolfAthlete | EspnRef) {
  return athlete && !isEspnRef(athlete) ? athlete.flag?.href ?? "" : "";
}

function golfAthleteId(athlete?: EspnGolfAthlete | EspnRef) {
  return athlete && !isEspnRef(athlete) ? athlete.id ?? "" : idFromRef(athlete);
}

function golfScoreDisplay(score?: EspnGolfCompetitor["score"]) {
  if (!score) {
    return "-";
  }
  if (typeof score === "string") {
    return score || "-";
  }
  if (isEspnRef(score)) {
    return "-";
  }
  return score.displayValue ?? score.completedRoundsDisplayValue ?? (score.value === undefined ? "-" : String(score.value));
}

function golfLineScores(competitor: EspnGolfCompetitor) {
  return Array.isArray(competitor.linescores) ? [...competitor.linescores].sort((a, b) => (a.period ?? 0) - (b.period ?? 0)) : [];
}

function golfRoundDisplay(linescores: EspnGolfLineScore[], round: number) {
  return linescores.find((line) => line.period === round)?.displayValue ?? "-";
}

function golfCurrentRound(linescores: EspnGolfLineScore[]) {
  return linescores[linescores.length - 1];
}

async function resolveGolfAthlete(athlete?: EspnGolfAthlete | EspnRef) {
  if (!athlete || !isEspnRef(athlete)) {
    return athlete;
  }
  return fetchEspnRef<EspnGolfAthlete>(athlete);
}

async function resolveGolfStatus(status?: EspnGolfCompetitorStatus | EspnRef | null) {
  if (!status || !isEspnRef(status)) {
    return status;
  }
  return fetchEspnRef<EspnGolfCompetitorStatus>(status);
}

async function resolveGolfScore(score?: EspnGolfCompetitor["score"]) {
  if (!score || typeof score === "string" || !isEspnRef(score)) {
    return score;
  }
  return fetchEspnRef<Exclude<EspnGolfCompetitor["score"], string | EspnRef | undefined>>(score);
}

async function resolveGolfLineScores(linescores?: EspnGolfLineScore[] | EspnRef) {
  if (Array.isArray(linescores)) {
    return [...linescores].sort((a, b) => (a.period ?? 0) - (b.period ?? 0));
  }
  if (!linescores || !isEspnRef(linescores)) {
    return [];
  }
  const collection = await fetchEspnRef<EspnGolfLineScoreCollection>(linescores);
  return [...(collection?.items ?? [])].sort((a, b) => (a.period ?? 0) - (b.period ?? 0));
}

function formatGolfTeeTime(value?: string) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
  }

  const match = value.match(/\b(\d{1,2}):(\d{2})(?::\d{2})?\b/);
  if (!match) {
    return "";
  }
  const hour = Number(match[1]);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${match[2]} ${suffix}`;
}

function golfRoundTeeTime(round?: EspnGolfLineScore, status?: EspnGolfCompetitorStatus | EspnRef | null) {
  if (status && !isEspnRef(status)) {
    const statusTime = formatGolfTeeTime(status.teeTime ?? status.displayValue);
    if (statusTime) {
      return statusTime;
    }
  }
  return formatGolfTeeTime(round?.statistics?.categories?.[0]?.stats?.[6]?.displayValue);
}

function golfRoundHasScore(round?: EspnGolfLineScore) {
  return Boolean(round?.displayValue && round.displayValue !== "-");
}

function golfCompletedHoles(round?: EspnGolfLineScore) {
  const holes = round?.linescores?.length ?? 0;
  if (holes >= 18) {
    return "F";
  }
  if (holes > 0) {
    return String(holes);
  }
  return golfRoundHasScore(round) ? "1" : "";
}

function golfRoundThru(round?: EspnGolfLineScore, status?: EspnGolfCompetitorStatus | EspnRef | null) {
  const completedHoles = golfCompletedHoles(round);
  if (golfRoundHasScore(round) && completedHoles) {
    return completedHoles;
  }
  if (status && !isEspnRef(status) && status.thru !== undefined) {
    if (status.thru <= 0) {
      return completedHoles || golfRoundTeeTime(round, status) || "-";
    }
    return status.thru >= 18 ? "F" : String(status.thru);
  }
  const statValue = round?.statistics?.categories?.[0]?.stats?.[5]?.displayValue;
  if (statValue === "0") {
    return completedHoles || golfRoundTeeTime(round, status) || "-";
  }
  if (statValue && statValue !== "0") {
    return statValue === "18" ? "F" : statValue;
  }
  if ((round?.linescores?.length ?? 0) >= 18) {
    return "F";
  }
  return statValue ?? "-";
}

function golfHolePar(course: EspnGolfCourse | null | undefined, holeNumber: number, line?: EspnGolfLineScore) {
  return line?.par ?? course?.holes?.find((hole) => hole.number === holeNumber)?.shotsToPar;
}

function golfHoleScore(line?: EspnGolfLineScore) {
  const value = typeof line?.value === "number" && line.value > 0 ? line.value : Number(line?.displayValue);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function golfHoleToPar(line?: EspnGolfLineScore, par?: number) {
  const scoreType = line?.scoreType?.displayValue;
  if (scoreType === "E") {
    return 0;
  }
  if (scoreType && /^[+-]?\d+$/.test(scoreType)) {
    return Number(scoreType);
  }
  const score = golfHoleScore(line);
  return score !== undefined && par !== undefined ? score - par : undefined;
}

function golfHoleScoreClass(toPar?: number) {
  if (toPar === undefined || toPar === 0) {
    return "";
  }
  if (toPar <= -2) {
    return "is-eagle";
  }
  if (toPar === -1) {
    return "is-birdie";
  }
  if (toPar === 1) {
    return "is-bogey";
  }
  return "is-double-bogey";
}

function golfCoreCompetitors(detail?: EspnGolfCoreEvent | null, competition?: EspnGolfCompetition | null) {
  return detail?.competitions?.[0]?.competitors ?? competition?.competitors ?? [];
}

function golfWinnerEarnings(detail?: EspnGolfCoreEvent | null, competition?: EspnGolfCompetition | null) {
  const winnerAthleteId = golfAthleteId(detail?.winner?.athlete);
  const winner =
    golfCoreCompetitors(detail, competition).find((competitor) => competitor.winner) ??
    golfCoreCompetitors(detail, competition).find((competitor) => winnerAthleteId && golfAthleteId(competitor.athlete) === winnerAthleteId) ??
    golfCoreCompetitors(detail, competition).find((competitor) => competitor.order === 1);
  return winner?.earnings ? formatFullMoney(winner.earnings) : "-";
}

async function golfWinnerName(detail?: EspnGolfCoreEvent | null) {
  if (!detail?.winner?.athlete) {
    return "-";
  }
  const athlete = await resolveGolfAthlete(detail.winner.athlete).catch(() => detail.winner?.athlete);
  return golfAthleteName(athlete ?? detail.winner.athlete);
}

function golfStatistic(stats: EspnGolfStatistics | null | undefined, names: string[]) {
  const normalized = new Set(names);
  return stats?.splits?.categories?.flatMap((category) => category.stats ?? []).find((stat) => stat.name && normalized.has(stat.name));
}

async function hydrateGolfPostResults(eventId: string | undefined, detail: EspnGolfCoreEvent | null, rows: GolfLeaderboardRow[]) {
  if (!eventId || !rows.length) {
    return;
  }

  let competition: EspnGolfCompetition | null = null;
  if (!detail?.competitions?.[0]?.competitors?.length) {
    try {
      competition = await loadGolfCompetitionDetail(eventId);
    } catch {
      competition = null;
    }
  }
  const coreById = new Map(golfCoreCompetitors(detail, competition).map((competitor) => [competitor.id, competitor]));
  const queue = rows.slice();
  const worker = async () => {
    while (queue.length) {
      const row = queue.shift();
      if (!row) {
        return;
      }
      const core = coreById.get(row.id);
      if (core?.earnings) {
        row.earnings = formatFullMoney(core.earnings);
      }
      if (!core?.statistics || !isEspnRef(core.statistics)) {
        row.earnings = row.earnings ?? "-";
        row.fedExPoints = row.fedExPoints ?? "-";
        continue;
      }
      try {
        const stats = await fetchEspnRef<EspnGolfStatistics>(core.statistics);
        const earnings = golfStatistic(stats, ["amount", "officialAmount"]);
        const fedEx = golfStatistic(stats, ["cupPoints"]);
        row.earnings = earnings?.displayValue ?? (earnings?.value === undefined ? row.earnings ?? "-" : formatFullMoney(earnings.value));
        row.fedExPoints = fedEx?.displayValue ?? (fedEx?.value === undefined ? "-" : String(fedEx.value));
      } catch {
        row.earnings = row.earnings ?? "-";
        row.fedExPoints = row.fedExPoints ?? "-";
      }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker(), worker(), worker(), worker(), worker()]);
}

async function loadGolfCoreRows(eventId: string | undefined, detail: EspnGolfCoreEvent | null, mode: GolfSnapshot["mode"]) {
  if (!eventId) {
    return [];
  }

  const competition = await loadGolfCompetitionDetail(eventId).catch(() => null);
  const competitors = golfCoreCompetitors(detail, competition);
  const rows: GolfLeaderboardRow[] = [];
  const queue = competitors.slice().sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  const worker = async () => {
    while (queue.length) {
      const competitor = queue.shift();
      if (!competitor?.id) {
        continue;
      }
      try {
        const [athlete, status, score, linescores] = await Promise.all([
          resolveGolfAthlete(competitor.athlete),
          resolveGolfStatus(competitor.status),
          mode === "teeSheet" ? Promise.resolve(competitor.score) : resolveGolfScore(competitor.score),
          mode === "teeSheet" ? Promise.resolve([]) : resolveGolfLineScores(competitor.linescores)
        ]);
        const currentRound = golfCurrentRound(linescores);
        rows.push({
          id: competitor.id,
          position: mode === "teeSheet" ? String(competitor.order ?? rows.length + 1) : status?.position?.displayName ?? String(competitor.order ?? "-"),
          player: golfAthleteName(athlete ?? competitor.athlete),
          country: golfAthleteCountry(athlete ?? competitor.athlete),
          countryFlag: golfAthleteFlag(athlete ?? competitor.athlete),
          total: mode === "teeSheet" ? "-" : golfScoreDisplay(score ?? undefined),
          today: currentRound?.displayValue ?? "-",
          thru: mode === "teeSheet" ? golfRoundTeeTime(undefined, status) || "TBD" : golfRoundThru(currentRound, status),
          round: currentRound?.period ? `R${currentRound.period}` : "-",
          strokes: golfTotalStrokes(linescores, score ?? undefined),
          rounds: [1, 2, 3, 4].map((round) => golfRoundDisplay(linescores, round)),
          currentRound,
          startHole: status?.startHole ? String(status.startHole) : "-",
          status: status?.type?.shortDetail ?? status?.type?.description ?? (mode === "teeSheet" ? "Scheduled" : "-"),
          earnings: competitor.earnings ? formatFullMoney(competitor.earnings) : "-",
          fedExPoints: "-"
        });
      } catch {
        rows.push({
          id: competitor.id,
          position: String(competitor.order ?? rows.length + 1),
          player: "Player TBD",
          country: "",
          total: "-",
          today: "-",
          thru: mode === "teeSheet" ? "TBD" : "-",
          round: "-",
          strokes: "-",
          rounds: ["-", "-", "-", "-"],
          startHole: "-",
          status: mode === "teeSheet" ? "Scheduled" : "-",
          earnings: "-",
          fedExPoints: "-"
        });
      }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker(), worker(), worker(), worker(), worker()]);
  return rows.sort((a, b) => Number(a.position) - Number(b.position));
}

function golfTotalStrokes(linescores: EspnGolfLineScore[], score?: EspnGolfCompetitor["score"]) {
  if (score && typeof score === "object" && !isEspnRef(score) && score.value !== undefined) {
    return String(score.value);
  }
  const total = linescores.reduce((sum, line) => sum + (line.displayValue === "-" ? 0 : line.value ?? 0), 0);
  return total > 0 ? String(total) : "-";
}

function buildGolfLeaderboardRows(event?: EspnGolfEvent | null): GolfLeaderboardRow[] {
  const competitors = golfCompetition(event)?.competitors ?? [];
  return competitors
    .filter((competitor) => competitor.id)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    .map((competitor) => {
      const linescores = golfLineScores(competitor);
      const currentRound = golfCurrentRound(linescores);
      const status = competitor.status;
      const position = status && !isEspnRef(status) ? status.position?.displayName ?? String(competitor.order ?? "-") : String(competitor.order ?? "-");
      return {
        id: competitor.id ?? "",
        position,
        player: golfAthleteName(competitor.athlete),
        country: golfAthleteCountry(competitor.athlete),
        countryFlag: golfAthleteFlag(competitor.athlete),
        total: golfScoreDisplay(competitor.score),
        today: currentRound?.displayValue ?? "-",
        thru: golfRoundThru(currentRound, status),
        round: currentRound?.period ? `R${currentRound.period}` : "-",
        strokes: golfTotalStrokes(linescores, competitor.score),
        rounds: [1, 2, 3, 4].map((round) => golfRoundDisplay(linescores, round)),
        currentRound,
        earnings: "-",
        fedExPoints: "-"
      };
    });
}

async function hydrateGolfTeeTimes(eventId: string | undefined, rows: GolfLeaderboardRow[]) {
  const pendingRows = rows.filter((row) => row.today === "-" && row.id);
  if (!eventId || !pendingRows.length) {
    return;
  }

  const queue = pendingRows.slice();
  const worker = async () => {
    while (queue.length) {
      const row = queue.shift();
      if (!row) {
        return;
      }
      try {
        const status = await fetchJson<EspnGolfCompetitorStatus>(`${PGA_CORE_BASE}/events/${eventId}/competitions/${eventId}/competitors/${row.id}/status?lang=en&region=us`);
        row.thru = golfRoundThru(row.currentRound, status);
      } catch {
        row.thru = row.thru || "-";
      }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
}

async function loadGolfSnapshot() {
  const scoreboard = await fetchJson<EspnGolfScoreboard>(PGA_SCOREBOARD_ENDPOINT);
  const season = scoreboard.leagues?.[0]?.season?.year ?? new Date().getFullYear();
  const selection = chooseGolfDisplay(scoreboard);
  const event = selection.event;
  const [detail, rows] = await Promise.all([
    loadGolfEventDetail(event?.id),
    Promise.resolve(selection.mode === "teeSheet" ? [] : buildGolfLeaderboardRows(event))
  ]);
  if (!rows.length && event?.id) {
    rows.push(...(await loadGolfCoreRows(event.id, detail, selection.mode)));
  }
  if (selection.mode === "post") {
    await hydrateGolfPostResults(event?.id, detail, rows);
  }
  const [course] = await Promise.all([
    loadGolfCourse(event?.id, detail),
    selection.mode === "live" ? hydrateGolfTeeTimes(event?.id, rows) : Promise.resolve()
  ]);
  return { scoreboard, event, detail, course, rows, leader: rows[0] ?? null, season, mode: selection.mode, nextEvent: selection.nextEvent };
}

function renderPgaCard(root: HTMLElement, snapshot?: GolfSnapshot, error?: unknown) {
  const link = document.createElement("a");
  link.className = "sports-team-card sports-pga-card";
  link.href = PGA_ROUTE;
  link.setAttribute("aria-label", "PGA Tour leaderboard");
  link.innerHTML = `
    <div class="sports-team-card__identity">
      <div class="sports-team-card__logo-frame sports-pga-card__mark" aria-hidden="true">PGA</div>
      <div>
        <div class="sports-team-card__league">PGA Tour</div>
        <h2 data-pga-event>PGA Leaderboard</h2>
      </div>
    </div>
    <div class="sports-team-card__record">
      <strong data-pga-leader>Loading</strong>
      <span data-pga-leader-stats>ESPN leaderboard</span>
    </div>
    <div class="sports-team-card__next">
      <span data-pga-course>Loading course</span>
      <strong data-pga-location>Location pending</strong>
      <small data-pga-date></small>
    </div>
  `;
  root.appendChild(link);

  if (!snapshot) {
    link.querySelector("[data-pga-event]")?.replaceChildren(document.createTextNode("PGA Tour"));
    link.querySelector("[data-pga-leader]")?.replaceChildren(document.createTextNode("Unavailable"));
    link.querySelector("[data-pga-leader-stats]")?.replaceChildren(document.createTextNode(error instanceof Error ? error.message : "ESPN data failed"));
    link.querySelector("[data-pga-course]")?.replaceChildren(document.createTextNode("Schedule"));
    link.querySelector("[data-pga-location]")?.replaceChildren(document.createTextNode("Details unavailable"));
    return;
  }

  const leader = snapshot.leader;
  const isLive = isGolfActive(snapshot.event);
  const isTeeSheet = snapshot.mode === "teeSheet";
  const leaderLine =
    isTeeSheet
      ? leader
        ? `First listed tee time ${leader.thru}`
        : "Tee times pending"
      : isLive && leader
      ? leader.today === "-"
        ? `${leader.position} • ${leader.total} total • ${leader.thru === "-" ? "Not teed off today" : `Tee time ${leader.thru}`}`
        : `${leader.position} • ${leader.total} total • ${leader.today} today • Thru ${leader.thru}`
      : leader
        ? `${leader.position} • ${leader.total} final • Earnings ${leader.earnings ?? "-"}`
        : "Final results";
  link.querySelector("[data-pga-event]")?.replaceChildren(document.createTextNode(snapshot.event?.name ?? "PGA Tour"));
  link.querySelector("[data-pga-leader]")?.replaceChildren(document.createTextNode(leader ? leader.player : isTeeSheet ? "Tee sheet pending" : "Leaderboard pending"));
  link.querySelector("[data-pga-leader-stats]")?.replaceChildren(document.createTextNode(leaderLine));
  link.querySelector("[data-pga-course]")?.replaceChildren(document.createTextNode(golfCourseName(snapshot.course)));
  link.querySelector("[data-pga-location]")?.replaceChildren(document.createTextNode(golfLocation(snapshot.course)));
  link.querySelector("[data-pga-date]")?.replaceChildren(document.createTextNode(formatDateRange(snapshot.event?.date, snapshot.event?.endDate ?? snapshot.detail?.endDate)));
  link.classList.add("is-loaded");
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
  status && (status.textContent = "Loading ESPN sports cards.");
  const [teamResults, golfResults] = await Promise.all([
    Promise.allSettled(FEATURED_TEAMS.map((config, index) =>
      loadTeamSnapshot(config, { includeSchedule: true, includeEventSummary: false }).then((snapshot) => ({ config, index, snapshot }))
    )),
    Promise.allSettled([loadGolfSnapshot()])
  ]);

  const cards = teamResults.map((result, index) =>
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
  const golfResult = golfResults[0];
  renderPgaCard(root, golfResult?.status === "fulfilled" ? golfResult.value : undefined, golfResult?.status === "rejected" ? golfResult.reason : undefined);
  status && (status.textContent = "Live cards use active ESPN scoreboards, otherwise next event details from ESPN.");
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

function renderPgaHero(snapshot: GolfSnapshot) {
  const hero = document.createElement("section");
  hero.className = "sports-team-hero sports-pga-hero";
  hero.dataset.pgaHero = "";

  const mark = document.createElement("div");
  mark.className = "sports-pga-hero__mark";
  mark.textContent = "PGA";

  const content = document.createElement("div");
  content.className = "sports-team-hero__content";

  const league = document.createElement("div");
  league.className = "sports-team-card__league";
  league.textContent = `PGA Tour ${snapshot.season}`;
  const title = document.createElement("h2");
  title.textContent = snapshot.event?.name ?? "PGA Tour";

  const meta = document.createElement("div");
  meta.className = "sports-team-hero__meta sports-pga-meta";
  [
    ["Dates", formatDateRange(snapshot.event?.date, snapshot.event?.endDate ?? snapshot.detail?.endDate)],
    ["Course", golfCourseName(snapshot.course)],
    ["Location", golfLocation(snapshot.course)],
    ["Purse", formatMoney(snapshot.detail?.purse)],
    ["Defending Champion", snapshot.detail?.defendingChampion?.athlete?.displayName ?? "-"],
    ["Par/Yards", snapshot.course?.shotsToPar ? `Par ${snapshot.course.shotsToPar}${snapshot.course.totalYards ? ` • ${snapshot.course.totalYards.toLocaleString()} yards` : ""}` : "-"]
  ].forEach(([label, value]) => {
    const item = document.createElement("span");
    item.innerHTML = `<small></small><strong></strong>`;
    item.querySelector("small")?.replaceChildren(document.createTextNode(label));
    item.querySelector("strong")?.replaceChildren(document.createTextNode(value));
    meta.appendChild(item);
  });

  content.append(league, title, meta);
  hero.append(mark, content);
  return hero;
}

function renderPgaScorecard(row: GolfLeaderboardRow, course?: EspnGolfCourse | null) {
  const scorecard = document.createElement("div");
  scorecard.className = "sports-pga-scorecard";
  const holes = row.currentRound?.linescores?.slice().sort((a, b) => (a.period ?? 0) - (b.period ?? 0)) ?? [];
  if (!holes.length) {
    scorecard.innerHTML = `<p class="sports-empty-state">Current round scorecard is not available yet.</p>`;
    return scorecard;
  }

  const roundLabel = row.currentRound?.period ? `Round ${row.currentRound.period}` : "Current round";
  const byHole = new Map(holes.map((hole) => [hole.period ?? 0, hole]));
  const holeNumbers = Array.from({ length: 18 }, (_, index) => index + 1);
  const front = holeNumbers.slice(0, 9);
  const back = holeNumbers.slice(9);
  const columns = [...front, "OUT", ...back, "IN", "TOT"];
  const parFor = (holeNumber: number) => golfHolePar(course, holeNumber, byHole.get(holeNumber));
  const scoreFor = (holeNumber: number) => golfHoleScore(byHole.get(holeNumber));
  const sum = (numbers: number[], getValue: (holeNumber: number) => number | undefined) => {
    const values = numbers.map(getValue).filter((value): value is number => value !== undefined);
    return values.length ? String(values.reduce((total, value) => total + value, 0)) : "-";
  };

  const toolbar = document.createElement("div");
  toolbar.className = "sports-pga-scorecard__toolbar";
  const round = document.createElement("span");
  round.className = "sports-pga-scorecard__round";
  round.textContent = roundLabel;
  toolbar.appendChild(round);

  const grid = document.createElement("div");
  grid.className = "sports-pga-scorecard__grid";

  const addCell = (line: HTMLElement, text: string, className = "") => {
    const span = document.createElement("span");
    if (className) {
      span.className = className;
    }
    span.textContent = text;
    line.appendChild(span);
    return span;
  };

  const addLine = (label: string, values: string[], className = "") => {
    const line = document.createElement("div");
    line.className = className ? `sports-pga-scorecard__row ${className}` : "sports-pga-scorecard__row";
    addCell(line, label, "sports-pga-scorecard__label");
    values.forEach((value) => addCell(line, value));
    grid.appendChild(line);
  };

  const holeLabels = columns.map((column) => String(column));
  const parValues = [
    ...front.map((holeNumber) => String(parFor(holeNumber) ?? "-")),
    sum(front, parFor),
    ...back.map((holeNumber) => String(parFor(holeNumber) ?? "-")),
    sum(back, parFor),
    sum(holeNumbers, parFor)
  ];

  const scoreLine = document.createElement("div");
  scoreLine.className = "sports-pga-scorecard__row sports-pga-scorecard__row--score";
  addCell(scoreLine, "Score", "sports-pga-scorecard__label");
  columns.forEach((column) => {
    if (typeof column === "string") {
      const numbers = column === "OUT" ? front : column === "IN" ? back : holeNumbers;
      addCell(scoreLine, sum(numbers, scoreFor), "sports-pga-scorecard__summary");
      return;
    }
    const hole = byHole.get(column);
    const score = golfHoleScore(hole);
    const toPar = golfHoleToPar(hole, parFor(column));
    const cell = addCell(scoreLine, score === undefined ? "-" : String(score), golfHoleScoreClass(toPar));
    if (toPar !== undefined) {
      cell.title = `${toPar === 0 ? "Par" : toPar < 0 ? `${Math.abs(toPar)} under par` : `${toPar} over par`} on hole ${column}`;
    }
  });

  addLine("Hole", holeLabels, "sports-pga-scorecard__row--head");
  addLine("Par", parValues, "sports-pga-scorecard__row--par");
  grid.appendChild(scoreLine);

  const legend = document.createElement("div");
  legend.className = "sports-pga-scorecard__legend";
  [
    ["is-eagle", "Eagle or better"],
    ["is-birdie", "Birdie"],
    ["is-bogey", "Bogey"],
    ["is-double-bogey", "Double bogey or more"]
  ].forEach(([className, label]) => {
    const item = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.className = className;
    item.append(swatch, document.createTextNode(label));
    legend.appendChild(item);
  });

  scorecard.append(toolbar, grid, legend);

  return scorecard;
}

function renderPgaLeaderboard(snapshot: GolfSnapshot) {
  const panel = createPanel(snapshot.mode === "teeSheet" ? "Tee Times" : "Leaderboard", "sports-pga-leaderboard-panel");
  panel.dataset.pgaLeaderboard = "";
  const rows = snapshot.rows;
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "sports-empty-state";
    empty.textContent =
      snapshot.mode === "teeSheet"
        ? "Participants and tee times will appear when ESPN publishes the tee sheet."
        : isGolfActive(snapshot.event)
          ? "ESPN has not returned leaderboard rows yet."
          : "Leaderboard will appear when tournament scoring is available.";
    panel.appendChild(empty);
    return panel;
  }

  const expandedPlayers = new Set<string>();
  let showAll = false;
  const table = document.createElement("div");
  table.className = snapshot.mode === "teeSheet" ? "sports-pga-leaderboard sports-pga-leaderboard--tee-sheet" : "sports-pga-leaderboard";
  const toggle = document.createElement("button");
  toggle.className = "sports-pga-toggle";
  toggle.type = "button";

  const headers =
    snapshot.mode === "teeSheet"
      ? ["#", "Player", "Tee Time", "Start", "Status"]
      : snapshot.mode === "post"
        ? ["Pos", "Player", "Total", "R1", "R2", "R3", "R4", "Strokes", "Earnings", "FedEx"]
        : ["Pos", "Player", "Total", "Today", "Thru", "R1", "R2", "R3", "R4", "Strokes"];
  const rowValues = (row: GolfLeaderboardRow): Array<string | HTMLElement> =>
    snapshot.mode === "teeSheet"
      ? [row.position, createPgaPlayerCell(row), row.thru, row.startHole ?? "-", row.status ?? "Scheduled"]
      : snapshot.mode === "post"
        ? [row.position, createPgaPlayerCell(row), row.total, ...row.rounds, row.strokes, row.earnings ?? "-", row.fedExPoints ?? "-"]
        : [row.position, createPgaPlayerCell(row), row.total, row.today, row.thru, ...row.rounds, row.strokes];

  const togglePlayer = (row: GolfLeaderboardRow) => {
    if (expandedPlayers.has(row.id)) {
      expandedPlayers.delete(row.id);
    } else {
      expandedPlayers.add(row.id);
    }
    renderRows();
  };

  const createPgaPlayerCell = (row: GolfLeaderboardRow) => {
    const player = document.createElement("span");
    player.className = "sports-pga-player";
    const playerName = document.createElement("span");
    playerName.textContent = row.player;
    player.appendChild(playerName);
    if (row.countryFlag) {
      const flag = document.createElement("img");
      flag.src = row.countryFlag;
      flag.alt = row.country ? `${row.country} flag` : "";
      flag.loading = "lazy";
      player.appendChild(flag);
    }
    return player;
  };

  const renderRows = () => {
    table.replaceChildren();
    const head = document.createElement("div");
    head.className = "sports-pga-leaderboard__row sports-pga-leaderboard__row--head";
    headers.forEach((label) => {
      const span = document.createElement("span");
      span.textContent = label;
      head.appendChild(span);
    });
    table.appendChild(head);

    rows.slice(0, showAll ? rows.length : 10).forEach((row) => {
      const line = document.createElement("div");
      line.className = "sports-pga-leaderboard__row";
      line.setAttribute("role", "button");
      line.setAttribute("tabindex", "0");
      line.setAttribute("aria-expanded", String(expandedPlayers.has(row.id)));
      line.setAttribute("aria-label", `${expandedPlayers.has(row.id) ? "Collapse" : "Expand"} ${row.player} scorecard`);
      line.addEventListener("click", () => togglePlayer(row));
      line.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          togglePlayer(row);
        }
      });
      rowValues(row).forEach((value) => {
        if (value instanceof HTMLElement) {
          line.appendChild(value);
          return;
        }
        const span = document.createElement("span");
        span.textContent = value;
        line.appendChild(span);
      });
      table.appendChild(line);
      if (expandedPlayers.has(row.id)) {
        const expanded = document.createElement("div");
        expanded.className = "sports-pga-leaderboard__expanded";
        expanded.appendChild(renderPgaScorecard(row, snapshot.course));
        table.appendChild(expanded);
      }
    });

    toggle.textContent = showAll ? "Show top 10" : `Show full leaderboard (${rows.length})`;
  };

  toggle.addEventListener("click", () => {
    showAll = !showAll;
    renderRows();
  });
  renderRows();
  panel.append(table, toggle);
  return panel;
}

function golfScheduleStatus(event: EspnGolfCalendarEvent, activeEventId?: string): GolfScheduleEvent["status"] {
  const now = Date.now();
  const start = event.startDate ? new Date(event.startDate).getTime() : 0;
  const end = event.endDate ? new Date(event.endDate).getTime() : start;
  if (event.id && event.id === activeEventId) {
    return "current";
  }
  if (start && end && now >= start && now <= end + 24 * 60 * 60 * 1000) {
    return "current";
  }
  return end && end < localDayStart(now) ? "completed" : "upcoming";
}

function golfScheduleEvents(snapshot: GolfSnapshot): GolfScheduleEvent[] {
  const calendar = snapshot.scoreboard.leagues?.[0]?.calendar ?? [];
  return calendar
    .filter((event): event is EspnGolfCalendarEvent & { id: string } => Boolean(event.id))
    .map((event) => ({
      id: event.id,
      name: event.label ?? "PGA event",
      startDate: event.startDate,
      endDate: event.endDate,
      status: golfScheduleStatus(event, snapshot.event?.id)
    }))
    .sort((a, b) => {
      if (a.status === b.status) {
        const direction = a.status === "completed" ? -1 : 1;
        return direction * (new Date(a.startDate ?? "").getTime() - new Date(b.startDate ?? "").getTime());
      }
      const order: Record<GolfScheduleEvent["status"], number> = { current: 0, upcoming: 1, completed: 2 };
      return order[a.status] - order[b.status];
    });
}

function renderPgaScheduleRow(event: GolfScheduleEvent) {
  const row = document.createElement("article");
  row.className = event.status === "current" ? "sports-pga-schedule-row is-current" : "sports-pga-schedule-row";
  row.dataset.pgaScheduleId = event.id;

  const date = document.createElement("time");
  date.dateTime = event.startDate ?? "";
  date.textContent = formatDateRange(event.startDate, event.endDate);
  const title = document.createElement("strong");
  title.textContent = event.name;
  const location = document.createElement("span");
  location.dataset.pgaScheduleLocation = "";
  location.textContent = "Location pending";
  const result = document.createElement("span");
  result.dataset.pgaScheduleResult = "";
  result.textContent = event.status === "completed" ? "Winner pending" : "Purse pending";
  row.append(date, title, location, result);
  return row;
}

function updatePgaScheduleRow(root: HTMLElement, event: GolfScheduleEvent) {
  const row = root.querySelector<HTMLElement>(`[data-pga-schedule-id="${event.id}"]`);
  if (!row) {
    return;
  }
  row.querySelector("[data-pga-schedule-location]")?.replaceChildren(document.createTextNode(event.course ? `${golfCourseName(event.course)} • ${golfLocation(event.course)}` : "Location TBD"));
  const winner = event.winnerName ?? (event.detail?.winner?.athlete ? golfAthleteName(event.detail.winner.athlete) : "-");
  const purse = formatMoney(event.detail?.purse);
  const result = event.status === "completed" ? `Winner: ${winner} • Earnings: ${event.winnerEarnings ?? "-"}` : `Purse: ${purse}`;
  row.querySelector("[data-pga-schedule-result]")?.replaceChildren(document.createTextNode(result));
}

function renderPgaSchedule(snapshot: GolfSnapshot) {
  const panel = createPanel("PGA Schedule", "sports-pga-schedule-panel");
  panel.dataset.pgaSchedule = "";
  const list = document.createElement("div");
  list.className = "sports-pga-schedule-list";
  const events = golfScheduleEvents(snapshot);
  if (!events.length) {
    list.innerHTML = `<p class="sports-empty-state">ESPN has not returned the PGA schedule yet.</p>`;
    panel.appendChild(list);
    return panel;
  }

  let lastGroup = "";
  events.forEach((event) => {
    const group = event.status === "completed" ? "Completed" : "Upcoming";
    if (group !== lastGroup) {
      const heading = document.createElement("div");
      heading.className = "sports-schedule-section";
      heading.textContent = group;
      list.appendChild(heading);
      lastGroup = group;
    }
    list.appendChild(renderPgaScheduleRow(event));
  });
  panel.appendChild(list);
  void hydratePgaSchedule(panel, events);
  return panel;
}

async function hydratePgaSchedule(root: HTMLElement, events: GolfScheduleEvent[]) {
  const byId = new Map(events.map((event) => [event.id, event]));
  try {
    const refs = await loadGolfEventRefs(new Date().getFullYear());
    refs.items?.forEach((ref) => {
      const id = idFromRef(ref);
      if (id && !byId.has(id)) {
        byId.set(id, { id, name: `PGA event ${id}`, status: "upcoming" });
      }
    });
  } catch {
    // The scoreboard calendar is the primary schedule source; Core refs only add coverage.
  }

  const queue = events.slice();
  const worker = async () => {
    while (queue.length) {
      const event = queue.shift();
      if (!event) {
        return;
      }
      try {
        event.detail = await loadGolfEventDetail(event.id);
        if (event.status === "completed") {
          let competition: EspnGolfCompetition | null = null;
          if (!event.detail?.competitions?.[0]?.competitors?.length) {
            competition = await loadGolfCompetitionDetail(event.id).catch(() => null);
          }
          event.winnerName = await golfWinnerName(event.detail);
          event.winnerEarnings = golfWinnerEarnings(event.detail, competition);
        }
        event.course = await loadGolfCourse(event.id, event.detail);
        updatePgaScheduleRow(root, event);
      } catch {
        updatePgaScheduleRow(root, event);
      }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
}

function renderPgaSnapshot(root: HTMLElement, snapshot: GolfSnapshot, includeSchedule: boolean) {
  const hero = renderPgaHero(snapshot);
  const leaderboard = renderPgaLeaderboard(snapshot);
  if (includeSchedule || !root.querySelector("[data-pga-schedule]")) {
    root.replaceChildren(hero, leaderboard, renderPgaSchedule(snapshot));
    return;
  }
  root.querySelector("[data-pga-hero]")?.replaceWith(hero);
  root.querySelector("[data-pga-leaderboard]")?.replaceWith(leaderboard);
}

export async function initPgaLeaderboardPage(root: HTMLElement | null) {
  if (!root) {
    return;
  }

  const status = document.querySelector<HTMLElement>("[data-sports-status]");
  status && (status.textContent = "Loading PGA Tour leaderboard...");
  root.className = "sports-team-detail sports-pga-detail is-loading";
  root.replaceChildren();

  const refresh = async (initial = false) => {
    if (initial) {
      root.classList.add("is-loading");
    }
    try {
      const snapshot = await loadGolfSnapshot();
      root.classList.remove("is-loading");
      renderPgaSnapshot(root, snapshot, initial);
      status && (status.textContent = "PGA Tour data loaded from ESPN public JSON endpoints.");
      const refreshMs = isGolfActive(snapshot.event) ? 60000 : snapshot.mode === "teeSheet" ? 300000 : 0;
      if (root.dataset.refreshIntervalId && root.dataset.refreshMs !== String(refreshMs)) {
        window.clearInterval(Number(root.dataset.refreshIntervalId));
        delete root.dataset.refreshIntervalId;
        delete root.dataset.refreshMs;
      }
      if (refreshMs) {
        if (!root.dataset.refreshIntervalId) {
          root.dataset.refreshIntervalId = String(window.setInterval(() => {
            void refresh();
          }, refreshMs));
          root.dataset.refreshMs = String(refreshMs);
        }
      } else if (root.dataset.refreshIntervalId) {
        window.clearInterval(Number(root.dataset.refreshIntervalId));
        delete root.dataset.refreshIntervalId;
        delete root.dataset.refreshMs;
      }
    } catch (error) {
      root.classList.remove("is-loading");
      if (initial) {
        root.innerHTML = `<p class="sports-empty-state">${error instanceof Error ? error.message : "Failed to load PGA Tour details."}</p>`;
      }
      status && (status.textContent = "PGA Tour details failed to load.");
    }
  };

  void refresh(true);
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

function gameOutcome(event: EspnEvent, team: EspnCompetitor | undefined, opponent: EspnCompetitor | undefined) {
  if (!isScoredEvent(event)) {
    return "";
  }
  const teamScore = scoreValue(team);
  const opponentScore = scoreValue(opponent);
  if (teamScore && opponentScore && teamScore === opponentScore) {
    return "T";
  }
  return team?.winner === true ? "W" : team?.winner === false ? "L" : "";
}

function scheduleScoreText(event: EspnEvent, team: EspnCompetitor | undefined, opponent: EspnCompetitor | undefined) {
  if (!isScoredEvent(event)) {
    return "";
  }
  const teamScore = scoreValue(team);
  const opponentScore = scoreValue(opponent);
  return teamScore && opponentScore ? `${teamScore}-${opponentScore}` : "";
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

type BaseballHalfInning = "pre" | "top" | "middle" | "bottom" | "end" | "post" | "unknown";

function baseballInningState(snapshot: TeamSnapshot) {
  const status = snapshotStatus(snapshot);
  const text = gameTimeText(snapshot).toLowerCase();
  const state = status?.type?.state ?? eventState(snapshotEvent(snapshot));
  const inning = status?.period ?? Number(text.match(/\d+/)?.[0] ?? 0);
  let half: BaseballHalfInning = "unknown";

  if (state === "pre") {
    half = "pre";
  } else if (state === "post" || text.includes("final")) {
    half = "post";
  } else if (/\btop\b/.test(text)) {
    half = "top";
  } else if (/\bmid\b|\bmiddle\b/.test(text)) {
    half = "middle";
  } else if (/\bbot\b|\bbottom\b/.test(text)) {
    half = "bottom";
  } else if (/\bend\b/.test(text)) {
    half = "end";
  }

  return { half, inning: Number.isFinite(inning) ? inning : 0 };
}

function baseballInningHasStarted(snapshot: TeamSnapshot, competitor: EspnCompetitor, inning: number) {
  if (competitor.linescores?.[inning - 1]) {
    return true;
  }

  const { half, inning: currentInning } = baseballInningState(snapshot);
  if (!currentInning || half === "pre" || half === "post" || half === "unknown") {
    return false;
  }
  if (inning < currentInning) {
    return true;
  }
  if (inning > currentInning) {
    return false;
  }
  if (competitor.homeAway === "away") {
    return ["top", "middle", "bottom", "end"].includes(half);
  }
  if (competitor.homeAway === "home") {
    return ["bottom", "end"].includes(half);
  }
  return ["top", "bottom", "end"].includes(half);
}

function baseballLinescorePeriods(snapshot: TeamSnapshot, competitors: EspnCompetitor[]) {
  const linescorePeriods = Math.max(0, ...competitors.map((competitor) => competitor.linescores?.length ?? 0));
  return Math.max(9, linescorePeriods, baseballInningState(snapshot).inning);
}

function baseballLinescoreValue(snapshot: TeamSnapshot, competitor: EspnCompetitor, inning: number) {
  const value = competitor.linescores?.[inning - 1]?.displayValue;
  if (value !== undefined && value !== null) {
    return value;
  }
  return baseballInningHasStarted(snapshot, competitor, inning) ? "0" : "";
}

function linescoreSummaryColumns(snapshot: TeamSnapshot, competitor: EspnCompetitor) {
  if (snapshot.config.league === "mlb") {
    if (!baseballInningHasStarted(snapshot, competitor, 1)) {
      return ["", "", ""];
    }
    return [
      statValue(competitor.statistics, "runs", "R") || displayScore(competitor),
      statValue(competitor.statistics, "hits", "H") || "0",
      statValue(competitor.statistics, "errors", "E") || "0"
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
  const state = snapshotStatus(snapshot)?.type?.state ?? eventState(event);
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

  const hasAnyLinescore = competitors.some((competitor) => competitor.linescores?.length);
  const shouldShowMlbLinescore = snapshot.config.league === "mlb" && state !== "pre" && (state === "in" || state === "post" || hasAnyLinescore);
  const linescoreTeams = shouldShowMlbLinescore
    ? competitors
    : competitors.filter((competitor) => competitor.linescores?.length);
  if (linescoreTeams.length) {
    const periods = snapshot.config.league === "mlb"
      ? baseballLinescorePeriods(snapshot, linescoreTeams)
      : Math.max(...linescoreTeams.map((competitor) => competitor.linescores?.length ?? 0));
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
                  ${Array.from({ length: periods }, (_, index) => {
                    const value = snapshot.config.league === "mlb"
                      ? baseballLinescoreValue(snapshot, competitor, index + 1)
                      : (competitor.linescores?.[index]?.displayValue ?? "");
                    return `<td>${value}</td>`;
                  }).join("")}
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
      const scoreText = scheduleScoreText(event, team, opponent);
      const outcome = gameOutcome(event, team, opponent);
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
          <span>${scoreText || broadcastName(competition)}</span>
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
