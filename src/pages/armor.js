import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

// create armor page
const ValArmor = ({ data }) => {
    // set armor image path
    const armorImgs = "/val_images/armor"

    // get content names for drop down menu
    var conFlag = Object.keys(data.allDataJson.nodes[0])

    // filterFunction to pass to tableLayout
    const armorFilter = (armor, filter) => {
        const item = armor.Item.toLowerCase().includes(filter);
        const effect = armor.Effects?.some(effect =>
            effect.toLowerCase().includes(filter)
        );
        const recipe = armor.Qualities?.some(quality =>
            quality.Recipe?.some(ingredient =>
                ingredient.Material.toLowerCase().includes(filter)
            )
        );
        const station = armor.Qualities?.some(quality =>
            quality.CraftingStation?.some(station =>
                station.Station.toLowerCase().includes(filter)
            )
        );

        return (
            item ||
            effect ||
            recipe ||
            station
        );
    };

    return (
        <ValLayout
            title = "Armor Recipes"
            content = {conFlag}
        >
            <ValTableLayout
                filterFunction = {armorFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {armorImgs}
                contentFlag = 'capes'
                contentNames = {["Item", "Effects", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {armorFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {armorImgs}
                showSearch = {false}
                contentFlag = 'helmets'
                contentNames = {["Item", "Effects", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {armorFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {armorImgs}
                showSearch = {false}
                contentFlag = 'chest'
                contentNames = {["Item", "Effects", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {armorFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {armorImgs}
                showSearch = {false}
                contentFlag = 'legs'
                contentNames = {["Item", "Effects", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
        </ValLayout>
    )
}

// query armor json objects
export const query = graphql`
    query {
        allDataJson(filter: {title: {eq: "Armor"}}) {
            nodes {
                capes {
                    Item
                    Effects
                    Qualities {
                        Level
                        Durability
                        Armor
                        Recipe {
                            Material
                            Quantity
                        }
                        CraftingStation {
                            Station
                            Level
                        }
                    }
                }
                helmets {
                    Item
                    Effects
                    Qualities {
                        Level
                        Durability
                        Armor
                        Recipe {
                            Material
                            Quantity
                        }
                        CraftingStation {
                            Station
                            Level
                        }
                    }
                }
                chest {
                    Item
                    Effects
                    Qualities {
                        Level
                        Durability
                        Armor
                        Recipe {
                            Material
                            Quantity
                        }
                        CraftingStation {
                            Station
                            Level
                        }
                    }
                }
                legs {
                    Item
                    Effects
                    Qualities {
                        Level
                        Durability
                        Armor
                        Recipe {
                            Material
                            Quantity
                        }
                        CraftingStation {
                            Station
                            Level
                        }
                    }
                }
            }
        }
    }
`

// Create page title
export const Head = () => <Seo title="Valheim Armor"/>

export default ValArmor