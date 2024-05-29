import { Group } from '@/types/groupalExpenses'
import { ExpensesInterface } from '@/types/personalExpenses'
import { User } from '@/types/users'

type Data<T> = { [key: number]: T }

type DB<T> = { storageKey: string; id: number; len: number; data: Data<T> }

const PERSONAL_EXP_KEY = 'PersonalExp'
const GROUPS_KEY = 'Groups'
const USER_KEY = 'Users'

function dateReviver(key: string, value: string) {
    if (key === 'fecha') {
        return new Date(value)
    }
    return value
}

export const loadData = (key: string): DB<any> => {
    const savedData = window.localStorage.getItem(key)
    if (savedData) {
        return JSON.parse(savedData, dateReviver)
    }
    return { storageKey: key, id: 0, len: 0, data: {} }
}

export const storeData = <T>(db: DB<T>) => {
    window.localStorage.setItem(db.storageKey, JSON.stringify(db))
}

export const saveNewData = <T>(db: DB<T>, id: number, newData: T) => {
    db.data[id] = newData
    db.id += 1
    db.len += 1

    storeData(db)
}

export const updateData = <T>(db: DB<T>, id: number, newData: T) => {
    if (id in db.data) {
        db.data[id] = newData

        storeData(db)
    }
}

export const removeData = <T>(db: DB<T>, id: number) => {
    if (id in db.data) {
        delete db.data[id]
        db.len -= 1

        storeData(db)
    }
}

const loadedPersonalExpenses = loadData(PERSONAL_EXP_KEY)
const loadedGroups = loadData(GROUPS_KEY)
const loadedUsers = loadData(USER_KEY)

export var dataPersonalExpenses: DB<ExpensesInterface> = {
    storageKey: PERSONAL_EXP_KEY,
    id: loadedPersonalExpenses.id,
    len: loadedPersonalExpenses.len,
    data: loadedPersonalExpenses.data
}

export var dataGroups: DB<Group> = {
    storageKey: GROUPS_KEY,
    id: loadedGroups.id,
    len: loadedGroups.len,
    data: loadedGroups.data
}

export var dataUsers: DB<User> =
    loadedUsers.id !== 0
        ? {
              storageKey: USER_KEY,
              id: loadedUsers.id,
              len: loadedUsers.len,
              data: loadedUsers.data
          }
        : {
              storageKey: USER_KEY,
              id: 5,
              len: 5,
              data: loadedUsers.data
          }
