import Footer from 'src/components/ui/Footer'
import FAQSection from 'src/components/ui/Landing/FAQSection'
import HeroSection from 'src/components/ui/Landing/HeroSection'
import AboutSection from 'src/components/ui/Landing/AboutSection'
import ContactSection from 'src/components/ui/Landing/ContactSection'

const LandingPage = () => {
  return (
    <section>
      {/* Hero */}
      <HeroSection />

      {/* About MX Chat */}
      <AboutSection />

      {/* FAQ */}
      <FAQSection />

      {/* Contact us */}
      <ContactSection />

      <Footer />
    </section>
  )
}

export default LandingPage
