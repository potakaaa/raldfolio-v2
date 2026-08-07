import { IconAward, IconSchool } from "@tabler/icons-react"
import { education, certifications } from "@/data/education"

export function EducationSection() {
  return (
    <section
      id="education"
      className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-6">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          04 — education
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="mb-6 flex items-center gap-2 text-[11px] tracking-wide text-muted-foreground uppercase">
            <IconSchool size={14} stroke={1.5} />
            Education
          </p>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {education.map((entry) => (
              <div key={entry.degree} className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-lg leading-none font-medium text-foreground">
                    {entry.degree}
                  </h3>
                  <span className="shrink-0 text-xs tracking-wide text-muted-foreground uppercase">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{entry.institution}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-6 flex items-center gap-2 text-[11px] tracking-wide text-muted-foreground uppercase">
            <IconAward size={14} stroke={1.5} />
            Certifications & recognition
          </p>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {certifications.map((entry) => (
              <div key={entry.title} className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm leading-none font-medium text-foreground">{entry.title}</h3>
                  <span className="shrink-0 text-xs tracking-wide text-muted-foreground uppercase">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{entry.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
