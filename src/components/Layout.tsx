import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export const Layout = ({ children, showBottomNav = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={cn("pb-20", !showBottomNav && "pb-0")}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};