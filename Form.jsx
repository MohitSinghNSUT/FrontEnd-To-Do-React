
export const Form =({inputdata,changeInput,addData})=>{
  // console.log("Inside form ",inputdata,changeInput,addData);
  return(
    <>
       <section className="form">
          <form>
            <div className="inputdiv">
              <input
                type="text"
                value={inputdata}
                onChange={changeInput}
                className="input"
                placeholder="input data"
              />
            </div>
            <div>
              <button className="btn" type="submit" onClick={addData}>
                Submit
              </button>
            </div>
          </form>
        </section>
    </>
  )
}