import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

// create farming page
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
            background = {`url("/val_images/backgrounds/ebrithil_farm.png")`}
            title = "Farming & Fishing Recipes"
            content = {["animals", "bait", "crop"]}
        >
            <ValTableLayout
                filterFunction = {farmFilter}
                data = {data.allDataJson.nodes}
                headers = {["Crop", "Biome(s) needed to grow", "Grow Time (s)", "Required Space (m)"]}
                imgBasePath = {"/val_images/crops"}
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
                imgBasePath = {"/val_images/animals"}
                showSearch = {false}
                contentFlag = 'animals'
                contentNames = {["Animal", "Feed", "Growth", "Space"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {farmFilter}
                data = {data.allDataJson.nodes}
                headers = {["Bait Type", "Use", "Recipe"]}
                imgBasePath = {"/val_images/bait"}
                showSearcy = {false}
                contentFlag = 'bait'
                contentNames = {["Item", "Use", "Recipe"]}
                showTitle = {true}
            />
        </ValLayout>
    )
}

// query farming json objects
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
                animals {
                    Animal
                    Feed
                    Growth
                    Space
                }
            }
        }
    }
`

// create page title
export const Head = () => <Seo title="Valheim Farming/Fishing" />

export default ValFarm