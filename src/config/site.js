export const assets = {
  logoColorInvert: "/assets/Color-Invert-cropped.svg",
  logoWhite: "/assets/White-cropped.svg",
  mark: "/assets/USLogo.svg",
  founderHeadshot: "/assets/matt-cady-headshot.jpg",
};

export const site = {
  name: "CoachUS",
  legalName: "CoachUS LLC",
  contactEmail: "matt.cady@coachus.com",
  founderEmail: "matt.cady@coachus.com",
  loginRoute: "/login",
  futureLoginUrl: "https://app.coachus.com",
  canonicalOrigin: "https://www.coachus.com",
};

export const navItems = [
  { label: "Product", href: "/#product" },
  { label: "About", href: "/about" },
  { label: "Founder", href: "/leadership" },
  { label: "Data", href: "/data" },
  { label: "Privacy", href: "/privacy" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  ...navItems,
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Login", href: site.loginRoute },
  { label: "Contact", href: "/support" },
];

export const reviewMode = import.meta.env.VITE_RELEASE_APPROVED !== "true";
