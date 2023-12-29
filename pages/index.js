import { useState } from "react";
import NewsList from "../components/news/NewsList"
import classes from '../components/news/demo.module.css';
import axios from "axios";

 function Home({data,totalResults}) {
  const [current,setCurrent]=useState(6);
  const loadMore=()=>{
    if(current>=data.length){
      setCurrent(prev=>prev-6);
    }
    else{
      setCurrent(prev=>prev+6);
    }
  }
  if(data){

    return (
      <>
      {totalResults>=6 && <NewsList news={data} visible={current}/>}
      {totalResults>=6 && <div className={classes.btn}>
        <button 
        className={classes.button}
        onClick={loadMore} 
        type="button">
          {current>=data.length && current>0?'Load less':'Load More'}
        </button>
      </div>}
      {totalResults<6 && <p>No news items to display</p>}
      </>
    )
  }
  else{
    return <p>Nothing to display</p>
  }
}
export async function getServerSideProps({req,res}){
  // res.setHeader()
  let data=[];
  let totalResults=0;
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
    headers: {
      'X-RapidAPI-Key': '11a77be000mshdcf3d797cd28218p17b815jsn82823cd9a664',
      'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    data=response.data.data;
    totalResults=data.length;

  } catch (error) {
    console.log(err);
  }
  return {
    props:{
      data,
      totalResults
    }
  }
}
export default Home;
