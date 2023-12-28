import classes from './Error.module.css';
export default function Error(props){
    return <div className={classes.error}>
        <p>{props.code}</p>
        <p>{props.message}</p>
    </div>
}