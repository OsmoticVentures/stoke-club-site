import { Icon, type IconName } from "@/components/Icons";

type PlaceholderBlockProps = {
  icon: IconName;
  aspect?: string;
  className?: string;
  iconClassName?: string;
  tone?: "dark" | "light";
};

export default function PlaceholderBlock({
  icon,
  aspect = "16/9",
  className = "",
  iconClassName = "h-10 w-10",
  tone = "dark",
}: PlaceholderBlockProps) {
  const surface =
    tone === "dark"
      ? "bg-white/[0.04] border border-white/10"
      : "bg-black/[0.04] border border-black/10";
  const iconTone = tone === "dark" ? "text-white/25" : "text-black/20";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${surface} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Icon name={icon} className={`${iconClassName} ${iconTone}`} />
    </div>
  );
}
