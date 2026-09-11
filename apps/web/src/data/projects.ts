export type Project = {
  id: string
  title: string
  description: string
  stack: readonly string[]
  image: string
  alt: string
  liveUrl?: string
  githubUrl?: string
  rotate: number
  top: string
  left: string
}

export const projects: readonly Project[] = [
  {
    id: "slice",
    title: "SLICE",
    description:
      "A mobile debt resolution app that helps people work down what they owe, one bite at a time.",
    stack: ["React Native", "TypeScript", "Node.js"],
    image: "/media/slice-mockup.webp",
    alt: "SLICE debt resolution app shown on two phones",
    rotate: -6,
    top: "0%",
    left: "4%",
  },
  {
    id: "veent-crm",
    title: "Veent CRM",
    description:
      "A sales outreach CRM that replaced a shared spreadsheet with a real pipeline.",
    stack: ["SvelteKit", "PostgreSQL", "Drizzle", "Tailwind CSS"],
    image: "/media/veent-crm-mockup.webp",
    alt: "Veent CRM pipeline displayed on a laptop",
    liveUrl: "https://veent-crm.vercel.app",
    rotate: 4,
    top: "6%",
    left: "26%",
  },
  {
    id: "platebook",
    title: "Platebook",
    description:
      "A social recipe platform built around discovery, sharing, and practical cooking support.",
    stack: ["Next.js", "Django", "PostgreSQL", "AWS"],
    image: "/media/platebook-mockup.webp",
    alt: "Platebook social recipe platform shown on a laptop",
    liveUrl: "https://platebook.vercel.app/",
    githubUrl: "https://github.com/potakaaa/platebook",
    rotate: -3,
    top: "2%",
    left: "48%",
  },
  {
    id: "jogaliga",
    title: "Jogaliga",
    description:
      "One mobile product for organizing the many moving parts behind a football match.",
    stack: ["Flutter", "Riverpod", "FastAPI", "PostgreSQL"],
    image: "/media/jogaliga-mockup.webp",
    alt: "Jogaliga player dashboard displayed on a phone",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.jogaliga.jogaliga_frontend",
    rotate: 7,
    top: "10%",
    left: "68%",
  },
  {
    id: "shortcut-showdown",
    title: "Shortcut Showdown",
    description:
      "A real-time battle game that turns keyboard fluency into competitive play.",
    stack: ["Next.js", "FastAPI", "Realtime", "Vercel"],
    image: "/media/shortcut-showdown.webp",
    alt: "Shortcut Showdown game lobby displayed on a laptop",
    liveUrl: "https://shortcut-showdown-shosho.vercel.app/",
    githubUrl: "https://github.com/pwedesi/shortcut-showdown",
    rotate: -8,
    top: "22%",
    left: "14%",
  },
  {
    id: "bamboost",
    title: "Bamboost",
    description:
      "A commerce platform designed to make sustainable bamboo products easier to discover and buy.",
    stack: ["Next.js", "Laravel", "Docker", "AWS"],
    image: "/media/bamboost-mockup.webp",
    alt: "Bamboost bamboo marketplace displayed on two phones",
    liveUrl: "https://bamboost.ph/",
    rotate: 5,
    top: "20%",
    left: "40%",
  },
  {
    id: "peptmate-app",
    title: "Peptmate App",
    description:
      "A calm, private iOS companion for tracking peptide routines, reconstitution maths, schedules, logs, and long-term insights.",
    stack: ["SwiftUI", "Supabase", "RevenueCat", "Swift"],
    image: "/media/peptmate-app.webp",
    alt: "Peptmate iOS app home and schedule screens in a landscape mockup",
    rotate: -4,
    top: "38%",
    left: "3%",
  },
  {
    id: "peptmate-website",
    title: "Peptmate Website",
    description:
      "An education-first marketing site that introduces Peptmate's tracking tools, calculators, and library in a calm, approachable way.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/media/peptmate-website.webp",
    alt: "Peptmate marketing website homepage",
    liveUrl: "https://peptmate.com",
    rotate: 3,
    top: "44%",
    left: "32%",
  },
  {
    id: "peptmate-hq",
    title: "Peptmate HQ",
    description:
      "An internal operations console for managing the app across users, analytics, automation, feedback, revenue, and outreach.",
    stack: ["Next.js", "TypeScript", "Supabase", "Prisma"],
    image: "/media/peptmate-hq.webp",
    alt: "Peptmate HQ internal operations dashboard mockup",
    rotate: -2,
    top: "38%",
    left: "62%",
  },
] as const
