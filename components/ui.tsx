"use client"

import Map, {Marker} from "react-map-gl/mapbox"
import 'mapbox-gl/dist/mapbox-gl.css';
import { Contact, Homepage } from "@/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useActionState } from "react";
import {motion, AnimatePresence} from "motion/react"
import { Loader2, X } from "lucide-react";
import { ActionResponse } from "@/types";
import sendData from "@/lib/action";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import toast from "react-hot-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import fifth from "../public/fifth.json"
import fourth from "../public/fourth.json"
import third from "../public/third.json"
import second from "../public/second.json"
import first from "../public/first.json"
import sixth from "../public/sixth.json"
import dynamic from 'next/dynamic';
import { components } from "@/sanity/lib/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const actionState: ActionResponse<Contact> = {
    success: false,
    message: "",
    submitted: false,
}

export default function UI({data}: {data: Homepage}){
    const anRef = useRef<HTMLDivElement>(null)
    const [an, setAn] = useState<boolean>(true)
    const lng=15.5715228;
    const lat=49.6106889;
    const zoom=16;
    const [state, action, isPending] = useActionState(sendData, actionState)
    useEffect(() => {
        if (!state.success && state.message) {
            toast.error(state.message);
        }else if(state.success && state.message){
            toast.success(state.message);
            
        }
    }, [state.success, state.message]);  
    useEffect(() => {
        function handleMouseOutside(e: MouseEvent | TouchEvent){
            if(
                anRef.current &&
                !anRef.current.contains(e.target as Node)
            ){
                setAn(false)
            }
        }

        document.addEventListener("mousedown", handleMouseOutside);
        document.addEventListener("touchstart", handleMouseOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleMouseOutside);
            document.removeEventListener("touchstart", handleMouseOutside);   
        }
    }, [])
    const list = [
            {
                animation: second,
                text: "Založení karty, změření krevního tlaku, pulzu, výšky a váhy"
            },
            {
                animation: fourth,
                text: "Vyšetření dechu spirometrem, popř. přístrojem na analýzu vydechovaného oxidu dusnatého, vyšetření stupně okysličení krve."
            },
            {
                animation: third,
                text: "Provedení kožních testů na předloktí k určení alergické přecitlivělosti"
            },
            {
                animation: first,
                text: "Podrobný rozhovor s pacientem. U dětských pacientů s jejich rodiči. Fyzikální vyšetření."
            },
            {
                animation: fifth,
                text: "Odběry krve"
            },
            {
                animation: sixth,
                text: "Zhodnocení výsledků vyšetření, doporučení medikace a režimových, případně dietologických, opatření."
            }
        ]
        const lekari = data.personal.filter(l => l.isLekar);
        const sestry = data.personal.filter(l => !l.isLekar);
    console.log(data)
    return(
        <main className="flex flex-col min-h-screen items-center space-y-5">
        <section className="w-full p-8 flex flex-col gap-5 md:flex-row bg-foreground text-white">
            <div className="flex flex-col w-full md:w-1/2 space-y-4 justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-center">Alergologická ambulance</h1>
                    <h2 className="text-3xl md:text-5xl font-bold text-center">DASVO s.r.o.</h2>
                    <div className="p-3 text-sm md:text-lg rounded-xl bg-white/50 backdrop-blur-3xl text-black">
                        <PortableText value={data.headerText} components={components}/>
                    </div>
                    <Link href={"/kontakt"} className=" text-xl font-semibold py-2 px-7 w-fit text-black bg-white mx-auto rounded-xl">
            Objednat
        </Link> 
            </div>
            <Image src={data.headerPicture} alt="Alergologická ordinace DASVO s.r.o" width={544} height={544} className="rounded-2xl w-full md:w-1/2"/>
        </section>
        <section className="w-full p-8 flex flex-col gap-5 md:flex-row-reverse bg-white  text-black">
            <div className="flex flex-col w-full md:w-1/2 space-y-4 justify-center">
                    <h1 className="text-right text-4xl md:text-6xl font-bold underline underline-offset-8 decoration-wavy decoration-3 decoration-foreground">O nás</h1>
                    <div className="text-left p-3 text-sm md:text-lg rounded-xl bg-white/50 backdrop-blur-3xl ">
                        <PortableText value={data.aboutText} components={components}/>
                    </div>
            </div>
            <div className="w-full  sm:w-1/2">
                <Image src={data.aboutPicture} alt="Alergologická  ordinace DASVO s.r.o" width={204} height={204} className="rounded-3xl rounded-bl-[80px] rounded-tr-[80px] w-full m-auto md:w-full"/>
            </div>
            
        </section>
         <section className="w-full p-8 flex flex-col items-center gap-5 bg-white text-center text-black">
            <h1 className="text-4xl md:text-6xl font-bold underline underline-offset-2 decoration-wavy decoration-3 decoration-foreground">Personál</h1>
          <div className="flex flex-row space-x-3">
            <Image
            src="/doctor.svg"
            alt="Lékaři"
            width={44}
            height={44}
            />
           <h2 className="text-2xl md:text-3xl font-bold underline underline-offset-2 decoration-wavy decoration-3 decoration-foreground">Lékaři</h2>
            </div>
            <div className="w-full grid grid-cols-2  justify-items-center gap-5">
                 
                {lekari.map((l,i) => (
                    <div key={i} className="bg-gray-200 h-fit sm:w-2/3 border p-2 rounded-xl backdrop-blur-3xl flex flex-col my-auto">
                      <span className="text-xl font-bold">{l.name}</span> 
                      <i>{l.isLekar ? "Lékař ISO 7010" : "Diplomovaná zdravotní sestra"}</i> 
                    <p className="font-light">
                    {l.about}
                    </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-row space-x-3">
            <Image
            src="/doctorf.svg"
            alt="Zdravotní sestry"
            width={44}
            height={44}
            />
            <h2 className="text-2xl md:text-3xl font-bold underline underline-offset-2 decoration-wavy decoration-3 decoration-foreground">Zdravotní sestry
            </h2>
             </div>
            <div className="w-full grid grid-cols-3 justify-items-center gap-5">
                 
                {sestry.map((l,i) => (
                    <div key={i} className="bg-gray-200 h-fit md:w-2/3 border p-2 rounded-xl backdrop-blur-3xl flex flex-col my-auto">
                      <span className="text-xl font-bold">{l.name}</span> 
                      <i>{l.isLekar ? "Lékař ISO 7010" : "Diplomovaná zdravotní sestra"}</i> 
                    <p className="font-light">
                    {l.about}
                    </p>
                    </div>
                ))}
            </div>
            
         </section>
                 <section className="w-full p-8 flex flex-col gap-5 bg-white text-center text-black">
            <h1 className="text-4xl md:text-6xl font-bold underline underline-offset-2 decoration-wavy decoration-3 decoration-foreground">Jak probíhá 1. vyšetření ?</h1>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify-items-center gap-5">
                {list.map((l,i) => (
                    <div key={i} className=" flex flex-col items-center">
                        <div className="w-fit h-fit rounded-full p-4 bg-foreground">
                        <Lottie 
	    options={{
            loop: true,
            autoplay: true,
      animationData: l.animation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
        }}
        height={80}
        width={80}
      />
      </div>
      <p>
        {l.text}
      </p>
                    </div>
                ))}
            </div>
            <ul className="list-disc mx-auto">
                <li>Před prvním vyšetřením <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">vysaďte</span>, prosím, léky užívané k léčbě alergie jako jsou Zyrtec, Zodac, Claritine, Aerius, Dithiaden a další na dobu <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">minimálně 5 dní.</span> ideálně 2 týdny před vyšetřením být bez infekční nemoci</li>
               <li> První vyšetření v naší ambulaci trvá cca 45-60 minut. <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">Doporučení</span> s výpisem dosud provedených vyšetření od praktického lékaře či specialisty <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">vyžadujeme</span>, jelikož se tak urychlí diagnostika a léčba Vašich potíží.</li>
                <li>Po příchodu do čekárny je nutné použít Váš průkaz Zdravotní pojišťovny v terminálu k sestře a na displeji je nutné zadat kolonku <span className="underline underline-offset-2 decoration-wavy decoration-1   decoration-foreground font-bold">Nový, Přešetření</span>.</li>
            </ul>
         </section>
        <section className="w-full p-8 flex flex-col gap-5 sm:flex-row bg-white text-right text-black">
            <div className="flex flex-col w-full sm:w-1/2 justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-left">Ceník</h1>
                    <h2 className="text-xl font-medium underline text-left underline-offset-2 decoration-wavy decoration-1 decoration-foreground">nehrazených zdravotní pojišťovnou</h2>
                    
                    <div className="p-3 text-sm md:text-lg my-3 bg-gray-300 rounded-xl border text-center  grid grid-cols-2 ">
                        <div className=" text-xl bg-gray-300 py-2 border-b-white border-b-4 border-r-white border-r-4">
                        Služba
                        </div>
                        <div className=" text-xl bg-gray-300 py-2 border-b-white border-b-4">
                        Cena
                        </div>
                        {data.prices.map((p,i) => (
                            <div key={i} className="col-span-2 flex flex-row">
                            <div key={i} className="w-1/2 bg-gray-300 py-2 border-b-white border-b-4 border-r-white border-r-4">
                        {p.name}
                        </div>
                        <div className="w-1/2 font-bold text-lg bg-gray-300 py-2 border-b-white border-b-4">
                        {p.price} Kč
                        </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center">Přijímáme pouze platby v <span className="font-bold underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground">hotovosti!</span></p>
            </div>
            <div className="w-full flex flex-col sm:w-1/2">
                 <h1 className="text-4xl md:text-6xl font-bold underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground">Smluvní pojišťovny</h1>
                    
                    <div className="p-3 text-sm md:text-lg my-3 bg-gray-300 rounded-xl border text-center  grid grid-cols-2 ">
                        <div className=" text-xl bg-gray-300 py-2 border-b-white border-b-4 border-r-white border-r-4">
                        Pojišťovna
                        </div>
                        <div className=" text-xl bg-gray-300 py-2 border-b-white border-b-4">
                        Kód
                        </div>
                        {data.pojistne.map((p,i) => (
                            <div key={i} className="col-span-2 flex flex-row">
                            <div  className="w-1/2  bg-gray-300 py-2 border-b-white border-b-4 border-r-white border-r-4">
                        {p.name}
                        </div>
                        <div className="w-1/2 font-bold text-lg bg-gray-300 py-2 border-b-white border-b-4">
                        {p.code}
                        </div>
                            </div>
                        ))}
                    </div>
            </div>
            
        </section>
        <section id="kontakt" className="w-full text-black flex flex-col md:flex-row gap-5 p-5">
            <div className="w-full md:w-1/2 space-y-3">
                <h1 className="font-bold  text-5xl md:text-6xl my-4 underline underline-offset-8 decoration-wavy decoration-3 decoration-foreground">Kontakt</h1>
                <p className="text-lg">
                    Objednat se můžete skrze formulář níže nebo telefonicky na čísle <Link href={"mailto:sestra@dasvo.cz"} className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">sestra@dasvo.cz</Link> (nezapomínejte uvést jméno, příjmení, celé datum narození) nebo telefonicky na čísle <Link href={"tel:569434375"} className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">569 434 375</Link> v průběhu ordinačních hodin (nejlépe mezi 11-13 hodinou, úterý až pátek).
                Pokud jste v naší ambulanci dosud nebyli vyšetřeni, bude Vás sestra telefonicky kontaktovat k doplnění údajů.
                Vystavení e-receptů na JIŽ ordinovaná léčiva je nutné řešit <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">pouze</span>  se sestrou na e-mailu <Link href={"mailto:sestra@dasvo.cz"} className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">sestra@dasvo.cz</Link>, telefonické objednávky omezte, prosím, na minimum !
Konzultace zdravotního stavu s lékařem na e-mailu: <Link href={"mailto:lekar@dasvo.cz"} className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">lekar@dasvo.cz</Link>, vždy uveďte jméno lékaře, který o Vás pečuje a nezapomínejte uvést i jméno, příjmení, celé datum narození.

Nepoužívejte e-mail: <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">alergologiehb@quick.cz</span> od 1.7.2025 nebudeme tyto zprávy vyřizovat !
<span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">Upozorňujeme:</span> konzultace nabízíme pouze pacientům, kteří jsou u nás registrováni!
</p>
                 <form action={action} className=" text-black grid grid-cols-1 text-lg sm:grid-cols-2  w-full gap-5 ">
                <div className='flex flex-col w-full space-y-2'>
                    <Label>Jméno:</Label>
                    <Input name="name" type="text" defaultValue={state.inputs?.name} placeholder={"Zadejte jméno"} required disabled={isPending} />
                    {state?.errors?.name && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.name}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>Přijmení: </Label>
                    <Input name="surname" type="text" defaultValue={state.inputs?.surname} placeholder={"Zadejte přijmení"} disabled={isPending} />
                    {state?.errors?.surname && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.surname}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>E-mail:</Label>
                    <Input name="email" type="email" placeholder={"Zadejte email"} defaultValue={state.inputs?.email} required disabled={isPending} />
                    {state?.errors?.email && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.email}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                    <Label>Telefonní číslo:</Label>
                    <Input name="tel" type='tel' placeholder={"+420 606 707 808"} defaultValue={state.inputs?.tel} required disabled={isPending} />
                    {state?.errors?.tel && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.tel}
                               </p>
                            )}
                </div>
                <RadioGroup defaultValue="Poprvé v naší ordinaci" name="naposledy"  className="'flex flex-row  space-y-2 w-full">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Poprvé v naší ordinaci" id="r1" />
        <Label htmlFor="r1">Poprvé v naší ordinaci</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="po 2 a více letech" id="r2" />
        <Label htmlFor="r2">po 2 a více letech</Label>
      </div>
      <div className="flex flex-col items-center space-x-2">
        <div className="flex flex-row w-full justify-start space-x-2">
        <RadioGroupItem value="běžná kontrola" id="r3" />
        <Label htmlFor="r3">běžná kontrola</Label>
        </div>
        <span className="text-base">objednání termínu nutné 4 měsíce předem !</span>
      </div>
    </RadioGroup>
    <div className='flex flex-col space-y-2 w-full'>
                    <Label>Datum narození:</Label>
                    <Input name="birth" type='date' defaultValue={String(state.inputs?.birth)} required disabled={isPending} />
                    {state?.errors?.birth && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.birth}
                               </p>
                            )}
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                     <Label>Vaše pojišťovna:</Label>
                    <Select name="pojistovna" required disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Vyberte pojišťovnu" />
      </SelectTrigger>
      <SelectContent >
            {data.pojistne.map((p, i) => (
                     <SelectItem key={i} value={p.name}>{p.name}</SelectItem>
            ))}
      </SelectContent>
      </Select>
                </div>
                <div className='flex flex-col space-y-2 lg:col-span-2 w-full'>
                    <Label>Zpráva:</Label>
                    <Textarea name='message' placeholder={"Zadejte zpravu"} defaultValue={state.inputs?.message} required disabled={isPending} />
                    {state?.errors?.message && (
                                 <p className="text-base font-semibold text-red-500">
                                 {state.errors.message}
                               </p>
                            )}
                </div>

                <div className='flex flex-col w-full space-y-3 lg:col-span-2'>
                        <p>Odesláním souhlasíte se zprácováním osobních údajů. K přečtení<Link href="/ochrana-udaju" className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold mx-1">zde</Link></p>
                        <button type="submit" className="text-xl w-fit font-semibold py-2 px-7 text-white bg-foreground rounded-xl">{isPending ? <Loader2 className='animate-spin' /> : <>Odeslat</>}</button>
                    </div>
                
            </form>
            </div>
            <div id="map" className=" w-full md:w-1/2 flex-col space-y-4  rounded-xl">
            <h1 className="font-bold  text-2xl text-right m-6 underline underline-offset-2 decoration-wavy decoration-2 decoration-foreground">Ordinační hodiny</h1>
            <span className="font-bold underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground text-xl">Kontakt</span><br />
             <span className="font-bold  text-lg">DASVO s.r.o.</span><br />
                 <span className="font-bold">E-mail na sestru: <Link href="mailto:sestra@dasvo.cz" className="font-light">sestra@dasvo.cz</Link></span>
                <br /><span className="font-bold">Telefonní číslo: <Link href="tel:+420 569 434 375" className="font-light">+420  569 434 375</Link></span><br />
                 <span className="font-bold">Adresa: <Link href="/#map" className="font-light">Mahenova 3649, Havlíčkův Brod, 58001</Link></span><br />
                         {data.ordinacniDoba &&<span><span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">Ordinační hodiny</span><PortableText value={data.ordinacniDoba}/></span>}
                         {data.ordinacniHodiny &&<span><span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">AKTUÁLNÍ ZMĚNA ORDINAČNÍ DOBY</span>-<PortableText value={data.ordinacniHodiny}/></span>}
                          <span>Poslední pacient <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">30 minut</span> před koncem ordinace!</span><br/>
                           <span>Provozní doba odpovídá ordinační době!</span><br/>
                           <span>Parkování je možné v ulici před ambulancí a to pouze <span className="underline underline-offset-2 decoration-wavy decoration-1 decoration-foreground font-bold">během ordinační</span> doby !</span><br/>
                           <span>V době absence lékaře, sester, upozorňujeme, že Vámi zaslané e-maily budou vráceny odesílateli bez přečtení, je nutné je zaslat znovu v termínu uvedeném v automatické odpovědi na patřičný e-mail</span><br/>
                 
                 <div className="h-84">
                 <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
                mapStyle={"mapbox://styles/mapbox/light-v11"}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                }}
                style={{
                    borderRadius: 20
                }}
             >
                <Marker longitude={lng} latitude={lat} anchor='bottom' color="red" />
                </Map>   
                </div>
            </div>
        </section>
        <AnimatePresence>
        {an && data.announcement && 
        <motion.div 
        className="w-full md:w-1/3 h-1/2 absolute rounded-2xl flex flex-col items-end p-5 bg-white text-black text-2xl z-5001 shadow-lg shadow-black/60" 
        ref={anRef}
        initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
        >
        <X className="w-8 h-8" onClick={() => setAn(false)}/>
        {data.announcement}
        </motion.div>
        }
        </AnimatePresence>
        </main>
    )
}