'use client';

import { useEffect, useState } from 'react';

interface SpeedGaugeProps {
  value: number;
  maxValue?: number;
  unit?: string;
  label?: string;
  quality?: 'excellent' | 'good' | 'fair' | 'poor';
  isAnimating?: boolean;
}

export function SpeedGauge({
  value,
  maxValue = 500,
  unit = 'Mbps',
  label = 'Speed',
  quality = 'fair',
  isAnimating = false,
}: SpeedGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
      setDisplayValue(value);
      return;
    }

    let current = 0;
    const target = value;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(current * 10) / 10);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value, isAnimating]);

  const percentage = Math.min((displayValue / maxValue) * 100, 100);
  
  const qualityColor = {
    excellent: 'from-success to-green-500',
    good: 'from-blue-500 to-cyan-500',
    fair: 'from-warning to-orange-500',
    poor: 'from-destructive to-red-500',
  }[quality];

  const qualityText = {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
  }[quality];

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Main Gauge Circle */}
      <div className="relative w-56 h-56">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d9bf0" />
              <stop offset="100%" stopColor="#17bf63" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 565.48} 565.48`}
            strokeDashoffset="0"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <div className={`text-5xl font-bold bg-gradient-to-r ${qualityColor} bg-clip-text text-transparent`}>
            {displayValue.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">{unit}</div>
          <div className="h-px w-12 bg-muted my-2"></div>
          <div className="text-xs font-semibold text-success">{qualityText}</div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}
