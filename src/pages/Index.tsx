import { memo } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-warm-100">
      <div className="max-w-3xl mx-auto sm:border-x border-black/[0.08] dark:border-white/[0.08] min-h-screen">
        <main className="relative z-10 divide-y divide-black/[0.06] dark:divide-white/[0.05]">
          <div id="home">
            <Hero />
          </div>
          <AboutSection />
          <div id="projects">
            <ProjectsSection />
          </div>
          <SkillsSection />
          <JourneySection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default memo(Index);
