# ESPN Sports API Research

Research date: 2026-04-25

This document covers the ESPN `site.api.espn.com` JSON endpoints used or considered for the LaydoNet Sports Vite app. These endpoints are public but not a formally documented public API contract, so treat every nested field as optional and parse defensively.

## League Endpoint Map

| League | Base team endpoint | Scoreboard endpoint | Summary endpoint |
| --- | --- | --- | --- |
| MLB | `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams` | `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard` | `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event={eventId}` |
| NFL | `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams` | `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard` | `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event={eventId}` |
| NCAAF | `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams` | `https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard` | `https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event={eventId}` |
| NBA | `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams` | `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard` | `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event={eventId}` |

Team schedule pattern:

```text
{teamBase}/{teamId}/schedule?season={seasonYear}&seasontype={seasonType}
```

Common season types observed:

| Type | Meaning |
| --- | --- |
| `1` | Preseason |
| `2` | Regular Season |
| `3` | Postseason |
| `4` | Off Season |

## Recommended Page Data Flow

For a team page, use endpoints in this order:

1. `teams/{id}` for identity, colors, logos, record, standing, and ESPN-provided `nextEvent`.
2. `scoreboard` for current/live games. Filter client-side by team id. Do not rely on `?teams={id}` for all leagues.
3. `teams/{id}/schedule` for season rows and fallback next/last games.
4. `summary?event={eventId}` for rich event details once you have an event id.

Live-page logic:

```text
if scoreboard has team event with status.state == "in":
  show live score, clock/inning, last play, situation, leaders, and poll summary
else if scoreboard or schedule has upcoming event:
  show next game preview
else if schedule has completed event:
  show latest result + summary highlights
else:
  show offseason/team identity state
```

## Team Endpoint

Pattern:

```text
{teamBase}/{teamId}
```

Examples:

```text
https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/12
https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/9
https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/265
https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/9
```

Useful paths:

```text
.team.id
.team.uid
.team.slug
.team.displayName
.team.shortDisplayName
.team.abbreviation
.team.color
.team.alternateColor
.team.logos[]
.team.record.items[]
.team.record.items[0].summary
.team.standingSummary
.team.nextEvent[]
.team.groups
.team.franchise.venue.fullName
.team.franchise.venue.images[]
.team.links[]
```

Team ids currently used or researched:

| League | Team | ESPN id | Notes |
| --- | --- | ---: | --- |
| MLB | Seattle Mariners | `12` | Team endpoint currently includes record, standing, and `nextEvent`. |
| NFL | Green Bay Packers | `9` | Team endpoint currently has `nextEvent: []` in offseason, but record and standings are present. |
| NCAAF | Washington State Cougars | `265` | Team endpoint currently has no record item and no `nextEvent`; schedule/scoreboard fallback is required. |
| NBA | Golden State Warriors | `9` | Useful NBA test team. Includes record, standings, logos, and next event when applicable. |

Logo notes:

- Prefer logo selection by `rel`, not array index.
- Common `rel` values include `default`, `dark`, `scoreboard`, `primary_logo_on_primary_color`, `primary_logo_white`, `primary_logo_black`, and secondary variants.
- For team-color card backgrounds, `primary_logo_on_primary_color` or a contrast variant like `primary_logo_white` can prevent logo/background clashes.

## Scoreboard Endpoint

Pattern:

```text
{scoreboardBase}
{scoreboardBase}?dates=YYYYMMDD
{scoreboardBase}?dates=YYYYMMDD-YYYYMMDD&limit=100
```

Football scoreboards can also accept week/season filters:

```text
https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week=1&limit=100
```

Useful paths:

