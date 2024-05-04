import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import HomeLanding from './HomeLanding'
import LayoutLogged from './components/layouts/LayoutLogged'
import LayoutNotLogged from './components/layouts/LayoutNotLogged'
import PersonalExpenses from './components/expenses/PersonalExpenses'

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
            <Route path="individual" element={<PersonalExpenses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
