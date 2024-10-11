import * as React from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'

const ValBut = styled.button`
    padding: 1vh 3vw;
    font-size: 2vw;
    cursor: pointer;
    text-align: center;
    outline: none;
    color: rgb(255, 98, 0);
    background-color: rgb(94, 102, 111);
    border: none;
    border-radius: 15px;
    box-shadow: 0 0.5vh lightgray;

    &:hover {
        background-color: rgb(80, 85, 91);
    }
    &:active {
        background-color: rgb(80, 85, 91);
        box-shadow: 0 0.25vh darkgray;
        transform: translateY(0.25vh);
    }
`

const ValButton = ({ 
    buttonText, 
    navPath = "",
    clickFunction = navigate
}) => {
    return (
        <ValBut
            aria-label="back" 
            onClick={()=>{clickFunction(`${navPath}`)}}
        >
            {buttonText}
        </ValBut>
    )
}

export default ValButton