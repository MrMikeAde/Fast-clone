'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface FastSpeedDisplayProps {
  value: number;
  unit?: string;
  isTesting: boolean;
  onRestart?: () => void;
}

export function FastSpeedDisplay({
  value,
  unit = 'Mbps',
  isTesting,
  onRestart,
}: FastSpeedDisplayProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isTesting) {
      setDisplayValue(value);
      return;
    }

    const target = value;
    const diff = target - displayValue;
    const increment = diff * 0.2;

    if (Math.abs(diff) > 0.01) {
      const timer = setTimeout(() => {
        setDisplayValue(prev => prev + increment);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(target);
    }
  }, [value, isTesting, displayValue]);

  const formattedValue = isTesting || displayValue > 0
    ? Math.round(displayValue)
    : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[40vh] py-8 sm:py-12 w-full overflow-hidden">
      <div className="text-center mb-2 sm:mb-4">
        <p className="text-base sm:text-xl font-medium text-muted-foreground px-4">
          Your Internet speed is
        </p>
      </div>

      <div className="relative flex items-baseline justify-center gap-2 sm:gap-4 w-full px-4">
        <div
          className={`text-[clamp(5rem,25vw,16rem)] font-bold leading-none speed-text transition-opacity duration-500 ${
            isTesting ? 'opacity-70 animate-pulse' : 'opacity-100'
          }`}
        >
          {formattedValue}
        </div>

        <div className="flex flex-col items-start gap-1 sm:gap-2 mb-2 sm:mb-4">
          <div className="text-xl sm:text-4xl md:text-5xl font-semibold text-muted-foreground uppercase">
            {unit}
          </div>

          {!isTesting && (
            <button
              onClick={onRestart}
              className="mt-1 sm:mt-2 p-2 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-colors focus:outline-none"
              aria-label="Restart test"
            >
              <RefreshCw size={24} className="sm:w-6 sm:h-6 w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
