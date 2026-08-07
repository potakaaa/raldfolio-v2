import {
  IconApi,
  IconBrandAws,
  IconBrandDjango,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandFlutter,
  IconBrandGithub,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandSupabase,
  IconBrandTypescript,
  IconBrandVercel,
  IconDatabase,
  type Icon,
} from "@tabler/icons-react"

export type TechItem = {
  name: string
  icon: Icon
}

export type TechGroup = {
  label: string
  items: readonly TechItem[]
}

export const technologyGroups: readonly TechGroup[] = [
  {
    label: "Frontend & mobile",
    items: [
      { name: "React", icon: IconBrandReact },
      { name: "Next.js", icon: IconBrandNextjs },
      { name: "TypeScript", icon: IconBrandTypescript },
      { name: "React Native", icon: IconBrandReactNative },
      { name: "Flutter", icon: IconBrandFlutter },
    ],
  },
  {
    label: "Backend & data",
    items: [
      { name: "Django", icon: IconBrandDjango },
      { name: "FastAPI", icon: IconApi },
      { name: "Node.js", icon: IconBrandNodejs },
      { name: "Supabase", icon: IconBrandSupabase },
      { name: "PostgreSQL", icon: IconDatabase },
    ],
  },
  {
    label: "Infrastructure & design",
    items: [
      { name: "AWS", icon: IconBrandAws },
      { name: "Docker", icon: IconBrandDocker },
      { name: "Vercel", icon: IconBrandVercel },
      { name: "GitHub Actions", icon: IconBrandGithub },
      { name: "Figma", icon: IconBrandFigma },
    ],
  },
] as const
