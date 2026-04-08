import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    text: 'I have had the privilege of working with Vance and can attest to his exceptional leadership and strategic vision. Vance excels both individually and in collaborative settings, effectively driving projects to success while fostering a positive and productive team environment. His calm demeanor and insightful perspectives have been invaluable to the team. Working with Vance has been a wonderful experience, and I am grateful for his guidance and wisdom.',
    name: 'Dakota Duff',
    title: 'Cloud Ops & IT',
  },
  {
    text: 'I had the opportunity to work closely with Vance and cannot recommend him enough! Vance is thoughtful, intentional, and smart. He is always willing to learn something new and is pragmatic in his approach to software. His perspective and input was pivotal on getting a large project over the line, and he has the ability to stay level and consistent through the challenging or tense times. Both personally and professionally, Vance is outstanding individual and engineer.',
    name: 'Natalie Daniels',
    title: 'Data Scientist',
  },
  {
    text: "Time and again, Vance has demonstrated why it's easy to have confidence that he will take on and successfully meet any challenge. It has been a joy to see him rise to these occasions. I have enjoyed getting to know Vance and observing how he approaches technical and team challenges, and I've been enriched by his thoughtfulness and caring. Vance's genuine concern for the well-being of his colleagues has significantly enhanced our team's collaboration. I would eagerly welcome the opportunity to work alongside Vance in the future.",
    name: 'Jeff Calendar',
    title: 'Project Manager',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const startRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 10000)
  }

  useEffect(() => {
    startRotation()
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current)
    setCurrent(index)
    startRotation()
  }

  return (
    <section id="testimonials" className="section">
      <div className="section-content">
        <div
          className="testimonial-carousel"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={startRotation}
        >
          <div className="testimonial-container">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial${i === current ? ' active' : ''}`}>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <p className="author-name">{t.name}</p>
                  <p className="author-title">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot${i === current ? ' active' : ''}`}
                data-index={i}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
