import type { ReactNode } from "react";
import "../globals.css";
import RootShell from "@/components/RootShell";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
