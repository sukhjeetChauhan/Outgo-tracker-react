import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Expense from './Pages/Expense'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/project" element={<Project />} />
          <Route path="/expense" element={<Expense />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
