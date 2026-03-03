import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ContractFlow } from "@/components/contract-flow"
import { ComparisonToggle } from "@/components/comparison-toggle"
import { QuizMode } from "@/components/quiz-mode"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div className="mx-auto max-w-7xl">
        <div className="mx-4 h-px bg-border/30 lg:mx-8" />
      </div>
      <ContractFlow />
      <div className="mx-auto max-w-7xl">
        <div className="mx-4 h-px bg-border/30 lg:mx-8" />
      </div>
      <ComparisonToggle />
      <div className="mx-auto max-w-7xl">
        <div className="mx-4 h-px bg-border/30 lg:mx-8" />
      </div>
      <QuizMode />
      <Footer />
    </main>
  )
}
