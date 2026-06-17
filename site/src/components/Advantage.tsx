import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ClipboardCheck, Timer, GraduationCap, Receipt, Monitor, Users } from 'lucide-react';

const advantages = [
  {
    icon: ClipboardCheck,
    title: 'Rigorous Quality Assurance',
    desc: 'Multi-tier internal review processes ensure that every schematic, long-section, layout, and cross-section is verified for geometric and standard compliance before it ever reaches your desk.',
    highlight: true,
  },
  {
    icon: Timer,
    title: 'Rapid Turnaround Times',
    desc: 'Optimized, dedicated resource allocation means your urgent project timelines stay firmly on track, even under compressed delivery schedules or unexpected design modifications.',
    highlight: false,
  },
  {
    icon: GraduationCap,
    title: 'Deep Sector Expertise',
    desc: 'A highly specialized, exclusive focus on water infrastructure assets—spanning pump station configurations, complex pipeline alignments, treatment plant layouts, and reticulation networks.',
    highlight: false,
  },
  {
    icon: Receipt,
    title: 'Predictable Costing Models',
    desc: 'No hidden variations, administrative overheads, or surprise billing. Choose between transparent fixed-scope project estimates or scalable, dedicated resource agreements.',
    highlight: true,
  },
  {
    icon: Monitor,
    title: 'Modern CAD Infrastructure',
    desc: 'Utilizing industry-standard design platforms paired with strict data security and backup protocols to keep your proprietary project files safe, synchronized, and audit-ready.',
    highlight: false,
  },
  {
    icon: Users,
    title: 'Long-Term Continuity',
    desc: 'We deliberately retain asset and project-specific knowledge. The technical specialists assigned to your initial project are retained to support your future iterations and upcoming tenders.',
    highlight: false,
  },
];

export default function Advantage() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.12 });

  return (
    <section id="advantage" ref={sectionRef} className="section">
      <div className="container">
        <div className="section-header reveal">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(141, 198, 63, 0.1)',
            borderRadius: '100px',
            marginBottom: '16px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green-dark)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Key Differentiator</span>
          </div>
          <h2>Engineered for Technical Reliability</h2>
          <p>
            A multi-layered approach to quality, compliance, and delivery predictability.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {advantages.map((a, i) => (
            <div
              key={a.title}
              className={`card reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                borderColor: a.highlight ? 'rgba(27, 160, 226, 0.25)' : 'var(--border)',
                background: a.highlight ? 'linear-gradient(135deg, #FFFFFF 0%, #F6FBFF 100%)' : 'var(--bg-elevated)',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius)',
                background: a.highlight ? 'var(--blue-light)' : 'var(--bg-alt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: a.highlight ? 'var(--blue)' : 'var(--text-tertiary)',
              }}>
                <a.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 style={{
                fontSize: '19px',
                marginBottom: '10px',
                color: a.highlight ? 'var(--navy)' : 'var(--text-primary)',
              }}>
                {a.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
