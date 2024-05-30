import {
    EntityWithId,
    EntityWithIdAndDescription,
    EntityWithIdAndDescriptionFields,
    EntityWithIdFields
} from './baseEntities'

export enum GroupFields {
    Name = 'nombre',
    Description = 'descripcion',
    Members = 'integrantes',
    Expenses = 'gastos',
    Image = 'imagen'
}

export enum GroupExpensesInterfaceFields {
    Title = 'titulo',
    Description = 'descripcion',
    Amount = 'monto',
    Payer = 'pagador',
    Debtors = 'deudores',
    Date = 'fecha'
}

export interface Group extends EntityWithId {
    [GroupFields.Name]: string
    [GroupFields.Description]: string
    [GroupFields.Members]: EntityWithIdAndDescription[]
    [GroupFields.Expenses]: GroupExpensesInterface[]
    [GroupFields.Image]?: string | ArrayBuffer | null
}

export const defaultFriends: EntityWithIdAndDescription[] = [
    { [EntityWithIdFields.Id]: 1, [EntityWithIdAndDescriptionFields.Description]: 'Renzo Redeuda' },
    { [EntityWithIdFields.Id]: 2, [EntityWithIdAndDescriptionFields.Description]: 'Debora Saldos' },
    { [EntityWithIdFields.Id]: 3, [EntityWithIdAndDescriptionFields.Description]: 'Jazmin Grezhos' },
    { [EntityWithIdFields.Id]: 4, [EntityWithIdAndDescriptionFields.Description]: 'Camila Presta' }
]

export interface GroupExpensesInterface extends EntityWithId {
    [GroupExpensesInterfaceFields.Title]: string
    [GroupExpensesInterfaceFields.Description]: string
    [GroupExpensesInterfaceFields.Amount]?: number
    [GroupExpensesInterfaceFields.Payer]: string
    [GroupExpensesInterfaceFields.Debtors]: EntityWithIdAndDescription[]
    [GroupExpensesInterfaceFields.Date]: Date
}
