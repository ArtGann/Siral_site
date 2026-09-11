const withHeaders = (response) => {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set(
    "Permissions-Policy",
    'camera=(), microphone=(self "https://widgets.leadconnectorhq.com"), geolocation=()',
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return withHeaders(response);
    }

    const notFoundUrl = new URL(request.url);
    notFoundUrl.pathname = "/404/index.html";
    notFoundUrl.search = "";

    const notFound = await env.ASSETS.fetch(new Request(notFoundUrl, request));
    if (notFound.ok) {
      return withHeaders(
        new Response(notFound.body, {
          status: 404,
          headers: notFound.headers,
        }),
      );
    }

    return withHeaders(new Response("Not Found", { status: 404 }));
  },
};
