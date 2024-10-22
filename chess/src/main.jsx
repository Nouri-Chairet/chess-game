import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameBoard from './Pages/GameBoard.jsx'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import HomeScreen from './Pages/HomeScreen.jsx'
import Navbar from './components/navbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/home' element={<HomeScreen />}></Route>
      <Route path='/' element={<GameBoard />}></Route>
    </Routes>
  </BrowserRouter>
  
  </React.StrictMode>,
)
