

export enum EntityWithIdFields {
    Id = 'id'
}


export interface EntityWithId {
    [EntityWithIdFields.Id]: number
}