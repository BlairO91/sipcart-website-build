import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Instagram, Phone, Mail, Heart, PartyPopper, Briefcase, Cake, Gem, Wine, Sparkles, Quote, ChevronLeft, ChevronRight, Martini } from "lucide-react";
import "../styles/sip-cart.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo.png";
import sipCartHero from "@/assets/Untitled design - 2026-04-19T094229.357.webp";
import heroSlide1 from "@/assets/Photos/ferals-studio-8l45X115t9E-unsplash.jpg";
import heroSlide2 from "@/assets/Photos/IMG_1366.jpg";
import heroSlide3 from "@/assets/Photos/jacqueline-a-hernandez-MRHG1DvP46I-unsplash.jpg";
import heroSlide4 from "@/assets/Photos/pinar-kucuk-_qf7KGWyAes-unsplash.webp";
import fernandaImg from "@/assets/fernanda.webp";
import reviewBgImg from "@/assets/Photos/patrycja-jadach-qpR8meHYWKc-unsplash.jpg";
import quoteIcon from "@/assets/Photos/Untitled design - 2026-04-19T182505.669.webp";
import footerTitle from "@/assets/Photos/Title (1920 x 400 px) (1920 x 250 px).webp";
import weddingImg from "@/assets/wedding.webp";
import bacheloretteImg from "@/assets/bachelorette.webp";
import corporateImg from "@/assets/corporate.webp";
import birthdayImg from "@/assets/birthday.webp";
import bridalImg from "@/assets/bridal.webp";
import girlsnightImg from "@/assets/girlsnight.webp";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.webp";
import gallery6 from "@/assets/gallery-6.webp";
import icon2 from "@/Icons/2.png";
import icon3 from "@/Icons/3.png";
import icon4 from "@/Icons/4.png";
import icon5 from "@/Icons/5.png";
import icon6 from "@/Icons/6.png";
import icon7 from "@/Icons/7.png";
import icon8 from "@/Icons/8.png";
import icon9 from "@/Icons/Untitled design - 2026-04-24T113823.919.png";
import icon10 from "@/Icons/10.png";
import icon11 from "@/Icons/11.png";
import brandPhoto1 from "@/assets/Photos/ferals-studio-8l45X115t9E-unsplash.webp";
import brandPhoto2 from "@/assets/Photos/olivie-strauss-tZOpC47nebM-unsplash.webp";
import brandPhoto3 from "@/assets/Photos/pinar-kucuk-_qf7KGWyAes-unsplash.webp";
import brandPhoto4 from "@/assets/Photos/jacqueline-a-hernandez-MRHG1DvP46I-unsplash.webp";
import brandPhoto5 from "@/assets/Photos/ecaterina-tanase-9Bth_LiiMoo-unsplash.webp";
import brandPhoto6 from "@/assets/Photos/olivie-strauss-eUrGZhIeHao-unsplash.webp";
import brandPhoto7 from "@/assets/Photos/alyona-yankovska-7EbGkOm8pWM-unsplash.webp";
import brandPhoto8 from "@/assets/Photos/toa-heftiba-FpjYO4a-PP8-unsplash.webp";
import gallery7 from "@/assets/gallery-7.webp";
import gallery8 from "@/assets/gallery-8.webp";
import gallery9 from "@/assets/gallery-9.webp";
import gallery10 from "@/assets/gallery-10.webp";
import photo1 from "@/assets/Photos/olivie-strauss-eUrGZhIeHao-unsplash.webp";
import photo2 from "@/assets/Photos/pinar-kucuk-_qf7KGWyAes-unsplash.webp";
import photo3 from "@/assets/Photos/ferals-studio-8l45X115t9E-unsplash.webp";
import photo4 from "@/assets/Photos/toa-heftiba-FpjYO4a-PP8-unsplash.webp";
import photo5 from "@/assets/Photos/olena-bohovyk-JjGLEN7T8xI-unsplash.webp";
import photo6 from "@/assets/Photos/svitlana-vexxZA_JNso-unsplash.webp";
import photo7 from "@/assets/Photos/olivie-strauss-LW0cVdFc_Yk-unsplash.webp";
import photo8 from "@/assets/Photos/kateryna-hliznitsova-RdUYKST5clk-unsplash.webp";
import photo9 from "@/assets/Photos/no-revisions-gA81ZTsql68-unsplash.webp";
import photo10 from "@/assets/Photos/jacqueline-a-hernandez-MRHG1DvP46I-unsplash.webp";
import photo11 from "@/assets/Photos/c-s-K1mPk3TBc5k-unsplash.webp";
import photo12 from "@/assets/Photos/olivie-strauss-tZOpC47nebM-unsplash.webp";
import photo13 from "@/assets/Photos/alyona-yankovska-7EbGkOm8pWM-unsplash.webp";
import photo14 from "@/assets/Photos/ecaterina-tanase-9Bth_LiiMoo-unsplash.webp";
import photo15 from "@/assets/Photos/trinh-minh-th-9cPdsa-_7PI-unsplash.webp";

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
  { name: "Weddings", desc: "Your most important day deserves a bar as beautiful as the moment.", img: weddingImg, iconImg: icon2 },
  { name: "Bachelorette Parties", desc: "Sip, celebrate, and make memories your group will talk about forever.", img: bacheloretteImg, iconImg: icon10 },
  { name: "Corporate Events", desc: "Impress clients and teams with a polished, professional bar experience.", img: corporateImg, iconImg: icon4 },
  { name: "Birthday Parties", desc: "Because every birthday deserves a signature drink.", img: birthdayImg, iconImg: icon6 },
  { name: "Engagements & Showers", desc: "Celebrate love with custom cocktails and a stunning bar setup.", img: bridalImg, iconImg: icon5 },
  { name: "Private Events & Girls' Nights", desc: "Mocktails, cocktails, good company — we've got the bar covered.", img: girlsnightImg, iconImg: icon3 },
];

