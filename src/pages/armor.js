import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

// create armor page
const ValArmor = ({ data }) => {
    // filterFunction to pass to tableLayout
    const armorFilter = (armor, filter) => {
        const item = armor.Item.toLowerCase();
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
            item.includes(filter) ||
            effect ||
            recipe ||
            station
        );
    };

    return (
        <ValLayout
            background = {`url("/val_images/backgrounds/ebrithil_base.png")`}
            title = "Armor Recipes"
        >
            <ValTableLayout
                filterFunction = {armorFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/armor"}
                contentFlag = 'capes'
                contentNames = {["Item", "Effects", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {armorFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/armor"}
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
                imgBasePath = {"/val_images/armor"}
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
                imgBasePath = {"/val_images/armor"}
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