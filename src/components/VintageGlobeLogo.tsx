import { type FC, type SVGProps } from "react";

export interface VintageGlobeLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const VintageGlobeLogo: FC<VintageGlobeLogoProps> = ({
  size = 24,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Tilted Globe Coordinates & Sphere (Classic 23.5° European Axial Tilt) */}
      <g transform="rotate(23.5 12 9.5)">
        {/* North/South Axis Pin */}
        <line x1="12" y1="3.8" x2="12" y2="15.2" />

        {/* Globe Sphere */}
        <circle cx="12" cy="9.5" r="4.6" />

        {/* Equator Coordinate Line */}
        <ellipse cx="12" cy="9.5" rx="4.6" ry="1.5" />

        {/* Prime Meridian Coordinate Arc */}
        <ellipse cx="12" cy="9.5" rx="1.9" ry="4.6" />
      </g>

      {/* Brass Meridian Cradle Arch */}
      <path d="M 14.5 4.1 A 6.4 6.4 0 0 0 9.5 14.9" />

      {/* Stand Stem */}
      <path d="M 12 16.5 v 4.5" />

      {/* Pedestal Base Foot */}
      <path d="M 8.5 21 h 7" />
    </svg>
  );
};

export default VintageGlobeLogo;
