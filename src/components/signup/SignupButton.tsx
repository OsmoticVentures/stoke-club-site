"use client";

import { Icon } from "@/components/Icons";
import { useSignupModal } from "@/components/signup/SignupModalContext";

type SignupButtonProps = {
  className?: string;
  label?: string;
};

export default function SignupButton({ className = "", label = "Join the club" }: SignupButtonProps) {
  const { openModal } = useSignupModal();

  return (
    <button
      type="button"
      onClick={openModal}
      className={`press inline-flex items-center gap-2.5 rounded-lg bg-[var(--color-paper)] px-6 py-3.5 text-sm font-semibold text-[#0a0908] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] ${className}`}
    >
      <Icon name="bubble" className="h-5 w-5" />
      {label}
    </button>
  );
}
