import { User, UserFields } from '@/types/users'
import { DB, Data, loadData } from './Data'
import { EntityWithIdFields } from '@/types/baseEntities'

const USER_KEY = 'Users'

const defaultNames = {
    'Manuel Pol': 0,
    'Lorenzo Minervino': 1,
    'Martin Reimundo': 2,
    'Federico Camurri': 3,
    'Alen Davies': 4,
    'Pedro Gallino': 5
}

export var currentUser: User = {
    [EntityWithIdFields.Id]: 0,
    [UserFields.Name]: 'Fernando Gastioni',
    [UserFields.Friends]: [1, 2, 3, 4]
}

const defaultUsers: Data<User> = {
    0: currentUser,
    1: {
        [EntityWithIdFields.Id]: 1,
        [UserFields.Name]: 'Renzo Redeuda',
        [UserFields.Friends]: [0, 2, 3, 4]
    },
    2: {
        [EntityWithIdFields.Id]: 2,
        [UserFields.Name]: 'Debora Saldos',
        [UserFields.Friends]: [0, 1, 3, 4]
    },
    3: {
        [EntityWithIdFields.Id]: 3,
        [UserFields.Name]: 'Jazmin Grezhos',
        [UserFields.Friends]: [0, 1, 2, 4]
    },
    4: {
        [EntityWithIdFields.Id]: 4,
        [UserFields.Name]: 'Camila Presta',
        [UserFields.Friends]: [0, 1, 2, 3]
    }
}

const loadedUsers = loadData(USER_KEY)

export var dataUsers: DB<User> =
    loadedUsers.id !== 0
        ? {
              storageKey: USER_KEY,
              id: loadedUsers.id,
              len: loadedUsers.len,
              data: loadedUsers.data,
              names: loadedUsers.names
          }
        : {
              storageKey: USER_KEY,
              id: 6,
              len: 6,
              data: defaultUsers,
              names: defaultNames
          }
