import { Routes, Route, useMatch } from 'react-router-dom'
import { useState } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import Notification from './components/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(`Succesfully added "${anecdote.content}" `)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    showNotification(`"${voted.content}" now has ${voted.votes} votes.`)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} vote={vote} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<NewAnecdoteForm addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />

    </div>

  )
}

export default App
