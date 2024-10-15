import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValWeapons = ({ data }) => {
    
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
                    Stamina {
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