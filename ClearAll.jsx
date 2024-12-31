import react from 'react'
import Clear from './AllCss.module.css'
export const ClearAll =({allDataArr,setAllFunction})=>{
  const ChangeAllData=()=>{
    setAllFunction([])
  }
  return (
    <>
    <button className={`${Clear.clear}`} onClick={ChangeAllData}>
      Clear All
    </button>
    </>
  )
}