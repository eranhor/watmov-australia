import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const projects = [
  {
    title: 'Trunk Main Pipeline Realignment',
    sector: 'WaterNSW / Sydney Water Standard Codes',
    image: '/samples/football-ground.jpg',
    description: 'Pressure main realignment with hydrant tie-ins, valve assemblies, and service boundary coordination.',
  },
  {
    title: 'Reticulation Network Upgrade',
    sector: 'Regional Council / Local Water Authority',
    image: '/samples/park-drainage.jpg',
    description: 'Residential and commercial service connection upgrades with property boundary setback compliance.',
  },
  {
    title: 'Road Reserve Bulk Water Transfer',
    sector: 'Council Road Corridor / Bulk Water Utility',
    image: '/samples/median-road-landscape.jpg',
    description: 'Long-section and cross-section design for bulk water pipeline within road reserve corridor.',
  },
  {
    title: 'Pump Station \u0026 Rising Main Proposal',
    sector: 'Sewerage Authority / Hydraulic Standard',
    image: '/samples/pump-station.jpg',
    description: 'Pump station layout, rising main alignment, elevation profiles, and highway crossing details.',
  },
  {
    title: 'Treatment Plant Process Layout',
    sector: 'Water Treatment / Municipal Standard',
    image: '/samples/drip-design.jpg',
    description: 'Process flow arrangement, equipment layouts, and hydraulic profile drawings for treatment assets.',
  },
  {
    title: 'Stormwater Retention Pond',
    sector: 'Council Civil / Stormwater Code',
    image: '/samples/pond-design.jpg',
    description: 'Pond design with storage volumes, outlet structures, and civil 3D surface modelling.',
  },
  {
    title: 'Bulk Water Transfer Pipeline',
    sector: 'Regional Water Utility / Pipeline Standard',
    image: '/samples/bulk-water-pipeline.jpg',
    description: 'Major bulk water transfer pipeline — plan, profile, and network hydraulics documentation.',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div
      className={`reveal reveal-delay-${(index % 4) + 1}`}
      style={{
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'all var(--transition)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--blue)';
        el.style.boxShadow = 'var(--shadow-md)';
        el.style.transform = 'translateY(-4px)';
        const img = el.querySelector('img') as HTMLElement;
        if (img) img.style.transform = 'scale(1.05)';
        const overlay = el.querySelector('.card-overlay') as HTMLElement;
        if (overlay) overlay.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
        const img = el.querySelector('img') as HTMLElement;
        if (img) img.style.transform = 'scale(1)';
        const overlay = el.querySelector('.card-overlay') as HTMLElement;
        if (overlay) overlay.style.opacity = '0';
      }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        aspectRatio: '4/3',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
      }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {/* Hover overlay */}
        <div
          className="card-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(26, 43, 60, 0.85) 0%, rgba(26, 43, 60, 0.3) 60%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '24px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--green)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '6px',
          }}>
            {project.sector}
          </span>
          <span style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'white',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.2,
          }}>
            {project.title}
          </span>
        </div>
      </div>

      {/* Text area */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: 'rgba(141, 198, 63, 0.1)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--green-dark)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '10px',
        }}>
          {project.sector}
        </div>
        <h3 style={{
          fontSize: '17px',
          fontWeight: 600,
          marginBottom: '6px',
          color: 'var(--navy)',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-tertiary)',
          lineHeight: 1.5,
        }}>
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function SampleWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, { threshold: 0.08 });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="work" ref={sectionRef} className="section section-alt">
      <div className="container">
        <div className="section-header reveal">
          <h2>Proven Infrastructure Delivery</h2>
          <p>
            Explore a selection of precise technical drawings executed to exact asset-owner frameworks.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{
          textAlign: 'center',
          padding: '40px 32px',
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
        }}>
          <h3 style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            marginBottom: '12px',
            color: 'var(--navy)',
          }}>
            Ready to expand your design capacity?
          </h3>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Let's review your upcoming tender or active project and confirm how Watmov can integrate with your team.
          </p>
          <button
            onClick={scrollToContact}
            className="btn btn-primary"
            style={{ gap: '10px' }}
          >
            Discuss Your Project
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
