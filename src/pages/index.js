import * as React from 'react'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValButton from '../components/val_button'
import {
    buttonDiv,
    buttonRow
} from '../components/val_layout.module.css'

const ValComp = () => {
    return (
        <ValLayout
            background = {`url("/images/backgrounds/ebrithil_base.png")`}
            title = "Main"
            showSearch = {false}
        >
            <div className={buttonDiv}>
                <div className={buttonRow}>
                    <ValButton navPath={"food"} buttonText={"Food"}/>
                    <ValButton navPath={"farm"} buttonText={"Farming/Fishing"}/>
                    <ValButton navPath={"mead"} buttonText={"Mead"}/>
                </div>
                <div className={buttonRow}>
                    <ValButton navPath={"tools"} buttonText={"Tools"}/>
                    <ValButton clickFunction={underConstruction} buttonText={"Weapons"}/>
                    <ValButton clickFunction={underConstruction} buttonText={"Armor"}/>
                </div>
                <div className={buttonRow}>
                <ValButton clickFunction={underConstruction} buttonText={"Tips"}/>
                </div>
            </div>
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

export const Head = () => <Seo title="Valheim Companion App" />

export default ValComp