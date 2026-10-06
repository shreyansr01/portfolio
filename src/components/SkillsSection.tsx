import { memo, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";
import { techCategories, type TechItem } from "@/data/experience";

const UNIFIED_SKILL_META = {
  shell: "bg-[#151413]/90",
  hoverBorder: "hover:border-white/20",
  titleTone: "text-warm-100 group-hover:text-white transition-colors duration-200",
};

const FOUNDATIONAL_SKILL_META = {
  ...UNIFIED_SKILL_META,
  shell: "bg-[#151413]/90 border-dashed border-white/15",
  hoverBorder: "hover:border-white/20",
};

const CATEGORY_META: Record<string, { shell: string; hoverBorder: string; titleTone: string }> = {
  "Backend": UNIFIED_SKILL_META,
  "Data & Infra": UNIFIED_SKILL_META,
  "Tools": UNIFIED_SKILL_META,
  "Foundations": FOUNDATIONAL_SKILL_META,
};

const TechPill: FC<{ item: TechItem }> = ({ item }) => {
  return (
    <span className="group/pill inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-[12.5px] font-mono font-normal select-none border border-white/10 bg-white/[0.025] text-warm-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-warm-100 transition-all duration-150 cursor-default">
      {item.icon && (
        <item.icon className="text-[13px] sm:text-[14px] text-warm-500 opacity-75 group-hover/pill:opacity-100 group-hover/pill:text-warm-200 transition-all duration-150 shrink-0" />
      )}
      {item.iconSrc && (
        <img
          src={item.iconSrc}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 opacity-75 group-hover/pill:opacity-100 group-hover/pill:brightness-125 transition-all duration-150 shrink-0"
        />
      )}
      <span>{item.name}</span>
    </span>
  );
};

interface TechCardProps {
  category: typeof techCategories[number];
  index: number;
}

const TechCard: FC<TechCardProps> = ({ category, index }) => {
  const meta = CATEGORY_META[category.label] ?? UNIFIED_SKILL_META;
  const [showTooltip, setShowTooltip] = useState(false);
  const isFoundations = category.label === "Foundations";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      className={`group relative rounded-2xl border border-white/[0.08] p-4 sm:p-5 flex flex-col items-center justify-start ${meta.shell} ${meta.hoverBorder} transition-colors duration-200 h-full w-full max-w-[19rem] sm:max-w-none mx-auto overflow-hidden`}
    >
      {/* Glassmorphic Overlay for Foundations (matching ProjectCard pattern) */}
      {isFoundations && (
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute -inset-[1px] z-30 flex flex-col bg-[#151413] border border-white/15 p-4 sm:p-4.5 text-white info-overlay rounded-2xl shadow-2xl overflow-hidden text-left"
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Overlay Header & Close Button (Connected Edge to Edge) */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 -mx-4 sm:-mx-4.5 px-4 sm:px-4.5 shrink-0">
                <span className="text-[13.5px] sm:text-[14px] font-bold text-warm-100 tracking-tight">
                  {category.label}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-warm-300 hover:border-white hover:bg-white hover:text-black transition-all duration-150 active:scale-95"
                  aria-label="Close information overlay"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <X size={11} strokeWidth={2} className="shrink-0" />
                </button>
              </div>

              {/* Overlay Content */}
              <div className="flex-1 flex flex-col justify-start pt-2.5 sm:pt-3 text-xs overflow-y-auto">
                <p className="text-[12px] sm:text-[12.5px] text-warm-300 font-normal leading-[1.55]">
                  High-level understanding of architectural trade-offs and use cases. No hands-on production experience yet—looking to build it within a product team.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Card Header */}
      <div className="relative flex items-center justify-center gap-1.5 w-full text-center">
        <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${meta.titleTone}`}>
          {category.label}
        </h3>

        {/* Info Icon Trigger for Foundations */}
        {isFoundations && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            aria-label="About Foundations skills"
            className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-warm-500 hover:text-warm-100 transition-colors duration-200 focus-visible:outline-none z-10 -translate-y-[1px]"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Info size={13} strokeWidth={1.75} />
          </button>
        )}

        {/* Compact, neutral Header Badge */}
        {category.badge && (
          <span className="inline-flex items-center justify-center text-[8px] sm:text-[8.5px] font-mono tracking-wider px-1.5 py-0.5 leading-none rounded-md border border-white/10 bg-[#1c1b1a] text-warm-400 uppercase select-none">
            <span className="translate-y-[0.5px]">{category.badge}</span>
          </span>
        )}
      </div>

      {/* Top-aligned pills container directly below heading */}
      <div className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 w-full mt-3 sm:mt-3.5">
        {category.items.map((item) => (
          <TechPill key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection: FC = () => {
  const backendCat = techCategories.find((c) => c.label === "Backend");
  const dataInfraCat = techCategories.find((c) => c.label === "Data & Infra");
  const toolsCat = techCategories.find((c) => c.label === "Tools");
  const foundationalCat = techCategories.find((c) => c.label === "Foundations");

  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-visible" id="skills">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            <span className="font-mono text-warm-600 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">03 //</span>Skills
          </h2>
        </motion.div>

        {/* Tech Stack 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {backendCat && <TechCard category={backendCat} index={0} />}
          {dataInfraCat && <TechCard category={dataInfraCat} index={1} />}
          {toolsCat && <TechCard category={toolsCat} index={2} />}
          {foundationalCat && <TechCard category={foundationalCat} index={3} />}
        </div>
      </div>
    </section>
  );
};

export default memo(SkillsSection);
