import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const headerOffset = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="main-content"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0 80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F9FB 100%)',
      }}
    >
      {/* Blueprint background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.4,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(27, 160, 226, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(27, 160, 226, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(27, 160, 226, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(141, 198, 63, 0.1) 0%, transparent 40%)
        `,
      }} />

      {/* Decorative contour shapes */}
      <svg style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 300 300">
        <ellipse cx="150" cy="150" rx="140" ry="100" fill="none" stroke="var(--blue)" strokeWidth="1" />
        <ellipse cx="150" cy="150" rx="100" ry="70" fill="none" stroke="var(--green)" strokeWidth="1" />
        <ellipse cx="150" cy="150" rx="60" ry="40" fill="none" stroke="var(--blue)" strokeWidth="1" />
      </svg>
      <svg style={{ position: 'absolute', bottom: '15%', left: '3%', width: '200px', height: '200px', opacity: 0.05, pointerEvents: 'none' }} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--green)" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--blue)" strokeWidth="1" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="var(--green)" strokeWidth="1" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'var(--blue-light)',
          borderRadius: '100px',
          marginBottom: '32px',
          border: '1px solid rgba(27, 160, 226, 0.15)',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--green)',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--blue-dark)', letterSpacing: '0.02em' }}>
            Water Sector Engineering Specialists
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--navy)',
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}>
          Scalable Design & Drafting for Complex Water Infrastructure
        </h1>

        <p style={{
          fontSize: 'clamp(17px, 2vw, 20px)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '720px',
          margin: '0 auto 40px',
        }}>
          Eliminate capacity bottlenecks. We integrate directly with your engineering teams to deliver
          compliant, asset-owner-ready designs on time and within budget.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button onClick={() => scrollTo('#capabilities')} className="btn btn-primary">
            Secure Drafting Capacity
            <ArrowRight size={18} />
          </button>
          <button onClick={() => scrollTo('#work')} className="btn btn-secondary">
            View Project Portfolio
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'rgba(141, 198, 63, 0.08)',
          borderRadius: '100px',
          border: '1px solid rgba(141, 198, 63, 0.15)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--green-dark)',
          marginBottom: '56px',
        }}>
          <span>⚡</span>
          <span>Built to Local Utility & Regional Council Standards</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#about')}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-tertiary)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
        }}
        aria-label="Scroll to About section"
      >
        <ChevronDown size={24} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-8px); }
          60% { transform: translateX(-50%) translateY(-4px); }
        }
      `}</style>
    </section>
  );
}
