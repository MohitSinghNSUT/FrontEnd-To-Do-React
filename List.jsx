import CssModule from './AllCss.module.css'
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
export const List =({handleDelete,alldata,handleCheck})=>{
  return(
    <section>
          {alldata.map((elem, index) => {
            return (
              <li key={index}>
                <span className={`value ${elem.checked?CssModule.checked:CssModule.unchecked}`}>{elem.content}</span>
                <div className="inputbuttons">
                <button className=" delete input-btn" onClick={()=>handleDelete(index)}>
                <ImCross fontSize={22} /> 
                </button>
                <button className="tick input-btn">
                <TiTick fontSize={40} onClick={()=>handleCheck(index)}/>{' '}
                </button>
                </div>
              </li>
            );
          })}
        </section>
  );
}