import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Briefcase, UserCheck, CheckCircle } from 'lucide-react';

const models = [
  {
    icon: Briefcase,
    title: 'Fixed-Scope Project Delivery',
    subtitle: 'Lump-Sum Pricing',
    description: 'Ideal for clearly defined scopes of work, individual tender preparations, or structured project overflows.',
    features: [
      'Project pricing based on an agreed scope and deliverables',
      'Delivery dates and review stages agreed before work starts',
      'Support for individual projects or temporary increases in drafting workload',
    ],
    cta: 'Request a Project Quote',
    href: 'mailto:info@watmov.com.au?subject=Project%20Quote%20-%20Watmov',
    accent: 'var(--blue)',
  },
  {
    icon: UserCheck,
    title: 'Ongoing Support Arrangements',
    subtitle: 'Agreed Capacity',
    description: 'For recurring drafting needs, we can discuss an ongoing arrangement based on your pipeline and our available capacity.',
    features: [
      'Resource allocation and availability agreed for your workload',
      'Communication channels, file formats and working hours agreed with your team',
      'Fees and the treatment of additional work agreed upfront',
    ],
    cta: 'Secure Your Dedicated Team',
    href: 'mailto:info@watmov.com.au?subject=Dedicated%20Resource%20Enquiry',
    accent: 'var(--green)',
  },
];

export default function Engagement() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.12 });

  return (
    <section id="engagement" ref={sectionRef} className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <h2>Flexible Commercial Alignment</h2>
          <p>
            Select the operational framework that matches your current project pipeline and procurement rules.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {models.map((m, i) => (
            <div
              key={m.title}
              className={`card reveal reveal-delay-${i + 1}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${m.accent}`,
                padding: '40px',
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-lg)',
                background: m.accent === 'var(--blue)' ? 'var(--blue-light)' : 'rgba(141, 198, 63, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                color: m.accent,
              }}>
                <m.icon size={24} strokeWidth={1.8} />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '4px' }}>{m.title}</h3>
                {m.subtitle && (
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: m.accent,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}>
                    {m.subtitle}
                  </span>
                )}
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.65, marginBottom: '24px' }}>
                {m.description}
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {m.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={16} style={{ color: m.accent, marginTop: '2px', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={m.href}
                className="btn"
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  background: m.accent,
                  color: 'white',
                  boxShadow: 'var(--shadow)',
                }}
              >
                {m.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
