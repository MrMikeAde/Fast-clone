'use client'

import { useState } from 'react'
import { useSpeedTest } from '@/hooks/use-speed-test'
import { FastSpeedDisplay } from '@/components/fast-speed-display'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Settings, History as HistoryIcon, Github, Globe } from 'lucide-react'
import { SettingsPanel } from '@/components/settings-panel'
import { HistoryList } from '@/components/history-list'
import Link from 'next/link'

export default function Home() {
  const [showMore, setShowMore] = useState(false)
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

  return (
    <main className="min-h-screen flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-5xl pt-8 pb-4 flex justify-between items-center">
        <div className="text-3xl font-black tracking-tighter flex items-center gap-1 select-none">
          <span className="text-accent">FAST</span>
          <span className="text-foreground">.COM</span>
        </div>

        <div className="flex gap-4">
           <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <HistoryIcon size={20} />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center">
        <FastSpeedDisplay
          value={currentSpeed}
          isTesting={isRunning}
          onRestart={handleStartTest}
        />

        {!isRunning && lastResult && (
          <div className="w-full flex flex-col items-center gap-8 fade-in pb-12">
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 px-6 py-3 border border-border hover:border-foreground transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
              {showMore ? 'Show less info' : 'Show more info'}
              {showMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showMore && (
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-border mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Latency</span>
                  <div className="flex gap-12">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{Math.round(lastResult.unloadedLatency)} <span className="text-sm font-normal text-muted-foreground">ms</span></div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Unloaded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{Math.round(lastResult.loadedLatency)} <span className="text-sm font-normal text-muted-foreground">ms</span></div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Loaded</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Upload</span>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{Math.round(lastResult.uploadSpeed)} <span className="text-sm font-normal text-muted-foreground">Mbps</span></div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Speed</div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Details</span>
                  <div className="text-center">
                    <div className="text-base font-bold uppercase tracking-widest">{settings.serverRegion}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Server</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
          <div className="bg-background border-2 border-foreground p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black uppercase tracking-[0.2em]">Settings</h3>
              <button onClick={() => setShowSettings(false)} className="p-2">✕</button>
            </div>
            <SettingsPanel settings={settings} onSettingsChange={updateSettings} isRunning={isRunning} />
            <div className="mt-10">
              <button
                className="w-full py-4 bg-foreground text-background font-black uppercase tracking-[0.2em]"
                onClick={() => setShowSettings(false)}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
          <div className="bg-background border-2 border-foreground p-8 max-w-2xl w-full max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black uppercase tracking-[0.2em]">History</h3>
              <div className="flex gap-4 items-center">
                <button onClick={clearHistory} className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Clear All</button>
                <button onClick={() => setShowHistory(false)} className="p-2">✕</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <HistoryList history={history} onClearHistory={clearHistory} />
            </div>
          </div>
        </div>
      )}

      <footer className="w-full max-w-5xl py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-auto">
        <div className="flex items-center gap-8">
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <a href="https://github.com/MrMikeAde/Fast-clone" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Source code</a>

          <div className="flex gap-4 ml-4 border-l border-border pl-8">
            <a
              href="https://github.com/MrMikeAde"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://meetmike.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
              aria-label="Portfolio Website"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 select-none">
          Powered by <Github size={12} className="inline-block" /> /Mrmikeade
        </div>
      </footer>
    </main>
  )
}
