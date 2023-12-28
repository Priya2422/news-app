import { Fragment, useState } from 'react';
import classes from './NewsList.module.css';
import Image from 'next/image';
import list from '../../public/list.png';
import grid from '../../public/grid.png';
import useScreenSize from '@/hooks/useScreen';
import FavItem from './FavItems';
import { useFav } from '@/hooks/favContext';
function Fav() {
  const screenSize=useScreenSize();
  const {items}=useFav();
  const [view,setView]=useState('list');
  const listViewHandler=()=>{
    setView('list');
  }
  const gridViewHandler=()=>{
    setView('grid');
  }
  const classView=`${view==='list'?`${classes.list}`:`${classes.grid}`}`;
  return (
    <Fragment>
      <div className={classes.bttns}>
        <button onClick={listViewHandler} type='button'disabled={screenSize.width>=660?false:true}>
          <Image
          src={list}
          width={30}
          alt='list'
          />
        </button>
        <button onClick={gridViewHandler} type='button' disabled={screenSize.width>=660?false:true}>
        <Image
        src={grid}
        width={30}
        alt='grid'
        />
        </button>
      </div>
      <ul className={`${classView} ${classes.hehe}`}>
      {items.map((newss) => (
        <FavItem
          key={newss.newsId}
          id={newss.newsId}
          image={newss.image}
          title={newss.title}
          description={newss.description}
          url={newss.url}
        />
      ))}
      {items.length==0 && <p>No Favorite items to display. Add one</p>}
    </ul>
    </Fragment>
  );
}

export default Fav;
