import { useState, useEffect, useRef } from "react";
import { Instagram, Phone, Mail, Heart, PartyPopper, Briefcase, Cake, Gem, Wine, Sparkles, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/sip-cart.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo.png";
import sipCartHero from "@/assets/Untitled design - 2026-04-19T094229.357.png";
import fernandaImg from "@/assets/fernanda.jpg";
import reviewBgImg from "@/assets/Photos/luisa-azevedo-TVyAcFeuNUw-unsplash.jpg";
import quoteIcon from "@/assets/Photos/Untitled design - 2026-04-19T182505.669.png";
import footerTitle from "@/assets/Photos/Title (1920 x 400 px) (1920 x 250 px).png";
import weddingImg from "@/assets/wedding.jpg";
import bacheloretteImg from "@/assets/bachelorette.jpg";
import corporateImg from "@/assets/corporate.jpg";
import birthdayImg from "@/assets/birthday.jpg";
import bridalImg from "@/assets/bridal.jpg";
import girlsnightImg from "@/assets/girlsnight.jpg";
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
import photo1 from "@/assets/Photos/olivie-strauss-eUrGZhIeHao-unsplash.jpg";
import photo2 from "@/assets/Photos/pinar-kucuk-_qf7KGWyAes-unsplash.jpg";
import photo3 from "@/assets/Photos/ferals-studio-8l45X115t9E-unsplash.jpg";
import photo4 from "@/assets/Photos/toa-heftiba-FpjYO4a-PP8-unsplash.jpg";
import photo5 from "@/assets/Photos/olena-bohovyk-JjGLEN7T8xI-unsplash.jpg";
import photo6 from "@/assets/Photos/svitlana-vexxZA_JNso-unsplash.jpg";
import photo7 from "@/assets/Photos/olivie-strauss-LW0cVdFc_Yk-unsplash.jpg";
import photo8 from "@/assets/Photos/kateryna-hliznitsova-RdUYKST5clk-unsplash.jpg";
import photo9 from "@/assets/Photos/no-revisions-gA81ZTsql68-unsplash.jpg";
import photo10 from "@/assets/Photos/jacqueline-a-hernandez-MRHG1DvP46I-unsplash.jpg";
import photo11 from "@/assets/Photos/c-s-K1mPk3TBc5k-unsplash.jpg";
import photo12 from "@/assets/Photos/olivie-strauss-tZOpC47nebM-unsplash.jpg";
import photo13 from "@/assets/Photos/alyona-yankovska-7EbGkOm8pWM-unsplash.jpg";
import photo14 from "@/assets/Photos/ecaterina-tanase-9Bth_LiiMoo-unsplash.jpg";
import photo15 from "@/assets/Photos/trinh-minh-th-9cPdsa-_7PI-unsplash.jpg";

const galleryImages = [photo3, photo8, photo1, photo5, photo9, photo11, photo4, photo14, photo2, photo7, photo15, photo6, photo12, photo10, photo13];

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
  { name: "Weddings", desc: "Your most important day deserves a bar as beautiful as the moment.", img: weddingImg, icon: Heart },
  { name: "Bachelorette Parties", desc: "Sip, celebrate, and make memories your group will talk about forever.", img: bacheloretteImg, icon: PartyPopper },
  { name: "Corporate Events", desc: "Impress clients and teams with a polished, professional bar experience.", img: corporateImg, icon: Briefcase },
  { name: "Birthday Parties", desc: "Because every birthday deserves a signature drink.", img: birthdayImg, icon: Cake },
  { name: "Engagements & Showers", desc: "Celebrate love with custom cocktails and a stunning bar setup.", img: bridalImg, icon: Gem },
  { name: "Private Events & Girls' Nights", desc: "Mocktails, cocktails, good company — we've got the bar covered.", img: girlsnightImg, icon: Wine },
];

