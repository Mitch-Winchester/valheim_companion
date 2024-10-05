import * as React from 'react'
import { navigate } from 'gatsby'
import { button } from './val_layout.module.css'

const ValButton = ({ 
    buttonText, 
    navPath = "",
    clickFunction = navigate
}) => {
    return (
        <button 
            className={button} 
            aria-label="back" 
            onClick={()=>{clickFunction(`${navPath}`)}}
        >
            {buttonText}
        </button>
    )
}

export default ValButton