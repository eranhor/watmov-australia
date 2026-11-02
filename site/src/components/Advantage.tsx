import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ClipboardCheck, Timer, GraduationCap, Receipt, Monitor, Users } from 'lucide-react';

const advantages = [
  {
    icon: ClipboardCheck,
    title: "Technical Delivery",
    desc: "Amey, our chief engineer, leads technical delivery. Review requirements and responsibilities are agreed for each assignment.",
    highlight: true,
  },
  {
    icon: Timer,
    title: "Agreed Delivery Dates",
    desc: "We review the brief and current capacity before agreeing delivery dates, and discuss the impact of changes as they arise.",
    highlight: false,
  },
  {
    icon: GraduationCap,
    title: "Water Engineering Support",
    desc: "Our work includes irrigation, drainage, pump station and pipeline drawings. We assess the technical requirements of each brief before accepting it.",
    highlight: false,
  },
  {
    icon: Receipt,
    title: "Clear Scope and Pricing",
    desc: "We provide an estimate against an agreed scope and discuss additional work or revisions that change that scope.",
    highlight: true,
  },
  {
    icon: Monitor,
    title: "CAD Deliverables",
    desc: "We agree file formats, drawing conventions and the method of exchanging project files with your team.",
    highlight: false,
  },
  {
    icon: Users,
    title: "An Ongoing Working Relationship",
    desc: "As we work together, we learn your preferred formats and requirements to support future assignments.",
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
            Technical support with clear responsibilities, agreed deliverables and direct communication.
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
