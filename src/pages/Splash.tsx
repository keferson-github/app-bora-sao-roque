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
    <div className="min-h-screen bg-gradient-orange flex items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-150" />
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-300" />

      {/* Logo and text */}
      <div className="text-center z-10 px-6">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 animate-scale-in">
            Bora
          </h1>
          <h2 className="text-5xl font-bold text-white mb-8 animate-slide-in-right">
            São Roque
          </h2>
          <p className="text-white/90 text-lg animate-fade-in delay-500">
            Turismo Seguro e Inteligente
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[slide-in-right_2s_ease-out]" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
