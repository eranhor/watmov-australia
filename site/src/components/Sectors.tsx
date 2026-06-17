import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Trophy, Trees, Road, Droplets, Waves, Route, Settings, Building2 } from 'lucide-react';

const sectors = [
  { icon: Trophy, title: 'Sports \u0026 Recreation', desc: 'Football/cricket grounds, ovals, turf courts, playgrounds' },
  { icon: Trees, title: 'Parks \u0026 Open Spaces', desc: 'Government, council, NCA-style public realm projects' },
  { icon: Road, title: 'Roads \u0026 Median Landscapes', desc: 'Streetscape, median, and verge irrigation \u0026 drainage' },
  { icon: Droplets, title: 'Irrigation \u0026 Agriculture', desc: 'Drip systems, large-scale agricultural irrigation' },
  { icon: Waves, title: 'Stormwater \u0026 Drainage', desc: 'Stormwater management, drainage plans \u0026 details' },
  { icon: Route, title: 'Bulk Water \u0026 Pipelines', desc: 'Bulk water transfer, distribution pipelines' },
  { icon: Settings, title: 'Pump Stations \u0026 Intake', desc: 'Pump station design, river intake structures' },
  { icon: Building2, title: 'Residential \u0026 Commercial', desc: 'Private and commercial wet infrastructure' },
];

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.1 });

  return (
    <section id="sectors" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header reveal">
          <h2>Sectors We Serve</h2>
          <p>
            Deep expertise across the water and civil infrastructure landscape — 
            from community sports fields to major bulk water projects.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {sectors.map((s, i) => (
            <div
              key={s.title}
              className={`card reveal reveal-delay-${(i % 4) + 1}`}
              style={{
                padding: '28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius)',
                background: 'var(--blue-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--blue)',
              }}>
                <s.icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
