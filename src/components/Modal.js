import { useEffect } from "react";


export default function Modal({children, showModal, setShowModal, handleClickModalBtn}){

    if(!showModal){return null;}


    return(
        <>
        <div className="modalOverlay flex flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-10 w-full h-screen">
            
            <div className="">
            {children}

            </div>

            



        </div>
        </>
    )
}
