import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/login'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from "./components/dashboard/index.jsx"
import { toast, ToastContainer } from 'react-toastify'
import Test from './Test.jsx'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>

      <Routes >
        <Route path='/' element={<Dashboard />}> </Route>
        <Route path='/login' element={<LoginPage />}> </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />

    </>
  )
}

export default App
