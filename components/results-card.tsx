'use client'

import { TestResult } from '@/hooks/use-speed-test'
import { Share2, Download, ArrowDown, ArrowUp, Zap, Wifi } from 'lucide-react'

interface ResultsCardProps {
  result: TestResult | null
}

export function ResultsCard({ result }: ResultsCardProps) {
  if (!result) {
    return null
  }

  const metrics = [
    {
      icon: ArrowDown,
      label: 'Download',
      value: result.downloadSpeed,
      unit: 'Mbps',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ArrowUp,
      label: 'Upload',
      value: result.uploadSpeed,
      unit: 'Mbps',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      label: 'Unloaded Latency',
      value: result.unloadedLatency,
      unit: 'ms',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Wifi,
      label: 'Loaded Latency',
      value: result.loadedLatency,
      unit: 'ms',
      color: 'from-orange-500 to-red-500',
    },
  ]

  const handleShare = () => {
    const text = `Check out my speed test results: ⬇️ ${result.downloadSpeed.toFixed(2)} Mbps Download, ⬆️ ${result.uploadSpeed.toFixed(2)} Mbps Upload, ⚡ ${result.unloadedLatency.toFixed(2)}ms Latency`
    if (navigator.share) {
      navigator.share({
        title: 'Speed Test Results',
        text,
      })
    } else {
      navigator.clipboard.writeText(text)
    }
  }

  const handleExport = () => {
    const csv = `Metric,Value,Unit\nDownload Speed,${result.downloadSpeed.toFixed(2)},Mbps\nUpload Speed,${result.uploadSpeed.toFixed(2)},Mbps\nUnloaded Latency,${result.unloadedLatency.toFixed(2)},ms\nLoaded Latency,${result.loadedLatency.toFixed(2)},ms\nPacket Loss,${(result.packetLoss * 100).toFixed(2)},%`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `speedtest-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">Test Results</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
            title="Share results"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={handleExport}
            className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
            title="Export as CSV"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="glass-effect-primary rounded-lg p-4 hover:shadow-glow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{metric.label}</p>
              <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {result ? (Math.round(metric.value * 10) / 10).toFixed(1) : '0'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{metric.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Additional info */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Packet Loss:</span>
          <span className="font-semibold text-foreground">
            {(result.packetLoss * 100).toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Tested:</span>
          <span className="font-semibold text-foreground">
            {new Date(result.timestamp).toLocaleString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
