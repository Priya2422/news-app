import Link from 'next/link';
import Card from '../ui/Card';
import classes from './NewsItem.module.css';
import favorite from '../../public/favorite.png';
import { useAuth } from '@/hooks/context';
import { useFav } from '@/hooks/favContext';
import { auth, db } from '@/firebase';
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import ErrorModal from '../ui/Modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
function NewsItem(props) {
  const [open, setOpen] = useState(false);
  const router=useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {items,setItems}=useFav();
  const {user}=useAuth();
  
  const favHandler=async(e)=>{
    console.log(items);
    if(items.find((item)=>item.newsId==props.id)){
      handleClickOpen();
    }else{
    const { uid } = auth.currentUser;
      try{
        const data={
          title: props.title,
          description: props.description,
          image: props.image,
          url: props.url,
          newsId: props.id,
          createdAt: serverTimestamp(),
          uid,
          };
          const resp=await addDoc(collection(db, "fav"), data);
          setItems([...items,data]);
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
      {user && <button className={classes.button} onClick={(e)=>favHandler(e)} type='button'>
        <img src={favorite.src} alt='favorite' className={classes.fav}/>
      </button>}
      <ErrorModal open={open}  closeHandler={handleClose} title={"Existing!"} message={"Item already added to favorites"} />
    </li>
  );
}

export default NewsItem;
