import Error from "@/components/Error/Error";
import Head from "next/head";

export default function ErrorPage(){
    return <>
    <Head>
      <title>Error</title>
      <metadata name="description" content="Error occured"/>
    </Head>
    <Error code={404} message={'The page is not found'} />
    </>
}