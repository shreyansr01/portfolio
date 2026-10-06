import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-warm-100 mb-4">404</h1>
        <p className="text-base sm:text-lg text-warm-400 mb-6 font-light leading-relaxed">
          This page does not exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-full border-1.75 border-black/20 dark:border-white/30 text-warm-100 text-sm font-medium hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
        >
          Back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
