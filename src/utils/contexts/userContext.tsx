import { currentUser } from '@/api/UsersData'
import { User } from '@/types/users'
import React from 'react'

export const UserContext = React.createContext<{ user: User; setUser: (user: User) => void }>({
    user: currentUser,
    setUser: (user: User) => {}
})
