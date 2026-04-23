'use client'

import { TestSettings } from '@/hooks/use-speed-test'
import { Zap, Signal } from 'lucide-react'

interface SettingsPanelProps {
  settings: TestSettings
  onSettingsChange: (settings: Partial<TestSettings>) => void
  isRunning: boolean
}

const PARALLEL_OPTIONS = [2, 4, 8, 16, 32]
const DURATION_OPTIONS = [5, 10, 15, 30]
const REGION_OPTIONS = ['US-East', 'US-West', 'Europe', 'Asia-Pacific', 'South America']

export function SettingsPanel({
  settings,
  onSettingsChange,
  isRunning,
}: SettingsPanelProps) {
  return (
    <div className="w-full space-y-6">
      {/* Parallel Connections */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Zap size={16} className="text-primary" />
          Parallel Connections: <span className="text-primary">{settings.parallelConnections}</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {PARALLEL_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() =>
                onSettingsChange({ parallelConnections: option })
              }
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.parallelConnections === option
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'glass-effect hover:border-primary disabled:opacity-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Test Duration */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Signal size={16} className="text-primary" />
          Test Duration: <span className="text-primary">{settings.testDuration}s</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => onSettingsChange({ testDuration: option })}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.testDuration === option
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'glass-effect hover:border-primary disabled:opacity-50'
              }`}
            >
              {option}s
            </button>
          ))}
        </div>
      </div>

      {/* Server Region */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          🌍 Server Region
        </label>
        <div className="space-y-2">
          {REGION_OPTIONS.map((region) => (
            <button
              key={region}
              onClick={() => onSettingsChange({ serverRegion: region })}
              disabled={isRunning}
              className={`w-full px-4 py-3 rounded-lg text-sm text-left font-medium transition-all ${
                settings.serverRegion === region
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'glass-effect hover:border-primary disabled:opacity-50'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
