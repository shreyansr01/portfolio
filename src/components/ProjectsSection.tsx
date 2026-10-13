import { memo, type FC } from "react";
import projectsData from "@/data/projects.json";
import { ProjectCard, type Project } from "./ProjectCard";
import { motion } from "framer-motion";

const getProjectDomId = (title: string) => {
  return `project-${title.toLowerCase().replace(/'s/g, "s").replace(/[^a-z0-9]+/g, "-")}`;
};

export const ProjectsSection: FC = memo(() => {
  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Grid - show all projects */}
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-5 sm:gap-6">
          {(projectsData as Project[]).map((project, index) => {
            const domId = getProjectDomId(project.title);
            return (
              <motion.div
                key={project.id}
                id={domId}
                className="w-full max-w-[19rem] sm:max-w-none scroll-mt-24"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: (index % 2) * 0.05 }}
              >
                <ProjectCard project={project} domId={domId} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
