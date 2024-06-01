import { EntityWithId } from './baseEntities'

export enum SavingsFields {
    Title = 'titulo',
    Description = 'descripcion',
    Amount = 'monto',
    Date = 'fecha'
}

export interface Savings extends EntityWithId {
    [SavingsFields.Title]: string
    [SavingsFields.Description]: string
    [SavingsFields.Amount]: number
    [SavingsFields.Date]: Date
}
