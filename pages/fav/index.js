import Error from "@/components/Error/Error";
import Fav from "@/components/news/Fav";
import { useAuth } from "@/hooks/context";
import Head from "next/head";

 function FavPage() {
  const {user}=useAuth();
  if(user===false)return <>Auth Loading...</>
  if(user){
    return <>
    <Head>
      <title>Favorites</title>
      <metadata name="description" content="Get latest news at next news app."/>
    </Head>
     <Fav/>
    </>
  }
  return <>
  <Head>
      <title>Error</title>
      <metadata name="description" content="Error occured"/>
    </Head>
  <Error code={404} message={'The page is not found'} />
  </>
}
export default FavPage;
