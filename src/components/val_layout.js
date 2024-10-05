import * as React from 'react'
import ValButton from './val_button'
import {
    backButtonDiv,
    valBody,
    header,
    mainHeader
} from './val_layout.module.css'

const ValLayout = ({ background, title, children }) => {
    let head = header;
    let navPath = "/";
    let backButText = "Back to Home Page";
    let showButton = true;

    if (title === "Main") {
        head = mainHeader;
        title = '';
        if (navPath === "/") {
            showButton = false;
        } else {
            navPath = "/";
            backButText = "Back to Main Site";
        }
    }
    return (
        <>
            <body 
                className={valBody} 
                style={{backgroundImage: background}}
            >
                <header className={head}>{title}</header>
                {children}
                {showButton && (
                    <div className={backButtonDiv}>
                        <ValButton 
                            buttonText = {backButText}
                            navPath = {navPath}
                        />
                    </div>
                )}
            </body>
        </>
    )
}

export default ValLayout