import { EntityWithId } from './baseEntities'

export enum GroupFields {
    Name = 'nombre',
    Description = 'descripcion',
    Members = 'integrantes',
    Image = 'imagen'
}

export interface Group extends EntityWithId {
    [GroupFields.Name]: string
    [GroupFields.Description]: string
    [GroupFields.Members]: string[]
    [GroupFields.Image]?: File
}
