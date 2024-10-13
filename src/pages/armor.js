import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

// create armor page
const ValArmor = ({ data }) => {
    return (
        <ValLayout
            background = {`url("/val_images/backgrounds/ebrithil_base.png")`}
            title = "Armor Recipes"
            showSearch = {false}
        >
            <ValTableLayout
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effects", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/armor"}
                contentFlag = 'capes'
                contentNames = {["Item", "Effects", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
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