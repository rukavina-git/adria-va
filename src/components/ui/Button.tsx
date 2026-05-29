import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-block rounded-full px-8 py-3 tracking-[0.02em] transition";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-sm font-semibold text-brand-dark hover:-translate-y-px hover:bg-accent-dark",
  ghost:
    "border border-white text-[13px] font-normal text-white",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
