import { NextRequest, NextResponse } from 'next/server'

interface TestConfig {
  parallelConnections: number
  testDuration: number
  serverRegion: string
}

interface TestResult {
  downloadSpeed: number
  uploadSpeed: number
  unloadedLatency: number
  loadedLatency: number
  packetLoss: number
}

// Simulate speed test results based on realistic patterns
function simulateSpeedTest(config: TestConfig): TestResult {
  const { parallelConnections, testDuration, serverRegion } = config

  // Base speeds vary by region
  const regionMultipliers: Record<string, number> = {
    'US-East': 1,
    'US-West': 0.95,
    'Europe': 0.98,
    'Asia-Pacific': 0.85,
    'South America': 0.7,
  }

  const regionMultiplier = regionMultipliers[serverRegion] || 1

  // Simulate realistic download speed (in Mbps)
  // Add some variation and account for parallel connections
  const baseDownload = 50 + Math.random() * 150
  const downloadBoost = Math.log(parallelConnections) * 10
  const downloadSpeed = (baseDownload + downloadBoost) * regionMultiplier

  // Upload is typically slower than download
  const uploadSpeed = (downloadSpeed * 0.2) + Math.random() * 20

  // Latency (in milliseconds) - lower is better
  const baseLatency = 20 + Math.random() * 30
  const unloadedLatency = baseLatency / regionMultiplier
  const loadedLatency = unloadedLatency + (Math.random() * 30 + 10)

  // Packet loss (0-2%)
  const packetLoss = Math.random() * 0.02

  return {
    downloadSpeed: Math.max(1, Math.round(downloadSpeed * 10) / 10),
    uploadSpeed: Math.max(0.5, Math.round(uploadSpeed * 10) / 10),
    unloadedLatency: Math.round(unloadedLatency),
    loadedLatency: Math.round(loadedLatency),
    packetLoss: Math.round(packetLoss * 1000) / 1000,
  }
}

// Simulate gradual speed increase during test
function generateProgressSequence(
  config: TestConfig,
  finalResult: TestResult,
  steps: number = 50
): number[] {
  const sequence: number[] = []

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps
    // Use exponential curve to make it feel more natural
    const eased = Math.pow(progress, 0.6)
    const speed = finalResult.downloadSpeed * eased * (0.7 + Math.random() * 0.3)
    sequence.push(Math.round(speed * 10) / 10)
  }

  return sequence
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const config: TestConfig = {
      parallelConnections: body.parallelConnections || 8,
      testDuration: body.testDuration || 10,
      serverRegion: body.serverRegion || 'US-East',
    }

    // Simulate test delay based on duration
    const delay = Math.min(config.testDuration * 100, 3000)
    await new Promise((resolve) => setTimeout(resolve, delay))

    const result = simulateSpeedTest(config)
    const progressSequence = generateProgressSequence(config, result)

    return NextResponse.json({
      result,
      progressSequence,
    })
  } catch (error) {
    console.error('Speed test error:', error)
    return NextResponse.json(
      { error: 'Failed to run speed test' },
      { status: 500 }
    )
  }
}
