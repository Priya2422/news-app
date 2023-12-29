import Fav from "@/components/news/Fav";
import { useAuth } from "@/hooks/context";

 function FavPage() {
  const {user}=useAuth();
 
   if(user){
    return <>
     <Fav/>
    </>
   }
  return <>Auth Loading...</>
}
export default FavPage;
