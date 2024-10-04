import * as React from 'react'
import { navigate } from 'gatsby'
import {
    valBody,
    backButtonDiv,
    button,
    tableDiv,
    table,
    header,
    searchContainer
} from './val_layout.module.css'

const ValTableLayout = ({
    title,
    filter,
    setFilter,
    filterFunction,
    data,
    headers,
    imgBasePath,
    background
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
            <body className={valBody} style={{backgroundImage: {background}}}>
                <header className={header}>{title}</header>
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
            </body>
        </>
    )
}

export default ValTableLayout