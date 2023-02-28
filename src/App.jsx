import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import Pokemon from './pages/Pokemon'
import ProtectRouter from './components/ProtectRouter'
import ProtectedHome from './components/ProtectedHome'


function App() {
  return (
    <div className="App">
      
      <Routes>
        
        <Route element={<ProtectedHome />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<ProtectRouter />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<Pokemon />} />
        </Route>

        
      </Routes>
    </div>
  );
}

export default App
