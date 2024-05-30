export type Data<T> = { [key: number]: T }

export type DB<T> = { storageKey: string; id: number; len: number; data: Data<T>; names?: { [key: string]: number } }

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

export const saveNewData = <T>(db: DB<T>, id: number, newData: T, name?: string) => {
    if (name && db.names) {
        db.names[name] = id
    }
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
