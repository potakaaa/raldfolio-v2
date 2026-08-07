import { StickyScroll } from "@workspace/ui/components/ui/sticky-scroll-reveal"
import { GridBackground } from "@workspace/ui/components/ui/grid-background"
import { experience } from "@/data/experience"
import { technologyGroups } from "@/data/tech-stack"

export function ExperienceSection() {
  const content = experience.map((entry) => ({
    title: (
      <>
        <div>{entry.role}</div>
        <div className="mt-1 text-sm font-normal text-muted-foreground">
          {entry.organization}
        </div>
      </>
    ),
    description: entry.period,
    content: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        {entry.description}
      </p>
    ),
  }))

  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32"
    >
      <GridBackground />

      <div className="mb-10 flex items-baseline justify-between border-b border-border pb-6">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          03 — experience
        </p>
      </div>

      <div className="hidden lg:block">
        <StickyScroll content={content} />
      </div>

      <div className="flex flex-col divide-y divide-border border-t border-border lg:hidden">
        {experience.map((entry) => (
          <div key={entry.role + entry.organization} className="py-6">
            <h3 className="font-heading text-lg font-medium text-foreground">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{entry.organization}</p>
            <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
              {entry.period}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-10 sm:mt-20">
        <p className="mb-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Stack
        </p>
        <div className="flex flex-col gap-6">
          {technologyGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-3 text-[11px] tracking-wide text-muted-foreground uppercase">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
                  >
                    <Icon size={14} stroke={1.5} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
