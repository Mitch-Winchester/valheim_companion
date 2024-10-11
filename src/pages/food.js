import * as React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import ValLayout from '../components/val_layout'
import ValTableLayout from '../components/val_table_layout'

const ValFood = ({ data }) => {
    const [filter, setFilter] = React.useState("");

    // filterFunction to pass to tableLayout
    const foodFilter = (food, filter) => {
            const item = food.Item.toLowerCase();
            const biome = food.Biome.toLowerCase();
            const recipe = food.Recipe?.some(ingredient =>
                ingredient.Material.toLowerCase().includes(filter)
            );
            const health = parseFloat(food.Health) || 0;
            const stamina = parseFloat(food.Stamina) || 0;
            const eitr = parseFloat(food.Eitr) || 0;

            //text filters
            const textFilters =
                item.includes(filter) ||
                biome.includes(filter) ||
                recipe

            //"math" filters
            const balanced = health === stamina && filter.toLowerCase().includes("bal");
            const healthFilter = Math.max(health, stamina, eitr) === health && health !== stamina && filter.toLowerCase().includes("hea");
            const staminaFilter = Math.max(health, stamina, eitr) === stamina && health !== stamina && filter.toLowerCase().includes("sta");
            const eitrFilter = Math.max(health, stamina, eitr) === eitr && health !== stamina && filter.toLowerCase().includes("ei");

            return (
                textFilters ||
                balanced ||
                healthFilter ||
                staminaFilter ||
                eitrFilter
            );
        };

    return (
        <ValLayout
            background = {`url("/val_images/backgrounds/ebrithil_food.png")`}
            title = "Food Recipes"
        >
            <ValTableLayout
                filter = {filter}
                setFilter = {setFilter}
                filterFunction = {foodFilter}
                data = {data.allDataJson.nodes}
                headers = {["Item", "Health", "Stamina", "Eitr", "Healing (hp/tick)", "Duration (m)", "Biome", "Recipe"]}
                imgBasePath = {"/val_images/food"}
                contentNames = {["Item", "Health", "Stamina", "Eitr", "Healing", "Duration", "Biome", "Recipe"]}
            />
        </ValLayout>
    )
}

export const query = graphql`
    query {
        allDataJson(filter: {title: {eq: "Food"}}) {
            nodes {
                content {
                    Item
                    Health
                    Stamina
                    Eitr
                    Healing
                    Duration
                    Biome
                    Recipe {
                        Material
                        Quantity
                    }
                }
            }
        }
    }
`

export const Head = () => <Seo title="Valheim Food" />

export default ValFood