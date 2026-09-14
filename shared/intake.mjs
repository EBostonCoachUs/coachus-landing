export const roles = [
  "Dealer Principal / Owner",
  "General Manager",
  "Sales Manager",
  "Salesperson",
  "Other",
];
const limits = { name: 120, email: 254, dealership: 160, role: 60 };
export function validateIntake(input) {
  const errors = {};
  const value = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { form: "Check your details and try again." }, value };
  for (const [key, max] of Object.entries(limits)) {
    const v = input[key];
    if (key === "role" && (v === undefined || v === "")) {
      value.role = "Not provided";
      continue;
    }
    if (
      typeof v !== "string" ||
      v.length > max ||
      /[\u0000-\u001f\u007f]/.test(v)
    ) {
      errors[key] = "Enter a valid value.";
      continue;
    }
    value[key] = v.trim().replace(/\s+/g, " ");
    if (!value[key]) errors[key] = "This field is required.";
  }
  if (value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.email))
    errors.email = "Enter a valid email address.";
  if (value.role && value.role !== "Not provided" && !roles.includes(value.role))
    errors.role = "Choose your role.";
  if (value.email && !errors.email) {
    const at = value.email.lastIndexOf("@");
    value.email =
      value.email.slice(0, at) + value.email.slice(at).toLowerCase();
  }
  return { errors, value };
}
export function campaignFromSearch(search) {
  const params = new URLSearchParams(search);
  const values = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const v = params.get(key);
    // Accept controlled campaign labels, never free-form URLs or contact data.
    if (v && /^[a-zA-Z0-9_-]{1,80}$/.test(v)) values[key] = v;
  }
  return values;
}
