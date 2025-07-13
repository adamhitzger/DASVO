import UI from "@/components/ui";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { sanityFetch } from "@/sanity/lib/client";
import { Homepage } from "@/types";
import { query } from "@/sanity/lib/query";

export default async function Home() {
  const data = await sanityFetch<Homepage>({query: query})
  return (

    <>
      <Navbar/>
      <UI data={data}/>
      <Footer/>
    </>
  );
}
