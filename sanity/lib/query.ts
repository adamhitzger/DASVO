import { groq } from "next-sanity";

 export const query = groq`*[_type == "homepage"][0]{
  announcement,
  headerText,
  aboutText,
  "headerPicture":headerImage.asset->url,
  "aboutPicture":aboutImage.asset->url,
  personal[] {
    name,
    isLekar,
    about
  },
  prices[] {
    name,
    price
  },
  pojistne[] {
    name,
    code
  },
  ordinacniDoba,
  ordinacniHodiny,
}`