```text
.leagues[0].season
.day.date
.events[]
.events[].id
.events[].uid
.events[].date
.events[].name
.events[].shortName
.events[].season
.events[].week
.events[].status.type.id
.events[].status.type.name
.events[].status.type.state
.events[].status.type.completed
.events[].status.type.detail
.events[].status.type.shortDetail
.events[].status.displayClock
.events[].status.period
.events[].competitions[0].competitors[]
.events[].competitions[0].competitors[].homeAway
.events[].competitions[0].competitors[].team.id
.events[].competitions[0].competitors[].team.abbreviation
.events[].competitions[0].competitors[].team.displayName
.events[].competitions[0].competitors[].score
.events[].competitions[0].competitors[].winner
.events[].competitions[0].competitors[].linescores[]
.events[].competitions[0].competitors[].records[]
.events[].competitions[0].competitors[].statistics[]
.events[].competitions[0].broadcasts[]
.events[].competitions[0].leaders[]
.events[].competitions[0].venue
.events[].competitions[0].situation
```

Filtering a scoreboard client-side:

```jq
.events[]
| select(any(.competitions[0].competitors[]; .team.id == "12"))
```

Status states:

| State | Meaning | UI use |
| --- | --- | --- |
| `pre` | Scheduled/pregame | Show kickoff/tip/first pitch, venue, broadcasters, probable matchup if present. |
| `in` | Live | Poll scoreboard or summary; show live score, period/inning/clock, situation, last play. |
| `post` | Final | Show result, linescore, leaders, scoring recap, boxscore summary. |

Scoreboard caveats:

- Some endpoints return team ids in scoreboard competitor objects but omit full `displayName`/`abbreviation`; use ids to join with cached team data if needed.
- `score` is often a string on scoreboard responses, but schedule responses may expose score objects.
- `leaders`, `situation`, `records`, and `linescores` vary heavily by sport and game state.
- Betting/odds objects may include sportsbook links and responsible gambling text. Avoid unless intentionally building betting-related UI.

## Schedule Endpoint

Pattern:

```text
{teamBase}/{teamId}/schedule?season={year}&seasontype=2
```

Useful paths:

```text
.status
.timestamp
.season
.requestedSeason
.byeWeek
.team
.team.recordSummary
.team.standingSummary
.events[]
.events[].id
.events[].date
.events[].name
.events[].shortName
.events[].season.year
.events[].seasonType
.events[].week.number
.events[].week.text
.events[].competitions[0].id
.events[].competitions[0].status.type
.events[].competitions[0].competitors[]
.events[].competitions[0].competitors[].team.id
.events[].competitions[0].competitors[].team.displayName
.events[].competitions[0].competitors[].team.abbreviation
.events[].competitions[0].competitors[].homeAway
.events[].competitions[0].competitors[].score
.events[].competitions[0].competitors[].score.displayValue
.events[].competitions[0].competitors[].winner
.events[].competitions[0].broadcasts[]
.events[].competitions[0].venue.fullName
```

Schedule caveats:

- NFL schedule event `.status` can be `null`; use scoreboard or summary as status authority.
- NBA schedule can report postseason at the response season level while returning regular-season events when `seasontype=2` is requested.
- NCAAF schedule availability varies by season and date. Base schedule and future season queries can return empty arrays even when ESPN has future scoreboard entries.
- Future games often have `score: null` or `score: "0"`, empty broadcasts, and no linescores.

## Summary Endpoint

Pattern:

```text
{summaryBase}?event={eventId}
```

This is the richest endpoint for team detail pages and live/current game modules.

Common top-level keys observed:

```text
header
boxscore
gameInfo
leaders
plays
drives
scoringPlays
standings
winprobability
situation
broadcasts
odds
pickcenter
injuries
news
videos
notes
seasonseries
againstTheSpread
format
meta
```

Not every league has every key. Examples:

- MLB summary can include `atBats`, `plays`, `playsMap`, `situation`, `seasonseries`.
- NFL/NCAAF summary can include `drives.previous`, `drives.current`, `scoringPlays`.
- NBA summary can include play-by-play and rich team/player boxscore data.

Core paths:

