import { useState } from 'react'
import { UserContext } from './userContext'
import { currentUser } from '@/api/UsersData'
import { UserFields } from '@/types/users'

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(currentUser[UserFields.Name])

    return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>
}
