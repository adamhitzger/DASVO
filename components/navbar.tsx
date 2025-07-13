"use client"

import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";

export default function Navbar(){
    return(
        <nav className="w-full gap-3 flex flex-row bg-white p-3 justify-between items-center text-black">
            <Link href={"/"} className="text-3xl md:text-5xl font-bold p-3 flex flex-nowrap text-white bg-foreground rounded-xl"> 
            DASVO &reg;
            </Link>

            <div className="hidden md:flex flex-row  w-1/2 justify-between text-2xl">
                
                    <Link  href={"/#o-nas"}>
                        O nás
                    </Link>
                     <Link  href={"/#vysetreni"}>
                        1. vyšetření
                    </Link>
                     <Link  href={"/#cenik"}>
                        Ceník
                    </Link>
               
            </div>

            <Link href={"/#kontakt"} className="hidden md:flex text-2xl font-semibold py-2 px-7 text-white bg-foreground rounded-xl">
            Objednat
        </Link> 
             <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-9 w-9 flex md:hidden"/>
      </SheetTrigger>
      <SheetContent className="bg-white text-black font-medium text-2xl p-4">
                <Link  href={"/#o-nas"}>
                        O nás
                    </Link>
                     <Link  href={"/#vysetreni"}>
                        1. vyšetření
                    </Link>
                     <Link  href={"/#cenik"}>
                        Ceník
                    </Link>
               <Link href={"/#kontakt"} className=" text-2xl font-semibold py-2 px-7 w-fit text-white bg-foreground rounded-xl">
            Objednat
        </Link> 
      </SheetContent>
    </Sheet>
        </nav>
    )
}