```text
.header.id
.header.league
.header.season
.header.week
.header.competitions[0].id
.header.competitions[0].date
.header.competitions[0].status.type
.header.competitions[0].competitors[]
.header.competitions[0].competitors[].team
.header.competitions[0].competitors[].homeAway
.header.competitions[0].competitors[].score
.header.competitions[0].competitors[].winner
.header.competitions[0].competitors[].linescores[]
.header.competitions[0].competitors[].records[]
.gameInfo.venue
.gameInfo.attendance
.boxscore.teams[]
.boxscore.teams[].team
.boxscore.teams[].statistics[]
.boxscore.players[]
.boxscore.players[].team
.boxscore.players[].statistics[]
.boxscore.players[].statistics[].labels
.boxscore.players[].statistics[].athletes[]
.leaders[]
.standings.groups[]
.broadcasts[]
.news[]
.videos[]
```

Live/play paths:

```text
.plays[]
.plays[-1]
.plays[].text
.plays[].awayScore
.plays[].homeScore
.plays[].period.displayValue
.plays[].clock.displayValue
.plays[].scoringPlay
.plays[].scoreValue
.plays[].team.id
.winprobability[]
.winprobability[].homeWinPercentage
.winprobability[].tiePercentage
.winprobability[].playId
```

Football-specific play paths:

```text
.drives.previous[]
.drives.current
.drives.previous[].description
.drives.previous[].displayResult
.drives.previous[].team.abbreviation
.drives.previous[].start.text
.drives.previous[].end.text
.drives.previous[].timeElapsed.displayValue
.drives.previous[].yards
.drives.previous[].offensivePlays
.drives.previous[].result
.drives.previous[].plays[]
.scoringPlays[]
.scoringPlays[].text
.scoringPlays[].type.text
.scoringPlays[].scoringType
.scoringPlays[].period.number
.scoringPlays[].clock.displayValue
.scoringPlays[].homeScore
.scoringPlays[].awayScore
.scoringPlays[].team.abbreviation
```

MLB-specific live paths:

```text
.header.competitions[0].status.type.shortDetail
.header.competitions[0].competitors[].linescores[]
.header.competitions[0].competitors[].statistics[]
.header.competitions[0].situation
.situation
.plays[]
.plays[-1].pitchType
.plays[-1].pitchVelocity
.plays[-1].pitchCoordinate
.plays[-1].pitchCount
.plays[-1].resultCount
.plays[-1].outs
```

MLB scoreboard live situation observed:

```text
.competitions[0].situation.lastPlay.text
.competitions[0].situation.balls
.competitions[0].situation.strikes
.competitions[0].situation.outs
.competitions[0].situation.pitcher.athlete.displayName
.competitions[0].situation.pitcher.summary
.competitions[0].situation.batter.athlete.displayName
.competitions[0].situation.batter.summary
.competitions[0].situation.onFirst
.competitions[0].situation.onSecond
.competitions[0].situation.onThird
```

NBA-specific live paths:

```text
.plays[-1].text
.plays[-1].awayScore
.plays[-1].homeScore
.plays[-1].period.displayValue
.plays[-1].clock.displayValue
.plays[-1].shootingPlay
.plays[-1].scoringPlay
.plays[-1].scoreValue
.plays[-1].coordinate
.boxscore.teams[].statistics[]
.boxscore.players[].statistics[].labels
.boxscore.players[].statistics[].athletes[]
```

NBA live caveat: play coordinates can contain sentinel-looking values; validate coordinate bounds before drawing shot/play locations.

## League-Specific Notes

### MLB

Sample team: Seattle Mariners, id `12`.

Useful current-game features:

- Inning state from `status.type.shortDetail`, for example `Bot 6th`.
- Team linescore by inning from `competitors[].linescores[]`.
- Runs/hits/errors from `competitors[].statistics[]`.
- Batter/pitcher matchup from scoreboard `situation`.
- Bases occupied from `onFirst`, `onSecond`, `onThird`.
- Count and outs from `balls`, `strikes`, `outs`.
- Last pitch/play from `situation.lastPlay` or `summary.plays[-1]`.
- Pitch type, velocity, and coordinates from summary `plays[]` when available.
- Boxscore batting/pitching tables from `boxscore.players[].statistics[]`.

