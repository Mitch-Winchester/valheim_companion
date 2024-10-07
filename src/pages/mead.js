import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

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
            background = {`url("/images/backgrounds/ebrithil_mead.png")`}
            title = "Mead Recipes"
            showSearch = {true}
        >
            <ValTableLayout
                filterFunction = {meadFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Effect", "Duration (s)", "Recipe"]}
                imgBasePath = {"/images/mead"}
                contentNames = {["Item", "Effect", "Duration", "Recipe"]}
            />
        </ValLayout>
    )
}

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

export const Head = () => <Seo title="Valheim Mead" />

export default ValMead