"use client";
import React, { createContext, useContext, useState } from "react";

export type HeaderConfig = {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightElements?: React.ReactNode;
  className?: string; 
};

type HeaderContextType = {
  header: HeaderConfig;
  setHeader: (c: HeaderConfig) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = useState<HeaderConfig>({});
  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderContext() {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error("useHeaderContext must be used inside HeaderProvider");
  return ctx;
}
