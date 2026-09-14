import { useCallback, useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import About from "./pages/About.jsx";
import Leadership from "./pages/Leadership.jsx";
import Data from "./pages/Data.jsx";
import Privacy from "./pages/Privacy.jsx";
import EarlyAccess from "./pages/EarlyAccess.jsx";
import Support from "./pages/Support.jsx";
import Verify from "./pages/Verify.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { pageMeta } from "./data/content.js";
import { reviewMode, site } from "./config/site.js";

const routeMap = {
  "/": Home,
  "/product": Product,
  "/about": About,
  "/leadership": Leadership,
  "/data": Data,
  "/early-access": EarlyAccess,
  "/privacy": Privacy,
  "/terms": Privacy,
  "/cookies": Privacy,
  "/support": Support,
  "/verify": Verify,
  "/login": Login,
};

const legalKinds = {
  "/privacy": "website",
  "/terms": "terms",
  "/cookies": "cookies",
};

export function normalizePath(pathname) {
  const withoutSlash =
    pathname && pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const aliases = {
    "/index.html": "/",
    "/privacy-policy": "/privacy",
    "/terms-of-service": "/terms",
    "/cookie-policy": "/cookies",
  };

  return aliases[withoutSlash] || withoutSlash || "/";
}

function setMeta(name, value, attr = "name") {
  if (!value) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
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
}

export default function App({ initialPath = "/" }) {
  const [location, setLocation] = useState(() =>
    typeof window === "undefined"
      ? { path: normalizePath(initialPath), hash: "" }
      : {
          path: normalizePath(window.location.pathname),
          hash: window.location.hash,
        },
  );

  const { path, hash } = location;

  const navigate = useCallback((href) => {
    const url = new URL(href, window.location.origin);
    const nextPath = normalizePath(url.pathname);

    window.history.pushState({}, "", `${nextPath}${url.hash}`);
    setLocation({ path: nextPath, hash: url.hash });

    requestAnimationFrame(() => {
      if (url.hash) {
        scrollToHash(url.hash);
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    });
  }, []);

  useEffect(() => {
    const onPopState = () =>
      setLocation({
        path: normalizePath(window.location.pathname),
        hash: window.location.hash,
      });
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta[path] || pageMeta.default;
    const canonical = `${site.canonicalOrigin}${path === "/" ? "/" : path}`;

    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta(
      "robots",
      reviewMode || ["/verify", "/login"].includes(path) || !routeMap[path]
        ? "noindex, nofollow"
        : "index, follow",
    );
    updateCanonical(canonical);
  }, [path]);

  useEffect(() => {
    if (!hash || path === "/verify") return;
    requestAnimationFrame(() => {
      scrollToHash(hash);
    });
  }, [hash, path]);

  const Page = routeMap[path] || NotFound;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07090d] text-white antialiased selection:bg-[#ff6b3d]/25 selection:text-white">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 font-semibold text-[#07090d] focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/25"
      >
        Skip to content
      </a>
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#06080d_0%,#0b1020_42%,#08090d_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(45,118,255,0.22),transparent_54%)]" />
      {reviewMode && (
        <div className="border-b border-[#e3b96d]/35 bg-[#282115] px-5 py-3 text-center text-sm text-[#ffdfa7]">
          Review version. Form sends are off. Legal pages are drafts.
        </div>
      )}
      <Header path={path} navigate={navigate} />
      <main id="main-content" tabIndex={-1}>
        <Page navigate={navigate} kind={legalKinds[path] || "website"} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
