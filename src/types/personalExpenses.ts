import { EntityWithId } from './baseEntities'

export enum ExpensesInterfaceFields {
    Title = 'titulo',
    Description = 'descripcion',
    Image = 'imagen',
    Amount = 'monto',
    IsExpense = 'esGasto',
    Date = 'fecha',
    Recurrence = 'codRecurrencia'
}

export enum ExpenseType {
    Gasto = 'gasto',
    Ingreso = 'ingreso'
}

export enum RecurrenceTypeCodes {
    Quarter = 1,
    Monthly = 2,
    Weekly = 3,
    Diary = 4,
    Singular = 5
}

export interface ExpensesInterface extends EntityWithId {
    [ExpensesInterfaceFields.Title]: string
    [ExpensesInterfaceFields.Description]: string
    [ExpensesInterfaceFields.Image]?: File
    [ExpensesInterfaceFields.Amount]?: number
    [ExpensesInterfaceFields.IsExpense]: ExpenseType
    [ExpensesInterfaceFields.Date]: Date
    [ExpensesInterfaceFields.Recurrence]: RecurrenceTypeCodes
}
