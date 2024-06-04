import { EntityWithUserId } from './baseEntities'

export enum ExpensesInterfaceFields {
    Title = 'titulo',
    Description = 'descripcion',
    Image = 'imagen',
    Amount = 'monto',
    IsExpense = 'esGasto',
    Date = 'fecha',
    Recurrence = 'recurrencia'
}

export enum ExpenseType {
    Gasto = 'Gasto',
    Ingreso = 'Ingreso'
}

export enum RecurrenceType {
    Quarter = 'Trimestral',
    Monthly = 'Mensual',
    Weekly = 'Semanal',
    Diary = 'Diario',
    Singular = 'No recurrente'
}

export interface ExpensesInterface extends EntityWithUserId {
    [ExpensesInterfaceFields.Title]: string
    [ExpensesInterfaceFields.Description]: string
    [ExpensesInterfaceFields.Image]?: string | ArrayBuffer | null
    [ExpensesInterfaceFields.Amount]?: number
    [ExpensesInterfaceFields.IsExpense]: ExpenseType
    [ExpensesInterfaceFields.Date]: Date
    [ExpensesInterfaceFields.Recurrence]: RecurrenceType
}
