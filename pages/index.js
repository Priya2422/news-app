import { useState } from "react";
import NewsList from "../components/news/NewsList"
import classes from '../components/news/demo.module.css';
import axios from "axios";
import Head from "next/head";

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
  return (
    <>
    <Head>
      <title>News App</title>
      <metadata name="description" content="Get latest news at next news app."/>
    </Head>
    {totalResults>=4 && <NewsList news={data} visible={current}/>}
    {totalResults>=4 && <div className={classes.btn}>
      <button 
      className={classes.button}
      onClick={loadMore} 
      type="button">
        {current>=data.length && current>0?'Load less':'Load More'}
      </button>
    </div>}
    {totalResults<4 && <p>No news items to display</p>}
    </>
  )
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
    return {
      props:{
        data,
        totalResults
      }
    }
  } catch (error) {
    return {
      props:{
        data,
        totalResults
      }
    }
  }

}
export default Home;
