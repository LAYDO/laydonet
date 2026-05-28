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

interface EspnF1CalendarEvent {
  label?: string;
  startDate?: string;
  endDate?: string;
  event?: EspnRef;
}

interface EspnF1Athlete {
  id?: string;
  displayName?: string;
  shortName?: string;
  fullName?: string;
  abbreviation?: string;
  flag?: { href?: string; alt?: string; rel?: string[] };
  headshot?: { href?: string; alt?: string };
}

interface EspnF1Competitor {
  id?: string;
  uid?: string;
  type?: string;
  order?: number | null;
  winner?: boolean;
  athlete?: EspnF1Athlete | EspnRef;
  vehicle?: { number?: string; manufacturer?: string; teamColor?: string };
  statistics?: EspnRef | EspnStatistic[];
  status?: EspnRef | EspnCompetition["status"];
  score?: string | number | null;
}

interface EspnF1Competition {
  id?: string;
  type?: { id?: string; text?: string; abbreviation?: string };
  date?: string;
  endDate?: string;
  status?: EspnCompetition["status"] | EspnRef;
  competitors?: EspnF1Competitor[];
}

interface EspnF1Event {
  id?: string;
  name?: string;
  shortName?: string;
  date?: string;
  endDate?: string;
  status?: EspnCompetition["status"];
  competitions?: EspnF1Competition[];
  links?: Array<{ href?: string; text?: string; shortText?: string; rel?: string[] }>;
}

interface EspnF1Scoreboard {
  leagues?: Array<{
    id?: string;
    name?: string;
    abbreviation?: string;
    season?: {
      year?: number;
      startDate?: string;
      endDate?: string;
      displayName?: string;
      type?: { id?: string; name?: string };
    };
    calendar?: EspnF1CalendarEvent[];
  }>;
  events?: EspnF1Event[];
}

interface EspnF1StandingEntry {
  athlete?: EspnF1Athlete;
  team?: {
    id?: string;
    name?: string;
    displayName?: string;
    abbreviation?: string;
    shortDisplayName?: string;
    color?: string;
  };
  stats?: EspnStatistic[];
}

interface EspnF1StandingsGroup {
  name?: string;
  abbreviation?: string;
  standings?: { entries?: EspnF1StandingEntry[] };
}

interface EspnF1Standings {
  name?: string;
  abbreviation?: string;
  children?: EspnF1StandingsGroup[];
}

interface EspnF1Teams {
  sports?: Array<{
    leagues?: Array<{
      teams?: Array<{
        team?: {
          id?: string;
          displayName?: string;
          abbreviation?: string;
          color?: string;
          slug?: string;
          links?: Array<{ href?: string; rel?: string[]; text?: string; shortText?: string }>;
        };
      }>;
    }>;
  }>;
}

interface EspnF1CoreEvent {
  id?: string;
  name?: string;
  shortName?: string;
  date?: string;
  endDate?: string;
  circuit?: EspnRef | null;
}

interface EspnF1Circuit {
  id?: string;
  fullName?: string;
  name?: string;
  displayName?: string;
  type?: string;
  address?: { city?: string; state?: string; country?: string };
  length?: string;
  distance?: string;
  laps?: number;
  turns?: number;
  direction?: string;
  established?: number;
  fastestLapTime?: string;
  fastestLapYear?: number;
}

interface EspnF1News {
  articles?: Array<{
    headline?: string;
    description?: string;
    published?: string;
    links?: { web?: { href?: string } };
    images?: Array<{ url?: string; name?: string; width?: number; height?: number }>;
  }>;
}

interface F1SessionRow {
  id: string;
  label: string;
  date?: string;
  state: string;
  status: string;
  competitors: EspnF1Competitor[];
}

interface F1CalendarRow {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  circuitId?: string;
  status: "current" | "upcoming" | "completed";
}

interface F1StandingRow {
  id: string;
  rank: string;
  name: string;
  points: string;
  color?: string;
  flag?: string;
  country?: string;
}

interface F1Snapshot {
  scoreboard: EspnF1Scoreboard;
  standings: EspnF1Standings;
  teams: EspnF1Teams;
  news: EspnF1News | null;
  event: EspnF1Event | null;
  detail: EspnF1CoreEvent | null;
  circuit: EspnF1Circuit | null;
  session: F1SessionRow | null;
  sessions: F1SessionRow[];
  calendar: F1CalendarRow[];
  curatedCircuits: Map<string, EspnF1Circuit>;
  driverStandings: F1StandingRow[];
  constructorStandings: F1StandingRow[];
  season: number;
  nextEvent?: F1CalendarRow;
}

interface F1CircuitMap {
  id: string;
  label: string;
  name: string;
  location: string;
  accent: string;
  path: string;
  shapePath?: string;
  shapeStrokeWidth?: number;
  start: { x: number; y: number; rotation?: number };
  facts?: string[];
  sourceCredit?: string;
  sourceUrl?: string;
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
const F1_ROUTE = "/sports/racing/f1/";
const F1_SCOREBOARD_ENDPOINT = "https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard";
const F1_TEAMS_ENDPOINT = "https://site.api.espn.com/apis/site/v2/sports/racing/f1/teams";
const F1_NEWS_ENDPOINT = "https://site.api.espn.com/apis/site/v2/sports/racing/f1/news?limit=3";
const F1_CORE_BASE = "https://sports.core.api.espn.com/v2/sports/racing/leagues/f1";

const F1_CIRCUIT_MAPS: F1CircuitMap[] = [
  {
    id: "601",
    label: "Melbourne GP Circuit",
    name: "Melbourne Grand Prix Circuit",
    location: "Melbourne, Australia",
    accent: "#e10600",
    path: "M36.698,38.066 C36.729,38.017 36.879,37.776 36.916,37.714 C37.176,37.281 37.176,37.281 36.867,37.102 C36.859,37.097 36.72,37.018 36.676,36.992 C36.606,36.951 36.546,36.913 36.489,36.873 C36.301,36.741 32.551,34.572 31.809,34.135 C31.673,34.055 31.54,33.976 31.409,33.898 C30.475,33.344 29.681,32.862 29.027,32.446 C26.237,30.676 24.769,30.219 22.424,30.522 C20.911,30.718 20.009,31.12 18.901,31.972 C18.699,32.128 17.752,32.896 17.46,33.121 C17.019,33.46 16.504,33.748 15.929,33.992 C15.28,34.267 14.588,34.471 13.897,34.617 C13.656,34.667 13.431,34.707 13.229,34.738 C13.106,34.756 13.016,34.767 12.943,34.774 C12.337,34.804 11.947,34.88 11.748,34.986 C11.652,35.036 11.642,35.055 11.645,35.121 C11.672,35.663 11.217,37.445 10.596,39.186 C10.276,40.083 9.851,41.031 9.077,42.645 C8.285,44.295 8.219,44.435 8.009,44.931 C7.819,45.378 7.633,46.07 7.459,46.933 C7.34,47.524 7.233,48.159 7.141,48.794 C7.109,49.016 7.08,49.223 7.056,49.408 C7.042,49.519 7.032,49.597 7.028,49.639 C6.869,50.224 6.949,50.643 7.168,50.981 C7.251,51.108 7.33,51.19 7.387,51.236 L12.485,55.709 C14.402,57.251 14.673,57.858 14.15,58.952 C14.055,59.15 13.887,59.403 13.619,59.765 C13.518,59.902 13.408,60.048 13.25,60.255 C13.206,60.312 13.042,60.525 13.052,60.513 C12.971,60.618 12.91,60.698 12.851,60.776 C12.781,60.867 12.718,60.951 12.659,61.031 C12.144,61.719 11.828,62.2 11.688,62.537 C11.535,62.903 11.565,63.052 11.663,63.132 C11.797,63.193 11.828,63.205 11.876,63.223 C11.96,63.254 12.061,63.291 12.182,63.332 C12.53,63.451 12.957,63.584 13.467,63.727 C14.93,64.139 16.757,64.552 18.969,64.938 C19.255,64.988 19.546,65.037 19.842,65.086 C24.39,65.829 30.804,65.737 34.084,65.277 C35.917,65.02 37.927,65.526 39.035,66.527 C39.452,66.902 39.716,67.207 39.927,67.542 C39.996,67.651 40.059,67.762 40.131,67.9 C40.166,67.967 40.327,68.284 40.377,68.378 C40.483,68.581 40.587,68.765 40.711,68.968 C40.84,69.179 40.986,69.345 41.143,69.473 C41.46,69.73 41.779,69.808 42.009,69.796 C42.011,69.796 53.079,69.781 75.212,69.751 C75.593,69.769 75.921,69.755 76.223,69.697 C76.473,69.649 76.672,69.574 76.802,69.478 C76.856,69.438 76.906,69.399 76.951,69.359 C77.173,69.162 77.289,68.98 77.444,68.615 C77.437,68.631 77.596,68.245 77.652,68.12 C77.868,67.63 77.871,66.771 77.686,65.384 C77.662,65.205 77.635,65.022 77.6,64.792 C77.298,62.823 77.288,62.713 77.605,62.365 C77.793,62.158 78.071,62.076 78.431,62.05 C78.613,62.038 78.801,62.041 78.983,62.056 C79.025,62.059 81.38,62.662 86.048,63.865 C86.883,64.022 87.548,64.033 88.037,63.962 C88.277,63.915 88.298,63.91 88.321,63.903 C88.55,63.832 88.839,63.602 89.139,63.263 C89.283,63.1 89.419,62.924 89.543,62.748 C89.606,62.658 89.653,62.586 89.682,62.54 C89.74,62.412 89.776,62.332 89.816,62.243 C89.932,61.986 90.061,61.699 90.2,61.389 C90.596,60.502 90.993,59.607 91.363,58.76 C91.395,58.685 91.428,58.611 91.46,58.538 C92.341,56.513 92.917,55.11 93.016,54.711 C93.091,54.411 92.932,54.134 92.569,53.871 C92.45,53.785 92.321,53.71 92.192,53.647 C92.141,53.622 92.074,53.592 91.992,53.559 L85.371,50.329 C83.835,49.555 82.378,48.891 81.048,48.337 C80.583,48.143 80.168,47.977 79.807,47.839 C79.681,47.79 79.572,47.749 79.479,47.715 C77.701,47.337 76.516,47.351 74.873,47.593 C74.872,47.593 74.4,47.664 74.271,47.682 C74.048,47.714 73.868,47.736 73.698,47.751 C72.077,47.895 67.15,48.284 66.398,48.32 C66.107,48.335 65.9,48.386 65.763,48.456 C65.639,48.56 65.602,48.606 65.549,48.669 C65.462,48.776 65.366,48.894 65.261,49.022 C64.963,49.387 64.665,49.753 64.386,50.097 C63.85,50.759 63.467,51.237 63.271,51.494 C63.177,51.615 63.078,51.73 62.972,51.838 C62.572,52.25 62.17,52.506 61.886,52.631 L53.364,53.382 C50.781,53.537 46.528,52.192 43.819,50.234 C42.92,49.583 41.978,48.688 41.016,47.61 C40.295,46.803 39.604,45.94 38.967,45.077 C38.744,44.775 38.543,44.494 38.368,44.242 C38.306,44.154 38.252,44.075 38.206,44.007 C35.918,41.216 35.721,39.67 36.698,38.066 Z M65.676,48.514 C65.676,48.514 65.675,48.515 65.675,48.515 C65.675,48.515 65.675,48.515 65.675,48.514 L65.676,48.514 Z M42.063,70.629 C41.909,70.638 41.725,70.624 41.516,70.573 C41.206,70.497 40.9,70.351 40.617,70.122 C40.385,69.934 40.178,69.695 39.999,69.405 C39.865,69.185 39.751,68.984 39.637,68.766 C39.584,68.665 39.423,68.348 39.391,68.288 C39.329,68.168 39.276,68.075 39.221,67.987 C39.053,67.721 38.838,67.474 38.476,67.146 C37.564,66.323 35.801,65.879 34.2,66.104 C30.842,66.575 24.347,66.668 19.707,65.91 C19.408,65.861 19.114,65.811 18.825,65.761 C16.586,65.37 14.732,64.951 13.241,64.531 C12.716,64.384 12.275,64.246 11.912,64.122 C11.715,64.055 11.577,64.004 11.495,63.972 C11.389,63.942 11.262,63.883 11.135,63.779 C10.736,63.454 10.628,62.909 10.917,62.216 C11.093,61.794 11.434,61.274 11.99,60.531 C12.051,60.449 12.115,60.364 12.186,60.271 C13.388,58.69 13.279,58.836 13.397,58.591 C13.717,57.922 13.612,57.687 11.948,56.348 L6.854,51.878 C6.747,51.794 6.605,51.647 6.468,51.436 C6.128,50.912 6,50.261 6.202,49.51 C6.208,49.462 6.216,49.392 6.228,49.301 C6.253,49.112 6.281,48.901 6.314,48.674 C6.409,48.025 6.518,47.375 6.64,46.768 C6.825,45.854 7.023,45.116 7.24,44.605 C7.457,44.091 7.523,43.953 8.324,42.283 C9.086,40.696 9.502,39.766 9.809,38.905 C10.392,37.271 10.831,35.555 10.811,35.162 C10.772,34.369 11.444,34.011 12.879,33.942 C13.292,33.884 13.5,33.847 13.725,33.799 C14.367,33.664 15.009,33.474 15.603,33.223 C16.117,33.005 16.571,32.751 16.95,32.459 C17.231,32.243 18.178,31.474 18.392,31.31 C19.612,30.372 20.649,29.91 22.317,29.694 C24.885,29.362 26.534,29.875 29.474,31.741 C30.121,32.151 30.907,32.63 31.835,33.18 C31.965,33.257 32.098,33.335 32.233,33.415 C32.919,33.82 36.745,36.033 36.967,36.188 C37.138,36.295 37.273,36.372 37.285,36.379 C37.977,36.78 38.147,37.286 37.632,38.144 C37.59,38.214 37.438,38.457 37.411,38.501 C37.056,39.085 36.926,39.507 37.004,40.11 C37.113,40.959 37.672,42.035 38.819,43.425 C38.942,43.604 38.994,43.68 39.054,43.765 C39.224,44.011 39.42,44.285 39.638,44.581 C40.262,45.424 40.937,46.268 41.639,47.054 C42.565,48.091 43.465,48.947 44.309,49.557 C46.866,51.406 50.931,52.691 53.303,52.549 L61.605,51.84 C61.651,51.816 61.715,51.779 61.792,51.73 C61.99,51.604 62.188,51.447 62.373,51.256 C62.456,51.171 62.535,51.08 62.608,50.985 C62.811,50.721 63.197,50.239 63.715,49.599 C64.017,49.227 64.315,48.86 64.614,48.494 C64.719,48.366 64.816,48.247 64.903,48.14 C64.946,48.088 64.978,48.049 65,48.022 C65.072,47.92 65.196,47.809 65.381,47.714 C65.629,47.586 65.951,47.506 66.357,47.486 C67.095,47.45 72.014,47.062 73.624,46.919 C73.777,46.905 73.944,46.885 74.154,46.855 C74.279,46.838 74.748,46.767 74.752,46.767 C76.492,46.511 77.775,46.497 79.592,46.872 C79.864,46.967 79.977,47.009 80.106,47.059 C80.474,47.2 80.897,47.369 81.369,47.566 C82.717,48.127 84.192,48.8 85.742,49.581 L92.341,52.8 C92.532,52.872 92.793,53.003 93.059,53.195 C93.668,53.636 94,54.214 93.827,54.912 C93.711,55.38 93.139,56.774 92.225,58.871 C92.193,58.945 92.161,59.019 92.128,59.094 C91.757,59.944 91.36,60.841 90.962,61.73 C90.823,62.041 90.694,62.328 90.578,62.586 C90.537,62.676 90.501,62.756 90.47,62.824 C90.449,62.871 90.428,62.914 90.408,62.954 C90.373,63.011 90.311,63.107 90.227,63.227 C90.086,63.427 89.931,63.628 89.765,63.816 C89.372,64.26 88.977,64.575 88.567,64.701 C88.363,64.753 88.275,64.771 88.158,64.788 C87.575,64.873 86.813,64.86 85.879,64.683 L78.995,62.895 C78.774,62.877 78.625,62.874 78.491,62.883 C78.366,62.892 78.274,62.913 78.239,62.922 C78.225,63.06 78.228,63.191 78.242,63.36 C78.256,63.518 78.28,63.705 78.316,63.95 C78.33,64.048 78.346,64.151 78.368,64.296 C78.382,64.386 78.382,64.386 78.396,64.478 C78.408,64.552 78.417,64.61 78.425,64.666 C78.461,64.9 78.489,65.089 78.514,65.274 C78.719,66.811 78.715,67.778 78.416,68.457 C78.365,68.572 78.209,68.949 78.213,68.941 C78.014,69.411 77.835,69.693 77.503,69.985 C77.439,70.041 77.371,70.096 77.297,70.151 C77.053,70.331 76.743,70.447 76.382,70.517 C76.004,70.59 75.616,70.606 75.272,70.59 C75.251,70.589 64.182,70.602 42.063,70.629 Z",
    shapePath:
      "M36.698,38.066 C36.729,38.017 36.879,37.776 36.916,37.714 C37.176,37.281 37.176,37.281 36.867,37.102 C36.859,37.097 36.72,37.018 36.676,36.992 C36.606,36.951 36.546,36.913 36.489,36.873 C36.301,36.741 32.551,34.572 31.809,34.135 C31.673,34.055 31.54,33.976 31.409,33.898 C30.475,33.344 29.681,32.862 29.027,32.446 C26.237,30.676 24.769,30.219 22.424,30.522 C20.911,30.718 20.009,31.12 18.901,31.972 C18.699,32.128 17.752,32.896 17.46,33.121 C17.019,33.46 16.504,33.748 15.929,33.992 C15.28,34.267 14.588,34.471 13.897,34.617 C13.656,34.667 13.431,34.707 13.229,34.738 C13.106,34.756 13.016,34.767 12.943,34.774 C12.337,34.804 11.947,34.88 11.748,34.986 C11.652,35.036 11.642,35.055 11.645,35.121 C11.672,35.663 11.217,37.445 10.596,39.186 C10.276,40.083 9.851,41.031 9.077,42.645 C8.285,44.295 8.219,44.435 8.009,44.931 C7.819,45.378 7.633,46.07 7.459,46.933 C7.34,47.524 7.233,48.159 7.141,48.794 C7.109,49.016 7.08,49.223 7.056,49.408 C7.042,49.519 7.032,49.597 7.028,49.639 C6.869,50.224 6.949,50.643 7.168,50.981 C7.251,51.108 7.33,51.19 7.387,51.236 L12.485,55.709 C14.402,57.251 14.673,57.858 14.15,58.952 C14.055,59.15 13.887,59.403 13.619,59.765 C13.518,59.902 13.408,60.048 13.25,60.255 C13.206,60.312 13.042,60.525 13.052,60.513 C12.971,60.618 12.91,60.698 12.851,60.776 C12.781,60.867 12.718,60.951 12.659,61.031 C12.144,61.719 11.828,62.2 11.688,62.537 C11.535,62.903 11.565,63.052 11.663,63.132 C11.797,63.193 11.828,63.205 11.876,63.223 C11.96,63.254 12.061,63.291 12.182,63.332 C12.53,63.451 12.957,63.584 13.467,63.727 C14.93,64.139 16.757,64.552 18.969,64.938 C19.255,64.988 19.546,65.037 19.842,65.086 C24.39,65.829 30.804,65.737 34.084,65.277 C35.917,65.02 37.927,65.526 39.035,66.527 C39.452,66.902 39.716,67.207 39.927,67.542 C39.996,67.651 40.059,67.762 40.131,67.9 C40.166,67.967 40.327,68.284 40.377,68.378 C40.483,68.581 40.587,68.765 40.711,68.968 C40.84,69.179 40.986,69.345 41.143,69.473 C41.46,69.73 41.779,69.808 42.009,69.796 C42.011,69.796 53.079,69.781 75.212,69.751 C75.593,69.769 75.921,69.755 76.223,69.697 C76.473,69.649 76.672,69.574 76.802,69.478 C76.856,69.438 76.906,69.399 76.951,69.359 C77.173,69.162 77.289,68.98 77.444,68.615 C77.437,68.631 77.596,68.245 77.652,68.12 C77.868,67.63 77.871,66.771 77.686,65.384 C77.662,65.205 77.635,65.022 77.6,64.792 C77.298,62.823 77.288,62.713 77.605,62.365 C77.793,62.158 78.071,62.076 78.431,62.05 C78.613,62.038 78.801,62.041 78.983,62.056 C79.025,62.059 81.38,62.662 86.048,63.865 C86.883,64.022 87.548,64.033 88.037,63.962 C88.277,63.915 88.298,63.91 88.321,63.903 C88.55,63.832 88.839,63.602 89.139,63.263 C89.283,63.1 89.419,62.924 89.543,62.748 C89.606,62.658 89.653,62.586 89.682,62.54 C89.74,62.412 89.776,62.332 89.816,62.243 C89.932,61.986 90.061,61.699 90.2,61.389 C90.596,60.502 90.993,59.607 91.363,58.76 C91.395,58.685 91.428,58.611 91.46,58.538 C92.341,56.513 92.917,55.11 93.016,54.711 C93.091,54.411 92.932,54.134 92.569,53.871 C92.45,53.785 92.321,53.71 92.192,53.647 C92.141,53.622 92.074,53.592 91.992,53.559 L85.371,50.329 C83.835,49.555 82.378,48.891 81.048,48.337 C80.583,48.143 80.168,47.977 79.807,47.839 C79.681,47.79 79.572,47.749 79.479,47.715 C77.701,47.337 76.516,47.351 74.873,47.593 C74.872,47.593 74.4,47.664 74.271,47.682 C74.048,47.714 73.868,47.736 73.698,47.751 C72.077,47.895 67.15,48.284 66.398,48.32 C66.107,48.335 65.9,48.386 65.763,48.456 C65.639,48.56 65.602,48.606 65.549,48.669 C65.462,48.776 65.366,48.894 65.261,49.022 C64.963,49.387 64.665,49.753 64.386,50.097 C63.85,50.759 63.467,51.237 63.271,51.494 C63.177,51.615 63.078,51.73 62.972,51.838 C62.572,52.25 62.17,52.506 61.886,52.631 L53.364,53.382 C50.781,53.537 46.528,52.192 43.819,50.234 C42.92,49.583 41.978,48.688 41.016,47.61 C40.295,46.803 39.604,45.94 38.967,45.077 C38.744,44.775 38.543,44.494 38.368,44.242 C38.306,44.154 38.252,44.075 38.206,44.007 C35.918,41.216 35.721,39.67 36.698,38.066 Z M65.676,48.514 C65.676,48.514 65.675,48.515 65.675,48.515 C65.675,48.515 65.675,48.515 65.675,48.514 L65.676,48.514 Z M42.063,70.629 C41.909,70.638 41.725,70.624 41.516,70.573 C41.206,70.497 40.9,70.351 40.617,70.122 C40.385,69.934 40.178,69.695 39.999,69.405 C39.865,69.185 39.751,68.984 39.637,68.766 C39.584,68.665 39.423,68.348 39.391,68.288 C39.329,68.168 39.276,68.075 39.221,67.987 C39.053,67.721 38.838,67.474 38.476,67.146 C37.564,66.323 35.801,65.879 34.2,66.104 C30.842,66.575 24.347,66.668 19.707,65.91 C19.408,65.861 19.114,65.811 18.825,65.761 C16.586,65.37 14.732,64.951 13.241,64.531 C12.716,64.384 12.275,64.246 11.912,64.122 C11.715,64.055 11.577,64.004 11.495,63.972 C11.389,63.942 11.262,63.883 11.135,63.779 C10.736,63.454 10.628,62.909 10.917,62.216 C11.093,61.794 11.434,61.274 11.99,60.531 C12.051,60.449 12.115,60.364 12.186,60.271 C13.388,58.69 13.279,58.836 13.397,58.591 C13.717,57.922 13.612,57.687 11.948,56.348 L6.854,51.878 C6.747,51.794 6.605,51.647 6.468,51.436 C6.128,50.912 6,50.261 6.202,49.51 C6.208,49.462 6.216,49.392 6.228,49.301 C6.253,49.112 6.281,48.901 6.314,48.674 C6.409,48.025 6.518,47.375 6.64,46.768 C6.825,45.854 7.023,45.116 7.24,44.605 C7.457,44.091 7.523,43.953 8.324,42.283 C9.086,40.696 9.502,39.766 9.809,38.905 C10.392,37.271 10.831,35.555 10.811,35.162 C10.772,34.369 11.444,34.011 12.879,33.942 C13.292,33.884 13.5,33.847 13.725,33.799 C14.367,33.664 15.009,33.474 15.603,33.223 C16.117,33.005 16.571,32.751 16.95,32.459 C17.231,32.243 18.178,31.474 18.392,31.31 C19.612,30.372 20.649,29.91 22.317,29.694 C24.885,29.362 26.534,29.875 29.474,31.741 C30.121,32.151 30.907,32.63 31.835,33.18 C31.965,33.257 32.098,33.335 32.233,33.415 C32.919,33.82 36.745,36.033 36.967,36.188 C37.138,36.295 37.273,36.372 37.285,36.379 C37.977,36.78 38.147,37.286 37.632,38.144 C37.59,38.214 37.438,38.457 37.411,38.501 C37.056,39.085 36.926,39.507 37.004,40.11 C37.113,40.959 37.672,42.035 38.819,43.425 C38.942,43.604 38.994,43.68 39.054,43.765 C39.224,44.011 39.42,44.285 39.638,44.581 C40.262,45.424 40.937,46.268 41.639,47.054 C42.565,48.091 43.465,48.947 44.309,49.557 C46.866,51.406 50.931,52.691 53.303,52.549 L61.605,51.84 C61.651,51.816 61.715,51.779 61.792,51.73 C61.99,51.604 62.188,51.447 62.373,51.256 C62.456,51.171 62.535,51.08 62.608,50.985 C62.811,50.721 63.197,50.239 63.715,49.599 C64.017,49.227 64.315,48.86 64.614,48.494 C64.719,48.366 64.816,48.247 64.903,48.14 C64.946,48.088 64.978,48.049 65,48.022 C65.072,47.92 65.196,47.809 65.381,47.714 C65.629,47.586 65.951,47.506 66.357,47.486 C67.095,47.45 72.014,47.062 73.624,46.919 C73.777,46.905 73.944,46.885 74.154,46.855 C74.279,46.838 74.748,46.767 74.752,46.767 C76.492,46.511 77.775,46.497 79.592,46.872 C79.864,46.967 79.977,47.009 80.106,47.059 C80.474,47.2 80.897,47.369 81.369,47.566 C82.717,48.127 84.192,48.8 85.742,49.581 L92.341,52.8 C92.532,52.872 92.793,53.003 93.059,53.195 C93.668,53.636 94,54.214 93.827,54.912 C93.711,55.38 93.139,56.774 92.225,58.871 C92.193,58.945 92.161,59.019 92.128,59.094 C91.757,59.944 91.36,60.841 90.962,61.73 C90.823,62.041 90.694,62.328 90.578,62.586 C90.537,62.676 90.501,62.756 90.47,62.824 C90.449,62.871 90.428,62.914 90.408,62.954 C90.373,63.011 90.311,63.107 90.227,63.227 C90.086,63.427 89.931,63.628 89.765,63.816 C89.372,64.26 88.977,64.575 88.567,64.701 C88.363,64.753 88.275,64.771 88.158,64.788 C87.575,64.873 86.813,64.86 85.879,64.683 L78.995,62.895 C78.774,62.877 78.625,62.874 78.491,62.883 C78.366,62.892 78.274,62.913 78.239,62.922 C78.225,63.06 78.228,63.191 78.242,63.36 C78.256,63.518 78.28,63.705 78.316,63.95 C78.33,64.048 78.346,64.151 78.368,64.296 C78.382,64.386 78.382,64.386 78.396,64.478 C78.408,64.552 78.417,64.61 78.425,64.666 C78.461,64.9 78.489,65.089 78.514,65.274 C78.719,66.811 78.715,67.778 78.416,68.457 C78.365,68.572 78.209,68.949 78.213,68.941 C78.014,69.411 77.835,69.693 77.503,69.985 C77.439,70.041 77.371,70.096 77.297,70.151 C77.053,70.331 76.743,70.447 76.382,70.517 C76.004,70.59 75.616,70.606 75.272,70.59 C75.251,70.589 64.182,70.602 42.063,70.629 Z",
    start: { x: 36.698, y: 38.066, rotation: 31 },
    facts: ["16 turns","5.303 km","Clockwise"]
  },
  {
    id: "619",
    label: "Shanghai",
    name: "Shanghai International Circuit",
    location: "Shanghai, China",
    accent: "#f6c84c",
    path: "M87.537,74.508 C90.887,74.508 92.802,72.5 93.002,69.498 C93.185,66.749 91.811,64.035 89.812,63.35 C87.9,62.695 86.567,62.984 85.971,63.893 C85.455,64.679 85.607,65.813 86.354,66.526 C87.347,67.551 87.389,68.436 86.502,68.918 C85.968,69.208 85.155,69.313 84.136,69.313 C83.805,69.313 82.006,69.266 78.789,69.175 C76.186,69.102 73.334,69.019 67.598,68.851 C55.949,68.51 52.338,68.406 51.241,68.387 C48.306,68.387 46.79,67.105 46.79,64.011 C46.79,63.19 47.113,62.706 47.871,62.27 C48.117,62.129 48.268,62.055 48.959,61.732 C50.936,60.806 55.819,58.69 59.518,57.199 C61.346,56.462 62.155,55.196 62.158,53.574 C62.16,52.346 61.651,50.954 61.08,50.245 C61.056,50.214 60.7,49.782 60.571,49.621 C60.331,49.319 60.119,49.032 59.917,48.729 C58.16,46.089 57.804,43.148 59.68,39.687 C61.049,37.159 63.157,35.846 65.727,35.511 C67.446,35.287 69.122,35.513 70.573,35.944 C72.825,36.614 79.338,38.698 81.585,39.502 C83.927,40.339 84.603,40.235 86.875,38.895 C88.003,38.238 88.319,37.81 88.194,37.55 C88.064,37.277 87.617,37.008 86.579,36.544 C86.176,36.364 86.041,36.303 85.919,36.246 C83.885,35.425 80.4,33.89 77.538,32.559 C76.432,32.044 75.485,31.591 74.779,31.236 C73.144,30.415 71.243,30.302 69.067,30.906 C63.674,32.508 59.798,33.475 57.428,33.808 C54.908,34.163 54.036,34.054 53.208,33.308 C53.049,33.165 52.472,32.568 52.369,32.468 C51.398,31.519 51.146,30.623 51.776,29.89 C52.603,28.946 53.735,29.104 55.005,30.227 C55.621,30.772 56.181,30.777 56.729,30.372 C57.19,30.031 57.591,29.4 57.691,28.947 C57.817,28.379 57.696,27.57 57.257,26.936 C56.631,26.031 55.424,25.492 53.504,25.492 C50.565,25.59 48.186,27.182 46.339,30.312 C46.021,30.851 45.574,31.775 45.01,33.06 C42.675,39.232 41.019,43.608 40.043,46.189 C35.117,59.217 32.365,66.525 31.79,68.107 C31.68,68.41 31.602,68.629 31.556,68.762 C30.982,70.45 29.627,71.258 27.616,71.155 L11.403,71.155 C9.161,71.934 7.791,72.621 7.337,73.161 C6.972,73.917 7.199,74.293 8.202,74.508 L87.537,74.508 Z M84.617,75.303 L8.12,75.303 C6.546,74.978 6,74.057 6.645,72.767 C7.248,71.987 8.738,71.235 11.206,70.382 L27.636,70.36 C29.33,70.447 30.351,69.838 30.804,68.506 C30.851,68.366 30.931,68.143 31.043,67.835 C31.619,66.249 34.371,58.942 39.3,45.907 C40.275,43.327 41.931,38.95 44.275,32.76 C44.858,31.429 45.317,30.481 45.654,29.908 C47.632,26.556 50.249,24.805 53.49,24.697 C55.669,24.697 57.124,25.347 57.911,26.484 C58.483,27.311 58.638,28.346 58.467,29.118 C58.327,29.756 57.82,30.554 57.201,31.012 C56.361,31.633 55.384,31.624 54.479,30.823 C53.499,29.956 52.854,29.866 52.377,30.411 C52.086,30.748 52.215,31.207 52.925,31.899 C53.045,32.017 53.605,32.596 53.74,32.717 C54.346,33.263 55.009,33.346 57.317,33.021 C59.638,32.694 63.483,31.735 68.848,30.142 C71.211,29.486 73.313,29.611 75.136,30.526 C75.834,30.876 76.774,31.327 77.873,31.838 C80.724,33.164 84.196,34.694 86.236,35.517 C86.373,35.581 86.504,35.64 86.727,35.74 C88.156,36.378 88.66,36.682 88.911,37.207 C89.281,37.98 88.721,38.74 87.277,39.58 C84.816,41.032 83.9,41.173 81.318,40.25 C79.086,39.452 72.586,37.372 70.346,36.706 C68.993,36.303 67.421,36.092 65.83,36.299 C63.501,36.603 61.62,37.775 60.379,40.065 C58.656,43.245 58.974,45.877 60.579,48.288 C60.767,48.571 60.966,48.84 61.194,49.126 C61.317,49.281 61.671,49.711 61.7,49.747 C62.382,50.594 62.955,52.162 62.953,53.575 C62.95,55.513 61.951,57.075 59.815,57.936 C56.13,59.422 51.26,61.533 49.296,62.452 C48.631,62.763 48.485,62.834 48.267,62.959 C47.741,63.262 47.584,63.496 47.584,64.011 C47.584,66.634 48.718,67.593 51.248,67.593 C52.357,67.612 55.958,67.715 67.564,68.055 C73.357,68.224 76.208,68.307 78.811,68.381 C82.008,68.471 83.817,68.519 84.136,68.519 C85.026,68.519 85.743,68.426 86.123,68.219 C86.466,68.033 86.454,67.772 85.794,67.09 C84.785,66.128 84.576,64.57 85.306,63.457 C86.125,62.208 87.844,61.835 90.069,62.598 C92.451,63.414 94,66.475 93.795,69.551 C93.568,72.951 91.327,75.303 87.537,75.303 L84.617,75.303 Z",
    shapePath:
      "M87.537,74.508 C90.887,74.508 92.802,72.5 93.002,69.498 C93.185,66.749 91.811,64.035 89.812,63.35 C87.9,62.695 86.567,62.984 85.971,63.893 C85.455,64.679 85.607,65.813 86.354,66.526 C87.347,67.551 87.389,68.436 86.502,68.918 C85.968,69.208 85.155,69.313 84.136,69.313 C83.805,69.313 82.006,69.266 78.789,69.175 C76.186,69.102 73.334,69.019 67.598,68.851 C55.949,68.51 52.338,68.406 51.241,68.387 C48.306,68.387 46.79,67.105 46.79,64.011 C46.79,63.19 47.113,62.706 47.871,62.27 C48.117,62.129 48.268,62.055 48.959,61.732 C50.936,60.806 55.819,58.69 59.518,57.199 C61.346,56.462 62.155,55.196 62.158,53.574 C62.16,52.346 61.651,50.954 61.08,50.245 C61.056,50.214 60.7,49.782 60.571,49.621 C60.331,49.319 60.119,49.032 59.917,48.729 C58.16,46.089 57.804,43.148 59.68,39.687 C61.049,37.159 63.157,35.846 65.727,35.511 C67.446,35.287 69.122,35.513 70.573,35.944 C72.825,36.614 79.338,38.698 81.585,39.502 C83.927,40.339 84.603,40.235 86.875,38.895 C88.003,38.238 88.319,37.81 88.194,37.55 C88.064,37.277 87.617,37.008 86.579,36.544 C86.176,36.364 86.041,36.303 85.919,36.246 C83.885,35.425 80.4,33.89 77.538,32.559 C76.432,32.044 75.485,31.591 74.779,31.236 C73.144,30.415 71.243,30.302 69.067,30.906 C63.674,32.508 59.798,33.475 57.428,33.808 C54.908,34.163 54.036,34.054 53.208,33.308 C53.049,33.165 52.472,32.568 52.369,32.468 C51.398,31.519 51.146,30.623 51.776,29.89 C52.603,28.946 53.735,29.104 55.005,30.227 C55.621,30.772 56.181,30.777 56.729,30.372 C57.19,30.031 57.591,29.4 57.691,28.947 C57.817,28.379 57.696,27.57 57.257,26.936 C56.631,26.031 55.424,25.492 53.504,25.492 C50.565,25.59 48.186,27.182 46.339,30.312 C46.021,30.851 45.574,31.775 45.01,33.06 C42.675,39.232 41.019,43.608 40.043,46.189 C35.117,59.217 32.365,66.525 31.79,68.107 C31.68,68.41 31.602,68.629 31.556,68.762 C30.982,70.45 29.627,71.258 27.616,71.155 L11.403,71.155 C9.161,71.934 7.791,72.621 7.337,73.161 C6.972,73.917 7.199,74.293 8.202,74.508 L87.537,74.508 Z M84.617,75.303 L8.12,75.303 C6.546,74.978 6,74.057 6.645,72.767 C7.248,71.987 8.738,71.235 11.206,70.382 L27.636,70.36 C29.33,70.447 30.351,69.838 30.804,68.506 C30.851,68.366 30.931,68.143 31.043,67.835 C31.619,66.249 34.371,58.942 39.3,45.907 C40.275,43.327 41.931,38.95 44.275,32.76 C44.858,31.429 45.317,30.481 45.654,29.908 C47.632,26.556 50.249,24.805 53.49,24.697 C55.669,24.697 57.124,25.347 57.911,26.484 C58.483,27.311 58.638,28.346 58.467,29.118 C58.327,29.756 57.82,30.554 57.201,31.012 C56.361,31.633 55.384,31.624 54.479,30.823 C53.499,29.956 52.854,29.866 52.377,30.411 C52.086,30.748 52.215,31.207 52.925,31.899 C53.045,32.017 53.605,32.596 53.74,32.717 C54.346,33.263 55.009,33.346 57.317,33.021 C59.638,32.694 63.483,31.735 68.848,30.142 C71.211,29.486 73.313,29.611 75.136,30.526 C75.834,30.876 76.774,31.327 77.873,31.838 C80.724,33.164 84.196,34.694 86.236,35.517 C86.373,35.581 86.504,35.64 86.727,35.74 C88.156,36.378 88.66,36.682 88.911,37.207 C89.281,37.98 88.721,38.74 87.277,39.58 C84.816,41.032 83.9,41.173 81.318,40.25 C79.086,39.452 72.586,37.372 70.346,36.706 C68.993,36.303 67.421,36.092 65.83,36.299 C63.501,36.603 61.62,37.775 60.379,40.065 C58.656,43.245 58.974,45.877 60.579,48.288 C60.767,48.571 60.966,48.84 61.194,49.126 C61.317,49.281 61.671,49.711 61.7,49.747 C62.382,50.594 62.955,52.162 62.953,53.575 C62.95,55.513 61.951,57.075 59.815,57.936 C56.13,59.422 51.26,61.533 49.296,62.452 C48.631,62.763 48.485,62.834 48.267,62.959 C47.741,63.262 47.584,63.496 47.584,64.011 C47.584,66.634 48.718,67.593 51.248,67.593 C52.357,67.612 55.958,67.715 67.564,68.055 C73.357,68.224 76.208,68.307 78.811,68.381 C82.008,68.471 83.817,68.519 84.136,68.519 C85.026,68.519 85.743,68.426 86.123,68.219 C86.466,68.033 86.454,67.772 85.794,67.09 C84.785,66.128 84.576,64.57 85.306,63.457 C86.125,62.208 87.844,61.835 90.069,62.598 C92.451,63.414 94,66.475 93.795,69.551 C93.568,72.951 91.327,75.303 87.537,75.303 L84.617,75.303 Z",
    start: { x: 87.537, y: 74.508, rotation: 90 },
    facts: ["13 turns","5.451 km","Clockwise"]
  },
  {
    id: "618",
    label: "Suzuka International Racing Course",
    name: "Suzuka International Racing Course",
    location: "Suzuka, Japan",
    accent: "#5fb8ff",
    path: "M13.723,38.829 C8.97,36.228 7.289,34.656 6.59,32.019 C6,29.002 8.608,26.572 13.975,25.025 C17.061,24.099 19.098,25.271 20.596,27.901 C20.796,28.252 20.98,28.616 21.186,29.053 C21.26,29.211 21.562,29.872 21.634,30.024 C21.803,30.378 21.952,30.755 22.15,31.307 C22.874,33.33 22.913,33.429 23.337,34.212 C23.891,35.235 24.595,36.102 25.55,36.866 C27.137,38.125 28.771,38.626 30.303,38.463 C31.574,38.329 32.701,37.727 33.347,36.926 C35.152,34.689 38.412,30.469 40.633,27.441 C41.59,26.212 42.462,25.671 43.319,25.734 C43.974,25.783 44.441,26.102 45.156,26.812 C46.197,27.898 46.007,30.607 44.46,33.273 C42.175,37.018 41.562,38.629 41.528,40.276 C41.521,40.602 41.459,41.434 41.333,42.912 C41.263,43.725 40.967,47.108 40.931,47.528 C40.908,47.791 40.886,48.042 40.865,48.286 C40.758,49.536 40.667,50.637 40.592,51.591 C38.818,50.907 35.936,49.653 32.83,48.202 C24.349,44.437 20.022,42.277 13.723,38.829 Z M40.336,55.868 C40.336,56.806 40.77,57.347 41.688,57.677 C42.448,57.949 43.25,58.038 45.175,58.134 C45.359,58.143 45.421,58.146 45.514,58.151 C45.627,58.157 45.728,58.162 45.824,58.167 C47.025,58.234 47.913,58.012 48.636,57.53 C49.193,57.158 49.566,56.74 50.252,55.806 C50.287,55.758 50.287,55.758 50.322,55.71 C52.035,53.38 54.947,49.913 57.315,47.588 C59.239,45.568 62.343,45.38 66.377,46.284 C68.474,47.042 69.277,48.933 68.717,50.784 C68.143,52.679 68.097,54.173 68.824,55.128 C69.609,56.161 70.141,56.29 73.689,56.429 C76.252,56.618 77.21,58.604 76.947,61.378 C76.8,62.922 78.124,64.242 79.511,64.296 C81.027,64.462 82.265,65.506 83.02,66.818 C83.927,68.393 85.249,70.627 87.034,73.558 C87.99,74.844 89.115,75.043 90.3,74.361 C91.351,73.756 92.31,72.489 92.651,71.326 C93.187,69.497 92.758,67.939 91.844,66.77 C90.518,65.076 76.16,43.88 75.072,41.733 C74.066,39.746 72.354,39.554 69.926,40.434 C68.665,40.89 68.41,40.969 68.017,40.972 C67.453,40.975 67.103,40.665 66.87,40.026 C66.538,39.413 66.304,39.425 64.289,39.954 C64.108,40.002 63.945,40.042 63.773,40.082 C60.365,40.769 56.297,43.986 50.958,49.516 C49.485,51.042 47.927,51.926 46.319,52.283 C45.14,52.544 44.075,52.51 42.967,52.289 C42.801,52.256 42.301,52.142 42.235,52.132 C41.968,52.091 41.393,51.899 40.592,51.591 C40.422,53.742 40.336,55.152 40.336,55.868 Z M42.352,51.374 C42.45,51.389 42.975,51.508 43.117,51.536 C44.129,51.738 45.09,51.769 46.153,51.533 C47.612,51.209 49.036,50.402 50.406,48.983 C55.858,43.335 60,40.059 63.609,39.333 C63.762,39.297 63.919,39.258 64.095,39.211 C64.033,39.228 64.903,38.993 65.119,38.942 C65.489,38.853 65.776,38.806 66.039,38.799 C66.721,38.782 67.224,39.058 67.561,39.689 C67.717,40.12 67.811,40.206 68.012,40.204 C68.272,40.203 68.534,40.121 69.665,39.712 C70.816,39.295 71.818,39.1 72.773,39.207 C74.054,39.351 75.079,40.048 75.757,41.387 C76.818,43.48 91.151,64.639 92.448,66.297 C93.503,67.646 94,69.45 93.387,71.541 C92.993,72.889 91.91,74.32 90.683,75.026 C89.164,75.901 87.603,75.62 86.406,74 C84.594,71.028 83.266,68.784 82.355,67.201 C81.712,66.085 80.665,65.199 79.466,65.062 C77.667,64.983 75.993,63.309 76.183,61.306 C76.411,58.903 75.658,57.344 73.646,57.195 C69.877,57.048 69.193,56.882 68.213,55.593 C67.289,54.379 67.342,52.676 67.982,50.562 C68.428,49.089 67.814,47.63 66.184,47.027 C62.407,46.184 59.543,46.361 57.862,48.127 C55.517,50.429 52.631,53.866 50.991,56.096 C50.906,56.212 50.906,56.212 50.871,56.26 C50.134,57.263 49.716,57.732 49.061,58.169 C48.196,58.746 47.143,59.009 45.782,58.934 C45.687,58.928 45.587,58.923 45.474,58.917 C45.382,58.913 45.32,58.91 45.137,58.901 C43.128,58.801 42.289,58.707 41.429,58.399 C40.222,57.966 39.568,57.151 39.568,55.868 C39.568,55.015 39.684,53.26 39.91,50.495 C41.154,51.003 42.039,51.325 42.352,51.374 Z M40.101,48.221 C40.122,47.977 40.143,47.725 40.166,47.462 C40.203,47.041 40.499,43.659 40.568,42.846 C40.692,41.393 40.754,40.562 40.761,40.261 C40.798,38.451 41.456,36.723 43.8,32.881 C45.191,30.484 45.356,28.13 44.608,27.35 C44.025,26.77 43.673,26.53 43.262,26.5 C42.71,26.459 42.054,26.866 41.245,27.904 C39.024,30.933 35.757,35.162 33.945,37.408 C33.169,38.369 31.855,39.071 30.384,39.227 C28.648,39.411 26.815,38.849 25.071,37.467 C24.032,36.634 23.263,35.687 22.662,34.578 C22.402,34.097 22.177,33.596 21.952,33.016 C21.865,32.79 21.78,32.56 21.677,32.272 C21.644,32.179 21.475,31.698 21.427,31.566 C21.238,31.036 21.097,30.68 20.942,30.354 C20.866,30.195 20.563,29.532 20.491,29.379 C20.293,28.959 20.118,28.612 19.929,28.281 C18.591,25.931 16.889,24.952 14.191,25.761 C9.155,27.213 6.852,29.359 7.338,31.846 C7.963,34.203 9.507,35.646 14.091,38.156 C20.374,41.595 24.682,43.745 33.145,47.502 C35.722,48.706 38.168,49.783 39.91,50.495 C39.966,49.801 40.03,49.043 40.101,48.221 Z",
    shapePath:
      "M13.723,38.829 C8.97,36.228 7.289,34.656 6.59,32.019 C6,29.002 8.608,26.572 13.975,25.025 C17.061,24.099 19.098,25.271 20.596,27.901 C20.796,28.252 20.98,28.616 21.186,29.053 C21.26,29.211 21.562,29.872 21.634,30.024 C21.803,30.378 21.952,30.755 22.15,31.307 C22.874,33.33 22.913,33.429 23.337,34.212 C23.891,35.235 24.595,36.102 25.55,36.866 C27.137,38.125 28.771,38.626 30.303,38.463 C31.574,38.329 32.701,37.727 33.347,36.926 C35.152,34.689 38.412,30.469 40.633,27.441 C41.59,26.212 42.462,25.671 43.319,25.734 C43.974,25.783 44.441,26.102 45.156,26.812 C46.197,27.898 46.007,30.607 44.46,33.273 C42.175,37.018 41.562,38.629 41.528,40.276 C41.521,40.602 41.459,41.434 41.333,42.912 C41.263,43.725 40.967,47.108 40.931,47.528 C40.908,47.791 40.886,48.042 40.865,48.286 C40.758,49.536 40.667,50.637 40.592,51.591 C38.818,50.907 35.936,49.653 32.83,48.202 C24.349,44.437 20.022,42.277 13.723,38.829 Z M40.336,55.868 C40.336,56.806 40.77,57.347 41.688,57.677 C42.448,57.949 43.25,58.038 45.175,58.134 C45.359,58.143 45.421,58.146 45.514,58.151 C45.627,58.157 45.728,58.162 45.824,58.167 C47.025,58.234 47.913,58.012 48.636,57.53 C49.193,57.158 49.566,56.74 50.252,55.806 C50.287,55.758 50.287,55.758 50.322,55.71 C52.035,53.38 54.947,49.913 57.315,47.588 C59.239,45.568 62.343,45.38 66.377,46.284 C68.474,47.042 69.277,48.933 68.717,50.784 C68.143,52.679 68.097,54.173 68.824,55.128 C69.609,56.161 70.141,56.29 73.689,56.429 C76.252,56.618 77.21,58.604 76.947,61.378 C76.8,62.922 78.124,64.242 79.511,64.296 C81.027,64.462 82.265,65.506 83.02,66.818 C83.927,68.393 85.249,70.627 87.034,73.558 C87.99,74.844 89.115,75.043 90.3,74.361 C91.351,73.756 92.31,72.489 92.651,71.326 C93.187,69.497 92.758,67.939 91.844,66.77 C90.518,65.076 76.16,43.88 75.072,41.733 C74.066,39.746 72.354,39.554 69.926,40.434 C68.665,40.89 68.41,40.969 68.017,40.972 C67.453,40.975 67.103,40.665 66.87,40.026 C66.538,39.413 66.304,39.425 64.289,39.954 C64.108,40.002 63.945,40.042 63.773,40.082 C60.365,40.769 56.297,43.986 50.958,49.516 C49.485,51.042 47.927,51.926 46.319,52.283 C45.14,52.544 44.075,52.51 42.967,52.289 C42.801,52.256 42.301,52.142 42.235,52.132 C41.968,52.091 41.393,51.899 40.592,51.591 C40.422,53.742 40.336,55.152 40.336,55.868 Z M42.352,51.374 C42.45,51.389 42.975,51.508 43.117,51.536 C44.129,51.738 45.09,51.769 46.153,51.533 C47.612,51.209 49.036,50.402 50.406,48.983 C55.858,43.335 60,40.059 63.609,39.333 C63.762,39.297 63.919,39.258 64.095,39.211 C64.033,39.228 64.903,38.993 65.119,38.942 C65.489,38.853 65.776,38.806 66.039,38.799 C66.721,38.782 67.224,39.058 67.561,39.689 C67.717,40.12 67.811,40.206 68.012,40.204 C68.272,40.203 68.534,40.121 69.665,39.712 C70.816,39.295 71.818,39.1 72.773,39.207 C74.054,39.351 75.079,40.048 75.757,41.387 C76.818,43.48 91.151,64.639 92.448,66.297 C93.503,67.646 94,69.45 93.387,71.541 C92.993,72.889 91.91,74.32 90.683,75.026 C89.164,75.901 87.603,75.62 86.406,74 C84.594,71.028 83.266,68.784 82.355,67.201 C81.712,66.085 80.665,65.199 79.466,65.062 C77.667,64.983 75.993,63.309 76.183,61.306 C76.411,58.903 75.658,57.344 73.646,57.195 C69.877,57.048 69.193,56.882 68.213,55.593 C67.289,54.379 67.342,52.676 67.982,50.562 C68.428,49.089 67.814,47.63 66.184,47.027 C62.407,46.184 59.543,46.361 57.862,48.127 C55.517,50.429 52.631,53.866 50.991,56.096 C50.906,56.212 50.906,56.212 50.871,56.26 C50.134,57.263 49.716,57.732 49.061,58.169 C48.196,58.746 47.143,59.009 45.782,58.934 C45.687,58.928 45.587,58.923 45.474,58.917 C45.382,58.913 45.32,58.91 45.137,58.901 C43.128,58.801 42.289,58.707 41.429,58.399 C40.222,57.966 39.568,57.151 39.568,55.868 C39.568,55.015 39.684,53.26 39.91,50.495 C41.154,51.003 42.039,51.325 42.352,51.374 Z M40.101,48.221 C40.122,47.977 40.143,47.725 40.166,47.462 C40.203,47.041 40.499,43.659 40.568,42.846 C40.692,41.393 40.754,40.562 40.761,40.261 C40.798,38.451 41.456,36.723 43.8,32.881 C45.191,30.484 45.356,28.13 44.608,27.35 C44.025,26.77 43.673,26.53 43.262,26.5 C42.71,26.459 42.054,26.866 41.245,27.904 C39.024,30.933 35.757,35.162 33.945,37.408 C33.169,38.369 31.855,39.071 30.384,39.227 C28.648,39.411 26.815,38.849 25.071,37.467 C24.032,36.634 23.263,35.687 22.662,34.578 C22.402,34.097 22.177,33.596 21.952,33.016 C21.865,32.79 21.78,32.56 21.677,32.272 C21.644,32.179 21.475,31.698 21.427,31.566 C21.238,31.036 21.097,30.68 20.942,30.354 C20.866,30.195 20.563,29.532 20.491,29.379 C20.293,28.959 20.118,28.612 19.929,28.281 C18.591,25.931 16.889,24.952 14.191,25.761 C9.155,27.213 6.852,29.359 7.338,31.846 C7.963,34.203 9.507,35.646 14.091,38.156 C20.374,41.595 24.682,43.745 33.145,47.502 C35.722,48.706 38.168,49.783 39.91,50.495 C39.966,49.801 40.03,49.043 40.101,48.221 Z",
    start: { x: 13.723, y: 38.829, rotation: -61 },
    facts: ["18 turns","5.807 km","Counterclockwise"]
  },
  {
    id: "603",
    label: "Bahrain",
    name: "Bahrain International Circuit",
    location: "Sakhir, Bahrain",
    accent: "#69d39b",
    path: "M12.198,58.843 C11.975,60.358 12.102,61.599 12.566,62.574 C13.199,64.824 13.682,66.315 14.037,67.105 C14.7,68.578 14.748,70.926 13.967,71.84 C13.573,72.303 12.799,72.943 10.327,74.913 C9.08,75.907 8.476,76.395 7.914,76.869 C7.197,77.475 7.048,78.025 7.31,78.472 C7.57,78.914 8.217,79.232 8.928,79.232 C8.96,79.232 16.504,79.282 21.281,79.307 C42.991,79.42 65.366,79.42 87.041,79.232 C88.878,79.232 89.672,78.699 91.81,76.231 C92.931,74.792 93.007,74.332 92.287,72.724 C87.962,64.283 84.186,56.858 80.148,48.871 C79.932,48.443 73.721,36.139 72.325,33.39 C71.807,32.679 71.321,32.045 70.816,31.417 C70.629,31.184 70.438,30.951 70.238,30.71 C69.699,30.062 69.293,29.593 68.099,28.225 C65.961,25.266 64.441,25.243 62.339,27.508 C61.788,28.473 61.137,29.85 60.273,31.84 C59.788,32.958 58.008,37.178 57.798,37.669 C57.669,37.97 57.546,38.257 57.436,38.509 C56.429,41.315 56.606,43.26 57.824,44.746 C58.85,45.998 60.486,46.907 63.585,48.12 C63.849,48.224 66.588,49.267 67.411,49.598 C67.529,49.639 68.083,49.824 68.235,49.876 C68.624,50.009 68.966,50.133 69.313,50.27 C70.237,50.634 71.086,51.046 71.891,51.547 C74.697,53.29 76.536,55.841 77.024,59.466 C77.306,64.261 75.577,66.653 71.915,66.379 C43.524,66.379 27.86,66.06 24.747,65.412 C22.772,65.194 21.905,64.432 22.237,63.175 C22.446,62.382 22.857,61.824 24.397,59.992 C24.584,59.77 24.718,59.608 24.849,59.449 C24.909,59.376 24.966,59.306 25.021,59.237 C26.26,58.203 27.388,57.706 28.65,57.535 C29.432,57.429 29.999,57.438 31.485,57.532 C31.851,57.555 32.062,57.567 32.296,57.578 C32.927,57.607 33.936,57.729 35.529,57.959 C36.365,58.079 39.748,58.589 40.341,58.676 C41.206,58.804 41.978,58.914 42.714,59.016 C45.361,59.381 47.472,59.617 49.148,59.717 C51.255,59.717 52.247,58.174 51.289,57.471 C49.958,56.599 48.458,55.559 45.701,53.616 C45.436,53.43 45.239,53.29 44.874,53.034 C44.581,52.827 44.363,52.673 44.151,52.524 C43.607,52.141 43.159,51.826 42.729,51.525 C42.898,51.65 39.654,49.343 39.026,48.786 C37.112,47.087 36.883,45.347 38.325,42.034 C39.506,38.284 38.607,36.485 36.026,35.203 C35.643,35.012 34.382,34.465 34.294,34.424 C33.28,33.969 31.983,33.039 30.722,31.923 C29.765,31.077 28.525,29.615 25.781,26.209 C25.612,25.999 25.607,25.993 25.509,25.872 C22.863,23.164 21.344,21.882 19.768,21.181 C18.806,20.753 18.222,21.101 17.817,22.437 C14.307,45.108 12.433,57.247 12.198,58.843 Z M21.276,80.234 C16.496,80.209 8.957,80.158 8.928,80.158 C7.908,80.158 6.95,79.688 6.511,78.94 C6,78.069 6.28,77.037 7.316,76.162 C7.887,75.679 8.496,75.188 9.724,74.209 C12.115,72.303 12.929,71.63 13.262,71.239 C13.764,70.651 13.724,68.667 13.192,67.485 C12.814,66.644 12.323,65.133 11.712,62.935 C11.176,61.786 11.036,60.375 11.282,58.709 C11.517,57.107 13.392,44.963 16.907,22.264 C17.472,20.348 18.614,19.653 20.145,20.334 C21.867,21.1 23.451,22.439 26.188,25.24 C26.328,25.412 26.328,25.412 26.44,25.55 C29.198,28.974 30.437,30.435 31.335,31.229 C32.532,32.287 33.761,33.169 34.561,33.525 C34.754,33.616 36.029,34.17 36.439,34.373 C39.414,35.851 40.539,38.111 39.201,42.337 C37.88,45.368 38.051,46.681 39.641,48.093 C40.225,48.612 43.405,50.873 43.271,50.774 C43.691,51.067 44.14,51.383 44.684,51.766 C44.897,51.916 45.115,52.07 45.408,52.276 C45.773,52.533 45.97,52.672 46.138,52.791 C48.983,54.796 50.478,55.832 51.817,56.71 C52.645,57.317 52.787,58.358 52.224,59.234 C51.666,60.102 50.542,60.643 49.121,60.643 C47.389,60.54 45.256,60.302 42.587,59.934 C41.848,59.832 41.073,59.721 40.206,59.593 C39.611,59.505 36.229,58.996 35.397,58.876 C33.834,58.651 32.844,58.531 32.254,58.504 C32.013,58.493 31.797,58.48 31.426,58.457 C30.003,58.367 29.475,58.358 28.775,58.453 C27.697,58.599 26.739,59.018 25.713,59.855 C25.665,59.914 25.616,59.974 25.565,60.037 C25.432,60.199 25.295,60.364 25.106,60.588 C23.695,62.267 23.29,62.818 23.133,63.411 C22.979,63.994 23.366,64.331 24.869,64.493 C27.873,65.131 43.605,65.452 71.933,65.452 C74.995,65.687 76.348,63.826 76.103,59.572 C75.651,56.25 73.981,53.937 71.402,52.334 C70.648,51.865 69.848,51.477 68.973,51.132 C68.641,51.001 68.312,50.882 67.935,50.753 C67.788,50.703 67.231,50.516 67.087,50.466 C66.252,50.131 63.518,49.089 63.247,48.983 C60.005,47.714 58.266,46.748 57.107,45.333 C55.663,43.571 55.454,41.287 56.575,38.169 C56.695,37.891 56.818,37.605 56.946,37.305 C57.154,36.818 58.935,32.594 59.423,31.471 C60.314,29.42 60.983,28.007 61.561,27.001 C64.119,24.206 66.335,24.211 68.811,27.631 C70,28.993 70.407,29.464 70.95,30.117 C71.153,30.362 71.348,30.599 71.538,30.836 C72.06,31.484 72.561,32.14 73.096,32.875 C74.498,35.621 80.758,48.024 80.975,48.453 C85.012,56.438 88.787,63.862 93.122,72.323 C94,74.281 93.864,75.102 92.526,76.819 C90.213,79.49 89.218,80.158 87.047,80.158 C65.367,80.347 42.99,80.347 21.276,80.234 Z",
    shapePath:
      "M12.198,58.843 C11.975,60.358 12.102,61.599 12.566,62.574 C13.199,64.824 13.682,66.315 14.037,67.105 C14.7,68.578 14.748,70.926 13.967,71.84 C13.573,72.303 12.799,72.943 10.327,74.913 C9.08,75.907 8.476,76.395 7.914,76.869 C7.197,77.475 7.048,78.025 7.31,78.472 C7.57,78.914 8.217,79.232 8.928,79.232 C8.96,79.232 16.504,79.282 21.281,79.307 C42.991,79.42 65.366,79.42 87.041,79.232 C88.878,79.232 89.672,78.699 91.81,76.231 C92.931,74.792 93.007,74.332 92.287,72.724 C87.962,64.283 84.186,56.858 80.148,48.871 C79.932,48.443 73.721,36.139 72.325,33.39 C71.807,32.679 71.321,32.045 70.816,31.417 C70.629,31.184 70.438,30.951 70.238,30.71 C69.699,30.062 69.293,29.593 68.099,28.225 C65.961,25.266 64.441,25.243 62.339,27.508 C61.788,28.473 61.137,29.85 60.273,31.84 C59.788,32.958 58.008,37.178 57.798,37.669 C57.669,37.97 57.546,38.257 57.436,38.509 C56.429,41.315 56.606,43.26 57.824,44.746 C58.85,45.998 60.486,46.907 63.585,48.12 C63.849,48.224 66.588,49.267 67.411,49.598 C67.529,49.639 68.083,49.824 68.235,49.876 C68.624,50.009 68.966,50.133 69.313,50.27 C70.237,50.634 71.086,51.046 71.891,51.547 C74.697,53.29 76.536,55.841 77.024,59.466 C77.306,64.261 75.577,66.653 71.915,66.379 C43.524,66.379 27.86,66.06 24.747,65.412 C22.772,65.194 21.905,64.432 22.237,63.175 C22.446,62.382 22.857,61.824 24.397,59.992 C24.584,59.77 24.718,59.608 24.849,59.449 C24.909,59.376 24.966,59.306 25.021,59.237 C26.26,58.203 27.388,57.706 28.65,57.535 C29.432,57.429 29.999,57.438 31.485,57.532 C31.851,57.555 32.062,57.567 32.296,57.578 C32.927,57.607 33.936,57.729 35.529,57.959 C36.365,58.079 39.748,58.589 40.341,58.676 C41.206,58.804 41.978,58.914 42.714,59.016 C45.361,59.381 47.472,59.617 49.148,59.717 C51.255,59.717 52.247,58.174 51.289,57.471 C49.958,56.599 48.458,55.559 45.701,53.616 C45.436,53.43 45.239,53.29 44.874,53.034 C44.581,52.827 44.363,52.673 44.151,52.524 C43.607,52.141 43.159,51.826 42.729,51.525 C42.898,51.65 39.654,49.343 39.026,48.786 C37.112,47.087 36.883,45.347 38.325,42.034 C39.506,38.284 38.607,36.485 36.026,35.203 C35.643,35.012 34.382,34.465 34.294,34.424 C33.28,33.969 31.983,33.039 30.722,31.923 C29.765,31.077 28.525,29.615 25.781,26.209 C25.612,25.999 25.607,25.993 25.509,25.872 C22.863,23.164 21.344,21.882 19.768,21.181 C18.806,20.753 18.222,21.101 17.817,22.437 C14.307,45.108 12.433,57.247 12.198,58.843 Z M21.276,80.234 C16.496,80.209 8.957,80.158 8.928,80.158 C7.908,80.158 6.95,79.688 6.511,78.94 C6,78.069 6.28,77.037 7.316,76.162 C7.887,75.679 8.496,75.188 9.724,74.209 C12.115,72.303 12.929,71.63 13.262,71.239 C13.764,70.651 13.724,68.667 13.192,67.485 C12.814,66.644 12.323,65.133 11.712,62.935 C11.176,61.786 11.036,60.375 11.282,58.709 C11.517,57.107 13.392,44.963 16.907,22.264 C17.472,20.348 18.614,19.653 20.145,20.334 C21.867,21.1 23.451,22.439 26.188,25.24 C26.328,25.412 26.328,25.412 26.44,25.55 C29.198,28.974 30.437,30.435 31.335,31.229 C32.532,32.287 33.761,33.169 34.561,33.525 C34.754,33.616 36.029,34.17 36.439,34.373 C39.414,35.851 40.539,38.111 39.201,42.337 C37.88,45.368 38.051,46.681 39.641,48.093 C40.225,48.612 43.405,50.873 43.271,50.774 C43.691,51.067 44.14,51.383 44.684,51.766 C44.897,51.916 45.115,52.07 45.408,52.276 C45.773,52.533 45.97,52.672 46.138,52.791 C48.983,54.796 50.478,55.832 51.817,56.71 C52.645,57.317 52.787,58.358 52.224,59.234 C51.666,60.102 50.542,60.643 49.121,60.643 C47.389,60.54 45.256,60.302 42.587,59.934 C41.848,59.832 41.073,59.721 40.206,59.593 C39.611,59.505 36.229,58.996 35.397,58.876 C33.834,58.651 32.844,58.531 32.254,58.504 C32.013,58.493 31.797,58.48 31.426,58.457 C30.003,58.367 29.475,58.358 28.775,58.453 C27.697,58.599 26.739,59.018 25.713,59.855 C25.665,59.914 25.616,59.974 25.565,60.037 C25.432,60.199 25.295,60.364 25.106,60.588 C23.695,62.267 23.29,62.818 23.133,63.411 C22.979,63.994 23.366,64.331 24.869,64.493 C27.873,65.131 43.605,65.452 71.933,65.452 C74.995,65.687 76.348,63.826 76.103,59.572 C75.651,56.25 73.981,53.937 71.402,52.334 C70.648,51.865 69.848,51.477 68.973,51.132 C68.641,51.001 68.312,50.882 67.935,50.753 C67.788,50.703 67.231,50.516 67.087,50.466 C66.252,50.131 63.518,49.089 63.247,48.983 C60.005,47.714 58.266,46.748 57.107,45.333 C55.663,43.571 55.454,41.287 56.575,38.169 C56.695,37.891 56.818,37.605 56.946,37.305 C57.154,36.818 58.935,32.594 59.423,31.471 C60.314,29.42 60.983,28.007 61.561,27.001 C64.119,24.206 66.335,24.211 68.811,27.631 C70,28.993 70.407,29.464 70.95,30.117 C71.153,30.362 71.348,30.599 71.538,30.836 C72.06,31.484 72.561,32.14 73.096,32.875 C74.498,35.621 80.758,48.024 80.975,48.453 C85.012,56.438 88.787,63.862 93.122,72.323 C94,74.281 93.864,75.102 92.526,76.819 C90.213,79.49 89.218,80.158 87.047,80.158 C65.367,80.347 42.99,80.347 21.276,80.234 Z",
    start: { x: 12.198, y: 58.843, rotation: 188 },
    facts: ["15 turns","5.412 km","Clockwise"]
  },
  {
    id: "4069",
    label: "Jeddah Street",
    name: "Jeddah Street Circuit",
    location: "Jeddah, Saudi Arabia",
    accent: "#ff5f57",
    path: "M8.784,75.671 A3.06,3.06 0 0,1 7.583,75.435 A2.535,2.535 0 0,1 6,72.99 A2.483,2.483 0 0,1 6.41,71.842 A3.652,3.652 0 0,1 7.651,70.697 L7.651,70.697 A7.119,7.119 0 0,1 8.892,70.123 C10.444,69.555 11.995,68.881 13.51,68.223 C14.106,67.963 14.698,67.705 15.297,67.451 L21.116,64.968 A5.406,5.406 0 0,1 23.111,64.596 C23.511,64.596 23.797,64.614 24.042,64.633 A6.141,6.141 0 0,0 25.507,64.599 A7.069,7.069 0 0,0 26.63,64.32 C27.4,64.084 28.182,63.839 29.081,64.124 C29.702,64.329 30.102,64.798 30.475,65.254 C30.888,65.76 31.244,66.185 31.927,66.299 C32.936,66.448 33.975,66.104 34.863,65.747 L35.244,65.601 C35.831,65.387 36.92,64.981 37.016,64.506 A4.062,4.062 0 0,0 37.085,63.832 A2.517,2.517 0 0,1 37.451,62.439 A6.362,6.362 0 0,1 39.365,60.686 L39.595,60.549 C40.141,60.217 40.889,59.761 41.808,59.879 A6.79,6.79 0 0,1 42.493,60.016 C43.626,60.273 45.333,60.661 46.45,59.609 C47.638,58.486 47.651,57.356 47.552,56.782 A1.275,1.275 0 0,0 47.517,56.636 C47.452,56.422 47.288,55.851 47.828,55.578 C48.219,55.376 54.078,52.183 55.142,51.485 L55.35,51.348 C56.411,50.65 57.249,50.107 58.102,50.061 C58.199,50.061 58.335,50.061 58.5,50.061 C61.656,49.98 62.146,49.623 62.223,49.474 C62.223,49.266 62.047,49.083 61.767,48.832 S61.153,48.298 61.153,47.87 A1.123,1.123 0 0,1 61.606,47.054 C62.434,46.327 77.432,33.67 78.14,33.182 C78.239,33.111 78.587,32.872 79.266,32.428 L82.462,30.315 L88.166,26.557 L91.291,24.506 A2.24,2.24 0 0,1 93.125,24.329 A1.437,1.437 0 0,1 93.947,25.26 A2.793,2.793 0 0,1 94,26.464 C93.963,26.721 93.91,26.97 93.86,27.212 C93.06,31.035 91.943,35.038 89.234,38.43 A28.521,28.521 0 0,1 84.889,42.69 A17.871,17.871 0 0,1 79.638,45.794 C77.746,46.464 75.831,46.588 73.432,46.197 L73.327,46.178 C71.8,45.93 70.223,45.673 68.737,45.924 A2.452,2.452 0 0,0 67.573,46.371 A17.502,17.502 0 0,1 66.084,47.42 L66.012,47.463 A3.026,3.026 0 0,0 64.877,48.618 A5.412,5.412 0 0,0 64.582,49.521 C64.334,50.452 63.992,51.721 62.763,51.894 C62.49,51.935 62.192,51.947 61.879,51.963 A9.102,9.102 0 0,0 60.194,52.158 L60.042,52.192 C58.993,52.438 56.545,53.012 54.766,54.287 C52.905,55.625 52.839,55.711 52.402,56.282 L52.386,56.301 C52.29,56.425 52.147,56.611 51.986,56.86 C51.365,57.747 50.329,59.23 49.274,60.003 Q48.861,60.313 48.483,60.599 C47.552,61.31 46.742,61.924 45.901,62.188 L45.358,62.349 C44.144,62.694 42.118,63.28 40.933,64.391 C40.312,64.974 39.629,65.673 39.03,66.284 A21.722,21.722 0 0,1 37.01,68.217 C36.535,68.562 32.278,71.547 29.727,70.622 C28.38,70.132 28.076,69.493 27.865,69.024 C27.701,68.676 27.645,68.559 27.13,68.521 A4.676,4.676 0 0,0 25.314,68.875 A5.257,5.257 0 0,1 23.021,69.263 L22.313,69.182 C20.591,68.978 18.965,68.785 17.308,69.437 C16.129,69.899 15.018,70.731 13.808,72.05 C13.55,72.332 13.299,72.636 13.054,72.934 C12.321,73.828 11.561,74.753 10.428,75.286 A3.913,3.913 0 0,1 8.784,75.671 Z M23.108,65.415 A4.655,4.655 0 0,0 21.438,65.725 L15.611,68.208 Q14.717,68.587 13.829,68.978 C12.315,69.635 10.751,70.318 9.175,70.895 A6.517,6.517 0 0,0 8.07,71.404 L8.07,71.404 A2.858,2.858 0 0,0 7.099,72.292 A1.573,1.573 0 0,0 7.905,74.697 A2.721,2.721 0 0,0 10.102,74.56 C11.071,74.104 11.738,73.291 12.445,72.428 C12.697,72.118 12.954,71.808 13.227,71.497 C14.524,70.082 15.732,69.189 17.029,68.676 C18.891,67.95 20.6,68.155 22.428,68.366 L23.13,68.447 A4.54,4.54 0 0,0 25.075,68.096 A5.431,5.431 0 0,1 27.207,67.702 C28.194,67.773 28.42,68.248 28.619,68.667 S29.001,69.474 30.034,69.849 C31.791,70.47 34.968,68.704 36.551,67.55 A21.666,21.666 0 0,0 38.465,65.707 C39.086,65.086 39.756,64.388 40.389,63.789 C41.721,62.548 43.865,61.927 45.15,61.558 L45.671,61.406 C46.379,61.182 47.133,60.608 48.005,59.944 C48.262,59.749 48.529,59.547 48.811,59.342 C49.758,58.647 50.745,57.232 51.337,56.385 C51.511,56.133 51.648,55.935 51.76,55.795 L51.775,55.777 C52.287,55.112 52.427,54.973 54.307,53.604 S58.77,51.634 59.862,51.379 L60.014,51.342 A9.75,9.75 0 0,1 61.848,51.128 C62.14,51.128 62.419,51.1 62.655,51.066 C63.303,50.976 63.542,50.268 63.806,49.285 A5.645,5.645 0 0,1 64.157,48.233 A3.873,3.873 0 0,1 65.569,46.774 L65.637,46.731 A16.447,16.447 0 0,0 67.058,45.732 A3.33,3.33 0 0,1 68.61,45.111 C70.223,44.835 71.874,45.111 73.469,45.365 L73.572,45.384 C75.828,45.75 77.606,45.638 79.375,45.015 A17.108,17.108 0 0,0 84.383,42.054 A27.463,27.463 0 0,0 88.607,37.939 C91.213,34.681 92.293,30.784 93.075,27.06 C93.122,26.833 93.171,26.594 93.206,26.365 A1.974,1.974 0 0,0 93.181,25.514 A0.645,0.645 0 0,0 92.821,25.08 A1.48,1.48 0 0,0 91.688,25.22 L88.619,27.24 L82.919,31.004 L79.722,33.114 L78.618,33.853 C78.028,34.268 63.434,46.545 62.152,47.671 C61.988,47.817 61.975,47.888 61.975,47.888 C61.975,47.953 62.177,48.124 62.285,48.227 C62.596,48.512 63.027,48.9 63.005,49.508 C62.965,50.545 61.252,50.799 58.506,50.867 L58.124,50.867 C57.503,50.898 56.737,51.395 55.781,52.022 L55.57,52.161 C54.506,52.86 48.985,55.867 48.256,56.258 C48.256,56.307 48.284,56.366 48.296,56.41 A1.936,1.936 0 0,1 48.349,56.624 C48.479,57.375 48.47,58.815 47.009,60.196 S43.533,61.083 42.313,60.816 C42.065,60.76 41.854,60.711 41.693,60.692 C41.05,60.614 40.47,60.968 39.998,61.251 L39.753,61.4 A5.511,5.511 0 0,0 38.118,62.889 A1.772,1.772 0 0,0 37.879,63.879 A4.965,4.965 0 0,1 37.798,64.673 C37.612,65.604 36.346,66.07 35.505,66.374 L35.151,66.507 C34.164,66.908 32.979,67.289 31.791,67.109 C30.798,66.96 30.282,66.33 29.829,65.775 C29.519,65.381 29.227,65.036 28.818,64.906 C28.175,64.698 27.576,64.888 26.85,65.105 A7.33,7.33 0 0,1 25.609,65.415 A6.737,6.737 0 0,1 23.983,65.455 C23.738,65.434 23.477,65.415 23.108,65.415 Z M8.784,75.671 A3.06,3.06 0 0,1 7.583,75.435 A2.535,2.535 0 0,1 6,72.99 A2.483,2.483 0 0,1 6.41,71.842 A3.652,3.652 0 0,1 7.651,70.697 L7.651,70.697 A7.119,7.119 0 0,1 8.892,70.123 C10.444,69.555 11.995,68.881 13.51,68.223 C14.106,67.963 14.698,67.705 15.297,67.451 L21.116,64.968 A5.406,5.406 0 0,1 23.111,64.596 C23.511,64.596 23.797,64.614 24.042,64.633 A6.141,6.141 0 0,0 25.507,64.599 A7.069,7.069 0 0,0 26.63,64.32 C27.4,64.084 28.182,63.839 29.081,64.124 C29.702,64.329 30.102,64.798 30.475,65.254 C30.888,65.76 31.244,66.185 31.927,66.299 C32.936,66.448 33.975,66.104 34.863,65.747 L35.244,65.601 C35.831,65.387 36.92,64.981 37.016,64.506 A4.062,4.062 0 0,0 37.085,63.832 A2.517,2.517 0 0,1 37.451,62.439 A6.362,6.362 0 0,1 39.365,60.686 L39.595,60.549 C40.141,60.217 40.889,59.761 41.808,59.879 A6.79,6.79 0 0,1 42.493,60.016 C43.626,60.273 45.333,60.661 46.45,59.609 C47.638,58.486 47.651,57.356 47.552,56.782 A1.275,1.275 0 0,0 47.517,56.636 C47.452,56.422 47.288,55.851 47.828,55.578 C48.219,55.376 54.078,52.183 55.142,51.485 L55.35,51.348 C56.411,50.65 57.249,50.107 58.102,50.061 C58.199,50.061 58.335,50.061 58.5,50.061 C61.656,49.98 62.146,49.623 62.223,49.474 C62.223,49.266 62.047,49.083 61.767,48.832 S61.153,48.298 61.153,47.87 A1.123,1.123 0 0,1 61.606,47.054 C62.434,46.327 77.432,33.67 78.14,33.182 C78.239,33.111 78.587,32.872 79.266,32.428 L82.462,30.315 L88.166,26.557 L91.291,24.506 A2.24,2.24 0 0,1 93.125,24.329 A1.437,1.437 0 0,1 93.947,25.26 A2.793,2.793 0 0,1 94,26.464 C93.963,26.721 93.91,26.97 93.86,27.212 C93.06,31.035 91.943,35.038 89.234,38.43 A28.521,28.521 0 0,1 84.889,42.69 A17.871,17.871 0 0,1 79.638,45.794 C77.746,46.464 75.831,46.588 73.432,46.197 L73.327,46.178 C71.8,45.93 70.223,45.673 68.737,45.924 A2.452,2.452 0 0,0 67.573,46.371 A17.502,17.502 0 0,1 66.084,47.42 L66.012,47.463 A3.026,3.026 0 0,0 64.877,48.618 A5.412,5.412 0 0,0 64.582,49.521 C64.334,50.452 63.992,51.721 62.763,51.894 C62.49,51.935 62.192,51.947 61.879,51.963 A9.102,9.102 0 0,0 60.194,52.158 L60.042,52.192 C58.993,52.438 56.545,53.012 54.766,54.287 C52.905,55.625 52.839,55.711 52.402,56.282 L52.386,56.301 C52.29,56.425 52.147,56.611 51.986,56.86 C51.365,57.747 50.329,59.23 49.274,60.003 Q48.861,60.313 48.483,60.599 C47.552,61.31 46.742,61.924 45.901,62.188 L45.358,62.349 C44.144,62.694 42.118,63.28 40.933,64.391 C40.312,64.974 39.629,65.673 39.03,66.284 A21.722,21.722 0 0,1 37.01,68.217 C36.535,68.562 32.278,71.547 29.727,70.622 C28.38,70.132 28.076,69.493 27.865,69.024 C27.701,68.676 27.645,68.559 27.13,68.521 A4.676,4.676 0 0,0 25.314,68.875 A5.257,5.257 0 0,1 23.021,69.263 L22.313,69.182 C20.591,68.978 18.965,68.785 17.308,69.437 C16.129,69.899 15.018,70.731 13.808,72.05 C13.55,72.332 13.299,72.636 13.054,72.934 C12.321,73.828 11.561,74.753 10.428,75.286 A3.913,3.913 0 0,1 8.784,75.671 Z M23.108,65.415 A4.655,4.655 0 0,0 21.438,65.725 L15.611,68.208 Q14.717,68.587 13.829,68.978 C12.315,69.635 10.751,70.318 9.175,70.895 A6.517,6.517 0 0,0 8.07,71.404 L8.07,71.404 A2.858,2.858 0 0,0 7.099,72.292 A1.573,1.573 0 0,0 7.905,74.697 A2.721,2.721 0 0,0 10.102,74.56 C11.071,74.104 11.738,73.291 12.445,72.428 C12.697,72.118 12.954,71.808 13.227,71.497 C14.524,70.082 15.732,69.189 17.029,68.676 C18.891,67.95 20.6,68.155 22.428,68.366 L23.13,68.447 A4.54,4.54 0 0,0 25.075,68.096 A5.431,5.431 0 0,1 27.207,67.702 C28.194,67.773 28.42,68.248 28.619,68.667 S29.001,69.474 30.034,69.849 C31.791,70.47 34.968,68.704 36.551,67.55 A21.666,21.666 0 0,0 38.465,65.707 C39.086,65.086 39.756,64.388 40.389,63.789 C41.721,62.548 43.865,61.927 45.15,61.558 L45.671,61.406 C46.379,61.182 47.133,60.608 48.005,59.944 C48.262,59.749 48.529,59.547 48.811,59.342 C49.758,58.647 50.745,57.232 51.337,56.385 C51.511,56.133 51.648,55.935 51.76,55.795 L51.775,55.777 C52.287,55.112 52.427,54.973 54.307,53.604 S58.77,51.634 59.862,51.379 L60.014,51.342 A9.75,9.75 0 0,1 61.848,51.128 C62.14,51.128 62.419,51.1 62.655,51.066 C63.303,50.976 63.542,50.268 63.806,49.285 A5.645,5.645 0 0,1 64.157,48.233 A3.873,3.873 0 0,1 65.569,46.774 L65.637,46.731 A16.447,16.447 0 0,0 67.058,45.732 A3.33,3.33 0 0,1 68.61,45.111 C70.223,44.835 71.874,45.111 73.469,45.365 L73.572,45.384 C75.828,45.75 77.606,45.638 79.375,45.015 A17.108,17.108 0 0,0 84.383,42.054 A27.463,27.463 0 0,0 88.607,37.939 C91.213,34.681 92.293,30.784 93.075,27.06 C93.122,26.833 93.171,26.594 93.206,26.365 A1.974,1.974 0 0,0 93.181,25.514 A0.645,0.645 0 0,0 92.821,25.08 A1.48,1.48 0 0,0 91.688,25.22 L88.619,27.24 L82.919,31.004 L79.722,33.114 L78.618,33.853 C78.028,34.268 63.434,46.545 62.152,47.671 C61.988,47.817 61.975,47.888 61.975,47.888 C61.975,47.953 62.177,48.124 62.285,48.227 C62.596,48.512 63.027,48.9 63.005,49.508 C62.965,50.545 61.252,50.799 58.506,50.867 L58.124,50.867 C57.503,50.898 56.737,51.395 55.781,52.022 L55.57,52.161 C54.506,52.86 48.985,55.867 48.256,56.258 C48.256,56.307 48.284,56.366 48.296,56.41 A1.936,1.936 0 0,1 48.349,56.624 C48.479,57.375 48.47,58.815 47.009,60.196 S43.533,61.083 42.313,60.816 C42.065,60.76 41.854,60.711 41.693,60.692 C41.05,60.614 40.47,60.968 39.998,61.251 L39.753,61.4 A5.511,5.511 0 0,0 38.118,62.889 A1.772,1.772 0 0,0 37.879,63.879 A4.965,4.965 0 0,1 37.798,64.673 C37.612,65.604 36.346,66.07 35.505,66.374 L35.151,66.507 C34.164,66.908 32.979,67.289 31.791,67.109 C30.798,66.96 30.282,66.33 29.829,65.775 C29.519,65.381 29.227,65.036 28.818,64.906 C28.175,64.698 27.576,64.888 26.85,65.105 A7.33,7.33 0 0,1 25.609,65.415 A6.737,6.737 0 0,1 23.983,65.455 C23.738,65.434 23.477,65.415 23.108,65.415 Z",
    shapePath:
      "M8.784,75.671 A3.06,3.06 0 0,1 7.583,75.435 A2.535,2.535 0 0,1 6,72.99 A2.483,2.483 0 0,1 6.41,71.842 A3.652,3.652 0 0,1 7.651,70.697 L7.651,70.697 A7.119,7.119 0 0,1 8.892,70.123 C10.444,69.555 11.995,68.881 13.51,68.223 C14.106,67.963 14.698,67.705 15.297,67.451 L21.116,64.968 A5.406,5.406 0 0,1 23.111,64.596 C23.511,64.596 23.797,64.614 24.042,64.633 A6.141,6.141 0 0,0 25.507,64.599 A7.069,7.069 0 0,0 26.63,64.32 C27.4,64.084 28.182,63.839 29.081,64.124 C29.702,64.329 30.102,64.798 30.475,65.254 C30.888,65.76 31.244,66.185 31.927,66.299 C32.936,66.448 33.975,66.104 34.863,65.747 L35.244,65.601 C35.831,65.387 36.92,64.981 37.016,64.506 A4.062,4.062 0 0,0 37.085,63.832 A2.517,2.517 0 0,1 37.451,62.439 A6.362,6.362 0 0,1 39.365,60.686 L39.595,60.549 C40.141,60.217 40.889,59.761 41.808,59.879 A6.79,6.79 0 0,1 42.493,60.016 C43.626,60.273 45.333,60.661 46.45,59.609 C47.638,58.486 47.651,57.356 47.552,56.782 A1.275,1.275 0 0,0 47.517,56.636 C47.452,56.422 47.288,55.851 47.828,55.578 C48.219,55.376 54.078,52.183 55.142,51.485 L55.35,51.348 C56.411,50.65 57.249,50.107 58.102,50.061 C58.199,50.061 58.335,50.061 58.5,50.061 C61.656,49.98 62.146,49.623 62.223,49.474 C62.223,49.266 62.047,49.083 61.767,48.832 S61.153,48.298 61.153,47.87 A1.123,1.123 0 0,1 61.606,47.054 C62.434,46.327 77.432,33.67 78.14,33.182 C78.239,33.111 78.587,32.872 79.266,32.428 L82.462,30.315 L88.166,26.557 L91.291,24.506 A2.24,2.24 0 0,1 93.125,24.329 A1.437,1.437 0 0,1 93.947,25.26 A2.793,2.793 0 0,1 94,26.464 C93.963,26.721 93.91,26.97 93.86,27.212 C93.06,31.035 91.943,35.038 89.234,38.43 A28.521,28.521 0 0,1 84.889,42.69 A17.871,17.871 0 0,1 79.638,45.794 C77.746,46.464 75.831,46.588 73.432,46.197 L73.327,46.178 C71.8,45.93 70.223,45.673 68.737,45.924 A2.452,2.452 0 0,0 67.573,46.371 A17.502,17.502 0 0,1 66.084,47.42 L66.012,47.463 A3.026,3.026 0 0,0 64.877,48.618 A5.412,5.412 0 0,0 64.582,49.521 C64.334,50.452 63.992,51.721 62.763,51.894 C62.49,51.935 62.192,51.947 61.879,51.963 A9.102,9.102 0 0,0 60.194,52.158 L60.042,52.192 C58.993,52.438 56.545,53.012 54.766,54.287 C52.905,55.625 52.839,55.711 52.402,56.282 L52.386,56.301 C52.29,56.425 52.147,56.611 51.986,56.86 C51.365,57.747 50.329,59.23 49.274,60.003 Q48.861,60.313 48.483,60.599 C47.552,61.31 46.742,61.924 45.901,62.188 L45.358,62.349 C44.144,62.694 42.118,63.28 40.933,64.391 C40.312,64.974 39.629,65.673 39.03,66.284 A21.722,21.722 0 0,1 37.01,68.217 C36.535,68.562 32.278,71.547 29.727,70.622 C28.38,70.132 28.076,69.493 27.865,69.024 C27.701,68.676 27.645,68.559 27.13,68.521 A4.676,4.676 0 0,0 25.314,68.875 A5.257,5.257 0 0,1 23.021,69.263 L22.313,69.182 C20.591,68.978 18.965,68.785 17.308,69.437 C16.129,69.899 15.018,70.731 13.808,72.05 C13.55,72.332 13.299,72.636 13.054,72.934 C12.321,73.828 11.561,74.753 10.428,75.286 A3.913,3.913 0 0,1 8.784,75.671 Z M23.108,65.415 A4.655,4.655 0 0,0 21.438,65.725 L15.611,68.208 Q14.717,68.587 13.829,68.978 C12.315,69.635 10.751,70.318 9.175,70.895 A6.517,6.517 0 0,0 8.07,71.404 L8.07,71.404 A2.858,2.858 0 0,0 7.099,72.292 A1.573,1.573 0 0,0 7.905,74.697 A2.721,2.721 0 0,0 10.102,74.56 C11.071,74.104 11.738,73.291 12.445,72.428 C12.697,72.118 12.954,71.808 13.227,71.497 C14.524,70.082 15.732,69.189 17.029,68.676 C18.891,67.95 20.6,68.155 22.428,68.366 L23.13,68.447 A4.54,4.54 0 0,0 25.075,68.096 A5.431,5.431 0 0,1 27.207,67.702 C28.194,67.773 28.42,68.248 28.619,68.667 S29.001,69.474 30.034,69.849 C31.791,70.47 34.968,68.704 36.551,67.55 A21.666,21.666 0 0,0 38.465,65.707 C39.086,65.086 39.756,64.388 40.389,63.789 C41.721,62.548 43.865,61.927 45.15,61.558 L45.671,61.406 C46.379,61.182 47.133,60.608 48.005,59.944 C48.262,59.749 48.529,59.547 48.811,59.342 C49.758,58.647 50.745,57.232 51.337,56.385 C51.511,56.133 51.648,55.935 51.76,55.795 L51.775,55.777 C52.287,55.112 52.427,54.973 54.307,53.604 S58.77,51.634 59.862,51.379 L60.014,51.342 A9.75,9.75 0 0,1 61.848,51.128 C62.14,51.128 62.419,51.1 62.655,51.066 C63.303,50.976 63.542,50.268 63.806,49.285 A5.645,5.645 0 0,1 64.157,48.233 A3.873,3.873 0 0,1 65.569,46.774 L65.637,46.731 A16.447,16.447 0 0,0 67.058,45.732 A3.33,3.33 0 0,1 68.61,45.111 C70.223,44.835 71.874,45.111 73.469,45.365 L73.572,45.384 C75.828,45.75 77.606,45.638 79.375,45.015 A17.108,17.108 0 0,0 84.383,42.054 A27.463,27.463 0 0,0 88.607,37.939 C91.213,34.681 92.293,30.784 93.075,27.06 C93.122,26.833 93.171,26.594 93.206,26.365 A1.974,1.974 0 0,0 93.181,25.514 A0.645,0.645 0 0,0 92.821,25.08 A1.48,1.48 0 0,0 91.688,25.22 L88.619,27.24 L82.919,31.004 L79.722,33.114 L78.618,33.853 C78.028,34.268 63.434,46.545 62.152,47.671 C61.988,47.817 61.975,47.888 61.975,47.888 C61.975,47.953 62.177,48.124 62.285,48.227 C62.596,48.512 63.027,48.9 63.005,49.508 C62.965,50.545 61.252,50.799 58.506,50.867 L58.124,50.867 C57.503,50.898 56.737,51.395 55.781,52.022 L55.57,52.161 C54.506,52.86 48.985,55.867 48.256,56.258 C48.256,56.307 48.284,56.366 48.296,56.41 A1.936,1.936 0 0,1 48.349,56.624 C48.479,57.375 48.47,58.815 47.009,60.196 S43.533,61.083 42.313,60.816 C42.065,60.76 41.854,60.711 41.693,60.692 C41.05,60.614 40.47,60.968 39.998,61.251 L39.753,61.4 A5.511,5.511 0 0,0 38.118,62.889 A1.772,1.772 0 0,0 37.879,63.879 A4.965,4.965 0 0,1 37.798,64.673 C37.612,65.604 36.346,66.07 35.505,66.374 L35.151,66.507 C34.164,66.908 32.979,67.289 31.791,67.109 C30.798,66.96 30.282,66.33 29.829,65.775 C29.519,65.381 29.227,65.036 28.818,64.906 C28.175,64.698 27.576,64.888 26.85,65.105 A7.33,7.33 0 0,1 25.609,65.415 A6.737,6.737 0 0,1 23.983,65.455 C23.738,65.434 23.477,65.415 23.108,65.415 Z M8.784,75.671 A3.06,3.06 0 0,1 7.583,75.435 A2.535,2.535 0 0,1 6,72.99 A2.483,2.483 0 0,1 6.41,71.842 A3.652,3.652 0 0,1 7.651,70.697 L7.651,70.697 A7.119,7.119 0 0,1 8.892,70.123 C10.444,69.555 11.995,68.881 13.51,68.223 C14.106,67.963 14.698,67.705 15.297,67.451 L21.116,64.968 A5.406,5.406 0 0,1 23.111,64.596 C23.511,64.596 23.797,64.614 24.042,64.633 A6.141,6.141 0 0,0 25.507,64.599 A7.069,7.069 0 0,0 26.63,64.32 C27.4,64.084 28.182,63.839 29.081,64.124 C29.702,64.329 30.102,64.798 30.475,65.254 C30.888,65.76 31.244,66.185 31.927,66.299 C32.936,66.448 33.975,66.104 34.863,65.747 L35.244,65.601 C35.831,65.387 36.92,64.981 37.016,64.506 A4.062,4.062 0 0,0 37.085,63.832 A2.517,2.517 0 0,1 37.451,62.439 A6.362,6.362 0 0,1 39.365,60.686 L39.595,60.549 C40.141,60.217 40.889,59.761 41.808,59.879 A6.79,6.79 0 0,1 42.493,60.016 C43.626,60.273 45.333,60.661 46.45,59.609 C47.638,58.486 47.651,57.356 47.552,56.782 A1.275,1.275 0 0,0 47.517,56.636 C47.452,56.422 47.288,55.851 47.828,55.578 C48.219,55.376 54.078,52.183 55.142,51.485 L55.35,51.348 C56.411,50.65 57.249,50.107 58.102,50.061 C58.199,50.061 58.335,50.061 58.5,50.061 C61.656,49.98 62.146,49.623 62.223,49.474 C62.223,49.266 62.047,49.083 61.767,48.832 S61.153,48.298 61.153,47.87 A1.123,1.123 0 0,1 61.606,47.054 C62.434,46.327 77.432,33.67 78.14,33.182 C78.239,33.111 78.587,32.872 79.266,32.428 L82.462,30.315 L88.166,26.557 L91.291,24.506 A2.24,2.24 0 0,1 93.125,24.329 A1.437,1.437 0 0,1 93.947,25.26 A2.793,2.793 0 0,1 94,26.464 C93.963,26.721 93.91,26.97 93.86,27.212 C93.06,31.035 91.943,35.038 89.234,38.43 A28.521,28.521 0 0,1 84.889,42.69 A17.871,17.871 0 0,1 79.638,45.794 C77.746,46.464 75.831,46.588 73.432,46.197 L73.327,46.178 C71.8,45.93 70.223,45.673 68.737,45.924 A2.452,2.452 0 0,0 67.573,46.371 A17.502,17.502 0 0,1 66.084,47.42 L66.012,47.463 A3.026,3.026 0 0,0 64.877,48.618 A5.412,5.412 0 0,0 64.582,49.521 C64.334,50.452 63.992,51.721 62.763,51.894 C62.49,51.935 62.192,51.947 61.879,51.963 A9.102,9.102 0 0,0 60.194,52.158 L60.042,52.192 C58.993,52.438 56.545,53.012 54.766,54.287 C52.905,55.625 52.839,55.711 52.402,56.282 L52.386,56.301 C52.29,56.425 52.147,56.611 51.986,56.86 C51.365,57.747 50.329,59.23 49.274,60.003 Q48.861,60.313 48.483,60.599 C47.552,61.31 46.742,61.924 45.901,62.188 L45.358,62.349 C44.144,62.694 42.118,63.28 40.933,64.391 C40.312,64.974 39.629,65.673 39.03,66.284 A21.722,21.722 0 0,1 37.01,68.217 C36.535,68.562 32.278,71.547 29.727,70.622 C28.38,70.132 28.076,69.493 27.865,69.024 C27.701,68.676 27.645,68.559 27.13,68.521 A4.676,4.676 0 0,0 25.314,68.875 A5.257,5.257 0 0,1 23.021,69.263 L22.313,69.182 C20.591,68.978 18.965,68.785 17.308,69.437 C16.129,69.899 15.018,70.731 13.808,72.05 C13.55,72.332 13.299,72.636 13.054,72.934 C12.321,73.828 11.561,74.753 10.428,75.286 A3.913,3.913 0 0,1 8.784,75.671 Z M23.108,65.415 A4.655,4.655 0 0,0 21.438,65.725 L15.611,68.208 Q14.717,68.587 13.829,68.978 C12.315,69.635 10.751,70.318 9.175,70.895 A6.517,6.517 0 0,0 8.07,71.404 L8.07,71.404 A2.858,2.858 0 0,0 7.099,72.292 A1.573,1.573 0 0,0 7.905,74.697 A2.721,2.721 0 0,0 10.102,74.56 C11.071,74.104 11.738,73.291 12.445,72.428 C12.697,72.118 12.954,71.808 13.227,71.497 C14.524,70.082 15.732,69.189 17.029,68.676 C18.891,67.95 20.6,68.155 22.428,68.366 L23.13,68.447 A4.54,4.54 0 0,0 25.075,68.096 A5.431,5.431 0 0,1 27.207,67.702 C28.194,67.773 28.42,68.248 28.619,68.667 S29.001,69.474 30.034,69.849 C31.791,70.47 34.968,68.704 36.551,67.55 A21.666,21.666 0 0,0 38.465,65.707 C39.086,65.086 39.756,64.388 40.389,63.789 C41.721,62.548 43.865,61.927 45.15,61.558 L45.671,61.406 C46.379,61.182 47.133,60.608 48.005,59.944 C48.262,59.749 48.529,59.547 48.811,59.342 C49.758,58.647 50.745,57.232 51.337,56.385 C51.511,56.133 51.648,55.935 51.76,55.795 L51.775,55.777 C52.287,55.112 52.427,54.973 54.307,53.604 S58.77,51.634 59.862,51.379 L60.014,51.342 A9.75,9.75 0 0,1 61.848,51.128 C62.14,51.128 62.419,51.1 62.655,51.066 C63.303,50.976 63.542,50.268 63.806,49.285 A5.645,5.645 0 0,1 64.157,48.233 A3.873,3.873 0 0,1 65.569,46.774 L65.637,46.731 A16.447,16.447 0 0,0 67.058,45.732 A3.33,3.33 0 0,1 68.61,45.111 C70.223,44.835 71.874,45.111 73.469,45.365 L73.572,45.384 C75.828,45.75 77.606,45.638 79.375,45.015 A17.108,17.108 0 0,0 84.383,42.054 A27.463,27.463 0 0,0 88.607,37.939 C91.213,34.681 92.293,30.784 93.075,27.06 C93.122,26.833 93.171,26.594 93.206,26.365 A1.974,1.974 0 0,0 93.181,25.514 A0.645,0.645 0 0,0 92.821,25.08 A1.48,1.48 0 0,0 91.688,25.22 L88.619,27.24 L82.919,31.004 L79.722,33.114 L78.618,33.853 C78.028,34.268 63.434,46.545 62.152,47.671 C61.988,47.817 61.975,47.888 61.975,47.888 C61.975,47.953 62.177,48.124 62.285,48.227 C62.596,48.512 63.027,48.9 63.005,49.508 C62.965,50.545 61.252,50.799 58.506,50.867 L58.124,50.867 C57.503,50.898 56.737,51.395 55.781,52.022 L55.57,52.161 C54.506,52.86 48.985,55.867 48.256,56.258 C48.256,56.307 48.284,56.366 48.296,56.41 A1.936,1.936 0 0,1 48.349,56.624 C48.479,57.375 48.47,58.815 47.009,60.196 S43.533,61.083 42.313,60.816 C42.065,60.76 41.854,60.711 41.693,60.692 C41.05,60.614 40.47,60.968 39.998,61.251 L39.753,61.4 A5.511,5.511 0 0,0 38.118,62.889 A1.772,1.772 0 0,0 37.879,63.879 A4.965,4.965 0 0,1 37.798,64.673 C37.612,65.604 36.346,66.07 35.505,66.374 L35.151,66.507 C34.164,66.908 32.979,67.289 31.791,67.109 C30.798,66.96 30.282,66.33 29.829,65.775 C29.519,65.381 29.227,65.036 28.818,64.906 C28.175,64.698 27.576,64.888 26.85,65.105 A7.33,7.33 0 0,1 25.609,65.415 A6.737,6.737 0 0,1 23.983,65.455 C23.738,65.434 23.477,65.415 23.108,65.415 Z",
    start: { x: 8.784, y: 75.671, rotation: -79 },
    facts: ["5.154 km","Clockwise"]
  },
  {
    id: "4243",
    label: "Miami Autodrome",
    name: "Miami International Autodrome",
    location: "Florida, USA",
    accent: "#f05a7e",
    path: "M53.943,66.687 C53.549,66.687 53.149,66.687 52.758,66.654 A27.958,27.958 0 0,1 46.575,65.525 A19.802,19.802 0 0,1 43.613,64.299 A19.162,19.162 0 0,0 40.701,63.114 C38.286,62.424 35.605,62.563 33.013,62.699 C31.949,62.752 30.847,62.812 29.792,62.809 C28.835,62.809 27.849,62.838 26.895,62.871 A40.332,40.332 0 0,1 21.035,62.785 C19.071,62.56 18.464,62.444 17.696,62.299 L17.619,62.284 A9.335,9.335 0 0,1 16.603,61.988 C15.59,61.65 14.061,61.144 12.651,61.194 A12.422,12.422 0 0,0 11.303,61.351 C10.358,61.496 9.377,61.647 8.468,61.396 C7.022,60.996 6,59.396 6.142,57.752 C6.261,56.38 7.096,55.038 8.432,54.069 A7.472,7.472 0 0,1 13.925,52.807 C14.784,52.94 15.972,53.237 16.739,53.882 A10.105,10.105 0 0,1 17.575,54.718 A6.915,6.915 0 0,0 18.493,55.624 Q18.635,55.731 18.789,55.847 C19.311,56.267 19.8,56.664 20.748,56.608 C21.915,56.54 22.836,56.487 24.877,54.869 C27.23,53.011 30.009,53.539 31.828,54.653 C34.512,56.294 41.806,60.69 43.29,61.277 C43.61,61.404 43.918,61.541 44.22,61.674 C45.5,62.24 46.712,62.776 48.862,62.658 C51.455,62.515 54.752,61.748 56.218,60.024 C57.457,58.569 57.235,56.872 57.14,56.149 C57.14,56.048 57.116,55.965 57.113,55.906 C57.083,55.544 57.048,54.309 57.774,53.637 A11.225,11.225 0 0,1 58.722,52.928 C59.314,52.508 60.724,51.524 60.796,51.169 C60.796,51.115 60.813,51.059 60.822,51.006 C60.911,50.514 60.976,50.156 58.861,48.932 C57.048,47.877 47.781,42.414 42.419,39.236 L39.193,37.331 C39.166,37.313 37.711,36.442 34.023,36.32 A9.978,9.978 0 0,0 30.311,36.791 A10.307,10.307 0 0,0 28.403,37.813 A11.782,11.782 0 0,1 26.385,38.904 C25.257,39.313 23.553,39.724 21.835,39.218 A8.316,8.316 0 0,1 19.554,38.033 L19.023,37.68 C18.849,37.571 18.671,37.464 18.493,37.357 C17.827,36.963 17.136,36.551 16.647,35.876 C16.245,35.31 16.117,34.395 16.677,33.802 C17.107,33.358 17.717,33.313 18.256,33.325 L18.256,33.325 L18.422,33.325 C23.162,33.506 27.973,33.707 32.642,33.9 L39.344,34.175 L57.978,34.934 L75.934,35.672 L76.512,35.695 Q82.582,35.947 88.658,36.205 C89.008,36.205 89.361,36.229 89.716,36.237 C90.475,36.258 91.257,36.279 92.027,36.356 C92.67,36.421 93.093,36.626 93.325,36.987 S93.565,37.808 93.366,38.379 L93.322,38.516 C92.682,40.361 92.415,41.446 92.525,41.739 A1.926,1.926 0 0,0 92.981,41.997 C93.313,42.148 94,42.462 93.698,43.164 C93.265,44.177 92.104,46.574 90.715,46.9 A7.957,7.957 0 0,1 88.454,47 A7.294,7.294 0 0,0 86.363,47.086 A1.97,1.97 0 0,0 85.272,47.726 A2.127,2.127 0 0,0 84.902,49 C84.878,50.224 85.494,50.647 86.442,51.29 Q86.668,51.441 86.905,51.61 L87.473,52.007 C88.525,52.736 89.521,53.42 88.907,54.339 C88.478,54.982 87.29,55.752 85.169,56.762 C76.622,60.833 68.629,63.872 60.733,66.094 A14.893,14.893 0 0,1 57.75,66.485 L56.891,66.544 C55.987,66.619 54.983,66.687 53.943,66.687 Z M36.194,61.757 A17.076,17.076 0 0,1 40.908,62.317 A19.633,19.633 0 0,1 43.947,63.561 A19.402,19.402 0 0,0 46.795,64.746 A27.084,27.084 0 0,0 52.794,65.842 A28.784,28.784 0 0,0 56.805,65.736 C57.101,65.712 57.398,65.694 57.694,65.676 A14.354,14.354 0 0,0 60.511,65.312 C68.362,63.114 76.311,60.077 84.804,56.03 C86.733,55.112 87.882,54.392 88.217,53.888 C88.365,53.666 87.939,53.337 86.996,52.686 C86.813,52.561 86.617,52.425 86.404,52.28 L85.96,51.983 C84.964,51.305 84.025,50.665 84.061,49 A2.924,2.924 0 0,1 84.6,47.243 A2.755,2.755 0 0,1 86.146,46.31 A7.999,7.999 0 0,1 88.472,46.201 A7.306,7.306 0 0,0 90.504,46.121 C91.334,45.928 92.311,44.275 92.904,42.903 A2.88,2.88 0 0,0 92.608,42.758 A2.337,2.337 0 0,1 91.914,42.293 C91.42,41.801 91.734,40.542 92.531,38.24 L92.575,38.104 A0.889,0.889 0 0,0 92.619,37.419 C92.534,37.286 92.294,37.197 91.929,37.162 C91.189,37.088 90.418,37.067 89.675,37.046 C89.316,37.046 88.961,37.028 88.605,37.011 Q82.541,36.753 76.459,36.504 L75.866,36.48 L57.91,35.74 L39.314,34.987 L32.613,34.712 C27.956,34.516 23.133,34.318 18.392,34.134 L18.241,34.134 C17.877,34.134 17.48,34.134 17.273,34.362 S17.11,35.082 17.317,35.378 C17.708,35.926 18.295,36.267 18.917,36.643 C19.103,36.753 19.29,36.865 19.471,36.981 L20.016,37.339 A7.531,7.531 0 0,0 22.069,38.442 C23.55,38.883 25.082,38.513 26.092,38.125 A11.193,11.193 0 0,0 27.967,37.105 A11.456,11.456 0 0,1 30.041,36.006 A10.787,10.787 0 0,1 34.047,35.479 C37.996,35.595 39.557,36.569 39.619,36.611 L42.834,38.507 C48.202,41.677 57.463,47.149 59.273,48.218 C61.708,49.634 61.788,50.271 61.628,51.154 L61.601,51.299 C61.504,51.924 60.535,52.647 59.181,53.598 C58.811,53.859 58.458,54.105 58.319,54.235 C57.954,54.573 57.874,55.313 57.916,55.844 C57.916,55.894 57.916,55.959 57.94,56.042 C58.037,56.804 58.301,58.824 56.832,60.554 C55.193,62.474 51.659,63.321 48.895,63.472 C46.549,63.603 45.189,63.001 43.876,62.421 C43.58,62.284 43.284,62.157 42.988,62.038 C41.13,61.304 31.493,55.408 31.398,55.349 C29.813,54.38 27.402,53.915 25.384,55.512 C23.31,57.162 22.211,57.34 20.792,57.426 C19.533,57.5 18.834,56.937 18.274,56.484 L18.013,56.279 A7.744,7.744 0 0,1 16.961,55.269 A8.414,8.414 0 0,0 16.206,54.49 C15.584,53.965 14.55,53.717 13.795,53.601 A6.645,6.645 0 0,0 8.906,54.718 C7.763,55.544 7.049,56.67 6.951,57.808 C6.844,59.049 7.621,60.299 8.678,60.593 C9.422,60.797 10.313,60.661 11.176,60.527 A13.486,13.486 0 0,1 12.615,60.362 C14.171,60.302 15.785,60.842 16.855,61.197 A9.48,9.48 0 0,0 17.767,61.473 L17.844,61.487 C18.594,61.63 19.186,61.742 21.121,61.961 A39.473,39.473 0 0,0 26.862,62.044 C27.825,62.012 28.815,61.979 29.789,61.982 C30.82,61.982 31.863,61.929 32.965,61.872 S35.11,61.757 36.194,61.757 Z M92.513,41.754 Z M53.943,66.687 C53.549,66.687 53.149,66.687 52.758,66.654 A27.958,27.958 0 0,1 46.575,65.525 A19.802,19.802 0 0,1 43.613,64.299 A19.162,19.162 0 0,0 40.701,63.114 C38.286,62.424 35.605,62.563 33.013,62.699 C31.949,62.752 30.847,62.812 29.792,62.809 C28.835,62.809 27.849,62.838 26.895,62.871 A40.332,40.332 0 0,1 21.035,62.785 C19.071,62.56 18.464,62.444 17.696,62.299 L17.619,62.284 A9.335,9.335 0 0,1 16.603,61.988 C15.59,61.65 14.061,61.144 12.651,61.194 A12.422,12.422 0 0,0 11.303,61.351 C10.358,61.496 9.377,61.647 8.468,61.396 C7.022,60.996 6,59.396 6.142,57.752 C6.261,56.38 7.096,55.038 8.432,54.069 A7.472,7.472 0 0,1 13.925,52.807 C14.784,52.94 15.972,53.237 16.739,53.882 A10.105,10.105 0 0,1 17.575,54.718 A6.915,6.915 0 0,0 18.493,55.624 Q18.635,55.731 18.789,55.847 C19.311,56.267 19.8,56.664 20.748,56.608 C21.915,56.54 22.836,56.487 24.877,54.869 C27.23,53.011 30.009,53.539 31.828,54.653 C34.512,56.294 41.806,60.69 43.29,61.277 C43.61,61.404 43.918,61.541 44.22,61.674 C45.5,62.24 46.712,62.776 48.862,62.658 C51.455,62.515 54.752,61.748 56.218,60.024 C57.457,58.569 57.235,56.872 57.14,56.149 C57.14,56.048 57.116,55.965 57.113,55.906 C57.083,55.544 57.048,54.309 57.774,53.637 A11.225,11.225 0 0,1 58.722,52.928 C59.314,52.508 60.724,51.524 60.796,51.169 C60.796,51.115 60.813,51.059 60.822,51.006 C60.911,50.514 60.976,50.156 58.861,48.932 C57.048,47.877 47.781,42.414 42.419,39.236 L39.193,37.331 C39.166,37.313 37.711,36.442 34.023,36.32 A9.978,9.978 0 0,0 30.311,36.791 A10.307,10.307 0 0,0 28.403,37.813 A11.782,11.782 0 0,1 26.385,38.904 C25.257,39.313 23.553,39.724 21.835,39.218 A8.316,8.316 0 0,1 19.554,38.033 L19.023,37.68 C18.849,37.571 18.671,37.464 18.493,37.357 C17.827,36.963 17.136,36.551 16.647,35.876 C16.245,35.31 16.117,34.395 16.677,33.802 C17.107,33.358 17.717,33.313 18.256,33.325 L18.256,33.325 L18.422,33.325 C23.162,33.506 27.973,33.707 32.642,33.9 L39.344,34.175 L57.978,34.934 L75.934,35.672 L76.512,35.695 Q82.582,35.947 88.658,36.205 C89.008,36.205 89.361,36.229 89.716,36.237 C90.475,36.258 91.257,36.279 92.027,36.356 C92.67,36.421 93.093,36.626 93.325,36.987 S93.565,37.808 93.366,38.379 L93.322,38.516 C92.682,40.361 92.415,41.446 92.525,41.739 A1.926,1.926 0 0,0 92.981,41.997 C93.313,42.148 94,42.462 93.698,43.164 C93.265,44.177 92.104,46.574 90.715,46.9 A7.957,7.957 0 0,1 88.454,47 A7.294,7.294 0 0,0 86.363,47.086 A1.97,1.97 0 0,0 85.272,47.726 A2.127,2.127 0 0,0 84.902,49 C84.878,50.224 85.494,50.647 86.442,51.29 Q86.668,51.441 86.905,51.61 L87.473,52.007 C88.525,52.736 89.521,53.42 88.907,54.339 C88.478,54.982 87.29,55.752 85.169,56.762 C76.622,60.833 68.629,63.872 60.733,66.094 A14.893,14.893 0 0,1 57.75,66.485 L56.891,66.544 C55.987,66.619 54.983,66.687 53.943,66.687 Z M36.194,61.757 A17.076,17.076 0 0,1 40.908,62.317 A19.633,19.633 0 0,1 43.947,63.561 A19.402,19.402 0 0,0 46.795,64.746 A27.084,27.084 0 0,0 52.794,65.842 A28.784,28.784 0 0,0 56.805,65.736 C57.101,65.712 57.398,65.694 57.694,65.676 A14.354,14.354 0 0,0 60.511,65.312 C68.362,63.114 76.311,60.077 84.804,56.03 C86.733,55.112 87.882,54.392 88.217,53.888 C88.365,53.666 87.939,53.337 86.996,52.686 C86.813,52.561 86.617,52.425 86.404,52.28 L85.96,51.983 C84.964,51.305 84.025,50.665 84.061,49 A2.924,2.924 0 0,1 84.6,47.243 A2.755,2.755 0 0,1 86.146,46.31 A7.999,7.999 0 0,1 88.472,46.201 A7.306,7.306 0 0,0 90.504,46.121 C91.334,45.928 92.311,44.275 92.904,42.903 A2.88,2.88 0 0,0 92.608,42.758 A2.337,2.337 0 0,1 91.914,42.293 C91.42,41.801 91.734,40.542 92.531,38.24 L92.575,38.104 A0.889,0.889 0 0,0 92.619,37.419 C92.534,37.286 92.294,37.197 91.929,37.162 C91.189,37.088 90.418,37.067 89.675,37.046 C89.316,37.046 88.961,37.028 88.605,37.011 Q82.541,36.753 76.459,36.504 L75.866,36.48 L57.91,35.74 L39.314,34.987 L32.613,34.712 C27.956,34.516 23.133,34.318 18.392,34.134 L18.241,34.134 C17.877,34.134 17.48,34.134 17.273,34.362 S17.11,35.082 17.317,35.378 C17.708,35.926 18.295,36.267 18.917,36.643 C19.103,36.753 19.29,36.865 19.471,36.981 L20.016,37.339 A7.531,7.531 0 0,0 22.069,38.442 C23.55,38.883 25.082,38.513 26.092,38.125 A11.193,11.193 0 0,0 27.967,37.105 A11.456,11.456 0 0,1 30.041,36.006 A10.787,10.787 0 0,1 34.047,35.479 C37.996,35.595 39.557,36.569 39.619,36.611 L42.834,38.507 C48.202,41.677 57.463,47.149 59.273,48.218 C61.708,49.634 61.788,50.271 61.628,51.154 L61.601,51.299 C61.504,51.924 60.535,52.647 59.181,53.598 C58.811,53.859 58.458,54.105 58.319,54.235 C57.954,54.573 57.874,55.313 57.916,55.844 C57.916,55.894 57.916,55.959 57.94,56.042 C58.037,56.804 58.301,58.824 56.832,60.554 C55.193,62.474 51.659,63.321 48.895,63.472 C46.549,63.603 45.189,63.001 43.876,62.421 C43.58,62.284 43.284,62.157 42.988,62.038 C41.13,61.304 31.493,55.408 31.398,55.349 C29.813,54.38 27.402,53.915 25.384,55.512 C23.31,57.162 22.211,57.34 20.792,57.426 C19.533,57.5 18.834,56.937 18.274,56.484 L18.013,56.279 A7.744,7.744 0 0,1 16.961,55.269 A8.414,8.414 0 0,0 16.206,54.49 C15.584,53.965 14.55,53.717 13.795,53.601 A6.645,6.645 0 0,0 8.906,54.718 C7.763,55.544 7.049,56.67 6.951,57.808 C6.844,59.049 7.621,60.299 8.678,60.593 C9.422,60.797 10.313,60.661 11.176,60.527 A13.486,13.486 0 0,1 12.615,60.362 C14.171,60.302 15.785,60.842 16.855,61.197 A9.48,9.48 0 0,0 17.767,61.473 L17.844,61.487 C18.594,61.63 19.186,61.742 21.121,61.961 A39.473,39.473 0 0,0 26.862,62.044 C27.825,62.012 28.815,61.979 29.789,61.982 C30.82,61.982 31.863,61.929 32.965,61.872 S35.11,61.757 36.194,61.757 Z M92.513,41.754 Z",
    shapePath:
      "M53.943,66.687 C53.549,66.687 53.149,66.687 52.758,66.654 A27.958,27.958 0 0,1 46.575,65.525 A19.802,19.802 0 0,1 43.613,64.299 A19.162,19.162 0 0,0 40.701,63.114 C38.286,62.424 35.605,62.563 33.013,62.699 C31.949,62.752 30.847,62.812 29.792,62.809 C28.835,62.809 27.849,62.838 26.895,62.871 A40.332,40.332 0 0,1 21.035,62.785 C19.071,62.56 18.464,62.444 17.696,62.299 L17.619,62.284 A9.335,9.335 0 0,1 16.603,61.988 C15.59,61.65 14.061,61.144 12.651,61.194 A12.422,12.422 0 0,0 11.303,61.351 C10.358,61.496 9.377,61.647 8.468,61.396 C7.022,60.996 6,59.396 6.142,57.752 C6.261,56.38 7.096,55.038 8.432,54.069 A7.472,7.472 0 0,1 13.925,52.807 C14.784,52.94 15.972,53.237 16.739,53.882 A10.105,10.105 0 0,1 17.575,54.718 A6.915,6.915 0 0,0 18.493,55.624 Q18.635,55.731 18.789,55.847 C19.311,56.267 19.8,56.664 20.748,56.608 C21.915,56.54 22.836,56.487 24.877,54.869 C27.23,53.011 30.009,53.539 31.828,54.653 C34.512,56.294 41.806,60.69 43.29,61.277 C43.61,61.404 43.918,61.541 44.22,61.674 C45.5,62.24 46.712,62.776 48.862,62.658 C51.455,62.515 54.752,61.748 56.218,60.024 C57.457,58.569 57.235,56.872 57.14,56.149 C57.14,56.048 57.116,55.965 57.113,55.906 C57.083,55.544 57.048,54.309 57.774,53.637 A11.225,11.225 0 0,1 58.722,52.928 C59.314,52.508 60.724,51.524 60.796,51.169 C60.796,51.115 60.813,51.059 60.822,51.006 C60.911,50.514 60.976,50.156 58.861,48.932 C57.048,47.877 47.781,42.414 42.419,39.236 L39.193,37.331 C39.166,37.313 37.711,36.442 34.023,36.32 A9.978,9.978 0 0,0 30.311,36.791 A10.307,10.307 0 0,0 28.403,37.813 A11.782,11.782 0 0,1 26.385,38.904 C25.257,39.313 23.553,39.724 21.835,39.218 A8.316,8.316 0 0,1 19.554,38.033 L19.023,37.68 C18.849,37.571 18.671,37.464 18.493,37.357 C17.827,36.963 17.136,36.551 16.647,35.876 C16.245,35.31 16.117,34.395 16.677,33.802 C17.107,33.358 17.717,33.313 18.256,33.325 L18.256,33.325 L18.422,33.325 C23.162,33.506 27.973,33.707 32.642,33.9 L39.344,34.175 L57.978,34.934 L75.934,35.672 L76.512,35.695 Q82.582,35.947 88.658,36.205 C89.008,36.205 89.361,36.229 89.716,36.237 C90.475,36.258 91.257,36.279 92.027,36.356 C92.67,36.421 93.093,36.626 93.325,36.987 S93.565,37.808 93.366,38.379 L93.322,38.516 C92.682,40.361 92.415,41.446 92.525,41.739 A1.926,1.926 0 0,0 92.981,41.997 C93.313,42.148 94,42.462 93.698,43.164 C93.265,44.177 92.104,46.574 90.715,46.9 A7.957,7.957 0 0,1 88.454,47 A7.294,7.294 0 0,0 86.363,47.086 A1.97,1.97 0 0,0 85.272,47.726 A2.127,2.127 0 0,0 84.902,49 C84.878,50.224 85.494,50.647 86.442,51.29 Q86.668,51.441 86.905,51.61 L87.473,52.007 C88.525,52.736 89.521,53.42 88.907,54.339 C88.478,54.982 87.29,55.752 85.169,56.762 C76.622,60.833 68.629,63.872 60.733,66.094 A14.893,14.893 0 0,1 57.75,66.485 L56.891,66.544 C55.987,66.619 54.983,66.687 53.943,66.687 Z M36.194,61.757 A17.076,17.076 0 0,1 40.908,62.317 A19.633,19.633 0 0,1 43.947,63.561 A19.402,19.402 0 0,0 46.795,64.746 A27.084,27.084 0 0,0 52.794,65.842 A28.784,28.784 0 0,0 56.805,65.736 C57.101,65.712 57.398,65.694 57.694,65.676 A14.354,14.354 0 0,0 60.511,65.312 C68.362,63.114 76.311,60.077 84.804,56.03 C86.733,55.112 87.882,54.392 88.217,53.888 C88.365,53.666 87.939,53.337 86.996,52.686 C86.813,52.561 86.617,52.425 86.404,52.28 L85.96,51.983 C84.964,51.305 84.025,50.665 84.061,49 A2.924,2.924 0 0,1 84.6,47.243 A2.755,2.755 0 0,1 86.146,46.31 A7.999,7.999 0 0,1 88.472,46.201 A7.306,7.306 0 0,0 90.504,46.121 C91.334,45.928 92.311,44.275 92.904,42.903 A2.88,2.88 0 0,0 92.608,42.758 A2.337,2.337 0 0,1 91.914,42.293 C91.42,41.801 91.734,40.542 92.531,38.24 L92.575,38.104 A0.889,0.889 0 0,0 92.619,37.419 C92.534,37.286 92.294,37.197 91.929,37.162 C91.189,37.088 90.418,37.067 89.675,37.046 C89.316,37.046 88.961,37.028 88.605,37.011 Q82.541,36.753 76.459,36.504 L75.866,36.48 L57.91,35.74 L39.314,34.987 L32.613,34.712 C27.956,34.516 23.133,34.318 18.392,34.134 L18.241,34.134 C17.877,34.134 17.48,34.134 17.273,34.362 S17.11,35.082 17.317,35.378 C17.708,35.926 18.295,36.267 18.917,36.643 C19.103,36.753 19.29,36.865 19.471,36.981 L20.016,37.339 A7.531,7.531 0 0,0 22.069,38.442 C23.55,38.883 25.082,38.513 26.092,38.125 A11.193,11.193 0 0,0 27.967,37.105 A11.456,11.456 0 0,1 30.041,36.006 A10.787,10.787 0 0,1 34.047,35.479 C37.996,35.595 39.557,36.569 39.619,36.611 L42.834,38.507 C48.202,41.677 57.463,47.149 59.273,48.218 C61.708,49.634 61.788,50.271 61.628,51.154 L61.601,51.299 C61.504,51.924 60.535,52.647 59.181,53.598 C58.811,53.859 58.458,54.105 58.319,54.235 C57.954,54.573 57.874,55.313 57.916,55.844 C57.916,55.894 57.916,55.959 57.94,56.042 C58.037,56.804 58.301,58.824 56.832,60.554 C55.193,62.474 51.659,63.321 48.895,63.472 C46.549,63.603 45.189,63.001 43.876,62.421 C43.58,62.284 43.284,62.157 42.988,62.038 C41.13,61.304 31.493,55.408 31.398,55.349 C29.813,54.38 27.402,53.915 25.384,55.512 C23.31,57.162 22.211,57.34 20.792,57.426 C19.533,57.5 18.834,56.937 18.274,56.484 L18.013,56.279 A7.744,7.744 0 0,1 16.961,55.269 A8.414,8.414 0 0,0 16.206,54.49 C15.584,53.965 14.55,53.717 13.795,53.601 A6.645,6.645 0 0,0 8.906,54.718 C7.763,55.544 7.049,56.67 6.951,57.808 C6.844,59.049 7.621,60.299 8.678,60.593 C9.422,60.797 10.313,60.661 11.176,60.527 A13.486,13.486 0 0,1 12.615,60.362 C14.171,60.302 15.785,60.842 16.855,61.197 A9.48,9.48 0 0,0 17.767,61.473 L17.844,61.487 C18.594,61.63 19.186,61.742 21.121,61.961 A39.473,39.473 0 0,0 26.862,62.044 C27.825,62.012 28.815,61.979 29.789,61.982 C30.82,61.982 31.863,61.929 32.965,61.872 S35.11,61.757 36.194,61.757 Z M92.513,41.754 Z M53.943,66.687 C53.549,66.687 53.149,66.687 52.758,66.654 A27.958,27.958 0 0,1 46.575,65.525 A19.802,19.802 0 0,1 43.613,64.299 A19.162,19.162 0 0,0 40.701,63.114 C38.286,62.424 35.605,62.563 33.013,62.699 C31.949,62.752 30.847,62.812 29.792,62.809 C28.835,62.809 27.849,62.838 26.895,62.871 A40.332,40.332 0 0,1 21.035,62.785 C19.071,62.56 18.464,62.444 17.696,62.299 L17.619,62.284 A9.335,9.335 0 0,1 16.603,61.988 C15.59,61.65 14.061,61.144 12.651,61.194 A12.422,12.422 0 0,0 11.303,61.351 C10.358,61.496 9.377,61.647 8.468,61.396 C7.022,60.996 6,59.396 6.142,57.752 C6.261,56.38 7.096,55.038 8.432,54.069 A7.472,7.472 0 0,1 13.925,52.807 C14.784,52.94 15.972,53.237 16.739,53.882 A10.105,10.105 0 0,1 17.575,54.718 A6.915,6.915 0 0,0 18.493,55.624 Q18.635,55.731 18.789,55.847 C19.311,56.267 19.8,56.664 20.748,56.608 C21.915,56.54 22.836,56.487 24.877,54.869 C27.23,53.011 30.009,53.539 31.828,54.653 C34.512,56.294 41.806,60.69 43.29,61.277 C43.61,61.404 43.918,61.541 44.22,61.674 C45.5,62.24 46.712,62.776 48.862,62.658 C51.455,62.515 54.752,61.748 56.218,60.024 C57.457,58.569 57.235,56.872 57.14,56.149 C57.14,56.048 57.116,55.965 57.113,55.906 C57.083,55.544 57.048,54.309 57.774,53.637 A11.225,11.225 0 0,1 58.722,52.928 C59.314,52.508 60.724,51.524 60.796,51.169 C60.796,51.115 60.813,51.059 60.822,51.006 C60.911,50.514 60.976,50.156 58.861,48.932 C57.048,47.877 47.781,42.414 42.419,39.236 L39.193,37.331 C39.166,37.313 37.711,36.442 34.023,36.32 A9.978,9.978 0 0,0 30.311,36.791 A10.307,10.307 0 0,0 28.403,37.813 A11.782,11.782 0 0,1 26.385,38.904 C25.257,39.313 23.553,39.724 21.835,39.218 A8.316,8.316 0 0,1 19.554,38.033 L19.023,37.68 C18.849,37.571 18.671,37.464 18.493,37.357 C17.827,36.963 17.136,36.551 16.647,35.876 C16.245,35.31 16.117,34.395 16.677,33.802 C17.107,33.358 17.717,33.313 18.256,33.325 L18.256,33.325 L18.422,33.325 C23.162,33.506 27.973,33.707 32.642,33.9 L39.344,34.175 L57.978,34.934 L75.934,35.672 L76.512,35.695 Q82.582,35.947 88.658,36.205 C89.008,36.205 89.361,36.229 89.716,36.237 C90.475,36.258 91.257,36.279 92.027,36.356 C92.67,36.421 93.093,36.626 93.325,36.987 S93.565,37.808 93.366,38.379 L93.322,38.516 C92.682,40.361 92.415,41.446 92.525,41.739 A1.926,1.926 0 0,0 92.981,41.997 C93.313,42.148 94,42.462 93.698,43.164 C93.265,44.177 92.104,46.574 90.715,46.9 A7.957,7.957 0 0,1 88.454,47 A7.294,7.294 0 0,0 86.363,47.086 A1.97,1.97 0 0,0 85.272,47.726 A2.127,2.127 0 0,0 84.902,49 C84.878,50.224 85.494,50.647 86.442,51.29 Q86.668,51.441 86.905,51.61 L87.473,52.007 C88.525,52.736 89.521,53.42 88.907,54.339 C88.478,54.982 87.29,55.752 85.169,56.762 C76.622,60.833 68.629,63.872 60.733,66.094 A14.893,14.893 0 0,1 57.75,66.485 L56.891,66.544 C55.987,66.619 54.983,66.687 53.943,66.687 Z M36.194,61.757 A17.076,17.076 0 0,1 40.908,62.317 A19.633,19.633 0 0,1 43.947,63.561 A19.402,19.402 0 0,0 46.795,64.746 A27.084,27.084 0 0,0 52.794,65.842 A28.784,28.784 0 0,0 56.805,65.736 C57.101,65.712 57.398,65.694 57.694,65.676 A14.354,14.354 0 0,0 60.511,65.312 C68.362,63.114 76.311,60.077 84.804,56.03 C86.733,55.112 87.882,54.392 88.217,53.888 C88.365,53.666 87.939,53.337 86.996,52.686 C86.813,52.561 86.617,52.425 86.404,52.28 L85.96,51.983 C84.964,51.305 84.025,50.665 84.061,49 A2.924,2.924 0 0,1 84.6,47.243 A2.755,2.755 0 0,1 86.146,46.31 A7.999,7.999 0 0,1 88.472,46.201 A7.306,7.306 0 0,0 90.504,46.121 C91.334,45.928 92.311,44.275 92.904,42.903 A2.88,2.88 0 0,0 92.608,42.758 A2.337,2.337 0 0,1 91.914,42.293 C91.42,41.801 91.734,40.542 92.531,38.24 L92.575,38.104 A0.889,0.889 0 0,0 92.619,37.419 C92.534,37.286 92.294,37.197 91.929,37.162 C91.189,37.088 90.418,37.067 89.675,37.046 C89.316,37.046 88.961,37.028 88.605,37.011 Q82.541,36.753 76.459,36.504 L75.866,36.48 L57.91,35.74 L39.314,34.987 L32.613,34.712 C27.956,34.516 23.133,34.318 18.392,34.134 L18.241,34.134 C17.877,34.134 17.48,34.134 17.273,34.362 S17.11,35.082 17.317,35.378 C17.708,35.926 18.295,36.267 18.917,36.643 C19.103,36.753 19.29,36.865 19.471,36.981 L20.016,37.339 A7.531,7.531 0 0,0 22.069,38.442 C23.55,38.883 25.082,38.513 26.092,38.125 A11.193,11.193 0 0,0 27.967,37.105 A11.456,11.456 0 0,1 30.041,36.006 A10.787,10.787 0 0,1 34.047,35.479 C37.996,35.595 39.557,36.569 39.619,36.611 L42.834,38.507 C48.202,41.677 57.463,47.149 59.273,48.218 C61.708,49.634 61.788,50.271 61.628,51.154 L61.601,51.299 C61.504,51.924 60.535,52.647 59.181,53.598 C58.811,53.859 58.458,54.105 58.319,54.235 C57.954,54.573 57.874,55.313 57.916,55.844 C57.916,55.894 57.916,55.959 57.94,56.042 C58.037,56.804 58.301,58.824 56.832,60.554 C55.193,62.474 51.659,63.321 48.895,63.472 C46.549,63.603 45.189,63.001 43.876,62.421 C43.58,62.284 43.284,62.157 42.988,62.038 C41.13,61.304 31.493,55.408 31.398,55.349 C29.813,54.38 27.402,53.915 25.384,55.512 C23.31,57.162 22.211,57.34 20.792,57.426 C19.533,57.5 18.834,56.937 18.274,56.484 L18.013,56.279 A7.744,7.744 0 0,1 16.961,55.269 A8.414,8.414 0 0,0 16.206,54.49 C15.584,53.965 14.55,53.717 13.795,53.601 A6.645,6.645 0 0,0 8.906,54.718 C7.763,55.544 7.049,56.67 6.951,57.808 C6.844,59.049 7.621,60.299 8.678,60.593 C9.422,60.797 10.313,60.661 11.176,60.527 A13.486,13.486 0 0,1 12.615,60.362 C14.171,60.302 15.785,60.842 16.855,61.197 A9.48,9.48 0 0,0 17.767,61.473 L17.844,61.487 C18.594,61.63 19.186,61.742 21.121,61.961 A39.473,39.473 0 0,0 26.862,62.044 C27.825,62.012 28.815,61.979 29.789,61.982 C30.82,61.982 31.863,61.929 32.965,61.872 S35.11,61.757 36.194,61.757 Z M92.513,41.754 Z",
    start: { x: 53.943, y: 66.687, rotation: 270 },
    facts: ["19 turns","5.41 km","Counterclockwise"]
  },
  {
    id: "608",
    label: "Circuit Gilles-Villeneuve",
    name: "Circuit Gilles-Villeneuve",
    location: "Montreal, PQ, Canada",
    accent: "#e10600",
    path: "M42.366,39.194 C43.103,39.425 46.51,40.825 52.257,43.238 C53.017,43.557 61.658,47.197 62.142,47.39 C63.293,47.88 63.65,48.3 63.5,49.264 C63.396,49.767 63.56,49.986 64.06,50.154 C65.603,50.679 74.871,54.774 77.958,56.244 C79.161,56.817 80.338,57.615 81.59,58.649 C81.984,58.974 82.375,59.314 82.813,59.708 C82.98,59.857 83.143,60.006 83.358,60.202 C83.416,60.255 83.487,60.32 83.612,60.435 C83.711,60.525 83.785,60.592 83.858,60.659 C84.079,60.864 84.299,61.021 84.522,61.135 C85.47,61.621 86.109,61.463 88.353,60.444 C88.512,60.373 88.644,60.314 88.769,60.259 C91.019,59.254 93.142,59.73 93.588,61.233 C94,62.781 93.616,63.69 92.421,64.662 C92.249,64.802 92.181,64.854 91.734,65.191 C91.495,65.359 91.222,65.527 90.896,65.706 C90.454,65.949 88.544,66.887 88.099,67.121 C86.969,67.624 86.032,68.016 85.132,68.369 C84.78,68.507 84.444,68.635 84.048,68.783 C83.907,68.836 83.269,69.073 83.099,69.136 C83.003,69.173 82.914,69.206 82.828,69.239 C82.726,69.277 82.363,69.418 82.353,69.422 C80.5,70.135 79.357,70.263 77.956,69.556 C75.999,68.568 75.408,68.5 73.09,69.241 C68.211,71.26 62.703,69.277 58.548,65.168 C57.793,64.605 57.301,64.457 57.012,64.579 C56.796,64.67 56.627,64.94 56.462,65.44 C56.423,65.558 56.302,65.959 56.295,65.979 C56.267,66.069 56.242,66.144 56.21,66.229 C55.174,68.663 53.698,69.237 51.344,67.771 C50.827,67.548 48.812,66.388 45.686,64.534 C44.553,63.863 43.347,63.143 42.133,62.416 C41.688,62.149 41.267,61.896 40.877,61.662 C40.613,61.502 40.398,61.373 40.236,61.275 C40.015,61.143 39.535,60.763 38.697,60.072 C38.205,59.665 36.058,57.871 36.163,57.958 C36.097,57.903 36.097,57.903 36.031,57.848 C34.584,56.643 33.604,55.847 32.876,55.3 C30.967,53.664 30.635,53.235 30.635,52.187 C30.955,50.009 30.647,48.863 29.634,48.05 C29.276,47.657 19.189,38.347 17.218,36.561 C16.855,36.261 16.222,35.955 15.135,35.52 C15.028,35.477 14.266,35.177 14.056,35.092 C13.671,34.935 13.386,34.81 13.154,34.693 C11.491,34.064 9.553,33.291 8.17,32.678 C6.562,32.079 6,31.424 6.489,30.052 C7.126,28.74 8.355,28.741 10.118,29.496 C10.368,29.545 10.801,29.683 11.499,29.93 C11.93,30.082 13.757,30.746 13.734,30.738 C13.851,30.78 13.963,30.82 14.072,30.859 C15.806,31.48 16.916,31.833 17.527,31.931 C18.309,32.057 19.976,32.411 22.915,33.062 C23.402,33.171 25.258,33.584 25.744,33.691 C26.681,33.899 27.33,34.04 27.791,34.137 C28.621,34.284 39.766,38.142 42.366,39.194 Z M90.522,65.026 C90.824,64.86 91.074,64.707 91.276,64.564 C91.704,64.241 91.77,64.191 91.931,64.06 C92.907,63.266 93.164,62.657 92.841,61.443 C92.558,60.489 90.96,60.13 89.083,60.969 C88.958,61.023 88.829,61.081 88.674,61.151 C87.263,61.791 87.047,61.882 86.458,62.028 C85.617,62.237 84.877,62.19 84.167,61.826 C83.88,61.679 83.601,61.48 83.332,61.23 C83.262,61.166 83.188,61.099 83.089,61.008 C82.963,60.893 82.892,60.828 82.834,60.775 C82.621,60.581 82.459,60.433 82.294,60.285 C81.864,59.898 81.48,59.565 81.096,59.248 C79.888,58.25 78.761,57.487 77.624,56.945 C74.565,55.488 65.315,51.401 63.81,50.889 C62.972,50.607 62.547,50.04 62.736,49.126 C62.816,48.608 62.7,48.471 61.846,48.108 C61.362,47.915 52.699,44.265 52.112,44.019 C46.236,41.552 42.782,40.133 42.122,39.931 C39.569,38.897 28.415,35.036 27.643,34.899 C27.167,34.799 26.516,34.657 25.576,34.449 C25.09,34.341 23.234,33.928 22.904,33.855 C19.83,33.173 18.163,32.819 17.404,32.697 C16.726,32.588 15.597,32.23 13.81,31.59 C13.701,31.551 13.588,31.51 13.47,31.468 C13.49,31.475 11.668,30.813 11.24,30.662 C10.546,30.417 10.118,30.281 9.944,30.253 C8.42,29.607 7.587,29.594 7.213,30.334 C6.918,31.178 7.188,31.484 8.462,31.959 C9.857,32.576 11.793,33.349 13.448,33.974 C13.698,34.1 13.971,34.219 14.348,34.372 C14.554,34.456 15.314,34.755 15.423,34.799 C16.589,35.266 17.264,35.592 17.726,35.975 C19.726,37.787 29.474,46.782 30.14,47.461 C31.377,48.465 31.755,49.876 31.412,52.215 C31.418,52.929 31.665,53.24 33.362,54.695 C34.084,55.237 35.07,56.038 36.528,57.252 C36.594,57.307 36.594,57.307 36.661,57.362 C36.549,57.269 38.7,59.067 39.192,59.473 C39.986,60.129 40.465,60.507 40.636,60.611 C40.798,60.708 41.013,60.837 41.277,60.996 C41.667,61.231 42.088,61.483 42.532,61.75 C43.745,62.476 44.95,63.196 46.082,63.867 C49.191,65.71 51.271,66.907 51.667,67.065 C53.674,68.317 54.634,67.949 55.489,65.941 C55.509,65.887 55.53,65.825 55.555,65.746 C55.558,65.736 55.682,65.326 55.725,65.197 C55.955,64.499 56.225,64.069 56.71,63.864 C57.315,63.608 58.071,63.838 59.035,64.564 C63.038,68.526 68.258,70.409 72.807,68.518 C75.373,67.695 76.17,67.785 78.306,68.863 C79.459,69.445 80.407,69.339 82.074,68.698 C82.083,68.694 82.448,68.553 82.552,68.513 C82.639,68.48 82.729,68.446 82.827,68.41 C82.998,68.345 83.636,68.108 83.776,68.056 C84.168,67.909 84.501,67.782 84.848,67.646 C85.735,67.299 86.657,66.913 87.749,66.428 C88.229,66.176 90.103,65.257 90.522,65.026 Z",
    shapePath:
      "M42.366,39.194 C43.103,39.425 46.51,40.825 52.257,43.238 C53.017,43.557 61.658,47.197 62.142,47.39 C63.293,47.88 63.65,48.3 63.5,49.264 C63.396,49.767 63.56,49.986 64.06,50.154 C65.603,50.679 74.871,54.774 77.958,56.244 C79.161,56.817 80.338,57.615 81.59,58.649 C81.984,58.974 82.375,59.314 82.813,59.708 C82.98,59.857 83.143,60.006 83.358,60.202 C83.416,60.255 83.487,60.32 83.612,60.435 C83.711,60.525 83.785,60.592 83.858,60.659 C84.079,60.864 84.299,61.021 84.522,61.135 C85.47,61.621 86.109,61.463 88.353,60.444 C88.512,60.373 88.644,60.314 88.769,60.259 C91.019,59.254 93.142,59.73 93.588,61.233 C94,62.781 93.616,63.69 92.421,64.662 C92.249,64.802 92.181,64.854 91.734,65.191 C91.495,65.359 91.222,65.527 90.896,65.706 C90.454,65.949 88.544,66.887 88.099,67.121 C86.969,67.624 86.032,68.016 85.132,68.369 C84.78,68.507 84.444,68.635 84.048,68.783 C83.907,68.836 83.269,69.073 83.099,69.136 C83.003,69.173 82.914,69.206 82.828,69.239 C82.726,69.277 82.363,69.418 82.353,69.422 C80.5,70.135 79.357,70.263 77.956,69.556 C75.999,68.568 75.408,68.5 73.09,69.241 C68.211,71.26 62.703,69.277 58.548,65.168 C57.793,64.605 57.301,64.457 57.012,64.579 C56.796,64.67 56.627,64.94 56.462,65.44 C56.423,65.558 56.302,65.959 56.295,65.979 C56.267,66.069 56.242,66.144 56.21,66.229 C55.174,68.663 53.698,69.237 51.344,67.771 C50.827,67.548 48.812,66.388 45.686,64.534 C44.553,63.863 43.347,63.143 42.133,62.416 C41.688,62.149 41.267,61.896 40.877,61.662 C40.613,61.502 40.398,61.373 40.236,61.275 C40.015,61.143 39.535,60.763 38.697,60.072 C38.205,59.665 36.058,57.871 36.163,57.958 C36.097,57.903 36.097,57.903 36.031,57.848 C34.584,56.643 33.604,55.847 32.876,55.3 C30.967,53.664 30.635,53.235 30.635,52.187 C30.955,50.009 30.647,48.863 29.634,48.05 C29.276,47.657 19.189,38.347 17.218,36.561 C16.855,36.261 16.222,35.955 15.135,35.52 C15.028,35.477 14.266,35.177 14.056,35.092 C13.671,34.935 13.386,34.81 13.154,34.693 C11.491,34.064 9.553,33.291 8.17,32.678 C6.562,32.079 6,31.424 6.489,30.052 C7.126,28.74 8.355,28.741 10.118,29.496 C10.368,29.545 10.801,29.683 11.499,29.93 C11.93,30.082 13.757,30.746 13.734,30.738 C13.851,30.78 13.963,30.82 14.072,30.859 C15.806,31.48 16.916,31.833 17.527,31.931 C18.309,32.057 19.976,32.411 22.915,33.062 C23.402,33.171 25.258,33.584 25.744,33.691 C26.681,33.899 27.33,34.04 27.791,34.137 C28.621,34.284 39.766,38.142 42.366,39.194 Z M90.522,65.026 C90.824,64.86 91.074,64.707 91.276,64.564 C91.704,64.241 91.77,64.191 91.931,64.06 C92.907,63.266 93.164,62.657 92.841,61.443 C92.558,60.489 90.96,60.13 89.083,60.969 C88.958,61.023 88.829,61.081 88.674,61.151 C87.263,61.791 87.047,61.882 86.458,62.028 C85.617,62.237 84.877,62.19 84.167,61.826 C83.88,61.679 83.601,61.48 83.332,61.23 C83.262,61.166 83.188,61.099 83.089,61.008 C82.963,60.893 82.892,60.828 82.834,60.775 C82.621,60.581 82.459,60.433 82.294,60.285 C81.864,59.898 81.48,59.565 81.096,59.248 C79.888,58.25 78.761,57.487 77.624,56.945 C74.565,55.488 65.315,51.401 63.81,50.889 C62.972,50.607 62.547,50.04 62.736,49.126 C62.816,48.608 62.7,48.471 61.846,48.108 C61.362,47.915 52.699,44.265 52.112,44.019 C46.236,41.552 42.782,40.133 42.122,39.931 C39.569,38.897 28.415,35.036 27.643,34.899 C27.167,34.799 26.516,34.657 25.576,34.449 C25.09,34.341 23.234,33.928 22.904,33.855 C19.83,33.173 18.163,32.819 17.404,32.697 C16.726,32.588 15.597,32.23 13.81,31.59 C13.701,31.551 13.588,31.51 13.47,31.468 C13.49,31.475 11.668,30.813 11.24,30.662 C10.546,30.417 10.118,30.281 9.944,30.253 C8.42,29.607 7.587,29.594 7.213,30.334 C6.918,31.178 7.188,31.484 8.462,31.959 C9.857,32.576 11.793,33.349 13.448,33.974 C13.698,34.1 13.971,34.219 14.348,34.372 C14.554,34.456 15.314,34.755 15.423,34.799 C16.589,35.266 17.264,35.592 17.726,35.975 C19.726,37.787 29.474,46.782 30.14,47.461 C31.377,48.465 31.755,49.876 31.412,52.215 C31.418,52.929 31.665,53.24 33.362,54.695 C34.084,55.237 35.07,56.038 36.528,57.252 C36.594,57.307 36.594,57.307 36.661,57.362 C36.549,57.269 38.7,59.067 39.192,59.473 C39.986,60.129 40.465,60.507 40.636,60.611 C40.798,60.708 41.013,60.837 41.277,60.996 C41.667,61.231 42.088,61.483 42.532,61.75 C43.745,62.476 44.95,63.196 46.082,63.867 C49.191,65.71 51.271,66.907 51.667,67.065 C53.674,68.317 54.634,67.949 55.489,65.941 C55.509,65.887 55.53,65.825 55.555,65.746 C55.558,65.736 55.682,65.326 55.725,65.197 C55.955,64.499 56.225,64.069 56.71,63.864 C57.315,63.608 58.071,63.838 59.035,64.564 C63.038,68.526 68.258,70.409 72.807,68.518 C75.373,67.695 76.17,67.785 78.306,68.863 C79.459,69.445 80.407,69.339 82.074,68.698 C82.083,68.694 82.448,68.553 82.552,68.513 C82.639,68.48 82.729,68.446 82.827,68.41 C82.998,68.345 83.636,68.108 83.776,68.056 C84.168,67.909 84.501,67.782 84.848,67.646 C85.735,67.299 86.657,66.913 87.749,66.428 C88.229,66.176 90.103,65.257 90.522,65.026 Z",
    start: { x: 75.976, y: 55.888, rotation: 25 },
    facts: ["14 turns","4.361 km","Clockwise"]
  },
  {
    id: "606",
    label: "Monaco",
    name: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    accent: "#f6c84c",
    path: "M88.307,45.748 C89.403,44.121 90.014,44.269 93.185,46.608 C93.89,47.128 94,48.061 93.229,48.837 C91.697,49.964 88.258,52.229 82.863,55.674 C78.999,58.259 74.476,58.988 69.634,58.32 C67.854,58.074 66.123,57.649 64.474,57.099 C63.348,56.724 62.443,56.356 61.618,55.979 C60.855,55.629 59.156,54.626 56.485,52.978 C56.382,52.914 56.382,52.914 56.278,52.85 C55.777,52.54 55.267,52.224 54.6,51.809 C54.415,51.694 53.771,51.293 53.814,51.32 C53.511,51.132 53.293,50.996 53.089,50.87 C52.017,50.204 51.439,49.852 51.178,49.707 C49.726,48.901 49.336,48.854 48.682,49.621 C47.749,50.714 47.053,50.823 45.855,50.383 C44.735,49.973 44.239,49.387 44.107,47.978 C44.011,46.947 43.514,46.389 42.282,45.571 C41.993,45.379 38.197,42.387 36.945,41.437 C36.64,41.205 36.342,40.982 36.053,40.767 C35.062,40.031 34.176,39.4 33.395,38.882 C31.713,37.249 30.179,37.249 28.544,38.852 C26.523,40.618 25.155,41.839 24.44,42.512 C23.877,43.043 23.672,43.397 23.649,43.758 C23.638,43.947 23.646,44.006 23.756,44.594 C23.77,44.671 23.782,44.737 23.793,44.803 C24.036,45.71 23.99,46.228 23.477,47.108 C23.328,47.31 23.201,47.474 23.071,47.641 C22.293,48.637 20.089,51.247 19.89,51.516 C18.991,52.642 18.422,52.901 17.496,52.26 C16.617,51.647 16.031,51.84 15.524,52.796 C15.045,53.7 14.726,55.202 14.582,57.028 C14.582,57.29 14.58,57.324 14.514,58.223 C14.305,61.049 14.564,63.008 15.92,65.43 C17.086,68.1 14.812,69.453 12.691,67.679 C12.145,67.358 11.295,66.733 9.738,65.537 C9.573,65.41 9.489,65.345 9.378,65.26 C9.24,65.153 9.24,65.153 9.103,65.048 C8.88,64.876 8.721,64.753 8.566,64.635 C8.171,64.332 7.862,64.098 7.596,63.9 C6,62.715 6.193,61.123 7.637,60.454 C7.783,60.357 7.903,60.266 8.002,60.178 C8.342,59.875 8.468,59.6 8.609,58.9 C8.632,58.782 8.642,58.731 8.699,58.424 C8.868,56.308 9.302,54.706 10.142,52.715 C10.269,52.415 10.403,52.107 10.584,51.702 C10.606,51.652 10.947,50.892 11.047,50.666 C11.849,48.789 13.369,46.589 15.5,44.116 C16.717,42.703 18.115,41.223 19.668,39.685 C21.303,38.067 23.038,36.456 24.889,34.81 C25.566,34.208 26.219,33.637 26.944,33.009 C27.121,32.856 28.078,32.03 28.314,31.825 C29.138,30.895 29.89,30.547 30.616,30.747 C31.155,30.895 31.519,31.237 32.123,32.003 C32.143,32.028 32.238,32.149 32.265,32.182 C32.318,32.249 32.361,32.303 32.401,32.353 C32.569,32.558 32.7,32.702 32.823,32.809 C33.972,33.541 44.541,40.233 50.067,43.696 C50.753,44.052 51.394,44.37 52.166,44.741 C52.254,44.783 52.345,44.827 52.441,44.873 C52.6,44.948 53.886,45.558 54.301,45.757 C55.08,46.131 55.794,46.481 56.585,46.88 C57.503,47.378 58.218,47.884 59.407,48.82 C59.477,48.875 59.713,49.061 59.742,49.084 C61.189,50.223 61.981,50.761 63.071,51.253 C65.499,52.307 67.391,51.943 68.659,50.431 C69.807,49.062 70.36,46.81 70.166,44.461 C70.194,42.279 71.469,40.931 73.898,40.443 C80.792,39.273 85.215,38.521 87.167,38.187 C89.444,38.074 90.024,39.188 88.719,41.04 C88.092,41.752 87.618,42.272 87.27,42.635 C87.054,42.861 86.992,42.933 86.874,43.118 C86.827,43.191 86.783,43.268 86.75,43.333 C86.707,43.43 86.665,43.522 86.624,43.612 C86.594,43.679 86.563,43.745 86.532,43.811 C86.377,44.138 86.211,44.466 85.934,44.992 C85.81,45.228 85.107,46.557 84.857,47.03 C84.73,47.266 84.699,47.334 84.676,47.425 C84.346,48.833 85.459,49.331 86.51,48.305 C87.36,47.322 87.79,46.721 88.307,45.748 Z M32.791,32.787 C32.69,32.724 32.7,32.731 32.806,32.798 L32.791,32.787 Z M33.848,38.265 C34.633,38.788 35.521,39.419 36.509,40.154 C36.8,40.37 37.1,40.595 37.407,40.828 C38.683,41.796 42.446,44.763 42.704,44.934 C44.114,45.869 44.744,46.577 44.868,47.907 C44.972,49.008 45.263,49.352 46.118,49.666 C47.04,50.004 47.397,49.948 48.1,49.125 C48.631,48.503 49.196,48.251 49.841,48.33 C50.311,48.387 50.664,48.547 51.549,49.039 C51.826,49.192 52.405,49.546 53.492,50.22 C53.696,50.347 53.915,50.483 54.218,50.671 C54.175,50.645 54.819,51.045 55.003,51.16 C55.67,51.574 56.179,51.89 56.68,52.2 C56.783,52.263 56.783,52.263 56.886,52.327 C59.52,53.952 61.215,54.953 61.937,55.284 C62.738,55.651 63.619,56.008 64.715,56.374 C66.322,56.91 68.008,57.324 69.739,57.563 C74.409,58.207 78.747,57.508 82.445,55.034 C87.801,51.614 91.225,49.36 92.707,48.277 C93.116,47.852 93.066,47.471 92.731,47.223 C89.892,45.129 89.685,45.072 88.972,46.124 C88.428,47.148 87.965,47.792 87.077,48.817 C85.491,50.382 83.413,49.463 83.934,47.243 C83.978,47.068 84.03,46.952 84.135,46.759 C84.431,46.199 85.135,44.872 85.258,44.637 C85.53,44.119 85.692,43.8 85.841,43.485 C85.87,43.421 85.9,43.358 85.93,43.293 C85.969,43.207 86.009,43.118 86.058,43.008 C86.112,42.901 86.169,42.801 86.23,42.705 C86.318,42.568 86.412,42.445 86.513,42.328 C86.551,42.284 86.589,42.242 86.631,42.198 C87.055,41.755 87.518,41.247 88.106,40.583 C89.032,39.263 88.83,38.873 87.273,38.945 C85.309,39.28 80.894,40.031 74.037,41.195 C71.961,41.612 70.96,42.665 70.93,44.417 C71.134,46.945 70.533,49.387 69.245,50.922 C67.75,52.704 65.494,53.138 62.761,51.952 C61.594,51.425 60.761,50.86 59.269,49.684 C59.24,49.661 59.004,49.475 58.935,49.421 C57.777,48.509 57.09,48.024 56.231,47.557 C55.455,47.166 54.745,46.818 53.971,46.447 C53.557,46.249 52.272,45.639 52.112,45.562 C52.016,45.517 51.924,45.473 51.835,45.43 C51.051,45.054 50.4,44.73 49.701,44.367 C43.567,40.525 31.274,32.737 32.384,33.434 C32.171,33.257 32.009,33.081 31.809,32.836 C31.765,32.782 31.72,32.726 31.665,32.656 C31.638,32.622 31.543,32.501 31.523,32.476 C31.022,31.841 30.737,31.573 30.413,31.484 C30.015,31.374 29.529,31.602 28.871,32.349 C28.635,32.56 27.625,33.43 27.444,33.587 C26.721,34.213 26.071,34.782 25.396,35.382 C23.555,37.019 21.83,38.621 20.206,40.229 C18.667,41.752 17.282,43.219 16.079,44.615 C13.995,47.034 12.515,49.175 11.748,50.971 C11.645,51.203 11.304,51.965 11.282,52.014 C11.103,52.414 10.971,52.718 10.846,53.012 C10.033,54.939 9.62,56.467 9.459,58.504 C9.393,58.873 9.383,58.925 9.358,59.05 C9.187,59.898 8.996,60.316 8.51,60.749 C8.376,60.868 8.219,60.986 8.034,61.108 C7.034,61.563 6.92,62.446 8.051,63.287 C8.322,63.487 8.633,63.723 9.031,64.029 C9.186,64.147 9.346,64.27 9.569,64.442 C9.707,64.548 9.707,64.548 9.845,64.654 C9.955,64.739 10.04,64.804 10.122,64.867 C11.755,66.122 12.601,66.744 13.103,67.035 C14.709,68.39 16.032,67.618 15.244,65.786 C13.809,63.217 13.534,61.122 13.751,58.167 C13.816,57.283 13.818,57.26 13.818,57.013 C13.97,55.055 14.308,53.459 14.849,52.438 C15.558,51.1 16.652,50.74 17.932,51.632 C18.427,51.975 18.613,51.891 19.284,51.05 C19.493,50.768 21.705,48.148 22.468,47.171 C22.591,47.013 22.711,46.857 22.828,46.703 C23.223,46.021 23.246,45.71 23.05,44.984 C23.031,44.88 23.019,44.813 23.004,44.733 C22.879,44.061 22.869,43.992 22.887,43.711 C22.922,43.128 23.224,42.608 23.916,41.956 C24.639,41.275 26.013,40.049 28.025,38.291 C29.932,36.42 31.931,36.412 33.848,38.265 Z",
    shapePath:
      "M88.307,45.748 C89.403,44.121 90.014,44.269 93.185,46.608 C93.89,47.128 94,48.061 93.229,48.837 C91.697,49.964 88.258,52.229 82.863,55.674 C78.999,58.259 74.476,58.988 69.634,58.32 C67.854,58.074 66.123,57.649 64.474,57.099 C63.348,56.724 62.443,56.356 61.618,55.979 C60.855,55.629 59.156,54.626 56.485,52.978 C56.382,52.914 56.382,52.914 56.278,52.85 C55.777,52.54 55.267,52.224 54.6,51.809 C54.415,51.694 53.771,51.293 53.814,51.32 C53.511,51.132 53.293,50.996 53.089,50.87 C52.017,50.204 51.439,49.852 51.178,49.707 C49.726,48.901 49.336,48.854 48.682,49.621 C47.749,50.714 47.053,50.823 45.855,50.383 C44.735,49.973 44.239,49.387 44.107,47.978 C44.011,46.947 43.514,46.389 42.282,45.571 C41.993,45.379 38.197,42.387 36.945,41.437 C36.64,41.205 36.342,40.982 36.053,40.767 C35.062,40.031 34.176,39.4 33.395,38.882 C31.713,37.249 30.179,37.249 28.544,38.852 C26.523,40.618 25.155,41.839 24.44,42.512 C23.877,43.043 23.672,43.397 23.649,43.758 C23.638,43.947 23.646,44.006 23.756,44.594 C23.77,44.671 23.782,44.737 23.793,44.803 C24.036,45.71 23.99,46.228 23.477,47.108 C23.328,47.31 23.201,47.474 23.071,47.641 C22.293,48.637 20.089,51.247 19.89,51.516 C18.991,52.642 18.422,52.901 17.496,52.26 C16.617,51.647 16.031,51.84 15.524,52.796 C15.045,53.7 14.726,55.202 14.582,57.028 C14.582,57.29 14.58,57.324 14.514,58.223 C14.305,61.049 14.564,63.008 15.92,65.43 C17.086,68.1 14.812,69.453 12.691,67.679 C12.145,67.358 11.295,66.733 9.738,65.537 C9.573,65.41 9.489,65.345 9.378,65.26 C9.24,65.153 9.24,65.153 9.103,65.048 C8.88,64.876 8.721,64.753 8.566,64.635 C8.171,64.332 7.862,64.098 7.596,63.9 C6,62.715 6.193,61.123 7.637,60.454 C7.783,60.357 7.903,60.266 8.002,60.178 C8.342,59.875 8.468,59.6 8.609,58.9 C8.632,58.782 8.642,58.731 8.699,58.424 C8.868,56.308 9.302,54.706 10.142,52.715 C10.269,52.415 10.403,52.107 10.584,51.702 C10.606,51.652 10.947,50.892 11.047,50.666 C11.849,48.789 13.369,46.589 15.5,44.116 C16.717,42.703 18.115,41.223 19.668,39.685 C21.303,38.067 23.038,36.456 24.889,34.81 C25.566,34.208 26.219,33.637 26.944,33.009 C27.121,32.856 28.078,32.03 28.314,31.825 C29.138,30.895 29.89,30.547 30.616,30.747 C31.155,30.895 31.519,31.237 32.123,32.003 C32.143,32.028 32.238,32.149 32.265,32.182 C32.318,32.249 32.361,32.303 32.401,32.353 C32.569,32.558 32.7,32.702 32.823,32.809 C33.972,33.541 44.541,40.233 50.067,43.696 C50.753,44.052 51.394,44.37 52.166,44.741 C52.254,44.783 52.345,44.827 52.441,44.873 C52.6,44.948 53.886,45.558 54.301,45.757 C55.08,46.131 55.794,46.481 56.585,46.88 C57.503,47.378 58.218,47.884 59.407,48.82 C59.477,48.875 59.713,49.061 59.742,49.084 C61.189,50.223 61.981,50.761 63.071,51.253 C65.499,52.307 67.391,51.943 68.659,50.431 C69.807,49.062 70.36,46.81 70.166,44.461 C70.194,42.279 71.469,40.931 73.898,40.443 C80.792,39.273 85.215,38.521 87.167,38.187 C89.444,38.074 90.024,39.188 88.719,41.04 C88.092,41.752 87.618,42.272 87.27,42.635 C87.054,42.861 86.992,42.933 86.874,43.118 C86.827,43.191 86.783,43.268 86.75,43.333 C86.707,43.43 86.665,43.522 86.624,43.612 C86.594,43.679 86.563,43.745 86.532,43.811 C86.377,44.138 86.211,44.466 85.934,44.992 C85.81,45.228 85.107,46.557 84.857,47.03 C84.73,47.266 84.699,47.334 84.676,47.425 C84.346,48.833 85.459,49.331 86.51,48.305 C87.36,47.322 87.79,46.721 88.307,45.748 Z M32.791,32.787 C32.69,32.724 32.7,32.731 32.806,32.798 L32.791,32.787 Z M33.848,38.265 C34.633,38.788 35.521,39.419 36.509,40.154 C36.8,40.37 37.1,40.595 37.407,40.828 C38.683,41.796 42.446,44.763 42.704,44.934 C44.114,45.869 44.744,46.577 44.868,47.907 C44.972,49.008 45.263,49.352 46.118,49.666 C47.04,50.004 47.397,49.948 48.1,49.125 C48.631,48.503 49.196,48.251 49.841,48.33 C50.311,48.387 50.664,48.547 51.549,49.039 C51.826,49.192 52.405,49.546 53.492,50.22 C53.696,50.347 53.915,50.483 54.218,50.671 C54.175,50.645 54.819,51.045 55.003,51.16 C55.67,51.574 56.179,51.89 56.68,52.2 C56.783,52.263 56.783,52.263 56.886,52.327 C59.52,53.952 61.215,54.953 61.937,55.284 C62.738,55.651 63.619,56.008 64.715,56.374 C66.322,56.91 68.008,57.324 69.739,57.563 C74.409,58.207 78.747,57.508 82.445,55.034 C87.801,51.614 91.225,49.36 92.707,48.277 C93.116,47.852 93.066,47.471 92.731,47.223 C89.892,45.129 89.685,45.072 88.972,46.124 C88.428,47.148 87.965,47.792 87.077,48.817 C85.491,50.382 83.413,49.463 83.934,47.243 C83.978,47.068 84.03,46.952 84.135,46.759 C84.431,46.199 85.135,44.872 85.258,44.637 C85.53,44.119 85.692,43.8 85.841,43.485 C85.87,43.421 85.9,43.358 85.93,43.293 C85.969,43.207 86.009,43.118 86.058,43.008 C86.112,42.901 86.169,42.801 86.23,42.705 C86.318,42.568 86.412,42.445 86.513,42.328 C86.551,42.284 86.589,42.242 86.631,42.198 C87.055,41.755 87.518,41.247 88.106,40.583 C89.032,39.263 88.83,38.873 87.273,38.945 C85.309,39.28 80.894,40.031 74.037,41.195 C71.961,41.612 70.96,42.665 70.93,44.417 C71.134,46.945 70.533,49.387 69.245,50.922 C67.75,52.704 65.494,53.138 62.761,51.952 C61.594,51.425 60.761,50.86 59.269,49.684 C59.24,49.661 59.004,49.475 58.935,49.421 C57.777,48.509 57.09,48.024 56.231,47.557 C55.455,47.166 54.745,46.818 53.971,46.447 C53.557,46.249 52.272,45.639 52.112,45.562 C52.016,45.517 51.924,45.473 51.835,45.43 C51.051,45.054 50.4,44.73 49.701,44.367 C43.567,40.525 31.274,32.737 32.384,33.434 C32.171,33.257 32.009,33.081 31.809,32.836 C31.765,32.782 31.72,32.726 31.665,32.656 C31.638,32.622 31.543,32.501 31.523,32.476 C31.022,31.841 30.737,31.573 30.413,31.484 C30.015,31.374 29.529,31.602 28.871,32.349 C28.635,32.56 27.625,33.43 27.444,33.587 C26.721,34.213 26.071,34.782 25.396,35.382 C23.555,37.019 21.83,38.621 20.206,40.229 C18.667,41.752 17.282,43.219 16.079,44.615 C13.995,47.034 12.515,49.175 11.748,50.971 C11.645,51.203 11.304,51.965 11.282,52.014 C11.103,52.414 10.971,52.718 10.846,53.012 C10.033,54.939 9.62,56.467 9.459,58.504 C9.393,58.873 9.383,58.925 9.358,59.05 C9.187,59.898 8.996,60.316 8.51,60.749 C8.376,60.868 8.219,60.986 8.034,61.108 C7.034,61.563 6.92,62.446 8.051,63.287 C8.322,63.487 8.633,63.723 9.031,64.029 C9.186,64.147 9.346,64.27 9.569,64.442 C9.707,64.548 9.707,64.548 9.845,64.654 C9.955,64.739 10.04,64.804 10.122,64.867 C11.755,66.122 12.601,66.744 13.103,67.035 C14.709,68.39 16.032,67.618 15.244,65.786 C13.809,63.217 13.534,61.122 13.751,58.167 C13.816,57.283 13.818,57.26 13.818,57.013 C13.97,55.055 14.308,53.459 14.849,52.438 C15.558,51.1 16.652,50.74 17.932,51.632 C18.427,51.975 18.613,51.891 19.284,51.05 C19.493,50.768 21.705,48.148 22.468,47.171 C22.591,47.013 22.711,46.857 22.828,46.703 C23.223,46.021 23.246,45.71 23.05,44.984 C23.031,44.88 23.019,44.813 23.004,44.733 C22.879,44.061 22.869,43.992 22.887,43.711 C22.922,43.128 23.224,42.608 23.916,41.956 C24.639,41.275 26.013,40.049 28.025,38.291 C29.932,36.42 31.931,36.412 33.848,38.265 Z",
    start: { x: 88.307, y: 45.748, rotation: 34 },
    facts: ["19 turns","3.337 km","Clockwise"]
  },
  {
    id: "5826",
    label: "Catalunya",
    name: "Circuit de Catalunya",
    location: "Barcelona, Spain",
    accent: "#ff9f43",
    path: "M28.713,36.568 L23.634,36.544 L20.971,36.541 C19.793,36.543 18.926,36.551 18.367,36.568 L17.541,36.599 C15.313,36.69 14.013,36.874 12.333,37.522 C10.067,38.397 8.292,39.915 7.173,42.227 L7.109,42.361 C6,44.614 6.046,46.708 6.977,48.573 C7.612,49.845 8.577,50.863 9.548,51.561 L9.82,51.755 C11.342,52.832 14.394,54.88 16.136,55.966 L16.254,56.044 C16.627,56.284 17.33,56.71 17.434,56.78 C18.139,57.257 18.322,57.738 18.322,59.509 L18.323,59.536 C18.443,61.287 18.943,62.316 19.974,62.872 C20.831,63.334 21.888,63.454 24.165,63.459 L26.806,63.453 C33.647,63.427 53.124,63.329 85.241,63.157 L85.525,63.172 C90.11,63.384 92.681,61.955 93.032,58.861 L93.15,57.449 C93.291,55.756 93.416,54.172 93.538,52.511 L93.594,51.737 L93.682,50.468 C93.75,49.461 93.806,48.542 93.849,47.724 C94,46.124 93.504,45.018 92.515,44.139 C92.404,44.041 92.291,43.948 92.161,43.848 L91.684,43.49 C91.288,43.186 89.227,42.28 86.299,41.084 L85.655,40.822 L84.642,40.414 C83.135,39.812 81.848,39.317 81.329,39.142 L81.242,39.114 L81.262,39.122 C78.747,38.069 76.013,38.379 74.982,40.372 C73.771,42.72 74.75,44.678 76.827,45.445 L77.256,45.598 C78.518,46.053 79.963,46.633 80.948,47.068 L81.07,47.123 C81.835,47.481 82.152,47.845 82.662,49.011 L82.702,49.102 C82.92,49.608 83.197,50.336 83.53,51.259 L83.655,51.607 L84.127,52.956 L84.643,54.436 C84.838,55.041 84.784,55.771 84.486,56.179 C84.156,56.633 83.516,56.722 82.475,56.263 L82.392,56.225 C81.36,55.751 77.717,53.563 72.053,50.052 L69.671,48.57 L58.759,41.745 C58.524,41.599 58.38,41.51 58.35,41.493 L58.129,41.382 C57.714,41.171 57.32,40.952 56.615,40.546 L55.781,40.064 L55.564,39.941 L55.345,39.818 C53.673,38.884 52.496,38.413 51.329,38.33 C49.838,38.223 48.551,38.825 47.45,40.251 L47.088,40.722 C47.028,40.801 46.967,40.88 46.906,40.96 L46.638,41.314 C45.566,42.73 44.488,44.205 43.396,45.737 L42.828,46.537 L41.08,49.028 C41.024,49.105 40.922,49.244 40.915,49.253 L40.821,49.385 C40.777,49.448 40.737,49.507 40.697,49.568 C40.028,50.598 39.743,51.861 39.917,53.953 L39.937,54.147 C40.17,56.539 39.511,57.243 37.77,57.261 L33.457,57.269 L32.123,57.268 C31.727,57.266 31.395,57.264 31.123,57.261 L30.962,57.257 C29.733,57.215 28.713,56.842 26.769,55.773 L24.528,54.531 L21.108,52.626 C20.303,52.176 19.725,51.849 19.42,51.671 L19.237,51.556 C17.599,50.511 17.035,49.697 17.474,48.555 C18.085,46.964 18.784,46.557 21.17,46.557 L21.769,46.54 C22.471,46.52 23.091,46.508 23.889,46.497 L26.684,46.466 C28.936,46.436 29.901,46.38 30.85,46.202 L30.96,46.181 C32.288,45.919 33.254,45.407 34.198,44.452 C34.432,44.215 34.668,43.948 34.911,43.645 C37.852,39.978 36.751,36.893 31.938,36.578 L28.713,36.568 Z M20.84,37.335 L23.632,37.338 L31.203,37.371 L31.912,37.371 C36.023,37.641 36.851,39.958 34.292,43.148 C34.065,43.431 33.848,43.678 33.633,43.894 L33.543,43.984 C32.142,45.367 31.03,45.614 26.447,45.675 L24.151,45.7 C23.559,45.707 23.07,45.715 22.593,45.725 L21.714,45.747 C21.535,45.752 21.351,45.758 21.158,45.764 C18.477,45.764 17.471,46.348 16.733,48.27 C16.382,49.186 16.523,50.016 17.08,50.76 C17.496,51.316 18.086,51.779 19.011,52.352 L19.414,52.583 C19.794,52.799 20.327,53.099 20.994,53.472 L23.39,54.807 L26.257,56.397 C28.43,57.6 29.576,58.021 31.023,58.053 L31.472,58.058 C31.795,58.06 32.179,58.062 32.628,58.062 L37.7,58.055 C40.009,58.055 41.051,56.92 40.706,53.875 C40.548,51.964 40.793,50.876 41.362,50.001 C41.397,49.948 41.432,49.896 41.472,49.839 L41.779,49.415 L43.119,47.502 C43.323,47.211 43.519,46.934 43.678,46.709 C44.892,44.998 46.085,43.359 47.27,41.794 L47.538,41.441 L47.899,40.969 C47.959,40.891 48.019,40.813 48.078,40.736 C49.789,38.521 51.629,38.652 54.957,40.51 L55.173,40.632 L55.602,40.877 L56.402,41.339 C57.124,41.753 57.506,41.961 57.977,42.193 L69.619,49.473 L71.832,50.848 C77.432,54.319 80.997,56.458 82.06,56.946 C83.462,57.591 84.537,57.46 85.128,56.646 C85.591,56.009 85.665,55.02 85.394,54.179 L84.485,51.574 L84.277,50.991 L84.129,50.582 C83.872,49.879 83.65,49.305 83.465,48.868 L83.431,48.788 C82.795,47.313 82.339,46.815 81.269,46.342 L80.971,46.212 C79.887,45.744 78.404,45.158 77.164,44.723 C75.46,44.124 74.701,42.648 75.687,40.736 C76.481,39.201 78.774,38.941 80.955,39.854 L80.99,39.866 L81.122,39.91 C81.761,40.129 83.495,40.803 85.359,41.558 L86.481,42.016 C89.026,43.063 90.91,43.897 91.2,44.12 L91.583,44.405 C91.741,44.524 91.867,44.626 91.987,44.733 C92.797,45.452 93.185,46.317 93.058,47.666 L93.01,48.514 C92.972,49.171 92.927,49.878 92.875,50.631 L92.825,51.361 L92.779,51.999 C92.615,54.281 92.444,56.39 92.242,58.783 C91.943,61.422 89.681,62.627 85.263,62.364 L36.325,62.617 C30.202,62.646 26.366,62.662 24.817,62.665 L24.166,62.665 L23.816,62.663 C20.126,62.628 19.313,62.135 19.121,59.562 L19.116,59.496 L19.115,59.291 C19.095,57.482 18.814,56.775 17.931,56.159 L17.878,56.122 C17.74,56.029 16.871,55.504 16.567,55.3 L16.219,55.081 C14.326,53.883 11.314,51.852 10.012,50.917 C9.136,50.288 8.257,49.36 7.687,48.219 C6.88,46.602 6.826,44.807 7.768,42.821 L7.824,42.704 C8.851,40.505 10.491,39.084 12.619,38.263 C14.195,37.655 15.43,37.48 17.574,37.392 L18.274,37.365 C18.794,37.347 19.651,37.338 20.84,37.335 Z",
    shapePath:
      "M28.713,36.568 L23.634,36.544 L20.971,36.541 C19.793,36.543 18.926,36.551 18.367,36.568 L17.541,36.599 C15.313,36.69 14.013,36.874 12.333,37.522 C10.067,38.397 8.292,39.915 7.173,42.227 L7.109,42.361 C6,44.614 6.046,46.708 6.977,48.573 C7.612,49.845 8.577,50.863 9.548,51.561 L9.82,51.755 C11.342,52.832 14.394,54.88 16.136,55.966 L16.254,56.044 C16.627,56.284 17.33,56.71 17.434,56.78 C18.139,57.257 18.322,57.738 18.322,59.509 L18.323,59.536 C18.443,61.287 18.943,62.316 19.974,62.872 C20.831,63.334 21.888,63.454 24.165,63.459 L26.806,63.453 C33.647,63.427 53.124,63.329 85.241,63.157 L85.525,63.172 C90.11,63.384 92.681,61.955 93.032,58.861 L93.15,57.449 C93.291,55.756 93.416,54.172 93.538,52.511 L93.594,51.737 L93.682,50.468 C93.75,49.461 93.806,48.542 93.849,47.724 C94,46.124 93.504,45.018 92.515,44.139 C92.404,44.041 92.291,43.948 92.161,43.848 L91.684,43.49 C91.288,43.186 89.227,42.28 86.299,41.084 L85.655,40.822 L84.642,40.414 C83.135,39.812 81.848,39.317 81.329,39.142 L81.242,39.114 L81.262,39.122 C78.747,38.069 76.013,38.379 74.982,40.372 C73.771,42.72 74.75,44.678 76.827,45.445 L77.256,45.598 C78.518,46.053 79.963,46.633 80.948,47.068 L81.07,47.123 C81.835,47.481 82.152,47.845 82.662,49.011 L82.702,49.102 C82.92,49.608 83.197,50.336 83.53,51.259 L83.655,51.607 L84.127,52.956 L84.643,54.436 C84.838,55.041 84.784,55.771 84.486,56.179 C84.156,56.633 83.516,56.722 82.475,56.263 L82.392,56.225 C81.36,55.751 77.717,53.563 72.053,50.052 L69.671,48.57 L58.759,41.745 C58.524,41.599 58.38,41.51 58.35,41.493 L58.129,41.382 C57.714,41.171 57.32,40.952 56.615,40.546 L55.781,40.064 L55.564,39.941 L55.345,39.818 C53.673,38.884 52.496,38.413 51.329,38.33 C49.838,38.223 48.551,38.825 47.45,40.251 L47.088,40.722 C47.028,40.801 46.967,40.88 46.906,40.96 L46.638,41.314 C45.566,42.73 44.488,44.205 43.396,45.737 L42.828,46.537 L41.08,49.028 C41.024,49.105 40.922,49.244 40.915,49.253 L40.821,49.385 C40.777,49.448 40.737,49.507 40.697,49.568 C40.028,50.598 39.743,51.861 39.917,53.953 L39.937,54.147 C40.17,56.539 39.511,57.243 37.77,57.261 L33.457,57.269 L32.123,57.268 C31.727,57.266 31.395,57.264 31.123,57.261 L30.962,57.257 C29.733,57.215 28.713,56.842 26.769,55.773 L24.528,54.531 L21.108,52.626 C20.303,52.176 19.725,51.849 19.42,51.671 L19.237,51.556 C17.599,50.511 17.035,49.697 17.474,48.555 C18.085,46.964 18.784,46.557 21.17,46.557 L21.769,46.54 C22.471,46.52 23.091,46.508 23.889,46.497 L26.684,46.466 C28.936,46.436 29.901,46.38 30.85,46.202 L30.96,46.181 C32.288,45.919 33.254,45.407 34.198,44.452 C34.432,44.215 34.668,43.948 34.911,43.645 C37.852,39.978 36.751,36.893 31.938,36.578 L28.713,36.568 Z M20.84,37.335 L23.632,37.338 L31.203,37.371 L31.912,37.371 C36.023,37.641 36.851,39.958 34.292,43.148 C34.065,43.431 33.848,43.678 33.633,43.894 L33.543,43.984 C32.142,45.367 31.03,45.614 26.447,45.675 L24.151,45.7 C23.559,45.707 23.07,45.715 22.593,45.725 L21.714,45.747 C21.535,45.752 21.351,45.758 21.158,45.764 C18.477,45.764 17.471,46.348 16.733,48.27 C16.382,49.186 16.523,50.016 17.08,50.76 C17.496,51.316 18.086,51.779 19.011,52.352 L19.414,52.583 C19.794,52.799 20.327,53.099 20.994,53.472 L23.39,54.807 L26.257,56.397 C28.43,57.6 29.576,58.021 31.023,58.053 L31.472,58.058 C31.795,58.06 32.179,58.062 32.628,58.062 L37.7,58.055 C40.009,58.055 41.051,56.92 40.706,53.875 C40.548,51.964 40.793,50.876 41.362,50.001 C41.397,49.948 41.432,49.896 41.472,49.839 L41.779,49.415 L43.119,47.502 C43.323,47.211 43.519,46.934 43.678,46.709 C44.892,44.998 46.085,43.359 47.27,41.794 L47.538,41.441 L47.899,40.969 C47.959,40.891 48.019,40.813 48.078,40.736 C49.789,38.521 51.629,38.652 54.957,40.51 L55.173,40.632 L55.602,40.877 L56.402,41.339 C57.124,41.753 57.506,41.961 57.977,42.193 L69.619,49.473 L71.832,50.848 C77.432,54.319 80.997,56.458 82.06,56.946 C83.462,57.591 84.537,57.46 85.128,56.646 C85.591,56.009 85.665,55.02 85.394,54.179 L84.485,51.574 L84.277,50.991 L84.129,50.582 C83.872,49.879 83.65,49.305 83.465,48.868 L83.431,48.788 C82.795,47.313 82.339,46.815 81.269,46.342 L80.971,46.212 C79.887,45.744 78.404,45.158 77.164,44.723 C75.46,44.124 74.701,42.648 75.687,40.736 C76.481,39.201 78.774,38.941 80.955,39.854 L80.99,39.866 L81.122,39.91 C81.761,40.129 83.495,40.803 85.359,41.558 L86.481,42.016 C89.026,43.063 90.91,43.897 91.2,44.12 L91.583,44.405 C91.741,44.524 91.867,44.626 91.987,44.733 C92.797,45.452 93.185,46.317 93.058,47.666 L93.01,48.514 C92.972,49.171 92.927,49.878 92.875,50.631 L92.825,51.361 L92.779,51.999 C92.615,54.281 92.444,56.39 92.242,58.783 C91.943,61.422 89.681,62.627 85.263,62.364 L36.325,62.617 C30.202,62.646 26.366,62.662 24.817,62.665 L24.166,62.665 L23.816,62.663 C20.126,62.628 19.313,62.135 19.121,59.562 L19.116,59.496 L19.115,59.291 C19.095,57.482 18.814,56.775 17.931,56.159 L17.878,56.122 C17.74,56.029 16.871,55.504 16.567,55.3 L16.219,55.081 C14.326,53.883 11.314,51.852 10.012,50.917 C9.136,50.288 8.257,49.36 7.687,48.219 C6.88,46.602 6.826,44.807 7.768,42.821 L7.824,42.704 C8.851,40.505 10.491,39.084 12.619,38.263 C14.195,37.655 15.43,37.48 17.574,37.392 L18.274,37.365 C18.794,37.347 19.651,37.338 20.84,37.335 Z",
    start: { x: 28.713, y: 36.568, rotation: -90 },
    facts: ["16 turns","4.665 km","Clockwise"]
  },
  {
    id: "779",
    label: "Red Bull Ring",
    name: "Red Bull Ring",
    location: "Spielberg, Austria",
    accent: "#8ec5ff",
    path: "M52.672,71.411 C52.928,71.542 48.866,69.556 47.287,68.701 C44.341,67.105 39.114,63.997 37.528,62.89 C36.138,61.92 34.597,60.738 32.744,59.252 C32.411,59.011 28.334,55.705 26.713,54.506 C25.561,53.654 24.465,52.902 23.405,52.245 C20.24,50.285 12.896,47.561 7.763,46.05 C7.031,45.855 6.538,45.599 6.305,45.216 C6,44.712 6.209,44.157 6.824,43.617 C9.727,41.024 13.105,39.041 17.538,37.309 C18.55,36.883 20.287,36.34 22.711,35.669 C23.223,35.527 23.764,35.38 24.34,35.226 C25.715,34.858 29.898,33.775 30.385,33.645 C34.11,32.651 49.414,27.2 51.846,25.909 C53.228,25.175 54.258,25.301 54.858,26.14 C55.236,26.67 55.377,27.386 55.377,28.07 C55.056,32.073 53.636,35.054 51.419,37.185 C49.917,38.629 48.326,39.473 46.681,40.01 C44.34,40.977 43.758,41.153 38.61,42.47 C36.448,42.888 35.16,43.694 34.223,44.99 C33.408,46.642 33.361,48.069 33.905,49.318 C34.301,50.229 34.959,50.959 35.798,51.595 C38.111,53.494 41.122,55.771 42.997,56.876 C44.17,57.567 45.798,57.711 47.157,57.169 C48.76,56.531 49.874,55.037 50.225,52.68 C50.763,49.566 52.413,47.142 54.861,45.247 C55.689,44.606 56.562,44.06 57.518,43.555 C58.021,43.289 59.222,42.71 59.278,42.68 C59.752,42.43 68.515,37.957 70.563,36.907 C75.589,34.332 78.996,32.567 80.726,31.635 C82.325,30.624 83.767,30.439 85.047,30.923 C85.93,31.256 86.528,31.764 87.273,32.615 C89.053,34.815 90.683,36.661 92.62,38.46 C93.941,39.848 94,40.958 93.302,42.146 C93.254,42.228 93.096,42.484 93.103,42.472 C91.684,44.693 90.141,46.592 87.616,48.991 C86.128,50.135 62.953,70.579 60.462,72.915 C58.64,74.624 57.796,74.825 56.85,74.107 C56.719,74.007 56.694,73.988 56.668,73.969 C55.916,73.404 54.618,72.519 53.665,71.943 C53.36,71.771 53.036,71.597 52.672,71.411 Z M80.714,31.643 L80.738,31.629 C80.734,31.631 80.73,31.633 80.726,31.635 C80.722,31.638 80.718,31.64 80.714,31.643 Z M54.206,26.606 C53.864,26.128 53.277,26.055 52.221,26.616 C49.727,27.941 34.371,33.411 30.591,34.419 C30.101,34.55 25.918,35.633 24.547,36 C23.973,36.154 23.434,36.3 22.925,36.441 C20.534,37.103 18.819,37.639 17.839,38.051 C13.481,39.754 10.184,41.689 7.355,44.216 C6.995,44.533 6.931,44.702 6.99,44.8 C7.084,44.954 7.423,45.131 7.979,45.279 C13.189,46.813 20.581,49.554 23.827,51.564 C24.907,52.233 26.021,52.998 27.19,53.862 C28.83,55.076 32.903,58.379 33.229,58.616 C35.085,60.103 36.614,61.275 37.987,62.233 C39.544,63.32 44.747,66.414 47.668,67.996 C49.23,68.842 53.279,70.822 53.037,70.698 C53.413,70.89 53.748,71.07 54.064,71.249 C55.052,71.845 56.375,72.747 57.146,73.326 C57.288,73.433 57.313,73.453 57.334,73.469 C57.622,73.687 57.755,73.735 58.003,73.675 C58.412,73.578 59.024,73.166 59.914,72.331 C62.414,69.987 85.441,49.671 87.079,48.397 C89.547,46.05 91.046,44.205 92.423,42.048 C92.415,42.061 92.569,41.813 92.611,41.741 C93.138,40.845 93.099,40.125 92.057,39.03 C90.945,37.998 89.822,36.824 88.705,35.559 C87.944,34.696 87.365,34.002 86.661,33.131 C86.006,32.384 85.491,31.947 84.764,31.672 C83.724,31.279 82.54,31.432 81.143,32.319 C79.386,33.268 75.971,35.036 71.081,37.542 C68.873,38.674 60.12,43.142 59.652,43.389 C59.578,43.427 58.378,44.006 57.892,44.263 C56.975,44.748 56.14,45.27 55.352,45.88 C53.051,47.661 51.515,49.917 51.016,52.807 C50.625,55.429 49.33,57.166 47.453,57.914 C45.861,58.548 43.974,58.381 42.591,57.566 C40.668,56.433 37.635,54.139 35.302,52.224 C34.375,51.522 33.63,50.695 33.17,49.638 C32.528,48.162 32.587,46.478 33.52,44.605 C34.612,43.07 36.082,42.143 38.434,41.689 C43.536,40.383 44.08,40.218 46.389,39.264 C47.964,38.751 49.457,37.96 50.863,36.608 C52.937,34.615 54.269,31.821 54.576,28.054 C54.574,27.527 54.46,26.963 54.206,26.606 Z",
    shapePath:
      "M52.672,71.411 C52.928,71.542 48.866,69.556 47.287,68.701 C44.341,67.105 39.114,63.997 37.528,62.89 C36.138,61.92 34.597,60.738 32.744,59.252 C32.411,59.011 28.334,55.705 26.713,54.506 C25.561,53.654 24.465,52.902 23.405,52.245 C20.24,50.285 12.896,47.561 7.763,46.05 C7.031,45.855 6.538,45.599 6.305,45.216 C6,44.712 6.209,44.157 6.824,43.617 C9.727,41.024 13.105,39.041 17.538,37.309 C18.55,36.883 20.287,36.34 22.711,35.669 C23.223,35.527 23.764,35.38 24.34,35.226 C25.715,34.858 29.898,33.775 30.385,33.645 C34.11,32.651 49.414,27.2 51.846,25.909 C53.228,25.175 54.258,25.301 54.858,26.14 C55.236,26.67 55.377,27.386 55.377,28.07 C55.056,32.073 53.636,35.054 51.419,37.185 C49.917,38.629 48.326,39.473 46.681,40.01 C44.34,40.977 43.758,41.153 38.61,42.47 C36.448,42.888 35.16,43.694 34.223,44.99 C33.408,46.642 33.361,48.069 33.905,49.318 C34.301,50.229 34.959,50.959 35.798,51.595 C38.111,53.494 41.122,55.771 42.997,56.876 C44.17,57.567 45.798,57.711 47.157,57.169 C48.76,56.531 49.874,55.037 50.225,52.68 C50.763,49.566 52.413,47.142 54.861,45.247 C55.689,44.606 56.562,44.06 57.518,43.555 C58.021,43.289 59.222,42.71 59.278,42.68 C59.752,42.43 68.515,37.957 70.563,36.907 C75.589,34.332 78.996,32.567 80.726,31.635 C82.325,30.624 83.767,30.439 85.047,30.923 C85.93,31.256 86.528,31.764 87.273,32.615 C89.053,34.815 90.683,36.661 92.62,38.46 C93.941,39.848 94,40.958 93.302,42.146 C93.254,42.228 93.096,42.484 93.103,42.472 C91.684,44.693 90.141,46.592 87.616,48.991 C86.128,50.135 62.953,70.579 60.462,72.915 C58.64,74.624 57.796,74.825 56.85,74.107 C56.719,74.007 56.694,73.988 56.668,73.969 C55.916,73.404 54.618,72.519 53.665,71.943 C53.36,71.771 53.036,71.597 52.672,71.411 Z M80.714,31.643 L80.738,31.629 C80.734,31.631 80.73,31.633 80.726,31.635 C80.722,31.638 80.718,31.64 80.714,31.643 Z M54.206,26.606 C53.864,26.128 53.277,26.055 52.221,26.616 C49.727,27.941 34.371,33.411 30.591,34.419 C30.101,34.55 25.918,35.633 24.547,36 C23.973,36.154 23.434,36.3 22.925,36.441 C20.534,37.103 18.819,37.639 17.839,38.051 C13.481,39.754 10.184,41.689 7.355,44.216 C6.995,44.533 6.931,44.702 6.99,44.8 C7.084,44.954 7.423,45.131 7.979,45.279 C13.189,46.813 20.581,49.554 23.827,51.564 C24.907,52.233 26.021,52.998 27.19,53.862 C28.83,55.076 32.903,58.379 33.229,58.616 C35.085,60.103 36.614,61.275 37.987,62.233 C39.544,63.32 44.747,66.414 47.668,67.996 C49.23,68.842 53.279,70.822 53.037,70.698 C53.413,70.89 53.748,71.07 54.064,71.249 C55.052,71.845 56.375,72.747 57.146,73.326 C57.288,73.433 57.313,73.453 57.334,73.469 C57.622,73.687 57.755,73.735 58.003,73.675 C58.412,73.578 59.024,73.166 59.914,72.331 C62.414,69.987 85.441,49.671 87.079,48.397 C89.547,46.05 91.046,44.205 92.423,42.048 C92.415,42.061 92.569,41.813 92.611,41.741 C93.138,40.845 93.099,40.125 92.057,39.03 C90.945,37.998 89.822,36.824 88.705,35.559 C87.944,34.696 87.365,34.002 86.661,33.131 C86.006,32.384 85.491,31.947 84.764,31.672 C83.724,31.279 82.54,31.432 81.143,32.319 C79.386,33.268 75.971,35.036 71.081,37.542 C68.873,38.674 60.12,43.142 59.652,43.389 C59.578,43.427 58.378,44.006 57.892,44.263 C56.975,44.748 56.14,45.27 55.352,45.88 C53.051,47.661 51.515,49.917 51.016,52.807 C50.625,55.429 49.33,57.166 47.453,57.914 C45.861,58.548 43.974,58.381 42.591,57.566 C40.668,56.433 37.635,54.139 35.302,52.224 C34.375,51.522 33.63,50.695 33.17,49.638 C32.528,48.162 32.587,46.478 33.52,44.605 C34.612,43.07 36.082,42.143 38.434,41.689 C43.536,40.383 44.08,40.218 46.389,39.264 C47.964,38.751 49.457,37.96 50.863,36.608 C52.937,34.615 54.269,31.821 54.576,28.054 C54.574,27.527 54.46,26.963 54.206,26.606 Z",
    start: { x: 52.672, y: 71.411, rotation: 117 },
    facts: ["10 turns","4.318 km","Clockwise"]
  },
  {
    id: "611",
    label: "Silverstone Circuit",
    name: "Silverstone Circuit",
    location: "Silverstone, Britain",
    accent: "#5fb8ff",
    path: "M93.299,55.629 C94,58.464 93.253,59.7 89.389,61.981 C86.228,63.847 79.402,65.522 71.98,66.783 C69.665,67.181 68.707,67.675 67.244,68.916 C67.071,69.063 67.031,69.097 66.992,69.13 C65.845,70.098 64.98,70.524 64.057,70.591 C63.694,70.617 63.325,70.59 62.865,70.514 C62.594,70.469 61.504,70.249 61.558,70.26 C61.141,70.179 60.775,70.118 60.388,70.068 C57.817,69.507 56.458,69.941 55.204,71.196 C55.113,71.288 55.022,71.383 54.904,71.509 C54.87,71.545 54.831,71.587 54.758,71.665 C54.699,71.728 54.656,71.774 54.619,71.812 C52.979,73.616 51.316,74.169 49.718,73.667 C48.573,73.308 47.595,72.464 46.776,71.375 C46.267,70.399 45.766,69.699 45.227,69.172 C44.458,68.419 43.919,68.16 42.451,67.673 C42.157,67.576 41.968,67.51 41.777,67.433 C40.414,66.889 14.582,58.271 9.202,56.545 C6.973,55.83 6,54.693 6.15,53.287 C6.25,52.348 6.824,51.451 7.593,50.665 C7.684,50.572 8.897,49.388 9.347,48.921 C10.181,48.057 10.94,47.178 11.685,46.181 C12.937,43.501 15.525,40.013 18.834,36.165 C19.681,35.181 19.949,34.513 19.818,34.088 C19.724,33.778 19.417,33.541 18.766,33.235 C18.695,33.201 18.406,33.069 18.335,33.036 C17.003,32.411 16.444,31.61 16.542,30.618 C16.613,29.906 16.941,29.281 17.728,28.123 C18.613,26.974 19.769,26.309 21.124,26.06 C22.365,25.831 23.654,25.956 25.005,26.31 C25.315,26.392 25.467,26.437 25.929,26.582 C26.527,26.769 29.113,28.099 36.518,31.975 C42.446,35.078 44.564,36.177 46.057,36.905 C48.03,37.868 49.098,39.566 49.436,41.77 C49.667,43.275 49.555,44.752 49.235,46.434 C49.082,49.95 50.842,52.222 54.624,54.612 C55.144,54.94 56.973,56.033 57.39,56.293 C58.922,57.035 59.287,57.996 58.439,58.926 C57.875,59.544 56.829,60.108 55.197,60.778 C54.935,60.886 54.662,60.994 54.333,61.123 C54.172,61.186 53.626,61.398 53.548,61.427 C52.249,62.037 51.92,62.357 51.92,63.084 C51.92,63.172 52.08,63.307 52.48,63.437 C52.938,63.586 53.608,63.685 54.428,63.728 C55.945,63.809 57.88,63.692 59.326,63.448 C61.755,63.039 63.463,61.833 64.498,59.791 C70.274,50.037 73.457,44.456 74.008,43.122 C74.159,42.757 74.336,42.405 74.584,41.961 C74.675,41.798 74.998,41.234 75.053,41.136 C76.068,39.339 76.498,37.955 76.498,35.656 C76.498,34.165 76.209,33.408 75.669,33.102 C75.235,32.856 74.761,32.842 73.348,32.965 C72.694,33.021 72.333,33.044 71.912,33.044 C70.508,33.044 69.641,32.515 69.322,31.53 C69.079,30.782 69.167,29.852 69.497,28.652 C70.28,26.736 71.731,26.046 73.797,26.319 C75.28,26.515 76.516,26.975 79.788,28.397 C80.049,28.51 80.231,28.589 80.413,28.668 C81.222,29.016 81.836,29.27 82.424,29.494 C85.89,30.817 87.921,33.397 88.484,37.184 C91.274,47.783 92.878,53.929 93.299,55.629 Z M61.709,69.475 C61.669,69.467 62.741,69.683 62.995,69.725 C63.399,69.792 63.707,69.815 63.999,69.794 C64.73,69.741 65.448,69.388 66.475,68.52 C66.665,68.36 66.665,68.36 66.727,68.307 C68.292,66.979 69.376,66.42 71.845,65.995 C79.158,64.753 85.942,63.088 88.982,61.293 C92.573,59.174 93.126,58.259 92.523,55.821 C92.103,54.125 90.497,47.972 87.706,37.366 C87.18,33.806 85.339,31.462 82.139,30.241 C81.538,30.012 80.916,29.754 80.096,29.401 C79.914,29.323 79.731,29.244 79.47,29.13 C76.277,27.743 75.07,27.293 73.692,27.111 C71.972,26.884 70.881,27.397 70.261,28.888 C69.975,29.937 69.902,30.728 70.082,31.284 C70.286,31.911 70.831,32.245 71.912,32.245 C72.303,32.245 72.647,32.223 73.279,32.168 C74.88,32.03 75.426,32.045 76.064,32.407 C76.907,32.885 77.297,33.907 77.297,35.656 C77.297,38.107 76.827,39.62 75.749,41.529 C75.692,41.63 75.37,42.192 75.282,42.35 C75.048,42.769 74.883,43.096 74.746,43.427 C74.173,44.815 70.999,50.381 65.198,60.175 C64.058,62.426 62.133,63.786 59.459,64.236 C57.955,64.489 55.962,64.61 54.386,64.526 C52.336,64.417 51.121,64.023 51.121,63.084 C51.121,61.953 51.656,61.432 53.233,60.693 C53.337,60.653 53.882,60.441 54.042,60.379 C54.367,60.251 54.636,60.144 54.893,60.039 C56.414,59.415 57.393,58.887 57.848,58.387 C58.284,57.909 58.142,57.54 57.024,57.003 C56.619,56.752 54.736,55.628 54.197,55.288 C52.385,54.143 51.115,53.107 50.15,51.857 C48.938,50.288 48.34,48.491 48.438,46.368 C48.753,44.701 48.862,43.295 48.647,41.891 C48.345,39.928 47.422,38.461 45.706,37.623 C44.203,36.89 42.087,35.792 36.16,32.689 C28.979,28.931 26.212,27.508 25.69,27.345 C25.241,27.204 25.096,27.16 24.802,27.083 C23.555,26.756 22.375,26.642 21.269,26.846 C20.101,27.061 19.12,27.624 18.375,28.591 C17.679,29.615 17.39,30.167 17.338,30.697 C17.276,31.319 17.626,31.821 18.615,32.284 C18.742,32.344 19.03,32.476 19.106,32.512 C19.951,32.909 20.4,33.256 20.583,33.854 C20.812,34.605 20.447,35.515 19.44,36.686 C16.162,40.497 13.597,43.958 12.392,46.555 C11.576,47.665 10.788,48.579 9.922,49.476 C9.461,49.953 8.246,51.14 8.164,51.224 C7.51,51.892 7.021,52.657 6.945,53.372 C6.84,54.351 7.544,55.174 9.446,55.784 C14.849,57.517 40.685,66.137 42.073,66.691 C42.246,66.76 42.422,66.822 42.702,66.915 C44.279,67.437 44.905,67.739 45.786,68.601 C46.382,69.185 46.928,69.944 47.435,70.921 C48.158,71.876 49.012,72.608 49.957,72.905 C51.24,73.307 52.587,72.86 54.034,71.268 C54.075,71.225 54.117,71.181 54.174,71.12 C54.246,71.042 54.286,71 54.321,70.963 C54.444,70.831 54.54,70.731 54.639,70.632 C56.078,69.191 57.707,68.668 60.508,69.278 C60.906,69.33 61.283,69.393 61.709,69.475 Z M60.525,69.281 L60.491,69.276 C60.497,69.276 60.502,69.277 60.508,69.278 C60.514,69.279 60.519,69.28 60.525,69.281 Z",
    shapePath:
      "M93.299,55.629 C94,58.464 93.253,59.7 89.389,61.981 C86.228,63.847 79.402,65.522 71.98,66.783 C69.665,67.181 68.707,67.675 67.244,68.916 C67.071,69.063 67.031,69.097 66.992,69.13 C65.845,70.098 64.98,70.524 64.057,70.591 C63.694,70.617 63.325,70.59 62.865,70.514 C62.594,70.469 61.504,70.249 61.558,70.26 C61.141,70.179 60.775,70.118 60.388,70.068 C57.817,69.507 56.458,69.941 55.204,71.196 C55.113,71.288 55.022,71.383 54.904,71.509 C54.87,71.545 54.831,71.587 54.758,71.665 C54.699,71.728 54.656,71.774 54.619,71.812 C52.979,73.616 51.316,74.169 49.718,73.667 C48.573,73.308 47.595,72.464 46.776,71.375 C46.267,70.399 45.766,69.699 45.227,69.172 C44.458,68.419 43.919,68.16 42.451,67.673 C42.157,67.576 41.968,67.51 41.777,67.433 C40.414,66.889 14.582,58.271 9.202,56.545 C6.973,55.83 6,54.693 6.15,53.287 C6.25,52.348 6.824,51.451 7.593,50.665 C7.684,50.572 8.897,49.388 9.347,48.921 C10.181,48.057 10.94,47.178 11.685,46.181 C12.937,43.501 15.525,40.013 18.834,36.165 C19.681,35.181 19.949,34.513 19.818,34.088 C19.724,33.778 19.417,33.541 18.766,33.235 C18.695,33.201 18.406,33.069 18.335,33.036 C17.003,32.411 16.444,31.61 16.542,30.618 C16.613,29.906 16.941,29.281 17.728,28.123 C18.613,26.974 19.769,26.309 21.124,26.06 C22.365,25.831 23.654,25.956 25.005,26.31 C25.315,26.392 25.467,26.437 25.929,26.582 C26.527,26.769 29.113,28.099 36.518,31.975 C42.446,35.078 44.564,36.177 46.057,36.905 C48.03,37.868 49.098,39.566 49.436,41.77 C49.667,43.275 49.555,44.752 49.235,46.434 C49.082,49.95 50.842,52.222 54.624,54.612 C55.144,54.94 56.973,56.033 57.39,56.293 C58.922,57.035 59.287,57.996 58.439,58.926 C57.875,59.544 56.829,60.108 55.197,60.778 C54.935,60.886 54.662,60.994 54.333,61.123 C54.172,61.186 53.626,61.398 53.548,61.427 C52.249,62.037 51.92,62.357 51.92,63.084 C51.92,63.172 52.08,63.307 52.48,63.437 C52.938,63.586 53.608,63.685 54.428,63.728 C55.945,63.809 57.88,63.692 59.326,63.448 C61.755,63.039 63.463,61.833 64.498,59.791 C70.274,50.037 73.457,44.456 74.008,43.122 C74.159,42.757 74.336,42.405 74.584,41.961 C74.675,41.798 74.998,41.234 75.053,41.136 C76.068,39.339 76.498,37.955 76.498,35.656 C76.498,34.165 76.209,33.408 75.669,33.102 C75.235,32.856 74.761,32.842 73.348,32.965 C72.694,33.021 72.333,33.044 71.912,33.044 C70.508,33.044 69.641,32.515 69.322,31.53 C69.079,30.782 69.167,29.852 69.497,28.652 C70.28,26.736 71.731,26.046 73.797,26.319 C75.28,26.515 76.516,26.975 79.788,28.397 C80.049,28.51 80.231,28.589 80.413,28.668 C81.222,29.016 81.836,29.27 82.424,29.494 C85.89,30.817 87.921,33.397 88.484,37.184 C91.274,47.783 92.878,53.929 93.299,55.629 Z M61.709,69.475 C61.669,69.467 62.741,69.683 62.995,69.725 C63.399,69.792 63.707,69.815 63.999,69.794 C64.73,69.741 65.448,69.388 66.475,68.52 C66.665,68.36 66.665,68.36 66.727,68.307 C68.292,66.979 69.376,66.42 71.845,65.995 C79.158,64.753 85.942,63.088 88.982,61.293 C92.573,59.174 93.126,58.259 92.523,55.821 C92.103,54.125 90.497,47.972 87.706,37.366 C87.18,33.806 85.339,31.462 82.139,30.241 C81.538,30.012 80.916,29.754 80.096,29.401 C79.914,29.323 79.731,29.244 79.47,29.13 C76.277,27.743 75.07,27.293 73.692,27.111 C71.972,26.884 70.881,27.397 70.261,28.888 C69.975,29.937 69.902,30.728 70.082,31.284 C70.286,31.911 70.831,32.245 71.912,32.245 C72.303,32.245 72.647,32.223 73.279,32.168 C74.88,32.03 75.426,32.045 76.064,32.407 C76.907,32.885 77.297,33.907 77.297,35.656 C77.297,38.107 76.827,39.62 75.749,41.529 C75.692,41.63 75.37,42.192 75.282,42.35 C75.048,42.769 74.883,43.096 74.746,43.427 C74.173,44.815 70.999,50.381 65.198,60.175 C64.058,62.426 62.133,63.786 59.459,64.236 C57.955,64.489 55.962,64.61 54.386,64.526 C52.336,64.417 51.121,64.023 51.121,63.084 C51.121,61.953 51.656,61.432 53.233,60.693 C53.337,60.653 53.882,60.441 54.042,60.379 C54.367,60.251 54.636,60.144 54.893,60.039 C56.414,59.415 57.393,58.887 57.848,58.387 C58.284,57.909 58.142,57.54 57.024,57.003 C56.619,56.752 54.736,55.628 54.197,55.288 C52.385,54.143 51.115,53.107 50.15,51.857 C48.938,50.288 48.34,48.491 48.438,46.368 C48.753,44.701 48.862,43.295 48.647,41.891 C48.345,39.928 47.422,38.461 45.706,37.623 C44.203,36.89 42.087,35.792 36.16,32.689 C28.979,28.931 26.212,27.508 25.69,27.345 C25.241,27.204 25.096,27.16 24.802,27.083 C23.555,26.756 22.375,26.642 21.269,26.846 C20.101,27.061 19.12,27.624 18.375,28.591 C17.679,29.615 17.39,30.167 17.338,30.697 C17.276,31.319 17.626,31.821 18.615,32.284 C18.742,32.344 19.03,32.476 19.106,32.512 C19.951,32.909 20.4,33.256 20.583,33.854 C20.812,34.605 20.447,35.515 19.44,36.686 C16.162,40.497 13.597,43.958 12.392,46.555 C11.576,47.665 10.788,48.579 9.922,49.476 C9.461,49.953 8.246,51.14 8.164,51.224 C7.51,51.892 7.021,52.657 6.945,53.372 C6.84,54.351 7.544,55.174 9.446,55.784 C14.849,57.517 40.685,66.137 42.073,66.691 C42.246,66.76 42.422,66.822 42.702,66.915 C44.279,67.437 44.905,67.739 45.786,68.601 C46.382,69.185 46.928,69.944 47.435,70.921 C48.158,71.876 49.012,72.608 49.957,72.905 C51.24,73.307 52.587,72.86 54.034,71.268 C54.075,71.225 54.117,71.181 54.174,71.12 C54.246,71.042 54.286,71 54.321,70.963 C54.444,70.831 54.54,70.731 54.639,70.632 C56.078,69.191 57.707,68.668 60.508,69.278 C60.906,69.33 61.283,69.393 61.709,69.475 Z M60.525,69.281 L60.491,69.276 C60.497,69.276 60.502,69.277 60.508,69.278 C60.514,69.279 60.519,69.28 60.525,69.281 Z",
    start: { x: 93.299, y: 55.629, rotation: 166 },
    facts: ["18 turns","5.891 km","Clockwise"]
  },
  {
    id: "616",
    label: "Spa-Francorchamps",
    name: "Circuit de Spa-Francorchamps",
    location: "Stavelot, Belgium",
    accent: "#69d39b",
    path: "M70.977,39.768 C67.864,38.868 66.454,39.368 65.545,41.975 C64.433,44.804 64.984,46.928 66.733,49.094 C66.965,49.382 67.154,49.599 67.553,50.044 C67.894,50.423 69.407,52.143 69.511,52.261 C70.533,53.416 71.535,54.526 72.725,55.814 C73.759,56.855 74.08,57.911 73.762,58.959 C73.523,59.749 72.979,60.437 72.078,61.262 C71.919,61.408 71.161,62.071 70.993,62.231 C69.504,63.356 69.13,64.487 69.573,65.864 C69.927,66.965 70.541,67.858 72.307,70.065 C72.505,70.313 72.628,70.468 72.756,70.63 C73.98,72.179 74.299,73.501 73.8,74.583 C73.416,75.417 72.603,76.002 71.543,76.397 C69.095,77.376 66.724,77.938 64.198,77.788 C60.7,77.17 57.858,72.445 56.821,67.544 C56.553,66.29 56.388,64.902 56.304,63.333 C56.227,61.904 56.219,60.712 56.241,58.345 C56.264,55.951 56.255,55.084 56.164,54.179 C55.92,51.739 54.336,49.273 50.505,44.675 C49.495,43.462 47.982,42.546 46.078,41.882 C45.041,41.521 43.937,41.25 42.76,41.043 C42.318,40.966 41.887,40.901 41.422,40.839 C41.191,40.808 40.554,40.728 40.472,40.717 C39.865,40.636 39.847,40.634 35.614,40.116 C32.463,39.731 30.95,39.541 30.521,39.47 C29.647,39.325 29.258,38.74 29.524,37.924 C29.743,37.387 29.961,36.766 30.185,36.042 C30.327,35.544 30.224,35.416 29.649,35.416 L8.22,35.416 C7.544,35.416 6.934,35.217 6.405,34.821 L6.266,34.639 C6,33.966 6.165,33.346 6.669,32.805 C7.025,32.422 7.499,32.108 8.26,31.696 C8.379,31.632 8.843,31.386 8.952,31.327 C9.088,31.253 9.701,30.919 9.792,30.87 C10.205,30.645 10.569,30.448 10.948,30.246 C11.971,29.701 12.949,29.198 13.923,28.723 C14.741,28.323 15.528,27.957 16.283,27.627 C18.505,26.657 20.351,26.043 21.738,25.872 C23.749,25.623 25.303,25.349 27.319,24.919 C27.512,24.878 27.709,24.836 27.964,24.781 C27.997,24.774 28.466,24.672 28.603,24.642 C29.243,24.504 29.695,24.409 30.15,24.318 C30.962,24.132 31.441,23.877 32.109,23.358 C32.157,23.321 32.346,23.173 32.318,23.195 C33.22,22.49 33.836,22.191 34.993,22.065 C36.215,22.062 36.989,22.25 37.992,22.673 C38.004,22.678 38.391,22.844 38.498,22.888 C39.055,23.117 39.451,23.216 39.959,23.218 C46.031,22.678 45.982,22.682 47.731,22.635 C48.543,22.612 49.342,22.613 50.197,22.637 C53.106,22.719 62.661,24.589 67.35,25.883 C71.029,26.883 75.19,27.664 81.489,28.677 C84.435,29.152 85.193,29.952 85.16,31.651 C85.156,31.847 85.155,31.901 85.155,31.966 C85.155,33.398 85.682,33.71 87.684,33.931 C87.873,33.951 87.928,33.958 88.019,33.968 C88.294,34 88.511,34.03 88.719,34.067 C90.894,34.312 92.096,35.997 92.692,38.72 C92.813,39.269 92.906,39.843 92.987,40.5 C93.034,40.87 93.152,41.973 93.153,41.977 C93.164,42.076 93.174,42.163 93.181,42.22 C93.254,42.614 93.332,42.979 93.465,43.558 C93.669,44.443 93.677,44.478 93.744,44.811 C93.915,45.652 94,46.344 94,47.052 C94,51.062 92.764,52.778 90.08,52.778 C86.585,52.29 85.904,51.423 86.143,47.03 C86.462,44.695 85.728,43.756 83.855,43.115 C83.725,43.071 83.59,43.028 83.422,42.975 C83.349,42.953 83.06,42.864 82.989,42.842 C82.818,42.789 82.684,42.745 82.558,42.702 C78.707,41.843 75.07,40.927 70.977,39.768 Z M8.22,34.574 L29.649,34.574 C30.77,34.574 31.294,35.222 30.992,36.282 C30.76,37.03 30.536,37.669 30.32,38.199 C30.225,38.497 30.283,38.577 30.659,38.639 C31.069,38.707 32.597,38.899 35.642,39.271 C39.96,39.799 39.972,39.801 40.583,39.882 C40.661,39.893 41.298,39.972 41.534,40.004 C42.009,40.067 42.451,40.134 42.906,40.214 C44.124,40.428 45.271,40.709 46.355,41.087 C48.391,41.797 50.03,42.789 51.152,44.136 C55.101,48.876 56.734,51.418 57.002,54.095 C57.097,55.043 57.107,55.922 57.083,58.353 C57.061,60.702 57.069,61.882 57.145,63.287 C57.227,64.816 57.386,66.161 57.644,67.369 C58.614,71.954 61.283,76.397 64.273,76.949 C66.641,77.085 68.896,76.548 71.24,75.612 C72.121,75.283 72.764,74.82 73.036,74.231 C73.383,73.478 73.141,72.475 72.096,71.152 C71.969,70.991 71.847,70.838 71.649,70.592 C69.81,68.292 69.169,67.362 68.771,66.122 C68.219,64.405 68.711,62.907 70.431,61.604 C70.642,61.407 71.367,60.772 71.51,60.641 C73.256,59.043 73.604,57.894 72.117,56.396 C70.912,55.092 69.907,53.978 68.881,52.819 C68.773,52.697 67.265,50.982 66.926,50.607 C66.518,50.151 66.321,49.926 66.077,49.623 C64.155,47.241 63.525,44.813 64.755,41.682 C65.826,38.614 67.707,37.946 71.208,38.958 C75.293,40.115 78.921,41.028 82.766,41.885 C82.934,41.941 83.066,41.984 83.239,42.038 C83.308,42.059 83.597,42.148 83.672,42.171 C83.847,42.226 83.989,42.271 84.127,42.319 C86.346,43.077 87.353,44.361 86.983,47.092 C86.865,49.281 87.025,50.414 87.492,51.007 C87.884,51.506 88.482,51.705 90.109,51.936 C92.237,51.924 93.158,50.629 93.158,47.052 C93.158,46.407 93.079,45.769 92.919,44.979 C92.854,44.656 92.846,44.621 92.645,43.747 C92.509,43.156 92.428,42.781 92.35,42.351 C92.339,42.267 92.328,42.177 92.316,42.074 C92.315,42.063 92.197,40.965 92.152,40.604 C92.073,39.971 91.984,39.421 91.87,38.9 C91.34,36.484 90.345,35.092 88.613,34.902 C88.392,34.864 88.187,34.836 87.922,34.805 C87.832,34.794 87.779,34.788 87.592,34.768 C86.43,34.639 85.931,34.536 85.409,34.228 C84.685,33.799 84.313,33.064 84.313,31.966 C84.313,31.893 84.314,31.835 84.317,31.707 C84.33,31.017 84.272,30.75 84.013,30.476 C83.627,30.07 82.798,29.741 81.355,29.509 C75.027,28.49 70.846,27.706 67.128,26.695 C62.497,25.417 52.999,23.558 50.173,23.479 C49.334,23.455 48.551,23.454 47.754,23.476 C46.03,23.524 46.077,23.52 40.014,24.058 C39.335,24.06 38.834,23.937 38.178,23.667 C38.063,23.62 37.671,23.452 37.664,23.449 C36.764,23.069 36.099,22.907 35.062,22.904 C34.098,23.013 33.62,23.246 32.837,23.858 C32.865,23.836 32.676,23.985 32.626,24.023 C31.869,24.611 31.285,24.922 30.326,25.141 C29.865,25.234 29.417,25.328 28.781,25.465 C28.644,25.495 28.175,25.597 28.143,25.604 C27.887,25.659 27.689,25.702 27.494,25.743 C25.457,26.177 23.879,26.456 21.841,26.707 C20.554,26.866 18.774,27.459 16.62,28.399 C15.877,28.724 15.1,29.085 14.292,29.479 C13.328,29.95 12.359,30.449 11.344,30.989 C10.968,31.19 10.606,31.385 10.194,31.609 C10.104,31.658 9.49,31.993 9.353,32.067 C9.24,32.129 8.775,32.375 8.66,32.437 C7.353,33.144 6.857,33.636 7.013,34.219 C7.369,34.457 7.768,34.574 8.22,34.574 Z",
    shapePath:
      "M70.977,39.768 C67.864,38.868 66.454,39.368 65.545,41.975 C64.433,44.804 64.984,46.928 66.733,49.094 C66.965,49.382 67.154,49.599 67.553,50.044 C67.894,50.423 69.407,52.143 69.511,52.261 C70.533,53.416 71.535,54.526 72.725,55.814 C73.759,56.855 74.08,57.911 73.762,58.959 C73.523,59.749 72.979,60.437 72.078,61.262 C71.919,61.408 71.161,62.071 70.993,62.231 C69.504,63.356 69.13,64.487 69.573,65.864 C69.927,66.965 70.541,67.858 72.307,70.065 C72.505,70.313 72.628,70.468 72.756,70.63 C73.98,72.179 74.299,73.501 73.8,74.583 C73.416,75.417 72.603,76.002 71.543,76.397 C69.095,77.376 66.724,77.938 64.198,77.788 C60.7,77.17 57.858,72.445 56.821,67.544 C56.553,66.29 56.388,64.902 56.304,63.333 C56.227,61.904 56.219,60.712 56.241,58.345 C56.264,55.951 56.255,55.084 56.164,54.179 C55.92,51.739 54.336,49.273 50.505,44.675 C49.495,43.462 47.982,42.546 46.078,41.882 C45.041,41.521 43.937,41.25 42.76,41.043 C42.318,40.966 41.887,40.901 41.422,40.839 C41.191,40.808 40.554,40.728 40.472,40.717 C39.865,40.636 39.847,40.634 35.614,40.116 C32.463,39.731 30.95,39.541 30.521,39.47 C29.647,39.325 29.258,38.74 29.524,37.924 C29.743,37.387 29.961,36.766 30.185,36.042 C30.327,35.544 30.224,35.416 29.649,35.416 L8.22,35.416 C7.544,35.416 6.934,35.217 6.405,34.821 L6.266,34.639 C6,33.966 6.165,33.346 6.669,32.805 C7.025,32.422 7.499,32.108 8.26,31.696 C8.379,31.632 8.843,31.386 8.952,31.327 C9.088,31.253 9.701,30.919 9.792,30.87 C10.205,30.645 10.569,30.448 10.948,30.246 C11.971,29.701 12.949,29.198 13.923,28.723 C14.741,28.323 15.528,27.957 16.283,27.627 C18.505,26.657 20.351,26.043 21.738,25.872 C23.749,25.623 25.303,25.349 27.319,24.919 C27.512,24.878 27.709,24.836 27.964,24.781 C27.997,24.774 28.466,24.672 28.603,24.642 C29.243,24.504 29.695,24.409 30.15,24.318 C30.962,24.132 31.441,23.877 32.109,23.358 C32.157,23.321 32.346,23.173 32.318,23.195 C33.22,22.49 33.836,22.191 34.993,22.065 C36.215,22.062 36.989,22.25 37.992,22.673 C38.004,22.678 38.391,22.844 38.498,22.888 C39.055,23.117 39.451,23.216 39.959,23.218 C46.031,22.678 45.982,22.682 47.731,22.635 C48.543,22.612 49.342,22.613 50.197,22.637 C53.106,22.719 62.661,24.589 67.35,25.883 C71.029,26.883 75.19,27.664 81.489,28.677 C84.435,29.152 85.193,29.952 85.16,31.651 C85.156,31.847 85.155,31.901 85.155,31.966 C85.155,33.398 85.682,33.71 87.684,33.931 C87.873,33.951 87.928,33.958 88.019,33.968 C88.294,34 88.511,34.03 88.719,34.067 C90.894,34.312 92.096,35.997 92.692,38.72 C92.813,39.269 92.906,39.843 92.987,40.5 C93.034,40.87 93.152,41.973 93.153,41.977 C93.164,42.076 93.174,42.163 93.181,42.22 C93.254,42.614 93.332,42.979 93.465,43.558 C93.669,44.443 93.677,44.478 93.744,44.811 C93.915,45.652 94,46.344 94,47.052 C94,51.062 92.764,52.778 90.08,52.778 C86.585,52.29 85.904,51.423 86.143,47.03 C86.462,44.695 85.728,43.756 83.855,43.115 C83.725,43.071 83.59,43.028 83.422,42.975 C83.349,42.953 83.06,42.864 82.989,42.842 C82.818,42.789 82.684,42.745 82.558,42.702 C78.707,41.843 75.07,40.927 70.977,39.768 Z M8.22,34.574 L29.649,34.574 C30.77,34.574 31.294,35.222 30.992,36.282 C30.76,37.03 30.536,37.669 30.32,38.199 C30.225,38.497 30.283,38.577 30.659,38.639 C31.069,38.707 32.597,38.899 35.642,39.271 C39.96,39.799 39.972,39.801 40.583,39.882 C40.661,39.893 41.298,39.972 41.534,40.004 C42.009,40.067 42.451,40.134 42.906,40.214 C44.124,40.428 45.271,40.709 46.355,41.087 C48.391,41.797 50.03,42.789 51.152,44.136 C55.101,48.876 56.734,51.418 57.002,54.095 C57.097,55.043 57.107,55.922 57.083,58.353 C57.061,60.702 57.069,61.882 57.145,63.287 C57.227,64.816 57.386,66.161 57.644,67.369 C58.614,71.954 61.283,76.397 64.273,76.949 C66.641,77.085 68.896,76.548 71.24,75.612 C72.121,75.283 72.764,74.82 73.036,74.231 C73.383,73.478 73.141,72.475 72.096,71.152 C71.969,70.991 71.847,70.838 71.649,70.592 C69.81,68.292 69.169,67.362 68.771,66.122 C68.219,64.405 68.711,62.907 70.431,61.604 C70.642,61.407 71.367,60.772 71.51,60.641 C73.256,59.043 73.604,57.894 72.117,56.396 C70.912,55.092 69.907,53.978 68.881,52.819 C68.773,52.697 67.265,50.982 66.926,50.607 C66.518,50.151 66.321,49.926 66.077,49.623 C64.155,47.241 63.525,44.813 64.755,41.682 C65.826,38.614 67.707,37.946 71.208,38.958 C75.293,40.115 78.921,41.028 82.766,41.885 C82.934,41.941 83.066,41.984 83.239,42.038 C83.308,42.059 83.597,42.148 83.672,42.171 C83.847,42.226 83.989,42.271 84.127,42.319 C86.346,43.077 87.353,44.361 86.983,47.092 C86.865,49.281 87.025,50.414 87.492,51.007 C87.884,51.506 88.482,51.705 90.109,51.936 C92.237,51.924 93.158,50.629 93.158,47.052 C93.158,46.407 93.079,45.769 92.919,44.979 C92.854,44.656 92.846,44.621 92.645,43.747 C92.509,43.156 92.428,42.781 92.35,42.351 C92.339,42.267 92.328,42.177 92.316,42.074 C92.315,42.063 92.197,40.965 92.152,40.604 C92.073,39.971 91.984,39.421 91.87,38.9 C91.34,36.484 90.345,35.092 88.613,34.902 C88.392,34.864 88.187,34.836 87.922,34.805 C87.832,34.794 87.779,34.788 87.592,34.768 C86.43,34.639 85.931,34.536 85.409,34.228 C84.685,33.799 84.313,33.064 84.313,31.966 C84.313,31.893 84.314,31.835 84.317,31.707 C84.33,31.017 84.272,30.75 84.013,30.476 C83.627,30.07 82.798,29.741 81.355,29.509 C75.027,28.49 70.846,27.706 67.128,26.695 C62.497,25.417 52.999,23.558 50.173,23.479 C49.334,23.455 48.551,23.454 47.754,23.476 C46.03,23.524 46.077,23.52 40.014,24.058 C39.335,24.06 38.834,23.937 38.178,23.667 C38.063,23.62 37.671,23.452 37.664,23.449 C36.764,23.069 36.099,22.907 35.062,22.904 C34.098,23.013 33.62,23.246 32.837,23.858 C32.865,23.836 32.676,23.985 32.626,24.023 C31.869,24.611 31.285,24.922 30.326,25.141 C29.865,25.234 29.417,25.328 28.781,25.465 C28.644,25.495 28.175,25.597 28.143,25.604 C27.887,25.659 27.689,25.702 27.494,25.743 C25.457,26.177 23.879,26.456 21.841,26.707 C20.554,26.866 18.774,27.459 16.62,28.399 C15.877,28.724 15.1,29.085 14.292,29.479 C13.328,29.95 12.359,30.449 11.344,30.989 C10.968,31.19 10.606,31.385 10.194,31.609 C10.104,31.658 9.49,31.993 9.353,32.067 C9.24,32.129 8.775,32.375 8.66,32.437 C7.353,33.144 6.857,33.636 7.013,34.219 C7.369,34.457 7.768,34.574 8.22,34.574 Z",
    start: { x: 70.977, y: 39.768, rotation: -74 },
    facts: ["19 turns","7.004 km","Clockwise"]
  },
  {
    id: "613",
    label: "Hungaroring",
    name: "Hungaroring",
    location: "Budapest, Hungary",
    accent: "#f06c64",
    path: "M30.235,90.621 C26.274,90.121 24.802,87.096 25.414,83.226 C25.527,82.518 25.721,81.637 26.051,80.297 C26.097,80.11 26.78,77.387 26.993,76.507 C27.51,74.366 27.887,72.59 28.164,70.887 C28.24,70.423 28.306,69.971 28.364,69.53 C29.024,64.498 26.985,60.004 24.027,59.494 C21.2,59.008 19.775,60.097 19.236,62.845 C18.899,65.126 18.815,70.864 18.815,81.825 C18.815,84.703 17.812,86.701 16.039,87.88 C14.754,88.735 13.209,89.079 11.579,89.077 C7.944,88.838 6.386,87.153 6.114,84.285 C6.067,83.789 6.058,83.395 6.059,82.568 C6.059,82.135 6.042,70.107 6.034,64.159 C6.026,58.013 6.02,52.194 6.016,46.708 C6,26.54 6.011,13.71 6.059,11.325 C6.119,8.35 7.535,6.845 9.751,7.244 C11.569,7.571 13.727,9.205 15.468,11.505 C17.85,14.417 18.59,17.223 18.814,21.766 C18.887,23.231 18.848,25.789 18.693,32.36 C18.574,37.409 18.536,39.38 18.536,41.166 C18.536,45.952 19.932,48.5 22.792,48.5 C24.357,48.604 25.505,47.739 26.344,45.782 C26.68,44.91 27.244,43.298 28.039,40.933 C29.219,37.767 30.704,35.746 32.741,34.439 C34.423,33.36 36.224,32.821 39.697,32.178 C39.831,32.153 42.075,31.747 42.808,31.608 C54.525,29.836 58.017,29.298 64.283,28.291 C65.819,27.952 66.956,27.802 68.196,27.756 C68.707,27.738 69.09,27.735 70.091,27.739 C70.4,27.74 70.562,27.74 70.791,27.741 C72.892,27.85 73.828,27.358 75.117,25.842 C75.177,25.772 75.734,25.103 75.913,24.896 C76.032,24.759 76.65,24.051 76.797,23.879 C77.481,23.074 78.079,22.296 81.181,18.184 C83.771,15.192 84.862,14.649 87.837,14.649 C90.164,14.649 91.594,16.046 92.311,18.296 C92.486,18.843 92.611,19.418 92.702,20.031 C92.736,20.263 92.764,20.491 92.791,20.738 C92.805,20.878 92.844,21.27 92.843,21.259 C93.03,23.102 93.282,25.742 93.494,28.195 C93.813,31.878 94,34.619 94,35.98 C94,37.571 93.76,38.494 93.125,39.032 C92.587,39.487 92.123,39.552 90.755,39.549 C89.652,39.549 89.243,39.714 88.778,40.219 C88.547,40.47 88.552,40.463 87.757,41.558 C86.628,43.113 85.578,44.57 82.116,49.39 C81.732,49.806 81.471,50.133 81.268,50.451 C80.544,51.588 80.486,52.72 81.072,54.529 C81.562,56.042 81.35,55.588 84.751,62.621 C85.939,66.831 85.286,68.219 81.005,70.033 C79.01,70.768 77.626,71.283 75.8,71.969 C75.48,72.089 74.461,72.473 74.472,72.468 C73.936,72.67 73.507,72.831 73.061,72.998 C71.908,73.43 70.751,73.862 69.413,74.358 C67.151,75.244 65.778,76.423 64.94,78.046 C64.259,79.364 63.961,80.719 63.579,83.652 C63.561,83.789 63.499,84.273 63.498,84.279 C63.465,84.534 63.439,84.73 63.414,84.923 C63.348,85.418 63.288,85.843 63.226,86.244 C62.74,89.866 61.224,91.844 58.53,92.596 C56.532,93.155 55.065,93.109 49.222,92.577 C48.689,92.528 48.255,92.49 47.83,92.454 C40.041,92.109 36.234,91.729 30.235,90.621 Z M17.203,41.166 C17.203,39.365 17.241,37.391 17.358,32.421 C17.514,25.818 17.552,23.247 17.482,21.832 C17.271,17.548 16.597,14.991 14.42,12.33 C12.847,10.252 10.948,8.814 9.515,8.556 C8.196,8.319 7.437,9.126 7.392,11.352 C7.345,13.722 7.334,26.565 7.349,46.707 C7.354,52.193 7.36,58.011 7.368,64.157 C7.375,70.104 7.393,82.134 7.393,82.398 C7.391,83.354 7.4,83.719 7.442,84.159 C7.655,86.404 8.716,87.553 11.623,87.745 C12.969,87.745 14.269,87.456 15.301,86.77 C16.691,85.846 17.482,84.27 17.482,81.825 C17.482,70.72 17.564,65.033 17.922,62.619 C18.6,59.157 20.682,57.565 24.253,58.18 C28.064,58.836 30.428,64.048 29.686,69.703 C29.627,70.158 29.558,70.624 29.48,71.102 C29.197,72.842 28.814,74.649 28.289,76.821 C28.075,77.708 27.391,80.434 27.346,80.616 C27.025,81.921 26.836,82.774 26.732,83.435 C26.223,86.647 27.324,88.91 30.44,89.304 C36.412,90.406 40.161,90.78 47.902,91.122 C48.361,91.16 48.801,91.199 49.343,91.249 C54.97,91.761 56.403,91.806 58.172,91.312 C60.318,90.712 61.485,89.19 61.906,86.055 C61.968,85.651 62.027,85.234 62.092,84.747 C62.117,84.556 62.143,84.362 62.176,84.108 C62.176,84.103 62.239,83.618 62.257,83.48 C62.658,80.395 62.98,78.936 63.755,77.434 C64.747,75.512 66.374,74.117 68.938,73.113 C70.285,72.612 71.441,72.181 72.593,71.749 C73.039,71.582 73.467,71.421 74.003,71.22 C73.991,71.224 75.011,70.841 75.295,70.734 C77.16,70.033 78.546,69.517 80.514,68.794 C84.124,67.263 84.472,66.557 83.525,63.148 C80.09,56.045 80.322,56.541 79.804,54.94 C79.105,52.781 79.182,51.243 80.144,49.735 C80.388,49.352 80.69,48.97 81.058,48.577 C84.502,43.783 85.549,42.328 86.678,40.774 C87.527,39.605 87.512,39.626 87.797,39.316 C88.525,38.524 89.293,38.216 90.583,38.216 C91.768,38.218 92.073,38.175 92.263,38.015 C92.512,37.803 92.666,37.211 92.666,35.98 C92.666,34.673 92.481,31.951 92.166,28.31 C91.954,25.864 91.702,23.231 91.516,21.393 C91.516,21.399 91.479,21.012 91.465,20.879 C91.44,20.649 91.414,20.439 91.382,20.227 C91.301,19.679 91.191,19.173 91.041,18.701 C90.483,16.948 89.493,15.982 87.837,15.982 C85.272,15.982 84.539,16.344 82.232,19.005 C79.119,23.13 78.521,23.909 77.866,24.68 C77.658,24.923 77.036,25.637 76.922,25.769 C76.752,25.965 76.2,26.627 76.133,26.706 C74.595,28.515 73.281,29.206 70.757,29.074 C70.56,29.074 70.397,29.073 70.086,29.072 C69.104,29.069 68.732,29.071 68.246,29.089 C67.087,29.132 66.03,29.271 64.533,29.6 C58.223,30.616 54.728,31.153 43.032,32.922 C42.317,33.058 40.069,33.465 39.94,33.489 C36.629,34.102 34.955,34.603 33.461,35.562 C31.687,36.7 30.374,38.487 29.296,41.378 C28.502,43.74 27.934,45.366 27.579,46.285 C26.528,48.737 24.901,49.968 22.77,49.834 C18.972,49.821 17.203,46.58 17.203,41.166 Z",
    shapePath:
      "M30.235,90.621 C26.274,90.121 24.802,87.096 25.414,83.226 C25.527,82.518 25.721,81.637 26.051,80.297 C26.097,80.11 26.78,77.387 26.993,76.507 C27.51,74.366 27.887,72.59 28.164,70.887 C28.24,70.423 28.306,69.971 28.364,69.53 C29.024,64.498 26.985,60.004 24.027,59.494 C21.2,59.008 19.775,60.097 19.236,62.845 C18.899,65.126 18.815,70.864 18.815,81.825 C18.815,84.703 17.812,86.701 16.039,87.88 C14.754,88.735 13.209,89.079 11.579,89.077 C7.944,88.838 6.386,87.153 6.114,84.285 C6.067,83.789 6.058,83.395 6.059,82.568 C6.059,82.135 6.042,70.107 6.034,64.159 C6.026,58.013 6.02,52.194 6.016,46.708 C6,26.54 6.011,13.71 6.059,11.325 C6.119,8.35 7.535,6.845 9.751,7.244 C11.569,7.571 13.727,9.205 15.468,11.505 C17.85,14.417 18.59,17.223 18.814,21.766 C18.887,23.231 18.848,25.789 18.693,32.36 C18.574,37.409 18.536,39.38 18.536,41.166 C18.536,45.952 19.932,48.5 22.792,48.5 C24.357,48.604 25.505,47.739 26.344,45.782 C26.68,44.91 27.244,43.298 28.039,40.933 C29.219,37.767 30.704,35.746 32.741,34.439 C34.423,33.36 36.224,32.821 39.697,32.178 C39.831,32.153 42.075,31.747 42.808,31.608 C54.525,29.836 58.017,29.298 64.283,28.291 C65.819,27.952 66.956,27.802 68.196,27.756 C68.707,27.738 69.09,27.735 70.091,27.739 C70.4,27.74 70.562,27.74 70.791,27.741 C72.892,27.85 73.828,27.358 75.117,25.842 C75.177,25.772 75.734,25.103 75.913,24.896 C76.032,24.759 76.65,24.051 76.797,23.879 C77.481,23.074 78.079,22.296 81.181,18.184 C83.771,15.192 84.862,14.649 87.837,14.649 C90.164,14.649 91.594,16.046 92.311,18.296 C92.486,18.843 92.611,19.418 92.702,20.031 C92.736,20.263 92.764,20.491 92.791,20.738 C92.805,20.878 92.844,21.27 92.843,21.259 C93.03,23.102 93.282,25.742 93.494,28.195 C93.813,31.878 94,34.619 94,35.98 C94,37.571 93.76,38.494 93.125,39.032 C92.587,39.487 92.123,39.552 90.755,39.549 C89.652,39.549 89.243,39.714 88.778,40.219 C88.547,40.47 88.552,40.463 87.757,41.558 C86.628,43.113 85.578,44.57 82.116,49.39 C81.732,49.806 81.471,50.133 81.268,50.451 C80.544,51.588 80.486,52.72 81.072,54.529 C81.562,56.042 81.35,55.588 84.751,62.621 C85.939,66.831 85.286,68.219 81.005,70.033 C79.01,70.768 77.626,71.283 75.8,71.969 C75.48,72.089 74.461,72.473 74.472,72.468 C73.936,72.67 73.507,72.831 73.061,72.998 C71.908,73.43 70.751,73.862 69.413,74.358 C67.151,75.244 65.778,76.423 64.94,78.046 C64.259,79.364 63.961,80.719 63.579,83.652 C63.561,83.789 63.499,84.273 63.498,84.279 C63.465,84.534 63.439,84.73 63.414,84.923 C63.348,85.418 63.288,85.843 63.226,86.244 C62.74,89.866 61.224,91.844 58.53,92.596 C56.532,93.155 55.065,93.109 49.222,92.577 C48.689,92.528 48.255,92.49 47.83,92.454 C40.041,92.109 36.234,91.729 30.235,90.621 Z M17.203,41.166 C17.203,39.365 17.241,37.391 17.358,32.421 C17.514,25.818 17.552,23.247 17.482,21.832 C17.271,17.548 16.597,14.991 14.42,12.33 C12.847,10.252 10.948,8.814 9.515,8.556 C8.196,8.319 7.437,9.126 7.392,11.352 C7.345,13.722 7.334,26.565 7.349,46.707 C7.354,52.193 7.36,58.011 7.368,64.157 C7.375,70.104 7.393,82.134 7.393,82.398 C7.391,83.354 7.4,83.719 7.442,84.159 C7.655,86.404 8.716,87.553 11.623,87.745 C12.969,87.745 14.269,87.456 15.301,86.77 C16.691,85.846 17.482,84.27 17.482,81.825 C17.482,70.72 17.564,65.033 17.922,62.619 C18.6,59.157 20.682,57.565 24.253,58.18 C28.064,58.836 30.428,64.048 29.686,69.703 C29.627,70.158 29.558,70.624 29.48,71.102 C29.197,72.842 28.814,74.649 28.289,76.821 C28.075,77.708 27.391,80.434 27.346,80.616 C27.025,81.921 26.836,82.774 26.732,83.435 C26.223,86.647 27.324,88.91 30.44,89.304 C36.412,90.406 40.161,90.78 47.902,91.122 C48.361,91.16 48.801,91.199 49.343,91.249 C54.97,91.761 56.403,91.806 58.172,91.312 C60.318,90.712 61.485,89.19 61.906,86.055 C61.968,85.651 62.027,85.234 62.092,84.747 C62.117,84.556 62.143,84.362 62.176,84.108 C62.176,84.103 62.239,83.618 62.257,83.48 C62.658,80.395 62.98,78.936 63.755,77.434 C64.747,75.512 66.374,74.117 68.938,73.113 C70.285,72.612 71.441,72.181 72.593,71.749 C73.039,71.582 73.467,71.421 74.003,71.22 C73.991,71.224 75.011,70.841 75.295,70.734 C77.16,70.033 78.546,69.517 80.514,68.794 C84.124,67.263 84.472,66.557 83.525,63.148 C80.09,56.045 80.322,56.541 79.804,54.94 C79.105,52.781 79.182,51.243 80.144,49.735 C80.388,49.352 80.69,48.97 81.058,48.577 C84.502,43.783 85.549,42.328 86.678,40.774 C87.527,39.605 87.512,39.626 87.797,39.316 C88.525,38.524 89.293,38.216 90.583,38.216 C91.768,38.218 92.073,38.175 92.263,38.015 C92.512,37.803 92.666,37.211 92.666,35.98 C92.666,34.673 92.481,31.951 92.166,28.31 C91.954,25.864 91.702,23.231 91.516,21.393 C91.516,21.399 91.479,21.012 91.465,20.879 C91.44,20.649 91.414,20.439 91.382,20.227 C91.301,19.679 91.191,19.173 91.041,18.701 C90.483,16.948 89.493,15.982 87.837,15.982 C85.272,15.982 84.539,16.344 82.232,19.005 C79.119,23.13 78.521,23.909 77.866,24.68 C77.658,24.923 77.036,25.637 76.922,25.769 C76.752,25.965 76.2,26.627 76.133,26.706 C74.595,28.515 73.281,29.206 70.757,29.074 C70.56,29.074 70.397,29.073 70.086,29.072 C69.104,29.069 68.732,29.071 68.246,29.089 C67.087,29.132 66.03,29.271 64.533,29.6 C58.223,30.616 54.728,31.153 43.032,32.922 C42.317,33.058 40.069,33.465 39.94,33.489 C36.629,34.102 34.955,34.603 33.461,35.562 C31.687,36.7 30.374,38.487 29.296,41.378 C28.502,43.74 27.934,45.366 27.579,46.285 C26.528,48.737 24.901,49.968 22.77,49.834 C18.972,49.821 17.203,46.58 17.203,41.166 Z",
    start: { x: 30.235, y: 90.621, rotation: -83 },
    facts: ["14 turns","4.381 km","Clockwise"]
  },
  {
    id: "1102",
    label: "Zandvoort",
    name: "Circuit Park Zandvoort",
    location: "Zandvoort, Netherlands",
    accent: "#62a8ff",
    path: "M66.681,87.863 A3.342,3.342 0 0,1 66.255,87.837 A4.694,4.694 0 0,1 63.474,86.219 A4.081,4.081 0 0,1 62.403,84.396 A4.161,4.161 0 0,1 62.784,81.776 L63.501,80.11 C64.701,77.346 65.942,74.484 66.994,71.599 L67.053,71.447 A13.245,13.245 0 0,0 67.895,68.464 A14.432,14.432 0 0,0 67.917,66.224 L67.917,66.018 C67.863,64.674 67.841,63.299 67.854,61.946 A4.148,4.148 0 0,1 68.41,59.536 A4.202,4.202 0 0,1 70.305,58.224 L70.349,58.224 A25.572,25.572 0 0,0 73.207,57.006 C73.682,56.782 74.166,56.558 74.649,56.343 C74.914,56.226 75.205,56.114 75.483,56.011 C76.45,55.639 77.449,55.254 77.969,54.506 A2.002,2.002 0 0,0 78.197,52.714 A3.758,3.758 0 0,0 77.212,51.371 A3.377,3.377 0 0,0 75.81,50.466 C74.976,50.246 74.063,50.627 73.176,50.994 L72.817,51.138 C72.047,51.451 71.223,51.778 70.39,52.092 A38.786,38.786 0 0,1 63.895,54.009 A15.489,15.489 0 0,1 59.545,54.309 A60.426,60.426 0 0,1 53.324,53.265 L51.492,52.907 L51.008,52.813 C48.589,52.365 46.081,51.868 43.653,52.163 A13.823,13.823 0 0,0 39.886,53.176 A25.572,25.572 0 0,0 35.178,56.02 L34.976,56.163 A21.33,21.33 0 0,1 31.527,58.314 C29.207,59.393 26.954,59.312 24.571,59.209 L23.854,59.209 C21.48,59.142 19.102,59.044 17.297,58.968 C16.956,58.968 16.616,58.968 16.253,58.968 A11.879,11.879 0 0,1 13.386,58.717 A6.656,6.656 0 0,1 12.446,58.399 A12.793,12.793 0 0,1 10.206,57.153 A10.302,10.302 0 0,1 7.124,54.148 A8.381,8.381 0 0,1 6,50.564 A10.159,10.159 0 0,1 7.913,43.474 A56.923,56.923 0 0,0 11.711,37.884 C13.104,35.532 14.291,32.997 15.438,30.546 Q16.002,29.328 16.58,28.128 A3.664,3.664 0 0,1 17.709,26.582 A3.485,3.485 0 0,1 19.348,26.081 A20.421,20.421 0 0,1 27.671,26.976 C29.664,27.617 32.486,28.8 34.6,30.784 A8.959,8.959 0 0,1 35.429,31.68 C36.19,32.62 36.508,33.525 36.374,34.367 A3.252,3.252 0 0,1 35.886,35.577 A6.988,6.988 0 0,1 32.934,38.17 A10.258,10.258 0 0,1 29.798,38.976 C29.525,39.017 29.252,39.057 28.974,39.106 L28.293,39.218 C27.541,39.344 26.761,39.469 26.004,39.626 L25.615,39.702 C23.375,40.15 20.634,40.697 19.38,42.488 A4.108,4.108 0 0,0 18.712,44.311 C18.515,45.655 18.847,46.923 19.608,47.671 C20.226,48.284 21.18,48.643 22.524,48.777 C28.768,49.391 33.566,49.418 38.081,48.871 C39.424,48.705 40.746,48.495 41.996,48.235 A97.084,97.084 0 0,0 56.629,43.94 A62.347,62.347 0 0,0 62.627,41.162 C63.644,40.647 64.697,40.114 65.763,39.617 A1.312,1.312 0 0,1 66.466,39.465 A1.295,1.295 0 0,1 67.362,40.213 A11.919,11.919 0 0,0 68.553,41.955 C69.207,42.73 69.785,43.124 70.345,43.2 A2.755,2.755 0 0,0 71.608,43.003 A2.558,2.558 0 0,0 72.8,42.291 A2.378,2.378 0 0,0 73.247,41.006 A11.485,11.485 0 0,0 72.974,37.772 C72.943,37.597 72.912,37.422 72.885,37.247 L72.177,33.122 Q71.501,28.965 70.793,24.804 C70.551,23.402 70.305,22.004 70.063,20.607 C70.022,20.383 69.978,20.159 69.937,19.94 A11.135,11.135 0 0,1 69.655,16.495 A4.538,4.538 0 0,1 71.447,13.265 A5.863,5.863 0 0,1 74.076,12.392 A40.582,40.582 0 0,1 78.77,12.137 L79.845,12.137 A21.608,21.608 0 0,1 84.253,12.383 C87.975,13.077 91.371,15.801 93.104,19.492 A11.579,11.579 0 0,1 94,26.847 A18.862,18.862 0 0,1 93.189,29.413 C92.867,30.26 92.495,31.102 92.141,31.917 C91.872,32.522 91.599,33.153 91.353,33.763 L75.003,74.251 C74.735,74.918 74.461,75.595 74.193,76.249 C73.212,78.663 72.195,81.176 71.272,83.644 C70.873,84.719 70.269,86.067 69.118,86.972 A4.004,4.004 0 0,1 66.681,87.863 Z M70.712,59.196 A3.288,3.288 0 0,0 69.274,60.141 A3.27,3.27 0 0,0 68.912,61.96 C68.912,63.303 68.912,64.647 68.974,65.991 L68.974,66.197 A15.082,15.082 0 0,1 68.943,68.616 A14.114,14.114 0 0,1 68.047,71.832 L67.993,71.989 C66.927,74.891 65.682,77.767 64.477,80.544 C64.235,81.1 63.998,81.655 63.756,82.206 A3.198,3.198 0 0,0 63.438,84.172 A3.104,3.104 0 0,0 64.258,85.516 A3.695,3.695 0 0,0 66.403,86.806 A2.889,2.889 0 0,0 68.495,86.161 C69.436,85.418 69.96,84.235 70.314,83.295 C71.241,80.795 72.258,78.291 73.243,75.868 L74.054,73.875 L90.403,33.386 C90.654,32.759 90.932,32.123 91.2,31.51 C91.554,30.708 91.917,29.875 92.231,29.055 L92.231,29.055 A17.989,17.989 0 0,0 92.988,26.614 A10.535,10.535 0 0,0 92.168,19.931 C90.6,16.589 87.424,14.027 84.074,13.404 A20.605,20.605 0 0,0 79.881,13.176 L78.802,13.176 A41.259,41.259 0 0,0 74.224,13.427 A4.959,4.959 0 0,0 72.029,14.116 A3.525,3.525 0 0,0 70.685,16.616 A10.132,10.132 0 0,0 70.959,19.751 C71.003,19.975 71.044,20.199 71.084,20.428 C71.33,21.83 71.572,23.227 71.819,24.629 Q72.535,28.782 73.252,32.943 L73.955,37.064 C73.987,37.239 74.018,37.409 74.045,37.583 A12.349,12.349 0 0,1 74.331,41.113 A3.377,3.377 0 0,1 73.646,42.954 A3.633,3.633 0 0,1 71.984,43.989 A3.861,3.861 0 0,1 70.246,44.235 C69.118,44.092 68.293,43.245 67.765,42.627 A12.878,12.878 0 0,1 66.443,40.737 A1.545,1.545 0 0,0 66.3,40.517 L66.193,40.571 C65.153,41.059 64.11,41.588 63.102,42.099 A61.545,61.545 0 0,1 57.001,44.925 A98.168,98.168 0 0,1 42.219,49.265 C40.947,49.53 39.599,49.749 38.219,49.915 C33.615,50.466 28.741,50.439 22.417,49.821 C20.822,49.664 19.662,49.203 18.865,48.419 C17.875,47.438 17.427,45.843 17.673,44.159 A5.236,5.236 0 0,1 18.52,41.888 C20.02,39.751 23.133,39.129 25.413,38.672 L25.794,38.596 C26.573,38.439 27.362,38.309 28.123,38.184 L28.8,38.072 C29.086,38.022 29.368,37.982 29.646,37.942 A9.496,9.496 0 0,0 32.477,37.23 A6.002,6.002 0 0,0 34.994,35.026 A2.302,2.302 0 0,0 35.339,34.202 C35.424,33.655 35.183,33.024 34.614,32.325 A7.857,7.857 0 0,0 33.884,31.545 C31.913,29.691 29.243,28.58 27.348,27.962 A19.261,19.261 0 0,0 19.46,27.124 A2.522,2.522 0 0,0 18.309,27.442 A2.858,2.858 0 0,0 17.525,28.58 C17.14,29.382 16.764,30.184 16.387,30.99 C15.25,33.467 14.031,36.025 12.611,38.417 A58.168,58.168 0 0,1 8.746,44.078 A9.088,9.088 0 0,0 7.044,50.43 A7.324,7.324 0 0,0 8.016,53.566 A9.075,9.075 0 0,0 10.793,56.253 A11.646,11.646 0 0,0 12.84,57.4 A5.527,5.527 0 0,0 13.633,57.669 A10.907,10.907 0 0,0 16.249,57.888 C16.607,57.888 16.974,57.888 17.333,57.888 C19.124,57.964 21.512,58.063 23.877,58.13 L24.598,58.13 C26.838,58.211 28.988,58.282 31.08,57.31 A21.008,21.008 0 0,0 34.358,55.259 L34.56,55.111 A27.167,27.167 0 0,1 39.46,52.159 A14.737,14.737 0 0,1 43.518,51.071 C46.112,50.753 48.697,51.25 51.196,51.729 L51.68,51.823 Q52.598,51.998 53.521,52.186 A59.543,59.543 0 0,0 59.644,53.194 A14.459,14.459 0 0,0 63.702,52.907 A37.693,37.693 0 0,0 70.022,51.039 C70.847,50.73 71.662,50.403 72.428,50.099 L72.773,49.955 C73.772,49.539 74.905,49.059 76.078,49.382 A4.323,4.323 0 0,1 77.933,50.569 A4.753,4.753 0 0,1 79.174,52.302 A3.037,3.037 0 0,1 78.82,55.035 C78.116,56.043 76.912,56.508 75.85,56.916 C75.568,57.024 75.303,57.127 75.062,57.23 C74.591,57.436 74.112,57.677 73.646,57.884 A26.768,26.768 0 0,1 70.694,59.191 Z",
    shapePath:
      "M66.681,87.863 A3.342,3.342 0 0,1 66.255,87.837 A4.694,4.694 0 0,1 63.474,86.219 A4.081,4.081 0 0,1 62.403,84.396 A4.161,4.161 0 0,1 62.784,81.776 L63.501,80.11 C64.701,77.346 65.942,74.484 66.994,71.599 L67.053,71.447 A13.245,13.245 0 0,0 67.895,68.464 A14.432,14.432 0 0,0 67.917,66.224 L67.917,66.018 C67.863,64.674 67.841,63.299 67.854,61.946 A4.148,4.148 0 0,1 68.41,59.536 A4.202,4.202 0 0,1 70.305,58.224 L70.349,58.224 A25.572,25.572 0 0,0 73.207,57.006 C73.682,56.782 74.166,56.558 74.649,56.343 C74.914,56.226 75.205,56.114 75.483,56.011 C76.45,55.639 77.449,55.254 77.969,54.506 A2.002,2.002 0 0,0 78.197,52.714 A3.758,3.758 0 0,0 77.212,51.371 A3.377,3.377 0 0,0 75.81,50.466 C74.976,50.246 74.063,50.627 73.176,50.994 L72.817,51.138 C72.047,51.451 71.223,51.778 70.39,52.092 A38.786,38.786 0 0,1 63.895,54.009 A15.489,15.489 0 0,1 59.545,54.309 A60.426,60.426 0 0,1 53.324,53.265 L51.492,52.907 L51.008,52.813 C48.589,52.365 46.081,51.868 43.653,52.163 A13.823,13.823 0 0,0 39.886,53.176 A25.572,25.572 0 0,0 35.178,56.02 L34.976,56.163 A21.33,21.33 0 0,1 31.527,58.314 C29.207,59.393 26.954,59.312 24.571,59.209 L23.854,59.209 C21.48,59.142 19.102,59.044 17.297,58.968 C16.956,58.968 16.616,58.968 16.253,58.968 A11.879,11.879 0 0,1 13.386,58.717 A6.656,6.656 0 0,1 12.446,58.399 A12.793,12.793 0 0,1 10.206,57.153 A10.302,10.302 0 0,1 7.124,54.148 A8.381,8.381 0 0,1 6,50.564 A10.159,10.159 0 0,1 7.913,43.474 A56.923,56.923 0 0,0 11.711,37.884 C13.104,35.532 14.291,32.997 15.438,30.546 Q16.002,29.328 16.58,28.128 A3.664,3.664 0 0,1 17.709,26.582 A3.485,3.485 0 0,1 19.348,26.081 A20.421,20.421 0 0,1 27.671,26.976 C29.664,27.617 32.486,28.8 34.6,30.784 A8.959,8.959 0 0,1 35.429,31.68 C36.19,32.62 36.508,33.525 36.374,34.367 A3.252,3.252 0 0,1 35.886,35.577 A6.988,6.988 0 0,1 32.934,38.17 A10.258,10.258 0 0,1 29.798,38.976 C29.525,39.017 29.252,39.057 28.974,39.106 L28.293,39.218 C27.541,39.344 26.761,39.469 26.004,39.626 L25.615,39.702 C23.375,40.15 20.634,40.697 19.38,42.488 A4.108,4.108 0 0,0 18.712,44.311 C18.515,45.655 18.847,46.923 19.608,47.671 C20.226,48.284 21.18,48.643 22.524,48.777 C28.768,49.391 33.566,49.418 38.081,48.871 C39.424,48.705 40.746,48.495 41.996,48.235 A97.084,97.084 0 0,0 56.629,43.94 A62.347,62.347 0 0,0 62.627,41.162 C63.644,40.647 64.697,40.114 65.763,39.617 A1.312,1.312 0 0,1 66.466,39.465 A1.295,1.295 0 0,1 67.362,40.213 A11.919,11.919 0 0,0 68.553,41.955 C69.207,42.73 69.785,43.124 70.345,43.2 A2.755,2.755 0 0,0 71.608,43.003 A2.558,2.558 0 0,0 72.8,42.291 A2.378,2.378 0 0,0 73.247,41.006 A11.485,11.485 0 0,0 72.974,37.772 C72.943,37.597 72.912,37.422 72.885,37.247 L72.177,33.122 Q71.501,28.965 70.793,24.804 C70.551,23.402 70.305,22.004 70.063,20.607 C70.022,20.383 69.978,20.159 69.937,19.94 A11.135,11.135 0 0,1 69.655,16.495 A4.538,4.538 0 0,1 71.447,13.265 A5.863,5.863 0 0,1 74.076,12.392 A40.582,40.582 0 0,1 78.77,12.137 L79.845,12.137 A21.608,21.608 0 0,1 84.253,12.383 C87.975,13.077 91.371,15.801 93.104,19.492 A11.579,11.579 0 0,1 94,26.847 A18.862,18.862 0 0,1 93.189,29.413 C92.867,30.26 92.495,31.102 92.141,31.917 C91.872,32.522 91.599,33.153 91.353,33.763 L75.003,74.251 C74.735,74.918 74.461,75.595 74.193,76.249 C73.212,78.663 72.195,81.176 71.272,83.644 C70.873,84.719 70.269,86.067 69.118,86.972 A4.004,4.004 0 0,1 66.681,87.863 Z M70.712,59.196 A3.288,3.288 0 0,0 69.274,60.141 A3.27,3.27 0 0,0 68.912,61.96 C68.912,63.303 68.912,64.647 68.974,65.991 L68.974,66.197 A15.082,15.082 0 0,1 68.943,68.616 A14.114,14.114 0 0,1 68.047,71.832 L67.993,71.989 C66.927,74.891 65.682,77.767 64.477,80.544 C64.235,81.1 63.998,81.655 63.756,82.206 A3.198,3.198 0 0,0 63.438,84.172 A3.104,3.104 0 0,0 64.258,85.516 A3.695,3.695 0 0,0 66.403,86.806 A2.889,2.889 0 0,0 68.495,86.161 C69.436,85.418 69.96,84.235 70.314,83.295 C71.241,80.795 72.258,78.291 73.243,75.868 L74.054,73.875 L90.403,33.386 C90.654,32.759 90.932,32.123 91.2,31.51 C91.554,30.708 91.917,29.875 92.231,29.055 L92.231,29.055 A17.989,17.989 0 0,0 92.988,26.614 A10.535,10.535 0 0,0 92.168,19.931 C90.6,16.589 87.424,14.027 84.074,13.404 A20.605,20.605 0 0,0 79.881,13.176 L78.802,13.176 A41.259,41.259 0 0,0 74.224,13.427 A4.959,4.959 0 0,0 72.029,14.116 A3.525,3.525 0 0,0 70.685,16.616 A10.132,10.132 0 0,0 70.959,19.751 C71.003,19.975 71.044,20.199 71.084,20.428 C71.33,21.83 71.572,23.227 71.819,24.629 Q72.535,28.782 73.252,32.943 L73.955,37.064 C73.987,37.239 74.018,37.409 74.045,37.583 A12.349,12.349 0 0,1 74.331,41.113 A3.377,3.377 0 0,1 73.646,42.954 A3.633,3.633 0 0,1 71.984,43.989 A3.861,3.861 0 0,1 70.246,44.235 C69.118,44.092 68.293,43.245 67.765,42.627 A12.878,12.878 0 0,1 66.443,40.737 A1.545,1.545 0 0,0 66.3,40.517 L66.193,40.571 C65.153,41.059 64.11,41.588 63.102,42.099 A61.545,61.545 0 0,1 57.001,44.925 A98.168,98.168 0 0,1 42.219,49.265 C40.947,49.53 39.599,49.749 38.219,49.915 C33.615,50.466 28.741,50.439 22.417,49.821 C20.822,49.664 19.662,49.203 18.865,48.419 C17.875,47.438 17.427,45.843 17.673,44.159 A5.236,5.236 0 0,1 18.52,41.888 C20.02,39.751 23.133,39.129 25.413,38.672 L25.794,38.596 C26.573,38.439 27.362,38.309 28.123,38.184 L28.8,38.072 C29.086,38.022 29.368,37.982 29.646,37.942 A9.496,9.496 0 0,0 32.477,37.23 A6.002,6.002 0 0,0 34.994,35.026 A2.302,2.302 0 0,0 35.339,34.202 C35.424,33.655 35.183,33.024 34.614,32.325 A7.857,7.857 0 0,0 33.884,31.545 C31.913,29.691 29.243,28.58 27.348,27.962 A19.261,19.261 0 0,0 19.46,27.124 A2.522,2.522 0 0,0 18.309,27.442 A2.858,2.858 0 0,0 17.525,28.58 C17.14,29.382 16.764,30.184 16.387,30.99 C15.25,33.467 14.031,36.025 12.611,38.417 A58.168,58.168 0 0,1 8.746,44.078 A9.088,9.088 0 0,0 7.044,50.43 A7.324,7.324 0 0,0 8.016,53.566 A9.075,9.075 0 0,0 10.793,56.253 A11.646,11.646 0 0,0 12.84,57.4 A5.527,5.527 0 0,0 13.633,57.669 A10.907,10.907 0 0,0 16.249,57.888 C16.607,57.888 16.974,57.888 17.333,57.888 C19.124,57.964 21.512,58.063 23.877,58.13 L24.598,58.13 C26.838,58.211 28.988,58.282 31.08,57.31 A21.008,21.008 0 0,0 34.358,55.259 L34.56,55.111 A27.167,27.167 0 0,1 39.46,52.159 A14.737,14.737 0 0,1 43.518,51.071 C46.112,50.753 48.697,51.25 51.196,51.729 L51.68,51.823 Q52.598,51.998 53.521,52.186 A59.543,59.543 0 0,0 59.644,53.194 A14.459,14.459 0 0,0 63.702,52.907 A37.693,37.693 0 0,0 70.022,51.039 C70.847,50.73 71.662,50.403 72.428,50.099 L72.773,49.955 C73.772,49.539 74.905,49.059 76.078,49.382 A4.323,4.323 0 0,1 77.933,50.569 A4.753,4.753 0 0,1 79.174,52.302 A3.037,3.037 0 0,1 78.82,55.035 C78.116,56.043 76.912,56.508 75.85,56.916 C75.568,57.024 75.303,57.127 75.062,57.23 C74.591,57.436 74.112,57.677 73.646,57.884 A26.768,26.768 0 0,1 70.694,59.191 Z",
    start: { x: 66.681, y: 87.863, rotation: -86 },
    facts: ["14 turns","4.307 km","Clockwise"]
  },
  {
    id: "615",
    label: "Monza",
    name: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    accent: "#ff5f57",
    path: "M52.852,59.221 C52.972,59.331 53.018,59.371 53.069,59.414 C53.115,59.452 53.162,59.492 53.212,59.537 C53.271,59.589 53.459,59.759 53.475,59.773 C53.943,60.192 54.237,60.333 54.818,60.329 C55.264,60.327 58.796,60.327 70.895,60.329 C71.682,60.329 71.682,60.329 72.471,60.33 C82.849,60.332 87.769,60.332 89.562,60.329 C92.813,60.325 94,62.501 93.226,65.688 C93.043,66.44 92.937,66.807 92.695,67.392 C92.341,68.251 91.851,69.07 91.186,69.839 C90.567,70.555 89.815,71.204 88.915,71.774 C86.837,72.564 83.239,72.994 79.738,73.091 C79.076,73.092 74.452,73.091 60.671,73.089 C46.996,73.087 42.147,73.086 41.339,73.087 C40.431,73.089 39.951,72.968 39.685,72.585 C39.468,72.271 39.465,72.109 39.541,71.16 C39.568,70.82 39.581,70.577 39.581,70.302 C39.581,69.794 39.495,69.75 39.037,69.95 C38.545,70.165 37.871,70.685 37.25,71.293 C36.092,72.383 35.144,72.88 33.846,73.089 C32.319,73.249 29.622,73.195 25.786,72.903 C21.711,72.242 19.05,70.296 17.457,67.424 C16.612,65.9 16.303,64.822 15.851,62.575 C15.561,61.131 14.938,56.672 13.977,49.151 C13.931,48.44 13.722,48.036 13.369,47.872 C12.597,47.689 12.036,47.172 11.711,46.362 C10.257,42.801 9.393,40.46 7.35,34.417 C6,30.427 7.39,28.516 11.065,27.748 C11.821,27.59 12.522,27.508 13.925,27.384 C15.295,27.264 15.84,27.206 16.478,27.098 C18.919,26.751 20.443,27.332 21.43,28.595 C21.695,28.934 22.205,29.821 22.216,29.836 C22.397,30.135 24.259,33.398 24.927,34.542 C25.01,34.684 25.091,34.823 25.171,34.959 C25.578,35.653 25.948,36.273 26.283,36.818 C26.438,37.072 26.598,37.335 26.822,37.703 C26.881,37.8 27.085,38.136 27.098,38.157 C27.208,38.338 27.293,38.478 27.375,38.614 C27.456,38.746 27.53,38.868 27.602,38.986 C29.118,41.466 30.022,42.789 30.599,43.269 C32.083,44.502 45.133,55.842 46.76,57.348 C48.068,58.559 48.551,58.731 49.345,58.607 C49.495,58.583 49.568,58.574 49.644,58.566 C51.337,58.283 52.052,58.493 52.852,59.221 Z M33.741,72.302 C34.853,72.123 35.659,71.7 36.7,70.72 C37.378,70.056 38.119,69.485 38.719,69.223 C39.663,68.81 40.375,69.171 40.375,70.302 C40.375,70.602 40.361,70.864 40.333,71.223 C40.278,71.904 40.281,72.05 40.338,72.132 C40.402,72.225 40.678,72.294 41.338,72.293 C42.146,72.292 46.993,72.293 60.524,72.295 C74.447,72.297 79.075,72.298 79.726,72.297 C83.11,72.203 86.618,71.786 88.525,71.081 C89.344,70.558 90.025,69.968 90.585,69.32 C91.654,68.084 92.073,67.067 92.454,65.5 C93.119,62.761 92.224,61.12 89.563,61.123 C87.769,61.126 82.85,61.126 72.471,61.124 C71.682,61.124 71.682,61.124 70.895,61.123 C58.815,61.121 55.266,61.121 54.823,61.123 C54.016,61.128 53.547,60.904 52.945,60.365 C52.926,60.348 52.741,60.18 52.686,60.132 C52.498,59.972 52.446,59.926 52.353,59.841 C51.696,59.243 51.224,59.106 49.761,59.352 C49.669,59.361 49.609,59.369 49.513,59.384 C48.42,59.556 47.698,59.299 46.22,57.931 C44.605,56.435 31.565,45.104 30.092,43.88 C29.414,43.317 28.504,41.985 26.924,39.4 C26.852,39.282 26.777,39.159 26.697,39.027 C26.614,38.891 26.529,38.751 26.419,38.569 C26.406,38.548 26.202,38.213 26.143,38.115 C25.92,37.748 25.76,37.486 25.606,37.233 C25.268,36.683 24.896,36.059 24.486,35.361 C24.406,35.224 24.324,35.085 24.241,34.942 C23.57,33.792 21.71,30.534 21.555,30.275 C21.469,30.138 21.013,29.351 20.804,29.084 C19.996,28.05 18.755,27.577 16.6,27.882 C15.944,27.994 15.386,28.054 14.128,28.164 C12.623,28.296 11.942,28.376 11.228,28.526 C7.984,29.204 6.919,30.667 8.102,34.163 C10.141,40.19 10.998,42.517 12.447,46.064 C12.685,46.655 13.054,46.99 13.579,47.105 C14.338,47.417 14.705,48.098 14.767,49.075 C15.722,56.546 16.345,61.002 16.63,62.419 C17.065,64.588 17.358,65.609 18.152,67.039 C19.627,69.699 22.077,71.492 25.863,72.112 C29.647,72.4 32.297,72.452 33.741,72.302 Z M21.576,30.305 C21.573,30.301 21.568,30.295 21.562,30.285 L21.576,30.305 Z",
    shapePath:
      "M52.852,59.221 C52.972,59.331 53.018,59.371 53.069,59.414 C53.115,59.452 53.162,59.492 53.212,59.537 C53.271,59.589 53.459,59.759 53.475,59.773 C53.943,60.192 54.237,60.333 54.818,60.329 C55.264,60.327 58.796,60.327 70.895,60.329 C71.682,60.329 71.682,60.329 72.471,60.33 C82.849,60.332 87.769,60.332 89.562,60.329 C92.813,60.325 94,62.501 93.226,65.688 C93.043,66.44 92.937,66.807 92.695,67.392 C92.341,68.251 91.851,69.07 91.186,69.839 C90.567,70.555 89.815,71.204 88.915,71.774 C86.837,72.564 83.239,72.994 79.738,73.091 C79.076,73.092 74.452,73.091 60.671,73.089 C46.996,73.087 42.147,73.086 41.339,73.087 C40.431,73.089 39.951,72.968 39.685,72.585 C39.468,72.271 39.465,72.109 39.541,71.16 C39.568,70.82 39.581,70.577 39.581,70.302 C39.581,69.794 39.495,69.75 39.037,69.95 C38.545,70.165 37.871,70.685 37.25,71.293 C36.092,72.383 35.144,72.88 33.846,73.089 C32.319,73.249 29.622,73.195 25.786,72.903 C21.711,72.242 19.05,70.296 17.457,67.424 C16.612,65.9 16.303,64.822 15.851,62.575 C15.561,61.131 14.938,56.672 13.977,49.151 C13.931,48.44 13.722,48.036 13.369,47.872 C12.597,47.689 12.036,47.172 11.711,46.362 C10.257,42.801 9.393,40.46 7.35,34.417 C6,30.427 7.39,28.516 11.065,27.748 C11.821,27.59 12.522,27.508 13.925,27.384 C15.295,27.264 15.84,27.206 16.478,27.098 C18.919,26.751 20.443,27.332 21.43,28.595 C21.695,28.934 22.205,29.821 22.216,29.836 C22.397,30.135 24.259,33.398 24.927,34.542 C25.01,34.684 25.091,34.823 25.171,34.959 C25.578,35.653 25.948,36.273 26.283,36.818 C26.438,37.072 26.598,37.335 26.822,37.703 C26.881,37.8 27.085,38.136 27.098,38.157 C27.208,38.338 27.293,38.478 27.375,38.614 C27.456,38.746 27.53,38.868 27.602,38.986 C29.118,41.466 30.022,42.789 30.599,43.269 C32.083,44.502 45.133,55.842 46.76,57.348 C48.068,58.559 48.551,58.731 49.345,58.607 C49.495,58.583 49.568,58.574 49.644,58.566 C51.337,58.283 52.052,58.493 52.852,59.221 Z M33.741,72.302 C34.853,72.123 35.659,71.7 36.7,70.72 C37.378,70.056 38.119,69.485 38.719,69.223 C39.663,68.81 40.375,69.171 40.375,70.302 C40.375,70.602 40.361,70.864 40.333,71.223 C40.278,71.904 40.281,72.05 40.338,72.132 C40.402,72.225 40.678,72.294 41.338,72.293 C42.146,72.292 46.993,72.293 60.524,72.295 C74.447,72.297 79.075,72.298 79.726,72.297 C83.11,72.203 86.618,71.786 88.525,71.081 C89.344,70.558 90.025,69.968 90.585,69.32 C91.654,68.084 92.073,67.067 92.454,65.5 C93.119,62.761 92.224,61.12 89.563,61.123 C87.769,61.126 82.85,61.126 72.471,61.124 C71.682,61.124 71.682,61.124 70.895,61.123 C58.815,61.121 55.266,61.121 54.823,61.123 C54.016,61.128 53.547,60.904 52.945,60.365 C52.926,60.348 52.741,60.18 52.686,60.132 C52.498,59.972 52.446,59.926 52.353,59.841 C51.696,59.243 51.224,59.106 49.761,59.352 C49.669,59.361 49.609,59.369 49.513,59.384 C48.42,59.556 47.698,59.299 46.22,57.931 C44.605,56.435 31.565,45.104 30.092,43.88 C29.414,43.317 28.504,41.985 26.924,39.4 C26.852,39.282 26.777,39.159 26.697,39.027 C26.614,38.891 26.529,38.751 26.419,38.569 C26.406,38.548 26.202,38.213 26.143,38.115 C25.92,37.748 25.76,37.486 25.606,37.233 C25.268,36.683 24.896,36.059 24.486,35.361 C24.406,35.224 24.324,35.085 24.241,34.942 C23.57,33.792 21.71,30.534 21.555,30.275 C21.469,30.138 21.013,29.351 20.804,29.084 C19.996,28.05 18.755,27.577 16.6,27.882 C15.944,27.994 15.386,28.054 14.128,28.164 C12.623,28.296 11.942,28.376 11.228,28.526 C7.984,29.204 6.919,30.667 8.102,34.163 C10.141,40.19 10.998,42.517 12.447,46.064 C12.685,46.655 13.054,46.99 13.579,47.105 C14.338,47.417 14.705,48.098 14.767,49.075 C15.722,56.546 16.345,61.002 16.63,62.419 C17.065,64.588 17.358,65.609 18.152,67.039 C19.627,69.699 22.077,71.492 25.863,72.112 C29.647,72.4 32.297,72.452 33.741,72.302 Z M21.576,30.305 C21.573,30.301 21.568,30.295 21.562,30.285 L21.576,30.305 Z",
    start: { x: 52.852, y: 59.221, rotation: 132 },
    facts: ["11 turns","5.793 km","Clockwise"]
  },
  {
    id: "605",
    label: "Madring",
    name: "Madring",
    location: "Madrid, Spain",
    accent: "#9fdf6b",
    path: "M13.62,74.948 L9.229,48.392 L9.141,48.135 L8.972,48.007 L8.742,47.939 L8.376,47.918 L7.855,47.912 L7.482,47.891 L7.212,47.837 L6.961,47.742 L6.711,47.519 L6.535,47.255 L6.42,46.883 L6.359,46.47 L6.244,45.712 L6.074,44.581 L6,43.796 L6.041,43.112 L6.142,42.442 L6.325,41.914 L6.535,41.413 L6.765,40.973 L7.009,40.581 L7.334,40.114 L7.679,39.707 L8.038,39.376 L8.478,39.037 L8.918,38.699 L9.567,38.259 L23.83,29.411 L24.428,29.054 L25.031,28.729 L25.806,28.317 L26.429,27.991 L27.175,27.647 L27.855,27.369 L28.535,27.082 L29.224,26.833 L30.009,26.536 L30.89,26.249 L31.789,25.981 L32.574,25.771 L33.35,25.617 L34.144,25.502 L35.054,25.397 L36.05,25.34 L37.093,25.34 L37.944,25.336 L38.77,25.363 L39.42,25.485 L40.076,25.634 L40.807,25.817 L41.721,26.081 L42.405,26.304 L43.238,26.602 L43.935,26.907 L44.558,27.252 L45.079,27.604 L45.424,27.841 L45.6,27.99 L45.986,27.577 L46.23,27.347 L46.494,27.205 L46.758,27.13 L46.994,27.123 L47.286,27.184 L47.57,27.293 L47.874,27.536 L48.125,27.726 L48.362,27.766 L48.585,27.794 L48.815,27.78 L49.222,27.692 L49.662,27.557 L50.67,27.266 L51.516,26.995 L52.112,26.812 L52.491,26.67 L52.823,26.521 L53.161,26.325 L53.506,26.101 L53.892,25.81 L54.292,25.512 L54.691,25.282 L55.172,25.093 L55.72,24.883 L56.234,24.714 L56.702,24.578 L57.311,24.402 L57.758,24.314 L58.211,24.219 L58.759,24.125 L59.186,24.064 L59.666,23.949 L60.1,23.82 L60.458,23.671 L60.824,23.461 L61.156,23.231 L61.426,23.069 L61.69,22.933 L61.941,22.845 L62.185,22.805 L62.388,22.798 L62.679,22.852 L62.828,22.967 L62.997,23.143 L63.22,23.407 L63.417,23.712 L63.64,23.996 L63.931,24.328 L64.148,24.51 L64.459,24.632 L64.703,24.659 L64.987,24.686 L65.197,24.686 L65.434,24.666 L65.711,24.619 L65.948,24.524 L66.212,24.395 L66.544,24.206 L66.93,23.969 L67.377,23.705 L67.803,23.482 L68.196,23.285 L68.507,23.15 L68.812,23.042 L69.164,22.926 L69.455,22.893 L69.976,22.838 L70.565,22.832 L71.1,22.818 L75.804,22.764 L76.15,22.771 L76.447,22.838 L76.705,22.926 L76.887,23.028 L77.165,23.184 L77.402,23.366 L77.72,23.651 L78.011,23.908 L78.614,24.626 L78.823,24.93 L79.047,25.242 L79.297,25.594 L79.548,25.864 L79.825,26.149 L80.062,26.352 L80.407,26.595 L80.692,26.744 L81.057,26.9 L81.443,26.914 L81.876,26.914 L82.228,26.886 L82.56,26.873 L82.912,26.805 L83.244,26.65 L83.657,26.467 L84.361,26.155 L85.017,25.864 L85.484,25.668 L85.931,25.485 L86.425,25.282 L87.129,25.045 L87.732,24.917 L88.253,24.835 L88.767,24.754 L89.167,24.747 L89.783,24.842 L90.331,24.93 L90.785,25.099 L91.211,25.323 L91.563,25.56 L91.8,25.729 L92.084,25.959 L92.301,26.176 L92.565,26.44 L92.822,26.744 L93.14,27.218 L93.391,27.597 L93.587,27.949 L93.783,28.362 L93.885,28.762 L93.939,29.134 L93.993,29.56 L94,30.285 L93.966,31.273 L93.824,31.794 L93.709,32.119 L93.56,32.458 L93.37,32.81 L93.093,33.344 L92.795,33.757 L92.47,34.069 L92.078,34.441 L91.705,34.773 L91.258,35.084 L90.812,35.375 L90.162,35.693 L89.39,35.991 L88.754,36.174 L88.111,36.228 L87.529,36.235 L86.892,36.181 L86.283,36.086 L85.599,35.89 L84.787,35.544 L83.988,35.172 L83.135,34.759 L82.296,34.265 L81.619,33.825 L80.983,33.371 L80.455,32.972 L79.69,32.37 L78.749,31.625 L77.869,30.901 L77.05,30.251 L76.305,29.682 L75.5,29.086 L74.755,28.491 L74.038,27.983 L73.394,27.557 L72.778,27.178 L72.183,26.805 L71.695,26.555 L71.398,26.453 L71.181,26.406 C71.181,26.406 71.059,26.419 71.025,26.426 C70.991,26.433 70.856,26.507 70.856,26.507 L70.619,26.71 L70.206,27.178 L69.55,27.99 L68.92,28.843 L68.087,30.007 L67.485,30.86 L67.174,31.307 L66.828,31.645 L66.598,31.889 L66.334,32.133 L66.07,32.329 L65.826,32.525 L65.556,32.735 L65.326,32.904 L64.899,33.107 L64.466,33.236 L64.033,33.358 L63.613,33.439 L62.266,33.446 L59.084,33.378 L58.245,33.371 L57.751,33.446 L57.202,33.568 L56.674,33.798 L56.35,33.994 L55.964,34.258 L55.605,34.495 L55.266,34.752 L54.928,35.01 L54.657,35.274 L54.38,35.558 L54.231,35.774 L54.014,36.072 L53.838,36.377 L53.703,36.594 L53.574,36.851 L53.412,37.182 L53.256,37.636 L53.168,38.042 L53.114,38.482 L53.073,38.807 L53.094,43.518 L53.127,43.938 L53.182,44.27 L53.242,44.534 L53.344,44.798 L53.54,45.251 L53.919,46.043 L54.116,46.402 L54.319,46.768 L54.386,46.923 L54.42,47.072 L54.427,47.167 L54.427,47.35 L54.353,47.492 L54.224,47.634 L53.974,47.858 L53.066,48.555 L51.753,49.442 L50.203,50.396 L48.254,51.52 L47.299,52.054 L46.473,52.474 L45.871,52.779 L45.512,53.09 L45.228,53.456 L45.072,53.733 L45.004,53.997 L44.896,54.417 L44.882,54.728 L44.876,55.317 L44.876,55.811 L44.964,56.597 L45.072,57.28 L45.153,57.659 L45.201,58.113 L45.241,58.573 L45.262,59.02 L45.255,59.528 L45.241,60.144 L45.106,60.733 L44.97,61.281 L44.815,61.762 L44.645,62.154 L44.361,62.574 L44.172,62.872 L43.908,63.19 L43.583,63.522 L43.224,63.819 L42.825,64.09 L42.357,64.327 L41.782,64.51 L41.193,64.645 L40.361,64.774 L39.745,64.862 L39.02,64.957 L38.194,65.072 L37.369,65.234 L36.333,65.417 L35.446,65.559 L34.052,65.782 L33.016,65.972 L31.75,66.222 L30.247,66.48 L29.442,66.581 L28.724,66.669 L28.332,66.723 L28.149,66.818 L28.054,66.92 L28.007,67.008 L27.959,67.123 L27.993,67.292 L28.047,67.394 L28.135,67.515 L28.223,67.617 L28.318,67.752 L28.548,68.125 L28.69,68.382 L28.833,68.626 L28.907,68.781 L28.981,69.126 L29.022,69.573 L29.306,71.516 L29.421,72.22 L29.421,72.707 L29.435,73.168 L29.415,73.662 L29.394,73.885 L29.327,74.075 L29.232,74.163 L29.07,74.312 L28.866,74.44 L28.643,74.528 L27.059,75.036 L26.138,75.314 L25.428,75.503 L24.426,75.733 L23.025,75.984 L21.298,76.288 L19.965,76.546 L18.482,76.782 L16.919,77.074 L16.33,77.216 L15.91,77.236 L15.504,77.216 L15.193,77.182 L14.807,77.033 L14.502,76.816 L14.265,76.573 L14.028,76.248 L13.832,75.869 L13.683,75.395 Z",
    shapePath:
      "M13.62,74.948 L9.229,48.392 L9.141,48.135 L8.972,48.007 L8.742,47.939 L8.376,47.918 L7.855,47.912 L7.482,47.891 L7.212,47.837 L6.961,47.742 L6.711,47.519 L6.535,47.255 L6.42,46.883 L6.359,46.47 L6.244,45.712 L6.074,44.581 L6,43.796 L6.041,43.112 L6.142,42.442 L6.325,41.914 L6.535,41.413 L6.765,40.973 L7.009,40.581 L7.334,40.114 L7.679,39.707 L8.038,39.376 L8.478,39.037 L8.918,38.699 L9.567,38.259 L23.83,29.411 L24.428,29.054 L25.031,28.729 L25.806,28.317 L26.429,27.991 L27.175,27.647 L27.855,27.369 L28.535,27.082 L29.224,26.833 L30.009,26.536 L30.89,26.249 L31.789,25.981 L32.574,25.771 L33.35,25.617 L34.144,25.502 L35.054,25.397 L36.05,25.34 L37.093,25.34 L37.944,25.336 L38.77,25.363 L39.42,25.485 L40.076,25.634 L40.807,25.817 L41.721,26.081 L42.405,26.304 L43.238,26.602 L43.935,26.907 L44.558,27.252 L45.079,27.604 L45.424,27.841 L45.6,27.99 L45.986,27.577 L46.23,27.347 L46.494,27.205 L46.758,27.13 L46.994,27.123 L47.286,27.184 L47.57,27.293 L47.874,27.536 L48.125,27.726 L48.362,27.766 L48.585,27.794 L48.815,27.78 L49.222,27.692 L49.662,27.557 L50.67,27.266 L51.516,26.995 L52.112,26.812 L52.491,26.67 L52.823,26.521 L53.161,26.325 L53.506,26.101 L53.892,25.81 L54.292,25.512 L54.691,25.282 L55.172,25.093 L55.72,24.883 L56.234,24.714 L56.702,24.578 L57.311,24.402 L57.758,24.314 L58.211,24.219 L58.759,24.125 L59.186,24.064 L59.666,23.949 L60.1,23.82 L60.458,23.671 L60.824,23.461 L61.156,23.231 L61.426,23.069 L61.69,22.933 L61.941,22.845 L62.185,22.805 L62.388,22.798 L62.679,22.852 L62.828,22.967 L62.997,23.143 L63.22,23.407 L63.417,23.712 L63.64,23.996 L63.931,24.328 L64.148,24.51 L64.459,24.632 L64.703,24.659 L64.987,24.686 L65.197,24.686 L65.434,24.666 L65.711,24.619 L65.948,24.524 L66.212,24.395 L66.544,24.206 L66.93,23.969 L67.377,23.705 L67.803,23.482 L68.196,23.285 L68.507,23.15 L68.812,23.042 L69.164,22.926 L69.455,22.893 L69.976,22.838 L70.565,22.832 L71.1,22.818 L75.804,22.764 L76.15,22.771 L76.447,22.838 L76.705,22.926 L76.887,23.028 L77.165,23.184 L77.402,23.366 L77.72,23.651 L78.011,23.908 L78.614,24.626 L78.823,24.93 L79.047,25.242 L79.297,25.594 L79.548,25.864 L79.825,26.149 L80.062,26.352 L80.407,26.595 L80.692,26.744 L81.057,26.9 L81.443,26.914 L81.876,26.914 L82.228,26.886 L82.56,26.873 L82.912,26.805 L83.244,26.65 L83.657,26.467 L84.361,26.155 L85.017,25.864 L85.484,25.668 L85.931,25.485 L86.425,25.282 L87.129,25.045 L87.732,24.917 L88.253,24.835 L88.767,24.754 L89.167,24.747 L89.783,24.842 L90.331,24.93 L90.785,25.099 L91.211,25.323 L91.563,25.56 L91.8,25.729 L92.084,25.959 L92.301,26.176 L92.565,26.44 L92.822,26.744 L93.14,27.218 L93.391,27.597 L93.587,27.949 L93.783,28.362 L93.885,28.762 L93.939,29.134 L93.993,29.56 L94,30.285 L93.966,31.273 L93.824,31.794 L93.709,32.119 L93.56,32.458 L93.37,32.81 L93.093,33.344 L92.795,33.757 L92.47,34.069 L92.078,34.441 L91.705,34.773 L91.258,35.084 L90.812,35.375 L90.162,35.693 L89.39,35.991 L88.754,36.174 L88.111,36.228 L87.529,36.235 L86.892,36.181 L86.283,36.086 L85.599,35.89 L84.787,35.544 L83.988,35.172 L83.135,34.759 L82.296,34.265 L81.619,33.825 L80.983,33.371 L80.455,32.972 L79.69,32.37 L78.749,31.625 L77.869,30.901 L77.05,30.251 L76.305,29.682 L75.5,29.086 L74.755,28.491 L74.038,27.983 L73.394,27.557 L72.778,27.178 L72.183,26.805 L71.695,26.555 L71.398,26.453 L71.181,26.406 C71.181,26.406 71.059,26.419 71.025,26.426 C70.991,26.433 70.856,26.507 70.856,26.507 L70.619,26.71 L70.206,27.178 L69.55,27.99 L68.92,28.843 L68.087,30.007 L67.485,30.86 L67.174,31.307 L66.828,31.645 L66.598,31.889 L66.334,32.133 L66.07,32.329 L65.826,32.525 L65.556,32.735 L65.326,32.904 L64.899,33.107 L64.466,33.236 L64.033,33.358 L63.613,33.439 L62.266,33.446 L59.084,33.378 L58.245,33.371 L57.751,33.446 L57.202,33.568 L56.674,33.798 L56.35,33.994 L55.964,34.258 L55.605,34.495 L55.266,34.752 L54.928,35.01 L54.657,35.274 L54.38,35.558 L54.231,35.774 L54.014,36.072 L53.838,36.377 L53.703,36.594 L53.574,36.851 L53.412,37.182 L53.256,37.636 L53.168,38.042 L53.114,38.482 L53.073,38.807 L53.094,43.518 L53.127,43.938 L53.182,44.27 L53.242,44.534 L53.344,44.798 L53.54,45.251 L53.919,46.043 L54.116,46.402 L54.319,46.768 L54.386,46.923 L54.42,47.072 L54.427,47.167 L54.427,47.35 L54.353,47.492 L54.224,47.634 L53.974,47.858 L53.066,48.555 L51.753,49.442 L50.203,50.396 L48.254,51.52 L47.299,52.054 L46.473,52.474 L45.871,52.779 L45.512,53.09 L45.228,53.456 L45.072,53.733 L45.004,53.997 L44.896,54.417 L44.882,54.728 L44.876,55.317 L44.876,55.811 L44.964,56.597 L45.072,57.28 L45.153,57.659 L45.201,58.113 L45.241,58.573 L45.262,59.02 L45.255,59.528 L45.241,60.144 L45.106,60.733 L44.97,61.281 L44.815,61.762 L44.645,62.154 L44.361,62.574 L44.172,62.872 L43.908,63.19 L43.583,63.522 L43.224,63.819 L42.825,64.09 L42.357,64.327 L41.782,64.51 L41.193,64.645 L40.361,64.774 L39.745,64.862 L39.02,64.957 L38.194,65.072 L37.369,65.234 L36.333,65.417 L35.446,65.559 L34.052,65.782 L33.016,65.972 L31.75,66.222 L30.247,66.48 L29.442,66.581 L28.724,66.669 L28.332,66.723 L28.149,66.818 L28.054,66.92 L28.007,67.008 L27.959,67.123 L27.993,67.292 L28.047,67.394 L28.135,67.515 L28.223,67.617 L28.318,67.752 L28.548,68.125 L28.69,68.382 L28.833,68.626 L28.907,68.781 L28.981,69.126 L29.022,69.573 L29.306,71.516 L29.421,72.22 L29.421,72.707 L29.435,73.168 L29.415,73.662 L29.394,73.885 L29.327,74.075 L29.232,74.163 L29.07,74.312 L28.866,74.44 L28.643,74.528 L27.059,75.036 L26.138,75.314 L25.428,75.503 L24.426,75.733 L23.025,75.984 L21.298,76.288 L19.965,76.546 L18.482,76.782 L16.919,77.074 L16.33,77.216 L15.91,77.236 L15.504,77.216 L15.193,77.182 L14.807,77.033 L14.502,76.816 L14.265,76.573 L14.028,76.248 L13.832,75.869 L13.683,75.395 Z",
    shapeStrokeWidth: 4.2,
    start: { x: 13.62, y: 74.948, rotation: -9 },
    facts: ["22 turns","5.474 km","Clockwise"],
    sourceCredit: "Madring map: GabrielStella / Wikimedia Commons, CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Madring_(2026).svg"
  },
  {
    id: "607",
    label: "Baku City Circuit",
    name: "Baku City Circuit",
    location: "Baku, Azerbaijan",
    accent: "#ff7b9c",
    path: "M59.344,34.018 C59.341,34.019 59.339,34.019 59.339,34.019 C59.341,34.019 59.342,34.018 59.344,34.018 Z M59.73,33.956 C60.075,33.888 63.117,33.467 69.443,32.606 C79.558,31.228 78.953,31.311 79.262,31.259 C79.935,31.146 88.19,30.567 90.725,30.425 C92.043,30.352 92.529,30.787 92.656,31.728 C92.679,31.902 92.683,31.938 92.689,31.977 C92.861,33.102 93.882,42.18 93.93,43.386 C94,44.373 93.656,44.712 92.632,44.896 C92.533,44.914 92.138,44.98 92.051,44.995 C91.842,45.021 75.468,46.858 68.822,47.608 C68.664,47.625 68.664,47.625 68.506,47.643 C54.607,49.211 46.23,50.172 45.655,50.277 C45.121,50.374 43.134,51.117 39.808,52.437 C39.693,52.483 39.693,52.483 39.577,52.528 C38.838,52.822 36.28,53.844 35.804,54.033 C34.568,54.524 33.942,54.763 33.74,54.818 C33.585,54.859 33.099,55.528 32.471,56.611 C32.386,56.758 32.297,56.914 32.201,57.084 C32.111,57.244 31.487,58.366 31.329,58.64 C31.013,59.19 30.825,59.477 30.667,59.61 C30.161,60.037 23.55,63.277 22.37,63.704 C21.953,63.855 21.218,64.565 20.234,65.734 C20.072,65.927 19.903,66.132 19.722,66.355 C19.421,66.726 18.355,68.073 18.144,68.332 C17.098,69.613 16.337,69.648 15.404,68.924 C15.407,68.926 15.294,68.838 15.264,68.815 C15.009,68.62 13.827,67.474 11.038,64.738 C7.769,61.532 7.127,60.906 6.878,60.693 C6.097,60.024 6,59.683 6.403,58.831 C6.693,58.217 6.894,57.619 7.216,56.463 C7.227,56.424 7.238,56.384 7.251,56.34 C7.249,56.346 7.358,55.973 7.389,55.861 C7.442,55.671 7.486,55.498 7.529,55.31 C7.629,54.868 7.715,54.363 7.791,53.723 C7.796,52.529 8.151,50.91 8.668,50.031 C8.813,49.62 9.367,48.79 10.384,47.385 C10.422,47.332 10.462,47.278 10.502,47.223 C10.453,47.29 11.803,45.447 12.027,45.126 C12.811,44.007 13.648,43.535 15.392,43.047 C15.953,42.89 17.194,42.647 19.007,42.328 C19.216,42.291 19.431,42.253 19.654,42.215 C20.843,42.008 23.862,41.504 23.964,41.487 C24.919,41.425 25.64,41.414 27.384,41.414 C28.751,41.414 29.001,41.868 29.001,43.527 C29.001,44.044 29.223,44.446 29.38,44.446 C29.722,44.446 29.837,44.448 29.997,44.46 C30.153,44.472 30.306,44.494 30.495,44.531 C30.891,44.687 31.072,44.904 31.201,45.219 C31.239,45.318 31.247,45.339 31.26,45.374 C31.333,45.571 31.311,45.553 31.497,45.526 C32.333,45.522 32.596,45.909 32.566,46.56 C32.559,46.692 32.558,46.723 32.558,46.757 L32.558,52.626 C32.606,52.719 32.653,52.792 32.697,52.849 C32.845,53.038 32.849,53.038 33.513,52.76 C33.795,52.646 38.347,50.886 39.854,50.301 C43.477,48.895 45.676,48.03 46.038,47.861 C46.365,47.768 46.365,47.768 46.291,46.847 C46.194,45.352 46.453,45.064 48.184,44.462 C50.262,43.823 51.369,43.564 53.169,43.282 C54.474,43.052 56.351,42.901 58.2,42.827 C58.948,42.797 59.065,42.601 58.964,42.076 C58.826,41.356 58.241,36.515 58.205,35.518 C58.168,34.484 58.486,34.146 59.339,34.019 C59.608,33.979 59.67,33.968 59.73,33.956 Z M92.497,44.149 C93.175,44.027 93.213,43.99 93.173,43.427 C93.126,42.243 92.107,33.191 91.939,32.092 C91.932,32.044 91.927,32.004 91.917,31.925 C91.829,31.269 91.676,31.132 90.768,31.183 C88.279,31.322 80.018,31.902 79.387,32.007 C79.065,32.061 79.785,31.963 69.616,33.348 C63.322,34.205 60.197,34.637 59.877,34.7 C59.602,34.747 59.409,34.775 59.455,34.769 C58.961,34.841 58.941,34.863 58.963,35.49 C58.997,36.447 59.578,41.249 59.709,41.933 C59.89,42.873 59.497,43.535 58.23,43.585 C56.414,43.658 54.564,43.807 53.293,44.03 C51.523,44.308 50.451,44.558 48.42,45.183 C46.992,45.68 46.976,45.697 47.042,46.727 C47.109,47.555 47.111,47.615 47.057,47.854 C46.974,48.219 46.732,48.447 46.329,48.563 C45.87,48.769 43.717,49.616 40.199,50.981 C38.616,51.595 34.072,53.353 33.904,53.42 C33.825,53.451 33.514,53.585 33.429,53.618 C33.274,53.679 33.144,53.716 33.014,53.732 C32.658,53.774 32.352,53.638 32.1,53.317 C32.008,53.199 31.921,53.055 31.837,52.882 L31.799,46.757 C31.799,46.705 31.801,46.666 31.805,46.577 C31.82,46.269 31.833,46.28 31.577,46.281 C31.002,46.355 30.73,46.128 30.548,45.638 C30.496,45.498 30.511,45.537 30.498,45.506 C30.445,45.376 30.398,45.312 30.307,45.267 C30.166,45.241 30.052,45.225 29.938,45.216 C29.806,45.206 29.701,45.204 29.38,45.204 C28.684,45.204 28.243,44.408 28.243,43.527 C28.243,42.231 28.211,42.173 27.384,42.173 C25.669,42.173 24.956,42.183 24.073,42.238 C23.779,42.287 20.927,42.764 19.784,42.962 C19.562,43.001 19.347,43.038 19.139,43.075 C17.354,43.389 16.123,43.63 15.597,43.777 C14.005,44.222 13.312,44.614 12.648,45.561 C12.419,45.889 11.062,47.743 11.115,47.669 C11.076,47.724 11.037,47.777 10.999,47.83 C10.029,49.169 9.455,50.034 9.38,50.295 C8.888,51.128 8.55,52.66 8.55,53.746 C8.467,54.467 8.376,55.004 8.269,55.478 C8.223,55.679 8.176,55.864 8.12,56.065 C8.087,56.182 7.977,56.558 7.98,56.55 C7.968,56.591 7.957,56.63 7.947,56.667 C7.614,57.861 7.401,58.493 7.089,59.155 C6.842,59.677 6.836,59.658 7.372,60.117 C7.642,60.348 8.227,60.919 11.554,64.182 C14.25,66.826 15.511,68.049 15.725,68.213 C15.758,68.239 15.874,68.329 15.869,68.325 C16.493,68.809 16.786,68.795 17.556,67.852 C17.763,67.599 18.828,66.253 19.133,65.877 C19.317,65.651 19.489,65.442 19.654,65.246 C20.736,63.96 21.516,63.207 22.111,62.991 C23.214,62.592 29.757,59.385 30.178,59.031 C30.236,58.981 30.414,58.71 30.672,58.261 C30.826,57.993 31.448,56.875 31.54,56.711 C31.638,56.538 31.728,56.38 31.815,56.231 C32.603,54.872 33.085,54.208 33.544,54.085 C33.701,54.043 34.346,53.796 35.524,53.328 C36,53.139 38.557,52.117 39.297,51.823 C39.413,51.778 39.413,51.778 39.528,51.732 C42.957,50.372 44.908,49.642 45.519,49.531 C46.122,49.421 54.385,48.472 68.421,46.889 C68.579,46.872 68.579,46.872 68.737,46.854 C75.329,46.11 91.453,44.301 91.931,44.246 C92.039,44.227 92.408,44.165 92.497,44.149 Z",
    shapePath:
      "M59.344,34.018 C59.341,34.019 59.339,34.019 59.339,34.019 C59.341,34.019 59.342,34.018 59.344,34.018 Z M59.73,33.956 C60.075,33.888 63.117,33.467 69.443,32.606 C79.558,31.228 78.953,31.311 79.262,31.259 C79.935,31.146 88.19,30.567 90.725,30.425 C92.043,30.352 92.529,30.787 92.656,31.728 C92.679,31.902 92.683,31.938 92.689,31.977 C92.861,33.102 93.882,42.18 93.93,43.386 C94,44.373 93.656,44.712 92.632,44.896 C92.533,44.914 92.138,44.98 92.051,44.995 C91.842,45.021 75.468,46.858 68.822,47.608 C68.664,47.625 68.664,47.625 68.506,47.643 C54.607,49.211 46.23,50.172 45.655,50.277 C45.121,50.374 43.134,51.117 39.808,52.437 C39.693,52.483 39.693,52.483 39.577,52.528 C38.838,52.822 36.28,53.844 35.804,54.033 C34.568,54.524 33.942,54.763 33.74,54.818 C33.585,54.859 33.099,55.528 32.471,56.611 C32.386,56.758 32.297,56.914 32.201,57.084 C32.111,57.244 31.487,58.366 31.329,58.64 C31.013,59.19 30.825,59.477 30.667,59.61 C30.161,60.037 23.55,63.277 22.37,63.704 C21.953,63.855 21.218,64.565 20.234,65.734 C20.072,65.927 19.903,66.132 19.722,66.355 C19.421,66.726 18.355,68.073 18.144,68.332 C17.098,69.613 16.337,69.648 15.404,68.924 C15.407,68.926 15.294,68.838 15.264,68.815 C15.009,68.62 13.827,67.474 11.038,64.738 C7.769,61.532 7.127,60.906 6.878,60.693 C6.097,60.024 6,59.683 6.403,58.831 C6.693,58.217 6.894,57.619 7.216,56.463 C7.227,56.424 7.238,56.384 7.251,56.34 C7.249,56.346 7.358,55.973 7.389,55.861 C7.442,55.671 7.486,55.498 7.529,55.31 C7.629,54.868 7.715,54.363 7.791,53.723 C7.796,52.529 8.151,50.91 8.668,50.031 C8.813,49.62 9.367,48.79 10.384,47.385 C10.422,47.332 10.462,47.278 10.502,47.223 C10.453,47.29 11.803,45.447 12.027,45.126 C12.811,44.007 13.648,43.535 15.392,43.047 C15.953,42.89 17.194,42.647 19.007,42.328 C19.216,42.291 19.431,42.253 19.654,42.215 C20.843,42.008 23.862,41.504 23.964,41.487 C24.919,41.425 25.64,41.414 27.384,41.414 C28.751,41.414 29.001,41.868 29.001,43.527 C29.001,44.044 29.223,44.446 29.38,44.446 C29.722,44.446 29.837,44.448 29.997,44.46 C30.153,44.472 30.306,44.494 30.495,44.531 C30.891,44.687 31.072,44.904 31.201,45.219 C31.239,45.318 31.247,45.339 31.26,45.374 C31.333,45.571 31.311,45.553 31.497,45.526 C32.333,45.522 32.596,45.909 32.566,46.56 C32.559,46.692 32.558,46.723 32.558,46.757 L32.558,52.626 C32.606,52.719 32.653,52.792 32.697,52.849 C32.845,53.038 32.849,53.038 33.513,52.76 C33.795,52.646 38.347,50.886 39.854,50.301 C43.477,48.895 45.676,48.03 46.038,47.861 C46.365,47.768 46.365,47.768 46.291,46.847 C46.194,45.352 46.453,45.064 48.184,44.462 C50.262,43.823 51.369,43.564 53.169,43.282 C54.474,43.052 56.351,42.901 58.2,42.827 C58.948,42.797 59.065,42.601 58.964,42.076 C58.826,41.356 58.241,36.515 58.205,35.518 C58.168,34.484 58.486,34.146 59.339,34.019 C59.608,33.979 59.67,33.968 59.73,33.956 Z M92.497,44.149 C93.175,44.027 93.213,43.99 93.173,43.427 C93.126,42.243 92.107,33.191 91.939,32.092 C91.932,32.044 91.927,32.004 91.917,31.925 C91.829,31.269 91.676,31.132 90.768,31.183 C88.279,31.322 80.018,31.902 79.387,32.007 C79.065,32.061 79.785,31.963 69.616,33.348 C63.322,34.205 60.197,34.637 59.877,34.7 C59.602,34.747 59.409,34.775 59.455,34.769 C58.961,34.841 58.941,34.863 58.963,35.49 C58.997,36.447 59.578,41.249 59.709,41.933 C59.89,42.873 59.497,43.535 58.23,43.585 C56.414,43.658 54.564,43.807 53.293,44.03 C51.523,44.308 50.451,44.558 48.42,45.183 C46.992,45.68 46.976,45.697 47.042,46.727 C47.109,47.555 47.111,47.615 47.057,47.854 C46.974,48.219 46.732,48.447 46.329,48.563 C45.87,48.769 43.717,49.616 40.199,50.981 C38.616,51.595 34.072,53.353 33.904,53.42 C33.825,53.451 33.514,53.585 33.429,53.618 C33.274,53.679 33.144,53.716 33.014,53.732 C32.658,53.774 32.352,53.638 32.1,53.317 C32.008,53.199 31.921,53.055 31.837,52.882 L31.799,46.757 C31.799,46.705 31.801,46.666 31.805,46.577 C31.82,46.269 31.833,46.28 31.577,46.281 C31.002,46.355 30.73,46.128 30.548,45.638 C30.496,45.498 30.511,45.537 30.498,45.506 C30.445,45.376 30.398,45.312 30.307,45.267 C30.166,45.241 30.052,45.225 29.938,45.216 C29.806,45.206 29.701,45.204 29.38,45.204 C28.684,45.204 28.243,44.408 28.243,43.527 C28.243,42.231 28.211,42.173 27.384,42.173 C25.669,42.173 24.956,42.183 24.073,42.238 C23.779,42.287 20.927,42.764 19.784,42.962 C19.562,43.001 19.347,43.038 19.139,43.075 C17.354,43.389 16.123,43.63 15.597,43.777 C14.005,44.222 13.312,44.614 12.648,45.561 C12.419,45.889 11.062,47.743 11.115,47.669 C11.076,47.724 11.037,47.777 10.999,47.83 C10.029,49.169 9.455,50.034 9.38,50.295 C8.888,51.128 8.55,52.66 8.55,53.746 C8.467,54.467 8.376,55.004 8.269,55.478 C8.223,55.679 8.176,55.864 8.12,56.065 C8.087,56.182 7.977,56.558 7.98,56.55 C7.968,56.591 7.957,56.63 7.947,56.667 C7.614,57.861 7.401,58.493 7.089,59.155 C6.842,59.677 6.836,59.658 7.372,60.117 C7.642,60.348 8.227,60.919 11.554,64.182 C14.25,66.826 15.511,68.049 15.725,68.213 C15.758,68.239 15.874,68.329 15.869,68.325 C16.493,68.809 16.786,68.795 17.556,67.852 C17.763,67.599 18.828,66.253 19.133,65.877 C19.317,65.651 19.489,65.442 19.654,65.246 C20.736,63.96 21.516,63.207 22.111,62.991 C23.214,62.592 29.757,59.385 30.178,59.031 C30.236,58.981 30.414,58.71 30.672,58.261 C30.826,57.993 31.448,56.875 31.54,56.711 C31.638,56.538 31.728,56.38 31.815,56.231 C32.603,54.872 33.085,54.208 33.544,54.085 C33.701,54.043 34.346,53.796 35.524,53.328 C36,53.139 38.557,52.117 39.297,51.823 C39.413,51.778 39.413,51.778 39.528,51.732 C42.957,50.372 44.908,49.642 45.519,49.531 C46.122,49.421 54.385,48.472 68.421,46.889 C68.579,46.872 68.579,46.872 68.737,46.854 C75.329,46.11 91.453,44.301 91.931,44.246 C92.039,44.227 92.408,44.165 92.497,44.149 Z",
    start: { x: 59.344, y: 34.018, rotation: 262 },
    facts: ["20 turns","6.003 km","Counterclockwise"]
  },
  {
    id: "740",
    label: "Marina Bay Street",
    name: "Marina Bay Street Circuit",
    location: "Singapore, Singapore",
    accent: "#7cc7ff",
    path: "M11.314,63.573 C12.49,63.712 13.101,64.024 13.373,64.655 C13.576,65.127 13.573,65.379 13.451,66.88 C13.431,67.127 13.416,67.324 13.404,67.526 C13.121,69.031 13.404,69.733 14.441,70.592 C14.622,70.741 14.833,70.904 15.076,71.085 C15.199,71.175 15.329,71.269 15.469,71.37 C15.63,71.484 16.84,72.327 17.058,72.492 C17.395,72.749 18.556,73.592 18.769,73.752 C19.395,74.225 19.808,74.586 20.105,74.95 C20.371,75.274 20.473,75.462 21.051,76.608 C21.468,77.434 21.727,77.866 21.987,78.116 C22.313,78.342 22.458,78.31 22.652,78.014 C22.908,77.622 23.124,76.864 23.312,75.713 C23.369,75.367 23.849,71.775 23.96,70.971 C24.378,67.944 24.79,65.218 25.239,62.621 C26.364,56.108 27.506,51.651 28.711,49.893 C29.025,49.29 29.379,48.848 29.772,48.557 C30.606,47.94 31.478,48.04 32.352,48.558 C32.527,48.662 32.864,48.896 32.864,48.896 C33.862,49.594 40.153,53.786 41.462,54.62 C41.537,54.67 42.704,55.49 42.919,55.601 C43.14,55.713 43.356,55.772 43.697,55.807 C44.095,55.847 44.576,55.905 45.24,55.991 C45.569,56.034 46.837,56.202 47.101,56.236 C47.251,56.256 47.394,56.274 47.531,56.292 C48.549,56.423 48.81,56.717 48.87,57.614 C48.87,57.612 48.879,57.745 48.881,57.784 C48.921,58.367 49,59.053 49.084,59.38 C49.359,60.568 49.877,61.044 50.873,61.14 C51.337,61.202 52.425,61.287 54.05,61.393 C54.435,61.418 54.849,61.444 55.298,61.472 C56.044,61.518 59.007,61.695 59.48,61.726 C60.261,61.812 60.425,61.705 60.546,61.303 C60.611,61.075 60.629,61.017 60.646,60.97 C60.856,60.31 61.214,59.379 61.886,57.775 C62.309,56.636 62.533,56.49 63.655,56.586 C65.022,56.697 69.547,57.536 71.037,58.013 C71.934,58.278 72.174,58.635 72.259,59.522 C72.274,59.686 72.278,59.724 72.282,59.76 C72.291,59.853 72.301,59.936 72.312,60.017 C72.562,61.78 73.03,62.165 74.184,62.212 C74.403,62.221 79.264,62.481 80.837,62.563 C81.109,62.577 81.376,62.591 81.638,62.604 C85.683,62.812 88.292,62.927 88.937,62.914 C89.332,62.753 89.844,62.372 90.443,61.803 C90.739,61.523 91.051,61.201 91.388,60.835 C91.632,60.57 91.878,60.292 92.165,59.961 C92.279,59.83 92.666,59.381 92.795,59.232 C92.949,58.967 93.046,58.682 93.097,58.369 C93.172,57.907 93.15,57.478 93.046,56.717 C92.983,56.258 92.982,56.243 92.966,56.082 C92.928,55.686 92.27,51.197 90.794,41.196 C88.985,28.946 88.693,26.964 88.612,26.326 C88.463,26.244 88.308,26.2 88.034,26.143 C87.973,26.13 87.62,26.06 87.508,26.036 C87.279,25.988 87.081,25.941 86.884,25.885 C86.371,25.741 85.907,25.552 85.466,25.288 C85.195,25.126 84.937,24.938 84.69,24.72 C83.9,24.01 83.447,23.372 82.926,22.226 C82.72,21.74 82.48,21.54 82.163,21.54 C81.254,21.54 80.461,23.643 80.339,26.018 C80.186,28.976 80.67,31.297 81.433,33.153 C81.496,33.326 81.941,34.448 81.954,34.483 C82.253,35.246 82.509,35.928 82.756,36.631 C83.081,37.56 83.358,38.442 83.582,39.278 C83.974,40.747 84.185,42.019 84.175,43.061 C84.16,44.712 83.772,45.757 82.99,46.333 C82.375,46.787 81.692,46.902 80.431,46.902 C79.594,46.902 78.65,46.891 77.564,46.871 C76.868,46.858 76.151,46.842 75.243,46.819 C75.169,46.818 73.614,46.779 73.212,46.769 C72.52,46.753 72.025,46.743 71.636,46.739 C71.298,46.736 59.866,46.255 57.744,46.137 C55.793,46.029 54.807,45.715 53.761,45.045 C53.564,44.917 53.527,44.893 53.501,44.876 C53.395,44.808 53.319,44.76 53.236,44.709 C52.204,44.049 49.667,42.572 45.77,40.345 C44.623,39.69 38.523,36.221 37.84,35.824 C37.076,35.35 36.848,35.428 36.429,36.022 C36.418,36.038 36.329,36.164 36.303,36.202 C36.254,36.271 36.212,36.327 36.183,36.362 C35.998,36.618 35.679,37.129 35.16,37.993 C34.993,38.271 33.939,40.037 33.617,40.572 C33.541,40.699 33.467,40.821 33.395,40.94 C32.641,42.186 32.052,43.119 31.575,43.81 C30.468,45.414 29.287,45.471 28.185,44.577 C28.1,44.508 28.019,44.437 27.929,44.353 C27.899,44.326 27.778,44.211 27.752,44.187 C27.537,43.991 27.155,43.645 26.73,43.262 C26.092,42.688 25.443,42.108 24.816,41.554 C23.094,40.033 21.806,38.946 21.222,38.542 C20.967,38.329 20.85,38.296 20.741,38.337 C20.493,38.431 20.521,38.397 19.253,40.042 C16.699,44.212 8.382,57.59 7.706,58.768 C6.941,60.091 7.05,60.426 8.503,61.825 C10.545,63.457 10.708,63.566 11.314,63.573 Z M9.65,63.761 C9.413,63.601 9.164,63.413 8.84,63.154 C8.709,63.05 8.133,62.582 7.975,62.455 C6.24,60.787 6,60.077 6.994,58.358 C7.679,57.165 16.032,43.729 18.563,39.594 C20.127,37.563 19.968,37.752 20.449,37.569 C20.87,37.409 21.278,37.523 21.705,37.877 C22.334,38.315 23.623,39.404 25.36,40.938 C25.989,41.494 26.64,42.075 27.28,42.651 C27.707,43.036 28.09,43.383 28.306,43.58 C28.338,43.61 28.463,43.728 28.488,43.751 C28.566,43.823 28.633,43.883 28.703,43.939 C29.457,44.551 30.086,44.521 30.899,43.343 C31.364,42.669 31.946,41.747 32.692,40.514 C32.764,40.396 32.837,40.274 32.913,40.149 C33.234,39.615 34.287,37.849 34.455,37.569 C34.988,36.683 35.313,36.163 35.529,35.864 C35.658,35.691 35.744,35.567 35.758,35.548 C36.405,34.631 37.094,34.395 38.263,35.119 C38.932,35.509 45.027,38.975 46.02,39.542 C50.09,41.867 52.63,43.346 53.671,44.012 C53.755,44.063 53.837,44.115 53.948,44.187 C54.127,44.304 54.166,44.329 54.204,44.353 C55.13,44.946 55.979,45.217 57.789,45.317 C59.9,45.434 71.322,45.914 71.645,45.918 C72.038,45.922 72.536,45.931 73.232,45.948 C73.634,45.957 75.19,45.996 75.263,45.998 C76.17,46.02 76.885,46.036 77.579,46.049 C78.66,46.07 79.6,46.08 80.431,46.08 C81.522,46.08 82.075,45.987 82.503,45.672 C83.042,45.274 83.34,44.471 83.353,43.053 C83.362,42.098 83.163,40.894 82.788,39.49 C82.57,38.676 82.299,37.813 81.98,36.903 C81.738,36.21 81.485,35.537 81.189,34.783 C81.18,34.758 80.73,33.621 80.667,33.452 C79.867,31.505 79.358,29.067 79.518,25.976 C79.663,23.16 80.584,20.718 82.163,20.718 C82.851,20.718 83.358,21.142 83.678,21.896 C84.149,22.932 84.537,23.477 85.237,24.106 C85.443,24.289 85.659,24.446 85.887,24.583 C86.544,24.975 86.785,25.043 88.202,25.338 C89.006,25.506 89.361,25.689 89.427,26.224 C89.507,26.851 89.804,28.872 91.6,41.035 C93.102,51.206 93.743,55.584 93.784,56.002 C93.798,56.148 93.8,56.163 93.86,56.606 C93.974,57.443 94,57.935 93.908,58.501 C93.839,58.925 93.702,59.319 93.482,59.684 C93.347,59.849 92.91,60.357 92.786,60.5 C92.493,60.836 92.243,61.119 91.993,61.391 C91.645,61.77 91.319,62.104 91.009,62.399 C90.304,63.068 89.695,63.514 89.16,63.709 C88.48,63.758 85.862,63.644 81.596,63.425 C81.334,63.412 81.067,63.398 80.794,63.384 C79.213,63.301 74.363,63.042 74.151,63.033 C72.615,62.97 71.806,62.305 71.499,60.131 C71.486,60.038 71.475,59.947 71.465,59.844 C71.446,59.656 71.446,59.656 71.441,59.6 C71.386,59.021 71.345,58.961 70.796,58.798 C69.359,58.339 64.896,57.511 63.587,57.405 C62.836,57.34 62.952,57.264 62.65,58.077 C61.98,59.676 61.63,60.587 61.424,61.234 C61.343,61.505 61.345,61.501 61.333,61.541 C61.096,62.322 60.564,62.672 59.408,62.544 C58.956,62.515 55.995,62.338 55.247,62.292 C54.797,62.264 54.383,62.238 53.997,62.213 C52.349,62.105 51.254,62.02 50.779,61.956 C49.439,61.828 48.637,61.09 48.286,59.575 C48.188,59.192 48.105,58.473 48.062,57.841 C48.016,57.154 48.045,57.187 47.427,57.107 C47.288,57.089 47.145,57.071 46.994,57.051 C46.729,57.016 45.461,56.848 45.134,56.806 C44.477,56.721 44.002,56.663 43.615,56.624 C43.177,56.58 42.863,56.494 42.545,56.332 C42.27,56.191 41.023,55.315 41.013,55.308 C39.702,54.473 33.4,50.274 32.43,49.593 C32.323,49.523 32.049,49.334 31.933,49.265 C31.312,48.897 30.777,48.836 30.261,49.218 C29.972,49.431 29.692,49.783 29.429,50.293 C28.29,51.939 27.154,56.363 26.048,62.761 C25.602,65.347 25.191,68.065 24.774,71.083 C24.665,71.872 24.182,75.486 24.123,75.846 C23.917,77.104 23.677,77.947 23.34,78.463 C22.884,79.16 22.207,79.282 21.488,78.77 C21.081,78.396 20.792,77.919 20.317,76.978 C19.783,75.918 19.677,75.724 19.47,75.47 C19.224,75.17 18.852,74.844 18.274,74.408 C18.07,74.254 16.907,73.41 16.561,73.147 C16.359,72.993 15.165,72.162 14.992,72.038 C14.848,71.936 14.714,71.839 14.588,71.745 C14.333,71.557 14.111,71.385 13.918,71.225 C12.664,70.188 12.259,69.194 12.586,67.451 C12.598,67.252 12.612,67.056 12.632,66.814 C12.738,65.512 12.74,65.264 12.618,64.98 C12.49,64.681 12.137,64.499 11.299,64.394 C10.774,64.387 10.26,64.174 9.65,63.761 Z",
    shapePath:
      "M11.314,63.573 C12.49,63.712 13.101,64.024 13.373,64.655 C13.576,65.127 13.573,65.379 13.451,66.88 C13.431,67.127 13.416,67.324 13.404,67.526 C13.121,69.031 13.404,69.733 14.441,70.592 C14.622,70.741 14.833,70.904 15.076,71.085 C15.199,71.175 15.329,71.269 15.469,71.37 C15.63,71.484 16.84,72.327 17.058,72.492 C17.395,72.749 18.556,73.592 18.769,73.752 C19.395,74.225 19.808,74.586 20.105,74.95 C20.371,75.274 20.473,75.462 21.051,76.608 C21.468,77.434 21.727,77.866 21.987,78.116 C22.313,78.342 22.458,78.31 22.652,78.014 C22.908,77.622 23.124,76.864 23.312,75.713 C23.369,75.367 23.849,71.775 23.96,70.971 C24.378,67.944 24.79,65.218 25.239,62.621 C26.364,56.108 27.506,51.651 28.711,49.893 C29.025,49.29 29.379,48.848 29.772,48.557 C30.606,47.94 31.478,48.04 32.352,48.558 C32.527,48.662 32.864,48.896 32.864,48.896 C33.862,49.594 40.153,53.786 41.462,54.62 C41.537,54.67 42.704,55.49 42.919,55.601 C43.14,55.713 43.356,55.772 43.697,55.807 C44.095,55.847 44.576,55.905 45.24,55.991 C45.569,56.034 46.837,56.202 47.101,56.236 C47.251,56.256 47.394,56.274 47.531,56.292 C48.549,56.423 48.81,56.717 48.87,57.614 C48.87,57.612 48.879,57.745 48.881,57.784 C48.921,58.367 49,59.053 49.084,59.38 C49.359,60.568 49.877,61.044 50.873,61.14 C51.337,61.202 52.425,61.287 54.05,61.393 C54.435,61.418 54.849,61.444 55.298,61.472 C56.044,61.518 59.007,61.695 59.48,61.726 C60.261,61.812 60.425,61.705 60.546,61.303 C60.611,61.075 60.629,61.017 60.646,60.97 C60.856,60.31 61.214,59.379 61.886,57.775 C62.309,56.636 62.533,56.49 63.655,56.586 C65.022,56.697 69.547,57.536 71.037,58.013 C71.934,58.278 72.174,58.635 72.259,59.522 C72.274,59.686 72.278,59.724 72.282,59.76 C72.291,59.853 72.301,59.936 72.312,60.017 C72.562,61.78 73.03,62.165 74.184,62.212 C74.403,62.221 79.264,62.481 80.837,62.563 C81.109,62.577 81.376,62.591 81.638,62.604 C85.683,62.812 88.292,62.927 88.937,62.914 C89.332,62.753 89.844,62.372 90.443,61.803 C90.739,61.523 91.051,61.201 91.388,60.835 C91.632,60.57 91.878,60.292 92.165,59.961 C92.279,59.83 92.666,59.381 92.795,59.232 C92.949,58.967 93.046,58.682 93.097,58.369 C93.172,57.907 93.15,57.478 93.046,56.717 C92.983,56.258 92.982,56.243 92.966,56.082 C92.928,55.686 92.27,51.197 90.794,41.196 C88.985,28.946 88.693,26.964 88.612,26.326 C88.463,26.244 88.308,26.2 88.034,26.143 C87.973,26.13 87.62,26.06 87.508,26.036 C87.279,25.988 87.081,25.941 86.884,25.885 C86.371,25.741 85.907,25.552 85.466,25.288 C85.195,25.126 84.937,24.938 84.69,24.72 C83.9,24.01 83.447,23.372 82.926,22.226 C82.72,21.74 82.48,21.54 82.163,21.54 C81.254,21.54 80.461,23.643 80.339,26.018 C80.186,28.976 80.67,31.297 81.433,33.153 C81.496,33.326 81.941,34.448 81.954,34.483 C82.253,35.246 82.509,35.928 82.756,36.631 C83.081,37.56 83.358,38.442 83.582,39.278 C83.974,40.747 84.185,42.019 84.175,43.061 C84.16,44.712 83.772,45.757 82.99,46.333 C82.375,46.787 81.692,46.902 80.431,46.902 C79.594,46.902 78.65,46.891 77.564,46.871 C76.868,46.858 76.151,46.842 75.243,46.819 C75.169,46.818 73.614,46.779 73.212,46.769 C72.52,46.753 72.025,46.743 71.636,46.739 C71.298,46.736 59.866,46.255 57.744,46.137 C55.793,46.029 54.807,45.715 53.761,45.045 C53.564,44.917 53.527,44.893 53.501,44.876 C53.395,44.808 53.319,44.76 53.236,44.709 C52.204,44.049 49.667,42.572 45.77,40.345 C44.623,39.69 38.523,36.221 37.84,35.824 C37.076,35.35 36.848,35.428 36.429,36.022 C36.418,36.038 36.329,36.164 36.303,36.202 C36.254,36.271 36.212,36.327 36.183,36.362 C35.998,36.618 35.679,37.129 35.16,37.993 C34.993,38.271 33.939,40.037 33.617,40.572 C33.541,40.699 33.467,40.821 33.395,40.94 C32.641,42.186 32.052,43.119 31.575,43.81 C30.468,45.414 29.287,45.471 28.185,44.577 C28.1,44.508 28.019,44.437 27.929,44.353 C27.899,44.326 27.778,44.211 27.752,44.187 C27.537,43.991 27.155,43.645 26.73,43.262 C26.092,42.688 25.443,42.108 24.816,41.554 C23.094,40.033 21.806,38.946 21.222,38.542 C20.967,38.329 20.85,38.296 20.741,38.337 C20.493,38.431 20.521,38.397 19.253,40.042 C16.699,44.212 8.382,57.59 7.706,58.768 C6.941,60.091 7.05,60.426 8.503,61.825 C10.545,63.457 10.708,63.566 11.314,63.573 Z M9.65,63.761 C9.413,63.601 9.164,63.413 8.84,63.154 C8.709,63.05 8.133,62.582 7.975,62.455 C6.24,60.787 6,60.077 6.994,58.358 C7.679,57.165 16.032,43.729 18.563,39.594 C20.127,37.563 19.968,37.752 20.449,37.569 C20.87,37.409 21.278,37.523 21.705,37.877 C22.334,38.315 23.623,39.404 25.36,40.938 C25.989,41.494 26.64,42.075 27.28,42.651 C27.707,43.036 28.09,43.383 28.306,43.58 C28.338,43.61 28.463,43.728 28.488,43.751 C28.566,43.823 28.633,43.883 28.703,43.939 C29.457,44.551 30.086,44.521 30.899,43.343 C31.364,42.669 31.946,41.747 32.692,40.514 C32.764,40.396 32.837,40.274 32.913,40.149 C33.234,39.615 34.287,37.849 34.455,37.569 C34.988,36.683 35.313,36.163 35.529,35.864 C35.658,35.691 35.744,35.567 35.758,35.548 C36.405,34.631 37.094,34.395 38.263,35.119 C38.932,35.509 45.027,38.975 46.02,39.542 C50.09,41.867 52.63,43.346 53.671,44.012 C53.755,44.063 53.837,44.115 53.948,44.187 C54.127,44.304 54.166,44.329 54.204,44.353 C55.13,44.946 55.979,45.217 57.789,45.317 C59.9,45.434 71.322,45.914 71.645,45.918 C72.038,45.922 72.536,45.931 73.232,45.948 C73.634,45.957 75.19,45.996 75.263,45.998 C76.17,46.02 76.885,46.036 77.579,46.049 C78.66,46.07 79.6,46.08 80.431,46.08 C81.522,46.08 82.075,45.987 82.503,45.672 C83.042,45.274 83.34,44.471 83.353,43.053 C83.362,42.098 83.163,40.894 82.788,39.49 C82.57,38.676 82.299,37.813 81.98,36.903 C81.738,36.21 81.485,35.537 81.189,34.783 C81.18,34.758 80.73,33.621 80.667,33.452 C79.867,31.505 79.358,29.067 79.518,25.976 C79.663,23.16 80.584,20.718 82.163,20.718 C82.851,20.718 83.358,21.142 83.678,21.896 C84.149,22.932 84.537,23.477 85.237,24.106 C85.443,24.289 85.659,24.446 85.887,24.583 C86.544,24.975 86.785,25.043 88.202,25.338 C89.006,25.506 89.361,25.689 89.427,26.224 C89.507,26.851 89.804,28.872 91.6,41.035 C93.102,51.206 93.743,55.584 93.784,56.002 C93.798,56.148 93.8,56.163 93.86,56.606 C93.974,57.443 94,57.935 93.908,58.501 C93.839,58.925 93.702,59.319 93.482,59.684 C93.347,59.849 92.91,60.357 92.786,60.5 C92.493,60.836 92.243,61.119 91.993,61.391 C91.645,61.77 91.319,62.104 91.009,62.399 C90.304,63.068 89.695,63.514 89.16,63.709 C88.48,63.758 85.862,63.644 81.596,63.425 C81.334,63.412 81.067,63.398 80.794,63.384 C79.213,63.301 74.363,63.042 74.151,63.033 C72.615,62.97 71.806,62.305 71.499,60.131 C71.486,60.038 71.475,59.947 71.465,59.844 C71.446,59.656 71.446,59.656 71.441,59.6 C71.386,59.021 71.345,58.961 70.796,58.798 C69.359,58.339 64.896,57.511 63.587,57.405 C62.836,57.34 62.952,57.264 62.65,58.077 C61.98,59.676 61.63,60.587 61.424,61.234 C61.343,61.505 61.345,61.501 61.333,61.541 C61.096,62.322 60.564,62.672 59.408,62.544 C58.956,62.515 55.995,62.338 55.247,62.292 C54.797,62.264 54.383,62.238 53.997,62.213 C52.349,62.105 51.254,62.02 50.779,61.956 C49.439,61.828 48.637,61.09 48.286,59.575 C48.188,59.192 48.105,58.473 48.062,57.841 C48.016,57.154 48.045,57.187 47.427,57.107 C47.288,57.089 47.145,57.071 46.994,57.051 C46.729,57.016 45.461,56.848 45.134,56.806 C44.477,56.721 44.002,56.663 43.615,56.624 C43.177,56.58 42.863,56.494 42.545,56.332 C42.27,56.191 41.023,55.315 41.013,55.308 C39.702,54.473 33.4,50.274 32.43,49.593 C32.323,49.523 32.049,49.334 31.933,49.265 C31.312,48.897 30.777,48.836 30.261,49.218 C29.972,49.431 29.692,49.783 29.429,50.293 C28.29,51.939 27.154,56.363 26.048,62.761 C25.602,65.347 25.191,68.065 24.774,71.083 C24.665,71.872 24.182,75.486 24.123,75.846 C23.917,77.104 23.677,77.947 23.34,78.463 C22.884,79.16 22.207,79.282 21.488,78.77 C21.081,78.396 20.792,77.919 20.317,76.978 C19.783,75.918 19.677,75.724 19.47,75.47 C19.224,75.17 18.852,74.844 18.274,74.408 C18.07,74.254 16.907,73.41 16.561,73.147 C16.359,72.993 15.165,72.162 14.992,72.038 C14.848,71.936 14.714,71.839 14.588,71.745 C14.333,71.557 14.111,71.385 13.918,71.225 C12.664,70.188 12.259,69.194 12.586,67.451 C12.598,67.252 12.612,67.056 12.632,66.814 C12.738,65.512 12.74,65.264 12.618,64.98 C12.49,64.681 12.137,64.499 11.299,64.394 C10.774,64.387 10.26,64.174 9.65,63.761 Z",
    start: { x: 11.314, y: 63.573, rotation: 97 },
    facts: ["23 turns","5.063 km","Counterclockwise"]
  },
  {
    id: "609",
    label: "the Americas",
    name: "Circuit of the Americas",
    location: "Austin, TX, USA",
    accent: "#f05a7e",
    path: "M81.02,41.532 C78.085,42.227 75.804,42.702 74.176,42.958 C72.856,43.324 72.216,43.168 71.638,42.415 C71.582,42.342 71.525,42.263 71.457,42.164 C71.321,41.964 71.296,41.927 71.274,41.895 C70.919,41.176 70.466,40.79 69.687,40.563 C69.1,40.402 68.286,40.524 67.81,40.935 C67.488,41.213 67.435,41.27 66.461,42.35 C66.011,42.849 65.706,43.169 65.39,43.457 C65.239,43.595 65.093,43.717 64.95,43.825 C63.326,45.053 62.691,45.19 61.682,44.748 C61.419,44.632 60.986,44.419 60.317,44.079 C60.123,43.98 59.913,43.872 59.641,43.732 C59.527,43.674 59.05,43.429 58.927,43.365 C58.395,43.092 58.042,42.912 57.717,42.748 C56.493,42.131 55.583,42.282 53.652,43.371 C53.131,43.682 52.719,44.011 52.401,44.359 C51.66,45.17 51.497,45.863 51.534,47.014 C51.545,47.354 51.545,47.451 51.525,47.592 C51.514,47.666 51.515,47.736 51.525,47.926 C51.592,49.148 51.066,49.87 48.897,50.734 C46.963,51.505 46.504,51.997 46.12,53.113 C46.045,53.33 45.995,53.458 45.924,53.597 C45.311,54.797 44.745,55.736 44.284,56.192 C44.012,56.353 43.836,56.447 43.658,56.544 C42.923,56.945 42.179,57.385 41.039,58.088 C40.783,58.245 38.153,59.879 37.098,60.527 C35.537,61.416 34.723,62.421 34.461,63.551 C34.269,64.381 34.357,65.126 34.677,66.313 C35.236,68.387 36.044,71.08 36.612,72.679 C36.968,73.68 36.868,74.371 36.285,74.64 C35.878,74.827 35.325,74.72 34.888,74.466 C34.778,74.403 34.198,73.943 33.035,73.002 C28.517,69.35 16.57,59.536 10.427,54.432 C8.966,53.218 7.901,52.326 7.297,51.812 C7.017,51.573 6.836,51.415 6.754,51.337 C6.2,50.813 6,50.32 6.189,49.853 C6.325,49.519 6.582,49.314 7.073,49.04 C7.309,48.91 7.356,48.884 7.398,48.859 C8.054,48.453 15.505,45.471 17.983,44.567 C19.307,44.085 20.115,44.339 20.693,45.128 C20.759,45.218 20.954,45.516 20.991,45.564 C21.133,45.726 23.186,48.838 24.056,50.054 C24.463,50.622 24.851,51.143 25.222,51.615 C25.492,51.957 25.75,52.271 25.997,52.555 C28.953,54.844 31.03,55.023 33.086,53.982 C34.836,53.096 35.613,52.386 36.191,50.913 C36.708,49.596 36.521,48.526 35.896,47.227 C35.324,46.038 32.899,41.467 32.382,40.684 L32.322,40.528 C32.216,39.832 32.292,39.395 32.636,39.139 C32.898,38.944 33.101,38.926 33.778,38.943 C33.927,38.947 34.01,38.949 34.106,38.949 C35.167,38.949 36.171,39.524 36.859,40.401 C36.934,40.498 37.324,40.97 37.436,41.113 C38.041,41.885 38.397,42.574 38.539,43.453 C38.695,44.42 39.313,44.857 40.128,44.857 C40.69,44.938 40.869,44.954 41.082,44.954 C41.386,44.954 41.619,44.971 42.184,45.046 C42.694,44.946 42.868,44.771 42.882,44.518 C42.894,44.296 42.805,44.049 42.621,43.695 C42.525,43.51 41.751,42.326 40.838,40.968 C39.622,39.159 38.53,37.589 38.046,36.97 C37.453,36.211 37.35,35.606 37.877,35.245 C38.188,35.032 38.565,34.991 39.385,34.991 C39.619,34.998 40.082,34.981 40.73,34.94 C47.25,34.532 60.745,32.876 71.881,30.872 C74.746,30.357 77.468,29.771 80.067,29.124 C82.824,28.437 85.309,27.718 87.728,26.936 C88.922,26.55 91.638,25.62 91.895,25.539 C93.057,25.173 93.787,25.395 93.923,26.152 C94,26.576 93.841,27.111 93.636,27.474 C93.422,27.852 92.137,29.631 91.587,30.292 C90.391,31.732 84.061,39.081 83.091,40.106 C82.241,41.002 81.574,41.482 81.02,41.532 Z M72.254,41.941 C72.624,42.423 72.938,42.498 73.989,42.203 C75.645,41.942 77.925,41.467 80.87,40.769 C81.234,40.742 81.788,40.35 82.527,39.571 C83.482,38.563 89.803,31.223 90.99,29.795 C91.512,29.167 92.772,27.424 92.959,27.092 C93.083,26.872 93.196,26.494 93.159,26.29 C93.125,26.104 92.904,26.036 92.128,26.28 C91.883,26.358 89.171,27.286 87.967,27.676 C85.532,28.463 83.03,29.187 80.254,29.878 C77.639,30.529 74.901,31.119 72.019,31.637 C60.854,33.646 47.329,35.306 40.779,35.716 C40.108,35.758 39.627,35.776 39.373,35.768 C38.753,35.768 38.438,35.803 38.316,35.886 C38.282,35.909 38.304,36.038 38.658,36.491 C39.158,37.13 40.256,38.709 41.483,40.535 C42.426,41.937 43.193,43.111 43.31,43.336 C43.558,43.811 43.68,44.153 43.658,44.56 C43.623,45.213 43.149,45.665 42.261,45.822 C41.564,45.746 41.359,45.731 41.102,45.731 C40.83,45.731 40.617,45.712 40.098,45.634 C38.941,45.622 37.992,44.941 37.772,43.577 C37.654,42.848 37.356,42.27 36.825,41.592 C36.721,41.46 36.331,40.987 36.247,40.881 C35.696,40.178 34.906,39.726 34.106,39.726 C34.002,39.726 33.913,39.724 33.758,39.72 C33.3,39.708 33.155,39.721 33.101,39.762 C33.057,39.794 33.027,39.95 33.079,40.331 C33.703,41.324 36.026,45.704 36.596,46.89 C37.306,48.365 37.528,49.635 36.915,51.197 C36.256,52.876 35.342,53.711 33.437,54.675 C31.109,55.854 28.702,55.642 25.491,53.146 C25.173,52.792 24.898,52.458 24.612,52.095 C24.233,51.614 23.837,51.084 23.424,50.507 C22.523,49.247 20.509,46.194 20.444,46.121 C20.316,45.961 20.114,45.653 20.066,45.588 C19.69,45.075 19.245,44.934 18.249,45.298 C15.843,46.175 8.396,49.156 7.869,49.483 C7.742,49.558 7.69,49.587 7.62,49.626 C7.115,49.906 6.954,50.034 6.909,50.145 C6.865,50.256 6.941,50.445 7.288,50.773 C7.357,50.838 7.532,50.99 7.802,51.221 C8.402,51.732 9.465,52.622 10.924,53.834 C17.064,58.936 29.009,68.748 33.524,72.398 C34.564,73.239 35.225,73.763 35.277,73.794 C35.519,73.933 35.829,73.994 35.96,73.934 C36,73.915 36.023,73.883 36.037,73.787 C36.063,73.609 36.017,73.325 35.88,72.939 C35.304,71.318 34.491,68.607 33.926,66.515 C33.575,65.214 33.475,64.364 33.704,63.375 C34.018,62.022 34.973,60.843 36.702,59.859 C37.744,59.218 40.374,57.584 40.631,57.426 C41.782,56.717 42.537,56.271 43.286,55.862 C43.45,55.773 43.613,55.686 43.776,55.6 C44.154,55.203 44.678,54.327 45.232,53.243 C45.282,53.145 45.321,53.045 45.385,52.86 C45.842,51.533 46.461,50.868 48.609,50.012 C49.677,49.586 50.289,49.188 50.565,48.809 C50.743,48.565 50.772,48.39 50.749,47.969 C50.736,47.726 50.735,47.624 50.755,47.48 C50.766,47.405 50.766,47.32 50.757,47.039 C50.715,45.705 50.921,44.826 51.827,43.834 C52.198,43.429 52.67,43.052 53.262,42.699 C55.404,41.491 56.566,41.298 58.067,42.054 C58.394,42.219 58.748,42.4 59.228,42.646 C59.405,42.737 59.883,42.983 59.996,43.041 C60.268,43.18 60.477,43.288 60.67,43.386 C61.325,43.72 61.749,43.929 61.994,44.036 C62.715,44.352 63.064,44.277 64.481,43.205 C64.604,43.113 64.732,43.005 64.866,42.882 C65.158,42.616 65.45,42.311 65.884,41.829 C66.894,40.71 66.942,40.657 67.302,40.347 C67.992,39.751 69.073,39.589 69.898,39.815 C70.885,40.103 71.51,40.63 71.933,41.481 C72.193,41.864 72.175,41.838 72.254,41.941 Z",
    shapePath:
      "M81.02,41.532 C78.085,42.227 75.804,42.702 74.176,42.958 C72.856,43.324 72.216,43.168 71.638,42.415 C71.582,42.342 71.525,42.263 71.457,42.164 C71.321,41.964 71.296,41.927 71.274,41.895 C70.919,41.176 70.466,40.79 69.687,40.563 C69.1,40.402 68.286,40.524 67.81,40.935 C67.488,41.213 67.435,41.27 66.461,42.35 C66.011,42.849 65.706,43.169 65.39,43.457 C65.239,43.595 65.093,43.717 64.95,43.825 C63.326,45.053 62.691,45.19 61.682,44.748 C61.419,44.632 60.986,44.419 60.317,44.079 C60.123,43.98 59.913,43.872 59.641,43.732 C59.527,43.674 59.05,43.429 58.927,43.365 C58.395,43.092 58.042,42.912 57.717,42.748 C56.493,42.131 55.583,42.282 53.652,43.371 C53.131,43.682 52.719,44.011 52.401,44.359 C51.66,45.17 51.497,45.863 51.534,47.014 C51.545,47.354 51.545,47.451 51.525,47.592 C51.514,47.666 51.515,47.736 51.525,47.926 C51.592,49.148 51.066,49.87 48.897,50.734 C46.963,51.505 46.504,51.997 46.12,53.113 C46.045,53.33 45.995,53.458 45.924,53.597 C45.311,54.797 44.745,55.736 44.284,56.192 C44.012,56.353 43.836,56.447 43.658,56.544 C42.923,56.945 42.179,57.385 41.039,58.088 C40.783,58.245 38.153,59.879 37.098,60.527 C35.537,61.416 34.723,62.421 34.461,63.551 C34.269,64.381 34.357,65.126 34.677,66.313 C35.236,68.387 36.044,71.08 36.612,72.679 C36.968,73.68 36.868,74.371 36.285,74.64 C35.878,74.827 35.325,74.72 34.888,74.466 C34.778,74.403 34.198,73.943 33.035,73.002 C28.517,69.35 16.57,59.536 10.427,54.432 C8.966,53.218 7.901,52.326 7.297,51.812 C7.017,51.573 6.836,51.415 6.754,51.337 C6.2,50.813 6,50.32 6.189,49.853 C6.325,49.519 6.582,49.314 7.073,49.04 C7.309,48.91 7.356,48.884 7.398,48.859 C8.054,48.453 15.505,45.471 17.983,44.567 C19.307,44.085 20.115,44.339 20.693,45.128 C20.759,45.218 20.954,45.516 20.991,45.564 C21.133,45.726 23.186,48.838 24.056,50.054 C24.463,50.622 24.851,51.143 25.222,51.615 C25.492,51.957 25.75,52.271 25.997,52.555 C28.953,54.844 31.03,55.023 33.086,53.982 C34.836,53.096 35.613,52.386 36.191,50.913 C36.708,49.596 36.521,48.526 35.896,47.227 C35.324,46.038 32.899,41.467 32.382,40.684 L32.322,40.528 C32.216,39.832 32.292,39.395 32.636,39.139 C32.898,38.944 33.101,38.926 33.778,38.943 C33.927,38.947 34.01,38.949 34.106,38.949 C35.167,38.949 36.171,39.524 36.859,40.401 C36.934,40.498 37.324,40.97 37.436,41.113 C38.041,41.885 38.397,42.574 38.539,43.453 C38.695,44.42 39.313,44.857 40.128,44.857 C40.69,44.938 40.869,44.954 41.082,44.954 C41.386,44.954 41.619,44.971 42.184,45.046 C42.694,44.946 42.868,44.771 42.882,44.518 C42.894,44.296 42.805,44.049 42.621,43.695 C42.525,43.51 41.751,42.326 40.838,40.968 C39.622,39.159 38.53,37.589 38.046,36.97 C37.453,36.211 37.35,35.606 37.877,35.245 C38.188,35.032 38.565,34.991 39.385,34.991 C39.619,34.998 40.082,34.981 40.73,34.94 C47.25,34.532 60.745,32.876 71.881,30.872 C74.746,30.357 77.468,29.771 80.067,29.124 C82.824,28.437 85.309,27.718 87.728,26.936 C88.922,26.55 91.638,25.62 91.895,25.539 C93.057,25.173 93.787,25.395 93.923,26.152 C94,26.576 93.841,27.111 93.636,27.474 C93.422,27.852 92.137,29.631 91.587,30.292 C90.391,31.732 84.061,39.081 83.091,40.106 C82.241,41.002 81.574,41.482 81.02,41.532 Z M72.254,41.941 C72.624,42.423 72.938,42.498 73.989,42.203 C75.645,41.942 77.925,41.467 80.87,40.769 C81.234,40.742 81.788,40.35 82.527,39.571 C83.482,38.563 89.803,31.223 90.99,29.795 C91.512,29.167 92.772,27.424 92.959,27.092 C93.083,26.872 93.196,26.494 93.159,26.29 C93.125,26.104 92.904,26.036 92.128,26.28 C91.883,26.358 89.171,27.286 87.967,27.676 C85.532,28.463 83.03,29.187 80.254,29.878 C77.639,30.529 74.901,31.119 72.019,31.637 C60.854,33.646 47.329,35.306 40.779,35.716 C40.108,35.758 39.627,35.776 39.373,35.768 C38.753,35.768 38.438,35.803 38.316,35.886 C38.282,35.909 38.304,36.038 38.658,36.491 C39.158,37.13 40.256,38.709 41.483,40.535 C42.426,41.937 43.193,43.111 43.31,43.336 C43.558,43.811 43.68,44.153 43.658,44.56 C43.623,45.213 43.149,45.665 42.261,45.822 C41.564,45.746 41.359,45.731 41.102,45.731 C40.83,45.731 40.617,45.712 40.098,45.634 C38.941,45.622 37.992,44.941 37.772,43.577 C37.654,42.848 37.356,42.27 36.825,41.592 C36.721,41.46 36.331,40.987 36.247,40.881 C35.696,40.178 34.906,39.726 34.106,39.726 C34.002,39.726 33.913,39.724 33.758,39.72 C33.3,39.708 33.155,39.721 33.101,39.762 C33.057,39.794 33.027,39.95 33.079,40.331 C33.703,41.324 36.026,45.704 36.596,46.89 C37.306,48.365 37.528,49.635 36.915,51.197 C36.256,52.876 35.342,53.711 33.437,54.675 C31.109,55.854 28.702,55.642 25.491,53.146 C25.173,52.792 24.898,52.458 24.612,52.095 C24.233,51.614 23.837,51.084 23.424,50.507 C22.523,49.247 20.509,46.194 20.444,46.121 C20.316,45.961 20.114,45.653 20.066,45.588 C19.69,45.075 19.245,44.934 18.249,45.298 C15.843,46.175 8.396,49.156 7.869,49.483 C7.742,49.558 7.69,49.587 7.62,49.626 C7.115,49.906 6.954,50.034 6.909,50.145 C6.865,50.256 6.941,50.445 7.288,50.773 C7.357,50.838 7.532,50.99 7.802,51.221 C8.402,51.732 9.465,52.622 10.924,53.834 C17.064,58.936 29.009,68.748 33.524,72.398 C34.564,73.239 35.225,73.763 35.277,73.794 C35.519,73.933 35.829,73.994 35.96,73.934 C36,73.915 36.023,73.883 36.037,73.787 C36.063,73.609 36.017,73.325 35.88,72.939 C35.304,71.318 34.491,68.607 33.926,66.515 C33.575,65.214 33.475,64.364 33.704,63.375 C34.018,62.022 34.973,60.843 36.702,59.859 C37.744,59.218 40.374,57.584 40.631,57.426 C41.782,56.717 42.537,56.271 43.286,55.862 C43.45,55.773 43.613,55.686 43.776,55.6 C44.154,55.203 44.678,54.327 45.232,53.243 C45.282,53.145 45.321,53.045 45.385,52.86 C45.842,51.533 46.461,50.868 48.609,50.012 C49.677,49.586 50.289,49.188 50.565,48.809 C50.743,48.565 50.772,48.39 50.749,47.969 C50.736,47.726 50.735,47.624 50.755,47.48 C50.766,47.405 50.766,47.32 50.757,47.039 C50.715,45.705 50.921,44.826 51.827,43.834 C52.198,43.429 52.67,43.052 53.262,42.699 C55.404,41.491 56.566,41.298 58.067,42.054 C58.394,42.219 58.748,42.4 59.228,42.646 C59.405,42.737 59.883,42.983 59.996,43.041 C60.268,43.18 60.477,43.288 60.67,43.386 C61.325,43.72 61.749,43.929 61.994,44.036 C62.715,44.352 63.064,44.277 64.481,43.205 C64.604,43.113 64.732,43.005 64.866,42.882 C65.158,42.616 65.45,42.311 65.884,41.829 C66.894,40.71 66.942,40.657 67.302,40.347 C67.992,39.751 69.073,39.589 69.898,39.815 C70.885,40.103 71.51,40.63 71.933,41.481 C72.193,41.864 72.175,41.838 72.254,41.941 Z",
    start: { x: 81.02, y: 41.532, rotation: 257 },
    facts: ["20 turns","5.513 km","Counterclockwise"]
  },
  {
    id: "782",
    label: "Hermanos Rodriguez",
    name: "Autodromo Hermanos Rodriguez",
    location: "Mexico City, Mexico",
    accent: "#48d1a0",
    path: "M71.906,56.219 C71.014,55.837 70.303,55.457 69.732,55.061 C68.905,54.438 68.668,54.138 66.556,51.269 C65.6,49.97 65.075,49.761 63.921,49.832 C63.734,49.844 63.653,49.848 63.547,49.85 C63.528,49.85 62.088,49.851 59.228,49.851 C56.39,49.851 55.037,49.405 54.011,48.159 C53.89,47.931 53.47,47.023 53.362,46.793 C53.166,46.377 53.017,46.076 52.873,45.81 C52.53,45.175 52.208,44.735 51.766,44.311 C51.466,43.94 50.92,43.671 49.86,43.302 C49.776,43.273 49.37,43.134 49.259,43.095 C49.011,43.008 48.82,42.938 48.645,42.868 C47.22,42.293 44.089,41.467 41.649,41.124 C40.045,40.905 37.011,40.755 32.97,40.663 C30.987,40.618 28.868,40.59 26.711,40.575 C25.911,40.569 25.145,40.565 24.418,40.564 C23.925,40.562 23.578,40.562 23.128,40.562 C23,40.562 22.881,40.562 22.673,40.563 C20.249,40.574 19.489,40.499 19.028,39.942 C18.751,39.606 18.692,39.337 18.667,38.693 C18.641,38.049 18.607,37.724 18.47,37.184 C18.141,35.906 18.027,35.44 17.613,33.72 C17.495,33.23 17.417,32.909 17.332,32.566 C17.284,32.374 17.136,31.744 17.108,31.632 C16.859,30.618 16.676,30.307 16.382,30.307 C16.099,30.307 16.008,30.367 15.849,30.648 C15.785,30.763 15.74,30.857 15.591,31.176 C15.143,32.207 14.659,32.431 13.623,32.41 C13.148,32.407 13.056,32.402 11.968,32.335 C11.744,32.321 11.57,32.311 11.402,32.302 C10.528,32.255 9.937,32.249 9.587,32.298 C9.163,32.356 8.892,32.384 8.619,32.397 C8.4,32.408 8.254,32.409 7.73,32.408 C7.581,32.407 7.485,32.407 7.375,32.407 C6.803,32.407 6.426,32.289 6.203,32.001 C6.024,31.77 6,31.585 6.01,31.148 C6.012,30.936 6.012,30.936 6.012,30.695 C6.012,30.558 6.012,30.558 6.012,30.412 C6.012,30.039 6.012,29.825 6.012,29.807 C6.018,29.021 6.438,27.747 7.229,26.419 C8.154,25.125 9.51,24.226 11.122,23.661 C12.294,23.249 13.563,23.045 14.308,23.08 C15.315,23.126 43.815,23.08 45.111,23.032 C45.962,23 47.647,22.921 50.181,22.795 C71.018,22.612 83.125,22.612 86.537,22.796 C90.162,23.063 91.263,23.71 91.263,25.329 L91.263,27.929 C91.263,28.062 91.26,28.173 91.252,28.358 C91.225,28.968 91.249,29.098 91.446,29.298 C91.595,29.449 91.846,29.612 92.235,29.797 C93.671,30.482 94,31.575 93.758,33.065 C93.407,36.091 92.052,40.204 91.216,41.785 C91.135,41.939 90.505,43.298 89.23,46.065 C88.996,46.573 86.107,52.85 85.175,54.872 C81.456,62.94 79.406,67.335 79.05,67.959 C78.774,68.443 78.697,68.726 78.734,68.846 C78.749,68.894 78.808,68.939 79.034,69.045 C79.179,69.114 79.234,69.141 79.29,69.171 C79.173,69.108 81,69.93 81.65,70.358 C82.2,70.72 82.423,71.198 82.316,71.716 C82.243,72.069 82.041,72.379 81.728,72.72 C81.189,73.306 79.092,75.322 77.58,76.673 C76.487,77.388 75.62,77.383 75.045,76.768 C74.654,76.35 74.459,75.683 74.459,75.11 L74.459,59.292 C74.66,57.811 73.854,56.827 71.906,56.219 Z M75.275,59.319 L75.275,75.11 C75.275,75.495 75.413,75.967 75.641,76.21 C75.912,76.499 76.336,76.506 77.059,76.043 C78.551,74.708 80.612,72.727 81.127,72.167 C81.348,71.926 81.481,71.722 81.516,71.55 C81.553,71.375 81.483,71.226 81.203,71.041 C80.616,70.655 78.833,69.852 78.897,69.888 C78.722,69.801 78.722,69.801 78.687,69.784 C78.259,69.583 78.059,69.431 77.953,69.084 C77.834,68.694 77.963,68.216 78.34,67.555 C78.677,66.964 80.757,62.505 84.385,54.635 C85.365,52.509 88.254,46.231 88.488,45.723 C89.794,42.888 90.401,41.579 90.494,41.404 C91.284,39.908 92.608,35.891 92.949,32.952 C93.142,31.762 92.922,31.03 91.884,30.535 C91.416,30.312 91.09,30.101 90.864,29.871 C90.456,29.457 90.4,29.147 90.436,28.323 C90.443,28.149 90.446,28.047 90.446,27.929 L90.446,25.329 C90.446,24.272 89.729,23.85 86.485,23.611 C83.107,23.429 70.999,23.429 50.205,23.611 C47.685,23.737 45.997,23.816 45.141,23.848 C43.824,23.897 15.302,23.943 14.271,23.896 C13.634,23.866 12.469,24.054 11.393,24.431 C9.933,24.944 8.72,25.746 7.922,26.852 C7.206,28.059 6.834,29.19 6.828,29.814 C6.828,29.828 6.828,30.057 6.828,30.412 C6.828,30.558 6.828,30.558 6.828,30.694 C6.828,30.935 6.828,30.935 6.828,31.013 C6.821,31.405 6.83,31.477 6.849,31.501 C6.882,31.544 7.03,31.59 7.375,31.59 C7.486,31.59 7.582,31.59 7.733,31.591 C8.241,31.592 8.38,31.591 8.58,31.582 C8.825,31.57 9.073,31.544 9.475,31.489 C9.895,31.431 10.519,31.436 11.446,31.486 C11.617,31.495 11.793,31.506 12.019,31.52 C13.073,31.585 13.174,31.59 13.418,31.59 C14.377,31.608 14.547,31.53 14.846,30.841 C15.01,30.489 15.058,30.389 15.138,30.248 C15.433,29.722 15.786,29.49 16.382,29.49 C17.227,29.49 17.563,30.06 17.901,31.437 C17.93,31.554 18.078,32.183 18.125,32.369 C18.21,32.714 18.289,33.037 18.394,33.473 C18.82,35.245 18.934,35.708 19.262,36.982 C19.415,37.591 19.455,37.965 19.483,38.661 C19.501,39.135 19.53,39.266 19.658,39.421 C19.868,39.675 20.678,39.756 22.628,39.747 C22.878,39.746 22.998,39.745 23.128,39.745 C23.578,39.745 23.926,39.746 24.42,39.747 C25.149,39.749 25.915,39.752 26.717,39.758 C28.878,39.773 31.001,39.802 32.988,39.847 C37.061,39.939 40.115,40.091 41.761,40.315 C44.268,40.667 47.463,41.511 48.95,42.11 C49.111,42.175 49.291,42.241 49.528,42.324 C49.636,42.362 50.042,42.501 50.128,42.531 C51.326,42.948 51.952,43.253 52.351,43.74 C52.848,44.221 53.215,44.725 53.592,45.422 C53.744,45.703 53.899,46.017 54.101,46.445 C54.202,46.659 54.565,47.445 54.674,47.678 C55.513,48.672 56.643,49.034 59.228,49.034 L63.462,49.034 C63.622,49.032 63.694,49.028 63.87,49.017 C65.286,48.929 66.082,49.247 67.214,50.785 C69.244,53.543 69.495,53.86 70.1,54.319 C70.716,54.749 71.374,55.102 72.17,55.446 C74.44,56.161 75.519,57.473 75.275,59.319 Z",
    shapePath:
      "M71.906,56.219 C71.014,55.837 70.303,55.457 69.732,55.061 C68.905,54.438 68.668,54.138 66.556,51.269 C65.6,49.97 65.075,49.761 63.921,49.832 C63.734,49.844 63.653,49.848 63.547,49.85 C63.528,49.85 62.088,49.851 59.228,49.851 C56.39,49.851 55.037,49.405 54.011,48.159 C53.89,47.931 53.47,47.023 53.362,46.793 C53.166,46.377 53.017,46.076 52.873,45.81 C52.53,45.175 52.208,44.735 51.766,44.311 C51.466,43.94 50.92,43.671 49.86,43.302 C49.776,43.273 49.37,43.134 49.259,43.095 C49.011,43.008 48.82,42.938 48.645,42.868 C47.22,42.293 44.089,41.467 41.649,41.124 C40.045,40.905 37.011,40.755 32.97,40.663 C30.987,40.618 28.868,40.59 26.711,40.575 C25.911,40.569 25.145,40.565 24.418,40.564 C23.925,40.562 23.578,40.562 23.128,40.562 C23,40.562 22.881,40.562 22.673,40.563 C20.249,40.574 19.489,40.499 19.028,39.942 C18.751,39.606 18.692,39.337 18.667,38.693 C18.641,38.049 18.607,37.724 18.47,37.184 C18.141,35.906 18.027,35.44 17.613,33.72 C17.495,33.23 17.417,32.909 17.332,32.566 C17.284,32.374 17.136,31.744 17.108,31.632 C16.859,30.618 16.676,30.307 16.382,30.307 C16.099,30.307 16.008,30.367 15.849,30.648 C15.785,30.763 15.74,30.857 15.591,31.176 C15.143,32.207 14.659,32.431 13.623,32.41 C13.148,32.407 13.056,32.402 11.968,32.335 C11.744,32.321 11.57,32.311 11.402,32.302 C10.528,32.255 9.937,32.249 9.587,32.298 C9.163,32.356 8.892,32.384 8.619,32.397 C8.4,32.408 8.254,32.409 7.73,32.408 C7.581,32.407 7.485,32.407 7.375,32.407 C6.803,32.407 6.426,32.289 6.203,32.001 C6.024,31.77 6,31.585 6.01,31.148 C6.012,30.936 6.012,30.936 6.012,30.695 C6.012,30.558 6.012,30.558 6.012,30.412 C6.012,30.039 6.012,29.825 6.012,29.807 C6.018,29.021 6.438,27.747 7.229,26.419 C8.154,25.125 9.51,24.226 11.122,23.661 C12.294,23.249 13.563,23.045 14.308,23.08 C15.315,23.126 43.815,23.08 45.111,23.032 C45.962,23 47.647,22.921 50.181,22.795 C71.018,22.612 83.125,22.612 86.537,22.796 C90.162,23.063 91.263,23.71 91.263,25.329 L91.263,27.929 C91.263,28.062 91.26,28.173 91.252,28.358 C91.225,28.968 91.249,29.098 91.446,29.298 C91.595,29.449 91.846,29.612 92.235,29.797 C93.671,30.482 94,31.575 93.758,33.065 C93.407,36.091 92.052,40.204 91.216,41.785 C91.135,41.939 90.505,43.298 89.23,46.065 C88.996,46.573 86.107,52.85 85.175,54.872 C81.456,62.94 79.406,67.335 79.05,67.959 C78.774,68.443 78.697,68.726 78.734,68.846 C78.749,68.894 78.808,68.939 79.034,69.045 C79.179,69.114 79.234,69.141 79.29,69.171 C79.173,69.108 81,69.93 81.65,70.358 C82.2,70.72 82.423,71.198 82.316,71.716 C82.243,72.069 82.041,72.379 81.728,72.72 C81.189,73.306 79.092,75.322 77.58,76.673 C76.487,77.388 75.62,77.383 75.045,76.768 C74.654,76.35 74.459,75.683 74.459,75.11 L74.459,59.292 C74.66,57.811 73.854,56.827 71.906,56.219 Z M75.275,59.319 L75.275,75.11 C75.275,75.495 75.413,75.967 75.641,76.21 C75.912,76.499 76.336,76.506 77.059,76.043 C78.551,74.708 80.612,72.727 81.127,72.167 C81.348,71.926 81.481,71.722 81.516,71.55 C81.553,71.375 81.483,71.226 81.203,71.041 C80.616,70.655 78.833,69.852 78.897,69.888 C78.722,69.801 78.722,69.801 78.687,69.784 C78.259,69.583 78.059,69.431 77.953,69.084 C77.834,68.694 77.963,68.216 78.34,67.555 C78.677,66.964 80.757,62.505 84.385,54.635 C85.365,52.509 88.254,46.231 88.488,45.723 C89.794,42.888 90.401,41.579 90.494,41.404 C91.284,39.908 92.608,35.891 92.949,32.952 C93.142,31.762 92.922,31.03 91.884,30.535 C91.416,30.312 91.09,30.101 90.864,29.871 C90.456,29.457 90.4,29.147 90.436,28.323 C90.443,28.149 90.446,28.047 90.446,27.929 L90.446,25.329 C90.446,24.272 89.729,23.85 86.485,23.611 C83.107,23.429 70.999,23.429 50.205,23.611 C47.685,23.737 45.997,23.816 45.141,23.848 C43.824,23.897 15.302,23.943 14.271,23.896 C13.634,23.866 12.469,24.054 11.393,24.431 C9.933,24.944 8.72,25.746 7.922,26.852 C7.206,28.059 6.834,29.19 6.828,29.814 C6.828,29.828 6.828,30.057 6.828,30.412 C6.828,30.558 6.828,30.558 6.828,30.694 C6.828,30.935 6.828,30.935 6.828,31.013 C6.821,31.405 6.83,31.477 6.849,31.501 C6.882,31.544 7.03,31.59 7.375,31.59 C7.486,31.59 7.582,31.59 7.733,31.591 C8.241,31.592 8.38,31.591 8.58,31.582 C8.825,31.57 9.073,31.544 9.475,31.489 C9.895,31.431 10.519,31.436 11.446,31.486 C11.617,31.495 11.793,31.506 12.019,31.52 C13.073,31.585 13.174,31.59 13.418,31.59 C14.377,31.608 14.547,31.53 14.846,30.841 C15.01,30.489 15.058,30.389 15.138,30.248 C15.433,29.722 15.786,29.49 16.382,29.49 C17.227,29.49 17.563,30.06 17.901,31.437 C17.93,31.554 18.078,32.183 18.125,32.369 C18.21,32.714 18.289,33.037 18.394,33.473 C18.82,35.245 18.934,35.708 19.262,36.982 C19.415,37.591 19.455,37.965 19.483,38.661 C19.501,39.135 19.53,39.266 19.658,39.421 C19.868,39.675 20.678,39.756 22.628,39.747 C22.878,39.746 22.998,39.745 23.128,39.745 C23.578,39.745 23.926,39.746 24.42,39.747 C25.149,39.749 25.915,39.752 26.717,39.758 C28.878,39.773 31.001,39.802 32.988,39.847 C37.061,39.939 40.115,40.091 41.761,40.315 C44.268,40.667 47.463,41.511 48.95,42.11 C49.111,42.175 49.291,42.241 49.528,42.324 C49.636,42.362 50.042,42.501 50.128,42.531 C51.326,42.948 51.952,43.253 52.351,43.74 C52.848,44.221 53.215,44.725 53.592,45.422 C53.744,45.703 53.899,46.017 54.101,46.445 C54.202,46.659 54.565,47.445 54.674,47.678 C55.513,48.672 56.643,49.034 59.228,49.034 L63.462,49.034 C63.622,49.032 63.694,49.028 63.87,49.017 C65.286,48.929 66.082,49.247 67.214,50.785 C69.244,53.543 69.495,53.86 70.1,54.319 C70.716,54.749 71.374,55.102 72.17,55.446 C74.44,56.161 75.519,57.473 75.275,59.319 Z",
    start: { x: 71.906, y: 56.219, rotation: -67 },
    facts: ["17 turns","4.304 km","Clockwise"]
  },
  {
    id: "617",
    label: "Jose Carlos Pace",
    name: "Autodromo Jose Carlos Pace",
    location: "Sao Paulo, Brazil",
    accent: "#d96aff",
    path: "M73.18,28.829 C72.519,29.017 67.251,32.175 66.713,32.694 C66.536,32.865 64.984,36.213 64.399,37.246 C64.028,37.902 63.649,38.496 63.238,39.052 C61.467,41.172 58.92,41.365 56.685,40.394 C55.781,39.666 55.247,38.607 55.373,37.54 C55.441,36.965 55.563,36.346 55.738,35.651 C55.862,35.155 56.004,34.654 56.208,33.976 C56.214,33.954 56.491,33.039 56.565,32.788 C56.692,32.358 56.786,32.019 56.862,31.714 C57.05,30.95 56.844,30.656 56.249,30.561 C55.737,30.48 55.024,30.583 54.329,30.783 C53.337,31.069 51.732,31.596 50.167,32.19 C47.813,33.084 45.864,34.005 44.585,34.898 C43.553,35.618 42.993,36.638 42.805,37.92 C42.667,38.858 42.73,39.826 42.935,40.985 C42.969,41.177 43.089,41.801 43.109,41.917 C43.239,42.689 43.318,43.078 43.456,43.549 C43.789,44.683 44.293,45.44 45.054,45.784 C45.458,45.966 46.106,46.287 47.18,46.833 C47.367,46.928 49.576,48.056 50.271,48.409 C50.387,48.467 50.5,48.524 50.611,48.58 C52.627,49.598 54.075,50.298 55.081,50.724 C57.573,51.78 62.439,53.462 68.306,55.329 C70.361,56.198 71.879,57.363 72.984,58.776 C73.615,59.582 74.086,60.434 74.453,61.353 C74.592,61.7 74.71,62.042 74.827,62.42 C74.884,62.604 75.039,63.135 75.063,63.211 C75.36,64.176 75.445,65.926 75.44,69.114 C75.44,69.446 75.439,69.725 75.436,70.293 C75.433,71.033 75.432,71.326 75.432,71.7 C75.432,73.202 74.731,74.374 73.546,75.169 C72.635,75.779 71.466,76.124 70.565,76.124 C70.394,76.124 70.262,76.124 70.068,76.124 C69.783,76.124 69.47,76.125 69.124,76.125 C68.194,76.125 67.154,76.126 66.006,76.127 C62.847,76.13 59.38,76.137 55.675,76.147 C45.308,76.174 34.931,76.224 25.161,76.302 C21.804,76.183 20.658,76.08 19.308,75.682 C17.718,75.213 16.344,74.348 14.579,72.709 C12.308,70.206 11.568,68.198 11.218,64.951 C11.005,62.976 11.655,59.386 12.406,57.117 C12.496,56.83 12.384,56.586 11.983,56.252 C11.566,55.905 8.703,54.296 7.918,53.773 C6,52.38 6.322,50.687 8.239,48.635 C9.429,47.361 10.731,46.324 12.317,45.216 C13.238,44.573 49.38,25.107 50.314,24.817 C50.837,24.655 53.401,24.547 59.472,24.38 C60.257,24.358 63.236,24.278 62.997,24.284 C67.161,24.172 69.57,24.096 71.587,24.007 C78.579,23.698 79.068,23.775 82.032,25.693 C84.733,27.263 87.428,30.382 89.936,34.429 C91.68,37.244 93.292,40.536 93.616,41.681 C93.906,42.492 94,42.931 94,43.608 C94,44.222 93.605,48.049 93.327,50.324 C93.146,51.397 92.969,51.791 92.366,52.314 C92.329,52.342 92.148,52.47 92.084,52.515 C91.969,52.597 91.866,52.668 91.766,52.737 C91.368,53.005 91.138,53.147 90.972,53.223 C90.413,53.48 89.766,53.599 88.831,53.599 C87.444,53.599 78.862,50.763 75.127,49.281 C73.923,48.803 73.295,48.243 72.642,47.195 C72.505,46.975 72.013,46.13 71.963,46.046 C71.658,45.535 71.373,45.096 71.034,44.63 C69.974,42.694 70.306,40.337 71.253,38.603 C71.803,37.597 73.531,34.552 74.08,33.625 C74.304,33.181 74.419,32.99 75.144,31.814 C75.243,31.653 75.322,31.524 75.397,31.4 C76.222,30.037 76.582,29.186 76.502,28.661 C75.896,28.131 74.539,28.271 73.18,28.829 Z M55.673,75.345 C59.378,75.335 62.846,75.329 66.005,75.325 C67.154,75.324 68.194,75.323 69.123,75.323 C69.47,75.323 69.783,75.322 70.068,75.322 C70.262,75.322 70.394,75.322 70.565,75.322 C71.31,75.322 72.322,75.023 73.099,74.502 C74.073,73.849 74.63,72.918 74.63,71.7 C74.63,71.324 74.631,71.03 74.634,70.29 C74.637,69.722 74.638,69.443 74.638,69.113 C74.643,66.031 74.559,64.299 74.296,63.448 C74.27,63.364 74.115,62.833 74.06,62.656 C73.95,62.298 73.838,61.976 73.709,61.651 C73.368,60.799 72.933,60.012 72.353,59.271 C71.334,57.968 69.931,56.89 68.045,56.087 C62.163,54.216 57.288,52.53 54.768,51.462 C53.741,51.027 52.281,50.322 50.25,49.296 C50.139,49.24 50.025,49.183 49.909,49.124 C49.212,48.771 47.003,47.643 46.816,47.548 C45.755,47.008 45.113,46.69 44.724,46.515 C43.707,46.056 43.078,45.111 42.686,43.775 C42.537,43.265 42.454,42.853 42.318,42.051 C42.3,41.945 42.181,41.326 42.145,41.125 C41.926,39.888 41.858,38.843 42.011,37.804 C42.23,36.315 42.9,35.096 44.126,34.24 C45.471,33.3 47.472,32.356 49.882,31.44 C51.469,30.838 53.095,30.304 54.107,30.012 C54.906,29.782 55.718,29.665 56.375,29.769 C57.424,29.936 57.943,30.677 57.64,31.906 C57.562,32.225 57.465,32.575 57.335,33.015 C57.259,33.269 56.982,34.187 56.976,34.207 C56.776,34.874 56.637,35.364 56.515,35.846 C56.348,36.511 56.233,37.097 56.169,37.634 C56.081,38.383 56.467,39.171 57.058,39.681 C58.987,40.499 61.132,40.321 62.607,38.557 C62.983,38.048 63.345,37.481 63.701,36.852 C64.178,36.008 64.486,35.378 65.156,33.932 C65.713,32.731 65.908,32.356 66.156,32.117 C66.779,31.516 72.046,28.356 72.892,28.081 C74.596,27.384 76.283,27.235 77.162,28.186 L77.254,28.351 C77.484,29.176 77.089,30.153 76.084,31.815 C76.007,31.941 75.927,32.072 75.827,32.234 C75.112,33.394 75.003,33.576 74.79,33.999 C74.241,34.926 72.505,37.985 71.957,38.988 C71.131,40.5 70.836,42.575 71.698,44.18 C72.046,44.659 72.34,45.112 72.652,45.635 C72.707,45.728 73.194,46.563 73.323,46.771 C73.89,47.681 74.387,48.125 75.423,48.536 C79.024,49.965 87.596,52.797 88.831,52.797 C89.658,52.797 90.193,52.699 90.637,52.494 C90.751,52.442 90.955,52.317 91.219,52.139 C91.41,52.009 91.51,51.939 91.622,51.86 C91.674,51.823 91.808,51.728 91.855,51.695 C92.282,51.322 92.385,51.087 92.534,50.209 C92.803,47.998 93.198,44.173 93.198,43.608 C93.198,43.033 93.122,42.678 92.856,41.938 C92.557,40.865 90.97,37.619 89.255,34.852 C86.81,30.907 84.19,27.875 81.612,26.376 C78.805,24.56 78.463,24.506 71.623,24.808 C69.599,24.898 67.187,24.973 63.019,25.086 C63.257,25.08 60.279,25.16 59.494,25.181 C53.735,25.34 50.959,25.457 50.552,25.583 C49.708,25.844 13.635,45.274 12.777,45.874 C11.234,46.952 9.967,47.96 8.825,49.182 C7.191,50.931 6.97,52.093 8.375,53.115 C9.093,53.592 12.012,55.233 12.496,55.635 C13.122,56.156 13.375,56.71 13.169,57.363 C12.449,59.538 11.818,63.029 12.016,64.865 C12.348,67.952 13.029,69.803 15.137,72.133 C16.812,73.687 18.081,74.484 19.535,74.913 C20.794,75.284 21.903,75.384 25.163,75.5 C34.932,75.422 45.307,75.372 55.673,75.345 Z",
    shapePath:
      "M73.18,28.829 C72.519,29.017 67.251,32.175 66.713,32.694 C66.536,32.865 64.984,36.213 64.399,37.246 C64.028,37.902 63.649,38.496 63.238,39.052 C61.467,41.172 58.92,41.365 56.685,40.394 C55.781,39.666 55.247,38.607 55.373,37.54 C55.441,36.965 55.563,36.346 55.738,35.651 C55.862,35.155 56.004,34.654 56.208,33.976 C56.214,33.954 56.491,33.039 56.565,32.788 C56.692,32.358 56.786,32.019 56.862,31.714 C57.05,30.95 56.844,30.656 56.249,30.561 C55.737,30.48 55.024,30.583 54.329,30.783 C53.337,31.069 51.732,31.596 50.167,32.19 C47.813,33.084 45.864,34.005 44.585,34.898 C43.553,35.618 42.993,36.638 42.805,37.92 C42.667,38.858 42.73,39.826 42.935,40.985 C42.969,41.177 43.089,41.801 43.109,41.917 C43.239,42.689 43.318,43.078 43.456,43.549 C43.789,44.683 44.293,45.44 45.054,45.784 C45.458,45.966 46.106,46.287 47.18,46.833 C47.367,46.928 49.576,48.056 50.271,48.409 C50.387,48.467 50.5,48.524 50.611,48.58 C52.627,49.598 54.075,50.298 55.081,50.724 C57.573,51.78 62.439,53.462 68.306,55.329 C70.361,56.198 71.879,57.363 72.984,58.776 C73.615,59.582 74.086,60.434 74.453,61.353 C74.592,61.7 74.71,62.042 74.827,62.42 C74.884,62.604 75.039,63.135 75.063,63.211 C75.36,64.176 75.445,65.926 75.44,69.114 C75.44,69.446 75.439,69.725 75.436,70.293 C75.433,71.033 75.432,71.326 75.432,71.7 C75.432,73.202 74.731,74.374 73.546,75.169 C72.635,75.779 71.466,76.124 70.565,76.124 C70.394,76.124 70.262,76.124 70.068,76.124 C69.783,76.124 69.47,76.125 69.124,76.125 C68.194,76.125 67.154,76.126 66.006,76.127 C62.847,76.13 59.38,76.137 55.675,76.147 C45.308,76.174 34.931,76.224 25.161,76.302 C21.804,76.183 20.658,76.08 19.308,75.682 C17.718,75.213 16.344,74.348 14.579,72.709 C12.308,70.206 11.568,68.198 11.218,64.951 C11.005,62.976 11.655,59.386 12.406,57.117 C12.496,56.83 12.384,56.586 11.983,56.252 C11.566,55.905 8.703,54.296 7.918,53.773 C6,52.38 6.322,50.687 8.239,48.635 C9.429,47.361 10.731,46.324 12.317,45.216 C13.238,44.573 49.38,25.107 50.314,24.817 C50.837,24.655 53.401,24.547 59.472,24.38 C60.257,24.358 63.236,24.278 62.997,24.284 C67.161,24.172 69.57,24.096 71.587,24.007 C78.579,23.698 79.068,23.775 82.032,25.693 C84.733,27.263 87.428,30.382 89.936,34.429 C91.68,37.244 93.292,40.536 93.616,41.681 C93.906,42.492 94,42.931 94,43.608 C94,44.222 93.605,48.049 93.327,50.324 C93.146,51.397 92.969,51.791 92.366,52.314 C92.329,52.342 92.148,52.47 92.084,52.515 C91.969,52.597 91.866,52.668 91.766,52.737 C91.368,53.005 91.138,53.147 90.972,53.223 C90.413,53.48 89.766,53.599 88.831,53.599 C87.444,53.599 78.862,50.763 75.127,49.281 C73.923,48.803 73.295,48.243 72.642,47.195 C72.505,46.975 72.013,46.13 71.963,46.046 C71.658,45.535 71.373,45.096 71.034,44.63 C69.974,42.694 70.306,40.337 71.253,38.603 C71.803,37.597 73.531,34.552 74.08,33.625 C74.304,33.181 74.419,32.99 75.144,31.814 C75.243,31.653 75.322,31.524 75.397,31.4 C76.222,30.037 76.582,29.186 76.502,28.661 C75.896,28.131 74.539,28.271 73.18,28.829 Z M55.673,75.345 C59.378,75.335 62.846,75.329 66.005,75.325 C67.154,75.324 68.194,75.323 69.123,75.323 C69.47,75.323 69.783,75.322 70.068,75.322 C70.262,75.322 70.394,75.322 70.565,75.322 C71.31,75.322 72.322,75.023 73.099,74.502 C74.073,73.849 74.63,72.918 74.63,71.7 C74.63,71.324 74.631,71.03 74.634,70.29 C74.637,69.722 74.638,69.443 74.638,69.113 C74.643,66.031 74.559,64.299 74.296,63.448 C74.27,63.364 74.115,62.833 74.06,62.656 C73.95,62.298 73.838,61.976 73.709,61.651 C73.368,60.799 72.933,60.012 72.353,59.271 C71.334,57.968 69.931,56.89 68.045,56.087 C62.163,54.216 57.288,52.53 54.768,51.462 C53.741,51.027 52.281,50.322 50.25,49.296 C50.139,49.24 50.025,49.183 49.909,49.124 C49.212,48.771 47.003,47.643 46.816,47.548 C45.755,47.008 45.113,46.69 44.724,46.515 C43.707,46.056 43.078,45.111 42.686,43.775 C42.537,43.265 42.454,42.853 42.318,42.051 C42.3,41.945 42.181,41.326 42.145,41.125 C41.926,39.888 41.858,38.843 42.011,37.804 C42.23,36.315 42.9,35.096 44.126,34.24 C45.471,33.3 47.472,32.356 49.882,31.44 C51.469,30.838 53.095,30.304 54.107,30.012 C54.906,29.782 55.718,29.665 56.375,29.769 C57.424,29.936 57.943,30.677 57.64,31.906 C57.562,32.225 57.465,32.575 57.335,33.015 C57.259,33.269 56.982,34.187 56.976,34.207 C56.776,34.874 56.637,35.364 56.515,35.846 C56.348,36.511 56.233,37.097 56.169,37.634 C56.081,38.383 56.467,39.171 57.058,39.681 C58.987,40.499 61.132,40.321 62.607,38.557 C62.983,38.048 63.345,37.481 63.701,36.852 C64.178,36.008 64.486,35.378 65.156,33.932 C65.713,32.731 65.908,32.356 66.156,32.117 C66.779,31.516 72.046,28.356 72.892,28.081 C74.596,27.384 76.283,27.235 77.162,28.186 L77.254,28.351 C77.484,29.176 77.089,30.153 76.084,31.815 C76.007,31.941 75.927,32.072 75.827,32.234 C75.112,33.394 75.003,33.576 74.79,33.999 C74.241,34.926 72.505,37.985 71.957,38.988 C71.131,40.5 70.836,42.575 71.698,44.18 C72.046,44.659 72.34,45.112 72.652,45.635 C72.707,45.728 73.194,46.563 73.323,46.771 C73.89,47.681 74.387,48.125 75.423,48.536 C79.024,49.965 87.596,52.797 88.831,52.797 C89.658,52.797 90.193,52.699 90.637,52.494 C90.751,52.442 90.955,52.317 91.219,52.139 C91.41,52.009 91.51,51.939 91.622,51.86 C91.674,51.823 91.808,51.728 91.855,51.695 C92.282,51.322 92.385,51.087 92.534,50.209 C92.803,47.998 93.198,44.173 93.198,43.608 C93.198,43.033 93.122,42.678 92.856,41.938 C92.557,40.865 90.97,37.619 89.255,34.852 C86.81,30.907 84.19,27.875 81.612,26.376 C78.805,24.56 78.463,24.506 71.623,24.808 C69.599,24.898 67.187,24.973 63.019,25.086 C63.257,25.08 60.279,25.16 59.494,25.181 C53.735,25.34 50.959,25.457 50.552,25.583 C49.708,25.844 13.635,45.274 12.777,45.874 C11.234,46.952 9.967,47.96 8.825,49.182 C7.191,50.931 6.97,52.093 8.375,53.115 C9.093,53.592 12.012,55.233 12.496,55.635 C13.122,56.156 13.375,56.71 13.169,57.363 C12.449,59.538 11.818,63.029 12.016,64.865 C12.348,67.952 13.029,69.803 15.137,72.133 C16.812,73.687 18.081,74.484 19.535,74.913 C20.794,75.284 21.903,75.384 25.163,75.5 C34.932,75.422 45.307,75.372 55.673,75.345 Z",
    start: { x: 73.18, y: 28.829, rotation: 254 },
    facts: ["15 turns","4.309 km","Counterclockwise"]
  },
  {
    id: "4250",
    label: "Las Vegas Street",
    name: "Las Vegas Street Circuit",
    location: "Nevada, USA",
    accent: "#b36bff",
    path: "M91.106,76.536 L40.921,76.536 C39.494,76.536 36.615,76.368 35.56,76.14 C34.914,75.999 33.799,75.637 32.719,75.284 C32.013,75.057 31.348,74.841 30.899,74.716 C29.338,74.279 26.606,73.012 22.544,70.842 C18.701,68.79 14.658,66.13 12.241,64.541 C11.526,64.073 10.964,63.705 10.558,63.449 C9.584,62.824 7.717,61.919 7.14,61.919 A1.049,1.049 0 0,1 6.312,61.606 C6.069,61.316 6,60.867 6.119,60.23 C6.119,60.173 7.308,54.351 8.635,53.124 C10.059,51.806 13.346,50.47 15.32,49.683 C15.997,49.411 16.568,49.177 16.762,49.059 C19.538,47.441 21.498,45.968 21.47,41.712 C21.451,38.637 21.501,34.079 21.536,30.754 C21.564,28.702 21.564,26.898 21.564,26.723 A1.002,1.002 0 0,1 21.817,25.868 C22.129,25.583 22.61,25.624 23.041,25.699 C23.624,25.802 24.602,26.011 25.482,26.189 C26.184,26.333 26.978,26.501 27.121,26.517 L27.184,26.517 C27.38,26.517 27.539,26.539 27.608,26.033 C27.742,25.071 28.748,25.096 29.481,25.096 L29.825,25.096 C30.993,25.096 34.424,25.612 36.238,27.972 C37.852,30.07 37.836,31.693 37.824,33.261 L37.824,33.698 C37.824,34.25 37.824,34.947 37.824,35.652 C37.824,37.082 37.824,38.562 37.824,38.946 L37.824,39.084 C37.874,39.986 37.88,40.123 39.135,40.111 C41.008,40.092 77.091,39.389 77.453,39.383 C78.667,39.365 80.55,39.265 80.937,39.096 L81.218,38.984 C82.033,38.671 84.203,37.8 84.671,36.486 C85.208,34.959 84.946,34.332 84.112,32.739 A9.026,9.026 0 0,0 83.525,31.881 C82.76,30.835 81.711,29.402 81.777,28.24 C81.821,27.454 81.746,26.055 81.711,25.377 C81.711,25.168 81.693,25.025 81.693,24.981 S81.693,24.94 81.693,24.915 C81.693,24.672 81.64,23.932 82.317,23.729 C83.204,23.464 83.897,24.441 84.406,25.153 C84.54,25.34 84.662,25.515 84.755,25.618 C85.211,26.117 90.625,33.604 91.281,34.506 C91.574,34.869 93.813,37.654 93.909,39.093 C94,40.46 93.909,42.764 93.909,42.861 L93.71,71.672 C93.735,73.093 93.628,73.183 93.494,73.299 C93.416,73.361 93.294,73.455 93.138,73.57 A8.901,8.901 0 0,0 92.227,74.31 L92.227,75.431 C92.149,75.846 91.811,76.536 91.106,76.536 Z M22.366,26.47 A0.74,0.74 0 0,0 22.366,26.654 C22.366,26.842 22.366,28.125 22.341,30.772 C22.307,34.094 22.257,38.65 22.279,41.719 C22.307,46.402 20.093,48.072 17.168,49.771 A16.507,16.507 0 0,1 15.607,50.436 C13.696,51.204 10.493,52.49 9.181,53.704 C8.279,54.538 7.136,59.09 6.912,60.355 C6.815,60.913 6.912,61.054 6.927,61.066 S6.99,61.107 7.133,61.107 C8.07,61.107 10.287,62.318 10.986,62.762 C11.398,63.021 11.963,63.386 12.681,63.864 C15.082,65.447 19.107,68.091 22.919,70.127 C26.871,72.237 29.628,73.517 31.108,73.933 C31.573,74.064 32.248,74.282 32.959,74.513 C33.971,74.841 35.117,75.213 35.723,75.347 C36.712,75.562 39.553,75.722 40.912,75.722 L91.106,75.722 C91.278,75.722 91.393,75.409 91.418,75.284 L91.418,74.198 C91.418,73.886 91.696,73.614 92.667,72.902 L92.892,72.734 C92.914,72.528 92.92,72.05 92.914,71.66 L93.113,42.827 C93.113,42.789 93.201,40.454 93.113,39.127 C93.045,38.116 91.318,35.799 90.659,34.994 L90.644,34.975 C88.218,31.619 84.493,26.498 84.172,26.145 A6.613,6.613 0 0,1 83.759,25.605 C83.447,25.181 82.892,24.391 82.564,24.488 C82.498,24.506 82.501,24.694 82.511,24.853 C82.511,24.893 82.511,24.931 82.511,24.962 S82.511,25.131 82.529,25.318 C82.564,26.005 82.642,27.435 82.595,28.265 S83.532,30.488 84.187,31.387 A9.366,9.366 0 0,1 84.837,32.346 C85.708,34.004 86.085,34.881 85.442,36.739 C84.852,38.415 82.52,39.34 81.524,39.736 L81.265,39.839 C80.587,40.129 77.99,40.183 77.475,40.192 C77.112,40.192 41.036,40.901 39.148,40.919 S37.081,40.254 37.018,39.124 L37.018,38.987 C36.993,38.578 37,37.151 37.018,35.64 C37.018,34.937 37.018,34.241 37.018,33.692 C37.018,33.551 37.018,33.411 37.018,33.27 C37.018,31.772 37.043,30.357 35.601,28.484 C33.987,26.383 30.886,25.924 29.831,25.924 L29.469,25.924 C28.657,25.908 28.442,25.955 28.414,26.149 C28.336,26.717 28.055,27.397 27.14,27.335 L27.102,27.335 C26.99,27.335 26.721,27.282 25.313,26.988 C24.449,26.81 23.468,26.604 22.897,26.505 A1.361,1.361 0 0,0 22.366,26.47 Z M92.876,72.812 Z",
    shapePath:
      "M91.106,76.536 L40.921,76.536 C39.494,76.536 36.615,76.368 35.56,76.14 C34.914,75.999 33.799,75.637 32.719,75.284 C32.013,75.057 31.348,74.841 30.899,74.716 C29.338,74.279 26.606,73.012 22.544,70.842 C18.701,68.79 14.658,66.13 12.241,64.541 C11.526,64.073 10.964,63.705 10.558,63.449 C9.584,62.824 7.717,61.919 7.14,61.919 A1.049,1.049 0 0,1 6.312,61.606 C6.069,61.316 6,60.867 6.119,60.23 C6.119,60.173 7.308,54.351 8.635,53.124 C10.059,51.806 13.346,50.47 15.32,49.683 C15.997,49.411 16.568,49.177 16.762,49.059 C19.538,47.441 21.498,45.968 21.47,41.712 C21.451,38.637 21.501,34.079 21.536,30.754 C21.564,28.702 21.564,26.898 21.564,26.723 A1.002,1.002 0 0,1 21.817,25.868 C22.129,25.583 22.61,25.624 23.041,25.699 C23.624,25.802 24.602,26.011 25.482,26.189 C26.184,26.333 26.978,26.501 27.121,26.517 L27.184,26.517 C27.38,26.517 27.539,26.539 27.608,26.033 C27.742,25.071 28.748,25.096 29.481,25.096 L29.825,25.096 C30.993,25.096 34.424,25.612 36.238,27.972 C37.852,30.07 37.836,31.693 37.824,33.261 L37.824,33.698 C37.824,34.25 37.824,34.947 37.824,35.652 C37.824,37.082 37.824,38.562 37.824,38.946 L37.824,39.084 C37.874,39.986 37.88,40.123 39.135,40.111 C41.008,40.092 77.091,39.389 77.453,39.383 C78.667,39.365 80.55,39.265 80.937,39.096 L81.218,38.984 C82.033,38.671 84.203,37.8 84.671,36.486 C85.208,34.959 84.946,34.332 84.112,32.739 A9.026,9.026 0 0,0 83.525,31.881 C82.76,30.835 81.711,29.402 81.777,28.24 C81.821,27.454 81.746,26.055 81.711,25.377 C81.711,25.168 81.693,25.025 81.693,24.981 S81.693,24.94 81.693,24.915 C81.693,24.672 81.64,23.932 82.317,23.729 C83.204,23.464 83.897,24.441 84.406,25.153 C84.54,25.34 84.662,25.515 84.755,25.618 C85.211,26.117 90.625,33.604 91.281,34.506 C91.574,34.869 93.813,37.654 93.909,39.093 C94,40.46 93.909,42.764 93.909,42.861 L93.71,71.672 C93.735,73.093 93.628,73.183 93.494,73.299 C93.416,73.361 93.294,73.455 93.138,73.57 A8.901,8.901 0 0,0 92.227,74.31 L92.227,75.431 C92.149,75.846 91.811,76.536 91.106,76.536 Z M22.366,26.47 A0.74,0.74 0 0,0 22.366,26.654 C22.366,26.842 22.366,28.125 22.341,30.772 C22.307,34.094 22.257,38.65 22.279,41.719 C22.307,46.402 20.093,48.072 17.168,49.771 A16.507,16.507 0 0,1 15.607,50.436 C13.696,51.204 10.493,52.49 9.181,53.704 C8.279,54.538 7.136,59.09 6.912,60.355 C6.815,60.913 6.912,61.054 6.927,61.066 S6.99,61.107 7.133,61.107 C8.07,61.107 10.287,62.318 10.986,62.762 C11.398,63.021 11.963,63.386 12.681,63.864 C15.082,65.447 19.107,68.091 22.919,70.127 C26.871,72.237 29.628,73.517 31.108,73.933 C31.573,74.064 32.248,74.282 32.959,74.513 C33.971,74.841 35.117,75.213 35.723,75.347 C36.712,75.562 39.553,75.722 40.912,75.722 L91.106,75.722 C91.278,75.722 91.393,75.409 91.418,75.284 L91.418,74.198 C91.418,73.886 91.696,73.614 92.667,72.902 L92.892,72.734 C92.914,72.528 92.92,72.05 92.914,71.66 L93.113,42.827 C93.113,42.789 93.201,40.454 93.113,39.127 C93.045,38.116 91.318,35.799 90.659,34.994 L90.644,34.975 C88.218,31.619 84.493,26.498 84.172,26.145 A6.613,6.613 0 0,1 83.759,25.605 C83.447,25.181 82.892,24.391 82.564,24.488 C82.498,24.506 82.501,24.694 82.511,24.853 C82.511,24.893 82.511,24.931 82.511,24.962 S82.511,25.131 82.529,25.318 C82.564,26.005 82.642,27.435 82.595,28.265 S83.532,30.488 84.187,31.387 A9.366,9.366 0 0,1 84.837,32.346 C85.708,34.004 86.085,34.881 85.442,36.739 C84.852,38.415 82.52,39.34 81.524,39.736 L81.265,39.839 C80.587,40.129 77.99,40.183 77.475,40.192 C77.112,40.192 41.036,40.901 39.148,40.919 S37.081,40.254 37.018,39.124 L37.018,38.987 C36.993,38.578 37,37.151 37.018,35.64 C37.018,34.937 37.018,34.241 37.018,33.692 C37.018,33.551 37.018,33.411 37.018,33.27 C37.018,31.772 37.043,30.357 35.601,28.484 C33.987,26.383 30.886,25.924 29.831,25.924 L29.469,25.924 C28.657,25.908 28.442,25.955 28.414,26.149 C28.336,26.717 28.055,27.397 27.14,27.335 L27.102,27.335 C26.99,27.335 26.721,27.282 25.313,26.988 C24.449,26.81 23.468,26.604 22.897,26.505 A1.361,1.361 0 0,0 22.366,26.47 Z M92.876,72.812 Z",
    start: { x: 91.106, y: 76.536, rotation: 270 },
    facts: ["17 turns","6.116 km","Counterclockwise"]
  },
  {
    id: "4211",
    label: "Losail",
    name: "Losail International Circuit",
    location: "Lusail, Qatar",
    accent: "#6ad7e5",
    path: "M87.189,81.671 C86.395,81.671 85.833,81.623 85.719,81.612 L19.049,81.612 C17.19,81.612 13.729,81.612 12.914,77.663 C12.131,73.824 17.275,71.601 17.741,71.414 C20.28,70.058 25.158,67.446 25.574,67.193 C26.106,66.862 26.992,65.83 26.922,64.048 S25.239,61.223 23.671,60.437 C22.223,59.702 17.311,57.219 16.69,56.885 A7.347,7.347 0 0,1 14.81,55.415 A20.97,20.97 0 0,1 13.123,51.547 C12.976,50.996 11.147,45.922 9.53,41.448 C7.12,34.765 6.661,33.472 6.639,33.299 C6.639,33.263 6.595,33.134 6.566,33.031 C6.382,32.385 6,31.044 6.36,29.703 C6.65,28.634 7.462,27.785 8.792,27.179 L8.865,27.146 C9.097,27.028 14.123,25.217 14.685,25.125 L14.868,25.089 A3.626,3.626 0 0,1 18.009,25.647 C19.229,26.551 19.633,27.701 19.956,28.623 C20.004,28.762 20.052,28.898 20.103,29.027 C20.28,29.501 21.205,32.135 21.984,34.258 C23.086,37.307 24.229,40.54 24.229,40.54 S24.964,42.686 26.297,42.59 C27.8,42.48 28.064,40.952 28.134,39.633 C28.134,39.57 28.134,39.512 28.134,39.467 C28.175,38.803 29.997,23.119 30.074,22.455 C30.125,22.146 30.57,19.618 32.028,18.957 C33.391,18.344 34.537,18.329 35.944,18.509 C37.822,18.748 38.439,20.015 38.795,21.224 A14.978,14.978 0 0,1 39.163,23.23 A10.771,10.771 0 0,0 39.475,24.872 A25.804,25.804 0 0,0 41.154,28.421 C41.407,28.759 43.681,31.767 45.162,33.002 L45.683,33.428 C46.885,34.416 47.755,35.125 47.84,36.367 A9.508,9.508 0 0,1 47.399,39.743 C47.296,40.11 47.072,40.941 46.811,41.91 C46.297,43.821 45.709,45.988 45.577,46.403 C45.272,47.322 44.967,49.372 45.654,49.952 C46.532,50.687 47.234,51.12 49.614,50.757 A13.663,13.663 0 0,0 53.905,49.251 C55.044,48.582 56.969,47.414 57.292,47.12 C57.428,46.999 57.619,46.848 57.865,46.657 A17.05,17.05 0 0,0 62.042,42.304 A55.965,55.965 0 0,0 66.363,33.424 C66.73,32.227 68.049,28.873 68.104,28.733 L69.574,24.743 C69.607,24.67 70.466,22.906 71.778,22.3 L72.002,22.197 A7.909,7.909 0 0,1 75.793,21.308 C77.053,21.283 78.986,21.308 80.396,21.308 C81.201,21.308 81.891,21.308 82.233,21.308 C82.968,21.308 84.437,21.536 85.367,22.473 S87.123,25.213 87.222,25.434 C87.457,25.849 90.484,31.257 90.73,31.745 L90.822,31.925 C91.157,32.561 91.855,33.887 91.399,34.934 A13.505,13.505 0 0,1 89.525,37.917 C88.952,38.652 80.488,49.052 80.077,49.555 C79.088,50.764 78.941,51.444 78.941,51.76 C78.941,52.539 79.548,53.935 80.382,55.066 C81.37,56.429 91.77,72.068 92.226,72.733 L92.226,72.755 C92.362,72.99 93.559,75.073 93.754,75.745 C94,76.583 93.842,78.122 93.071,79.419 A3.758,3.758 0 0,1 90.701,81.289 A16.139,16.139 0 0,1 87.189,81.671 Z M7.536,33.145 C7.642,33.512 9.034,37.388 10.386,41.124 C12.084,45.838 13.843,50.709 14.001,51.297 A21.587,21.587 0 0,0 15.533,54.853 A6.682,6.682 0 0,0 17.117,56.084 C17.734,56.414 22.627,58.905 24.075,59.625 C25.177,60.172 27.73,61.462 27.829,64.034 C27.936,66.741 26.242,67.865 26.047,67.983 C25.507,68.317 18.447,72.083 18.149,72.244 L18.105,72.266 C18.053,72.285 13.145,74.313 13.803,77.483 S17.223,80.709 19.049,80.709 L85.771,80.709 A17.266,17.266 0 0,0 90.492,80.429 A2.91,2.91 0 0,0 92.284,78.986 C92.894,77.946 93.067,76.653 92.88,76.006 A24.886,24.886 0 0,0 91.443,73.236 C91.098,72.711 80.595,56.943 79.628,55.602 S78.016,52.726 78.016,51.745 C78.016,51.01 78.468,50.07 79.357,48.986 C79.764,48.483 88.218,38.105 88.791,37.366 A12.513,12.513 0 0,0 90.547,34.578 C90.83,33.928 90.268,32.862 89.999,32.352 C89.959,32.278 89.926,32.212 89.9,32.157 C89.705,31.771 87.527,27.873 86.403,25.867 L86.384,25.831 S85.543,23.957 84.706,23.119 C83.971,22.385 82.766,22.219 82.229,22.223 C81.895,22.223 81.23,22.223 80.393,22.223 C78.986,22.223 77.057,22.201 75.811,22.223 A7.039,7.039 0 0,0 72.38,23.024 L72.156,23.127 C71.197,23.56 70.481,24.945 70.396,25.118 L68.96,29.053 C68.96,29.097 67.601,32.524 67.237,33.692 A57.17,57.17 0 0,1 62.829,42.792 A17.939,17.939 0 0,1 58.42,47.377 C58.189,47.553 58.009,47.693 57.902,47.788 C57.399,48.248 54.673,49.849 54.361,50.033 A14.375,14.375 0 0,1 49.747,51.657 C47.23,52.024 46.234,51.635 45.066,50.647 C43.652,49.449 44.699,46.146 44.699,46.113 C44.827,45.724 45.456,43.384 45.915,41.675 C46.176,40.702 46.403,39.857 46.506,39.497 A8.732,8.732 0 0,0 46.903,36.433 C46.844,35.614 46.301,35.136 45.066,34.133 L44.541,33.7 C42.98,32.399 40.647,29.313 40.386,28.964 C39.956,28.391 38.869,25.974 38.589,25.173 A11.234,11.234 0 0,1 38.222,23.358 A13.938,13.938 0 0,0 37.855,21.481 C37.568,20.32 37.113,19.585 35.816,19.409 S33.564,19.255 32.388,19.776 C31.525,20.166 31.066,21.922 30.959,22.568 C30.305,28.193 29.06,39.001 29.027,39.512 C29.027,39.556 29.027,39.603 29.027,39.662 C28.917,42.079 28.02,43.365 26.36,43.483 C24.328,43.637 23.421,40.941 23.366,40.823 L23.366,40.823 S22.216,37.598 21.125,34.552 S19.387,29.706 19.247,29.335 C19.196,29.199 19.148,29.06 19.097,28.913 C18.785,28.024 18.461,27.102 17.466,26.363 A2.741,2.741 0 0,0 15.07,25.963 L14.854,26.007 C14.398,26.084 9.626,27.789 9.284,27.947 L9.189,27.991 C8.792,28.171 7.58,28.726 7.256,29.923 C6.959,31.025 7.286,32.157 7.458,32.767 A3.306,3.306 0 0,1 7.536,33.145 Z",
    shapePath:
      "M87.189,81.671 C86.395,81.671 85.833,81.623 85.719,81.612 L19.049,81.612 C17.19,81.612 13.729,81.612 12.914,77.663 C12.131,73.824 17.275,71.601 17.741,71.414 C20.28,70.058 25.158,67.446 25.574,67.193 C26.106,66.862 26.992,65.83 26.922,64.048 S25.239,61.223 23.671,60.437 C22.223,59.702 17.311,57.219 16.69,56.885 A7.347,7.347 0 0,1 14.81,55.415 A20.97,20.97 0 0,1 13.123,51.547 C12.976,50.996 11.147,45.922 9.53,41.448 C7.12,34.765 6.661,33.472 6.639,33.299 C6.639,33.263 6.595,33.134 6.566,33.031 C6.382,32.385 6,31.044 6.36,29.703 C6.65,28.634 7.462,27.785 8.792,27.179 L8.865,27.146 C9.097,27.028 14.123,25.217 14.685,25.125 L14.868,25.089 A3.626,3.626 0 0,1 18.009,25.647 C19.229,26.551 19.633,27.701 19.956,28.623 C20.004,28.762 20.052,28.898 20.103,29.027 C20.28,29.501 21.205,32.135 21.984,34.258 C23.086,37.307 24.229,40.54 24.229,40.54 S24.964,42.686 26.297,42.59 C27.8,42.48 28.064,40.952 28.134,39.633 C28.134,39.57 28.134,39.512 28.134,39.467 C28.175,38.803 29.997,23.119 30.074,22.455 C30.125,22.146 30.57,19.618 32.028,18.957 C33.391,18.344 34.537,18.329 35.944,18.509 C37.822,18.748 38.439,20.015 38.795,21.224 A14.978,14.978 0 0,1 39.163,23.23 A10.771,10.771 0 0,0 39.475,24.872 A25.804,25.804 0 0,0 41.154,28.421 C41.407,28.759 43.681,31.767 45.162,33.002 L45.683,33.428 C46.885,34.416 47.755,35.125 47.84,36.367 A9.508,9.508 0 0,1 47.399,39.743 C47.296,40.11 47.072,40.941 46.811,41.91 C46.297,43.821 45.709,45.988 45.577,46.403 C45.272,47.322 44.967,49.372 45.654,49.952 C46.532,50.687 47.234,51.12 49.614,50.757 A13.663,13.663 0 0,0 53.905,49.251 C55.044,48.582 56.969,47.414 57.292,47.12 C57.428,46.999 57.619,46.848 57.865,46.657 A17.05,17.05 0 0,0 62.042,42.304 A55.965,55.965 0 0,0 66.363,33.424 C66.73,32.227 68.049,28.873 68.104,28.733 L69.574,24.743 C69.607,24.67 70.466,22.906 71.778,22.3 L72.002,22.197 A7.909,7.909 0 0,1 75.793,21.308 C77.053,21.283 78.986,21.308 80.396,21.308 C81.201,21.308 81.891,21.308 82.233,21.308 C82.968,21.308 84.437,21.536 85.367,22.473 S87.123,25.213 87.222,25.434 C87.457,25.849 90.484,31.257 90.73,31.745 L90.822,31.925 C91.157,32.561 91.855,33.887 91.399,34.934 A13.505,13.505 0 0,1 89.525,37.917 C88.952,38.652 80.488,49.052 80.077,49.555 C79.088,50.764 78.941,51.444 78.941,51.76 C78.941,52.539 79.548,53.935 80.382,55.066 C81.37,56.429 91.77,72.068 92.226,72.733 L92.226,72.755 C92.362,72.99 93.559,75.073 93.754,75.745 C94,76.583 93.842,78.122 93.071,79.419 A3.758,3.758 0 0,1 90.701,81.289 A16.139,16.139 0 0,1 87.189,81.671 Z M7.536,33.145 C7.642,33.512 9.034,37.388 10.386,41.124 C12.084,45.838 13.843,50.709 14.001,51.297 A21.587,21.587 0 0,0 15.533,54.853 A6.682,6.682 0 0,0 17.117,56.084 C17.734,56.414 22.627,58.905 24.075,59.625 C25.177,60.172 27.73,61.462 27.829,64.034 C27.936,66.741 26.242,67.865 26.047,67.983 C25.507,68.317 18.447,72.083 18.149,72.244 L18.105,72.266 C18.053,72.285 13.145,74.313 13.803,77.483 S17.223,80.709 19.049,80.709 L85.771,80.709 A17.266,17.266 0 0,0 90.492,80.429 A2.91,2.91 0 0,0 92.284,78.986 C92.894,77.946 93.067,76.653 92.88,76.006 A24.886,24.886 0 0,0 91.443,73.236 C91.098,72.711 80.595,56.943 79.628,55.602 S78.016,52.726 78.016,51.745 C78.016,51.01 78.468,50.07 79.357,48.986 C79.764,48.483 88.218,38.105 88.791,37.366 A12.513,12.513 0 0,0 90.547,34.578 C90.83,33.928 90.268,32.862 89.999,32.352 C89.959,32.278 89.926,32.212 89.9,32.157 C89.705,31.771 87.527,27.873 86.403,25.867 L86.384,25.831 S85.543,23.957 84.706,23.119 C83.971,22.385 82.766,22.219 82.229,22.223 C81.895,22.223 81.23,22.223 80.393,22.223 C78.986,22.223 77.057,22.201 75.811,22.223 A7.039,7.039 0 0,0 72.38,23.024 L72.156,23.127 C71.197,23.56 70.481,24.945 70.396,25.118 L68.96,29.053 C68.96,29.097 67.601,32.524 67.237,33.692 A57.17,57.17 0 0,1 62.829,42.792 A17.939,17.939 0 0,1 58.42,47.377 C58.189,47.553 58.009,47.693 57.902,47.788 C57.399,48.248 54.673,49.849 54.361,50.033 A14.375,14.375 0 0,1 49.747,51.657 C47.23,52.024 46.234,51.635 45.066,50.647 C43.652,49.449 44.699,46.146 44.699,46.113 C44.827,45.724 45.456,43.384 45.915,41.675 C46.176,40.702 46.403,39.857 46.506,39.497 A8.732,8.732 0 0,0 46.903,36.433 C46.844,35.614 46.301,35.136 45.066,34.133 L44.541,33.7 C42.98,32.399 40.647,29.313 40.386,28.964 C39.956,28.391 38.869,25.974 38.589,25.173 A11.234,11.234 0 0,1 38.222,23.358 A13.938,13.938 0 0,0 37.855,21.481 C37.568,20.32 37.113,19.585 35.816,19.409 S33.564,19.255 32.388,19.776 C31.525,20.166 31.066,21.922 30.959,22.568 C30.305,28.193 29.06,39.001 29.027,39.512 C29.027,39.556 29.027,39.603 29.027,39.662 C28.917,42.079 28.02,43.365 26.36,43.483 C24.328,43.637 23.421,40.941 23.366,40.823 L23.366,40.823 S22.216,37.598 21.125,34.552 S19.387,29.706 19.247,29.335 C19.196,29.199 19.148,29.06 19.097,28.913 C18.785,28.024 18.461,27.102 17.466,26.363 A2.741,2.741 0 0,0 15.07,25.963 L14.854,26.007 C14.398,26.084 9.626,27.789 9.284,27.947 L9.189,27.991 C8.792,28.171 7.58,28.726 7.256,29.923 C6.959,31.025 7.286,32.157 7.458,32.767 A3.306,3.306 0 0,1 7.536,33.145 Z",
    start: { x: 87.189, y: 81.671, rotation: 270 },
    facts: ["16 turns","5.38 km","Clockwise"]
  },
  {
    id: "744",
    label: "Yas Marina Circuit",
    name: "Yas Marina Circuit",
    location: "Abu Dhabi, United Arab Emirates",
    accent: "#f2c94c",
    path: "M50.146,54.288 C48.253,55.502 47.136,55.285 46.245,53.991 C45.836,53.399 41.784,45.346 33.937,29.54 C33.699,28.893 33.393,28.435 33.003,28.118 C32.112,27.795 31.17,27.861 30.598,28.397 C30.447,28.541 30.079,28.927 29.456,29.594 C29.121,29.952 27.751,31.424 27.526,31.666 C25.84,33.473 24.883,34.475 24.436,34.879 C24.073,35.209 23.954,35.647 24.026,36.18 C24.077,36.557 24.211,36.914 24.361,37.198 C25.02,38.441 29.376,46.881 29.543,47.29 C29.665,47.592 29.766,48.062 29.928,48.987 C29.927,48.981 30.013,49.473 30.036,49.605 C30.076,49.828 30.108,49.999 30.138,50.145 C30.33,51.081 29.827,51.698 29.038,51.951 C28.906,51.993 27.238,52.632 26.803,52.793 C26.693,52.834 26.586,52.874 26.482,52.912 C25.772,53.172 25.193,53.37 24.745,53.501 C23.864,53.913 23.355,53.706 22.857,53.04 C22.637,52.749 22.462,52.413 22.178,51.814 C22.03,51.503 21.448,50.244 21.368,50.074 C21.306,49.941 21.248,49.817 21.192,49.698 C21.032,49.36 20.889,49.066 20.757,48.804 C20.471,48.237 20.234,48.011 20.077,47.994 C19.443,48.54 17.229,50.014 15.86,50.596 C14.771,50.988 14.189,51.739 13.777,53.022 C13.676,53.251 13.569,53.657 13.417,54.354 C13.407,54.399 13.071,55.98 12.958,56.475 C12.848,56.96 12.744,57.384 12.638,57.769 C12.426,58.54 12.38,59.259 12.465,59.888 C12.527,60.343 12.659,60.715 12.761,60.848 C12.843,60.955 13.13,61.515 13.827,62.908 C14.102,63.456 15.491,66.243 15.873,67.006 C17.68,70.618 18.715,72.622 18.979,72.985 C19.379,73.535 19.426,74.077 19.156,74.527 C18.966,74.844 18.633,75.078 18.316,75.181 C18.155,75.233 17.97,75.294 17.737,75.372 C17.395,75.487 17.031,75.613 16.653,75.749 C15.625,76.117 14.637,76.5 13.755,76.885 C12.062,77.623 11.43,77.634 10.853,76.835 C10.749,76.691 10.692,76.597 10.47,76.217 C10.086,75.217 9.878,75.165 8.022,75.39 C6.851,75.532 6.206,75.217 6.042,74.532 C6.007,74.387 6,74.277 6,74.078 C6,73.282 6.114,71.433 6.318,69.688 C7.027,63.612 7.513,59.605 7.59,59.22 C7.694,58.79 7.799,58.373 7.904,57.965 C8.279,56.512 8.666,55.17 9.116,53.746 C9.606,52.197 12.444,44.006 13.557,40.6 C14.742,36.975 16.351,34.122 18.297,31.915 C20.248,29.703 21.843,28.658 24.433,27.413 C24.605,27.331 24.748,27.249 24.864,27.169 C25.196,26.94 25.281,26.766 25.239,26.539 C25.199,26.323 25.167,26.262 24.724,25.515 C24.483,25.109 24.336,24.816 24.229,24.488 C23.966,23.683 24.091,23.076 24.567,22.723 C24.884,22.486 25.27,22.411 25.734,22.411 C25.472,22.411 35.86,22.399 42.863,22.392 C48.485,22.386 53.921,22.382 59.045,22.379 C79.333,22.366 91.635,22.374 92.35,22.411 C93.52,22.473 94,23.316 93.855,24.564 C93.734,25.608 92.575,26.284 91.238,26.468 C89.635,26.472 89.182,26.452 87.408,26.301 C86.295,26.162 86.089,26.268 86.163,27.091 C86.581,28.85 86.354,29.495 85.273,30.057 C84.968,30.204 84.036,30.634 80.066,32.464 C77.352,33.715 76.04,34.321 75.299,34.667 C73.295,35.603 69.795,36.105 66.966,35.886 C64.355,35.684 63.115,36.144 61.193,38.031 C60.328,38.88 60.081,39.82 60.063,41.77 C60.061,42.098 60.061,42.465 60.063,42.91 C60.064,43.122 60.066,43.32 60.068,43.647 C60.079,44.924 60.079,45.305 60.064,45.586 C60.064,46.491 59.998,47.013 59.705,47.647 C59.432,48.237 58.992,48.748 58.357,49.169 C58.119,49.297 54.687,51.543 53.552,52.258 C53.286,52.425 53.028,52.586 52.777,52.742 C51.785,53.355 50.907,53.873 50.146,54.288 Z M46.895,53.543 C47.545,54.486 48.186,54.609 49.73,53.615 C50.505,53.192 51.375,52.679 52.361,52.07 C52.611,51.915 52.867,51.755 53.13,51.589 C54.204,50.913 57.544,48.728 57.931,48.503 C58.438,48.164 58.778,47.768 58.987,47.315 C59.219,46.814 59.273,46.383 59.273,45.592 C59.289,45.287 59.288,44.901 59.278,43.654 C59.275,43.326 59.274,43.127 59.273,42.915 C59.27,42.466 59.27,42.095 59.273,41.763 C59.292,39.622 59.587,38.499 60.639,37.467 C62.724,35.422 64.187,34.878 67.027,35.098 C69.729,35.307 73.094,34.825 74.965,33.951 C75.707,33.604 77.019,32.998 79.73,31.748 C83.682,29.927 84.631,29.489 84.919,29.35 C85.642,28.974 85.737,28.7 85.388,27.247 C85.239,25.717 85.949,25.323 87.49,25.515 C89.217,25.662 89.652,25.681 91.156,25.681 C92.164,25.536 93.004,25.041 93.07,24.473 C93.168,23.626 92.945,23.234 92.308,23.201 C91.617,23.164 79.197,23.156 59.046,23.169 C53.922,23.172 48.485,23.177 42.864,23.182 C35.861,23.189 25.472,23.201 25.734,23.201 C25.427,23.201 25.183,23.248 25.038,23.356 C24.866,23.485 24.814,23.734 24.98,24.242 C25.065,24.503 25.19,24.752 25.403,25.112 C25.924,25.99 25.951,26.04 26.016,26.396 C26.118,26.948 25.888,27.423 25.313,27.82 C25.16,27.925 24.982,28.026 24.776,28.125 C22.272,29.328 20.756,30.322 18.89,32.438 C17.016,34.563 15.46,37.321 14.308,40.846 C13.191,44.262 10.356,52.448 9.87,53.984 C9.423,55.395 9.04,56.724 8.669,58.162 C8.565,58.567 8.462,58.98 8.362,59.39 C8.295,59.725 7.803,63.787 7.103,69.779 C6.903,71.495 6.79,73.314 6.79,74.068 C6.79,74.217 6.794,74.281 6.81,74.348 C6.867,74.584 7.114,74.704 7.927,74.606 C9.169,74.455 9.452,74.437 9.895,74.547 C10.487,74.695 10.881,75.101 11.169,75.846 C11.361,76.175 11.414,76.261 11.494,76.373 C11.781,76.771 12.05,76.766 13.439,76.161 C14.34,75.768 15.343,75.378 16.386,75.005 C16.77,74.868 17.138,74.74 17.485,74.623 C17.721,74.544 17.91,74.481 18.073,74.429 C18.221,74.381 18.396,74.258 18.478,74.121 C18.578,73.955 18.56,73.753 18.34,73.45 C18.035,73.03 17.029,71.083 15.233,67.493 C14.784,66.596 13.395,63.809 13.12,63.261 C12.528,62.078 12.165,61.37 12.134,61.329 C11.645,60.692 11.436,59.158 11.876,57.56 C11.978,57.187 12.08,56.774 12.188,56.3 C12.299,55.812 12.634,54.235 12.645,54.185 C12.806,53.447 12.918,53.02 13.031,52.76 C13.512,51.277 14.244,50.338 15.571,49.86 C16.283,49.558 17.134,49.069 18.013,48.484 C18.614,48.083 19.237,47.623 19.314,47.545 C19.398,47.46 19.481,47.39 19.593,47.328 C19.765,47.232 19.958,47.185 20.165,47.208 C20.643,47.262 21.07,47.667 21.463,48.449 C21.598,48.717 21.743,49.017 21.906,49.36 C21.963,49.48 22.022,49.605 22.084,49.739 C22.165,49.912 22.746,51.168 22.892,51.476 C23.146,52.011 23.313,52.333 23.391,52.435 C23.789,52.967 23.921,53.019 24.434,52.774 C24.925,52.626 25.5,52.43 26.21,52.17 C26.313,52.132 26.419,52.093 26.528,52.053 C26.94,51.9 28.64,51.248 28.797,51.198 C29.24,51.056 29.462,50.784 29.364,50.303 C29.332,50.15 29.299,49.972 29.258,49.743 C29.234,49.609 29.148,49.117 29.15,49.124 C29,48.271 28.902,47.814 28.811,47.588 C28.66,47.217 24.296,38.763 23.663,37.568 C23.472,37.209 23.308,36.77 23.243,36.286 C23.138,35.514 23.328,34.817 23.906,34.293 C24.328,33.911 25.285,32.91 26.888,31.191 C27.173,30.886 28.543,29.413 28.879,29.054 C29.517,28.371 29.886,27.983 30.056,27.822 C30.898,27.033 32.178,26.957 33.34,27.4 C33.973,27.869 34.377,28.455 34.655,29.208 C42.392,44.793 46.523,53.003 46.895,53.543 Z",
    shapePath:
      "M50.146,54.288 C48.253,55.502 47.136,55.285 46.245,53.991 C45.836,53.399 41.784,45.346 33.937,29.54 C33.699,28.893 33.393,28.435 33.003,28.118 C32.112,27.795 31.17,27.861 30.598,28.397 C30.447,28.541 30.079,28.927 29.456,29.594 C29.121,29.952 27.751,31.424 27.526,31.666 C25.84,33.473 24.883,34.475 24.436,34.879 C24.073,35.209 23.954,35.647 24.026,36.18 C24.077,36.557 24.211,36.914 24.361,37.198 C25.02,38.441 29.376,46.881 29.543,47.29 C29.665,47.592 29.766,48.062 29.928,48.987 C29.927,48.981 30.013,49.473 30.036,49.605 C30.076,49.828 30.108,49.999 30.138,50.145 C30.33,51.081 29.827,51.698 29.038,51.951 C28.906,51.993 27.238,52.632 26.803,52.793 C26.693,52.834 26.586,52.874 26.482,52.912 C25.772,53.172 25.193,53.37 24.745,53.501 C23.864,53.913 23.355,53.706 22.857,53.04 C22.637,52.749 22.462,52.413 22.178,51.814 C22.03,51.503 21.448,50.244 21.368,50.074 C21.306,49.941 21.248,49.817 21.192,49.698 C21.032,49.36 20.889,49.066 20.757,48.804 C20.471,48.237 20.234,48.011 20.077,47.994 C19.443,48.54 17.229,50.014 15.86,50.596 C14.771,50.988 14.189,51.739 13.777,53.022 C13.676,53.251 13.569,53.657 13.417,54.354 C13.407,54.399 13.071,55.98 12.958,56.475 C12.848,56.96 12.744,57.384 12.638,57.769 C12.426,58.54 12.38,59.259 12.465,59.888 C12.527,60.343 12.659,60.715 12.761,60.848 C12.843,60.955 13.13,61.515 13.827,62.908 C14.102,63.456 15.491,66.243 15.873,67.006 C17.68,70.618 18.715,72.622 18.979,72.985 C19.379,73.535 19.426,74.077 19.156,74.527 C18.966,74.844 18.633,75.078 18.316,75.181 C18.155,75.233 17.97,75.294 17.737,75.372 C17.395,75.487 17.031,75.613 16.653,75.749 C15.625,76.117 14.637,76.5 13.755,76.885 C12.062,77.623 11.43,77.634 10.853,76.835 C10.749,76.691 10.692,76.597 10.47,76.217 C10.086,75.217 9.878,75.165 8.022,75.39 C6.851,75.532 6.206,75.217 6.042,74.532 C6.007,74.387 6,74.277 6,74.078 C6,73.282 6.114,71.433 6.318,69.688 C7.027,63.612 7.513,59.605 7.59,59.22 C7.694,58.79 7.799,58.373 7.904,57.965 C8.279,56.512 8.666,55.17 9.116,53.746 C9.606,52.197 12.444,44.006 13.557,40.6 C14.742,36.975 16.351,34.122 18.297,31.915 C20.248,29.703 21.843,28.658 24.433,27.413 C24.605,27.331 24.748,27.249 24.864,27.169 C25.196,26.94 25.281,26.766 25.239,26.539 C25.199,26.323 25.167,26.262 24.724,25.515 C24.483,25.109 24.336,24.816 24.229,24.488 C23.966,23.683 24.091,23.076 24.567,22.723 C24.884,22.486 25.27,22.411 25.734,22.411 C25.472,22.411 35.86,22.399 42.863,22.392 C48.485,22.386 53.921,22.382 59.045,22.379 C79.333,22.366 91.635,22.374 92.35,22.411 C93.52,22.473 94,23.316 93.855,24.564 C93.734,25.608 92.575,26.284 91.238,26.468 C89.635,26.472 89.182,26.452 87.408,26.301 C86.295,26.162 86.089,26.268 86.163,27.091 C86.581,28.85 86.354,29.495 85.273,30.057 C84.968,30.204 84.036,30.634 80.066,32.464 C77.352,33.715 76.04,34.321 75.299,34.667 C73.295,35.603 69.795,36.105 66.966,35.886 C64.355,35.684 63.115,36.144 61.193,38.031 C60.328,38.88 60.081,39.82 60.063,41.77 C60.061,42.098 60.061,42.465 60.063,42.91 C60.064,43.122 60.066,43.32 60.068,43.647 C60.079,44.924 60.079,45.305 60.064,45.586 C60.064,46.491 59.998,47.013 59.705,47.647 C59.432,48.237 58.992,48.748 58.357,49.169 C58.119,49.297 54.687,51.543 53.552,52.258 C53.286,52.425 53.028,52.586 52.777,52.742 C51.785,53.355 50.907,53.873 50.146,54.288 Z M46.895,53.543 C47.545,54.486 48.186,54.609 49.73,53.615 C50.505,53.192 51.375,52.679 52.361,52.07 C52.611,51.915 52.867,51.755 53.13,51.589 C54.204,50.913 57.544,48.728 57.931,48.503 C58.438,48.164 58.778,47.768 58.987,47.315 C59.219,46.814 59.273,46.383 59.273,45.592 C59.289,45.287 59.288,44.901 59.278,43.654 C59.275,43.326 59.274,43.127 59.273,42.915 C59.27,42.466 59.27,42.095 59.273,41.763 C59.292,39.622 59.587,38.499 60.639,37.467 C62.724,35.422 64.187,34.878 67.027,35.098 C69.729,35.307 73.094,34.825 74.965,33.951 C75.707,33.604 77.019,32.998 79.73,31.748 C83.682,29.927 84.631,29.489 84.919,29.35 C85.642,28.974 85.737,28.7 85.388,27.247 C85.239,25.717 85.949,25.323 87.49,25.515 C89.217,25.662 89.652,25.681 91.156,25.681 C92.164,25.536 93.004,25.041 93.07,24.473 C93.168,23.626 92.945,23.234 92.308,23.201 C91.617,23.164 79.197,23.156 59.046,23.169 C53.922,23.172 48.485,23.177 42.864,23.182 C35.861,23.189 25.472,23.201 25.734,23.201 C25.427,23.201 25.183,23.248 25.038,23.356 C24.866,23.485 24.814,23.734 24.98,24.242 C25.065,24.503 25.19,24.752 25.403,25.112 C25.924,25.99 25.951,26.04 26.016,26.396 C26.118,26.948 25.888,27.423 25.313,27.82 C25.16,27.925 24.982,28.026 24.776,28.125 C22.272,29.328 20.756,30.322 18.89,32.438 C17.016,34.563 15.46,37.321 14.308,40.846 C13.191,44.262 10.356,52.448 9.87,53.984 C9.423,55.395 9.04,56.724 8.669,58.162 C8.565,58.567 8.462,58.98 8.362,59.39 C8.295,59.725 7.803,63.787 7.103,69.779 C6.903,71.495 6.79,73.314 6.79,74.068 C6.79,74.217 6.794,74.281 6.81,74.348 C6.867,74.584 7.114,74.704 7.927,74.606 C9.169,74.455 9.452,74.437 9.895,74.547 C10.487,74.695 10.881,75.101 11.169,75.846 C11.361,76.175 11.414,76.261 11.494,76.373 C11.781,76.771 12.05,76.766 13.439,76.161 C14.34,75.768 15.343,75.378 16.386,75.005 C16.77,74.868 17.138,74.74 17.485,74.623 C17.721,74.544 17.91,74.481 18.073,74.429 C18.221,74.381 18.396,74.258 18.478,74.121 C18.578,73.955 18.56,73.753 18.34,73.45 C18.035,73.03 17.029,71.083 15.233,67.493 C14.784,66.596 13.395,63.809 13.12,63.261 C12.528,62.078 12.165,61.37 12.134,61.329 C11.645,60.692 11.436,59.158 11.876,57.56 C11.978,57.187 12.08,56.774 12.188,56.3 C12.299,55.812 12.634,54.235 12.645,54.185 C12.806,53.447 12.918,53.02 13.031,52.76 C13.512,51.277 14.244,50.338 15.571,49.86 C16.283,49.558 17.134,49.069 18.013,48.484 C18.614,48.083 19.237,47.623 19.314,47.545 C19.398,47.46 19.481,47.39 19.593,47.328 C19.765,47.232 19.958,47.185 20.165,47.208 C20.643,47.262 21.07,47.667 21.463,48.449 C21.598,48.717 21.743,49.017 21.906,49.36 C21.963,49.48 22.022,49.605 22.084,49.739 C22.165,49.912 22.746,51.168 22.892,51.476 C23.146,52.011 23.313,52.333 23.391,52.435 C23.789,52.967 23.921,53.019 24.434,52.774 C24.925,52.626 25.5,52.43 26.21,52.17 C26.313,52.132 26.419,52.093 26.528,52.053 C26.94,51.9 28.64,51.248 28.797,51.198 C29.24,51.056 29.462,50.784 29.364,50.303 C29.332,50.15 29.299,49.972 29.258,49.743 C29.234,49.609 29.148,49.117 29.15,49.124 C29,48.271 28.902,47.814 28.811,47.588 C28.66,47.217 24.296,38.763 23.663,37.568 C23.472,37.209 23.308,36.77 23.243,36.286 C23.138,35.514 23.328,34.817 23.906,34.293 C24.328,33.911 25.285,32.91 26.888,31.191 C27.173,30.886 28.543,29.413 28.879,29.054 C29.517,28.371 29.886,27.983 30.056,27.822 C30.898,27.033 32.178,26.957 33.34,27.4 C33.973,27.869 34.377,28.455 34.655,29.208 C42.392,44.793 46.523,53.003 46.895,53.543 Z",
    start: { x: 50.146, y: 54.288, rotation: 237 },
    facts: ["21 turns","5.554 km","Counterclockwise"]
  }
];

const F1_CIRCUIT_MAP_LOOKUP = new Map(F1_CIRCUIT_MAPS.map((map) => [map.id, map]));

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

function f1StandingsEndpoint(season: number) {
  return `https://site.web.api.espn.com/apis/v2/sports/racing/f1/standings?region=us&lang=en&contentorigin=espn&season=${season}`;
}

function f1EventEndpoint(id: string) {
  return `${F1_CORE_BASE}/events/${id}?lang=en&region=us`;
}

function f1CircuitEndpoint(id: string) {
  return `${F1_CORE_BASE}/circuits/${id}?lang=en&region=us`;
}

function f1EventId(event?: EspnF1CalendarEvent | F1CalendarRow | EspnF1Event | null) {
  if (!event) {
    return "";
  }
  if ("id" in event && event.id) {
    return event.id;
  }
  if ("event" in event) {
    return idFromRef(event.event);
  }
  return "";
}

function f1Calendar(scoreboard: EspnF1Scoreboard): F1CalendarRow[] {
  const activeEventId = scoreboard.events?.[0]?.id;
  return (scoreboard.leagues?.[0]?.calendar ?? [])
    .map((event) => {
      const id = f1EventId(event);
      return {
        id,
        name: event.label ?? "Formula 1 Grand Prix",
        startDate: event.startDate,
        endDate: event.endDate,
        status: f1CalendarStatus(event, activeEventId)
      };
    })
    .filter((event) => event.id);
}

function getF1CircuitMap(circuitId?: string | null) {
  return circuitId ? F1_CIRCUIT_MAP_LOOKUP.get(circuitId) ?? null : null;
}

function f1SnapshotCircuitId(snapshot: F1Snapshot) {
  return (
    snapshot.circuit?.id ||
    idFromRef(snapshot.detail?.circuit ?? undefined) ||
    snapshot.calendar.find((event) => event.id === snapshot.event?.id)?.circuitId ||
    snapshot.nextEvent?.circuitId
  );
}

function f1CalendarStatus(event: EspnF1CalendarEvent, activeEventId?: string): F1CalendarRow["status"] {
  const now = Date.now();
  const id = f1EventId(event);
  const start = event.startDate ? new Date(event.startDate).getTime() : 0;
  const end = event.endDate ? new Date(event.endDate).getTime() : start;
  if (id && activeEventId && id === activeEventId) {
    return "current";
  }
  if (start && end && now >= localDayStart(start) && now <= localDayEnd(end)) {
    return "current";
  }
  return end && end < localDayStart(now) ? "completed" : "upcoming";
}

function f1NextCalendarEvent(calendar: F1CalendarRow[], now = Date.now()) {
  return calendar
    .filter((event) => event.status === "current" || (event.startDate && new Date(event.startDate).getTime() >= localDayStart(now)))
    .sort((a, b) => new Date(a.startDate ?? "").getTime() - new Date(b.startDate ?? "").getTime())[0];
}

function f1EventFromCalendar(event?: F1CalendarRow): EspnF1Event | null {
  if (!event) {
    return null;
  }
  return {
    id: event.id,
    name: event.name,
    shortName: event.name,
    date: event.startDate,
    endDate: event.endDate,
    status: {
      type: {
        name: event.status === "completed" ? "STATUS_FINAL" : "STATUS_SCHEDULED",
        state: event.status === "completed" ? "post" : "pre",
        description: event.status === "completed" ? "Final" : "Scheduled"
      }
    },
    competitions: []
  };
}

function chooseF1Event(scoreboard: EspnF1Scoreboard, calendar: F1CalendarRow[]) {
  const live = (scoreboard.events ?? []).find((event) => f1Sessions(event).some((session) => session.state === "in"));
  if (live) {
    return live;
  }
  const current = scoreboard.events?.[0];
  if (current) {
    return current;
  }
  return f1EventFromCalendar(f1NextCalendarEvent(calendar));
}

function f1CompetitionState(competition?: EspnF1Competition) {
  return competition?.status && !isEspnRef(competition.status) ? competition.status.type?.state ?? "" : "";
}

function f1CompetitionStatus(competition?: EspnF1Competition) {
  return competition?.status && !isEspnRef(competition.status)
    ? competition.status.type?.shortDetail ?? competition.status.type?.detail ?? competition.status.type?.description ?? ""
    : "";
}

function f1SessionLabel(competition: EspnF1Competition) {
  const abbreviation = competition.type?.abbreviation ?? "";
  return (
    {
      FP1: "Practice 1",
      FP2: "Practice 2",
      FP3: "Practice 3",
      SS: "Sprint Shootout",
      SR: "Sprint Race",
      Qual: "Qualifying",
      Race: "Race"
    }[abbreviation] ??
    competition.type?.text ??
    abbreviation ??
    "Session"
  );
}

function f1Sessions(event?: EspnF1Event | null): F1SessionRow[] {
  return [...(event?.competitions ?? [])]
    .sort((a, b) => new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime())
    .map((competition) => ({
      id: competition.id ?? `${competition.type?.abbreviation ?? "session"}-${competition.date ?? ""}`,
      label: f1SessionLabel(competition),
      date: competition.date,
      state: f1CompetitionState(competition),
      status: f1CompetitionStatus(competition),
      competitors: [...(competition.competitors ?? [])].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    }));
}

function chooseF1Session(sessions: F1SessionRow[], now = Date.now()) {
  return (
    sessions.find((session) => session.state === "in") ??
    sessions.find((session) => session.state === "pre" && (session.date ? new Date(session.date).getTime() >= now - 30 * 60 * 1000 : true)) ??
    sessions
      .filter((session) => session.state === "post")
      .sort((a, b) => new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime())[0] ??
    sessions[0] ??
    null
  );
}

function f1StandingGroup(standings: EspnF1Standings, name: string) {
  return standings.children?.find((group) => group.name?.toLowerCase().includes(name) || group.abbreviation?.toLowerCase().includes(name));
}

function f1StandingStat(entry: EspnF1StandingEntry, ...names: string[]) {
  const normalized = names.map((name) => name.toLowerCase());
  return (
    entry.stats?.find((stat) =>
      normalized.some((name) => [stat.name, stat.abbreviation, stat.displayName, stat.label].some((value) => value?.toLowerCase() === name))
    )?.displayValue ?? ""
  );
}

function f1TeamColorMap(teams: EspnF1Teams) {
  const map = new Map<string, string>();
  teams.sports?.[0]?.leagues?.[0]?.teams?.forEach((entry) => {
    const team = entry.team;
    if (!team?.color) {
      return;
    }
    [team.id, team.displayName, team.abbreviation, team.slug].forEach((key) => {
      if (key) {
        map.set(key.toLowerCase(), team.color ?? "");
      }
    });
  });
  return map;
}

function f1DriverRows(standings: EspnF1Standings): F1StandingRow[] {
  const group = f1StandingGroup(standings, "driver");
  return (group?.standings?.entries ?? []).map((entry, index) => ({
    id: entry.athlete?.id ?? String(index + 1),
    rank: f1StandingStat(entry, "rank", "rk") || String(index + 1),
    name: entry.athlete?.displayName ?? entry.athlete?.fullName ?? "Driver TBD",
    points: f1StandingStat(entry, "championshipPts", "points", "pts") || "0",
    flag: entry.athlete?.flag?.href,
    country: entry.athlete?.flag?.alt
  }));
}

function f1ConstructorRows(standings: EspnF1Standings, teams: EspnF1Teams): F1StandingRow[] {
  const group = f1StandingGroup(standings, "constructor");
  const colors = f1TeamColorMap(teams);
  return (group?.standings?.entries ?? []).map((entry, index) => {
    const team = entry.team;
    const color = team?.color ?? colors.get((team?.displayName ?? "").toLowerCase()) ?? colors.get((team?.name ?? "").toLowerCase());
    return {
      id: team?.id ?? String(index + 1),
      rank: f1StandingStat(entry, "rank", "rk") || String(index + 1),
      name: team?.displayName ?? team?.name ?? "Constructor TBD",
      points: f1StandingStat(entry, "points", "pts") || "0",
      color
    };
  });
}

function f1CircuitName(circuit?: EspnF1Circuit | null) {
  return circuit?.fullName ?? circuit?.displayName ?? circuit?.name ?? "Circuit TBD";
}

function f1CircuitLocation(circuit?: EspnF1Circuit | null) {
  const address = circuit?.address;
  return [address?.city, address?.state || address?.country].filter(Boolean).join(", ") || "Location TBD";
}

async function loadF1EventDetail(id?: string) {
  return id ? fetchJson<EspnF1CoreEvent>(f1EventEndpoint(id)) : null;
}

async function loadF1Circuit(detail?: EspnF1CoreEvent | null) {
  return detail?.circuit ? fetchEspnRef<EspnF1Circuit>(detail.circuit) : null;
}

async function loadF1CalendarCircuitIds(calendar: F1CalendarRow[]) {
  const entries = await Promise.all(
    calendar.map(async (event) => {
      const detail = await loadF1EventDetail(event.id).catch(() => null);
      return [event.id, idFromRef(detail?.circuit ?? undefined)] as const;
    })
  );
  return new Map(entries.filter((entry): entry is [string, string] => Boolean(entry[1])));
}

async function loadF1CuratedCircuits() {
  const entries = await Promise.all(
    F1_CIRCUIT_MAPS.map(async (map) => {
      const circuit = await fetchJson<EspnF1Circuit>(f1CircuitEndpoint(map.id)).catch(() => null);
      return [map.id, circuit] as const;
    })
  );
  return new Map(entries.filter((entry): entry is [string, EspnF1Circuit] => Boolean(entry[1])));
}

async function loadF1Snapshot() {
  const scoreboard = await fetchJson<EspnF1Scoreboard>(F1_SCOREBOARD_ENDPOINT);
  const season = scoreboard.leagues?.[0]?.season?.year ?? new Date().getFullYear();
  const [standings, teams, news] = await Promise.all([
    fetchJson<EspnF1Standings>(f1StandingsEndpoint(season)).catch(() => ({})),
    fetchJson<EspnF1Teams>(F1_TEAMS_ENDPOINT).catch(() => ({})),
    fetchJson<EspnF1News>(F1_NEWS_ENDPOINT).catch(() => null)
  ]);
  const calendar = f1Calendar(scoreboard);
  const event = chooseF1Event(scoreboard, calendar);
  const sessions = f1Sessions(event);
  const [detail, calendarCircuitIds, curatedCircuits] = await Promise.all([
    loadF1EventDetail(event?.id).catch(() => null),
    loadF1CalendarCircuitIds(calendar).catch(() => new Map<string, string>()),
    loadF1CuratedCircuits().catch(() => new Map<string, EspnF1Circuit>())
  ]);
  const circuit = await loadF1Circuit(detail).catch(() => null);
  const enrichedCalendar = calendar.map((row) => ({ ...row, circuitId: calendarCircuitIds.get(row.id) }));
  return {
    scoreboard,
    standings,
    teams,
    news,
    event,
    detail,
    circuit,
    session: chooseF1Session(sessions),
    sessions,
    calendar: enrichedCalendar,
    curatedCircuits,
    driverStandings: f1DriverRows(standings),
    constructorStandings: f1ConstructorRows(standings, teams),
    season,
    nextEvent: f1NextCalendarEvent(enrichedCalendar)
  };
}

function renderF1Card(root: HTMLElement, snapshot?: F1Snapshot, error?: unknown) {
  const link = document.createElement("a");
  link.className = "sports-team-card sports-f1-card";
  link.href = F1_ROUTE;
  link.setAttribute("aria-label", "Formula 1 season hub");
  link.innerHTML = `
    <div class="sports-team-card__identity">
      <div class="sports-team-card__logo-frame sports-f1-card__mark" aria-hidden="true">F1</div>
      <div>
        <div class="sports-team-card__league">Formula 1</div>
        <h2 data-f1-event>F1 Season</h2>
      </div>
    </div>
    <div class="sports-team-card__record">
      <strong data-f1-primary>Loading</strong>
      <span data-f1-secondary>ESPN racing data</span>
    </div>
    <div class="sports-team-card__next">
      <span data-f1-context>Loading weekend</span>
      <strong data-f1-location>Location pending</strong>
      <small data-f1-date></small>
    </div>
  `;
  root.appendChild(link);

  if (!snapshot) {
    link.querySelector("[data-f1-event]")?.replaceChildren(document.createTextNode("Formula 1"));
    link.querySelector("[data-f1-primary]")?.replaceChildren(document.createTextNode("Unavailable"));
    link.querySelector("[data-f1-secondary]")?.replaceChildren(document.createTextNode(error instanceof Error ? error.message : "ESPN data failed"));
    link.querySelector("[data-f1-context]")?.replaceChildren(document.createTextNode("Schedule"));
    link.querySelector("[data-f1-location]")?.replaceChildren(document.createTextNode("Details unavailable"));
    return;
  }

  const leader = snapshot.driverStandings[0];
  const constructor = snapshot.constructorStandings[0];
  const session = snapshot.session;
  const event = snapshot.event;
  const sessionLine =
    session?.state === "in"
      ? `${session.label} live • ${session.status || "In progress"}`
      : session?.state === "pre"
        ? `${session.label} • ${formatEventDate(session.date)}`
        : session
          ? `${session.label} • ${session.status || "Complete"}`
          : leader
            ? `${leader.points} pts • ${constructor?.name ?? "Constructor standings pending"}`
            : "Season standings pending";
  link.querySelector("[data-f1-event]")?.replaceChildren(document.createTextNode(event?.shortName ?? snapshot.nextEvent?.name ?? "Formula 1"));
  link.querySelector("[data-f1-primary]")?.replaceChildren(document.createTextNode(leader ? leader.name : "Standings pending"));
  link.querySelector("[data-f1-secondary]")?.replaceChildren(document.createTextNode(sessionLine));
  link.querySelector("[data-f1-context]")?.replaceChildren(document.createTextNode(f1CircuitName(snapshot.circuit)));
  link.querySelector("[data-f1-location]")?.replaceChildren(document.createTextNode(f1CircuitLocation(snapshot.circuit)));
  link.querySelector("[data-f1-date]")?.replaceChildren(document.createTextNode(formatDateRange(event?.date ?? snapshot.nextEvent?.startDate, event?.endDate ?? snapshot.nextEvent?.endDate)));
  link.classList.add("is-loaded");
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
  const [teamResults, golfResults, f1Results] = await Promise.all([
    Promise.allSettled(FEATURED_TEAMS.map((config, index) =>
      loadTeamSnapshot(config, { includeSchedule: true, includeEventSummary: false }).then((snapshot) => ({ config, index, snapshot }))
    )),
    Promise.allSettled([loadGolfSnapshot()]),
    Promise.allSettled([loadF1Snapshot()])
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
  const f1Result = f1Results[0];
  renderF1Card(root, f1Result?.status === "fulfilled" ? f1Result.value : undefined, f1Result?.status === "rejected" ? f1Result.reason : undefined);
  status && (status.textContent = "Live cards use active ESPN scoreboards, standings, and event calendars.");
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

function f1CircuitDisplayName(map: F1CircuitMap, circuit?: EspnF1Circuit | null) {
  return circuit?.fullName ?? circuit?.displayName ?? circuit?.name ?? map.name;
}

function f1CircuitDisplayLocation(map: F1CircuitMap, circuit?: EspnF1Circuit | null) {
  const location = f1CircuitLocation(circuit);
  return location === "Location TBD" ? map.location : location;
}

function f1CircuitFacts(map: F1CircuitMap, circuit?: EspnF1Circuit | null) {
  const facts = [
    circuit?.turns ? `${circuit.turns} turns` : "",
    circuit?.length ?? "",
    circuit?.laps ? `${circuit.laps} laps` : "",
    circuit?.direction ?? "",
    circuit?.established ? `Since ${circuit.established}` : "",
    circuit?.fastestLapTime && circuit.fastestLapYear ? `Fastest ${circuit.fastestLapTime} (${circuit.fastestLapYear})` : ""
  ].filter(Boolean);
  return facts.length ? facts : map.facts ?? [];
}

function renderF1CircuitMap(map: F1CircuitMap, size: "hero" | "card" | "mini") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("sports-f1-circuit-map", `sports-f1-circuit-map--${size}`);
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("focusable", "false");
  svg.style.setProperty("--f1-circuit-accent", map.accent);

  if (size === "mini") {
    svg.setAttribute("aria-hidden", "true");
  } else {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${map.name} simplified circuit map`);
    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `${map.name} simplified circuit map`;
    svg.appendChild(title);
  }

  const shape = map.shapePath ? document.createElementNS("http://www.w3.org/2000/svg", "path") : null;
  if (shape) {
    shape.classList.add("sports-f1-circuit-map__shape");
    shape.setAttribute("d", map.shapePath ?? "");
    shape.setAttribute("fill-rule", "nonzero");
    if (map.shapeStrokeWidth) {
      shape.classList.add("sports-f1-circuit-map__shape--stroke");
      shape.setAttribute("stroke-width", String(map.shapeStrokeWidth));
    }
  }

  const base = document.createElementNS("http://www.w3.org/2000/svg", "path");
  base.classList.add("sports-f1-circuit-map__base");
  base.setAttribute("d", map.path);
  const ribbon = document.createElementNS("http://www.w3.org/2000/svg", "path");
  ribbon.classList.add("sports-f1-circuit-map__ribbon");
  ribbon.setAttribute("d", map.path);

  const marker = document.createElementNS("http://www.w3.org/2000/svg", "g");
  marker.classList.add("sports-f1-circuit-map__start");
  marker.setAttribute("transform", `translate(${map.start.x} ${map.start.y}) rotate(${map.start.rotation ?? 0})`);
  const markerLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  markerLine.setAttribute("x1", "-4");
  markerLine.setAttribute("y1", "0");
  markerLine.setAttribute("x2", "4");
  markerLine.setAttribute("y2", "0");
  const markerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  markerDot.setAttribute("cx", "0");
  markerDot.setAttribute("cy", "0");
  markerDot.setAttribute("r", "2.1");
  marker.append(markerLine, markerDot);
  if (shape) {
    svg.append(shape, marker);
  } else {
    svg.append(base, ribbon, marker);
  }
  return svg;
}

function renderF1CircuitCard(map: F1CircuitMap, circuit?: EspnF1Circuit | null, event?: F1CalendarRow) {
  const card = document.createElement("article");
  card.className = "sports-f1-circuit-card";
  card.style.setProperty("--f1-circuit-accent", map.accent);

  const media = document.createElement("div");
  media.className = "sports-f1-circuit-card__map";
  media.appendChild(renderF1CircuitMap(map, "card"));

  const body = document.createElement("div");
  body.className = "sports-f1-circuit-card__body";
  const label = document.createElement("span");
  label.textContent = map.label;
  const title = document.createElement("strong");
  title.textContent = f1CircuitDisplayName(map, circuit);
  const location = document.createElement("small");
  location.textContent = f1CircuitDisplayLocation(map, circuit);
  body.append(label, title, location);

  if (event) {
    const race = document.createElement("small");
    race.textContent = `${event.name} • ${formatDateRange(event.startDate, event.endDate)}`;
    body.appendChild(race);
  }

  const factsList = f1CircuitFacts(map, circuit);
  if (factsList.length) {
    const facts = document.createElement("div");
    facts.className = "sports-f1-circuit-card__facts";
    factsList.slice(0, 3).forEach((fact) => {
      const item = document.createElement("span");
      item.textContent = fact;
      facts.appendChild(item);
    });
    body.appendChild(facts);
  }

  if (map.sourceCredit) {
    const source = map.sourceUrl ? document.createElement("a") : document.createElement("small");
    source.className = "sports-f1-circuit-card__source";
    source.textContent = map.sourceCredit;
    if (source instanceof HTMLAnchorElement) {
      source.href = map.sourceUrl ?? "";
      source.target = "_blank";
      source.rel = "noreferrer";
    }
    body.appendChild(source);
  }

  card.append(media, body);
  return card;
}

function renderF1Hero(snapshot: F1Snapshot) {
  const hero = document.createElement("section");
  hero.className = "sports-team-hero sports-f1-hero";
  hero.dataset.f1Hero = "";

  const circuitId = f1SnapshotCircuitId(snapshot);
  const circuitMap = getF1CircuitMap(circuitId);
  const mark = document.createElement("div");
  mark.className = circuitMap ? "sports-f1-hero__map" : "sports-f1-hero__mark";
  if (circuitMap) {
    mark.appendChild(renderF1CircuitMap(circuitMap, "hero"));
  } else {
    mark.textContent = "F1";
  }

  const content = document.createElement("div");
  content.className = "sports-team-hero__content";

  const league = document.createElement("div");
  league.className = "sports-team-card__league";
  league.textContent = `Formula 1 ${snapshot.season}`;

  const title = document.createElement("h2");
  title.textContent = snapshot.event?.name ?? snapshot.nextEvent?.name ?? "Formula 1";

  const meta = document.createElement("div");
  meta.className = "sports-team-hero__meta sports-f1-meta";
  [
    ["Dates", formatDateRange(snapshot.event?.date ?? snapshot.nextEvent?.startDate, snapshot.event?.endDate ?? snapshot.nextEvent?.endDate)],
    ["Session", snapshot.session ? `${snapshot.session.label}${snapshot.session.status ? ` • ${snapshot.session.status}` : ""}` : "Session TBD"],
    ["Circuit", f1CircuitName(snapshot.circuit)],
    ["Location", f1CircuitLocation(snapshot.circuit)],
    ["Driver Leader", snapshot.driverStandings[0] ? `${snapshot.driverStandings[0].name} • ${snapshot.driverStandings[0].points} pts` : "-"],
    ["Constructor", snapshot.constructorStandings[0] ? `${snapshot.constructorStandings[0].name} • ${snapshot.constructorStandings[0].points} pts` : "-"]
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

function f1DriverName(competitor: EspnF1Competitor) {
  const athlete = competitor.athlete && !isEspnRef(competitor.athlete) ? competitor.athlete : null;
  return athlete?.displayName ?? athlete?.fullName ?? athlete?.shortName ?? `Driver ${competitor.id ?? ""}`.trim();
}

function f1DriverFlag(competitor: EspnF1Competitor) {
  return competitor.athlete && !isEspnRef(competitor.athlete) ? competitor.athlete.flag : undefined;
}

function renderF1DriverCell(name: string, flag?: { href?: string; alt?: string }) {
  const cell = document.createElement("span");
  cell.className = "sports-f1-driver";
  const text = document.createElement("span");
  text.textContent = name;
  cell.appendChild(text);
  if (flag?.href) {
    const img = document.createElement("img");
    img.src = flag.href;
    img.alt = flag.alt ? `${flag.alt} flag` : "";
    img.loading = "lazy";
    cell.appendChild(img);
  }
  return cell;
}

function renderF1Sessions(snapshot: F1Snapshot) {
  const panel = createPanel("Race Weekend", "sports-f1-sessions-panel");
  panel.dataset.f1Sessions = "";
  const list = document.createElement("div");
  list.className = "sports-f1-session-list";
  if (!snapshot.sessions.length) {
    list.innerHTML = `<p class="sports-empty-state">ESPN has not returned this race weekend's sessions yet.</p>`;
    panel.appendChild(list);
    return panel;
  }

  snapshot.sessions.forEach((session) => {
    const row = document.createElement("article");
    row.className = session.id === snapshot.session?.id ? "sports-f1-session-row is-current" : "sports-f1-session-row";
    const time = document.createElement("time");
    time.dateTime = session.date ?? "";
    time.textContent = formatEventDate(session.date);
    const title = document.createElement("strong");
    title.textContent = session.label;
    const status = document.createElement("span");
    status.textContent = session.status || (session.state === "pre" ? "Scheduled" : session.state === "post" ? "Final" : "Status pending");
    const leaders = document.createElement("div");
    leaders.className = "sports-f1-session-row__leaders";
    const top = session.competitors.slice(0, 5);
    if (top.length) {
      top.forEach((competitor, index) => {
        const item = document.createElement("span");
        const position = competitor.order ?? index + 1;
        item.append(document.createTextNode(`${position}. `), renderF1DriverCell(f1DriverName(competitor), f1DriverFlag(competitor)));
        leaders.appendChild(item);
      });
    } else {
      leaders.textContent = "Results pending";
    }
    row.append(time, title, status, leaders);
    list.appendChild(row);
  });

  panel.appendChild(list);
  return panel;
}

function renderF1StandingsTable(title: string, rows: F1StandingRow[], className: string) {
  const panel = createPanel(title, `sports-f1-standings-panel ${className}`);
  panel.dataset.f1Standings = title;
  const table = document.createElement("div");
  table.className = "sports-f1-standings";
  let showAll = false;
  const toggle = document.createElement("button");
  toggle.className = "sports-pga-toggle sports-f1-toggle";
  toggle.type = "button";

  const renderRows = () => {
    table.replaceChildren();
    const head = document.createElement("div");
    head.className = "sports-f1-standings__row sports-f1-standings__row--head";
    ["Rank", title.includes("Constructor") ? "Constructor" : "Driver", "Points"].forEach((label) => {
      const span = document.createElement("span");
      span.textContent = label;
      head.appendChild(span);
    });
    table.appendChild(head);
    rows.slice(0, showAll ? rows.length : 10).forEach((row) => {
      const line = document.createElement("div");
      line.className = "sports-f1-standings__row";
      if (row.color) {
        line.style.setProperty("--f1-row-color", `#${row.color}`);
      }
      const rank = document.createElement("span");
      rank.textContent = row.rank;
      const name = row.flag ? renderF1DriverCell(row.name, { href: row.flag, alt: row.country }) : document.createElement("span");
      if (!row.flag) {
        name.textContent = row.name;
      }
      const points = document.createElement("span");
      points.textContent = row.points;
      line.append(rank, name, points);
      table.appendChild(line);
    });
    toggle.textContent = showAll ? "Show top 10" : `Show all ${rows.length}`;
  };

  if (!rows.length) {
    panel.insertAdjacentHTML("beforeend", `<p class="sports-empty-state">ESPN standings are unavailable right now.</p>`);
    return panel;
  }

  toggle.addEventListener("click", () => {
    showAll = !showAll;
    renderRows();
  });
  renderRows();
  panel.append(table, toggle);
  return panel;
}

function renderF1FeaturedCircuits(snapshot: F1Snapshot) {
  const panel = createPanel("Season Circuits", "sports-f1-circuit-panel");
  const list = document.createElement("div");
  list.className = "sports-f1-circuit-grid";
  F1_CIRCUIT_MAPS.forEach((map) => {
    const circuit = snapshot.curatedCircuits.get(map.id) ?? (snapshot.circuit?.id === map.id ? snapshot.circuit : null);
    const event = snapshot.calendar.find((row) => row.circuitId === map.id);
    list.appendChild(renderF1CircuitCard(map, circuit, event));
  });
  panel.appendChild(list);
  return panel;
}

function renderF1Calendar(snapshot: F1Snapshot) {
  const panel = createPanel("Season Calendar", "sports-f1-calendar-panel");
  panel.dataset.f1Calendar = "";
  const list = document.createElement("div");
  list.className = "sports-f1-calendar-list";
  if (!snapshot.calendar.length) {
    list.innerHTML = `<p class="sports-empty-state">ESPN has not returned the Formula 1 calendar yet.</p>`;
    panel.appendChild(list);
    return panel;
  }

  snapshot.calendar.forEach((event) => {
    const row = document.createElement("article");
    const map = getF1CircuitMap(event.circuitId);
    row.className = [
      "sports-f1-calendar-row",
      event.status === "current" ? "is-current" : "",
      map ? "has-map" : ""
    ]
      .filter(Boolean)
      .join(" ");
    const date = document.createElement("time");
    date.dateTime = event.startDate ?? "";
    date.textContent = formatDateRange(event.startDate, event.endDate);
    const title = document.createElement("strong");
    title.textContent = event.name;
    const status = document.createElement("span");
    status.textContent = event.status === "current" ? "Current weekend" : event.status === "completed" ? "Completed" : "Upcoming";
    if (map) {
      row.append(renderF1CircuitMap(map, "mini"));
    }
    row.append(date, title, status);
    list.appendChild(row);
  });
  panel.appendChild(list);
  return panel;
}

function renderF1News(snapshot: F1Snapshot) {
  const panel = createPanel("F1 News", "sports-f1-news-panel");
  const articles = snapshot.news?.articles ?? [];
  if (!articles.length) {
    panel.insertAdjacentHTML("beforeend", `<p class="sports-empty-state">ESPN news is unavailable right now.</p>`);
    return panel;
  }

  const list = document.createElement("div");
  list.className = "sports-f1-news-list";
  articles.slice(0, 3).forEach((article) => {
    const link = document.createElement("a");
    link.className = "sports-f1-news-card";
    link.href = article.links?.web?.href ?? "https://www.espn.com/f1/";
    link.target = "_blank";
    link.rel = "noreferrer";
    const image = article.images?.[0]?.url;
    if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = article.images?.[0]?.name ?? "";
      img.loading = "lazy";
      link.appendChild(img);
    }
    const body = document.createElement("span");
    body.innerHTML = `<strong></strong><small></small>`;
    body.querySelector("strong")?.replaceChildren(document.createTextNode(article.headline ?? "ESPN F1 story"));
    body.querySelector("small")?.replaceChildren(document.createTextNode(article.published ? formatShortDate(article.published) : "ESPN"));
    link.appendChild(body);
    list.appendChild(link);
  });
  panel.appendChild(list);
  return panel;
}

function renderF1Snapshot(root: HTMLElement, snapshot: F1Snapshot) {
  const hero = renderF1Hero(snapshot);
  const sessions = renderF1Sessions(snapshot);
  const featuredCircuits = renderF1FeaturedCircuits(snapshot);
  const driverStandings = renderF1StandingsTable("Driver Standings", snapshot.driverStandings, "sports-f1-driver-standings-panel");
  const constructorStandings = renderF1StandingsTable("Constructor Standings", snapshot.constructorStandings, "sports-f1-constructor-standings-panel");
  const calendar = renderF1Calendar(snapshot);
  const news = renderF1News(snapshot);
  const grid = document.createElement("div");
  grid.className = "sports-detail-grid sports-f1-detail-grid";
  grid.append(sessions, featuredCircuits, driverStandings, constructorStandings, calendar, news);
  root.replaceChildren(hero, grid);
}

export async function initF1Page(root: HTMLElement | null) {
  if (!root) {
    return;
  }

  const status = document.querySelector<HTMLElement>("[data-sports-status]");
  status && (status.textContent = "Loading Formula 1 data...");
  root.className = "sports-team-detail sports-f1-detail is-loading";
  root.replaceChildren();

  const refresh = async (initial = false) => {
    if (initial) {
      root.classList.add("is-loading");
    }
    try {
      const snapshot = await loadF1Snapshot();
      root.classList.remove("is-loading");
      renderF1Snapshot(root, snapshot);
      status && (status.textContent = "Formula 1 data loaded from ESPN public JSON endpoints.");
      const refreshMs = snapshot.session?.state === "in" ? 60000 : snapshot.session?.state === "pre" ? 300000 : 0;
      if (root.dataset.refreshIntervalId && root.dataset.refreshMs !== String(refreshMs)) {
        window.clearInterval(Number(root.dataset.refreshIntervalId));
        delete root.dataset.refreshIntervalId;
        delete root.dataset.refreshMs;
      }
      if (refreshMs && !root.dataset.refreshIntervalId) {
        root.dataset.refreshIntervalId = String(window.setInterval(() => {
          void refresh();
        }, refreshMs));
        root.dataset.refreshMs = String(refreshMs);
      } else if (!refreshMs && root.dataset.refreshIntervalId) {
        window.clearInterval(Number(root.dataset.refreshIntervalId));
        delete root.dataset.refreshIntervalId;
        delete root.dataset.refreshMs;
      }
    } catch (error) {
      root.classList.remove("is-loading");
      if (initial) {
        root.innerHTML = `<p class="sports-empty-state">${error instanceof Error ? error.message : "Failed to load Formula 1 details."}</p>`;
      }
      status && (status.textContent = "Formula 1 details failed to load.");
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
