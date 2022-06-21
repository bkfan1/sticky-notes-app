import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import Layout from "./Layout";
import NotesGridContainer from "./NotesGridContainer";
import PaginationMenu from "./PaginationMenu";


export default function NotesApp(){
    
    return(
        <>
        <Layout>
            <NotesGridContainer/>
        </Layout>
        </>
    )
}