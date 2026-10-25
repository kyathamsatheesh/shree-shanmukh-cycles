// Generates simple SVG placeholder images so the site looks complete before real photos exist.
// Run: npm run placeholders   (safe to delete these once you add real photos)
import fs from "node:fs";
import path from "node:path";

const out = (p, svg) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, svg);
};

const bike = (c, x = 0, y = 0, s = 1) => `
<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="70" cy="150" r="52"/><circle cx="250" cy="150" r="52"/>
  <path d="M70 150 L125 65 L150 150 Z M125 65 H215 L150 150 M215 65 L250 150 M125 65 V48 M105 48 H145 M215 65 L203 38 H232"/>
</g>`;

const esc = (s) => s.replace(/&(?!quot;|amp;)/g, "&amp;").replace(/</g, "&lt;");
const card = (bg, frame, label, sub) => (label = esc(label), sub = esc(sub), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" width="800" height="700">
<rect width="800" height="700" fill="${bg}"/>
<ellipse cx="400" cy="560" rx="260" ry="22" fill="#000" opacity="0.06"/>
${bike(frame, 240, 300, 1)}
<text x="400" y="110" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="40" font-weight="600" fill="#0B2A5B">${label}</text>
<text x="400" y="160" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="26" fill="#4A5A75">${sub}</text>
</svg>`);

const root = path.resolve("public");

// Hero placeholder (replace public/images/hero.jpg with a real shop photo — see README)
out(path.join(root, "images/hero.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 1040" width="1240" height="1040">
<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE3FF"/><stop offset="1" stop-color="#F4F7FC"/></linearGradient></defs>
<rect width="1240" height="1040" fill="url(#s)"/>
<circle cx="1020" cy="180" r="80" fill="#FFC72C"/>
<rect x="0" y="640" width="1240" height="400" fill="#D8E1EF"/>
<rect x="0" y="780" width="1240" height="16" fill="#FFFFFF" opacity="0.8"/>
${bike("#1E5BD8", 150, 520, 1.25)}${bike("#1F8A4C", 520, 560, 1.05)}${bike("#E2312F", 860, 540, 1.15)}
<text x="620" y="320" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="46" font-weight="600" fill="#0B2A5B">Replace with a real shop photo</text>
<text x="620" y="380" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="30" fill="#4A5A75">public/images/hero.jpg</text>
</svg>`);

const need = [
  ["need-toddler", "#FFF4CC", "#E2A400", "Toddlers & tricycles", "Ages 1.5–4"],
  ["need-kids", "#E3EEFF", "#1E5BD8", "Kids cycles", "Ages 4–9"],
  ["need-school", "#E3F3E8", "#1F8A4C", "School cycles", "Ages 10+"],
  ["need-accessories", "#FDE7E7", "#E2312F", "Safety & accessories", "Helmets, lights, bells"],
];
for (const [f, bg, c, l, s] of need) out(path.join(root, `images/${f}.svg`), card(bg, c, l, s));

// Sample week — delete this folder when you add your first real week
const week = "2026-10-19";
const items = [
  ["01-balance-cycle-12.svg", "#FFE9E6", "#E2312F", 'Balance cycle 12"', "Ages 2–4"],
  ["02-kids-cycle-16-side-wheels.svg", "#E3EEFF", "#1E5BD8", 'Kids cycle 16"', "Ages 4–6"],
  ["03-toddler-tricycle.svg", "#FFF4CC", "#E2A400", "Toddler tricycle", "Ages 1.5–3"],
  ["04-kids-sports-cycle-20.svg", "#FFEBD9", "#E8731A", 'Kids sports cycle 20"', "Ages 6–9"],
  ["05-teen-cycle-24.svg", "#E0F4F4", "#138A8A", 'Teen cycle 24"', "Ages 9–13"],
  ["06-school-cycle-carrier.svg", "#E3F3E8", "#1F6B3A", "School cycle", "Ages 10+"],
  ["07-ladies-city-cycle-26.svg", "#F4EFE6", "#8A6A3C", "Ladies city cycle 26\"", "Adults"],
  ["08-helmet-lights-bell.svg", "#E6F0FF", "#0B2A5B", "Helmet & lights set", "Accessories"],
];
for (const [f, bg, c, l, s] of items) out(path.join(root, `arrivals/${week}/${f}`), card(bg, c, l.replace(/"/g, "&quot;"), s));
console.log("Placeholders written to public/images and public/arrivals/" + week);
