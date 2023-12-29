import Link from "next/link"
import { Fragment } from "react"
import styles from './NewsDetails.module.css';
import { useRouter } from "next/router";
function NewsDetails(props){
   const {query}= useRouter();
   const newsItem=props.news.filter(item=>item.createdAt==query.id);
   if(newsItem.length<0){
    return <p>No data items to display</p>
   }
    return <Fragment>
        <section className={styles.detail}>
            <img src={newsItem[0].thumbnail} alt={'image'}/>
            <h1>{newsItem[0].title}</h1>
            <p>{newsItem[0].description}</p>
            <Link href={newsItem[0].url} target="_blank">Click here for more details</Link>
        </section>
    </Fragment>
}
export default NewsDetails;