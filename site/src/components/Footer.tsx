export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const headerOffset = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Advantage', href: '#advantage' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Engagement', href: '#engagement' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'Tools', href: '#tools' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer style={{
      background: 'var(--navy)',
      color: 'rgba(255,255,255,0.6)',
      padding: '64px 0 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em' }}>
                WAT
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--green)', letterSpacing: '-0.04em' }}>
                MOV
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                marginLeft: '6px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                alignSelf: 'flex-start',
                marginTop: '2px',
              }}>
                AUSTRALIA
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '280px', marginBottom: '16px' }}>
              Enhancing infrastructure through technical precision.
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
              "Let us support your design journey together."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Quick Links
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      transition: 'color var(--transition)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Contact
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="tel:+61425843537" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  +61 425 843 537
                </a>
              </li>
              <li>
                <a href="mailto:info@watmov.com.au" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  info@watmov.com.au
                </a>
              </li>
              <li>
                <a href="mailto:design@watmov.com.au" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                  design@watmov.com.au
                </a>
              </li>
              <li style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                Frenchs Forest, NSW, Australia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Watmov Australia. All rights reserved. Watmov® is a registered trademark.
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            Extended Engineering Drafting & Design Support
          </div>
        </div>
      </div>
    </footer>
  );
}
