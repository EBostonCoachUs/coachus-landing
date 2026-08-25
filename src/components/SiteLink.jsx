export default function SiteLink({
  href,
  navigate,
  children,
  onClick,
  ...props
}) {
  const isInternal = href?.startsWith("/");

  function handleClick(event) {
    onClick?.(event);
    if (
      !isInternal ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
