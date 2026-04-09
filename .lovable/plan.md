

# The Sip Cart — Luxury Mobile Bar Website

## Overview
A single-page luxury mobile bar website for The Sip Cart (Toronto & GTA). Warm, editorial, elevated aesthetic with blush pink, olive, espresso, and champagne gold on a cream base.

## Brand Setup
- **Colors**: Blush `#EDB8B6`, Olive `#9D976E`, Espresso `#764B36`, Gold `#FFE2A1`, Cream `#F5EFE8`
- **Fonts**: Cormorant Garamond (headlines), Nunito (body) via Google Fonts
- **CSS custom properties** for all brand colors

## Sections (in order)

1. **Navbar** — Sticky, transparent over hero → cream on scroll. Logo placeholder, nav links (Services, How It Works, Packages, FAQ), "Request a Quote" CTA. Hamburger on mobile.

2. **Hero** — Full-viewport, blush background placeholder with warm overlay. Eyebrow text, serif headline with fade-up animation, subheadline, two CTAs (primary + outlined).

3. **How It Works** — 3-step horizontal layout: Tell Us → We Set Up → Guests Celebrate. Decorative numbers, serif titles, body descriptions.

4. **Services / Event Types** — 2×3 card grid (Weddings, Bachelorettes, Corporate, Birthdays, Bridal Showers, Private Events). Placeholder image areas, hover effects.

5. **Mid-Page CTA Strip** — Full-width espresso banner with cream text and outlined quote button.

6. **Packages** — 3 cards (Essential, Signature w/ "Most Popular" badge, Luxe). No prices, feature lists, "Get a Quote" buttons.

7. **Custom Experience** — 3-column feature layout (Custom Cups, Signage, Bespoke Menus) with olive SVG line icons.

8. **Testimonials** — 3 placeholder testimonial cards with serif italic quotes, gold star ratings, cream/blush background.

9. **FAQ** — 8-question accordion with smooth expand/collapse transitions.

10. **Final CTA + Quote Form** — Two buttons + Google Form embed placeholder with dashed border, contact info (email + phone).

11. **Footer** — Espresso background, logo + tagline, quick links, contact/social info, copyright.

## Technical Approach
- Built as a React single-page app using the existing project structure
- Hand-written CSS (no Tailwind classes for styling — custom CSS with brand variables)
- Smooth scroll anchors, scroll-aware navbar, CSS fade-up animation on hero
- Fully responsive mobile-first design
- All image placeholders use brand colors with findable classes (`hero-bg`, `event-photo`, `photo-placeholder`, `logo-img`)
- Testimonials and Google Form areas marked with HTML comments as specified

