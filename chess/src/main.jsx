import React, { useState ,  createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameBoard from './Pages/GameBoard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './Pages/HomeScreen.jsx'
import Navbar from './components/navbar.jsx'
export const ModeContext=createContext();
const App = () => {
  const [mode, setMode] = useState('default');


  return (
    <React.StrictMode>
      <ModeContext.Provider value={{mode, setMode}}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />} /> {/* Pass mode and setMode to HomeScreen */}
          <Route path='/play' element={<GameBoard />} /> {/* Pass mode and setMode to GameBoard */}
        </Routes>
      </BrowserRouter>
      </ModeContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
