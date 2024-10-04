import * as React from 'react'
import {
    valBody,
    header,
    mainHeader
} from './val_layout.module.css'

const ValLayout = ({ background, title, children }) => {
    let head = ``;

    if (title === "Main") {
        head = mainHeader;
        title = '';
    } else {
        head = header;
    }
    return (
        <>
            <body className={valBody} style={{backgroundImage: background}}>
                <header className={head}>{title}</header>
                {children}
            </body>
        </>
    )
}

export default ValLayout