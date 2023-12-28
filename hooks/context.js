import { useContext, createContext,useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";
const AuthContext=createContext()
export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    useEffect(()=>{
         return onAuthStateChanged(auth,(user)=>setUser(user));
    },[])
    const signup=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
            localStorage.setItem('uid',JSON.stringify(userCredential.user.uid));
        })        
    }
    const signin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
            setUser(userCredential.user);
            localStorage.setItem('uid',JSON.stringify(userCredential.user.uid));
        })
    }
    const signout=()=>{
        localStorage.setItem('uid',null);
        setUser(null);
        signOut(auth);
    }
    return <AuthContext.Provider value={{signin,user,signup,signout}}>
        {children}
    </AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext);