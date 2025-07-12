import { defineType, defineField } from "sanity";


export const homepage = defineType({
    name: "homepage",
    title: "Projekty",
    type: "document",
    fields: [
        defineField({
            name: "announcement",
            title: "Oznámení",
            type: "string",
        }),
        defineField({
            name: "headerText",
            title: "Text 1. sekce",
            type: "array",
            of: [
                {type:"block"}
            ]
        }),
        defineField({
            name: "aboutText",
            title: "Text sekce O nás",
             type: "array",
            of: [
                {type:"block"}
            ]
        }),
        defineField({
            name: "headerImage",
            title: "Obrázek 1. sekce",
            type: "image",
        }),
        defineField({
            name: "aboutImage",
            title: "Obrázek sekce O nás",
            type: "image",
        }),
        defineField({
            name: "video",
            title: "Zadejte video",
            type: "file",
        }),
        defineField({
            name: "personal",
            title: "Personál",
            type: "array",
            of: [
               {type: "personal"}
            ]
        }),
        defineField({
            name: "prices",
            title: "Ceník",
            type: "array",
            of: [
               {type: "cenik"} ,
            ]
        }),
        defineField({
            name: "pojistne",
            title: "Pojištovny",
            type: "array",
            of: [
               {type: "pojistovny"}
            ]
        }),
        defineField({
            name: "ordinacniDoba",
            title: "Ordinační Hodiny",
             type: "array",
            of: [
                {type:"block"}
            ]
        }),
        defineField({
            name: "ordinacniHodiny",
            title: "Změna ordinacni doby",
             type: "array",
            of: [
                {type:"block"}
            ]
        }),
    ]
})