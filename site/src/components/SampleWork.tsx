import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const projects = [
  {
    "title": "Football Ground",
    "sector": "Sports & Recreation",
    "image": "/samples/football-ground.jpg",
    "description": "Example drawing for a football ground."
  },
  {
    "title": "Park Drainage",
    "sector": "Parks & Open Spaces",
    "image": "/samples/park-drainage.jpg",
    "description": "Example park drainage drawing."
  },
  {
    "title": "Road Median & Landscape",
    "sector": "Roads & Landscapes",
    "image": "/samples/median-road-landscape.jpg",
    "description": "Example drawing set for a road median and surrounding landscape."
  },
  {
    "title": "Pump Station & Alignment Proposal",
    "sector": "Water Infrastructure",
    "image": "/samples/pump-station.jpg",
    "description": "Example pump station and pipeline alignment proposal."
  },
  {
    "title": "Drip Irrigation",
    "sector": "Irrigation",
    "image": "/samples/drip-design.jpg",
    "description": "Example drip irrigation layout."
  },
  {
    "title": "Pond Design",
    "sector": "Water & Landscape",
    "image": "/samples/pond-design.jpg",
    "description": "Example pond design drawing."
  },
  {
    "title": "Bulk Water Pipeline",
    "sector": "Water Infrastructure",
    "image": "/samples/bulk-water-pipeline.jpg",
    "description": "Example bulk water pipeline drawing."
  }
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
        cursor: 'default',
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
          <h2>Examples of Our Work</h2>
          <p>
            Selected previews of client project drawings. To respect client confidentiality, full-resolution project files are not available on this website. We adapt each assignment to the client’s brief and drawing requirements.
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
