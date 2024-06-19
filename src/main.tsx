import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './utils/contexts/userProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <App />
    </UserProvider>
)
