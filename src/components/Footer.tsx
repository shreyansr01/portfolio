import type { FC } from "react";

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2H21l-6.9 7.897L22.2 22h-6.828l-5.338-6.894L3.99 22H1.23l7.39-8.47L1 2h6.99l4.88 6.302L18.244 2Zm-1.2 18h1.527L6.164 3.44H4.522L17.044 20Z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 0h-18c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-18c0-1.657-1.343-3-3-3zm-13 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const FOOTER_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/shreyansr01",
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/shreyansardar",
    icon: LinkedInIcon,
  },
  {
    name: "Email",
    href: "mailto:shreyansardar427@gmail.com",
    icon: MailIcon,
  },
  {
    name: "Twitter",
    href: "https://x.com/shreyansr01",
    icon: XIcon,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Shreyan_555/",
    icon: LeetCodeIcon,
  },
];

const Footer: FC = () => {
  return (
    <footer id="contact" className="relative z-10 pt-10 sm:pt-14 pb-0 bg-transparent overflow-hidden border-t border-black/[0.06] dark:border-white/[0.05]">
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-warm-100 mb-2.5 sm:mb-3 tracking-tight text-center leading-tight">
          Let&apos;s build something dependable<span className="text-emerald-500">.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 w-full max-w-3xl mt-1">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-1.75 px-3 py-1.5 sm:px-3.5 sm:py-1.25 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-warm-300 hover:bg-warm-100 dark:hover:bg-white hover:text-warm-950 dark:hover:text-black hover:border-warm-100 dark:hover:border-white transition-all duration-200 text-[11.5px] sm:text-xs font-mono font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            >
              <link.icon className="w-3.5 h-3.5 shrink-0 text-warm-500 group-hover:text-warm-950 dark:group-hover:text-black transition-colors duration-200" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Handwritten Signature */}
        <div className="flex flex-col items-center justify-center gap-1.5 mt-7 sm:mt-8 select-none">
          <span className="font-signature text-2xl sm:text-3xl text-warm-200 tracking-wide hover:text-warm-100 transition-colors duration-200">
            Shreyan Sardar
          </span>
          <div className="flex items-center gap-2.5 text-[10px] font-mono text-warm-600 tracking-wider">
            <span className="uppercase">{new Date().getFullYear()}</span>
            <span className="text-warm-700/60">•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1 text-warm-500 hover:text-warm-200 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 text-warm-400 group-hover:text-warm-100">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Calcutta Riverfront Panorama */}
      <div className="relative w-full mt-0.5 sm:mt-3 overflow-hidden select-none pointer-events-none">
        {/* Soft gradient fade so the sky dissolves seamlessly into background */}
        <div className="absolute inset-x-0 top-0 h-8 sm:h-16 bg-gradient-to-b from-background to-transparent z-10" />

        {/* Light Mode */}
        <img
          src="/calcutta-etching.png"
          alt="Vintage Calcutta Riverfront Etching"
          loading="lazy"
          decoding="async"
          className="w-full h-32 sm:h-56 md:h-64 object-cover object-bottom mix-blend-multiply opacity-90 dark:hidden"
        />

        {/* Dark Mode */}
        <img
          src="/calcutta-etching-dark.png"
          alt="Vintage Calcutta Riverfront Etching (Night)"
          loading="lazy"
          decoding="async"
          className="w-full h-32 sm:h-56 md:h-64 object-cover object-bottom hidden dark:block mix-blend-screen opacity-90"
        />
      </div>
    </footer>
  );
};

export default Footer;