import { useState } from 'react'
import { UserContext } from './userContext'

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('')

    return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>
}
