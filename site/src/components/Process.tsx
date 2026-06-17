import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { FileSearch, DraftingCompass, Users, ClipboardCheck, Send, Mail, Phone, MessageCircle, Video } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: FileSearch,
    title: 'Scope Parsing & CAD Standard Mapping',
    desc: 'Before drawing a single line, we map out the specific asset owner codes, layering conventions, sheet templates, and title block requirements.',
  },
  {
    num: '02',
    icon: DraftingCompass,
    title: 'Core Layout & Draft Execution',
    desc: 'Our technical specialists execute the layout, setting up parametric constraints, precise geometry, and structural foundations.',
  },
  {
    num: '03',
    icon: Users,
    title: 'Internal Peer & Technical Review',
    desc: 'Every deliverable undergoes a rigorous internal engineering check to audit geometric accuracy, clear annotations, and standard compliance.',
  },
  {
    num: '04',
    icon: ClipboardCheck,
    title: 'Document Control Validation',
    desc: 'The final check ensures metadata tracking, drawing register consistency, and naming conventions match your exact document control protocols.',
  },
  {
    num: '05',
    icon: Send,
    title: 'Frictionless Delivery & Asset Handover',
    desc: 'Clean CAD source files and high-resolution digital sets are deployed directly to your designated local server environment or shared folder setup.',
  },
];

const channels = [
  { icon: Mail, label: 'Email' },
  { icon: Phone, label: 'Phone' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Video, label: 'Teams / Meet / Zoom' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, { threshold: 0.1 });

  return (
    <section id="process" ref={sectionRef} className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <h2>Our Multi-Tier QA Blueprint</h2>
          <p>
            A transparent, five-stage production pipeline designed to keep deliverables airtight 
            and aligned to your standards.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', marginBottom: '56px' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${(i % 5) + 1}`}
              style={{ display: 'flex', position: 'relative' }}
            >
              {/* Left column: circle + vertical connector */}
              <div style={{
                width: 'clamp(64px, 12vw, 88px)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}>
                <div
                  style={{
                    width: 'clamp(48px, 10vw, 64px)',
                    height: 'clamp(48px, 10vw, 64px)',
                    borderRadius: '50%',
                    background: 'white',
                    border: '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 6px var(--blue-light)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <step.icon size={22} strokeWidth={1.6} color="var(--blue)" />
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--navy)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {step.num}
                  </span>
                </div>
                {i !== steps.length - 1 && (
                  <div style={{
                    width: '2px',
                    flex: 1,
                    minHeight: '40px',
                    background: 'linear-gradient(180deg, var(--blue) 0%, var(--green) 100%)',
                    opacity: 0.2,
                    marginTop: '8px',
                    marginBottom: '8px',
                  }} />
                )}
              </div>

              {/* Right column: content */}
              <div style={{
                flex: 1,
                paddingBottom: i !== steps.length - 1 ? 'clamp(32px, 5vw, 48px)' : '0',
                paddingLeft: 'clamp(12px, 3vw, 24px)',
                paddingTop: 'clamp(8px, 2vw, 14px)',
              }}>
                <h3 style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{
                  fontSize: 'clamp(14px, 2vw, 15px)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Communication channels */}
        <div className="reveal" style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(24px, 4vw, 40px)',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Easy Communication</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
            Reach us however you prefer. We adapt to your channels.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {channels.map((ch) => (
              <div key={ch.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'var(--bg-alt)',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
              }}>
                <ch.icon size={16} color="var(--blue)" />
                {ch.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
