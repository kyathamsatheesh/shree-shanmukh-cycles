import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  sub,
  right,
  eyebrowClass = "text-brand",
  id,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  right?: ReactNode;
  eyebrowClass?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-2.5">
        <p className={`eyebrow ${eyebrowClass}`}>{eyebrow}</p>
        <h2 id={id} className="text-[26px] font-bold leading-[1.2] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
          {title}
        </h2>
        {sub && <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-[17px]">{sub}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-semibold transition-colors";

export const btn = {
  primary: `${base} bg-sun text-ink hover:bg-[#f5b800]`,
  outline: `${base} border-[1.5px] border-ink bg-surface text-ink hover:bg-ink hover:text-white`,
  whatsapp: `${base} bg-wa text-white hover:bg-wa-dark`,
};
