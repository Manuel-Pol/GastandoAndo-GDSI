import { currentUser } from '@/api/UsersData'
import { UserFields } from '@/types/users'
import React from 'react'

export const UserContext = React.createContext({
    username: currentUser[UserFields.Name],
    setUsername: (username: string) => {}
})
