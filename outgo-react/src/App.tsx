import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Expense from './Pages/Expense'
import Income from './Pages/Income'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/project" element={<Project />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
