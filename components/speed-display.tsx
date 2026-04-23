'use client'

import { useEffect, useState } from 'react'

interface SpeedDisplayProps {
  speed: number
  isRunning: boolean
}

export function SpeedDisplay({ speed, isRunning }: SpeedDisplayProps) {
  const [displaySpeed, setDisplaySpeed] = useState(0)

  // Smooth animation of the displayed speed
  useEffect(() => {
    if (!isRunning) {
      setDisplaySpeed(speed)
      return
    }

    const interval = setInterval(() => {
      setDisplaySpeed((prev) => {
        const diff = speed - prev
        if (Math.abs(diff) < 0.5) return speed
        return prev + diff * 0.1
      })
    }, 16)

    return () => clearInterval(interval)
  }, [speed, isRunning])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative h-64 w-64 flex items-center justify-center">
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-8 transition-colors duration-300 ${
            isRunning ? 'border-blue-500' : 'border-gray-300'
          }`}
        />

        {/* Speed text */}
        <div className="text-center z-10">
          <div className="text-6xl font-bold text-gray-900 tabular-nums">
            {Math.round(displaySpeed * 10) / 10}
          </div>
          <div className="text-xl text-gray-600 mt-2">Mbps</div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-lg text-gray-600 mt-4 h-6">
        {isRunning ? 'Testing...' : 'Ready'}
      </div>
    </div>
  )
}
