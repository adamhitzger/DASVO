import { type SchemaTypeDefinition } from 'sanity'
import { homepage } from './homepage'
import { personal } from './personal'
import { cenik, pojistovny } from './cenik'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, personal, pojistovny, cenik],
}
