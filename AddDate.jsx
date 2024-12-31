import react, { useEffect, useState } from "react"
import Datecss from './AllCss.module.css'
import './index.css'
export const AddDate =()=>{
  const [currDate,setDate]=useState("");
  useEffect(()=>{
    let interval=setInterval(()=>{
      const newdate=new Date;
      setDate(`${newdate.toLocaleDateString()} - ${newdate.toLocaleTimeString()} `) 
    },1000)
    return ()=>clearInterval(interval)
  },[])

  return(
    <>
      <div className={`${Datecss.Datecss}`}>
        {currDate}
      </div>
    </>
  );
}