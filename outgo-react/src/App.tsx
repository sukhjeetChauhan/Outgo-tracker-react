import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Expense from './Pages/Expense'
import Income from './Pages/Income'
import Login from './Pages/Login'
import { useEffect, useState } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'

function App() {
  const isAuthenticated = useIsAuthenticated()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) {
        navigate('/') // Only redirect when authentication is confirmed
      }
      setIsLoading(false)
    }, 1000) // Short delay to avoid flickering
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/project" element={<Project />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
