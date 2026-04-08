import { useState, useEffect } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

export default function About() {
  const text = useTypewriter()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const handleScroll = () => setCollapsed(window.pageYOffset > 150)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" className={`section banner-section${collapsed ? ' collapsed' : ''}`}>
      <div className="banner-overlay"></div>
      <div className="section-content">
        <h1>Vance McGrady</h1>
        <h2>Software Engineer | Web Consultant</h2>
        <div className="typewriter-container">
          <span id="typewriter-text">{text}</span>
          <span className="cursor">|</span>
        </div>
        <div className="social-links">
          <a target="_blank" href="https://github.com/VanceMcGrady" aria-label="GitHub" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/vancemcgrady/" aria-label="LinkedIn" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a target="_blank" href="https://bsky.app/profile/vancemcgrady.bsky.social" aria-label="Bluesky" rel="noreferrer">
            <i className="fa-brands fa-bluesky"></i>
          </a>
          <a target="_blank" href="mailto:vancemcgrady@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
