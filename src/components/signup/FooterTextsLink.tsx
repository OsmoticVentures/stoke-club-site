"use client";

import { useSignupModal } from "@/components/signup/SignupModalContext";

export default function FooterTextsLink({ className = "" }: { className?: string }) {
  const { openModal } = useSignupModal();

  return (
    <button type="button" onClick={openModal} className={className}>
      Join the club
    </button>
  );
}
