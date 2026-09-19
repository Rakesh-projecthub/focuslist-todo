import type { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
  label: string;
}

export function Icon({ children, label }: IconProps) {
  return (
    <span className="icon" aria-hidden="true" title={label}>
      {children}
    </span>
  );
}