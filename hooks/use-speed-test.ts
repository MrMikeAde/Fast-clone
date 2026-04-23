import { useState, useCallback, useEffect } from 'react'

export interface TestSettings {
  parallelConnections: number
  testDuration: number
  serverRegion: string
}

export interface TestResult {
  downloadSpeed: number
  uploadSpeed: number
  unloadedLatency: number
  loadedLatency: number
  packetLoss: number
  timestamp: number
}

export interface TestHistory {
  results: TestResult[]
  lastUpdated: number
}

const STORAGE_KEY = 'speedTestHistory'
const SETTINGS_KEY = 'speedTestSettings'
const MAX_HISTORY = 20

const DEFAULT_SETTINGS: TestSettings = {
  parallelConnections: 8,
  testDuration: 10,
  serverRegion: 'US-East',
}

export function useSpeedTest() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [progressSequence, setProgressSequence] = useState<number[]>([])
  const [lastResult, setLastResult] = useState<TestResult | null>(null)
  const [history, setHistory] = useState<TestResult[]>([])
  const [settings, setSettingsState] = useState<TestSettings>(DEFAULT_SETTINGS)
  const [isMounted, setIsMounted] = useState(false)

  // Load settings and history from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY)
    const savedHistory = localStorage.getItem(STORAGE_KEY)

    if (savedSettings) {
      try {
        setSettingsState(JSON.parse(savedSettings))
      } catch (e) {
        console.error('Failed to parse saved settings:', e)
      }
    }

    if (savedHistory) {
      try {
        const data: TestHistory = JSON.parse(savedHistory)
        setHistory(data.results || [])
      } catch (e) {
        console.error('Failed to parse saved history:', e)
      }
    }

    setIsMounted(true)
  }, [])

  // Save settings to localStorage
  const updateSettings = useCallback((newSettings: Partial<TestSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings }
      if (isMounted) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated))
      }
      return updated
    })
  }, [isMounted])

  // Save history to localStorage
  const saveHistory = useCallback((results: TestResult[]) => {
    if (isMounted) {
      const historyData: TestHistory = {
        results,
        lastUpdated: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyData))
    }
  }, [isMounted])

  const runTest = useCallback(async () => {
    if (isRunning) return

    setIsRunning(true)
    setCurrentSpeed(0)
    setProgressSequence([])

    try {
      const response = await fetch('/api/speed-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error('Test failed')

      const data = await response.json()
      const result: TestResult = {
        ...data.result,
        timestamp: Date.now(),
      }

      // Animate through progress sequence
      const sequence = data.progressSequence || []
      setProgressSequence(sequence)

      // Simulate animation through speeds
      for (let i = 0; i < sequence.length; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, (settings.testDuration * 1000) / sequence.length)
        )
        setCurrentSpeed(sequence[i])
      }

      // Set final result
      setLastResult(result)

      // Update history
      const newHistory = [result, ...history].slice(0, MAX_HISTORY)
      setHistory(newHistory)
      saveHistory(newHistory)
    } catch (error) {
      console.error('Speed test error:', error)
      setCurrentSpeed(0)
    } finally {
      setIsRunning(false)
    }
  }, [isRunning, settings, history, saveHistory])

  const resetTest = useCallback(() => {
    setCurrentSpeed(0)
    setProgressSequence([])
    setLastResult(null)
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    if (isMounted) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [isMounted])

  return {
    isRunning,
    currentSpeed,
    lastResult,
    history,
    settings,
    updateSettings,
    runTest,
    resetTest,
    clearHistory,
  }
}
