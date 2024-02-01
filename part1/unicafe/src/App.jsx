import { useState } from 'react'

const FeedbackButton = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <th style={{ textAlign: 'left', paddingRight: '10px' }}>{text}</th>
      <td>{value}</td>
    </tr>
  )
}

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
    <table>
      <tbody>
        <StatisticsLine text={"Good:"} value={good} />
        <StatisticsLine text={"Neutral:"} value={neutral} />
        <StatisticsLine text={"Bad:"} value={bad} />
        <StatisticsLine text={"Feedback count:"} value={count} />
        <StatisticsLine text={"Average score:"} value={((good * 1 + bad * (-1)) / count).toFixed(2)} />
        <StatisticsLine text={"Positive:"} value={((good / (count) * 100).toFixed(2)) + " %"} />
      </tbody>
    </table>
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