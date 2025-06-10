import { getList, post, remove } from './api.js';
const form = document.getElementById('teamForm');
const list = document.getElementById('teamList');
async function load() {
  const teams = await getList('teams');
  list.innerHTML = '';
  teams.forEach(team => {
    const li = document.createElement('li');
    li.textContent = `${team.name} (${team.city}) - Coach: ${team.coach_name}`;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = async () => { await remove('teams', team.id); load(); };
    li.appendChild(btn);
    list.appendChild(li);
  });
}
form.onsubmit = async (e) => {
  e.preventDefault();
  await post('teams', {
    name: teamName.value,
    coach_name: coachName.value,
    city: city.value
  });
  form.reset();
  load();
};
load();