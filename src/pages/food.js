import * as React from 'react'
import { navigate, graphql } from 'gatsby'
import Seo from '../components/seo'
import {
    foodBody,
    backButtonDiv,
    button,
    tableDiv,
    table,
    header,
    searchContainer
} from '../components/val_layout.module.css'

const ValFood = ({ data }) => {
    const [filter, setFilter] = React.useState("");

    // Handle user input for the search
    const inputChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    // Filter table rows based on search input
    const filteredItems = data.allDataJson.nodes.flatMap(node =>
        node.content.filter(food => {
            const item = food.Item.toLowerCase();
            const biome = food.Biome.toLowerCase();
            const recipe = food.Recipe?.toLowerCase();
            const health = parseFloat(food.Health) || 0;
            const stamina = parseFloat(food.Stamina) || 0;
            const eitr = parseFloat(food.Eitr) || 0;

            //text filters
            const textFilters =
                item.includes(filter) ||
                biome.includes(filter) ||
                recipe?.includes(filter);

            //"math" filters
            const balanced = health === stamina && filter.toLowerCase().includes("bal");
            const healthFilter = Math.max(health, stamina, eitr) === health && health !== stamina && filter.toLowerCase().includes("hea");
            const staminaFilter = Math.max(health, stamina, eitr) === stamina && health !== stamina && filter.toLowerCase().includes("sta");
            const eitrFilter = Math.max(health, stamina, eitr) === eitr && health !== stamina && filter.toLowerCase().includes("eit");

            return (
                textFilters ||
                balanced ||
                healthFilter ||
                staminaFilter ||
                eitrFilter
            );
        })
    );

    return (
        <>
            <body className={foodBody}>
                <header className={header}>Food Recipes</header>
                <div className={searchContainer}>
                    <input 
                        type="text" 
                        id="searchBar" 
                        placeholder="Search..." 
                        onChange={inputChange}
                    />
                </div>
                
                <div className={tableDiv}>
                    <table className={table}>
                        <thead>
                            <tr id="tableHeader">
                                <th></th>
                                <th>Item</th>
                                <th>Health</th>
                                <th>Stamina</th>
                                <th>Eitr</th>
                                <th>Healing</th>
                                <th>Duration (min)</th>
                                <th>Biome</th>
                                <th>Recipe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((food, index) => {
                                    let imagePath = `/images/food/${food.Item.replaceAll(' ','_')}.png`;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={imagePath}
                                                    alt={food.Item}
                                                />
                                            </td>
                                            <td>{food.Item}</td>
                                            <td>{food.Health}</td>
                                            <td>{food.Stamina}</td>
                                            <td>{food.Eitr}</td>
                                            <td>{food.Healing}</td>
                                            <td>{food.Duration}</td>
                                            <td>{food.Biome}</td>
                                            <td>{food.Recipe}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className={backButtonDiv}>
                    <button className={button} onClick={()=>{navigate("/")}}>Back to Home Page</button>
                </div>
            </body>
        </>
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
                    Recipe
                }
            }
        }
    }
`

export const Head = () => <Seo title="Valheim Food" />

export default ValFood