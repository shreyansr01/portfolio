import { memo, type FC } from "react";
import { motion } from "framer-motion";
import { techCategories, type TechItem } from "@/data/experience";

const TechPill: FC<{ item: TechItem }> = ({ item }) => {
  return (
    <span className="group/pill inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-[12.5px] font-mono font-normal select-none border border-black/10 dark:border-white/10 bg-black/[0.025] dark:bg-white/[0.025] text-warm-300 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:text-warm-100 transition-all duration-150 cursor-default">
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      className="group relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] p-4 sm:p-5 flex flex-col items-center justify-start bg-warm-900/90 hover:border-black/20 dark:hover:border-white/20 transition-colors duration-200 h-full w-full max-w-[19rem] sm:max-w-none mx-auto overflow-hidden"
    >
      {/* Card Header */}
      <div className="relative flex items-center justify-center gap-1.5 w-full text-center">
        <h3 className="text-sm sm:text-base font-semibold tracking-tight text-warm-100 group-hover:text-warm-50 transition-colors duration-200">
          {category.label}
        </h3>

        {/* Compact, neutral Header Badge */}
        {category.badge && (
          <span className="inline-flex items-center justify-center text-[8px] sm:text-[8.5px] font-mono tracking-wider px-1.5 py-0.5 leading-none rounded-md border border-black/10 dark:border-white/10 bg-warm-800 text-warm-400 uppercase select-none">
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
