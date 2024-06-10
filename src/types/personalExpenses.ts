import { EntityWithId } from './baseEntities'

export enum ExpensesInterfaceFields {
    Title = 'titulo',
    Description = 'descripcion',
    Image = 'imagen',
    Amount = 'monto',
    IsExpense = 'esGasto',
    Date = 'fecha',
    Recurrence = 'recurrencia',
    Priority = 'prioridad'
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

export enum PriorityType {
    Essential = 'Imprescindible',
    High = 'Alta',
    Medium = 'Media',
    Low = 'Baja',
    Disposable = 'Descartable'
}

export interface ExpensesInterface extends EntityWithId {
    [ExpensesInterfaceFields.Title]: string
    [ExpensesInterfaceFields.Description]: string
    [ExpensesInterfaceFields.Image]?: string | ArrayBuffer | null
    [ExpensesInterfaceFields.Amount]?: number
    [ExpensesInterfaceFields.IsExpense]: ExpenseType
    [ExpensesInterfaceFields.Date]: Date
    [ExpensesInterfaceFields.Priority]?: PriorityType
    [ExpensesInterfaceFields.Recurrence]: RecurrenceType
}
