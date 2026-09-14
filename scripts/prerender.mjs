import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
});
const escape = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { pageMeta } = await server.ssrLoadModule("/src/data/content.js");
  const template = await readFile("dist/index.html", "utf8");
  for (const path of Object.keys(pageMeta)
    .filter((k) => k !== "default" && !(process.env.VITE_RELEASE_APPROVED === "true" && k === "/privacy/application"))
    .concat("/404")) {
    const meta = pageMeta[path] || pageMeta.default;
    let html = template.replace(
      /<title>.*?<\/title>/,
      "<title>" + escape(meta.title) + "</title>",
    );
    html = html.replace(
      /<meta\s+(?:name|property)="(?:description|og:title|og:description|og:url|twitter:title|twitter:description|robots)"[^>]*>/g,
      "",
    );
    html = html.replace(/<link\s+rel="canonical"[^>]*>/g, "");
    const noindex =
      process.env.VITE_RELEASE_APPROVED !== "true" ||
      ["/404", "/verify", "/login"].includes(path);
    const url = "https://www.coachus.com" + (path === "/" ? "/" : path);
    html = html.replace(
      "</head>",
      `<meta name="description" content="${escape(meta.description)}"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:url" content="${url}"><meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}"><link rel="canonical" href="${url}"></head>`,
    );
    html = html.replace(
      '<div id="root"></div>',
      '<div id="root">' +
        renderToString(createElement(App, { initialPath: path })) +
        "</div>",
    );
    const file =
      path === "/"
        ? "dist/index.html"
        : path === "/404"
          ? "dist/404.html"
          : `dist${path}/index.html`;
    await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
    await writeFile(file, html);
  }
  const publicPaths = Object.keys(pageMeta).filter(
    (x) => x !== "default" && !["/verify", "/login", "/privacy/application"].includes(x),
  );
  await writeFile(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      publicPaths
        .map(
          (p) =>
            `<url><loc>https://www.coachus.com${p === "/" ? "/" : p}</loc></url>`,
        )
        .join("") +
      "</urlset>",
  );
  await writeFile(
    "dist/robots.txt",
    process.env.VITE_RELEASE_APPROVED === "true"
      ? "User-agent: *\nAllow: /\nSitemap: https://www.coachus.com/sitemap.xml\n"
      : "User-agent: *\nDisallow: /\n",
  );
} finally {
  await server.close();
}
