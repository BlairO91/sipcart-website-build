import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import { DayPicker } from "react-day-picker";
import { format, parseISO, startOfToday } from "date-fns";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/sip-cart.css";
import "../styles/build-your-bar.css";
import logo from "@/assets/logo.png";
import cartPhoto from "@/assets/Untitled design - 2026-04-19T094229.357.webp";
import pkgTwo from "@/assets/byb/pkg-two.webp";
import pkgThree from "@/assets/byb/pkg-three.webp";
import pkgOpen from "@/assets/byb/pkg-open.webp";

const PACKAGE_PHOTOS: Record<string, string> = { "two-signature": pkgTwo, "three-signature": pkgThree, "open-bar": pkgOpen };

import {
  ADD_ONS,
  DISCLAIMER,
  EVENT_TYPES,
  PACKAGES,
  QUOTE_SETTINGS,
  calculateQuote,
  money,
  suggestedBartenders,
} from "@/lib/quoteConfig";

const STEPS = ["Celebration", "Details", "Your bar", "Your setup", "Extras", "Your estimate"];
const LAST = STEPS.length - 1;

type Data = {
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  hours: number;
  packageId: string;
  barCart: boolean;
  bartenders: number | null; // null = follow the suggestion
  addOnIds: string[];
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: Data = {
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  hours: QUOTE_SETTINGS.includedHours,
  packageId: "",
  barCart: true,
  bartenders: null,
  addOnIds: [],
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

const BuildYourBar = () => {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const [dateOpen, setDateOpen] = useState(false);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((prev) => ({ ...prev, [k]: v }));

  const guests = Math.max(0, parseInt(d.guests, 10) || 0);
  const suggested = suggestedBartenders(guests);
  const bartenders = d.bartenders ?? suggested;
  const quote = useMemo(
    () => calculateQuote({ guests, hours: d.hours, packageId: d.packageId, barCart: d.barCart, bartenders, addOnIds: d.addOnIds }),
    [guests, d.hours, d.packageId, d.barCart, bartenders, d.addOnIds],
  );
  const pkg = PACKAGES.find((p) => p.id === d.packageId);
  const ready = !!pkg && guests > 0;

  useEffect(() => {
    document.title = "Build Your Bar Experience | The Sip Cart";
  }, []);
  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  const stepValid = [
    !!d.eventType,
    guests > 0,
    !!d.packageId,
    true,
    true,
    !!d.name.trim() && isEmail(d.email) && d.phone.replace(/\D/g, "").length >= 10,
  ];

  const next = () => {
    if (!stepValid[step]) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(LAST, s + 1));
  };
  const back = () => {
    setShowErrors(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const breakdownText = () => {
    const rows = quote.lines.map((l) => `${l.label}${l.detail ? ` (${l.detail})` : ""}: ${l.from ? "from " : ""}${money(l.amount)}`);
    return [
      ...rows,
      `Subtotal: ${money(quote.subtotal)}`,
      `HST (${QUOTE_SETTINGS.hstRate * 100}%): ${money(quote.hst)}`,
      `Estimated total: ${money(quote.total)}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const submit = async () => {
    if (!stepValid[LAST]) {
      setShowErrors(true);
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(false);

    const fields = {
      name: d.name.trim(),
      email: d.email.trim(),
      phone: d.phone.trim(),
      eventType: d.eventType,
      eventDate: d.eventDate,
      location: d.location,
      guests: String(guests),
      hours: String(d.hours),
      package: pkg?.name ?? "",
      barCart: d.barCart ? "Yes" : "No (venue has a bar)",
      bartenders: String(bartenders),
      addOns: d.addOnIds.map((id) => ADD_ONS.find((a) => a.id === id)?.name).filter(Boolean).join(", ") || "None",
      estimateTotal: money(quote.total),
      breakdown: breakdownText(),
      notes: d.notes.trim() || "None",
    };

    // Netlify Forms keeps a copy of every request; EmailJS notifies Fern using the
    // existing inquiry template. Either one succeeding means the request wasn't lost.
    const toNetlify = fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": "build-your-bar", "bot-field": "", ...fields }).toString(),
    }).then((res) => {
      if (!res.ok) throw new Error(`Netlify form responded ${res.status}`);
    });
    const toEmail = emailjs.send(
      "service_6g62zty",
      "template_cd13zac",
      {
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        eventDate: fields.eventDate || "Not set",
        eventType: `${fields.eventType} (Build Your Bar)`,
        guests: fields.guests,
        budget: `Estimate ${fields.estimateTotal}`,
        notes: [
          `BUILD YOUR BAR ESTIMATE`,
          `Location: ${fields.location || "Not given"}`,
          `Hours: ${fields.hours} · Bartenders: ${fields.bartenders} · Bar cart: ${fields.barCart}`,
          "",
          fields.breakdown,
          "",
          `Client notes: ${fields.notes}`,
        ].join("\n"),
      },
      "Emied8aa-JrZ-uZxp",
    );

    const results = await Promise.allSettled([toNetlify, toEmail]);
    setSubmitting(false);
    if (results.some((r) => r.status === "fulfilled")) {
      setSubmitted(true);
    } else {
      results.forEach((r) => r.status === "rejected" && console.error("Quote submission failed:", r.reason));
      setSubmitError(true);
    }
  };

  const err = (cond: boolean, msg: string) => (showErrors && cond ? <p className="byb-error">{msg}</p> : null);

  const Estimate = ({ full }: { full?: boolean }) => (
    <div className={`byb-estimate${full ? " byb-estimate--full" : ""}`}>
      {!ready ? (
        <p className="byb-estimate__empty">
          {guests > 0 ? "Choose a bar package to see your estimate." : "Enter your guest count and choose a bar package to see your estimate."}
        </p>
      ) : (
        <>
          <ul className="byb-lines">
            {quote.lines.map((l, i) => (
              <li key={i}>
                <span>
                  {l.label}
                  {full && l.detail && <small>{l.detail}</small>}
                </span>
                <span className="byb-amt">
                  {l.from && <small>from </small>}
                  {money(l.amount)}
                </span>
              </li>
            ))}
            <li className="byb-lines__sub">
              <span>Subtotal</span>
              <span className="byb-amt">{money(quote.subtotal)}</span>
            </li>
            <li>
              <span>HST ({QUOTE_SETTINGS.hstRate * 100}%)</span>
              <span className="byb-amt">{money(quote.hst)}</span>
            </li>
          </ul>
          <div className="byb-total">
            <span>Estimated total</span>
            <strong>
              {quote.hasFromPrices && <small>from </small>}
              {money(quote.total)}
            </strong>
          </div>
          {full && (
            <div className="byb-notes">
              {quote.belowMinimum && (
                <p>
                  <strong>Note:</strong> events typically start at {money(QUOTE_SETTINGS.minimumBooking)} before tax. Fern will work with you on the details.
                </p>
              )}
              {QUOTE_SETTINGS.gratuityNote && <p>{QUOTE_SETTINGS.gratuityNote}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="sip-cart byb">
      <header className="byb-top">
        <a href="/" className="byb-top__logo" aria-label="The Sip Cart home">
          <img src={logo} alt="The Sip Cart" />
        </a>
        <a href="/" className="byb-top__back">
          ← Back to site
        </a>
      </header>

      <section className="byb-hero">
        <p className="byb-eyebrow">Create your own experience</p>
        <h1>Build Your Bar Experience</h1>
        <p className="byb-hero__sub">
          Choose your package, setup and extras, then get your estimate instantly. Fern will follow up within 24–48 hours to confirm the details.
        </p>
      </section>

      {submitted ? (
        <main className="byb-done">
          <h2>Here's your estimate, {d.name.trim().split(" ")[0]}!</h2>
          <p className="byb-summary byb-summary--center">
            {d.eventType}
            {guests ? ` · ${guests} guests` : ""} · {d.hours} hours
            {d.location ? ` · ${d.location}` : ""}
          </p>
          <p>
            A copy is on its way to Fern. She'll review your details and get back to you within 24–48 hours to confirm availability and your final quote.
          </p>
          <Estimate full />
          <p className="byb-disclaimer">{DISCLAIMER}</p>
          <a className="sc-btn sc-btn--dark" href="/">
            Back to The Sip Cart
          </a>
        </main>
      ) : (
        <main className="byb-layout">
          <div className="byb-main">
            <ol className="byb-progress" aria-label="Steps">
              {STEPS.map((s, i) => (
                <li key={s} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
                  <button type="button" onClick={() => i < step && setStep(i)} disabled={i >= step}>
                    <span className="byb-progress__n">{i + 1}</span>
                    <span className="byb-progress__label">{s}</span>
                  </button>
                </li>
              ))}
            </ol>

            {step === 0 && (
              <div className="byb-step">
                <h2>What are you celebrating?</h2>
                <div className="byb-chips byb-chips--lg">
                  {EVENT_TYPES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`byb-chip${d.eventType === t ? " is-on" : ""}`}
                      aria-pressed={d.eventType === t}
                      onClick={() => {
                        set("eventType", t);
                        setShowErrors(false);
                        setTimeout(() => setStep(1), 250);
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {err(!d.eventType, "Choose what you're celebrating.")}
              </div>
            )}

            {step === 1 && (
              <div className="byb-step">
                <h2>Tell us about your event</h2>
                <div className="byb-grid2">
                  <label className="byb-field">
                    <span>Number of guests</span>
                    <input type="number" inputMode="numeric" min={1} placeholder="e.g. 75" value={d.guests} onChange={(e) => set("guests", e.target.value)} autoFocus />
                    {err(guests <= 0, "Enter your guest count.")}
                  </label>
                  <div className="byb-field">
                    <span className="byb-label" id="byb-hours-label">Hours of bar service</span>
                    <Select.Root value={String(d.hours)} onValueChange={(v) => set("hours", Number(v))}>
                      <Select.Trigger className="byb-trigger" aria-labelledby="byb-hours-label">
                        <Select.Value />
                        <Select.Icon className="byb-trigger__icon">
                          <ChevronDown size={18} />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="byb-pop byb-select" position="popper" sideOffset={6}>
                          <Select.Viewport>
                            {Array.from({ length: QUOTE_SETTINGS.maxHours - QUOTE_SETTINGS.includedHours + 1 }, (_, i) => QUOTE_SETTINGS.includedHours + i).map((h) => (
                              <Select.Item key={h} value={String(h)} className="byb-select__item">
                                <Select.ItemText>
                                  {h} hours{h === QUOTE_SETTINGS.includedHours ? " (included)" : ""}
                                </Select.ItemText>
                                <Select.ItemIndicator className="byb-select__check">
                                  <Check size={16} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                  <div className="byb-field">
                    <span className="byb-label" id="byb-date-label">Event date</span>
                    <Popover.Root open={dateOpen} onOpenChange={setDateOpen}>
                      <Popover.Trigger className="byb-trigger" aria-labelledby="byb-date-label">
                        <span className={d.eventDate ? "" : "byb-trigger__placeholder"}>
                          {d.eventDate ? format(parseISO(d.eventDate), "EEE, MMMM d, yyyy") : "Choose a date"}
                        </span>
                        <CalendarDays size={18} className="byb-trigger__icon" />
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content className="byb-pop byb-cal" align="start" sideOffset={6} collisionPadding={12}>
                          <DayPicker
                            mode="single"
                            selected={d.eventDate ? parseISO(d.eventDate) : undefined}
                            defaultMonth={d.eventDate ? parseISO(d.eventDate) : undefined}
                            onSelect={(day) => {
                              set("eventDate", day ? format(day, "yyyy-MM-dd") : "");
                              if (day) setDateOpen(false);
                            }}
                            disabled={{ before: startOfToday() }}
                            showOutsideDays
                            weekStartsOn={0}
                            classNames={{
                              months: "byb-cal__months",
                              month: "byb-cal__month",
                              caption: "byb-cal__caption",
                              caption_label: "byb-cal__title",
                              nav: "byb-cal__nav",
                              nav_button: "byb-cal__navbtn",
                              nav_button_previous: "byb-cal__prev",
                              nav_button_next: "byb-cal__next",
                              table: "byb-cal__table",
                              head_row: "byb-cal__headrow",
                              head_cell: "byb-cal__headcell",
                              row: "byb-cal__row",
                              cell: "byb-cal__cell",
                              day: "byb-cal__day",
                              day_selected: "is-selected",
                              day_today: "is-today",
                              day_outside: "is-outside",
                              day_disabled: "is-disabled",
                            }}
                            components={{
                              IconLeft: () => <ChevronLeft size={18} />,
                              IconRight: () => <ChevronRight size={18} />,
                            }}
                          />
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                  <label className="byb-field">
                    <span>Event location</span>
                    <input type="text" placeholder="City or venue" value={d.location} onChange={(e) => set("location", e.target.value)} />
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="byb-step">
                <h2>Choose your bar</h2>
                <div className="byb-cards">
                  {PACKAGES.map((p) => (
                    <button type="button" key={p.id} className={`byb-card${d.packageId === p.id ? " is-on" : ""}`} aria-pressed={d.packageId === p.id} onClick={() => set("packageId", p.id)}>
                      <img src={PACKAGE_PHOTOS[p.id]} alt="" className="byb-card__img" loading="lazy" />
                      <span className="byb-card__name">{p.name}</span>
                      <span className="byb-card__price">${p.perGuest} per guest</span>
                      <span className="byb-card__blurb">{p.blurb}</span>
                    </button>
                  ))}
                </div>
                {err(!d.packageId, "Choose a bar package.")}
                <p className="byb-hint byb-hint--center">
                  You supply the alcohol and we'll send you a custom shopping list.
                  <br />
                  We bring everything else.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="byb-step">
                <h2>Set up your bar</h2>
                <div className="byb-split">
                  <figure className="byb-photo">
                    <img src={cartPhoto} alt="The Sip Cart mobile bar with umbrella, florals and cocktails" loading="lazy" />
                  </figure>
                  <div className="byb-split__body">
                    <fieldset className="byb-field">
                      <legend>Do you need our mobile bar cart?</legend>
                      <div className="byb-cards byb-cards--two">
                        <button type="button" className={`byb-card${d.barCart ? " is-on" : ""}`} aria-pressed={d.barCart} onClick={() => set("barCart", true)}>
                          <span className="byb-card__name">Yes, bring The Sip Cart</span>
                          <span className="byb-card__price">{money(QUOTE_SETTINGS.barCartRate)}</span>
                        </button>
                        <button type="button" className={`byb-card${!d.barCart ? " is-on" : ""}`} aria-pressed={!d.barCart} onClick={() => set("barCart", false)}>
                          <span className="byb-card__name">No, our venue has a bar</span>
                          <span className="byb-card__price">$0</span>
                        </button>
                      </div>
                    </fieldset>
                    <div className="byb-field">
                      <span className="byb-label">Bartenders</span>
                      <div className="byb-stepper">
                        <button type="button" aria-label="Fewer bartenders" onClick={() => set("bartenders", Math.max(1, bartenders - 1))} disabled={bartenders <= 1}>
                          −
                        </button>
                        <output aria-live="polite">{bartenders}</output>
                        <button type="button" aria-label="More bartenders" onClick={() => set("bartenders", Math.min(QUOTE_SETTINGS.maxBartenders, bartenders + 1))} disabled={bartenders >= QUOTE_SETTINGS.maxBartenders}>
                          +
                        </button>
                      </div>
                      <p className="byb-hint">
                        We recommend {suggested} bartender{suggested > 1 ? "s" : ""} for {guests || "your"} guests.
                        {d.bartenders !== null && d.bartenders !== suggested && (
                          <>
                            {" "}
                            <button type="button" className="byb-link" onClick={() => set("bartenders", null)}>
                              Use recommended
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="byb-step">
                <h2>Add something extra</h2>
                <div className="byb-cards byb-cards--addons">
                  {ADD_ONS.map((a) => {
                    const on = d.addOnIds.includes(a.id);
                    const tipId = `byb-tip-${a.id}`;
                    return (
                      <div key={a.id} className={`byb-addon${openInfo === a.id ? " is-info" : ""}`}>
                        <button type="button" className={`byb-card${on ? " is-on" : ""}`} aria-pressed={on} aria-describedby={tipId} onClick={() => set("addOnIds", toggle(d.addOnIds, a.id))}>
                          <span className="byb-card__name">{a.name}</span>
                          <span className="byb-card__price">
                            {a.from ? "From " : ""}
                            {money(a.price)}
                          </span>
                          {a.note && <span className="byb-card__blurb">{a.note}</span>}
                          <span className="byb-card__tick" aria-hidden="true">{on ? "Added" : "Add"}</span>
                        </button>
                        <button
                          type="button"
                          className="byb-info"
                          aria-label={`About ${a.name}`}
                          aria-expanded={openInfo === a.id}
                          onClick={() => setOpenInfo(openInfo === a.id ? null : a.id)}
                          onMouseEnter={() => setOpenInfo(a.id)}
                          onMouseLeave={() => setOpenInfo((cur) => (cur === a.id ? null : cur))}
                          onBlur={() => setOpenInfo((cur) => (cur === a.id ? null : cur))}
                        >
                          i
                        </button>
                        <span role="tooltip" id={tipId} className="byb-tip">
                          {a.info}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="byb-step">
                <h2>Where should we send your estimate?</h2>
                <p className="byb-hint">Your estimate appears as soon as you press the button below, and Fern will follow up within 24–48 hours.</p>
                <div className="byb-stack">
                  <label className="byb-field">
                    <span>Full name</span>
                    <input type="text" autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} />
                    {err(!d.name.trim(), "Enter your name.")}
                  </label>
                  <label className="byb-field">
                    <span>Email</span>
                    <input type="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} />
                    {err(!isEmail(d.email), "Enter a valid email.")}
                  </label>
                  <label className="byb-field">
                    <span>Phone</span>
                    <input type="tel" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} />
                    {err(d.phone.replace(/\D/g, "").length < 10, "Enter a phone number.")}
                  </label>
                </div>
                <label className="byb-field">
                  <span>Anything else we should know?</span>
                  <textarea rows={4} placeholder="Theme, colours, favourite drinks, timing…" value={d.notes} onChange={(e) => set("notes", e.target.value)} />
                </label>
                {submitError && (
                  <p className="byb-error">
                    Sorry, something went wrong. Please try again, or email{" "}
                    <a href="mailto:sipnslushto@gmail.com">sipnslushto@gmail.com</a>.
                  </p>
                )}
              </div>
            )}

            <div className="byb-nav">
              {step > 0 && (
                <button type="button" className="sc-btn sc-btn--outline" onClick={back} disabled={submitting}>
                  Back
                </button>
              )}
              {step < LAST ? (
                <button type="button" className="sc-btn sc-btn--dark" onClick={next}>
                  Next: {STEPS[step + 1]}
                </button>
              ) : (
                <button type="button" className="sc-btn sc-btn--dark" onClick={submit} disabled={submitting}>
                  {submitting ? "One moment…" : "See my estimate"}
                </button>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default BuildYourBar;
