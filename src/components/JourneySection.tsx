import { memo, useRef, useState, useEffect, type FC } from "react";
import { motion } from "framer-motion";
import { timeline } from "@/data/experience";
import { cn } from "@/lib/utils";

const JourneySection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isPresentFocused, setIsPresentFocused] = useState(false);
  const presentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateLineHeight = () => {
      if (timelineRef.current && lastNodeRef.current) {
        const containerRect = timelineRef.current.getBoundingClientRect();
        const lastNodeRect = lastNodeRef.current.getBoundingClientRect();
        const lastNodeCenterY = lastNodeRect.top + lastNodeRect.height / 2;
        const totalHeight = lastNodeCenterY - containerRect.top - 10;
        if (totalHeight > 0) {
          setLineHeight(totalHeight);
        }
      }
    };

    updateLineHeight();
    window.addEventListener("resize", updateLineHeight);
    return () => window.removeEventListener("resize", updateLineHeight);
  }, []);

  useEffect(() => {
    const triggerPresentFocus = () => {
      setIsPresentFocused(true);
      if (presentTimeoutRef.current) clearTimeout(presentTimeoutRef.current);
      presentTimeoutRef.current = setTimeout(() => {
        setIsPresentFocused(false);
      }, 2400);
    };

    const handleFocusEvent = () => {
      triggerPresentFocus();
    };

    const checkHash = () => {
      if (window.location.hash === "#journey") {
        triggerPresentFocus();
      }
    };

    window.addEventListener("focus-journey-present", handleFocusEvent);
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("focus-journey-present", handleFocusEvent);
      window.removeEventListener("hashchange", checkHash);
      if (presentTimeoutRef.current) clearTimeout(presentTimeoutRef.current);
    };
  }, []);

  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20" id="journey">
      <div className="max-w-3xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-5 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            <span className="font-mono text-warm-600 text-lg sm:text-xl font-medium mr-2.5 select-none opacity-90">04 //</span>Journey
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-[19rem] sm:max-w-none mx-auto" ref={timelineRef}>
          {/* Static minimal vertical connecting line - subtle neutral wire */}
          <div
            style={lineHeight ? { height: `${lineHeight}px` } : undefined}
            className={cn(
              "absolute top-[10px] left-[16px] w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 pointer-events-none",
              !lineHeight && "bottom-[20px]"
            )}
          />

          {/* Timeline Items - reduced spacing between entries */}
          <div className="space-y-4 sm:space-y-5">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {/* Node: perfectly aligned with the center of the timeline date text (Y=10px) */}
                <div
                  ref={index === timeline.length - 1 ? lastNodeRef : undefined}
                  className="absolute left-[16px] top-[10px] z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none h-5 w-5"
                >
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                    {/* Crisp outer ring with opaque canvas background to cleanly cover the line */}
                    <div className="absolute inset-0 rounded-full border border-black/15 dark:border-white/15 bg-warm-950" />
                    {/* Quiet neutral inner core dot */}
                    <div className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black/30 dark:bg-white/30" />
                  </div>
                </div>

                {/* Content Block */}
                <div className="relative pl-8 sm:pl-10">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative"
                    onClick={(e) => {
                      const anchor = (e.target as HTMLElement).closest('a');
                      if (anchor) {
                        const href = anchor.getAttribute('href');
                        if (href && href.startsWith('#project-')) {
                          const targetId = href.slice(1);
                          window.dispatchEvent(new CustomEvent('focus-project', { detail: targetId }));
                        }
                      }
                    }}
                  >
                    {/* Timeframe - reduced spacing below, optically balanced font size */}
                    <div className="h-5 flex items-center mb-0.5 sm:mb-1">
                      <span
                        className={cn(
                          "font-mono font-medium tracking-wide text-[11.5px] sm:text-xs",
                          item.period.toLowerCase().includes("present")
                            ? "text-emerald-400"
                            : "text-emerald-400/90"
                        )}
                      >
                        {item.period.replace(" - ", " \u2014 ")}
                      </span>
                    </div>

                    {/* Entry Description */}
                    <p
                      className={cn(
                        "relative z-10 text-[14px] sm:text-[15px] leading-[1.5] font-normal transition-colors duration-700 ease-out",
                        index === 0 && isPresentFocused ? "text-warm-100" : "text-warm-300"
                      )}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(JourneySection);
