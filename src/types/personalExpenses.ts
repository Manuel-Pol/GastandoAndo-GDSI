import { EntityWithId } from './baseEntities'

export enum ExpensesInterfaceFields {
    Title = 'titulo',
    Description = 'descripcion',
    Image = 'imagen',
    Amount = 'monto',
    IsExpense = 'esGasto',
    Date = 'fecha',
    Frequency = 'codFrecuencia'
}

export enum ExpenseType {
    Gasto = 'gasto',
    Ingreso = 'ingreso'
}

export enum FrequencyTypeCodes {
    Quarter = 1,
    Monthly = 2,
    Weekly = 3,
    Diary = 4,
    Singular = 5
}

export interface ExpensesInterface extends EntityWithId {
    [ExpensesInterfaceFields.Title]: string
    [ExpensesInterfaceFields.Description]: string
    [ExpensesInterfaceFields.Image]?: string
    [ExpensesInterfaceFields.Amount]?: number
    [ExpensesInterfaceFields.IsExpense]: ExpenseType
    [ExpensesInterfaceFields.Date]: Date
    [ExpensesInterfaceFields.Frequency]: FrequencyTypeCodes
}
