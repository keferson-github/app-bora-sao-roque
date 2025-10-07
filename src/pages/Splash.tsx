import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-orange relative flex items-center justify-center overflow-hidden">
      {/* Background building silhouette (SVG vector for performance) */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <svg viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="#ffffff">
            <rect x="120" y="220" width="560" height="720" rx="20" opacity="0.12" />
            <rect x="160" y="260" width="480" height="560" rx="16" opacity="0.14" />
            <rect x="180" y="280" width="180" height="220" opacity="0.18" />
            <rect x="440" y="280" width="180" height="220" opacity="0.18" />
            <rect x="300" y="540" width="200" height="140" opacity="0.18" />
            <rect x="230" y="700" width="340" height="80" opacity="0.16" />
            <circle cx="400" cy="360" r="36" opacity="0.22" />
            <rect x="360" y="396" width="80" height="110" opacity="0.18" />
          </g>
        </svg>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className="mx-auto mb-8">
          <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ícone de mapa e localização" className="mx-auto">
            <g fill="#ffffff" fillRule="evenodd">
              {/* Map panels (folded) */}
              <polygon points="16,60 16,30 36,24 36,54" opacity="0.95" />
              <polygon points="36,54 36,26 60,32 60,62" opacity="0.95" />
              <polygon points="60,62 60,32 80,26 80,58" opacity="0.95" />

              {/* Location pin */}
              <path d="M48 18c9 0 16 7 16 16 0 12-16 28-16 28S32 46 32 34c0-9 7-16 16-16zm0 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
            </g>
          </svg>
        </div>

        {/* Title & subtitle */}
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight mb-2">Bora São Roque</h1>
        <p className="text-white/90 text-base sm:text-lg mb-12">Turismo Seguro e Inteligente</p>
      </div>

      {/* Dots spinner */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10">
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const cx = 24 + Math.cos(angle) * 16;
            const cy = 24 + Math.sin(angle) * 16;
            const delay = i * 0.08;
            return (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#ffffff" opacity="0.2">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            );
          })}
        </svg>
      </div>

      {/* Bottom progress dash */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white rounded-full opacity-90" />
    </div>
  );
};

export default Splash;
