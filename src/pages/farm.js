import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValFarm = ({ data }) => {

    return (
        <ValLayout
            background = {`url("/images/backgrounds/ebrithil_farm.png")`}
            title = "Farming & Fishing Recipes"
        >
            <ValTableLayout
                data = {data.allDataJson.nodes}
                headers = {["Crop", "Biome(s) needed to grow", "Grow Time (s)", "Required Space (m)"]}
                imgBasePath = {"/images/crops"}
                showSearch = {false}
                contentFlag = 'crop'
                contentNames = {["Crop", "Biome", "Growth", "Space"]}
            />
            <div style={{marginBottom: '5%'}}></div>
            <ValTableLayout
                data = {data.allDataJson.nodes}
                headers = {["Animal", "Feed", "Grow Time (min)", "Space Needed"]}
                imgBasePath = {"/images/animals"}
                showSearch = {false}
                contentFlag = 'feed'
                contentNames = {["Animal", "Feed", "Growth", "Space"]}
            />
            <div style={{marginBottom: '5%'}}></div>
            <ValTableLayout
                data = {data.allDataJson.nodes}
                headers = {["Bait Type", "Use", "Recipe"]}
                imgBasePath = {"/images/bait"}
                showSearcy = {false}
                contentFlag = 'bait'
                contentNames = {["Item", "Use", "Recipe"]}
            />
        </ValLayout>
    )
}

export const query = graphql`
    {
        allDataJson(filter: {title: {eq: "Farm"}}) {
            nodes {
                bait {
                    Item
                    Use
                    Recipe
                }
                crop {
                    Crop
                    Biome
                    Growth
                    Space
                    Produce
                }
                feed {
                    Animal
                    Feed
                    Growth
                    Space
                }
            }
        }
    }
`

export const Head = () => <Seo title="Valheim Farming/Fishing" />

export default ValFarm