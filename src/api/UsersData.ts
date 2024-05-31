import { User, UserFields } from '@/types/users'
import { DB, Data, loadData } from './Data'
import { EntityWithIdFields } from '@/types/baseEntities'

const USER_KEY = 'Users'

const defaultNames = {
    'fgastioni@fi.uba.ar': 0,
    'rredeuda@fi.uba.ar': 1,
    'dsaldos@fi.uba.ar': 2,
    'jgrezhos@fi.uba.ar': 3,
    'cpresta@fi.uba.ar': 4
}

export const currentUser: User = {
    [EntityWithIdFields.Id]: 0,
    [UserFields.Name]: 'Fernando Gastioni',
    [UserFields.Friends]: [1, 2, 3, 4],
    [UserFields.Mail]: 'fgastioni@fi.uba.ar',
    [UserFields.Password]: 'gastioni'
}

const defaultUsers: Data<User> = {
    0: currentUser,
    1: {
        [EntityWithIdFields.Id]: 1,
        [UserFields.Name]: 'Renzo Redeuda',
        [UserFields.Friends]: [0, 2, 3, 4],
        [UserFields.Mail]: 'rredeuda@fi.uba.ar',
        [UserFields.Password]: 'redeuda'
    },
    2: {
        [EntityWithIdFields.Id]: 2,
        [UserFields.Name]: 'Debora Saldos',
        [UserFields.Friends]: [0, 1, 3, 4],
        [UserFields.Mail]: 'dsaldos@fi.uba.ar',
        [UserFields.Password]: 'saldos'
    },
    3: {
        [EntityWithIdFields.Id]: 3,
        [UserFields.Name]: 'Jazmin Grezhos',
        [UserFields.Friends]: [0, 1, 2, 4],
        [UserFields.Mail]: 'jgrezhos@fi.uba.ar',
        [UserFields.Password]: 'grezhos'
    },
    4: {
        [EntityWithIdFields.Id]: 4,
        [UserFields.Name]: 'Camila Presta',
        [UserFields.Friends]: [0, 1, 2, 3],
        [UserFields.Mail]: 'cpresta@fi.uba.ar',
        [UserFields.Password]: 'presta'
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
              id: 5,
              len: 5,
              data: defaultUsers,
              names: defaultNames
          }

export const isRegistered = (mail: string) => {
    if (dataUsers.names) {
        return mail in dataUsers.names
    }
    return true
}

export const isTruePassword = (truePassword: string, inputPassword: string) => {
    return truePassword === inputPassword
}
