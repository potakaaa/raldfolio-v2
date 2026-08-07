import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@workspace/ui/components/ui/draggable-card"
import { LinkPreview } from "@workspace/ui/components/ui/link-preview"
import { projects, type Project } from "@/data/projects"

function ProjectCardContent({ project }: { project: Project }) {
  const link = project.liveUrl ?? project.githubUrl

  return (
    <>
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        {link ? (
          <LinkPreview
            url={link}
            isStatic
            imageSrc={project.image}
            width={240}
            height={135}
            className="font-heading text-lg font-medium text-foreground"
          >
            {project.title}
          </LinkPreview>
        ) : (
          <h3 className="font-heading text-lg font-medium text-foreground">
            {project.title}
          </h3>
        )}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export function ProjectsSection() {
  return (
    <section id="work" className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="mb-4 flex items-baseline justify-between border-b border-border pb-6">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          02 — projects
        </p>
        <a
          href="#"
          className="text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          All projects →
        </a>
      </div>

      <DraggableCardContainer className="relative hidden min-h-[620px] w-full items-center justify-center md:flex">
        {projects.map((project) => (
          <div
            key={project.id}
            className="absolute"
            style={{
              top: project.top,
              left: project.left,
              rotate: `${project.rotate}deg`,
            }}
          >
            <DraggableCardBody className="min-h-0 w-72 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-2xl">
              <ProjectCardContent project={project} />
            </DraggableCardBody>
          </div>
        ))}
      </DraggableCardContainer>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <ProjectCardContent project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
