'use client'

import { useState } from 'react'
import { useSpeedTest } from '@/hooks/use-speed-test'
import { Header } from '@/components/header'
import { SpeedGauge } from '@/components/speed-gauge'
import { ResultsCard } from '@/components/results-card'
import { SettingsPanel } from '@/components/settings-panel'
import { HistoryList } from '@/components/history-list'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  
  const {
    isRunning,
    currentSpeed,
    lastResult,
    history,
    settings,
    updateSettings,
    runTest,
    resetTest,
    clearHistory,
  } = useSpeedTest()

  const handleStartTest = async () => {
    resetTest()
    await runTest()
  }

  const getQuality = (speed: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (speed >= 100) return 'excellent'
    if (speed >= 50) return 'good'
    if (speed >= 10) return 'fair'
    return 'poor'
  }

  return (
    <>
      <Header 
        onSettingsClick={() => setShowSettings(!showSettings)}
        onHistoryClick={() => setShowHistory(!showHistory)}
        isTesting={isRunning}
      />
      
      <main className="min-h-screen pt-20 pb-8 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Main Speed Gauge */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <SpeedGauge
              value={currentSpeed}
              maxValue={500}
              unit="Mbps"
              label={isRunning ? 'Testing...' : 'Download Speed'}
              quality={getQuality(currentSpeed)}
              isAnimating={isRunning}
            />
          </div>

          {/* Start Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleStartTest}
              disabled={isRunning}
              className={`relative px-16 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                isRunning
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary hover:bg-blue-600 text-primary-foreground hover:shadow-glow active:scale-95'
              }`}
            >
              {isRunning ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin-slow">⚡</span>
                  Testing...
                </span>
              ) : (
                'START TEST'
              )}
            </button>
          </div>

          {/* Results Card */}
          {lastResult && (
            <div className="glass-effect rounded-2xl p-6 mb-8 slide-up">
              <ResultsCard result={lastResult} />
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="glass-effect rounded-2xl p-6 mb-8 slide-up">
              <h3 className="text-lg font-bold mb-4 text-foreground">Test Settings</h3>
              <SettingsPanel
                settings={settings}
                onSettingsChange={updateSettings}
                isRunning={isRunning}
              />
            </div>
          )}

          {/* History Panel */}
          {showHistory && (
            <div className="glass-effect rounded-2xl p-6 mb-8 slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Test History</h3>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <HistoryList history={history} onClearHistory={clearHistory} />
            </div>
          )}

          {/* Tips Section */}
          <div className="glass-effect rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isRunning ? '⏳ Testing in progress...' : '💡 Close other apps and tabs for accurate results'}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
