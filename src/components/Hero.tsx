import { useState, useEffect, memo, type FC } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { getKolkataTime, getRelativeTimeOffset } from "@/lib/time";

const Hero: FC = () => {
  const [timeInfo, setTimeInfo] = useState<{ time: string; offset: string } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTimeInfo({
        time: getKolkataTime(),
        offset: getRelativeTimeOffset(),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navOffset = window.innerWidth < 640 ? 70 : 80;
      const targetPosition = window.scrollY + target.getBoundingClientRect().top - navOffset;
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
    }
    if (id === "journey") {
      window.dispatchEvent(new CustomEvent("focus-journey-present"));
    }
  };

  return (
    <section id="about" className="relative w-full pt-28 pb-14 sm:pt-36 sm:pb-18 lg:pt-40 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div id="home" className="sr-only" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-xl mx-auto"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[44px] font-bold tracking-tight text-warm-100 mb-3 sm:mb-3.5 leading-tight"
          >
            Shreyan Sardar
          </motion.h1>

          {/* Metadata Row: Location & Live Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono font-normal mb-6 sm:mb-7 select-none"
          >
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 text-warm-300">
              <MapPin size={12} className="text-emerald-400 shrink-0" />
              <span className="sm:hidden">India</span>
              <span className="hidden sm:inline">Kolkata, India</span>
            </div>

            <span className="text-warm-700/60 dark:text-warm-600/40">•</span>

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <Clock size={12} className="text-emerald-400 shrink-0" />
              <span className="text-warm-300">
                {timeInfo ? (
                  <>
                    <span>{timeInfo.time}</span>{" "}
                    <span className="text-warm-500">
                      <span className="text-warm-600 dark:text-warm-600/80">//</span> {timeInfo.offset}
                    </span>
                  </>
                ) : null}
              </span>
            </div>
          </motion.div>

          {/* Bio & Core Narrative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-[14.5px] sm:text-[15.5px] md:text-[16px] text-warm-300 font-normal leading-[1.65] max-w-[32rem] space-y-3"
          >
            <p className="text-warm-200">
              Software engineer and AI agent manager, backed by my{" "}
              <a
                href="#skills"
                onClick={(e) => scrollToTarget(e, "skills")}
                className="text-warm-200 underline decoration-black/20 dark:decoration-white/20 hover:text-emerald-400 hover:decoration-emerald-400 dark:hover:decoration-emerald-400 underline-offset-4 transition-colors duration-200 font-normal"
              >
                backend foundation
              </a>
              . I direct agents to build and ship software end-to-end (8 apps built, 6 deployed).
            </p>
            <p className="text-warm-400">
              What drives me is understanding systems from the ground up, breaking problems down to{" "}
              <a
                href="#journey"
                onClick={(e) => scrollToTarget(e, "journey")}
                className="text-warm-200 underline decoration-black/20 dark:decoration-white/20 hover:text-emerald-400 hover:decoration-emerald-400 dark:hover:decoration-emerald-400 underline-offset-4 transition-colors duration-200 font-normal"
              >
                first principles
              </a>
              , and exploring beyond code.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
