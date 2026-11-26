// Pricing and rules for the "Build Your Bar Experience" quote generator.
// Source: Fern's planning doc (Nov 2026). Items marked CONFIRM are placeholders
// until Fern decides — change the value here and the whole tool updates.

export const QUOTE_SETTINGS = {
  hstRate: 0.13,
  includedHours: 4, // each bartender's base rate covers 4 hours
  bartenderRate: 300, // per bartender, 4 hours
  extraHourRate: 80, // per bartender, per extra hour
  barCartRate: 250,
  serviceFee: 300, // CONFIRM: "Event Service / Preparation Fee — confirm inclusion"
  serviceFeeEnabled: true, // CONFIRM
  minimumBooking: 1000, // CONFIRM: proposed minimum, shown as a soft note only
  guestsPerBartender: 50, // CONFIRM: used for the suggested bartender count
  travelIncludedKm: 40, // travel beyond this is quoted separately
  gratuityNote: "", // CONFIRM: e.g. "Gratuity is not included." — empty hides it
  maxHours: 8,
  maxBartenders: 12,
};

export type BarPackage = { id: string; name: string; perGuest: number; blurb: string };

export const PACKAGES: BarPackage[] = [
  {
    id: "two-signature",
    name: "Two Signature Cocktails",
    perGuest: 10,
    blurb: "Two custom cocktails designed around your event, flavours and colours.",
  },
  {
    id: "three-signature",
    name: "Three Signature Cocktails",
    perGuest: 15,
    blurb: "A trio of custom cocktails for more variety through the night.",
  },
  {
    id: "open-bar",
    name: "Open Bar Experience",
    perGuest: 20,
    blurb: "A full-service bar with classics and favourites on request.",
  },
];

export const DRINK_STYLES = ["Cocktails", "Mocktails", "A mix of both"];

export type AddOn = { id: string; name: string; price: number; from?: boolean; note?: string };

export const ADD_ONS: AddOn[] = [
  { id: "michelada", name: "Michelada Station", price: 300 },
  { id: "champagne-wall", name: "Champagne Wall Experience", price: 400 },
  { id: "shot-cart", name: "Shot Cart", price: 400 },
  { id: "tequila-tasting", name: "Tequila Tasting", price: 300, from: true, note: "Up to 25 guests" },
  { id: "smoked-cocktails", name: "Smoked Cocktails", price: 200, from: true },
  { id: "hydration", name: "Hydration Station", price: 150 },
];

// Offered, but priced case by case: shown as "Custom Quote Required".
export const CUSTOM_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Experiences",
    items: ["Build-Your-Own Margarita Bar", "Martini Experience", "Guided Cocktail Tasting", "Cocktail Flights", "Champagne or Shot Tower", "Interactive Garnish Station"],
  },
  {
    title: "Beverage bars",
    items: ["Signature Mocktail Bar", "Coffee & Espresso Bar", "Seasonal Beverage Bar", "Welcome Drink Station"],
  },
  {
    title: "Branding",
    items: ["Personalized Menu Signage", "Custom Cocktail Names", "Bar Cart Decal / Branding", "Edible Drink Toppers", "Branded Stirrers", "Branded Ice", "Personalized Cups"],
  },
  {
    title: "Rentals & styling",
    items: ["Premium Glassware", "Floral Bar Arrangements", "Flower Wall", "Balloon Styling", "Neon Signage", "Custom Bar Décor"],
  },
];

export const EVENT_TYPES = [
  "Wedding or Engagement",
  "Birthday or Private Celebration",
  "Corporate Event",
  "Brand Activation or Launch",
  "Bridal Shower or Bachelorette",
  "Holiday Party",
  "Wellness or Community Event",
  "Other",
];

export const DISCLAIMER =
  "All prices are estimates and subject to final confirmation by The Sip Cart. Pricing may vary based on guest count, cocktail selections, event location, duration, staffing requirements, and specialty requests. Travel fees and applicable taxes may apply. The Sip Cart operates as a dry-hire mobile bar service, with alcohol supplied by the client. Final alcohol arrangements, inclusions, and service requirements will be confirmed during the booking process.";

export type QuoteInput = {
  guests: number;
  hours: number;
  packageId: string;
  barCart: boolean;
  bartenders: number;
  addOnIds: string[];
};

export type QuoteLine = { label: string; detail?: string; amount: number; from?: boolean };

export const suggestedBartenders = (guests: number) =>
  Math.min(QUOTE_SETTINGS.maxBartenders, Math.max(1, Math.ceil((guests || 0) / QUOTE_SETTINGS.guestsPerBartender)));

const round2 = (n: number) => Math.round(n * 100) / 100;

export function calculateQuote(q: QuoteInput) {
  const s = QUOTE_SETTINGS;
  const lines: QuoteLine[] = [];
  const pkg = PACKAGES.find((p) => p.id === q.packageId);
  const guests = Math.max(0, Math.floor(q.guests || 0));

  if (pkg && guests > 0) {
    lines.push({ label: pkg.name, detail: `${guests} guests × $${pkg.perGuest}`, amount: guests * pkg.perGuest });
  }
  if (q.barCart) lines.push({ label: "Signature mobile bar cart", amount: s.barCartRate });
  if (q.bartenders > 0) {
    lines.push({
      label: q.bartenders === 1 ? "Professional bartender" : "Professional bartenders",
      detail: `${q.bartenders} × $${s.bartenderRate} (${s.includedHours} hours)`,
      amount: q.bartenders * s.bartenderRate,
    });
    const extra = Math.max(0, q.hours - s.includedHours);
    if (extra > 0) {
      lines.push({
        label: "Additional service hours",
        detail: `${extra} hr × ${q.bartenders} bartender${q.bartenders > 1 ? "s" : ""} × $${s.extraHourRate}`,
        amount: extra * q.bartenders * s.extraHourRate,
      });
    }
  }
  for (const id of q.addOnIds) {
    const a = ADD_ONS.find((x) => x.id === id);
    if (a) lines.push({ label: a.name, detail: a.note, amount: a.price, from: a.from });
  }
  if (s.serviceFeeEnabled && s.serviceFee > 0 && lines.length) {
    lines.push({ label: "Event service & preparation fee", amount: s.serviceFee });
  }

  const subtotal = round2(lines.reduce((t, l) => t + l.amount, 0));
  const hst = round2(subtotal * s.hstRate);
  const total = round2(subtotal + hst);
  return {
    lines,
    subtotal,
    hst,
    total,
    hasFromPrices: lines.some((l) => l.from),
    belowMinimum: subtotal > 0 && subtotal < s.minimumBooking,
  };
}

export const money = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2 }).format(n);