const testimonials = [
  { quote: "I had Sip Cart at my 30th birthday party, and she was such a highlight of the night. She created custom drinks that perfectly matched my party theme! They were sooo tastey and cute!!! My guests couldn't stop talking about them. It added such a fun, personalized touch to the event. Fernanda was professional and so fun to have at the party! She kept the vibes high! I'd 100% book Sip Cart again!", name: "Kristin O." },
  { quote: "I had the pleasure of having @thesipcart.to attend my 25th birthday party. All drinks were aesthetically pleasing and absolutely delicious! Especially the mango margaritas! She went above and beyond - not only cocktailing but hosting drinks all night to all my guests. Will definitely be booking again for future events!", name: "Jen H." },
  { quote: "The way sip and cart came into my friend's birthday party and absolutely made it so lively and so fun.. we were dancing, singing, laughing and vibing all night. Fern is an incredible bartender with such good energy and AMAZING tasting drinks and I'm not even much of a drinker but that night.. I was. I had a blast and I would 100% book and recommend to all friends!", name: "Fitore A." },
  { quote: "If you are looking for an elevated bartending experience with delicious and beautiful looking drinks The Sip Cart is exactly what you need! Fernanda is an incredible bartender who brings all the vibes and delivers exceptional service. I can't wait to book with them for my next event!", name: "Victoria G." },
  { quote: "If you don't have thesipcart.to at your event then you're doing it all wrong! Not only did fern make some bomb drinks but the vibes she bought too was unmatched. From the details of the drinks and ensuring everyone was loving their drinks to her engaging with the guest boosted our experience with her service. Fern made sure a drink was in hand all night long, I'm not a tequila drinker but I ended up having 3 spicy margs from how good they were. A good time was def HAD with fern as our bartender. Drinks 10/10, service 10/10, and vibes 10/10! Don't second guess it and just book, she will NOT disappoint", name: "Emily V." },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [testimonialModal, setTestimonialModal] = useState<number | null>(null);
  const photoBarRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const brandSectionRef = useRef<HTMLDivElement>(null);
  const brandPinRef = useRef<HTMLDivElement>(null);
  const brandPhotosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headings = document.querySelectorAll('.sc-section__heading');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('sc-heading--in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '-10% 0px 0px 0px' }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  // Brand text fade-in handled in scroll handler
  useEffect(() => {
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      setScrolled(window.scrollY > 0);

      // Brand gallery scroll — move whole columns so photos keep a fixed gap
      if (brandSectionRef.current && brandPinRef.current && brandPhotosRef.current) {
        const sectionRect = brandSectionRef.current.getBoundingClientRect();
        const sectionHeight = brandSectionRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollable = Math.max(sectionHeight - viewportHeight, 1);
        const progress = Math.min(Math.max(-sectionRect.top / scrollable, 0), 1);

        // Brand text fade + grow driven by scroll position
        const brandText = brandSectionRef.current.querySelector('.sc-brand-text') as HTMLElement;
        if (brandText) {
          const enterProgress = Math.min(Math.max((viewportHeight - sectionRect.top) / (viewportHeight * 0.6), 0), 1);
          const scale = 0.85 + 0.15 * enterProgress;
          const translateY = 3 * (1 - enterProgress);
          brandText.style.opacity = `${enterProgress}`;
          brandText.style.transform = `scale(${scale}) translateY(${translateY}rem)`;
        }

        if (sectionRect.top <= 0 && sectionRect.bottom > viewportHeight) {
          brandPinRef.current.style.top = '';
          brandPinRef.current.classList.add("sc-brand-pin--fixed");
          brandPinRef.current.classList.remove("sc-brand-pin--bottom");
        } else if (sectionRect.bottom <= viewportHeight) {
          brandPinRef.current.style.top = '';
          brandPinRef.current.classList.remove("sc-brand-pin--fixed");
          brandPinRef.current.classList.add("sc-brand-pin--bottom");
        } else {
          // Before section reaches top — pin element tracks with section
          brandPinRef.current.style.top = '0';
          brandPinRef.current.classList.remove("sc-brand-pin--fixed", "sc-brand-pin--bottom");
        }

        const photos = brandPhotosRef.current.querySelectorAll(".sc-brand-photo") as NodeListOf<HTMLElement>;
        // Each photo gets a slightly different parallax speed
        const speeds = [0.92, 1.0, 1.08, 0.96, 1.04, 0.88];
        photos.forEach((photo, i) => {
          const speed = speeds[i] || 1;
          const shift = (progress - 0.5) * 60 * (speed - 1) * 2;
          photo.style.transform = photo.style.transform || '';
          // Preserve rotation from CSS, add parallax Y offset
          photo.style.setProperty('--parallax-y', `${shift}px`);
        });

        const columns = brandPhotosRef.current.querySelectorAll(".sc-brand-col") as NodeListOf<HTMLElement>;
        columns.forEach((column) => {
          const startVh = Number(column.dataset.start ?? 0);
          const startOffset = (startVh / 100) * viewportHeight;
          const colHeight = column.offsetHeight;
          const endY = viewportHeight - colHeight;
          const startY = startOffset + viewportHeight;
          const travel = startY - endY;
          const y = startY - progress * travel;
          column.style.transform = `translate3d(0, ${y}px, 0)`;
        });
      }

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
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
          <img src={logo} alt="The Sip Cart logo" className="logo-img" style={{ height: '4rem' }} />
          <div className={`sc-nav__links${menuOpen ? " open" : ""}`}>
            <button onClick={() => scrollTo("services")}>Services</button>
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
      <div className="sc-hero-split">
        <div className="sc-hero-video-wrap">
          <video className="hero-video" ref={heroVideoRef} autoPlay muted loop playsInline>
            <source src="/hero-bg-v2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="sc-hero__content" ref={heroContentRef}>
          <div className="sc-hero__content-inner">
            <p className="sc-hero__eyebrow">Toronto &amp; GTA Mobile Bar Service</p>
            <h1 className="sc-hero__headline sc-fade-up">Elevated Experiences<br />One Sip at a Time</h1>
            <p className="sc-hero__sub">We design and deliver a fully curated bar experience — from custom cocktails to stylish setups. You bring the alcohol, we bring everything else.</p>
            <button className="sc-btn sc-btn--gold" onClick={() => scrollTo("quote")}>Request a Quote</button>
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="sc-section sc-services">
        <h2 className="sc-section__heading">We Make Every Event Unforgettable</h2>
        <p className="sc-section__sub">From intimate gatherings to grand celebrations — The Sip Cart brings the bar to you.</p>
        <div className="sc-services__grid">
          {events.map((e, i) => (
            <div className="sc-services__card" key={i}>
              <div className="sc-services__card-desc">
                <e.icon className="sc-services__card-icon" />
                <p>{e.desc}</p>
              </div>
              <div className="sc-services__card-front">
                <div className="sc-services__img-wrap">
                  {e.img ? (
                    <img src={e.img} alt={e.name} className="event-photo" loading="lazy" />
                  ) : (
                    <div className="event-photo photo-placeholder" />
                  )}
                </div>
                <div className="sc-services__card-body">
                  <h5>{e.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEW SNIPPET ── */}
      <section className="sc-review-snippet" style={{ backgroundImage: `url(${reviewBgImg})` }}>
        <div className="sc-review-snippet__card">
          <img src={quoteIcon} className="sc-review-snippet__quote-icon" alt="" />
          <blockquote>If you are looking for an elevated bartending experience with delicious and beautiful looking drinks, The Sip Cart is exactly what you need!</blockquote>
          <img src={quoteIcon} className="sc-review-snippet__quote-icon sc-review-snippet__quote-icon--end" alt="" />
          <p className="sc-review-snippet__name">— Victoria G.</p>
        </div>
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

      {/* ── MID CTA (2-grid) ── */}
      <section className="sc-mid-cta-grid">
        <div className="sc-mid-cta-grid__img">
          <img src={sipCartHero} alt="The Sip Cart mobile bar setup" />
        </div>
        <div className="sc-mid-cta-grid__content" style={{ backgroundImage: `url(${reviewBgImg})` }}>
          <div className="sc-mid-cta-grid__inner">
            <div className="sc-mid-cta-grid__text">
              <Sparkles className="sc-mid-cta-icon" />
              <h2>Ready to elevate your next event?</h2>
              <p>From intimate backyard parties to large-scale celebrations, we bring a fully curated bar — tailored to your style, your guests, and your vision.</p>
              <button className="sc-btn sc-btn--dark" onClick={() => scrollTo("quote")}>Request a Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sc-section sc-testimonials">
        <h2 className="sc-section__heading">What Our Clients Are Saying</h2>
        <div className="sc-testimonials__carousel">
          <button className="sc-testimonials__arrow sc-testimonials__arrow--left" onClick={() => setTestimonialIdx(Math.max(0, testimonialIdx - 1))} disabled={testimonialIdx === 0}>
            <ChevronLeft />
          </button>
          <div className="sc-testimonials__viewport">
            <div className="sc-testimonials__track" style={{ transform: `translateX(-${testimonialIdx * (100 / 3)}%)` }}>
              {testimonials.map((t, i) => (
                <div className="sc-testimonial" key={i}>
                  <img src={quoteIcon} className="sc-testimonial__quote-icon" alt="" />
                  <p className="sc-testimonial__quote">
                    "{t.quote.length <= 222 ? t.quote : `${t.quote.slice(0, 222)}...`}"
                    {t.quote.length > 222 && (
                      <button className="sc-testimonial__read-more" onClick={() => setTestimonialModal(i)}>Read more</button>
                    )}
                  </p>
                  <p className="sc-testimonial__name">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="sc-testimonials__arrow sc-testimonials__arrow--right" onClick={() => setTestimonialIdx(Math.min(testimonials.length - 3, testimonialIdx + 1))} disabled={testimonialIdx >= testimonials.length - 3}>
            <ChevronRight />
          </button>
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

      {/* ── ABOUT ── */}
      <section className="sc-section sc-about" id="about">
        <div className="sc-about__grid">
          <div className="sc-about__photo">
            <img src={fernandaImg} alt="Fernanda, founder of The Sip Cart" />
          </div>
          <div className="sc-about__content">
            <h2 className="sc-about__heading">Meet Your Bartender</h2>
            <p>Hi, I'm Fernanda, the founder and owner of The Sip Cart, a proudly Latina-owned mobile bar experience based in Toronto.</p>
            <p>With over a decade in hospitality, I've been part of countless celebrations, mastering the art of creating moments that feel as good as they look. The Sip Cart was born from that passion: a vision to bring a stylish, elevated, and completely seamless bar experience to every event.</p>
            <p>From curated cocktails to thoughtful details, every setup is designed to impress, set the tone, and keep the energy flowing all night long.</p>
            <p>Because it's never just about the drinks — it's about the vibe, the experience, and the memories your guests take with them after the last sip.</p>
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <div className="sc-brand-scroll" ref={brandSectionRef}>
        <div className="sc-brand-pin" ref={brandPinRef}>
          <div className="sc-brand-stage">
            <h2 className="sc-brand-text">Elevated Experiences,<br />One Sip at a Time</h2>
            <div className="sc-brand-photos" ref={brandPhotosRef}>
              <div className="sc-brand-col sc-brand-col--left" data-start="0">
                <div className="sc-brand-photo"><img src={gallery1} alt="Event 1" /></div>
                <div className="sc-brand-photo"><img src={gallery3} alt="Event 3" /></div>
                <div className="sc-brand-photo"><img src={gallery5} alt="Event 5" /></div>
              </div>
              <div className="sc-brand-col sc-brand-col--right" data-start="28">
                <div className="sc-brand-photo"><img src={gallery2} alt="Event 2" /></div>
                <div className="sc-brand-photo"><img src={gallery4} alt="Event 4" /></div>
                <div className="sc-brand-photo"><img src={gallery6} alt="Event 6" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="sc-section sc-faq">
        <h2 className="sc-section__heading">Frequently Asked Questions</h2>
        <div className="sc-faq__wrap">
          <div className="sc-faq__col">
            <Accordion type="single" collapsible>
              {faqData.slice(0, Math.ceil(faqData.length / 2)).map((f, i) => (
                <AccordionItem value={`faq-${i}`} key={i} className="sc-faq__item">
                  <AccordionTrigger className="sc-faq__q">{f.q}</AccordionTrigger>
                  <AccordionContent className="sc-faq__a">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="sc-faq__col">
            <Accordion type="single" collapsible>
              {faqData.slice(Math.ceil(faqData.length / 2)).map((f, i) => (
                <AccordionItem value={`faq-b-${i}`} key={i} className="sc-faq__item">
                  <AccordionTrigger className="sc-faq__q">{f.q}</AccordionTrigger>
                  <AccordionContent className="sc-faq__a">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
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
        <div className="sc-footer__brand-overlay">
          <img src={logo} alt="The Sip Cart logo" className="logo-img-footer" style={{ height: '12rem' }} />
        </div>
        <div className="sc-footer__inner">
          <div className="sc-footer__about">
            <p>Toronto & GTA's premier mobile bar service. We bring the bar to your event — from custom cocktails to stylish setups, we handle everything so you can enjoy the moment.</p>
          </div>

          <div className="sc-footer__contact">
            <a
              href="https://instagram.com/thesipcart.to"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="sc-footer__social"
            >
              <Instagram />
            </a>
            <a
              href="tel:+16479899353"
              aria-label="Call us"
              className="sc-footer__social"
            >
              <Phone />
            </a>
            <a
              href="mailto:sipnslush@gmail.com"
              aria-label="Email us"
              className="sc-footer__social"
            >
              <Mail />
            </a>
          </div>

          <div className="sc-footer__links">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("packages")}>Packages</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <button onClick={() => scrollTo("quote")}>Request a Quote</button>
          </div>
        </div>
        <img src={footerTitle} alt="The Sip Cart" className="sc-footer__big-text" />
        <div className="sc-footer__bottom">
          <p>© 2026 The Sip Cart. All rights reserved.</p>
          <p>Terms & Conditions</p>
          <p>Website designed by <a href="https://origincreative.ca" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>Origin Creative</a></p>
        </div>
      </footer>

      {testimonialModal !== null && (
        <div className="sc-modal-overlay" onClick={() => setTestimonialModal(null)}>
          <div className="sc-modal-layout" onClick={(e) => e.stopPropagation()}>
            <button className="sc-testimonials__arrow" onClick={() => setTestimonialModal(testimonialModal - 1)} disabled={testimonialModal === 0}>
              <ChevronLeft />
            </button>
            <div className="sc-modal-card">
              <button className="sc-modal-close" onClick={() => setTestimonialModal(null)}>×</button>
              <img src={quoteIcon} className="sc-testimonial__quote-icon" alt="" />
              <p className="sc-testimonial__quote">"{testimonials[testimonialModal].quote}"</p>
              <p className="sc-testimonial__name">{testimonials[testimonialModal].name}</p>
            </div>
            <button className="sc-testimonials__arrow" onClick={() => setTestimonialModal(testimonialModal + 1)} disabled={testimonialModal === testimonials.length - 1}>
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
