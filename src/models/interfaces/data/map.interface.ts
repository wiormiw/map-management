interface Map {
  readonly id: string 
  readonly map_name: string
  readonly sources: string
  readonly created_at: Date
  readonly updated_at: Date
}

type MapInterface = Map

export {
  MapInterface,
}