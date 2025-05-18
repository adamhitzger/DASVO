"use client"

import Link from "next/link"

export default function Footer(){
    const year = new Date().getFullYear()
    return(
        <>
        <footer className="w-full p-5 bg-foreground text-white gap-5 flex flex-col md:flex-row text-xl">
            <div className="w-full md:w-1/2 flex flex-col">
                <h3 className="text-3xl font-bold underline underline-offset-4 decoration-wavy decoration-2">Informace</h3>
                <span className="font-bold">E-mail: <a href="mailto:alergologiehb@quick.cz" className="font-light">alergologiehb@quick.cz</a></span>
                <span className="font-bold">E-mail na sestru: <a href="mailto:sestra@dasvo.cz" className="font-light">sestra@dasvo.cz</a></span>
                <span className="font-bold">Telefonní číslo: <a href="tel:+420 569 434 375" className="font-light">+420  569 434 375</a></span>
                <span className="font-bold">IČO: <span className="font-light">28814801</span></span>
                <span className="font-bold">Adresa: <Link href="/#map" className="font-light">DASVO s.r.o., Mahenova 3649, Havlíčkův Brod, 58001 (rodinný dům před parkovištěm u Nemocnice HB)</Link></span>
            </div>
            <div className="w-full md:w-1/2  flex flex-col ">
                <h3 className="text-3xl font-bold underline underline-offset-4 decoration-wavy decoration-2 text-right md:text-left">Užitečné odkazy</h3>
                <ul className="list-disc px-5">
                <li className="font-bold">ČIPA - <a href="https://www.cipa.cz" className="font-light">Česká iniciativa pro </a></li>
                <li className="font-bold">PIS - <a href="https://www.pylovasluzba.cz" className="font-light">Pylová informační služba</a></li>
                <li className="font-bold">ProAlergiky - <a href="https://www.proalergiky.cz" className="font-light">Největší informační portál pro alergiky s internetovým obchodem</a></li>
                <li className="font-bold">MujInhalator - <a href="https://www.mujinhalator.cz" className="font-light">Instruktážní videa k jednotlivým typům inhalátorů, včetně nejčastějších chyb</a></li>
                </ul>    
            </div>
        </footer>
             <div className="w-full bg-foreground text-white py-5 text-xl  text-center">
                <span>
                &copy; {year} Developed by
                 <Link href={"https://www.adamhitzger.com"} className="font-semibold mx-1">
                       Adam Hitzger
                </Link>
                </span>
            </div>
      </>
    )
}