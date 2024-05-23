import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import LayoutLogged from './components/layouts/LayoutLogged'
import LayoutNotLogged from './components/layouts/LayoutNotLogged'
import PersonalExpenses from './components/expenses/personal/PersonalExpenses'
import GroupExpenses from './components/expenses/groupal/GroupExpenses'
import { HomeLanding } from './HomeLanding'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<LayoutNotLogged />}>
                        <Route path='' element={<HomeLanding />} />
                    </Route>
                    <Route element={<LayoutLogged />}>
                        <Route path='home' element={<Home />} />
                        <Route path='individual' element={<PersonalExpenses />} />
                        <Route path='group' element={<GroupExpenses />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
