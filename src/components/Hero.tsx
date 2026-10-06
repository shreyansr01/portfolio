import { useState, memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import PdfModal from "./PdfModal";

const Hero: FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToJourney = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("journey");
    if (target) {
      const navOffset = window.innerWidth < 640 ? 70 : 80;
      const targetPosition = window.scrollY + target.getBoundingClientRect().top - navOffset;
      window.scrollTo({ top: Math.max(0, targetPosition), behavior: "smooth" });
    }
    window.dispatchEvent(new CustomEvent("focus-journey-present"));
  };

  return (
    <div className="relative w-full min-h-[52vh] sm:min-h-[58vh] lg:min-h-[64vh] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto">
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
              className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[44px] font-bold tracking-tight text-warm-100 mb-2.5 sm:mb-3 leading-tight text-center"
            >
              Shreyan Sardar
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-[15px] sm:text-[15.5px] md:text-[16px] text-warm-300 font-normal mb-5 sm:mb-6 max-w-[28rem] sm:max-w-[32rem] leading-[1.6] text-center"
            >
              Building backend systems. Shipping end-to-end using AI agents. Studying{" "}
              <a
                href="#journey"
                onClick={scrollToJourney}
                className="text-warm-200 underline decoration-black/20 dark:decoration-white/20 hover:text-emerald-400 hover:decoration-emerald-400 dark:hover:decoration-emerald-400 underline-offset-4 transition-colors duration-200 font-normal"
              >
                computer science from first principles
              </a>
              .
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-row items-center justify-center gap-2.5"
            >
              <Button
                type="button"
                variant="outline"
                className="group w-[106px] rounded-full py-1 h-8 text-xs font-mono font-medium tracking-wide border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] text-warm-100 hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black hover:border-warm-100 dark:hover:border-white transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex items-center justify-center gap-1"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileText size={12} className="mr-1 text-warm-200 group-hover:text-warm-950 dark:group-hover:text-black transition-colors duration-200" />
                Resume
              </Button>
              <Button
                type="button"
                variant="outline"
                className="group w-[102px] rounded-full py-1 h-8 text-xs font-mono font-medium tracking-wide border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] text-warm-100 hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black hover:border-warm-100 dark:hover:border-white transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex items-center justify-center gap-1"
                onClick={scrollToContact}
              >
                <Mail size={12} className="mr-1 text-warm-200 group-hover:text-warm-950 dark:group-hover:text-black transition-colors duration-200" />
                Contact
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <PdfModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        title="Resume"
        pdfPath="/Shreyan_Sardar_Resume.pdf"
        downloadName="Shreyan_Sardar_Resume.pdf"
        downloadLabel="Download PDF"
        newTabZoom={73}
      />
    </div>
  );
};

export default memo(Hero);
