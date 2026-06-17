import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Route, Waves, Gauge, Factory, Mountain, ClipboardCheck, Droplets, FileStack, Ruler } from 'lucide-react';

const services = [
  {
    icon: Route,
    title: 'Pipeline Reticulation & Trunk Mains',
    desc: 'Detailed alignments, long-sections, cross-sections, and utility conflict/clash detection layouts.',
  },
  {
    icon: Waves,
    title: 'Pump Stations & Intake Structures',
    desc: 'Mechanical layouts, pipework configurations, structural concrete details, and access platforms.',
  },
  {
    icon: Gauge,
    title: 'Valve & Flow Meter Chambers',
    desc: 'General arrangements, valve assemblies, air release mechanisms, and deep excavation schematic details.',
  },
  {
    icon: Factory,
    title: 'Treatment Plant Infrastructure',
    desc: 'Process pipework detailing, tank layouts, chemical dosing station plans, and structural general arrangements.',
  },
  {
    icon: Mountain,
    title: 'Civil Works & Site Grading',
    desc: 'Earthworks modeling, access road long-sections, stormwater drainage plans, and site layout plans.',
  },
  {
    icon: ClipboardCheck,
    title: 'As-Built Asset Capture (WAE)',
    desc: 'Transforming field markups and redlines into highly accurate, asset-owner compliant Work-As-Executed records.',
  },
  {
    icon: Droplets,
    title: 'Irrigation Design Plans',
    desc: 'Detailed layout schematics, zone hydraulics calculations support, and precise component specifications for large-scale urban, agricultural, or park projects.',
  },
  {
    icon: FileStack,
    title: 'Standard Drawing Customization',
    desc: 'Adapting regional utility standard templates directly into project-specific construction documentation.',
  },
];

const deliverables = [
  'Plans',
  'Installation / Detail Drawings',
  'Bill of Quantities (BOQ) takeoffs',
  'Specification documents',
  'Full install document packages',
  'Works-as-executed drawings',
  'Tender support plans',
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.1 });

  return (
    <section id="capabilities" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Core Infrastructure Capabilities</h2>
          <p>
            Precision drafting and design support covering complex municipal, civil, and industrial water assets.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '56px',
        }}>
          {services.map((s, i) => (
            <div
              key={s.title}
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
                <s.icon size={20} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: '17px', marginBottom: '6px' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{
          background: 'var(--bg-alt)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(28px, 4vw, 48px)',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius)',
              background: 'var(--blue-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--blue)',
            }}>
              <Ruler size={20} strokeWidth={1.8} />
            </div>
            <h3 style={{ fontSize: '22px' }}>Typical Deliverables</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}>
            {deliverables.map((d) => (
              <div key={d} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: 'white',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  flexShrink: 0,
                }} />
                {d}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px 20px',
            background: 'rgba(141, 198, 63, 0.08)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(141, 198, 63, 0.15)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: 'var(--green-dark)' }}>Pain points we solve:</strong>{' '}
            BOQ takeoffs and tender-stage plans are two of the biggest time sinks for in-house teams.
            We handle them end-to-end so you can focus on design decisions.
          </div>
        </div>
      </div>
    </section>
  );
}
