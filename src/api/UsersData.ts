import { User, UserFields } from '@/types/users'
import { DB, Data, loadData } from './Data'
import { EntityWithIdFields } from '@/types/baseEntities'

const USER_KEY = 'Users'
export const CURR_USER = 'CurrentUser'

const defaultNames = {
    'fgastioni@fi.uba.ar': 0,
    'rredeuda@fi.uba.ar': 1000,
    'dsaldos@fi.uba.ar': 1001,
    'jgrezhos@fi.uba.ar': 1002,
    'cpresta@fi.uba.ar': 1003
}

export const defaultUser: User = {
    [EntityWithIdFields.Id]: 0,
    [UserFields.Name]: 'Fernando Gastioni',
    [UserFields.Friends]: [1000, 1001, 1002, 1003],
    [UserFields.Mail]: 'fgastioni@fi.uba.ar',
    [UserFields.Password]: 'gastioni',
    [UserFields.PersonalExpenses]: [],
    [UserFields.Groups]: [],
    [UserFields.Savings]: []
}

const defaultUsers: Data<User> = {
    0: defaultUser,
    1000: {
        [EntityWithIdFields.Id]: 1000,
        [UserFields.Name]: 'Renzo Redeuda',
        [UserFields.Friends]: [0, 1001, 1002, 1003],
        [UserFields.Mail]: 'rredeuda@fi.uba.ar',
        [UserFields.Password]: 'redeuda',
        [UserFields.PersonalExpenses]: [],
        [UserFields.Groups]: [],
        [UserFields.Savings]: []
    },
    1001: {
        [EntityWithIdFields.Id]: 1001,
        [UserFields.Name]: 'Debora Saldos',
        [UserFields.Friends]: [0, 1000, 1002, 1003],
        [UserFields.Mail]: 'dsaldos@fi.uba.ar',
        [UserFields.Password]: 'saldos',
        [UserFields.PersonalExpenses]: [],
        [UserFields.Groups]: [],
        [UserFields.Savings]: []
    },
    1002: {
        [EntityWithIdFields.Id]: 1002,
        [UserFields.Name]: 'Jazmin Grezhos',
        [UserFields.Friends]: [0, 1000, 1001, 1003],
        [UserFields.Mail]: 'jgrezhos@fi.uba.ar',
        [UserFields.Password]: 'grezhos',
        [UserFields.PersonalExpenses]: [],
        [UserFields.Groups]: [],
        [UserFields.Savings]: []
    },
    1003: {
        [EntityWithIdFields.Id]: 1003,
        [UserFields.Name]: 'Camila Presta',
        [UserFields.Friends]: [0, 1000, 1001, 1002],
        [UserFields.Mail]: 'cpresta@fi.uba.ar',
        [UserFields.Password]: 'presta',
        [UserFields.PersonalExpenses]: [],
        [UserFields.Groups]: [],
        [UserFields.Savings]: []
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
    if (!dataUsers.names) {
        return false
    }
    return mail in dataUsers.names
}

export const isTruePassword = (truePassword: string, inputPassword: string) => {
    return truePassword === inputPassword
}
