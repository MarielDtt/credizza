import type { SVGProps } from "react";

export default function TikTokIcon({ fontSize, sx, ...props }: SVGProps<SVGSVGElement> & { fontSize?: "large"; sx?: { fontSize?: number } }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true"
      style={{ fontSize: sx?.fontSize ?? (fontSize === "large" ? "2.1875rem" : undefined) }} {...props}>
      <path d="M16.6 1H12.9v14.3a3.4 3.4 0 1 1-2.9-3.4V8.2a7.1 7.1 0 1 0 6.6 7.1V8a9.2 9.2 0 0 0 5.4 1.7V6a5.5 5.5 0 0 1-5.4-5Z" />
    </svg>
  );
}
