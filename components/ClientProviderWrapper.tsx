"use client";

import { SessionProvider } from "next-auth/react";

/**
 * A wrapper component that provides a `SessionProvider` to its children.
 *
 * This allows server-side rendered pages to work with the `useSession` hook
 * from `next-auth`.
 *
 *******/
export default function ClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
