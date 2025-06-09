import { getList, post, remove } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('teamForm');
  const list = document.getElementById('teamList');

  async function loadTeams() {
    const teams = await getList('teams');
    list.innerHTML = '';
    teams.forEach(team => {
      const li = document.createElement('li');
      li.textContent = `${team.name} (${team.city}) - Coach: ${team.coach_name}`;

      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.onclick = async () => {
        await remove('teams', team.id);
        loadTeams();
      };

      li.appendChild(del);
      list.appendChild(li);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.teamName.value,
      coach_name: form.coachName.value,
      city: form.city.value
    };
    await post('teams', data);
    form.reset();
    loadTeams();
  };

  loadTeams();
});