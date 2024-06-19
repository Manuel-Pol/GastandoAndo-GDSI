import { Savings } from '@/types/savings'
import { DB, loadData } from './Data'

const SAVING_KEY = 'Savings'

const loadedSavings = loadData(SAVING_KEY)

export var dataSavings: DB<Savings> = {
    storageKey: SAVING_KEY,
    id: loadedSavings.id,
    len: loadedSavings.len,
    data: loadedSavings.data,
    names: loadedSavings.names
}
