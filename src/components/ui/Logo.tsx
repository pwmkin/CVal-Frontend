import { FileText } from "lucide-react";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-50 blur-sm translate-y-[3px] animate-pulse-slow"></div>
      <div className="w-full h-full relative bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center">
        <FileText className="w-4/6 h-4/6 text-white" />
      </div>
    </div>
  );
};

export default Logo;
