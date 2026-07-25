/**
 * Shared shield-check glyph used across every generated brand asset
 * (favicon, app icon, apple touch icon, Open Graph image). Kept as plain
 * JSX so it can be rendered by `next/og`'s Satori-based `ImageResponse`.
 */
export function ShieldMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3Z" fill="#0a0a0a" />
      <path
        d="m9 12 2 2 4-4"
        stroke="#fafafa"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const BRAND_GRADIENT = "linear-gradient(135deg, #9945FF 0%, #14F195 100%)";
