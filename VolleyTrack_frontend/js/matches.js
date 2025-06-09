import { getList, post } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('matchForm');
  const homeTeam = document.getElementById('homeTeam');
  const awayTeam = document.getElementById('awayTeam');
  const list = document.getElementById('matchList');

  async function loadTeams() {
    const teams = await getList('teams');
    [homeTeam, awayTeam].forEach(select => {
      teams.forEach(team => {
        const opt = document.createElement('option');
        opt.value = team.id;
        opt.textContent = team.name;
        select.appendChild(opt.cloneNode(true));
      });
    });
  }

  async function loadMatches() {
    const matches = await getList('matches');
    list.innerHTML = '';
    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = `${match.home_team} vs ${match.away_team} @ ${match.location}`;
      list.appendChild(li);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      home_team: homeTeam.value,
      away_team: awayTeam.value,
      match_date: matchDate.value,
      location: location.value
    };
    await post('matches', data);
    form.reset();
    loadMatches();
  };

  loadTeams();
  loadMatches();
});