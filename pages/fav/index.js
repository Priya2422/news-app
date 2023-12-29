import Fav from "@/components/news/Fav";
import { useAuth } from "@/hooks/context";
import Head from "next/head";

 function FavPage() {
  const {user}=useAuth();
 
   if(user){
    return <>
    <Head>
      <title>Favorites</title>
      <metadata name="description" content="Get latest news at next news app."/>
    </Head>
     <Fav/>
    </>
   }
  return <>Auth Loading...</>
}
export default FavPage;
