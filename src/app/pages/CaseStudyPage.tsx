import { Link, useParams } from "react-router";
import { ArrowUpRight } from "lucide-react";
import {
  Heading,
  Kicker,
  Rule,
  Caption,
  PageNumber,
  Tag,
  MagneticButton,
  FadeIn,
  RevealText,
} from "../components/primitives";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { getAdjacentProject, getProjectBySlug, PROJECTS } from "../data/projects";
import { NAV_H } from "../lib/layout";

function NotFound() {
  return (
    <main id="main" style={{ paddingTop: NAV_H }} className="mx-auto max-w-[1400px] px-6 py-32 text-center md:px-10">
      <Heading as="h1" className="mb-4 text-[length:var(--text-h1)] text-foreground">
        Project not found
      </Heading>
      <Link to="/#work" className="font-mono text-[13px] uppercase tracking-widest text-accent">
        ← Back to the index
      </Link>
    </main>
  );
}

export function CaseStudyPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const next = getAdjacentProject(slug);

  return (
    <main id="main" style={{ paddingTop: NAV_H }}>
      {/* Title page */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <FadeIn>
          <div className="mb-6 flex items-center justify-between">
            <Kicker>
              {project.category} · {project.year}
            </Kicker>
            <PageNumber current={project.index} total={PROJECTS.length} />
          </div>
        </FadeIn>

        <RevealText>
          <Heading as="h1" className="max-w-4xl text-[length:var(--text-display)] text-foreground">
            {project.name}
          </Heading>
        </RevealText>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-relaxed text-foreground/80">
            {project.tagline}
          </p>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
            {project.role}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12">
          <ImagePlaceholder index={project.index} alt={project.images[0]?.alt ?? project.name} ratio="16/9" />
          {project.images[0]?.caption && <Caption className="mt-3">{project.images[0].caption}</Caption>}
        </FadeIn>
      </section>

      <Rule />

      {/* Challenge / outcome facts */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <FadeIn>
            <Kicker className="mb-4 block">Challenge</Kicker>
            <p className="mb-10 text-[length:var(--text-body)] leading-relaxed text-foreground/85">
              {project.challenge}
            </p>
            <Kicker className="mb-4 block">Approach</Kicker>
            <p className="text-[length:var(--text-body)] leading-relaxed text-foreground/85">
              {project.approach}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Kicker className="mb-4 block">At a glance</Kicker>
            <dl>
              {project.outcomeFacts.map((f, i) => (
                <div key={f.label}>
                  {i > 0 && <Rule />}
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="text-right text-[0.95rem] font-medium text-foreground">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* Additional imagery */}
      {project.images.length > 1 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {project.images.slice(1).map((img) => (
              <FadeIn key={img.alt}>
                <ImagePlaceholder index={project.index} alt={img.alt} ratio="4/3" />
                {img.caption && <Caption className="mt-3">{img.caption}</Caption>}
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Tech stack */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <FadeIn>
          <Kicker className="mb-4 block">Stack</Kicker>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </FadeIn>
      </section>

      <Rule />

      {/* Next-project handoff */}
      <Link
        to={`/work/${next.slug}`}
        className="group block border-b border-[var(--rule)] px-6 py-16 transition-colors hover:bg-[var(--secondary)] md:px-10 md:py-24"
      >
        <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6">
          <div>
            <Kicker className="mb-4 block">Next project</Kicker>
            <Heading
              as="p"
              className="text-[length:var(--text-h1)] text-foreground transition-colors group-hover:text-accent"
            >
              {next.name}
            </Heading>
          </div>
          <ArrowUpRight className="h-8 w-8 shrink-0 text-foreground/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </Link>

      <div className="px-6 py-16 text-center md:px-10">
        <MagneticButton
          href="/#contact"
          className="rounded-full bg-accent px-8 py-3.5 font-mono text-[13px] uppercase tracking-widest text-accent-foreground transition-colors hover:bg-[var(--accent-hover)]"
        >
          Start a project →
        </MagneticButton>
      </div>
    </main>
  );
}
