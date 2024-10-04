import * as React from 'react'
import {
    valBody,
    header
} from './val_layout.module.css'

const ValLayout = ({ background, title, children }) => {
    return (
        <>
            <body className={valBody} style={{backgroundImage: background}}>
                <header className={header}>{title}</header>
                {children}
            </body>
        </>
    )
}

export default ValLayout