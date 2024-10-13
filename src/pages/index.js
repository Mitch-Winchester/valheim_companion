import * as React from 'react'
import Seo from '../components/seo'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import ValLayout from '../components/val_layout'
import ValButton from '../components/val_button'

// create styled component
const ButRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 10vw; /* Space between each button */
    padding: 0 15%; /* Adjusts space on the sides */
    margin-bottom: 5vh;
`;

// create val_comp home page
const ValComp = () => {
    return (
        <ValLayout
            background = {`url("/val_images/backgrounds/ebrithil_base.png")`}
            title = "Main"
            showSearch = {false}
        >
            <Container>
                <ButRow>
                    <ValButton navPath={"food"} buttonText={"Food"}/>
                    <ValButton navPath={"farm"} buttonText={"Farming/Fishing"}/>
                    <ValButton navPath={"mead"} buttonText={"Mead"}/>
                </ButRow>
                <ButRow>
                    <ValButton navPath={"tools"} buttonText={"Tools"}/>
                    <ValButton clickFunction={underConstruction} buttonText={"Weapons"}/>
                    <ValButton navPath={"armor"} buttonText={"Armor"}/>
                </ButRow>
                <ButRow>
                    <ValButton clickFunction={underConstruction} buttonText={"Tips"}/>
                </ButRow>
            </Container>
            <div style={{marginBottom: "8rem"}}></div>
        </ValLayout>
        
    )
}

//Alert window that is displayed for buttons that currently do not
//have pages to link to
function underConstruction() {
    window.alert("This page is currently under construction!" +
        "\nPlease check back soon!"
    )
}

// create page title
export const Head = () => <Seo title="Valheim Companion App" />

export default ValComp