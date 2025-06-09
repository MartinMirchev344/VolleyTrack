import { getList, post } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('statForm');
  const matchSelect = document.getElementById('matchSelect');
  const playerSelect = document.getElementById('playerSelect');
  const statsList = document.getElementById('statsList');

  async function loadMatches() {
    const matches = await getList('matches');
    matches.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.home_team} vs ${m.away_team}`;
      matchSelect.appendChild(opt);
    });
  }

  async function loadPlayers() {
    const players = await getList('players');
    players.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.first_name} ${p.last_name}`;
      playerSelect.appendChild(opt);
    });
  }

  async function loadStats() {
    const stats = await getList('stats');
    statsList.innerHTML = '';
    stats.forEach(s => {
      const li = document.createElement('li');
      li.textContent = `Player ${s.player} in Match ${s.match} → ${s.points} pts, ${s.blocks} blk, ${s.aces} ace, ${s.errors} err`;
      statsList.appendChild(li);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    await post('stats', {
      match: matchSelect.value,
      player: playerSelect.value,
      points: points.value,
      blocks: blocks.value,
      aces: aces.value,
      errors: errors.value
    });
    form.reset();
    loadStats();
  };

  loadMatches();
  loadPlayers();
  loadStats();
});