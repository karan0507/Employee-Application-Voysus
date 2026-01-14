import { Navigation } from "@/components/navigation"
import { HeroWithOrbital } from "@/components/hero-with-orbital"
import { PremiumServices } from "@/components/premium-services"
import { PlatformShowcase } from "@/components/platform-showcase"
import { PremiumMetrics } from "@/components/premium-metrics"
import { RedesignedContact } from "@/components/redesigned-contact"
import { Footer } from "@/components/footer"

/**
 * Landing Page - Professional Business Marketing Website
 * Hero with orbital design, redesigned contact section
 * Structure: Hero → Services → Platform → Metrics → Contact → Footer
 */

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroWithOrbital />
      <PremiumServices />
      <PlatformShowcase />
      <PremiumMetrics />
      <RedesignedContact />
      <Footer />
    </main>
  )
}
