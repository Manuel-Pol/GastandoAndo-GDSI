import { defaultUser } from '@/api/UsersData'
import { User } from '@/types/users'
import React from 'react'

export const UserContext = React.createContext<{ user: User; changeUser: (user: User) => void }>({
    user: defaultUser,
    changeUser: (user: User) => {}
})
