import { useState, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, { threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xrevypjr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setError('Something went wrong. Please email us directly at info@watmov.com.au');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container">
        <div className="reveal" style={{
          background: 'var(--navy)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(40px, 6vw, 72px)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Background accent */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(27, 160, 226, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(141, 198, 63, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}>
            {/* Left column */}
            <div>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: 'white',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}>
                Ready to scale your drafting output?
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '17px',
                lineHeight: 1.65,
                marginBottom: '40px',
              }}>
                Send us a brief — even a PDF or a few lines — and we will respond with a clear proposal 
                within one business day.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <a
                  href="tel:+61425843537"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Phone</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>+61 425 843 537</div>
                  </div>
                </a>

                <a
                  href="mailto:info@watmov.com.au"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Inquiries / Budget / Billing</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>info@watmov.com.au</div>
                  </div>
                </a>

                <a
                  href="mailto:design@watmov.com.au"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--green)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Design Team / Technical</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>design@watmov.com.au</div>
                  </div>
                </a>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'white',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Location</div>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>Frenchs Forest, NSW, Australia</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="mailto:info@watmov.com.au" className="btn btn-primary">
                  Email Us Your Brief
                  <ArrowRight size={18} />
                </a>
                <a href="tel:+61425843537" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </div>

            {/* Right column - Form */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={48} color="var(--green)" style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Message Sent</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                    Thanks for reaching out. We will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="New project enquiry from watmov.com.au" />
                  <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--navy)' }}>
                    Start a Conversation
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--border)',
                          fontSize: '15px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-alt)',
                          outline: 'none',
                          transition: 'border-color var(--transition)',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--border)',
                          fontSize: '15px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-alt)',
                          outline: 'none',
                          transition: 'border-color var(--transition)',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--border)',
                          fontSize: '15px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-alt)',
                          outline: 'none',
                          transition: 'border-color var(--transition)',
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237A8FA3' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                      >
                        <option value="">Select a project type...</option>
                        <option value="Irrigation Design">Irrigation Design</option>
                        <option value="Drainage / Stormwater">Drainage / Stormwater</option>
                        <option value="Pump Station / Hydraulic">Pump Station / Hydraulic</option>
                        <option value="Pipeline / Bulk Water">Pipeline / Bulk Water</option>
                        <option value="Landscape / Civil 3D">Landscape / Civil 3D</option>
                        <option value="General Drafting">General Drafting</option>
                        <option value="BOQ / Tender Support">BOQ / Tender Support</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your project, timeline, and any specific standards..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid var(--border)',
                          fontSize: '15px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-alt)',
                          outline: 'none',
                          transition: 'border-color var(--transition)',
                          resize: 'vertical',
                          minHeight: '100px',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', marginTop: '8px' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      {!submitting && <ArrowRight size={18} />}
                    </button>

                    {error && (
                      <div style={{
                        padding: '12px 16px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: 'var(--red, #dc2626)',
                        fontSize: '14px',
                        lineHeight: 1.5,
                      }}>
                        {error}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
