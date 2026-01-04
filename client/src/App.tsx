import { useState, useEffect } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [dailyProgress, setDailyProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date()
      setCurrentTime(now)

      const secondsSinceStartOfDay =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds()

      const totalSecondsInDay = 24 * 3600
      const progress = (secondsSinceStartOfDay / totalSecondsInDay) * 100

      setDailyProgress(progress)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div className="app-container">
      <header>
        <h1>Life Progress</h1>
        <p className="subtitle">Visualizing time on various scales</p>
      </header>

      <main>
        <ProgressBar
          label="Daily Progress"
          progress={dailyProgress}
          subLabel={`Current Time: ${formattedTime}`}
        />

        {/* Placeholder for future bars */}
        <div className="coming-soon">
          More scales coming soon...
        </div>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Progress App</p>
      </footer>
    </div>
  )
}

export default App
