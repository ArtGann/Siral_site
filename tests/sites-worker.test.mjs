import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    response.headers.get("permissions-policy"),
    'camera=(), microphone=(self "https://widgets.leadconnectorhq.com"), geolocation=()',
  );
});

test("returns the branded 404 page with a real HTTP 404 status", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/not-a-real-page/?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          if (url.pathname === "/404/index.html") {
            return new Response("branded 404", {
              status: 200,
              headers: { "content-type": "text/html; charset=utf-8" },
            });
          }
          return new Response("missing", { status: 404 });
        },
      },
    },
  );

  assert.equal(response.status, 404);
  assert.equal(await response.text(), "branded 404");
  assert.deepEqual(calls, ["/not-a-real-page/?source=share", "/404/index.html"]);
});

test("does not turn missing API or write requests into the HTML 404 page", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("prerenders the Voice AI widget exactly once on root and internal pages", async () => {
  const widgetId = "6aa41a2a5b2ec56e21c997b7";
  const pages = ["../dist/client/index.html", "../dist/client/about/index.html"];

  for (const page of pages) {
    const html = await readFile(new URL(page, import.meta.url), "utf8");
    assert.ok(html.includes("https://widgets.leadconnectorhq.com/loader.js"));
    assert.equal(html.split(widgetId).length - 1, 1);
  }
});
