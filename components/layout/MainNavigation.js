import Link from 'next/link';
import classes from './MainNavigation.module.css';
import logo from '../../public/logo.png';
import Image from 'next/image';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import useScreenSize from '@/hooks/useScreen';
import { useState } from 'react';
import { useAuth } from '@/hooks/context';
import { useRouter } from 'next/router';
import ErrorModal from '../ui/Modal';
function MainNavigation() {
  const router=useRouter();
  const {user,signout}=useAuth();
  const [showNav,setShowNav]=useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navHandler=()=>{
    setShowNav(prev=>!prev);
  }
  const screenSize=useScreenSize();
  const size=screenSize<=385?30:100;
  const logoutHandler=async ()=>{
    try{
      await signout();
      await router.replace('/');
    }catch(err){
      handleClickOpen();
    }
  }
  return (
    <header className={classes.header}>
      <div className={classes.desktopNav}>
        <div className={classes.logo}>
          <Image
          src={logo}
          width={150}
          alt='logo'
          />
        </div>
        <nav>
          <ul>
            <li>
              <Link href='/'>News</Link>
            </li>
            {!user && <li>
              <Link href='/login'>Register</Link>
            </li>}
            {user && <li>
              <Link href='/fav'>Favorites</Link>
            </li>}
            {user && <li className={classes.logout}>
              <button onClick={logoutHandler}>Logout</button>
            </li>}
          </ul>
            <div className={classes.btn} onClick={navHandler}>
              <AiOutlineMenu size={30}/>
            </div>
        </nav>
      </div>
      <div className={`${showNav==false  ?classes.mobNavHidden: screenSize.width<=660? classes.mobileNav:classes.mobNavHidden}`} onClick={navHandler}>
      <div className={`${showNav==false ?classes.navHidden: screenSize.width<=660? classes.nav: classes.navHidden}`}>
          <div className={classes.cross}>
            <div>
              X
            </div>
          </div>
          <li>
            <Link href='/'>News</Link>
          </li>
          {!user && <li>
              <Link href='/login'>Register</Link>
            </li>}
            {user && <li>
              <Link href='/fav'>Favorites</Link>
            </li>}
            {user && <li className={classes.mobLogout}>
              <button onClick={logoutHandler}>Logout</button>
            </li>}
          <div className={classes.logo}>
          <Image
          src={logo}
          width={`${screenSize.width<=385?60:100}`}
          alt='logo'
          />
        </div>
        </div>
      </div>
      <ErrorModal open={open}  closeHandler={handleClose} title={"Logout Error!"} message={"Logout Failed due to some error. Please try again later"} />
    </header>
  );
}

export default MainNavigation;
