export type IconName =
  | "play"
  | "image"
  | "headphones"
  | "note"
  | "waveform"
  | "camera"
  | "clip"
  | "chevronDown"
  | "users"
  | "message"
  | "check"
  | "close";

type IconProps = {
  name: IconName;
  className?: string;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Paths({ name }: { name: IconName }) {
  switch (name) {
    case "play":
      return (
        <>
          <circle cx="12" cy="12" r="9.25" />
          <path d="M10.2 8.6l5.4 3.4-5.4 3.4V8.6z" strokeLinejoin="round" />
        </>
      );
    case "image":
      return (
        <>
          <rect x="3.5" y="4.75" width="17" height="14.5" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M4 17l5-5 3.5 3.5L17 11l3 3" />
        </>
      );
    case "headphones":
      return (
        <>
          <path d="M4 14v-2a8 8 0 0116 0v2" />
          <rect x="3.5" y="14" width="4" height="5.5" rx="1.5" />
          <rect x="16.5" y="14" width="4" height="5.5" rx="1.5" />
        </>
      );
    case "note":
      return (
        <>
          <circle cx="7.5" cy="17.5" r="2.5" />
          <circle cx="17" cy="15.5" r="2.5" />
          <path d="M10 17.5V6.5L19.5 4.5v11" />
        </>
      );
    case "waveform":
      return (
        <>
          <path d="M3.5 12v0" />
          <path d="M6 9v6M9.5 6v12M13 4v16M16.5 8v8M20 10.5v3" />
        </>
      );
    case "camera":
      return (
        <>
          <path d="M7.5 6.5L9 4.5h6l1.5 2H20a1 1 0 011 1V18a1 1 0 01-1 1H4a1 1 0 01-1-1V7.5a1 1 0 011-1h3.5z" />
          <circle cx="12" cy="12.5" r="3.75" />
        </>
      );
    case "clip":
      return (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M3.5 9.25h17M7.5 5.5v3.75M12 5.5v3.75M16.5 5.5v3.75" />
        </>
      );
    case "chevronDown":
      return <path d="M6 9.5l6 6 6-6" />;
    case "message":
      return (
        <path d="M4 5.5h16a1 1 0 011 1V16a1 1 0 01-1 1H9l-4.5 3.5V17H4a1 1 0 01-1-1V6.5a1 1 0 011-1z" />
      );
    case "check":
      return <path d="M5 12.5l4.5 4.5L19 7" />;
    case "close":
      return <path d="M6 6l12 12M18 6L6 18" />;
    case "users":
      return (
        <>
          <circle cx="8.5" cy="9" r="3" />
          <circle cx="16" cy="10" r="2.25" />
          <path d="M3.5 19v-1.2A4.3 4.3 0 017.8 13.5h1.4a4.3 4.3 0 014.3 4.3V19" />
          <path d="M15 13.9a3.6 3.6 0 013.5 2.9V19" />
        </>
      );
    default:
      return null;
  }
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...strokeProps}
    >
      <Paths name={name} />
    </svg>
  );
}
