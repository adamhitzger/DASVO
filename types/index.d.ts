import { contact_form_schema } from "@/lib/schema"
import { z } from "zod"

export interface Personal {
  name: string
  isLekar: boolean
  about: string
}

export interface Cenik {
  name: string
  price: number
}

export interface Pojistovny {
  name: string
  code: number
}

export interface ActionResponse<T> {
    success: boolean
    message: string;
    submitted: boolean;
    errors?: {
        [K in keyof T]?: string[];
      };
    inputs?: T 
  }

export interface Homepage {
  announcement: string
  headerText: any
  aboutText: any
  headerPicture: string
  aboutPicture: string
  personal: Personal[]
  prices: Cenik[] // opravena chyba: v Sanity jsi měl `of: [ { type: "string" }, { type: "number" } ]`, což je neplatné
  pojistne: Pojistovny[],
  ordinacniDoba: any,
  ordinacniHodiny: any,
}

export type Contact = z.infer<typeof contact_form_schema>