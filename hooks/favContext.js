import { useContext, createContext,useState, useEffect } from "react";
import { collection,query,getDocs, where,deleteDoc} from "firebase/firestore";
import {auth, db } from "../firebase";
import { useAuth } from "./context";
const favContext=createContext({
    items:[],
})
export const FavContextProvider=({children})=>{
    const [items,setItems]=useState([]);
    const {user}=useAuth;
    useEffect(()=>{
        // console.log('hey');
        const array=[];
        const getData=async()=>{
        const uid=JSON.parse(localStorage.getItem('uid'));
        if(uid){
            const q=query(
                collection(db,'fav'),
                where('uid','==',uid),
                )
                const docSnap=await getDocs(q);
                docSnap.forEach((doc) => {
                    array.push(doc.data());
            });
        }
        setItems(array);
        // console.log(docSnap);
        }
        getData();
    },[])
       return <favContext.Provider value={{items,setItems}}>
        {children}
    </favContext.Provider>
}
export const useFav=()=>useContext(favContext);