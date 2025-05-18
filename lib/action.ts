"use server";
import { ActionResponse, Contact } from "@/types"
import { contact_form_schema } from "./schema";
import { createTransport } from "nodemailer";

export default async function sendData(prevState: ActionResponse<Contact>, formData: FormData): Promise<ActionResponse<Contact>>{
    const rawData = {
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        tel: formData.get("tel"),
        message: formData.get("message"),
        naposledy: formData.get("naposledy"),
        birth: formData.get("birth"),
    }
console.log(rawData)
    const {data, success,error} = contact_form_schema.safeParse(rawData);
console.log(data, success, error)
    if(error || !success){
        return{
            success: false,
            message: "Špatně zadané údaje / Bad details!",
        submitted: true,
        errors: error.flatten().fieldErrors,
        inputs: data
        }
    }

    const smtp = createTransport({
        service: "gmail",
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        }
      });
    const sentMail = await smtp.sendMail({
        subject: "Nová zpáva z portfolio webu",
        from: process.env.FROM_EMAIL,
        to: "adam.hitzger@icloud.com",
        text: `Celé jméno: ${data.name} ${data.surname},\n E-mail: ${data.email},\n Tel. číslo: ${data.tel},\n Zpráva: ${data.message}, Vyšetření: ${data.naposledy}, Datum narození: ${new Intl.DateTimeFormat("cs-CZ").format(data.birth)}\n`
    })

    if(!sentMail.accepted){
        return{
            success: false,
            message: "Nepodařilo se zaslat zpávu / Can\'t send message",
        submitted: true,
        inputs: data
        }
    }
    return{
        success: true,
        message: "Zpráva odeslána / message sent!",
        submitted: true,
    }
}