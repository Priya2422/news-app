import { Fragment, useState } from 'react';
import NewsItem from './NewsItem';
import classes from './NewsList.module.css';
import Image from 'next/image';
import list from '../../public/list.png';
import grid from '../../public/grid.png';
import useScreenSize from '@/hooks/useScreen';
import { useAuth } from '@/hooks/context';
function NewsList(props) {
  const screenSize=useScreenSize();
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
        <button onClick={listViewHandler} type='button'disabled={screenSize.width>=1200?false:true}>
          <Image
          src={list}
          width={30}
          alt='list'
          />
        </button>
        <button onClick={gridViewHandler} type='button' disabled={screenSize.width>=1200?false:true}>
        <Image
        src={grid}
        width={30}
        alt='grid'
        />
        </button>
      </div>
      <ul className={`${classView} ${classes.hehe}`}>
      {props.news.slice(0, props.visible).map((newss) => (
        <NewsItem
          key={newss.publishedAt}
          id={newss.publishedAt}
          image={newss.urlToImage}
          title={newss.title}
          url={newss.url}
          description={newss.content}
        />
      ))}
    </ul>
    </Fragment>
  );
}

export default NewsList;
