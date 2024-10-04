import * as React from 'react'
import { navigate } from 'gatsby'
import {
    backButtonDiv,
    button,
    valBody,
    header,
    mainHeader
} from './val_layout.module.css'

const ValLayout = ({ background, title, children }) => {
    let head = header;
    let navPath = "/";
    let backButText = "Back to Home Page";

    if (title === "Main") {
        head = mainHeader;
        title = '';
        navPath = "/";
        backButText = "Back to Main Site";
    }
    return (
        <>
            <body className={valBody} style={{backgroundImage: background}}>
                <header className={head}>{title}</header>
                {children}
                <div className={backButtonDiv}>
                    <button className={button} aria-label="back" onClick={()=>{navigate(`${navPath}`)}}>{backButText}</button>
                </div>
            </body>
        </>
    )
}

export default ValLayout