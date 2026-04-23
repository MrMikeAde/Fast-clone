'use client'

import { TestResult } from '@/hooks/use-speed-test'
import { Trash2 } from 'lucide-react'

interface HistoryListProps {
  history: TestResult[]
  onClearHistory: () => void
}

export function HistoryList({ history, onClearHistory }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No test history yet</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="max-h-96 overflow-y-auto space-y-2">
        {history.map((result, index) => (
          <div
            key={index}
            className="glass-effect rounded-lg p-4 hover:shadow-glow-sm transition-all group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                  {new Date(result.timestamp).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  {new Date(result.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Download</p>
                    <p className="font-semibold text-blue-400 text-sm">
                      {(Math.round(result.downloadSpeed * 10) / 10).toFixed(1)} <span className="text-xs">Mbps</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Upload</p>
                    <p className="font-semibold text-green-400 text-sm">
                      {(Math.round(result.uploadSpeed * 10) / 10).toFixed(1)} <span className="text-xs">Mbps</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Latency</p>
                    <p className="font-semibold text-purple-400 text-sm">
                      {(Math.round(result.unloadedLatency * 10) / 10).toFixed(1)} <span className="text-xs">ms</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Loss</p>
                    <p className="font-semibold text-orange-400 text-sm">
                      {(result.packetLoss * 100).toFixed(2)} <span className="text-xs">%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear history button */}
      <div className="pt-4 border-t border-border mt-4">
        <button
          onClick={onClearHistory}
          className="w-full px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Clear History
        </button>
      </div>
    </div>
  )
}
