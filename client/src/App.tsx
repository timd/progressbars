import { useState, useEffect } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [dailyProgress, setDailyProgress] = useState(0)
  const [weeklyProgress, setWeeklyProgress] = useState(0)
  const [monthlyProgress, setMonthlyProgress] = useState(0)
  const [yearlyProgress, setYearlyProgress] = useState(0)
  const [decadeProgress, setDecadeProgress] = useState(0)
  const [centuryProgress, setCenturyProgress] = useState(0)
  const [millenniumProgress, setMillenniumProgress] = useState(0)
  const [solarProgress, setSolarProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date()
      setCurrentTime(now)

      // Daily Progress (Continuous)
      const secondsSinceStartOfDay =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds()

      const totalSecondsInDay = 24 * 3600
      setDailyProgress((secondsSinceStartOfDay / totalSecondsInDay) * 100)

      // Weekly Progress (Discrete: Sunday = 1/7, ..., Saturday = 7/7)
      const dayIndex = now.getDay()
      const weekProgressPercentage = ((dayIndex + 1) / 7) * 100
      setWeeklyProgress(weekProgressPercentage)

      // Monthly Progress (Discrete)
      const dayOfMonth = now.getDate()
      const totalDaysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      const monthProgressPercentage = (dayOfMonth / totalDaysInMonth) * 100
      setMonthlyProgress(monthProgressPercentage)

      // Yearly Progress (Discrete)
      const year = now.getFullYear()
      const startOfYear = new Date(year, 0, 1)
      const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1
      const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)
      const totalDaysInYear = isLeapYear(year) ? 366 : 365
      setYearlyProgress((dayOfYear / totalDaysInYear) * 100)

      // Decade Progress (Discrete: 2020-2029)
      const startOfDecade = new Date(year - (year % 10), 0, 1)
      const endOfDecade = new Date(year - (year % 10) + 10, 0, 1)
      const daysInDecade = (endOfDecade.getTime() - startOfDecade.getTime()) / (1000 * 60 * 60 * 24)
      const dayOfDecade = Math.floor((now.getTime() - startOfDecade.getTime()) / (1000 * 60 * 60 * 24)) + 1
      setDecadeProgress((dayOfDecade / daysInDecade) * 100)

      // Century Progress (Discrete: 2000-2099)
      const startOfCentury = new Date(year - (year % 100), 0, 1)
      const endOfCentury = new Date(year - (year % 100) + 100, 0, 1)
      const daysInCentury = (endOfCentury.getTime() - startOfCentury.getTime()) / (1000 * 60 * 60 * 24)
      const dayOfCentury = Math.floor((now.getTime() - startOfCentury.getTime()) / (1000 * 60 * 60 * 24)) + 1
      setCenturyProgress((dayOfCentury / daysInCentury) * 100)

      // Millennium Progress (Discrete: 2000-2999)
      const startOfMillennium = new Date(year - (year % 1000), 0, 1)
      const endOfMillennium = new Date(year - (year % 1000) + 1000, 0, 1)
      const daysInMillennium = (endOfMillennium.getTime() - startOfMillennium.getTime()) / (1000 * 60 * 60 * 24)
      const dayOfMillennium = Math.floor((now.getTime() - startOfMillennium.getTime()) / (1000 * 60 * 60 * 24)) + 1
      setMillenniumProgress((dayOfMillennium / daysInMillennium) * 100)

      // Solar Lifetime (Approx: 4.603 billion years / 10 billion years)
      const totalSolarLifespanYears = 10000000000
      const currentSunAgeYears = 4603000000 + (now.getFullYear() - 2000) // Rough approx
      setSolarProgress((currentSunAgeYears / totalSolarLifespanYears) * 100)
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

  // Get current date names
  const dayName = currentTime.toLocaleDateString([], { weekday: 'long' })
  const monthName = currentTime.toLocaleDateString([], { month: 'long' })
  const year = currentTime.getFullYear()

  const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)
  const totalDaysInYear = isLeapYear(year) ? 366 : 365
  const startOfYear = new Date(year, 0, 1)
  const dayOfYear = Math.floor((currentTime.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1

  const startOfDecade = year - (year % 10)
  const endOfDecade = startOfDecade + 9
  const startOfCentury = year - (year % 100)
  const endOfCentury = startOfCentury + 99
  const startOfMillennium = year - (year % 1000)
  const endOfMillennium = startOfMillennium + 999

  return (
    <div className="app-container" data-theme={theme}>
      <header>
        <div className="header-main">
          <h1>Life Progress</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <p className="subtitle">Visualizing time on various scales</p>
      </header>

      <main>
        <ProgressBar
          label="Daily"
          progress={dailyProgress}
          subLabel={`Current Time: ${formattedTime}`}
          precision={3}
          theme={theme}
        />

        <ProgressBar
          label="Weekly"
          progress={weeklyProgress}
          subLabel={`Current Day: ${dayName} (Day ${currentTime.getDay() + 1} of 7)`}
          precision={1}
          theme={theme}
        />

        <ProgressBar
          label="Monthly"
          progress={monthlyProgress}
          subLabel={`Current Month: ${monthName} (Day ${currentTime.getDate()} of ${new Date(year, currentTime.getMonth() + 1, 0).getDate()})`}
          precision={1}
          theme={theme}
        />

        <ProgressBar
          label="Yearly"
          progress={yearlyProgress}
          subLabel={`Current Year: ${year} (Day ${dayOfYear} of ${totalDaysInYear})`}
          theme={theme}
        />

        <ProgressBar
          label="Decade"
          progress={decadeProgress}
          subLabel={`Period: ${startOfDecade}-${endOfDecade}`}
          precision={0}
          theme={theme}
        />

        <ProgressBar
          label="Century"
          progress={centuryProgress}
          subLabel={`Period: ${startOfCentury}-${endOfCentury}`}
          precision={0}
          theme={theme}
        />

        <ProgressBar
          label="Millennium"
          progress={millenniumProgress}
          subLabel={`Period: ${startOfMillennium}-${endOfMillennium}`}
          theme={theme}
        />

        <ProgressBar
          label="Solar Lifetime"
          progress={solarProgress}
          subLabel="Total lifespan: ~10 billion years"
          theme={theme}
        />
      </main>
    </div>
  )
}

export default App
