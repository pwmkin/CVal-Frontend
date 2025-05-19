import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  // Ensure score is between 0 and 100 and round to nearest integer
  const normalizedScore = Math.round(Math.max(0, Math.min(100, score)));
  
  // Calculate colors based on score
  const getColor = (score: number) => {
    if (score >= 80) return ['from-green-500', 'to-green-400', 'text-green-500'];
    if (score >= 60) return ['from-blue-500', 'to-blue-400', 'text-blue-500'];
    if (score >= 40) return ['from-yellow-500', 'to-yellow-400', 'text-yellow-500'];
    return ['from-red-500', 'to-red-400', 'text-red-500'];
  };
  
  const [fromColor, toColor, textColor] = getColor(normalizedScore);
  
  // Calculate size classes
  const sizeClasses = {
    sm: {
      wrapper: 'w-16 h-16',
      circle: 'w-14 h-14',
      text: 'text-xl',
      label: 'text-xs',
    },
    md: {
      wrapper: 'w-24 h-24',
      circle: 'w-20 h-20',
      text: 'text-2xl',
      label: 'text-sm',
    },
    lg: {
      wrapper: 'w-32 h-32',
      circle: 'w-28 h-28',
      text: 'text-3xl',
      label: 'text-base',
    },
  };
  
  // Calculate stroke dash values
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;
  
  return (
    <div className={`${sizeClasses[size].wrapper} flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size].circle} relative`}>
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-gray-200 dark:text-gray-800"
          />
        </svg>
        
        {/* Progress circle */}
        <svg className="w-full h-full absolute top-0 left-0 -rotate-90" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#gradient-${size})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id={`gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={fromColor} />
              <stop offset="100%" className={toColor} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            className={`font-bold ${sizeClasses[size].text} ${textColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {normalizedScore}
          </motion.span>
          {showLabel && (
            <motion.span
              className={`${sizeClasses[size].label} text-gray-500 dark:text-gray-400 -mt-1`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              / 100
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreCircle;