import { useEffect, useRef, useState } from "react";
import { assets, navItems } from "../config/site.js";
import SiteLink from "./SiteLink.jsx";
export default function Header({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  function keydown(e) {
    if (e.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }
  const links = navItems.map((item) => (
    <SiteLink
      key={item.href}
      href={item.href}
      navigate={navigate}
      aria-current={path === item.href ? "page" : undefined}
      onClick={() => setOpen(false)}
      className="nav-link"
    >
      {item.label}
    </SiteLink>
  ));
  return (
    <header className="site-header" onKeyDown={keydown}>
      <div className="header-bar">
        <SiteLink href="/" navigate={navigate} aria-label="CoachUS home">
          <img
            src={assets.logoColorInvert}
            alt="CoachUS"
            width="190"
            height="38"
            className="brand-logo"
          />
        </SiteLink>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-2 lg:flex"
        >
          {links}
        </nav>
        <div className="flex items-center gap-2">
          <SiteLink
            href="/early-access"
            navigate={navigate}
            className="button primary header-cta"
            onClick={() => setOpen(false)}
          >
            Join our waitlist
          </SiteLink>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-nav lg:hidden"
        >
          {links}
        </nav>
      )}
    </header>
  );
}
