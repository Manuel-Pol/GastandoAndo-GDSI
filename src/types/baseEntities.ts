export enum EntityWithIdFields {
    Id = 'id'
}

export interface EntityWithId {
    [EntityWithIdFields.Id]: number
}

export enum EntityWithIdAndDescriptionFields {
    Description = 'descripcion'
}

export interface EntityWithIdAndDescription extends EntityWithId {
    [EntityWithIdAndDescriptionFields.Description]: string
}

export enum EntityWithUserIdFields {
    UserId = 'usuario'
}

export interface EntityWithUserId extends EntityWithId {
    [EntityWithUserIdFields.UserId]: number
}
