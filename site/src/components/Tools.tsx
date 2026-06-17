import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { FileCode, Box, Building2, FolderKanban } from 'lucide-react';

const tools = [
  {
    icon: FileCode,
    title: 'Autodesk AutoCAD',
    desc: 'Precise 2D production detailing, complex layering standards, and traditional construction documentation sets.',
  },
  {
    icon: Box,
    title: 'AutoCAD Civil 3D',
    desc: 'Advanced surface modeling, alignment profiles, corridors, and dynamic gravity/pressure pipe network detailing.',
  },
  {
    icon: Building2,
    title: 'BIM & Revit Integration',
    desc: 'Intelligent 3D parametric modeling, structural coordination, and clash checking for complex pump and treatment facilities.',
  },
  {
    icon: FolderKanban,
    title: 'Document Control Systems',
    desc: 'Seamless integration with your mandatory document common data environments (CDE) like ProjectWise, Aconex, or regional asset management portals.',
  },
];

const disciplines = [
  'Hydraulics',
  'Civil',
  'Pumping Station',
  'Structural (RCC/Reinforcement)',
  'Mechanical',
  'Electrical',
];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.1 });

  return (
    <section id="tools" ref={sectionRef} className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <h2>Native Software Integration</h2>
          <p>
            We operate natively within your engineering software environments to ensure absolute data fidelity and asset-owner compliance.
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
            Disciplines
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
