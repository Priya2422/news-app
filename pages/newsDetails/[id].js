import NewsDetails from "../../components/news/NewsDetails";
import axios from "axios";

export default function DetailPage({articles}){
    
    return  < NewsDetails news={articles} />
}
export async function getServerSideProps(context){
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