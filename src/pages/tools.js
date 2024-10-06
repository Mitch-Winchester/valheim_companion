import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

export const query = graphql`
    query MyQuery {
        allDataJson {
            nodes {
                building {
                    Item
                    Qualities {
                        Level
                        Durability
                        Recipe {
                            Material
                            Quantity
                        }
                        Workbench
                    }
                }
            }
        }
    }
`