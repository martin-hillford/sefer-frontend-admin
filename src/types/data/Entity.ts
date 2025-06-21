export type Entity<T> = T & {
    id : number | string,
}

export type NamedEntity = Entity<Named>

type Named = {
    name : string
}