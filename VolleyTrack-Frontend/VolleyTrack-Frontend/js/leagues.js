import { getList, post, remove } from './api.js';

const form = document.getElementById('leagueForm');
const list = document.getElementById('leagueList');

async function loadLeagues() {
  const leagues = await getList('leagues');
  list.innerHTML = '';
  leagues.forEach(league => {
    const li = document.createElement('li');
    li.textContent = `${league.name} (${league.country}, level ${league.level})`;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = async () => {
      await remove('leagues', league.id);
      loadLeagues();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  await post('leagues', {
    name: leagueName.value,
    country: country.value,
    level: level.value
  });
  form.reset();
  loadLeagues();
};

loadLeagues();