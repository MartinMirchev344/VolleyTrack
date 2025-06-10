import { getList, post } from './api.js';

const form = document.getElementById('statForm');
const matchSelect = document.getElementById('matchSelect');
const playerSelect = document.getElementById('playerSelect');
const statsList = document.getElementById('statsList');

async function loadMatches() {
  const matches = await getList('matches');
  matchSelect.innerHTML = '';
  matches.forEach(match => {
    const opt = document.createElement('option');
    opt.value = match.id;
    opt.textContent = `Match ID ${match.id} @ ${match.location}`;
    matchSelect.appendChild(opt);
  });
}

async function loadPlayers() {
  const players = await getList('players');
  playerSelect.innerHTML = '';
  players.forEach(player => {
    const opt = document.createElement('option');
    opt.value = player.id;
    opt.textContent = `${player.first_name} ${player.last_name}`;
    playerSelect.appendChild(opt);
  });
}

async function loadStats() {
  const stats = await getList('stats');
  const players = await getList('players');
  const playerMap = Object.fromEntries(players.map(p => [p.id, `${p.first_name} ${p.last_name}`]));
  statsList.innerHTML = '';
  stats.forEach(stat => {
    const li = document.createElement('li');
    li.textContent = `Match ${stat.match}, Player ${playerMap[stat.player]}: ${stat.points} pts, ${stat.blocks} blocks, ${stat.aces} aces, ${stat.errors} errors`;
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