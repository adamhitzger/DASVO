

import { defineType } from "sanity";


export const cenik = defineType({
    name: "cenik",
    title: "Ceník",
    type: "object",
    fields: [
      
        {
          name: "name",
          type: "string",
          title: "Název služby"
        },
        {
          name: "price",
          type: "number",
          title: "Cena"
        },

    ]
})

export const pojistovny = defineType({
    name: "pojistovny",
    title: "Pojištovny",
    type: "object",
    fields: [
      
        {
          name: "name",
          type: "string",
          title: "Název pojištovny"
        },
        {
          name: "code",
          type: "number",
          title: "Kód pojištovny"
        },

    ]
})