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
    [GroupFields.Members]: GroupMember[]
    [GroupFields.Expenses]: GroupExpensesInterface[]
    [GroupFields.Image]?: string | ArrayBuffer | null
}

export enum GroupMemberFields {
    Amount = 'monto'
}


export interface GroupMember extends EntityWithIdAndDescription {
    [GroupMemberFields.Amount]: number
}

export const defaultFriends: GroupMember[] = [
    { [EntityWithIdFields.Id]: 1000, [EntityWithIdAndDescriptionFields.Description]: 'Renzo Redeuda', [GroupMemberFields.Amount]: 0 },
    { [EntityWithIdFields.Id]: 1001, [EntityWithIdAndDescriptionFields.Description]: 'Debora Saldos', [GroupMemberFields.Amount]: 0 },
    { [EntityWithIdFields.Id]: 1002, [EntityWithIdAndDescriptionFields.Description]: 'Jazmin Grezhos', [GroupMemberFields.Amount]: 0 },
    { [EntityWithIdFields.Id]: 1003, [EntityWithIdAndDescriptionFields.Description]: 'Camila Presta' , [GroupMemberFields.Amount]: 0}
]

export interface GroupExpensesInterface extends EntityWithId {
    [GroupExpensesInterfaceFields.Title]: string
    [GroupExpensesInterfaceFields.Description]: string
    [GroupExpensesInterfaceFields.Amount]?: number
    [GroupExpensesInterfaceFields.Payer]: GroupMember
    [GroupExpensesInterfaceFields.Debtors]: GroupMember[]
    [GroupExpensesInterfaceFields.Date]: Date
}
