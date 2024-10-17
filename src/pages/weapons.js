import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValWeapons = ({ data }) => {
    // set weapons img path
    const weaponsImg = '/val_images/weapons';

    // filter function
    const weaponFilter = (weapon, filter) => {
        const item = weapon.Item.toLowerCase();
        const effect = weapon.Effects?.some(effect =>
            effect.toLowerCase().includes(filter)
        );
        const recipe = weapon.Qualities?.some(quality =>
            quality.Recipe?.some(ingredient =>
                ingredient.Material.toLowerCase().includes(filter)
            )
        );
        const station = weapon.Qualities?.some(quality =>
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
            title = "Weapon Recipes"
            content = {["axes"]}
        >
            <ValTableLayout
                filterFunction = {weaponFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Type", "Effects", "Stamina", "Speed", "Qualities",
                    "Durability", "Damage", "Block", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/axes"}
                contentFlag = 'axes'
                contentNames = {["Item", "Type", "Effects", "StamUse", "Speed",
                    "Qualities", "Durability", "Damage", "Block", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
        </ValLayout>
    )
}

// query weapons json objects
export const query = graphql`
    query {
        allDataJson(filter: {title: {eq: "Weapons"}}) {
            nodes {
                axes {
                    Item
                    Type
                    Effects
                    StamUse {
                        Primary
                        Secondary
                    }
                    Speed {
                        Primary
                        Secondary
                    }
                    Qualities {
                        Level
                        Durability
                        Damage {
                            Primary {
                                Type
                                Amount
                            }
                            Secondary {
                                Type
                                Amount
                            }
                        }
                        Block {
                            Type
                            Amount
                        }
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
export const Head = () => <Seo title="Valheim Weapons"/>

export default ValWeapons