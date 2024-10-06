import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValTools = ({ data }) => {

    return (
        <ValLayout
            background = {`url("/images/backgrounds/ebrithil_base.png")`}
            title = "Tool Recipes"
        >
            <ValTableLayout
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Workbench"]}
                imgBasePath = {"/images/tools"}
                showSearch = {false}
                contentFlag = 'building'
            />
        </ValLayout>
    )
}


export const query = graphql`
    query MyQuery {
        allDataJson(filter: {title: {eq: "Tools"}}) {
            nodes {
                building {
                    Item
                    Qualities {
                        Level
                        Durability
                        Recipe {
                            Material
                            Quantity
                        }
                        Workbench
                    }
                }
            }
        }
    }
`

export const Head = () => <Seo title="Valheim Tools"/>

export default ValTools