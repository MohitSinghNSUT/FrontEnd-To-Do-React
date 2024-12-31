import { Outlet } from "react-router-dom"
import { Header } from "./Header"
    //  used to show all the childrens same header and footer 
export const SameComponent=()=>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
        )
}