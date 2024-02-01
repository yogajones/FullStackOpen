import { useState } from 'react'

const FeedbackButton = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const count = good + neutral + bad

  if (count === 0) {
    return (
      <>
        <p>No feedback given yet.</p>
      </>
    )
  }

  return (
    <>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>

      <p>Feedback count: {count}</p>
      <p>Share of positive feedback: {(good / (count) * 100).toFixed(2)}%</p>
      <p>Average score: {((good * 1 + bad * (-1)) / count).toFixed(2)}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe feedback</h1>
      <FeedbackButton handleClick={() => setGood(good + 1)} text={"GOOD"} />
      <FeedbackButton handleClick={() => setNeutral(neutral + 1)} text={"NEUTRAL"} />
      <FeedbackButton handleClick={() => setBad(bad + 1)} text={"BAD"} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App