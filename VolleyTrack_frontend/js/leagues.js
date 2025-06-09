import { getList, post } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leagueForm');
  const list = document.getElementById('leagueList');

  async function loadLeagues() {
    const leagues = await getList('leagues');
    list.innerHTML = '';
    leagues.forEach(l => {
      const li = document.createElement('li');
      li.textContent = `${l.name} (${l.country} – ${l.level})`;
      list.appendChild(li);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: leagueName.value,
      country: country.value,
      level: level.value
    };
    await post('leagues', data);
    form.reset();
    loadLeagues();
  };

  loadLeagues();
});