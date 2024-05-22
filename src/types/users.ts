import { EntityWithId, EntityWithIdAndDescription } from './baseEntities'

export enum UserFields {
    Name = 'nombre',
    Friends = 'amigos'
}

export interface User extends EntityWithId {
    [UserFields.Name]: string
    [UserFields.Friends]: EntityWithIdAndDescription[]
}
