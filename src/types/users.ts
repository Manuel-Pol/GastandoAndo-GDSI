import { EntityWithId } from './baseEntities'

export enum UserFields {
    Name = 'nombre'
}

export interface User extends EntityWithId {
    [UserFields.Name]: string
}
