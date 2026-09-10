import { createFileRoute } from "@tanstack/react-router"
import { SiteNavbar } from "@/components/site-navbar"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { GithubSection } from "@/components/github-section"
import { ContactSection } from "@/components/contact-section"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <>
      <SiteNavbar />
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <GithubSection />
      <ContactSection />
    </>
  )
}
