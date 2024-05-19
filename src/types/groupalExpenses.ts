import { EntityWithId } from './baseEntities'
import { User } from './users'

export enum GroupFields {
    Name = 'nombre',
    Description = 'descripcion',
    Members = 'integrantes',
    Image = 'imagen'
}

export interface Group extends EntityWithId {
    [GroupFields.Name]: string
    [GroupFields.Description]: string
    [GroupFields.Members]: User[]
    [GroupFields.Image]?: File
}
