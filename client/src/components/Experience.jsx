import { useScrollReveal } from '../hooks/useScrollReveal'

const experiences = [
  {
    date: 'Aug 2025 - Present',
    title: 'Software Engineer',
    company: 'Basata Inc.',
    bullets: [
      'Architected and evolved a scalable, multi-tenant, configuration-driven platform using React, Spring Boot, and Python, enabling rapid feature delivery across customers without code forks.',
      'Designed and implemented RESTful endpoints in a Java Spring Boot API to support new front-end feature requirements, owning the full stack from database schema design and query optimization through service-layer logic and API contract definition, ensuring performant, tenant-aware data access and clean integration boundaries.',
      'Refactored legacy code in a high-growth startup environment to improve modularity, maintainability, and performance, positioning the system to support increased customer load and feature complexity.',
      'Defined and implemented the front-end architecture for a rapidly scaling AI product, prioritizing responsiveness, rendering performance, and predictable state management under heavy data workflows.',
      'Extended and hardened Spring Boot APIs to support emerging front-end requirements, collaborating across the stack to introduce platform-level improvements that increased reliability and reduced integration friction.',
    ],
  },
  {
    date: 'Jun 2025 - Aug 2025',
    title: 'Software Engineer',
    company: 'EdPlus',
    bullets: [
      'Spearheaded front-end architecture for high-traffic, public-facing websites using Vue, Nuxt, and Jamstack, improving performance and accessibility across university-wide digital properties.',
      'Collaborated with designers, marketers, and product stakeholders to translate complex institutional requirements into scalable web components, increasing development velocity and reducing design-debt across teams.',
      'Integrated GraphQL APIs to optimize data fetching and reduce over-fetching, streamlining performance and developer experience.',
      'Led initiatives to improve code quality and maintainability, introducing internal documentation standards and modular design patterns for reusable components.',
    ],
  },
  {
    date: '2024 - 2025',
    title: 'Senior Database Developer',
    company: 'City of Chandler',
    description: 'Led the development of an updated database system for city services.',
  },
  {
    date: '2023 - 2024',
    title: 'Software Engineer',
    company: 'Virga Labs',
    description:
      'Developed Interactive data visualization platform for processing terabytes of data for critical policy insights.',
  },
  {
    date: '2022 - 2023',
    title: 'Software Engineer',
    company: 'Codesmith',
    description:
      'Developed and maintained a public web application, bidirectional collaborative IDE platform, and internal tools built with React, Redux, Node, and Express.',
  },
  {
    date: '2020 - 2022',
    title: 'Web Developer',
    company: 'Freelance',
    description: 'Developed and maintained web applications for various clients.',
  },
]

function TimelineItem({ experience }) {
  const ref = useScrollReveal()
  return (
    <div className="timeline-item" ref={ref}>
      <div className="timeline-date">{experience.date}</div>
      <div className="timeline-content">
        <h3>{experience.title}</h3>
        <h4>{experience.company}</h4>
        {experience.bullets ? (
          <ul>
            {experience.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        ) : (
          <p>{experience.description}</p>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-content">
        <h2>Experience</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}
