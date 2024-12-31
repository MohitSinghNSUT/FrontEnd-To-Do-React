import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignUpPage } from './pages/LoginPage'
import { SameComponent } from './pages/SameComponent'

function App() {
  const [username,setUserName]=useState(localStorage.getItem('username'));
  const previosLogin=localStorage.getItem('loginDate');
  let initialLogin=0;
  if(previosLogin){
    const currDate = new Date();
    const preDate=new Date(previosLogin);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    initialLogin=(currDate-preDate)<oneDayInMilliseconds;
    if(initialLogin)
    localStorage.setItem('loginDate',currDate);
    else{
      localStorage.removeItem('username');
    }
    }
  const [isLogedIn,setIsLogedIn]=useState(initialLogin)
  const commonHeaderFooter=createBrowserRouter([
    {
      path:'/',
      element:<SameComponent/>,
      children:[
        {
          path:'/signup',
          element:<SignUpPage isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} setUserName={setUserName}/>,
        },
        {
          path:'/',
          element:<HomePage isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn}  setUserName={setUserName} />
        }
      ]
    }
  ])
  return <RouterProvider router={commonHeaderFooter} />;
}

export default App
