import { Home, Map, Wine, AlertTriangle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Map, label: "Mapa", path: "/map" },
  { icon: Wine, label: "Rota do Vinho", path: "/wine-route" },
  { icon: AlertTriangle, label: "Alertas", path: "/alerts" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-elegant z-50">
      <nav className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-muted" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};