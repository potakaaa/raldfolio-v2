import { useEffect, useState } from "react"

const GITHUB_USERNAME = "potakaaa"

type Contribution = { date: string; count: number; level: number }
type ContributionsResponse = {
  total: Record<string, number>
  contributions: Contribution[]
}

const LEVEL_SIZE = [3, 4.5, 6, 8, 10]
const LEVEL_OPACITY = [0.12, 0.35, 0.55, 0.8, 1]

function buildWeeks(contributions: Contribution[]): (Contribution | null)[][] {
  if (contributions.length === 0) return []
  const firstDate = new Date(`${contributions[0].date}T00:00:00`)
  const startPad = firstDate.getDay()
  const cells: (Contribution | null)[] = [
    ...(Array(startPad).fill(null) as null[]),
    ...contributions,
  ]
  const weeks: (Contribution | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

export function GithubSection() {
  const [data, setData] = useState<{ total: number; contributions: Contribution[] } | null>(
    null,
  )
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => res.json())
      .then((json: ContributionsResponse) => {
        if (cancelled || !json?.contributions) return
        setData({
          total: json.total?.lastYear ?? 0,
          contributions: json.contributions,
        })
      })
      .catch(() => {
        if (!cancelled) setErrored(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const weeks = data ? buildWeeks(data.contributions) : []

  return (
    <section id="github" className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="mb-10 flex items-baseline justify-between border-b border-border pb-6">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">05 — github</p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          @{GITHUB_USERNAME} ↗
        </a>
      </div>

      {errored ? (
        <p className="text-sm text-muted-foreground">Couldn&apos;t load GitHub contributions.</p>
      ) : !data ? (
        <div className="h-[92px] animate-pulse rounded bg-card/40" />
      ) : (
        <>
          <div className="overflow-x-auto pb-2">
            <div className="grid w-full min-w-[48rem] grid-flow-col auto-cols-fr gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col items-center gap-[3px]">
                  {week.map((day, di) => (
                    <div key={di} className="flex h-[11px] w-[11px] items-center justify-center">
                      {day && (
                        <span
                          className="rounded-full bg-foreground"
                          style={{
                            width: LEVEL_SIZE[day.level],
                            height: LEVEL_SIZE[day.level],
                            opacity: LEVEL_OPACITY[day.level],
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs tracking-wide text-muted-foreground uppercase">
            {data.total.toLocaleString()} contributions in the last year
          </p>
        </>
      )}
    </section>
  )
}
