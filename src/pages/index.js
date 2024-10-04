import * as React from 'react'
import { navigate } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import {
    buttonDiv,
    topButtonDiv,
    botButtonDiv,
    button
} from '../components/val_layout.module.css'

const ValComp = () => {
    return (
        <ValLayout
            background = {`url("/images/backgrounds/ebrithil_base.png")`}
            title = "Main"
        >
                <div className={buttonDiv}>
                    <div className={topButtonDiv}>
                        <button className={button} onClick={()=>{underConstruction()}}>Tools</button>
                        <button className={button} onClick={()=>{underConstruction()}}>Weapons</button>
                        <button className={button} onClick={()=>{underConstruction()}}>Armor</button>
                    </div>
                    <div className={botButtonDiv}>
                        <button className={button} onClick={()=>{navigate("food")}}>Food</button>
                        <button className={button} onClick={()=>{navigate("farm")}}>Farming/Fishing</button>
                        <button className={button} onClick={()=>{navigate("mead")}}>Mead</button>
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