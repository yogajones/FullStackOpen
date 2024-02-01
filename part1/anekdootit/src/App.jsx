import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <p>Votes: {votes}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * anecdotes.length))
  const mostVotesIndex = votes.indexOf(Math.max(...votes))

  const selectRandomAnecdote = () => {
    setRandomIndex(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[randomIndex] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[randomIndex]} votes={votes[randomIndex]} />
        <Button handleClick={vote} text="Vote" />
        <Button handleClick={selectRandomAnecdote} text="Next anecdote" />
      </>
      <>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
      </>
    </div>
  )
}

export default App