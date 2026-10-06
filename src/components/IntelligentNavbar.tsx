import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const NAV_LINKS = [
  { label: "About", to: "#about" },
  { label: "Projects", to: "#projects" },
  { label: "Skills", to: "#skills" },
  { label: "Journey", to: "#journey" },
];

export default function IntelligentNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Check if we've reached the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;

      if (isAtBottom) {
        setActive(NAV_LINKS[NAV_LINKS.length - 1].label);
        return;
      }

      let found = "";
      for (const section of NAV_LINKS) {
        const elem = document.getElementById(section.to.slice(1));
        if (elem && window.scrollY + 180 >= elem.offsetTop) {
          found = section.label;
        }
      }

      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openMobile) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setOpenMobile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMobile]);

  const handleNavClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setOpenMobile(false);
    const targetId = to.slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      setTimeout(() => {
        const targetPosition = window.scrollY + target.getBoundingClientRect().top - 80;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <>
      <div className="fixed z-50 top-4 left-0 right-0 flex justify-center w-full pointer-events-none px-4">
        {/* Desktop: always-visible slim pill */}
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={clsx(
            "hidden md:flex items-center gap-1.5 px-2.5 py-1.5 pointer-events-auto rounded-full transition-all duration-500",
            "backdrop-blur-3xl border border-black/10 dark:border-white/10 backdrop-saturate-[180%]",
            scrolled
              ? "bg-[#F7F5F0]/85 dark:bg-[#151413]/80 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "bg-[#F7F5F0]/70 dark:bg-[#151413]/60 shadow-[0_4px_20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.04)]"
          )}
          role="navigation"
        >
          {NAV_LINKS.map((nav) => (
            <a
              key={nav.label}
              href={nav.to}
              onClick={(e) => handleNavClick(e, nav.to)}
              className={clsx(
                "px-3 py-1.5 text-xs font-mono tracking-normal font-medium rounded-full transition-all duration-200",
                active === nav.label
                  ? "text-warm-100 font-semibold"
                  : "text-warm-400 hover:text-warm-100",
                "hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
              )}
            >
              <span className="relative flex flex-col items-center justify-center">
                {nav.label}
                {active === nav.label && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 mx-auto w-3/5 h-[1.5px] bg-emerald-400 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}
              </span>
            </a>
          ))}

          <div className="w-[1px] h-3.5 bg-black/10 dark:bg-white/10 mx-0.5 shrink-0" />

          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full text-warm-400 hover:text-warm-100 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <Moon size={17} className="transition-transform duration-200 hover:-rotate-12" />
            ) : (
              <Sun size={17} className="transition-transform duration-200 hover:rotate-45" />
            )}
          </button>
        </motion.nav>

        {/* Mobile: Expanding pill */}
        <nav
          ref={mobileNavRef}
          className={clsx(
            "flex md:hidden flex-col w-full max-w-[240px] pointer-events-auto rounded-[26px] overflow-hidden",
            "backdrop-blur-3xl border border-black/10 dark:border-white/10 backdrop-saturate-[180%] transition-colors duration-500",
            scrolled
              ? "bg-[#F7F5F0]/85 dark:bg-[#151413]/80 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "bg-[#F7F5F0]/70 dark:bg-[#151413]/60 shadow-[0_4px_20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.04)]"
          )}
        >
          <button
            type="button"
            onClick={() => setOpenMobile((v) => !v)}
            className="flex items-center justify-between w-full px-3.5 py-2 text-xs font-mono font-medium text-warm-200 hover:text-warm-100 transition-colors focus:outline-none"
            aria-label={openMobile ? "Close menu" : "Open menu"}
          >
            <span>{openMobile ? "Close" : "Menu"}</span>
            <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center">
              <div className="relative w-3.5 h-3 flex items-center justify-center">
                <motion.span
                  animate={openMobile ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-[1.5px] bg-warm-100 rounded-full origin-center"
                />
                <motion.span
                  animate={openMobile ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute w-full h-[1.5px] bg-warm-100 rounded-full"
                />
                <motion.span
                  animate={openMobile ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-[1.5px] bg-warm-100 rounded-full origin-center"
                />
              </div>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openMobile && (
              <motion.div
                key="mobile-nav-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.2, ease: "easeOut" },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.15, ease: "easeIn" },
                  },
                }}
                className="overflow-hidden w-full"
              >
                <motion.div
                  initial={{ y: -12, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.02 },
                  }}
                  exit={{
                    y: -10,
                    opacity: 0,
                    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="w-full border-t border-black/[0.08] dark:border-white/[0.08] px-2 pt-1.5 pb-1.5"
                >
                  <ul className="flex flex-col gap-0.5">
                    {NAV_LINKS.map((nav, i) => {
                      const isActive = active === nav.label;
                      const indexStr = String(i + 1).padStart(2, "0");

                      return (
                        <li key={nav.label}>
                          <a
                            href={nav.to}
                            onClick={(e) => handleNavClick(e, nav.to)}
                            className={clsx(
                              "flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono tracking-normal font-medium transition-colors duration-150 active:scale-[0.98]",
                              isActive
                                ? "text-warm-100 bg-black/5 dark:bg-white/10 font-semibold"
                                : "text-warm-400 hover:text-warm-100 hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                          >
                            <span>{nav.label}</span>
                            <span
                              className={clsx(
                                "text-[11px] font-mono transition-colors duration-150",
                                isActive
                                  ? "text-warm-100 font-semibold"
                                  : "text-warm-600/70"
                              )}
                            >
                              {indexStr}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="border-t border-black/[0.08] dark:border-white/[0.08] my-1" />

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-warm-400 hover:text-warm-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:scale-[0.98]"
                    aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                  >
                    <span>Theme</span>
                    <span className="flex items-center gap-1.5 text-warm-300 dark:text-warm-200">
                      {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
                      <span className="text-[11px] font-mono">{theme === "light" ? "Dark" : "Light"}</span>
                    </span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </>
  );
}
