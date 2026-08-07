export type EducationEntry = {
  degree: string
  institution: string
  period: string
  description: string
}

export const education: readonly EducationEntry[] = [
  {
    degree: "Computer Science",
    institution: "USTP - CDO",
    period: "2018 — 2022",
    description:
      "Currently pursuing undergraduate studies with a strong focus on software development, algorithms, and web technologies.",
  },
  {
    degree: "TVL - Programming",
    institution: "PHINMA COC",
    period: "2018 — 2022",
    description:
      "Senior High graduate from the TVL – Programming strand, gaining hands-on experience in basic programming, web development, and application logic.",
  },
] as const

export type CertificationEntry = {
  title: string
  organization: string
  period: string
  description: string
}

export const certifications: readonly CertificationEntry[] = [
  {
    title: "Dean's Lister",
    organization: "Academic Recognition",
    period: "2023 – Present",
    description: "Consistently recognized for outstanding academic performance.",
  },
  {
    title: "Finalist, Innovate for Impact",
    organization: "AIT and UNEP",
    period: "2024",
    description: "Competed internationally to develop solutions addressing plastic pollution.",
  },
  {
    title: "Winner, GDG Solutions Challenge",
    organization: "Google Developer Groups",
    period: "2024",
    description: "Recognized for an innovative tech solution in a regional competition.",
  },
  {
    title: "Champion, Panagtigi 2-Minute Film",
    organization: "Panagtigi",
    period: "2023",
    description: "Won first place in a short filmmaking competition.",
  },
  {
    title: "Creatives Team Lead",
    organization: "Creative Team",
    period: "2024",
    description: "Led the creative team in planning and executing projects and events.",
  },
  {
    title: "People's Choice Award",
    organization: "Sinekasiya 6th Film Festival",
    period: "2024",
    description: "Recognized by the audience for the short film Limbong.",
  },
  {
    title: "Level 2, 11th TOPCIT Exam",
    organization: "TOPCIT",
    period: "2025",
    description: "Maintained Level 2 IT competency during second year undergraduate studies.",
  },
  {
    title: "International Conference Presentation",
    organization: "IRCIP",
    period: "2025",
    description: "Presented research on graph-based routing for urban jeepney systems.",
  },
  {
    title: "Participant, Sikaptala Hackathon",
    organization: "DLSU-D CICSSG",
    period: "2025",
    description: "Engaged in collaborative problem-solving and coding challenges.",
  },
] as const