Good UI ideas:

- Mini baseball diamond showing occupied bases.
- Count pill: balls, strikes, outs.
- Batter vs pitcher panel with headshots and summaries.
- Pitch feed with type and velocity.
- Inning-by-inning linescore.
- Top performer card from scoreboard `leaders`.

### NFL

Sample team: Green Bay Packers, id `9`.

Useful current/post-game features:

- Quarter/clock from scoreboard status fields.
- Team score and linescores from scoreboard competitors.
- Current drive from summary `drives.current` if live.
- Completed drive list from `drives.previous[]`.
- Scoring recap from `scoringPlays[]`.
- Win probability from `winprobability[]`.
- Player leaders from `leaders[]`.
- Venue images from team franchise venue or `gameInfo.venue`.

Caveats:

- Packers team endpoint had `nextEvent: []` during offseason.
- Schedule for future seasons can return zero events while the API still reports offseason.
- For final games, `drives.current`, `plays`, and `situation` can be null or absent.

Good UI ideas:

- Drive chart with result chips: TD, FG, PUNT, INT, FUMBLE, DOWNS.
- Win-probability sparkline, flipped from team perspective if away.
- Scoring play reel by quarter.
- “Lambeau mode” hero using venue imagery for home games.

### NCAAF

Sample team: Washington State Cougars, id `265`.

Useful features:

- Similar football summary structure to NFL: `drives`, `scoringPlays`, `boxscore`, `winprobability`.
- For completed games, top-level `plays` may be absent while play data exists inside `drives.previous[].plays[]`.
- Future scheduled game summary can include header/team shell and empty stats.
- Scoreboard date queries plus client-side filtering are more reliable than `?teams=265`.

Caveats:

- Team endpoint currently had no record item and no `nextEvent`.
- Future/base schedule responses can be empty depending on query and timing.
- No live NCAAF payload was available on 2026-04-25, so live-field behavior is inferred from football structure and completed games.

Good UI ideas:

- Field-position drive timeline.
- Scoring play reel with team colors.
- Stat edge comparison: yards, turnovers, third-down efficiency, possession time.
- “Today / Next / Last” card backed by scoreboard first, then schedule fallback.

### NBA

Sample team: Golden State Warriors, id `9`.

Useful current-game features:

- Period and clock from scoreboard/summary status.
- Linescore by quarter from competitors.
- Team statistics from `boxscore.teams[].statistics[]`: FG, 3PT, FT, rebounds, assists, turnovers, steals, blocks, largest lead, lead changes.
- Player stat tables from `boxscore.players[].statistics[].labels` plus each athlete row.
- Play feed from `plays[]`, with `scoringPlay` and `shootingPlay`.
- Win probability from `winprobability[]`.

Caveats:

- Team schedule default can return zero events in postseason; request explicit `season` and `seasontype`.
- Some live `situation` fields may only contain last play/probability, not a full possession object.
- Avoid drawing play/shot locations unless coordinates are sane.

Good UI ideas:

- Live scoreboard card with period clock and last-play ticker.
- Momentum chart from win probability.
- Compact boxscore table using ESPN-provided labels.
- “Top stat swing” card using largest lead, turnovers, 3P%, and fast-break points.

## Implementation Ideas To Discuss Later

These are not implementation decisions, just candidate directions:

1. Add a current-game module at the top of each team page that chooses between live, upcoming, latest final, and offseason states.
2. Poll scoreboard every 30-60 seconds only while `status.type.state == "in"`.
3. Load `summary?event=` only for the active/selected event, not for every schedule row.
4. Use one normalized event adapter per sport, with sport-specific enrichers for MLB situation, football drives, and NBA plays.
5. Render odds only if explicitly desired; otherwise ignore `odds` and `pickcenter`.
6. Cache team metadata/logos in memory per page load so scoreboard ids can be expanded into display names when ESPN omits them.
