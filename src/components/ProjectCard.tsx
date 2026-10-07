import { memo, type FC, useState, useEffect, useRef } from "react";
import { ArrowUpRight, Github, BookOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectTechDetails = {
  scope?: string;
  architecture?: string;
  highlights?: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageVariant?: "landscape" | "portrait";
  techDetails?: ProjectTechDetails;
};

interface ProjectCardProps {
  project: Project;
  domId?: string;
}

type ProjectAction = {
  key: string;
  href: string;
  label: string;
  tooltip: string;
  icon: typeof ArrowUpRight;
  iconClassName: string;
};

type ProjectCategoryTone = {
  titleHover: string;
  cardHover: string;
  actionButton: string;
};

const UNIFIED_PROJECT_TONE: ProjectCategoryTone = {
  titleHover: "group-hover:text-warm-50",
  cardHover: "hover:border-black/20 dark:hover:border-white/15 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors duration-200",
  actionButton: "",
};

const CATEGORY_TONES: Record<string, ProjectCategoryTone> = {
  "Personal Tool": UNIFIED_PROJECT_TONE,
  "Client Project": UNIFIED_PROJECT_TONE,
  "Showcase Project": UNIFIED_PROJECT_TONE,
  "Personal Project": UNIFIED_PROJECT_TONE,
  "Real-World Project": UNIFIED_PROJECT_TONE,
};

const DEFAULT_TONE: ProjectCategoryTone = UNIFIED_PROJECT_TONE;

const actionButtonClassName =
  "relative inline-flex h-6 w-6 sm:h-6.5 sm:w-6.5 shrink-0 items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] text-warm-100 hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black hover:border-warm-100 dark:hover:border-white transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] active:scale-95";

export const ProjectCard: FC<ProjectCardProps> = memo(({ project, domId }) => {
  const tone = CATEGORY_TONES[project.category] ?? DEFAULT_TONE;

  const [showInfo, setShowInfo] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardDomId = domId ?? `project-${project.title.toLowerCase().replace(/'s/g, "s").replace(/[^a-z0-9]+/g, "-")}`;

  useEffect(() => {
    const triggerFocus = () => {
      setIsFocused(true);
      if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = setTimeout(() => {
        setIsFocused(false);
      }, 2200);
    };

    const handleFocusEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === cardDomId) {
        triggerFocus();
      }
    };

    const checkHash = () => {
      if (window.location.hash === `#${cardDomId}`) {
        triggerFocus();
      }
    };

    window.addEventListener("focus-project", handleFocusEvent);
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("focus-project", handleFocusEvent);
      window.removeEventListener("hashchange", checkHash);
      if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
    };
  }, [cardDomId]);

  const actions: ProjectAction[] = [
    project.liveUrl
      ? {
        key: "live",
        href: project.liveUrl,
        label: `Open live site for ${project.title}`,
        tooltip: "Live preview",
        icon: ArrowUpRight,
        iconClassName: "transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
      }
      : null,
    project.githubUrl
      ? {
        key: "github",
        href: project.githubUrl,
        label: `View source code for ${project.title} on GitHub`,
        tooltip: "GitHub repo",
        icon: Github,
        iconClassName: "transition-transform group-hover/btn:scale-110",
      }
      : null,
  ].filter(Boolean) as ProjectAction[];

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-warm-900 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-lg transition-all duration-200 ease-out",
        isFocused
          ? "border-black/25 dark:border-white/30 shadow-md dark:shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]"
          : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 hover:shadow-md dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.09)]"
      )}
    >
      {/* Tech Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute -inset-[1px] z-30 flex flex-col bg-warm-900 border border-black/15 dark:border-white/15 p-4 text-warm-100 info-overlay rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Header & Close Button (Sticky at Top - Connected Edge to Edge) */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2.5 -mx-4 px-4 shrink-0">
              <span className="text-[15px] sm:text-[16px] font-bold text-warm-100 tracking-tight truncate">
                {project.title}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(false);
                }}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-black/15 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.04] text-warm-300 hover:border-warm-100 dark:hover:border-white hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black transition-all duration-150 active:scale-95"
                aria-label="Close information overlay"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={11} strokeWidth={2} className="shrink-0" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-start pt-2.5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Why I Built This (Title Case, not all-caps) */}
              {project.techDetails?.scope && (
                <div className="flex flex-col justify-start">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-semibold text-emerald-400 mb-1.5">
                    <BookOpen size={12} className="text-emerald-400 shrink-0" />
                    <span>Why I Built This</span>
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] text-warm-200 font-normal leading-[1.5]">
                    {project.techDetails.scope}
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Wrapper */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b border-black/[0.08] dark:border-white/[0.08] bg-warm-800">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full transition-transform duration-400 ease-out",
            isFocused ? "scale-[1.02]" : "group-hover:scale-[1.02]",
            "object-cover object-top"
          )}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3.5 sm:p-4.5 pb-4 sm:pb-4.5">
        <h3
          className={cn(
            "text-[17.5px] sm:text-[19px] font-bold tracking-tight transition-colors duration-250 leading-snug mb-1",
            isFocused ? "text-warm-100" : cn("text-warm-100", tone.titleHover)
          )}
        >
          {project.title}
        </h3>
        <p className="mb-3.5 flex-grow text-[13.5px] sm:text-[14px] font-normal leading-[1.5] text-warm-300 min-h-[2.6rem]">
          {project.description}
        </p>
        <div className="mt-auto pt-1">
          <div className="flex items-center justify-between gap-3">
            {/* Left side: Why I Built This Action Button with Tooltip */}
            <div className="relative group/tooltip inline-flex items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className={cn(actionButtonClassName, tone.actionButton, "group/btn flex items-center justify-center")}
                aria-label={`Why I built ${project.title}`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <BookOpen className="relative z-10 h-3 w-3 text-warm-200 group-hover/btn:text-warm-950 dark:group-hover/btn:text-black transition-colors duration-200" strokeWidth={1.85} />
              </button>

              {/* Tooltip */}
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 mb-2 -translate-y-1 opacity-0 transition-all duration-150 ease-out group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 z-20"
              >
                <div className="whitespace-nowrap rounded-md border border-black/10 dark:border-white/10 bg-warm-800 px-2 py-0.75 text-[11px] font-sans font-medium text-warm-200 shadow-xl">
                  Why I built this
                </div>
              </div>
            </div>

            {/* Right side: Action Links with Tooltips */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {actions.map(({ key, href, label, tooltip, icon: Icon, iconClassName }) => (
                <div key={key} className="relative group/tooltip inline-flex items-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(actionButtonClassName, tone.actionButton, "group/btn flex items-center justify-center")}
                    aria-label={label}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <Icon
                      className={cn(
                        "relative z-10 text-warm-200 group-hover/btn:text-warm-950 dark:group-hover/btn:text-black transition-colors duration-200",
                        key === "github" ? "h-[13px] w-[13px] translate-x-[0.5px]" : "h-3.5 w-3.5",
                        iconClassName
                      )}
                      strokeWidth={2}
                    />
                  </a>

                  {/* Tooltip */}
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full right-0 mb-2 -translate-y-1 opacity-0 transition-all duration-150 ease-out group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 z-20"
                  >
                    <div className="whitespace-nowrap rounded-md border border-black/10 dark:border-white/10 bg-warm-800 px-2 py-0.75 text-[11px] font-sans font-medium text-warm-200 shadow-xl">
                      {tooltip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

