import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import './App.css'

// Lazy load pages
const Home = lazy(() => import('./Pages/Home'))
const Project = lazy(() => import('./Pages/Project'))
const Expense = lazy(() => import('./Pages/Expense'))
const Income = lazy(() => import('./Pages/Income'))
const Login = lazy(() => import('./Pages/Login'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          <p className="text-2xl text-teal-500 font-semibold">Loading ...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/project" element={<Project />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default App
