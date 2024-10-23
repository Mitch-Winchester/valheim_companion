import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValWeapons = ({ data }) => {
    // set weapons img path
    const weaponsImg = '/val_images/weapons';

    // get damage types for drop down menu
    var damageTypes = [];
    data.allDataJson.nodes.flatMap(node =>
        Object.values(node).flatMap(items =>
            items.map(weapon => 
                weapon.Qualities.map(qual =>
                    Object.values(qual.Damage).forEach(damType =>
                        damType?.forEach(type =>
                            {if (!damageTypes.includes(type.Type)) {
                                return (damageTypes.push(type.Type))
                            }}
                        )
                    )
                )
            )
        )
    )

    // get content names for drop down menu
    var conFlag = Object.keys(data.allDataJson.nodes[0])

    // filter function
    const weaponFilter = (weapon, filter) => {
        const item = weapon.Item.toLowerCase().includes(filter);
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
        const damage = weapon.Qualities?.some(qual =>
            Object.values(qual.Damage).some(damType =>
                damType?.some(type =>
                    type.Type.toLowerCase().includes(filter)
                )
            )
        )

        return (
            item ||
            effect ||
            recipe ||
            station ||
            damage
        );
    };

    return (
        <ValLayout
            title = "Weapon Recipes"
            content = {conFlag}
            damage = {damageTypes}
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
            <ValTableLayout
                filterFunction = {weaponFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Type", "Effects", "Stamina", "Speed", "Qualities",
                    "Durability", "Damage", "Block", "Recipe", "Crafting Station"]}
                imgBasePath = {weaponsImg}
                contentFlag = 'clubs'
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
                clubs {
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