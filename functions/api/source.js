// functions/api/source.js
export async function onRequestGet(context) {
    // 直接返回固定的 JSON，测试连通性
    const data = [
        { "id": 1, "name": "测试源1", "url": "https://example.com/stream1.m3u8" },
        { "id": 2, "name": "测试源2", "url": "https://example.com/stream2.m3u8" }
    ];
    
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
}
