import { useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Leadership from "./pages/Leadership.jsx";
import Data from "./pages/Data.jsx";
import Privacy from "./pages/Privacy.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { pageMeta } from "./data/content.js";

const routeMap = {
  "/": Home,
  "/about": About,
  "/leadership": Leadership,
  "/data": Data,
  "/privacy": Privacy,
  "/login": Login,
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/index.html") return "/";
  return pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
}

function setMeta(selector, value) {
  if (!value) return;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const nameMatch = selector.match(/name="([^"]+)"/);
    const propertyMatch = selector.match(/property="([^"]+)"/);
    if (nameMatch) tag.setAttribute("name", nameMatch[1]);
    if (propertyMatch) tag.setAttribute("property", propertyMatch[1]);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

function updateCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function scrollToHash(hash, behavior = "smooth") {
  if (!hash) return;

  const id = hash.slice(1);
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: reduceMotion ? "auto" : behavior,
    });
  }, 0);

  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: reduceMotion ? "auto" : behavior,
    });
  }, 120);
}

export default function App() {
  const [path, setPath] = useState(() =>
    normalizePath(window.location.pathname),
  );

  const navigate = useCallback((href) => {
    const url = new URL(href, window.location.origin);
    const nextPath = normalizePath(url.pathname);

    window.history.pushState({}, "", `${nextPath}${url.hash}`);
    setPath(nextPath);

    requestAnimationFrame(() => {
      if (url.hash) {
        scrollToHash(url.hash);
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    });
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta[path] || pageMeta.default;
    const canonical = `${window.location.origin}${path === "/" ? "" : path}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[name="twitter:card"]', "summary");
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
    updateCanonical(canonical);
  }, [path]);

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;

    requestAnimationFrame(() => {
      scrollToHash(hash);
    });
  }, [path]);

  const Page = routeMap[path] || NotFound;
  const shellClass = useMemo(
    () =>
      "min-h-screen overflow-x-hidden bg-[#07090d] text-white antialiased selection:bg-[#ff6b3d]/25 selection:text-white",
    [],
  );

  return (
    <div className={shellClass}>
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#06080d_0%,#0b1020_42%,#08090d_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(45,118,255,0.22),transparent_54%)]" />
      <Header path={path} navigate={navigate} />
      <main>
        <Page navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
