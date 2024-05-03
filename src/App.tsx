import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import HomeLanding from './HomeLanding'
import LayoutLogged from './components/layouts/LayoutLogged'
import LayoutNotLogged from './components/layouts/LayoutNotLogged'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutNotLogged />}>
            <Route path="" element={<HomeLanding />} />
          </Route>
          <Route element={<LayoutLogged />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
