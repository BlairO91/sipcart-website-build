import "../styles/sip-cart.css";

const Terms = () => (
  <div className="sip-cart" style={{ background: "var(--sc-white)", minHeight: "100vh" }}>
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "120px 24px 80px" }}>
      <a href="/" style={{ fontFamily: "var(--sc-body)", color: "var(--sc-espresso)", textDecoration: "underline", fontSize: "0.9rem" }}>← Back to Home</a>
      <h1 style={{ fontFamily: "var(--sc-serif)", fontSize: "2.4rem", color: "#222", marginBottom: "2rem", marginTop: "1.5rem" }}>
        Terms &amp; Conditions
      </h1>
      <p style={{ fontFamily: "var(--sc-body)", fontSize: "0.9rem", color: "#999", marginBottom: "2rem" }}>
        Last updated: April 27, 2026
      </p>

      <div style={{ fontFamily: "var(--sc-body)", fontSize: "1rem", color: "#444", lineHeight: 1.8 }}>
        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>1. Services</h2>
        <p>
          The Sip Cart provides mobile bartending services, including but not limited to professional bartenders, bar setup and breakdown, custom cocktail menus, mixers, garnishes, bar essentials (cups, napkins, ice, straws), and creative consultation. All services are subject to availability and confirmation.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>2. Alcohol Policy</h2>
        <p>
          The Sip Cart does not supply alcohol. Clients are responsible for purchasing and providing all alcohol for their event. A customized alcohol shopping list will be provided as part of applicable packages. The Sip Cart reserves the right to refuse service to any guest who appears intoxicated, in accordance with Ontario liquor laws and responsible service practices.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>3. Booking &amp; Deposits</h2>
        <p>
          A non-refundable deposit is required to secure your event date. The remaining balance is due prior to the event on the date specified in your contract. Bookings are not confirmed until the deposit is received and a signed agreement is returned.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>4. Cancellation &amp; Refund Policy</h2>
        <p>
          Cancellations made more than 30 days prior to the event date will forfeit the deposit. Cancellations made within 30 days of the event are subject to full payment. Rescheduling is available subject to availability and must be confirmed in writing. The Sip Cart reserves the right to cancel services due to unsafe conditions, severe weather, or circumstances beyond our control, in which case a full refund will be issued.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>5. Event Details</h2>
        <p>
          Clients must provide accurate event details including date, time, location, and estimated guest count at the time of booking. Any changes to event details must be communicated at least 14 days in advance. Additional charges may apply for changes in guest count, event duration, or location.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>6. Venue Requirements</h2>
        <p>
          Clients are responsible for ensuring the event venue has adequate space for bar setup, access to a power source if required, and necessary permits for serving alcohol. The Sip Cart requires a minimum setup area as communicated during consultation. An indoor or covered area must be available as a backup in case of inclement weather for outdoor events.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>7. Liability</h2>
        <p>
          The Sip Cart is not responsible for any injury, illness, property damage, or loss arising from alcohol consumption at the event. Clients assume full responsibility for the behaviour of their guests. The Sip Cart carries general liability insurance for its operations and staff.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>8. Travel</h2>
        <p>
          Select packages include travel within 40km of Toronto. Events beyond this radius may be subject to an additional travel fee, which will be communicated at the time of quoting.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>9. Photography &amp; Content</h2>
        <p>
          The Sip Cart may photograph or film events for use in marketing materials, social media, and the website. If you prefer your event not to be photographed, please notify us in writing prior to the event date.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>10. Privacy</h2>
        <p>
          Personal information collected through our website and booking process is used solely for the purpose of providing our services and communicating with clients. We do not sell or share personal information with third parties. By submitting a quote request, you consent to receiving communications from The Sip Cart regarding your inquiry.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>11. Force Majeure</h2>
        <p>
          The Sip Cart shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, government restrictions, or severe weather conditions.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>12. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the Province of Ontario, Canada.
        </p>

        <h2 style={{ fontFamily: "var(--sc-serif)", fontSize: "1.6rem", color: "#222", margin: "2rem 0 1rem" }}>13. Contact</h2>
        <p>
          If you have any questions about these terms, please contact us at{" "}
          <a href="mailto:sipnslushto@gmail.com" style={{ color: "var(--sc-espresso)", textDecoration: "underline" }}>sipnslushto@gmail.com</a>.
        </p>
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <a href="/" style={{ fontFamily: "var(--sc-body)", color: "var(--sc-espresso)", textDecoration: "underline" }}>← Back to Home</a>
      </div>
    </div>
  </div>
);

export default Terms;
