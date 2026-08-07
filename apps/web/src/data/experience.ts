export type ExperienceEntry = {
  role: string
  organization: string
  period: string
  description: string
}

export const experience: readonly ExperienceEntry[] = [
  {
    role: "Mobile Developer & Social Media Manager",
    organization: "Coach Marc LLC",
    period: "06/2026 — Current",
    description:
      "Led SLICE mobile development, affiliate backend operations, partner tooling, and sales experiences across secure account flows, referrals, localization, accessibility, and customer trust.",
  },
  {
    role: "Full Stack Developer, Intern",
    organization: "Veent Apps Inc.",
    period: "06/2026 — 07/2026",
    description:
      "Built mobile ordering and rewards workflows, CRM lead-pipeline tools, and an event-collection platform with sanitization, deduplication, enrichment, dashboards, and deployment tooling.",
  },
  {
    role: "Full Stack Developer",
    organization: "Apparara Digital",
    period: "05/2025 — 04/2026",
    description:
      "Developed JogaLiga's cross-platform frontend and backend services for match discovery, team management, PIX payments, offline caching, bookings, attendance, wallets, invoices, and real-time updates.",
  },
  {
    role: "Junior Frontend Developer",
    organization: "Victoria's Fundacion",
    period: "06/2025 — 07/2025",
    description:
      "Implemented frontend components that improved usability, consistency, accessibility, and cross-device experience.",
  },
  {
    role: "Junior Web Developer",
    organization: "Bamboost",
    period: "02/2025 — 06/2025",
    description:
      "Developed responsive Bamboost PH pages and integrated Laravel APIs for dynamic content and reliable interactions.",
  },
] as const
