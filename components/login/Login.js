import { useRef, useState } from "react";
import Card from "../ui/Card";
import classes from './Login.module.css';
import { useAuth } from "@/hooks/context";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";
import ErrorModal from "../ui/Modal";

export default function Login(){
    const {user,signup,signin}=useAuth();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const router=useRouter();
    const [isLogin,setIsLogin]=useState(true);
    const [email,setEmail]=useState();
    const [password,setPass]=useState();
    const submitHandler=(event)=>{
        event.preventDefault();
        if(password && email){
            if(isLogin){
                signin(email,password).then(user=>{
                    router.replace('/');
                }).catch(err=>{
                    handleClickOpen();
                });
            }
            else{
                signup(email,password).then(user=>{
                    router.replace('/');
                }).catch(err=>{
                    handleClickOpen();
                });
            }
        }
        else{
            handleClickOpen();
        }
    }
    return <Card isLogin={true}>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="email" >Email</label>
                <input type="email"  id="email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e)=>setPass(e.target.value)}/>
            </div>
            <div className={classes.actions}>
              <button type="submit">{isLogin?
              'Login': 'Signup'}</button>
            </div>
            <div className={classes.actions}>
              <p onClick={()=>setIsLogin(prev=>!prev)}>{isLogin?'Create New Account':
              'Login With Exisiting Account'}</p>
            </div>
        </form>
        <ErrorModal open={open} closeHandler={handleClose} title={'Invalid!'} message={'Invalid Credentials. Please try again'} />
    </Card>
}