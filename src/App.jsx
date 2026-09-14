import { useCallback, useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import About from "./pages/About.jsx";
import Data from "./pages/Data.jsx";
import Privacy from "./pages/Privacy.jsx";
import EarlyAccess from "./pages/EarlyAccess.jsx";
import Support from "./pages/Support.jsx";
import Verify from "./pages/Verify.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { pageMeta } from "./data/content.js";
import { site, reviewMode } from "./config/site.js";
const routes = {
  "/": Home,
  "/product": Product,
  "/about": About,
  "/data": Data,
  "/early-access": EarlyAccess,
  "/privacy": Privacy,
  ...(reviewMode ? { "/privacy/application": Privacy } : {}),
  "/terms": Privacy,
  "/cookies": Privacy,
  "/support": Support,
  "/verify": Verify,
  "/login": Login,
};
export function normalizePath(path) {
  const aliases = { "/privacy-policy": "/privacy", "/terms-of-service": "/terms", "/cookie-policy": "/cookies" };
  path = aliases[path?.replace(/\/$/, "")] || path;
  return path === "/leadership"
    ? "/about"
    : !path || path === "/index.html"
      ? "/"
      : path.replace(/\/$/, "") || "/";
}
export default function App({ initialPath = "/" }) {
  const [location, setLocation] = useState(() =>
    typeof window === "undefined"
      ? { path: normalizePath(initialPath), hash: "", search: "" }
      : {
          path: normalizePath(window.location.pathname),
          hash: window.location.hash,
          search: window.location.search,
        },
  );
  const { path, hash } = location;
  const navigate = useCallback((href) => {
    const u = new URL(href, window.location.origin);
    window.history.pushState({}, "", u.pathname + u.search + u.hash);
    setLocation({
      path: normalizePath(u.pathname),
      hash: u.hash,
      search: u.search,
    });
  }, []);
  useEffect(() => {
    const pop = () =>
      setLocation({
        path: normalizePath(window.location.pathname),
        hash: window.location.hash,
        search: window.location.search,
      });
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    const meta = pageMeta[path] || pageMeta.default;
    document.title = meta.title;
    const values = {
      description: meta.description,
      "og:title": meta.title,
      "og:description": meta.description,
      "og:url": site.canonicalOrigin + (path === "/" ? "/" : path),
      "twitter:title": meta.title,
      "twitter:description": meta.description,
      robots:
        reviewMode || ["/verify", "/login"].includes(path) || !routes[path]
          ? "noindex, nofollow"
          : "index, follow",
    };
    for (const [name, value] of Object.entries(values)) {
      const attr = name.startsWith("og:") ? "property" : "name";
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = value;
    }
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = site.canonicalOrigin + (path === "/" ? "/" : path);
    if (path === "/verify") return;
    requestAnimationFrame(() => {
      let id = hash.slice(1);
      if (id === "waitlist") id = "early-access";
      if (id === "example" && path === "/") id = "product";
      const target = id
        ? document.getElementById(id)
        : document.getElementById("main-content");
      if (id) target?.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  }, [path, hash]);
  const Page = routes[path] || NotFound;
  return (
    <div className="min-h-screen bg-[#07090d] text-white antialiased">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {reviewMode && (
        <div className="review-banner">
          Review version · Form sends are off · Legal pages are drafts
        </div>
      )}
      <Header path={path} navigate={navigate} />
      <main id="main-content" tabIndex={-1}>
        <Page
          key={path}
          navigate={navigate}
          kind={
            path === "/privacy/application"
              ? "application"
              : path === "/terms"
                ? "terms"
                : path === "/cookies" ? "cookies" : "website"
          }
        />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
