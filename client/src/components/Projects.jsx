import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    title: 'Policy Management Platform for The Bureau of Reclamation',
    description:
      'A full-featured policy exploration system with analytics dashboard and ML-powered insights.',
    techStack: 'React • Node.js • Python/Flask • R • Next.js • PostgreSQL • AWS',
    link: 'https://tool.crbpost2026dmdu.org/',
    linkText: 'View Project',
  },
  {
    title: 'Devtools for Svelte Development',
    description:
      'A set of tools to enhance the Svelte development experience, including a component tree and state inspector..',
    techStack: 'Svelte • Node.js • TypeScript',
    link: 'https://medium.com/@canopy.for.svelte/welcome-to-canopy-a-reimagined-svelte-devtool-ceb9e7fe3e',
    linkText: 'View Project',
  },
  {
    title: 'AI Powered Educational Podcast Generator',
    description:
      'A secure, scalable payment processing platform handling 100K+ transactions daily with 99.99% uptime.',
    techStack: 'TypeScript • Node.js • PostgreSQL • Kubernetes',
    link: 'https://ai-learn-cast.replit.app/',
    linkText: 'View Project',
  },
  {
    title: 'AI Powered Workout App',
    description: 'Using AI to generate personalized workout plans.',
    techStack: 'React Native • PostgreSQL • TypeScript • Node.js',
    link: '#',
    linkText: 'Coming Soon',
  },
]

function ProjectCard({ project }) {
  const ref = useScrollReveal()
  return (
    <div className="project-card" ref={ref}>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="tech-stack">{project.techStack}</p>
        <div className="project-links">
          <a
            href={project.link}
            className="btn"
            target={project.link !== '#' ? '_blank' : undefined}
            rel={project.link !== '#' ? 'noreferrer' : undefined}
          >
            <i className="fas fa-external-link-alt"></i> {project.linkText}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-content">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
