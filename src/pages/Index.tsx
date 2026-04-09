import { useState, useEffect, useRef } from "react";
import "../styles/sip-cart.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10];

const faqData = [
  { q: "Do I need to provide my own alcohol?", a: "Yes — clients supply all alcohol. We provide everything else: bartenders, bar setup, custom menus, mixers, garnishes, cups, napkins, ice, and straws. We also send you a customized shopping list so you know exactly what to buy." },
  { q: "What's included in every package?", a: "All packages include up to 4 hours of service, professional setup and breakdown, a curated signature bar menu, premium mixers and fresh garnishes, bar essentials (cups, napkins, ice, straws), a customized alcohol shopping list, creative consultation, and travel within 40km." },
  { q: "How far do you travel?", a: "We serve Toronto and the Greater Toronto Area. Travel within 40km is included in all packages. Additional travel fees may apply for events beyond that." },
  { q: "How do I get a quote?", a: "Fill out our inquiry form below with your event details — date, location, guest count, and event type — and we'll get back to you with a personalized quote within 24–48 hours." },
  { q: "Do you serve mocktails or non-alcoholic options?", a: "Absolutely. We love crafting beautiful mocktail menus for all-ages events, baby showers, and anyone who prefers a non-alcoholic experience." },
  { q: "How much notice do you need to book?", a: "We recommend booking at least 4–6 weeks in advance for smaller events, and 3–6 months for weddings and large corporate events. Peak season books up quickly — reach out early!" },
  { q: "Can we customize the drink menu?", a: "Yes — custom cocktail menus are a signature part of what we do. We work with you to build a menu around your event theme, taste preferences, and guest count." },
  { q: "What happens if I need to cancel or reschedule?", a: "Please reach out as soon as possible. We handle every situation with care and will do our best to accommodate changes. Full details are included in your service agreement." },
];

const events = [
  { name: "Weddings", desc: "Your most important day deserves a bar as beautiful as the moment." },
  { name: "Bachelorette Parties", desc: "Sip, celebrate, and make memories your group will talk about forever." },
  { name: "Corporate Events", desc: "Impress clients and teams with a polished, professional bar experience." },
  { name: "Birthday Parties", desc: "Because every birthday deserves a signature drink." },
  { name: "Bridal Showers & Engagement Parties", desc: "Celebrate love with custom cocktails and a stunning bar setup." },
  { name: "Private Home Events & Girls' Nights", desc: "Mocktails, cocktails, good company — we've got the bar covered." },
];

