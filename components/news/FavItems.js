import Link from 'next/link';
import Card from '../ui/Card';
import classes from './NewsItem.module.css';
import favorite from '../../public/remove-favourite.png';
import { useAuth } from '@/hooks/context';
import { useFav } from '@/hooks/favContext';
import { auth,db } from '@/firebase';
import { collection,query,getDocs, where,deleteDoc} from "firebase/firestore";
import ErrorModal from '../ui/Modal';
import { useState } from 'react';

function FavItem(props) {
  const {items,setItems}=useFav();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {user}=useAuth();
  const favHandler=async(e)=>{
    if(items.find(item=>item.newsId==props.id)){
        try{
          const { uid } = auth.currentUser;
        const q=query(
        collection(db,'fav'),
        where('uid','==',uid),
        where('newsId','==',props.id),
        )
        const docSnap=await getDocs(q);
        docSnap.forEach((doc) => {
            deleteDoc(doc.ref);
        });
        const arr=items.filter(item=>item.newsId!=props.id);
        setItems(arr);
        }catch(err){
          console.log(err);
          handleClickOpen();
        }
    }
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
        </div>
        {user && 
        <div className={classes.actions}>
          <Link href={`/newsDetails/${props.id}`}>
            <button>Show Details</button>
          </Link>
        </div>
         }
      </Card>
      <button className={classes.button} onClick={(e)=>favHandler(e)} type='button'>
        <img src={favorite.src} alt='favorite' className={classes.fav}/>
      </button>
      <ErrorModal open={open}  closeHandler={handleClose} title={"Failed!"} message={"Data Fetching failed due to some server error..."} />
    </li>
  );
}

export default FavItem;
