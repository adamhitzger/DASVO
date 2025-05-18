

import { defineType } from "sanity";


export const personal = defineType({
    name: "personal",
    title: "Projekty",
    type: "object",
    fields: [
      
        {
          name: "name",
          type: "string",
          title: "Jméno"
        },
        {
          name: "isLekar",
          type: "boolean",
          title: "Je lékař?"
        },
        {
          name: "about",
          type: "string",
          title: "Popis"
        }
      
    
    ]
})