const testimonials = [
  { quote: "I had Sip Cart at my 30th birthday party, and she was such a highlight of the night. She created custom drinks that perfectly matched my party theme! They were sooo tastey and cute!!! My guests couldn't stop talking about them. It added such a fun, personalized touch to the event. Fernanda was professional and so fun to have at the party! She kept the vibes high! I'd 100% book Sip Cart again!", name: "Kristin O." },
  { quote: "I had the pleasure of having @thesipcart.to attend my 25th birthday party. All drinks were aesthetically pleasing and absolutely delicious! Especially the mango margaritas! She went above and beyond - not only cocktailing but hosting drinks all night to all my guests. Will definitely be booking again for future events!", name: "Jen H." },
  { quote: "The way The Sip Cart came into my friend's birthday party and absolutely made it so lively and so fun.. we were dancing, singing, laughing and vibing all night. Fern is an incredible bartender with such good energy and AMAZING tasting drinks and I'm not even much of a drinker but that night.. I was. I had a blast and I would 100% book and recommend to all friends!", name: "Fitore A." },
  { quote: "If you are looking for an elevated bartending experience with delicious and beautiful looking drinks The Sip Cart is exactly what you need! Fernanda is an incredible bartender who brings all the vibes and delivers exceptional service. I can't wait to book with her for my next event!", name: "Victoria G." },
  { quote: "If you don't have thesipcart.to at your event then you're doing it all wrong! Not only did fern make some bomb drinks but the vibes she bought too was unmatched. From the details of the drinks and ensuring everyone was loving their drinks to her engaging with the guest boosted our experience with her service. Fern made sure a drink was in hand all night long, I'm not a tequila drinker but I ended up having 3 spicy margs from how good they were. A good time was def HAD with fern as our bartender. Drinks 10/10, service 10/10, and vibes 10/10! Don't second guess it and just book, she will NOT disappoint", name: "Emily V." },
];

