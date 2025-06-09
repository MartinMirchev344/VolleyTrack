const API_BASE = 'http://localhost:8000/api';

export async function getList(resource) {
  const res = await fetch(`${API_BASE}/${resource}/`);
  return res.json();
}

export async function getDetail(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}/`);
  return res.json();
}

export async function post(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function put(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function remove(resource, id) {
  return fetch(`${API_BASE}/${resource}/${id}/`, { method: 'DELETE' });
}