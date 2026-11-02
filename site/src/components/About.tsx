import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Zap, ShieldCheck, Workflow } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Additional Drafting Capacity',
    desc: 'Discuss your workload with us. We agree the scope, available capacity and delivery dates before starting.',
  },
  {
    icon: ShieldCheck,
    title: 'Your Project Requirements',
    desc: 'We work to the project specifications and drawing requirements agreed with you, including relevant council or asset-owner requirements supplied for the assignment.',
  },
  {
    icon: Workflow,
    title: 'Adapted to Your Workflow',
    desc: 'We agree your CAD layers, templates, title blocks and review process upfront, then refine the workflow with your feedback.',
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
            Watmov Australia provides design and drafting support for consultants and contractors, with Australian client coordination and technical delivery from our team in India.
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
            The scope of drafting, design input, review and any required certification or sign-off is agreed for each project.
          </div>
        </div>
      </div>
    </section>
  );
}
