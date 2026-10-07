import { useRef, useState, useEffect, memo, type FC } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { getKolkataTime, getRelativeTimeOffset } from "@/lib/time";

const AboutSection: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
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

  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            <span className="font-mono text-warm-600 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">01 //</span>About
          </h2>
        </motion.div>

        {/* Content Layout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl sm:max-w-2xl mx-auto"
        >
          {/* Metadata Row */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono font-normal mb-3 sm:mb-3.5 select-none">
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
          </div>

          {/* Bio Paragraphs */}
          <div className="text-[14.5px] sm:text-[15px] md:text-[15.5px] leading-[1.6] sm:leading-[1.55] space-y-2.5 sm:space-y-3 font-normal text-left">
            <p className="text-warm-200">
              I'm a software engineer focused on backend systems. I build with Python (FastAPI) and Java (Spring Boot), using AI tools to ship products end-to-end—8 projects built and 6 deployed.
            </p>
            <p className="text-warm-400">
              What drives me is understanding systems from the ground up and breaking complex problems down to first principles.
            </p>
            <p className="text-warm-400">
              Outside of engineering, I spend my time reading, training, and exploring.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
