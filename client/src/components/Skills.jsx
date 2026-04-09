import { useScrollReveal } from '../hooks/useScrollReveal'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['JavaScript/TypeScript', 'React', 'Angular', 'Svelte', 'HTML5 / CSS3', 'Next.js'],
  },
  {
    title: 'Backend',
    skills: [
      'Node.js / Express',
      'Python / R Data Services',
      'Java / Spring Boot',
      'SQL / Relational Databases',
      'RESTful APIs',
      'GraphQL',
      'System Architecture',
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: ['AWS / GCP', 'Docker / Kubernetes', 'CI/CD Pipelines', 'Git / GitHub'],
  },
]

function SkillCategory({ title, skills }) {
  const ref = useScrollReveal()
  return (
    <div className="skill-category" ref={ref}>
      <h3>{title}</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-content">
        <h2>Skills</h2>
        <div className="skills-container">
          {skillCategories.map((cat) => (
            <SkillCategory key={cat.title} title={cat.title} skills={cat.skills} />
          ))}
        </div>
      </div>
    </section>
  )
}
