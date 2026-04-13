// functions/api/source.js
export async function onRequestGet({ env }) {
  // 从D1数据库读取所有源
  const { results } = await env.DB.prepare(
    "SELECT id, name, url FROM sources ORDER BY id"
  ).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost({ env, request }) {
  // 新增/更新源到D1数据库
  const { name, url } = await request.json();
  
  if (!name || !url) {
    return new Response(JSON.stringify({ error: "name和url不能为空" }), { status: 400 });
  }

  await env.DB.prepare(
    "INSERT INTO sources (name, url) VALUES (?, ?)"
  ).bind(name, url).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestDelete({ env, request }) {
  // 从D1数据库删除源
  const { id } = await request.json();
  
  if (!id) {
    return new Response(JSON.stringify({ error: "id不能为空" }), { status: 400 });
  }

  await env.DB.prepare(
    "DELETE FROM sources WHERE id = ?"
  ).bind(id).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
