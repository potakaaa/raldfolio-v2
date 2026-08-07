import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react"
import { Spotlight } from "@workspace/ui/components/ui/spotlight"
import { DitherShader } from "@workspace/ui/components/ui/dither-shader"
import { heroStats, profile, socials } from "@/data/site"

const socialIcons = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  mail: IconMail,
} as const

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh w-full items-center overflow-hidden"
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-16 sm:px-10 sm:pt-40 sm:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div className="mx-auto aspect-square w-full max-w-[240px] shrink-0 overflow-hidden border border-border sm:max-w-[280px] md:mx-0">
            <DitherShader
              src={profile.photo.src}
              className="h-full w-full"
              ditherMode="bayer"
              colorMode="grayscale"
              gridSize={1}
              brightness={0.16}
              contrast={1.1}
              threshold={0.2}
              objectFit="cover"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="mb-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {profile.role}
            </p>
            <h1 className="font-heading text-5xl leading-none font-medium tracking-tight text-balance text-foreground sm:text-6xl md:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0 mx-auto">
              {profile.intro}
            </p>

            <div className="mt-8 flex items-center justify-center gap-5 md:justify-start">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon size={18} stroke={1.5} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 divide-x divide-y divide-border border-t border-border md:mt-24 md:grid-cols-4 md:divide-y-0">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 px-6 py-6 sm:px-8">
              <span className="font-heading text-3xl font-medium text-foreground sm:text-4xl">
                {stat.value}
              </span>
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="border-b border-border" />
      </div>
    </section>
  )
}
