import { EntityWithId } from "./baseEntities";


export enum GroupFields {
    Name = 'nombre',
    Description = 'descripcion'
}


export interface Group extends EntityWithId {
    [GroupFields.Name]: string,
    [GroupFields.Description]: string
}

