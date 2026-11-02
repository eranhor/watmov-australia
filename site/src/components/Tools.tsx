import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { FileCode, Box, Building2, FolderKanban } from 'lucide-react';

const tools = [
  {
    icon: FileCode,
    title: "CAD Files",
    desc: "We agree CAD file formats and versions before starting so that you can use the delivered drawings.",
  },
  {
    icon: Box,
    title: "Templates and Layers",
    desc: "We adapt to the drawing templates, layer conventions and title blocks agreed with your team.",
  },
  {
    icon: Building2,
    title: "Specialist Software Requirements",
    desc: "Tell us about any modelling or specialist software requirements so we can confirm suitability before quoting.",
  },
  {
    icon: FolderKanban,
    title: "Document Exchange",
    desc: "We agree file naming, revision tracking and a suitable way to exchange drawings and review comments.",
  },
];

const disciplines = ['Irrigation', 'Drainage', 'Pump Stations', 'Pipelines', 'Drawing Production'];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.1 });

  return (
    <section id="tools" ref={sectionRef} className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <h2>Working With Your Drawing Standards</h2>
          <p>
            We confirm the tools, file formats and document requirements for each assignment.
          </p>
        </div>

        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '56px',
        }}>
          {tools.map((t, i) => (
            <div
              key={t.title}
              className={`card reveal reveal-delay-${(i % 4) + 1}`}
              style={{ padding: '28px' }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius)',
                background: 'var(--blue-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: 'var(--blue)',
              }}>
                <t.icon size={20} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: '17px', marginBottom: '6px' }}>{t.title}</h3>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', lineHeight: 1.5 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-2">
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            Areas of Support
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}>
            {disciplines.map((d) => (
              <div key={d} style={{
                padding: '8px 18px',
                background: 'var(--blue-light)',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--blue-dark)',
                transition: 'all var(--transition)',
                cursor: 'default',
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--blue)';
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--blue-light)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--blue-dark)';
                }}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
