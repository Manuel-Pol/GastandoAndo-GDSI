import { ExpensesInterface } from '@/types/personalExpenses'
import { DB, loadData } from './Data'

const PERSONAL_EXP_KEY = 'PersonalExp'

const loadedPersonalExpenses = loadData(PERSONAL_EXP_KEY)

export var dataPersonalExpenses: DB<ExpensesInterface> = {
    storageKey: PERSONAL_EXP_KEY,
    id: loadedPersonalExpenses.id,
    len: loadedPersonalExpenses.len,
    data: loadedPersonalExpenses.data
}
