export default function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  className = "",
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && (
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
          <span className="h-px w-8 bg-[#ff7a45]" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {children && (
        <div className="text-base leading-8 text-slate-300 md:text-lg">
          {children}
        </div>
      )}
    </div>
  );
}
