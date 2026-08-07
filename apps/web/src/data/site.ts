export const profile = {
  name: "Rald Helbiro Jr.",
  role: "Developer × Creative",
  intro:
    "I create digital products for founders, teams, and brands who care about how their work is experienced.",
  photo: {
    src: "/media/portrait-square.webp",
    alt: "Portrait of Rald Helbiro Jr.",
  },
} as const

export const socials = [
  { label: "GitHub", href: "https://github.com/potakaaa", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rald-helbiro-jr-0a8b4b21a",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:helbirog@gmail.com", icon: "mail" },
] as const

export const heroStats = [
  { value: "8K+", label: "GitHub Contributions" },
  { value: "4+", label: "Years Experience" },
  { value: "3", label: "Hackathons" },
  { value: "10+", label: "Projects Shipped" },
] as const

export const navItems = [
  { name: "Work", link: "#work" },
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
] as const
