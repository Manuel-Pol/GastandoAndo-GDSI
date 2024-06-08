import { useState } from 'react'
import { UserContext } from './userContext'
import { CURR_USER, defaultUser } from '@/api/UsersData'
import { User } from '@/types/users'
import { EntityWithIdFields } from '@/types/baseEntities'

export const UserProvider = ({ children }) => {
    const lastUser = window.localStorage.getItem(CURR_USER)
    const [user, setUser] = useState<User>(lastUser ? JSON.parse(lastUser) : defaultUser)

    const changeUser = (newUser: User) => {
        setUser(newUser)
        window.localStorage.setItem(CURR_USER, JSON.stringify(newUser[EntityWithIdFields.Id]))
    }

    return <UserContext.Provider value={{ user, changeUser }}>{children}</UserContext.Provider>
}
