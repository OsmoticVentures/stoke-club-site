"use client";

import { Icon, type IconName } from "@/components/Icons";
import { LINKS, type LinkKey } from "@/lib/links";

type InertButtonProps = {
  label: string;
  icon: IconName;
  variant?: "solid" | "outline";
  linkKey?: LinkKey;
};

export default function InertButton({ label, icon, variant = "outline", linkKey }: InertButtonProps) {
  const href = linkKey ? LINKS[linkKey] : null;
  const base =
    "press inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium select-none";
  const styles =
    variant === "solid"
      ? "bg-[var(--color-stoke-blue)] text-[#050506] opacity-90 hover:opacity-100"
      : "border border-white/20 text-white/85 opacity-90 hover:opacity-100 hover:border-white/35";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        role="button"
        className={`${base} ${styles}`}
      >
        <Icon name={icon} className="h-4.5 w-4.5" />
        {label}
      </a>
    );
  }

  return (
    <a
      href="#"
      role="button"
      aria-disabled="true"
      onClick={(e) => e.preventDefault()}
      className={`${base} ${styles} cursor-default`}
    >
      <Icon name={icon} className="h-4.5 w-4.5" />
      {label}
    </a>
  );
}
