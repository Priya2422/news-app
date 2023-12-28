import Link from "next/link"
import { Fragment } from "react"
import styles from './NewsDetails.module.css';
import { useRouter } from "next/router";
function NewsDetails(props){
   const {query}= useRouter();
   const newsItem=props.news.filter(item=>item.publishedAt==query.id);
    return <Fragment>
        <Head>
            <title>{newsItem[0].title}</title>
            <metadata name="description" content={newsItem[0].content}/>
        </Head>
        <section className={styles.detail}>
            <img src={newsItem[0].urlToImage} alt={'image'}/>
            <h1>{newsItem[0].title}</h1>
            <p>{newsItem[0].content}</p>
            <Link href={newsItem[0].url} target="_blank">Click here for more details</Link>
        </section>
    </Fragment>
}
export default NewsDetails;