import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValFarm = ({ data }) => {

    // filterFunction to pass to tableLayout
    const farmFilter = (item, filter) => {
        const animal = item.Animal?.toLowerCase();
        const bait = item.Item?.toLowerCase();
        const crop = item.Crop?.toLowerCase();

        return (
            animal?.includes(filter) ||
            bait?.includes(filter) ||
            crop?.includes(filter)
        );
    };

    return (
        <ValLayout
            background = {`url("/images/backgrounds/ebrithil_farm.png")`}
            title = "Farming & Fishing Recipes"
        >
            <ValTableLayout
                filterFunction = {farmFilter}
                data = {data.allDataJson.nodes}
                headers = {["Crop", "Biome(s) needed to grow", "Grow Time (s)", "Required Space (m)"]}
                imgBasePath = {"/images/crops"}
                showSearch = {false}
                contentFlag = 'crop'
                contentNames = {["Crop", "Biome", "Growth", "Space"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {farmFilter}
                data = {data.allDataJson.nodes}
                headers = {["Animal", "Feed", "Grow Time (min)", "Space Needed"]}
                imgBasePath = {"/images/animals"}
                showSearch = {false}
                contentFlag = 'feed'
                contentNames = {["Animal", "Feed", "Growth", "Space"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {farmFilter}
                data = {data.allDataJson.nodes}
                headers = {["Bait Type", "Use", "Recipe"]}
                imgBasePath = {"/images/bait"}
                showSearcy = {false}
                contentFlag = 'bait'
                contentNames = {["Item", "Use", "Recipe"]}
                showTitle = {true}
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
                    Recipe {
                        Material
                        Quantity
                    }
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