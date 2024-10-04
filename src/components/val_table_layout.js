import * as React from 'react'
import { navigate } from 'gatsby'
import {
    backButtonDiv,
    button,
    tableDiv,
    table,
    searchContainer
} from './val_layout.module.css'

const ValTableLayout = ({
    filter,
    setFilter,
    filterFunction,
    data,
    headers,
    imgBasePath
}) => {
    // Handle user input for the search
    const inputChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    // Filter table items based on passed in filter function
    const filteredItems = data.flatMap(node =>
        node.content.filter(item => filterFunction(item, filter))
    );

    return (
        <>
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
                        <tr>
                            <th></th>
                            {headers.map(column => (
                                <th>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => {
                                let imagePath = `${imgBasePath}/${item.Item.replaceAll(' ', '_')}.png`;
                            
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={imagePath}
                                                alt={item.Item}
                                            />
                                        </td>
                                        {headers.map(column => (
                                            <td>{item[column]}</td>
                                        ))}
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={backButtonDiv}>
                <button className={button} aria-label="back" onClick={()=>{navigate("/")}}>Back to Home Page</button>
            </div>
        </>
    )
}

export default ValTableLayout