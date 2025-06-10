import { getList } from './api.js';

const container = document.getElementById('standingsContainer');

function createTable(leagueName, teams) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = leagueName;
  section.appendChild(title);

  const table = document.createElement('table');
  const header = document.createElement('tr');
  ['Team', 'Played', 'Wins', 'Losses', 'Points'].forEach(t => {
    const th = document.createElement('th');
    th.textContent = t;
    header.appendChild(th);
  });
  table.appendChild(header);

  teams.forEach(team => {
    const row = document.createElement('tr');
    [team.name, team.played, team.wins, team.losses, team.points].forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  section.appendChild(table);
  container.appendChild(section);
}

async function loadStandings() {
  const [leagues, teams, matches] = await Promise.all([
    getList('leagues'),
    getList('teams'),
    getList('matches')
  ]);

  const teamMap = {};
  const standings = {};

  teams.forEach(team => {
    teamMap[team.id] = team;
    if (!standings[team.league]) standings[team.league] = {};
    standings[team.league][team.id] = {
      name: team.name,
      played: 0,
      wins: 0,
      losses: 0,
      points: 0
    };
  });

  matches.forEach(match => {
    const leagueId = teamMap[match.home_team]?.league;
    if (!leagueId || !standings[leagueId]) return;

    const home = standings[leagueId][match.home_team];
    const away = standings[leagueId][match.away_team];

    const homeWon = match.home_team < match.away_team;

    home.played += 1;
    away.played += 1;

    if (homeWon) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    }
  });

  leagues.forEach(league => {
    const teams = Object.values(standings[league.id] || {}).sort((a, b) => b.points - a.points);
    if (teams.length) createTable(league.name, teams);
  });
}

loadStandings();