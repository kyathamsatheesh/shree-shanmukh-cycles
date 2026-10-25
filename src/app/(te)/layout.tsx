import type { ReactNode } from "react";
import "../globals.css";
import RootShell from "@/components/RootShell";

export default function TeluguLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="te">{children}</RootShell>;
}