const testimonials = [
  { quote: "The Sip Cart was the most talked-about part of our wedding. Every guest was obsessed with the setup — it was stunning.", name: "Sarah M.", event: "Wedding, Toronto" },
  { quote: "We booked The Sip Cart for our bachelorette and it made the whole night. The custom cocktails were incredible.", name: "Jess T.", event: "Bachelorette Party, Mississauga" },
  { quote: "Professional, stylish, and absolutely seamless. Our corporate event felt elevated in a way we didn't expect.", name: "Amanda R.", event: "Corporate Event, North York" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const photoBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      if (!ticking) {
        requestAnimationFrame(() => {
          if (photoBarRef.current) {
            const rect = photoBarRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = Math.min(Math.max((viewH - rect.top) / (viewH + rect.height), 0), 1);
            const track = photoBarRef.current.querySelector('.sc-photo-bar__track') as HTMLElement;
            if (track) {
              const maxShift = track.scrollWidth - window.innerWidth;
              track.style.transform = `translate3d(-${progress * maxShift * 0.33}px, 0, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sip-cart">
      {/* ── NAVBAR ── */}
      <nav className={`sc-nav${scrolled ? " sc-nav--scrolled" : ""}`}>
        <div className="sc-nav__inner">
          <img src="/placeholder.svg" alt="The Sip Cart logo" className="logo-img" style={{ height: 48 }} />
          <div className={`sc-nav__links${menuOpen ? " open" : ""}`}>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("how-it-works")}>How It Works</button>
            <button onClick={() => scrollTo("packages")}>Packages</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
          </div>
          <button className="sc-btn sc-btn--primary sc-nav__cta" onClick={() => scrollTo("quote")}>Request a Quote</button>
          <button className="sc-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sc-hero">
        <div className="hero-bg" />
        <div className="sc-hero__overlay" />
        <div className="sc-hero__content">
          <p className="sc-hero__eyebrow">Toronto &amp; GTA Mobile Bar Service</p>
          <h1 className="sc-hero__headline sc-fade-up">Elevated Experiences,<br />One Sip at a Time</h1>
          <p className="sc-hero__sub">We design and deliver a fully curated bar experience — from custom cocktails to stylish setups. You bring the alcohol, we bring everything else.</p>
          <div className="sc-hero__btns">
            <button className="sc-btn sc-btn--primary" onClick={() => scrollTo("quote")}>Request a Quote</button>
            <button className="sc-btn sc-btn--outline-light" onClick={() => scrollTo("services")}>Explore Services</button>
          </div>
        </div>
      </section>

      {/* ── PHOTO BAR ── */}
      <section className="sc-photo-bar" ref={photoBarRef}>
        <div className="sc-photo-bar__track">
          {galleryImages.map((src, i) => (
            <img key={i} src={src} alt={`Event gallery ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="sc-section sc-how">
        <h2 className="sc-section__heading">How It Works</h2>
        <div className="sc-how__grid">
          {[
            { n: "01", t: "Tell Us About Your Event", d: "You share your event details and we handle everything from there." },
            { n: "02", t: "We Set Up, You Relax", d: "We arrive, set up your custom bar, and handle the full service start to finish." },
            { n: "03", t: "Sip & Celebrate", d: "You enjoy the party while we make every drink a moment." },
          ].map((s, i) => (
            <div className="sc-how__step" key={i}>
              <span className="sc-how__num">{s.n}</span>
              <h3 className="sc-how__title">{s.t}</h3>
              <p className="sc-how__desc">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="sc-section sc-services">
        <h2 className="sc-section__heading">We Make Every Event Unforgettable</h2>
        <p className="sc-section__sub">From intimate gatherings to grand celebrations — The Sip Cart brings the bar to you.</p>
        <div className="sc-services__grid">
          {events.map((e, i) => (
            <div className="sc-services__card" key={i}>
              <div className="event-photo photo-placeholder" />
              <div className="sc-services__card-body">
                <h3>{e.name}</h3>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MID CTA ── */}
      <section className="sc-mid-cta">
        <h2>Ready to elevate your next event?</h2>
        <p>Let's build your perfect bar experience together.</p>
        <button className="sc-btn sc-btn--outline-light" onClick={() => scrollTo("quote")}>Request a Quote</button>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="sc-section sc-packages">
        <h2 className="sc-section__heading">Our Packages</h2>
        <p className="sc-section__sub">Every package is fully customized to your event. Pricing is based on guest count, event duration, and location — reach out for your personalized quote.</p>
        <div className="sc-packages__grid">
          {/* Essential */}
          <div className="sc-pkg">
            <h3 className="sc-pkg__name">Essential</h3>
            <p className="sc-pkg__best">Best for: intimate events, small gatherings</p>
            <ul className="sc-pkg__list">
              <li>Up to 4 hours of service</li><li>1 bartender</li><li>Custom drink menu</li>
              <li>Premium mixers &amp; garnishes</li><li>Bar essentials (cups, napkins, ice, straws)</li>
              <li>Professional setup &amp; breakdown</li>
            </ul>
            <button className="sc-btn sc-btn--primary" onClick={() => scrollTo("quote")}>Get a Quote</button>
          </div>
          {/* Signature */}
          <div className="sc-pkg sc-pkg--popular">
            <span className="sc-pkg__badge">Most Popular</span>
            <h3 className="sc-pkg__name">Signature</h3>
            <p className="sc-pkg__best">Best for: bachelorettes, birthday parties, bridal showers</p>
            <ul className="sc-pkg__list">
              <li>Everything in Essential +</li><li>Custom signage</li>
              <li>Curated cocktail menu consultation</li><li>Customized alcohol shopping list</li>
              <li>Travel within 40km included</li>
            </ul>
            <button className="sc-btn sc-btn--primary" onClick={() => scrollTo("quote")}>Get a Quote</button>
          </div>
          {/* Luxe */}
          <div className="sc-pkg">
            <h3 className="sc-pkg__name">Luxe</h3>
            <p className="sc-pkg__best">Best for: weddings, corporate events, large-scale celebrations</p>
            <ul className="sc-pkg__list">
              <li>Everything in Signature +</li><li>Multiple bartenders</li>
              <li>Extended service hours</li><li>Full creative consultation</li>
              <li>Premium branded setup</li><li>Priority booking</li>
            </ul>
            <button className="sc-btn sc-btn--primary" onClick={() => scrollTo("quote")}>Get a Quote</button>
          </div>
        </div>
      </section>

      {/* ── CUSTOM EXPERIENCE ── */}
      <section className="sc-section sc-custom">
        <h2 className="sc-section__heading">Your Event, Your Brand</h2>
        <p className="sc-section__sub">Every detail is curated to match your vision — from the first sip to the last.</p>
        <div className="sc-custom__grid">
          <div className="sc-custom__item">
            <svg className="sc-custom__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="10" y="8" width="28" height="32" rx="3"/><path d="M18 16h12M18 22h12M18 28h8"/></svg>
            <h3>Custom Cups &amp; Napkins</h3>
            <p>Branded barware that doubles as a keepsake.</p>
          </div>
          <div className="sc-custom__item">
            <svg className="sc-custom__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="12" width="36" height="24" rx="2"/><path d="M16 20h16M16 26h10"/></svg>
            <h3>Signature Signage</h3>
            <p>Menus and bar signs designed to match your event aesthetic.</p>
          </div>
          <div className="sc-custom__item">
            <svg className="sc-custom__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 6v6M20 12h8l2 18H18l2-18zM16 36h16M20 30c1 2 3 3 4 3s3-1 4-3"/></svg>
            <h3>Bespoke Cocktail Menus</h3>
            <p>Drinks crafted around your theme, palette, and preferences.</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* PLACEHOLDER TESTIMONIALS — replace with real testimonials */}
      <section className="sc-section sc-testimonials">
        <h2 className="sc-section__heading">What Our Clients Are Saying</h2>
        <div className="sc-testimonials__grid">
          {testimonials.map((t, i) => (
            <div className="sc-testimonial" key={i}>
              <div className="sc-testimonial__stars">{"★★★★★"}</div>
              <blockquote className="sc-testimonial__quote">"{t.quote}"</blockquote>
              <p className="sc-testimonial__name">{t.name}</p>
              <p className="sc-testimonial__event">{t.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="sc-section sc-faq">
        <h2 className="sc-section__heading">Frequently Asked Questions</h2>
        <div className="sc-faq__wrap">
          <Accordion type="single" collapsible className="sc-faq__accordion">
            {faqData.map((f, i) => (
              <AccordionItem value={`faq-${i}`} key={i} className="sc-faq__item">
                <AccordionTrigger className="sc-faq__q">{f.q}</AccordionTrigger>
                <AccordionContent className="sc-faq__a">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA + QUOTE FORM ── */}
      <section id="quote" className="sc-section sc-quote">
        <h2 className="sc-section__heading">Let's Make Your Event Unforgettable</h2>
        <p className="sc-section__sub">Tell us about your event and we'll craft the perfect bar experience for you.</p>
        <div className="sc-quote__btns">
          <button className="sc-btn sc-btn--outline" onClick={() => scrollTo("services")}>Explore Our Services</button>
          <button className="sc-btn sc-btn--primary">Request a Quote</button>
        </div>
        {/* GOOGLE FORM EMBED PLACEHOLDER */}
        <div className="sc-quote__form-placeholder">
          <p>[ Google Form will be embedded here ]</p>
          <p className="sc-quote__note">In the meantime, reach out directly:</p>
          <p><a href="mailto:sipnslush@gmail.com">sipnslush@gmail.com</a></p>
          <p><a href="tel:+16479899353">+1 (647) 989-9353</a></p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sc-footer">
        <div className="sc-footer__inner">
          <div className="sc-footer__brand">
            <img src="/placeholder.svg" alt="The Sip Cart logo" className="logo-img-footer" style={{ height: 40 }} />
            <p>Elevated Experiences, One Sip at a Time</p>
          </div>
          <div className="sc-footer__links">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("how-it-works")}>How It Works</button>
            <button onClick={() => scrollTo("packages")}>Packages</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <button onClick={() => scrollTo("quote")}>Request a Quote</button>
          </div>
          <div className="sc-footer__contact">
            <p>Instagram: <a href="https://instagram.com/thesipcart.to" target="_blank" rel="noreferrer">@thesipcart.to</a></p>
            <p>Phone: <a href="tel:+16479899353">+1 (647) 989-9353</a></p>
            <p>Email: <a href="mailto:sipnslush@gmail.com">sipnslush@gmail.com</a></p>
          </div>
        </div>
        <div className="sc-footer__bottom">
          <p>© 2025 The Sip Cart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
