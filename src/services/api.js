const API = "http://127.0.0.1:5001";

export async function fetchSheet(sheet) {
  const res = await fetch(`${API}/?sheet=${sheet}`);
  if (!res.ok) throw new Error("Server error");
  return res.json();
}

export async function postOrder(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save order");
  return res.json();
}

export async function checkServer() {
  try {
    await fetch(`${API}/`);
    return true;
  } catch {
    return false;
  }
}