import { useState } from "react";
import NewsList from "../components/news/NewsList"
import classes from '../components/news/demo.module.css';
import axios from "axios";
import Head from "next/head";

 function Home({articles,totalResults}) {
  const [current,setCurrent]=useState(6);
  const loadMore=()=>{
    if(current>=articles.length){
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
    {totalResults>=4 && <NewsList news={articles} visible={current}/>}
    {totalResults>=4 && <div className={classes.btn}>
      <button 
      className={classes.button}
      onClick={loadMore} 
      type="button">
        {current>=articles.length && current>0?'Load less':'Load More'}
      </button>
    </div>}
    {totalResults<4 && <p>No news items to display</p>}
    </>
  )
}
export async function getServerSideProps({req,res}){
  // res.setHeader()
  const url=`https://newsapi.org/v2/everything?q=sports&pageSize=100&apiKey=f0d1949698da4a328852986a08b2e869`;
  const response=await axios.get(url);
  const {articles, totalResults}=response.data;
  // console.log(totalResults);
  return {
    props:{
      articles,
      totalResults
    }
  }
}
export default Home;
