import { useEffect, useId, useRef, useState } from "react";
import { reviewMode } from "../config/site.js";
import SiteLink from "./SiteLink.jsx";

const empty = { name: "", email: "", phone: "", _gotcha: "" };

export default function WaitlistForm({
  headingId,
  navigate,
  compact = false,
  className = "",
}) {
  const uid = useId();
  const fid = (name) => `${uid}-${name}`;
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const message = useRef(null);
  const busy = useRef(false);

  useEffect(() => {
    if (status !== "idle" && status !== "sending") {
      message.current?.focus();
    }
  }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;

    const checked = validateWaitlist(form);
    setErrors(checked.errors);
    if (Object.keys(checked.errors).length) {
      setStatus("invalid");
      requestAnimationFrame(() => message.current?.focus());
      return;
    }

    if (reviewMode) {
      setStatus("preview");
      return;
    }

    busy.current = true;
    setStatus("sending");
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let response;
      try {
        response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...checked.value,
            _gotcha: form._gotcha,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrors({
          form:
            response.status === 503
              ? "The waitlist is temporarily unavailable. Please try again soon."
              : "Your request could not be confirmed. Please try again.",
        });
        setStatus("error");
      } else {
        setForm(empty);
        setStatus("received");
      }
    } catch {
      setErrors({
        form: "We could not confirm receipt. Your details are still here; please try again.",
      });
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }

  const fields = [
    ["name", "Name", "text", "name", true],
    ["email", "Email", "email", "email", true],
    ["phone", "Phone (optional)", "tel", "tel", false],
  ];

  return (
    <div
      className={`waitlist-wrap ${
        compact ? "compact-signup" : "stacked-signup"
      } ${className}`.trim()}
    >
      <form onSubmit={submit} aria-labelledby={headingId} noValidate>
        {Object.keys(errors).length > 0 && (
          <div
            className="form-errors"
            role="alert"
            tabIndex={-1}
            ref={message}
          >
            <p>Please check your details.</p>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {key === "form" ? (
                    value
                  ) : (
                    <a
                      href={`#${fid(key)}`}
                      onClick={() =>
                        document.getElementById(fid(key))?.focus()
                      }
                    >
                      {fields.find((field) => field[0] === key)?.[1] || key}:{" "}
                      {value}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="signup-fields">
          {fields.map(([name, label, type, autocomplete, required]) => (
            <div className="signup-field" key={name}>
              <label htmlFor={fid(name)}>{label}</label>
              <input
                className="form-field"
                id={fid(name)}
                name={name}
                type={type}
                autoComplete={autocomplete}
                value={form[name]}
                required={required}
                maxLength={name === "email" ? 254 : name === "phone" ? 32 : 120}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? fid(`error-${name}`) : undefined}
                onChange={(event) =>
                  setForm({ ...form, [name]: event.target.value })
                }
              />
              {errors[name] && (
                <p id={fid(`error-${name}`)} className="field-error">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
          <button
            disabled={status === "sending"}
            className="button primary signup-button"
            type="submit"
          >
            {status === "sending" ? "Sending..." : "Join our waitlist"}
          </button>
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor={fid("website")}>Leave blank</label>
          <input
            id={fid("website")}
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={form._gotcha}
            onChange={(event) =>
              setForm({ ...form, _gotcha: event.target.value })
            }
          />
        </div>
        <p className="signup-note">
          {reviewMode
            ? "Preview only. Nothing will be sent or saved. "
            : "We'll use these details to respond to your request. "}
          <SiteLink href="/privacy" navigate={navigate}>
            Privacy Policy
          </SiteLink>
        </p>
      </form>
      {["preview", "received"].includes(status) && (
        <div className="panel mt-6" role="status" ref={message} tabIndex={-1}>
          <h3 className="text-xl font-semibold">
            {status === "preview" ? "Your details passed validation." : "Thank you."}
          </h3>
          <p className="mt-3">
            {status === "preview"
              ? "This is a preview. Nothing was sent or saved."
              : "You have been added to the CoachUS waitlist. We will be in contact soon."}
          </p>
          <button
            className="button secondary mt-4"
            onClick={() => {
              setStatus("idle");
              document.getElementById(fid("email"))?.focus();
            }}
            type="button"
          >
            Edit details
          </button>
        </div>
      )}
    </div>
  );
}

function validateWaitlist(form) {
  const value = {
    name: clean(form.name, 120),
    email: clean(form.email, 254).toLowerCase(),
    phone: clean(form.phone, 32),
  };
  const errors = {};

  if (!value.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (value.phone && !isValidPhone(value.phone)) {
    errors.phone = "Enter a valid phone number or leave this blank.";
  }

  return { value, errors };
}

function clean(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return (
    /^[+().\-\sxX\d]+$/.test(value) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}
