import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

// create tools page
const ValTools = ({ data }) => {
    // set base tool image path
    const toolsImgs = '/val_images/tools';

    // filterFunction to pass to tableLayout
    const toolFilter = (tool, filter) => {
        const item = tool.Item.toLowerCase();
        const use = tool.Uses?.some(use =>
            use.toLowerCase().includes(filter)
        );
        const recipe = tool.Qualities?.some(quality =>
            quality.Recipe?.some(ingredient =>
                ingredient.Material.toLowerCase().includes(filter)
            )
        );
        const station = tool.Qualities?.some(quality =>
            quality.CraftingStation?.some(station =>
                station.Station.toLowerCase().includes(filter)
            )
        );

        return (
            item.includes(filter) ||
            use ||
            recipe ||
            station
        );
    };

    return (
        <ValLayout
            background = {`url("/val_images/backgrounds/ebrithil_base.png")`}
            title = "Tool Recipes"
            content = {["adventuring", "building", "farming", "fishing", "logging", "mining"]}
        >
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {toolsImgs}
                contentFlag = 'adventuring'
                contentNames = {["Item", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {toolsImgs}
                contentFlag = 'building'
                contentNames = {["Item", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {toolsImgs}
                contentFlag = 'farming'
                contentNames = {["Item", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {toolsImgs}
                contentFlag = 'fishing'
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Tree Types", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/axes"}
                contentFlag = 'logging'
                contentNames = {["Item", "Uses", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Ore Types", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {toolsImgs}
                contentFlag = 'mining'
                contentNames = {["Item", "Uses", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
        </ValLayout>
    )
}

// query tools json object
export const query = graphql`
    query {
        allDataJson(filter: {title: {eq: "Tools"}}) {
            nodes {
                adventuring {
                    Item
                    Qualities {
                        Level
                        Durability
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
                building {
                    Item
                    Qualities {
                        Level
                        Durability
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
                farming {
                    Item
                    Qualities {
                        Level
                        Durability
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
                fishing {
                    Item
                    Qualities {
                        Level
                        Recipe {
                            Material
                            Quantity
                        }
                    }
                }
                logging {
                    Item
                    Uses
                    Qualities {
                        Level
                        Durability
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
                mining {
                    Item
                    Uses
                    Qualities {
                        Level
                        Durability
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

// create page title
export const Head = () => <Seo title="Valheim Tools"/>

export default ValTools