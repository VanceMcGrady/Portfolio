import Nav from './components/Nav'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <About />
        <Testimonials />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <footer>
          <p>&copy; 2023 Vance McGrady. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
