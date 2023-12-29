import NewsDetails from "../../components/news/NewsDetails";
import axios from "axios";

export default function DetailPage({data}){
    
    return  < NewsDetails news={data} />
}
export async function getServerSideProps(context){
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