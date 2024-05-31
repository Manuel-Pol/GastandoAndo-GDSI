import { useState } from 'react'
import { UserContext } from './userContext'
import { currentUser } from '@/api/UsersData'
import { User } from '@/types/users'

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState<User>(currentUser)

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
