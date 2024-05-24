import { EntityWithId, EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from './baseEntities'
import { ExpensesInterface } from './personalExpenses'

export enum GroupFields {
    Name = 'nombre',
    Description = 'descripcion',
    Members = 'integrantes',
    Movements = 'movimientos',
    Image = 'imagen'
}

export interface Group extends EntityWithId {
    [GroupFields.Name]: string
    [GroupFields.Description]: string
    [GroupFields.Members]: EntityWithIdAndDescription[],
    [GroupFields.Movements]: ExpensesInterface[],
    [GroupFields.Image]?: File
}

export const defaultFriends: EntityWithIdAndDescription[] = [
    {[EntityWithIdFields.Id]: 1, [EntityWithIdAndDescriptionFields.Description]: 'Kross'}, 
    {[EntityWithIdFields.Id]: 2, [EntityWithIdAndDescriptionFields.Description]: 'Valverde'},
    {[EntityWithIdFields.Id]: 3, [EntityWithIdAndDescriptionFields.Description]: 'Militao'},
    {[EntityWithIdFields.Id]: 4, [EntityWithIdAndDescriptionFields.Description]: 'Rodrygo'},
    {[EntityWithIdFields.Id]: 5, [EntityWithIdAndDescriptionFields.Description]: 'Courtois'},
    {[EntityWithIdFields.Id]: 6, [EntityWithIdAndDescriptionFields.Description]: 'Carvajal'},
    {[EntityWithIdFields.Id]: 7, [EntityWithIdAndDescriptionFields.Description]: 'Modric'},
    {[EntityWithIdFields.Id]: 8, [EntityWithIdAndDescriptionFields.Description]: 'Mbappe'}
]