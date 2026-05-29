import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-accent-dark">
      {children}
    </p>
  );
}
