import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

// create mead page
const ValMead = ({ data }) => {

    // filterFunction to pass to tableLayout
    const meadFilter = (mead, filter) => {
            const item = mead.Item.toLowerCase();
            const effect = mead.Effect.toLowerCase();
            const recipe = mead.Recipe.some(ingredient => 
                ingredient.Material.toLowerCase().includes(filter)
            );

            return (
                item.includes(filter) ||
                effect.includes(filter) ||
                recipe
            );
    };

    return (
        <ValLayout 
            background = {`url("/val_images/backgrounds/ebrithil_mead.png")`}
            title = "Mead Recipes"
        >
            <ValTableLayout
                filterFunction = {meadFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effect", "Duration (s)", "Recipe"]}
                imgBasePath = {"/val_images/mead"}
                contentNames = {["Item", "Effect", "Duration", "Recipe"]}
            />
        </ValLayout>
    )
}

// query mead json object
export const query = graphql`
    query {
        allDataJson(filter: {title: {eq: "Mead"}}) {
            nodes {
                content {
                    Item
                    Effect
                    Duration
                    Recipe {
                        Material
                        Quantity
                    }
                }
            }
        }
    }
`

// create page title
export const Head = () => <Seo title="Valheim Mead" />

export default ValMead