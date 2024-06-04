import { Progress } from '@radix-ui/react-progress'
import { EntityWithUserId } from './baseEntities'

export enum SavingsFields {
    Title = 'titulo',
    Description = 'descripcion',
    Amount = 'monto',
    DateObjective = 'fechaObjetivo',
    DateStart = 'fechaInicio',
    Progress = 'progreso'
}

export enum ProgressFields {
    Date = 'fecha',
    Amount = 'monto'
}
export interface Progress {
    [ProgressFields.Amount]: number
    [ProgressFields.Date]: Date
}

export interface Savings extends EntityWithUserId {
    [SavingsFields.Title]: string
    [SavingsFields.Description]: string
    [SavingsFields.Amount]: number
    [SavingsFields.DateObjective]: Date
    [SavingsFields.DateStart]: Date
    [SavingsFields.Progress]: Progress[]
}