const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guests: "",
    budget: "",
    notes: "",
    confirm: "",
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const steps = [
    {
      label: "What's your name?",
      field: "name",
      type: "text",
      placeholder: "Full name",
    },
    {
      label: "What's your email?",
      field: "email",
      type: "email",
      placeholder: "you@email.com",
    },
    {
      label: "What's your phone number?",
      field: "phone",
      type: "tel",
      placeholder: "+1 (___) ___-____",
    },
    {
      label: "When is your event?",
      field: "eventDate",
      type: "date",
      placeholder: "",
    },
    {
      label: "What type of event is it?",
      field: "eventType",
      type: "select",
      options: [
        "Birthday Celebration",
        "Wedding",
        "Bridal Shower / Engagement Party",
        "Family Celebration",
        "Brand Activation",
        "Corporate",
        "Other",
      ],
    },
    {
      label: "How many guests are you expecting?",
      field: "guests",
      type: "text",
      placeholder: "e.g. 50",
    },
    {
      label: "What is your budget?",
      field: "budget",
      type: "select",
      options: [
        "$500 – $1,000",
        "$1,000 – $1,500",
        "$1,500 – $2,000",
        "$3,000 – $4,000",
      ],
    },
    {
      label: "Anything else you'd like us to know?",
      field: "notes",
      type: "textarea",
      placeholder: "Special requests, themes, drink preferences...",
    },
    {
      label: "By submitting, you confirm you'd like The Sip Cart to reach out about your event.",
      field: "confirm",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

  const current = steps[step];
  const value = formData[current.field as keyof typeof formData];
  const canNext = current.type === "textarea" || value.trim() !== "";

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      await emailjs.send("service_6g62zty", "template_cd13zac", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        eventType: formData.eventType,
        guests: formData.guests,
        budget: formData.budget,
        notes: formData.notes || "None",
      }, "Emied8aa-JrZ-uZxp");
    } catch (e) {
      console.error("Form submission failed:", e);
    }
  };

  if (submitted) {
    return (
      <div className="sc-typeform">
        <div className="sc-typeform__step" style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--sc-serif)", fontSize: "2rem", color: "#222", marginBottom: "1rem" }}>
            Thank you!
          </h3>
          <p style={{ fontFamily: "var(--sc-body)", fontSize: "1.1rem", color: "#555" }}>
            We'll be in touch within 24–48 hours to discuss your event.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sc-typeform">
      {/* Progress */}
      <div className="sc-typeform__progress">
        <div
          className="sc-typeform__progress-bar"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="sc-typeform__step">
        <p className="sc-typeform__count">
          {step + 1} of {steps.length}
        </p>
        <h3 className="sc-typeform__label">{current.label}</h3>

        {current.type === "select" ? (
          <div className="sc-typeform__options">
            {current.options!.map((opt) => (
              <button
                key={opt}
                className={`sc-typeform__option ${value === opt ? "sc-typeform__option--active" : ""}`}
                onClick={() => update(current.field, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : current.type === "textarea" ? (
          <textarea
            className="sc-typeform__input"
            rows={4}
            placeholder={current.placeholder}
            value={value}
            onChange={(e) => update(current.field, e.target.value)}
          />
        ) : (
          <input
            className="sc-typeform__input"
            type={current.type}
            placeholder={current.placeholder}
            value={value}
            onChange={(e) => update(current.field, e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canNext && next()}
            autoFocus
          />
        )}

        <div className="sc-typeform__nav">
          {step > 0 && (
            <button className="sc-btn sc-btn--outline" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <button
            className="sc-btn sc-btn--gold"
            onClick={next}
            disabled={!canNext}
            style={{ opacity: canNext ? 1 : 0.5 }}
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [testimonialModal, setTestimonialModal] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    if (isMobile && testimonialTrackRef.current) {
      const card = testimonialTrackRef.current.children[testimonialIdx] as HTMLElement;
      if (card) {
        testimonialTrackRef.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      }
    }
  }, [testimonialIdx, isMobile]);
  useEffect(() => {
    if (testimonialModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [testimonialModal]);
  const photoBarRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];
  const brandSectionRef = useRef<HTMLDivElement>(null);
  const brandPinRef = useRef<HTMLDivElement>(null);
  const brandPhotosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  // Scroll reveal for content elements
  useEffect(() => {
    const els = document.querySelectorAll('.sc-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('sc-reveal--in');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
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
      <nav className={`sc-nav${scrolled ? " sc-nav--scrolled" : ""} sc-nav-reveal`}>
        <div className="sc-nav__inner">
          <img src={logo} alt="The Sip Cart logo" className="logo-img" style={{ height: 'clamp(3rem, 6vw, 5.5rem)' }} />
          <div className={`sc-nav__links${menuOpen ? " open" : ""}`}>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("packages")}>Packages</button>
            <button onClick={() => scrollTo("testimonials")}>Testimonials</button>
            <button onClick={() => scrollTo("bartender")}>Meet Your Bartender</button>
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
        <div className="sc-hero-video-wrap sc-wipe-reveal" style={{ position: "relative" }}>
          {heroSlides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="hero-video"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: heroSlide === i ? 1 : 0,
                transition: "opacity 1.2s ease-in-out",
              }}
            />
          ))}
        </div>
        <div className="sc-hero__content" ref={heroContentRef}>
          <div className="sc-hero__content-inner">
            <p className="sc-hero__eyebrow sc-slide-in" style={{ color: "#000", animationDelay: "1s" }}>Toronto &amp; GTA Mobile Bar Service</p>
            <h1 className="sc-hero__headline">
              <span className="sc-slide-in" style={{ display: "block", color: "var(--sc-blush)", animationDelay: "1.3s" }}>Elevated Experiences</span>
              <span className="sc-slide-in" style={{ display: "block", animationDelay: "1.6s" }}>One Sip at a Time</span>
            </h1>
            <p className="sc-hero__sub sc-slide-in" style={{ animationDelay: "1.9s" }}>We design and deliver a fully curated bar experience — from custom cocktails to stylish setups. You bring the alcohol, we bring everything else.</p>
            <button className="sc-btn sc-btn--gold sc-slide-in" style={{ animationDelay: "2.2s" }} onClick={() => scrollTo("quote")}>Request a Quote</button>
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="sc-section sc-services">
        <h2 className="sc-section__heading">We Make Every Event Unforgettable</h2>
        <p className="sc-section__sub">From intimate gatherings to <br className="sc-mobile-br" />grand celebrations — The Sip Cart <br className="sc-mobile-br" />brings the bar to you.</p>
        <div className="sc-services__grid sc-reveal">
          {events.map((e, i) => (
            <div className="sc-services__card" key={i}>
              <div className="sc-services__card-desc">
                <img src={e.iconImg} alt="" className="sc-services__card-icon" style={e.name === "Engagements & Showers" ? { height: "6rem" } : undefined} />
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
        <div className="sc-review-snippet__card sc-reveal">
          <img src={quoteIcon} className="sc-review-snippet__quote-icon" alt="" />
          <blockquote>If you are looking for an elevated bartending experience with delicious and beautiful looking drinks, The Sip Cart is exactly what you need!</blockquote>
          <img src={quoteIcon} className="sc-review-snippet__quote-icon sc-review-snippet__quote-icon--end" alt="" />
          <p className="sc-review-snippet__name">— Victoria G.</p>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="sc-section sc-packages">
        <h2 className="sc-section__heading">Our Packages</h2>
        <p className="sc-section__sub">Every package is fully customized to your event. Packages starting at $650, with pricing based on guest count, event duration, and location.</p>
        <div className="sc-packages__grid sc-reveal">
          {/* Essential */}
          <div className="sc-pkg">
            <h3 className="sc-pkg__name">The Classic Sip</h3>
            <p className="sc-pkg__best">Best for: intimate events, small gatherings</p>
            <ul className="sc-pkg__list">
              <li>Minimum 4 hours of service</li><li>1 bartender</li><li>Custom drink menu</li>
              <li>Premium mixers &amp; garnishes</li><li>Bar essentials (cups, napkins, ice, straws)</li>
              <li>Professional setup &amp; breakdown</li>
            </ul>
            <button className="sc-btn sc-btn--primary" onClick={() => scrollTo("quote")}>Get a Quote</button>
          </div>
          {/* Signature */}
          <div className="sc-pkg sc-pkg--popular">
            <span className="sc-pkg__badge">Most Popular</span>
            <h3 className="sc-pkg__name">The Signature Sip</h3>
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
            <h3 className="sc-pkg__name">The Deluxe Sip</h3>
            <p className="sc-pkg__best">Best for: weddings, corporate events, large-scale celebrations</p>
            <ul className="sc-pkg__list">
              <li>Everything in The Signature Sip +</li><li>Multiple bartenders</li>
              <li>Extended service hours</li><li>Full creative consultation</li>
              <li>Premium branded setup</li><li>Priority booking</li>
            </ul>
            <button className="sc-btn sc-btn--primary" onClick={() => scrollTo("quote")}>Get a Quote</button>
          </div>
        </div>

        <h4 className="sc-addons__sub sc-reveal">Customize your event with our add-ons</h4>
        <div className="sc-addons__grid sc-reveal sc-reveal--delay-1">
          {[
            "Extra Hour of Service",
            "Extra Signature Cocktail / Mocktail",
            "Espresso Martini Station",
            "Hydration Station",
            "Customized Framed Menu",
            "Themed Bar Decor",
            "Floral Styling",
            "Glassware Rental",
          ].map((addon, i) => (
            <div className="sc-addon" key={i}>
              <p className="sc-addon__name">{addon}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MID CTA (2-grid) ── */}
      <section className="sc-mid-cta-grid">
        <div className="sc-mid-cta-grid__img">
          <img src={sipCartHero} alt="The Sip Cart mobile bar setup" />
        </div>
        <div className="sc-mid-cta-grid__content" style={{ backgroundImage: `url(${reviewBgImg})` }}>
          <div className="sc-mid-cta-grid__inner sc-reveal">
            <img src={icon9} alt="" className="sc-mid-cta-icon sc-mid-cta-icon--top-right" />
            <img src={icon9} alt="" className="sc-mid-cta-icon sc-mid-cta-icon--bottom-right" />
            <div className="sc-mid-cta-grid__text">
              <h2>Ready to elevate your next event?</h2>
              <p>From intimate backyard parties to large-scale celebrations, we bring a fully curated bar — tailored to your style, your guests, and your vision.</p>
              <button className="sc-btn sc-btn--dark" onClick={() => scrollTo("quote")}>Request a Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sc-section sc-testimonials" id="testimonials">
        <h2 className="sc-section__heading">What Our Clients Are Saying</h2>
        <div className="sc-testimonials__carousel sc-reveal">
          <button className="sc-testimonials__arrow sc-testimonials__arrow--left" onClick={() => setTestimonialIdx(Math.max(0, testimonialIdx - 1))} disabled={testimonialIdx === 0}>
            <ChevronLeft />
          </button>
          <div className="sc-testimonials__viewport">
            <div className={`sc-testimonials__track${isMobile ? " sc-testimonials__track--snap" : ""}`} ref={isMobile ? testimonialTrackRef : undefined} style={isMobile ? undefined : { transform: `translateX(-${testimonialIdx * (100 / 3)}%)` }}>
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
          <button className="sc-testimonials__arrow sc-testimonials__arrow--right" onClick={() => setTestimonialIdx(Math.min(testimonials.length - (isMobile ? 1 : 3), testimonialIdx + 1))} disabled={testimonialIdx >= testimonials.length - (isMobile ? 1 : 3)}>
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
      <section className="sc-section sc-about" id="bartender">
        <div className="sc-about__grid sc-reveal">
          <div className="sc-about__photo">
            <img src={fernandaImg} alt="Fernanda, founder of The Sip Cart" />
          </div>
          <div className="sc-about__content">
            <div className="sc-about__heading-row">
              <img src={icon8} alt="" className="sc-about__icon" />
              <h2 className="sc-about__heading">Meet Your Bartender</h2>
            </div>
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
            <h2 className="sc-brand-text">Elevated Experiences<br />One Sip at a Time</h2>
            <div className="sc-brand-photos" ref={brandPhotosRef}>
              <div className="sc-brand-col sc-brand-col--left" data-start="0">
                <div className="sc-brand-photo"><img src={brandPhoto1} alt="Cocktail" /></div>
                <div className="sc-brand-photo"><img src={brandPhoto3} alt="Drinks" /></div>
                <div className="sc-brand-photo"><img src={brandPhoto5} alt="Event" /></div>
              </div>
              <div className="sc-brand-col sc-brand-col--right" data-start="28">
                <div className="sc-brand-photo"><img src={brandPhoto2} alt="Cocktail" /></div>
                <div className="sc-brand-photo"><img src={brandPhoto4} alt="Drinks" /></div>
                <div className="sc-brand-photo"><img src={brandPhoto6} alt="Event" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="sc-section sc-faq">
        <h2 className="sc-section__heading">Frequently Asked Questions</h2>
        <div className="sc-faq__wrap sc-reveal">
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
        <div className="sc-reveal"><QuoteForm /></div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sc-footer">
        <div className="sc-footer__brand-overlay">
          <img src={logo} alt="The Sip Cart logo" className="logo-img-footer" style={{ height: 'clamp(5rem, 12vw, 12rem)' }} />
        </div>
        <div className="sc-footer__inner">
          <div className="sc-footer__contact">
            <a
              href="https://www.instagram.com/thesipcart.to"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="sc-footer__social"
            >
              <Instagram />
            </a>
<a
              href="mailto:sipnslushto@gmail.com"
              aria-label="Email us"
              className="sc-footer__social"
            >
              <Mail />
            </a>
          </div>

          <div className="sc-footer__links">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("packages")}>Packages</button>
            <button onClick={() => scrollTo("testimonials")}>Testimonials</button>
            <button onClick={() => scrollTo("bartender")}>Meet Your Bartender</button>
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
