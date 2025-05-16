import { useEffect } from "react";

interface SplashScreenProps {
  onFinish?: () => void;
  durationMs?: number; // Durée de l'animation en ms (par défaut 1500)
}

/**
 * SplashScreen animé pour l'intro de l'application HRnet.
 * Affiche le logo centré avec un effet de fondu/zoom.
 * Appelle onFinish à la fin de l'animation.
 */
const SplashScreen = ({ onFinish, durationMs = 1500 }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [onFinish, durationMs]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-600 transition-colors duration-700"
      aria-label="Chargement de l'application">
      <div
        className="flex flex-col items-center"
        style={{
          animation: "splash-zoom-fade 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
          // Respecte prefers-reduced-motion
          animationPlayState:
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "paused"
              : "running",
        }}>
        <span className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-lg select-none">
          HRnet
        </span>
        <span className="mt-4 text-lg text-indigo-100 tracking-widest animate-pulse">
          Chargement…
        </span>
      </div>
      {/* Animation CSS keyframes */}
      <style>{`
        @keyframes splash-zoom-fade {
          0% { opacity: 0; transform: scale(0.8); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
