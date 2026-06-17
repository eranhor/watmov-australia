import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Zap, ShieldCheck, Workflow } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Instant Capacity Relief',
    desc: 'Scale your drafting output up or down instantly. Stop turning down major design tenders or stalling active infrastructure projects due to local engineering talent shortages.',
  },
  {
    icon: ShieldCheck,
    title: 'Asset-Owner Compliance',
    desc: 'We design and draft strictly to local water authority, municipal, and regional specifications—minimizing standard markup cycles and accelerating your engineering approvals.',
  },
  {
    icon: Workflow,
    title: 'Seamless Workflow Integration',
    desc: 'Zero friction. We rapidly adapt to your exact CAD layers, corporate drafting standards, and internal document control systems from day one, acting as a natural extension of your office.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, { threshold: 0.15 });

  return (
    <section id="about" ref={sectionRef} className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <h2>Engineering Support, Built to Scale</h2>
          <p>
            Don't let internal resource constraints dictate your project capacity. We plug seamlessly into your existing workflows.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`card reveal reveal-delay-${i + 1}`}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--blue-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--blue)',
              }}>
                <v.icon size={26} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{v.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '24px' }}>
          <div className="compliance-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            All engineering design work is prepared for certification and sign-off by appropriately registered Australian professionals. Watmov provides drafting and design support under the direction and oversight of the client's responsible licensed practitioner.
          </div>
        </div>
      </div>
    </section>
  );
}
