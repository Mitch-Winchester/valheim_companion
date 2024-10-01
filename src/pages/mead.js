import * as React from 'react'
import { navigate, graphql } from 'gatsby'
import Seo from '../components/seo'
import {
    meadBody,
    backButtonDiv,
    button,
    tableDiv,
    table,
    header,
    searchContainer
} from '../components/val_layout.module.css'

const ValMead = ({ data }) => {
    const [filter, setFilter] = React.useState("");

    // Handle user input for the search
    const inputChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    // Filter table rows based on search input
    const filteredItems = data.allDataJson.nodes.flatMap(node =>
        node.content.filter(mead => {
            const item = mead.Item.toLowerCase();
            const effect = mead.Effect.toLowerCase();
            const recipe = mead.Recipe.toLowerCase();
            return (
                item.includes(filter) ||
                effect.includes(filter) ||
                recipe.includes(filter)
            );
        })
    );

    return (
        <>
            <body className={meadBody}>
                <header className={header}>Mead Recipes</header>
                <div className={searchContainer}>
                    <input 
                        type="text" 
                        aria-label="searchBar" 
                        placeholder="Search..." 
                        onChange={inputChange}
                    />
                </div>
                
                <div className={tableDiv}>
                    <table className={table}>
                    <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Effect</th>
                                <th>Duration (s)</th>
                                <th>Recipe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((mead, index) => {
                                    let imagePath = `/images/mead/${mead.Item.replaceAll(' ', '_')}.png`;
                                
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={imagePath}
                                                    alt={mead.Item}
                                                />
                                            </td>
                                            <td>{mead.Item}</td>
                                            <td>{mead.Effect}</td>
                                            <td>{mead.Duration}</td>
                                            <td>{mead.Recipe}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </div>
                        
                <div className={backButtonDiv}>
                    <button className={button} aria-label="back" onClick={()=>{navigate("/")}}>Back to Home Page</button>
                </div>
            </body>
        </>
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
                    Recipe
                }
            }
        }
    }
`

export const Head = () => <Seo title="Valheim Mead" />

export default ValMead