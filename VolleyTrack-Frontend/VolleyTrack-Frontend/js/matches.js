import { getList, post, remove } from './api.js';

const form = document.getElementById('matchForm');
const list = document.getElementById('matchList');
const homeTeamSelect = document.getElementById('homeTeam');
const awayTeamSelect = document.getElementById('awayTeam');

async function loadTeams() {
  const teams = await getList('teams');
  teams.forEach(team => {
    const opt1 = document.createElement('option');
    opt1.value = team.id;
    opt1.textContent = team.name;
    homeTeamSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = team.id;
    opt2.textContent = team.name;
    awayTeamSelect.appendChild(opt2);
  });
}

async function loadMatches() {
  const matches = await getList('matches');
  const teams = await getList('teams');
  const teamMap = Object.fromEntries(teams.map(t => [t.id, t.name]));
  list.innerHTML = '';
  matches.forEach(match => {
    const li = document.createElement('li');
    li.textContent = `${teamMap[match.home_team]} vs ${teamMap[match.away_team]} @ ${match.location} on ${new Date(match.date).toLocaleString()}`;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = async () => {
      await remove('matches', match.id);
      loadMatches();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  await post('matches', {
    home_team: homeTeam.value,
    away_team: awayTeam.value,
    date: matchDate.value,
    location: location.value
  });
  form.reset();
  loadMatches();
};

loadTeams();
loadMatches();