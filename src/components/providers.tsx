"use client";
import { AppProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <SessionProvider>{children}</SessionProvider>
    </AppProvider>
  );
}