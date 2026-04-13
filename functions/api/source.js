// 读取所有源
export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM sources ORDER BY id"
  ).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}

// 添加源
export async function onRequestPost({ env, request }) {
  const { name, url } = await request.json();

  await env.DB.prepare(
    "INSERT INTO sources (name, url) VALUES (?, ?)"
  ).bind(name, url).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

// 删除源
export async function onRequestDelete({ env, request }) {
  const { id } = await request.json();

  await env.DB.prepare(
    "DELETE FROM sources WHERE id = ?"
  ).bind(id).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}