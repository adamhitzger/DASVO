import * as z from "zod"

const phoneRegex = new RegExp(/^((\+420 ?)?\d{3} ?\d{3} ?\d{3}|(\+44 ?7\d{3}|\(?07\d{3}\)?) ?\d{3} ?\d{3})$/)
export const contact_form_schema = z.object({
    name: z.string({
        invalid_type_error: "Špatně zadané jméno",
        required_error: "Jméno je povinné",
    })
    .min(3, {message: "Jméno je moc krátké "})
    .max(25, {message: "Jméno je moc dlouhé"})
    .trim(),
    surname: z.string({
        invalid_type_error: "Špatně zadané jméno",
        required_error: "Jméno je povinné",
    })
    .min(3, {message: "Jméno je moc krátké "})
    .max(25, {message: "Jméno je moc dlouhé"})
    .trim(),
    email: z.string({
        invalid_type_error: "Špatně zadané E-mail",
        required_error: "E-mail je povinný",
    })
    .email()
    .min(5, {message: "E-mail je moc krátký"})
    .trim(),
    tel: z.string({
        invalid_type_error: "Špatně zadané tel. číslor",
        required_error: "Zel. číslo je povinný",
    })
    .min(9,{message: "Tel. číslo je krátké"})
    .trim()
    .regex(phoneRegex, {message: "Špatný formát tel. čísl"}),
    message: z.string({
        invalid_type_error: "Špatně zadaná zpráva",
        required_error: "Zpráva je povinná",
    })
    .trim()
    .min(2, {message: "Zpráva je krátká"})
    .max(120, {message: "Zpráva je dlouhá"}),
    naposledy: z.string({
        required_error: "Pole je povinné",
    })
    .trim(),
    birth: z.string({
        required_error: "Pole je povinné",
    }).trim().transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Neplatné datum",
    }),
})