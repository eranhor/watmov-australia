import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How We Work', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const headerOffset = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none' }}
          aria-label="Watmov Australia Home"
        >
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
            color: 'var(--text-tertiary)',
            marginLeft: '6px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            alignSelf: 'flex-start',
            marginTop: '2px'
          }}>
            AUSTRALIA
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                padding: '8px 14px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--blue)';
                (e.currentTarget as HTMLElement).style.background = 'var(--blue-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-primary"
            style={{ marginLeft: '12px', padding: '10px 20px', fontSize: '14px' }}
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{
            display: 'none',
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--navy)',
            background: 'transparent',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <>
          <div
            className="mobile-overlay-backdrop"
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              zIndex: 998,
            }}
          />
          <div
            id="mobile-menu"
            className="mobile-overlay"
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(16px)',
              zIndex: 999,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  padding: '16px 20px',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  transition: 'all var(--transition)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--blue-light)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--blue)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn btn-primary"
              style={{ marginTop: '16px', textAlign: 'center' }}
            >
              Get in Touch
            </a>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
