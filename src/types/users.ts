import { EntityWithId } from './baseEntities'

export enum UserFields {
    Name = 'nombre',
    Friends = 'amigos',
    Mail = 'mail',
    Password = 'contrasenia'
}

export interface User extends EntityWithId {
    [UserFields.Name]: string
    [UserFields.Friends]: number[]
    [UserFields.Mail]: string
    [UserFields.Password]: string
}
