import { PointerHighlight } from "@workspace/ui/components/ui/pointer-highlight"

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="mb-10 flex items-baseline justify-between border-b border-border pb-6">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          06 — contact
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
        <h2 className="font-heading max-w-2xl text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
          Let&apos;s{" "}
          <PointerHighlight
            containerClassName="inline-block"
            rectangleClassName="border-muted-foreground/40"
            pointerClassName="text-foreground"
          >
            <span className="relative z-10 px-1">collaborate</span>
          </PointerHighlight>{" "}
          on something great.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Have a project in mind, or just want to say hi? My inbox is always open.
        </p>
        <a
          href="mailto:helbirog@gmail.com"
          className="mt-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          helbirog@gmail.com
        </a>
      </div>
    </section>
  )
}
