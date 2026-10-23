import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import AmbientBackdrop from './components/AmbientBackdrop'
import { site } from './config/site'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-void text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AmbientBackdrop />

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        {site.sections.certifications && <Certifications />}
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
