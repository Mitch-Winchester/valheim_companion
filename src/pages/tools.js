import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValTools = ({ data }) => {

    // filterFunction to pass to tableLayout
    const toolFilter = (tool, filter) => {
        const item = tool.Item.toLowerCase();

        return (
            item.includes(filter)
        );
    };

    return (
        <ValLayout
            background = {`url("/val_images/backgrounds/ebrithil_base.png")`}
            title = "Tool Recipes"
        >
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/tools"}
                contentFlag = 'adventuring'
                contentNames = {["Item", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/tools"}
                contentFlag = 'building'
                contentNames = {["Item", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/tools"}
                contentFlag = 'farming'
                contentNames = {["Item", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/tools"}
                contentFlag = 'fishing'
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Tree Types", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/tools"}
                contentFlag = 'logging'
                contentNames = {["Item", "Uses", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
            <div style={{marginBottom: '2%'}}></div>
            <ValTableLayout
                filterFunction = {toolFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Ore Types", "Qualities", "Durability", "Recipe", "Crafting Station"]}
                imgBasePath = {"/val_images/tools"}
                contentFlag = 'mining'
                contentNames = {["Item", "Uses", "Qualities", "Durability", "Recipe", "CraftingStation"]}
                showTitle = {true}
            />
        </ValLayout>
    )
}


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

export const Head = () => <Seo title="Valheim Tools"/>

export default ValTools