type P = { className?: string };

export const WheelLogo = ({ className = "h-10 w-10", color = "currentColor" }: P & { color?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="21" stroke={color} strokeWidth="4" />
    <path d="M24 7V41M7 24H41M12 12L36 36M36 12L12 36" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="24" cy="24" r="5" fill={color} />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.5-2.5-2-3-3l1-1-1-2L9 8.5Z" fill="currentColor" />
  </svg>
);

export const PhoneIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const GlobeIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 12H21M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ChevronIcon = ({ className = "h-3.5 w-3.5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MenuIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const PinIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const PlusIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
