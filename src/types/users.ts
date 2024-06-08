import { EntityWithId } from './baseEntities'

export enum UserFields {
    Name = 'nombre',
    Friends = 'amigos',
    Mail = 'mail',
    Password = 'contrasenia',
    PersonalExpenses = 'movimientosPersonales',
    Groups = 'grupos',
    Savings = 'ahorros'
}

export interface User extends EntityWithId {
    [UserFields.Name]: string
    [UserFields.Friends]: number[]
    [UserFields.Mail]: string
    [UserFields.Password]: string
    [UserFields.PersonalExpenses]: number[]
    [UserFields.Groups]: number[]
    [UserFields.Savings]: number[]
}
