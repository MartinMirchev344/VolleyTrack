import { getList, post } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('playerForm');
  const list = document.getElementById('playerList');
  const teamSelect = document.getElementById('teamSelect');

  async function loadTeams() {
    const teams = await getList('teams');
    teams.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id;
      option.textContent = team.name;
      teamSelect.appendChild(option);
    });
  }

  async function loadPlayers() {
    const players = await getList('players');
    list.innerHTML = '';
    players.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.first_name} ${p.last_name} (${p.position}) - Age: ${p.age}`;
      list.appendChild(li);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName.value,
      last_name: lastName.value,
      position: position.value,
      number: number.value,
      age: age.value,
      team: teamSelect.value
    };
    await post('players', data);
    form.reset();
    loadPlayers();
  };

  loadTeams();
  loadPlayers();
});