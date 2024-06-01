import { EntityWithId } from './baseEntities'

export enum SavingsFields {
    Title = 'titulo',
    Description = 'descripcion',
    Amount = 'monto',
    DateObjective = 'fechaObjetivo',
    DateStart = 'fechaInicio'
}

export interface Savings extends EntityWithId {
    [SavingsFields.Title]: string
    [SavingsFields.Description]: string
    [SavingsFields.Amount]: number
    [SavingsFields.DateObjective]: Date
    [SavingsFields.DateStart]: Date
}
