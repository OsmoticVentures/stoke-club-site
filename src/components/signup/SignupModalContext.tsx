"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type SignupModalContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const SignupModalContext = createContext<SignupModalContextValue | null>(null);

export function SignupModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, openModal, closeModal }), [open, openModal, closeModal]);

  return <SignupModalContext.Provider value={value}>{children}</SignupModalContext.Provider>;
}

export function useSignupModal() {
  const ctx = useContext(SignupModalContext);
  if (!ctx) {
    throw new Error("useSignupModal must be used inside SignupModalProvider");
  }
  return ctx;
}
