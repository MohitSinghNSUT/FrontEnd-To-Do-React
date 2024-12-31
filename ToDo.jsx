import react, { useState, useEffect } from 'react';
import './todo.css';
import { AddDate } from './AddDate';
import { ClearAll } from './ClearAll';
import { Form } from './Form';
import { List } from './List';
const key = 'LocalStorageKey';
export const ToDo = () => {
  const [inputdata, setInput] = useState({});
  const [alldata, setAllData] = useState(() => {
    const previousData = localStorage.getItem(key);
    if (!previousData) return [];
    return JSON.parse(previousData);
  });

  const changeInput = (event) => {
    setInput({
      id: event.target.value,
      content: event.target.value,
      checked: false,
    });
  };
  const addData = (event) => {
    event.preventDefault();
    if (!inputdata.content) {
      setInput({ id: '', content: '', checked: false });
      return;
    }
    let checkIfFound = 0;
    alldata.forEach((elem) => {
      if (elem.content === inputdata.content) {
        checkIfFound = 1;
        return;
      }
    });

    if (checkIfFound) {
      setInput({ id: '', content: '', checked: false });
      return;
    }
    setAllData([...alldata, inputdata]);
    setInput({ id: '', content: '', checked: false });
  };
  useEffect(() => {
    // if (alldata.length > 0) {
      localStorage.setItem(key, JSON.stringify(alldata)); // Save alldata to localStorage
    // }
  }, [alldata]); // This will run every time alldata changes

  const handleDelete = (index) => {
    const updatedArr = alldata.filter((elem, idx) => {
      if (index != idx) {
        return elem;
      }
    });
    setAllData(updatedArr);
  };
  const handleCheck = (index) => {
    // console.log("previous",alldata);
    const updatedArr = alldata.map((elem, idx) => {
      if (idx == index) {
        const changedElem = elem;
        changedElem.checked = !changedElem.checked;
        return changedElem;
      } else {
        return elem;
      }
    });
    setAllData(updatedArr);
  };
  return (
    <>
      <div className="divcontainer">
        <section className="container">
          <header>
            <h1 className="heading-App">  ToDo App </h1>
            <AddDate />
          </header>
        </section>
        <Form
          inputdata={inputdata.content}
          changeInput={changeInput}
          addData={addData}
        />
        <List
          handleDelete={handleDelete}
          alldata={alldata}
          handleCheck={handleCheck}
        />
        <section>
          <ClearAll allDataArr={alldata} setAllFunction={setAllData} />
        </section>
      </div>
    </>
  );
};
