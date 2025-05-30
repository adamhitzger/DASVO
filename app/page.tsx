import UI from "@/components/ui";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { sanityFetch } from "@/sanity/lib/live";
import { Homepage } from "@/types";
import { query } from "@/sanity/lib/query";

export default async function Home() {
  const fetch = await sanityFetch({query: query})
  const data = fetch.data as Homepage 
  return (

    <>
      <Navbar/>
      <UI data={data}/>
      <Footer/>
    </>
  );
}
