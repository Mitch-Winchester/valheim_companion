import * as React from 'react'
import {
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
    imgBasePath,
    showSearch = true,
    contentFlag = 'content',
    contentNames = headers
}) => {
    // get first column name
    let firstKey = contentNames[0];

    // Handle user input for the search
    const inputChange = (e) => {
        if (setFilter) {
            setFilter(e.target.value.toLowerCase());
        }
    };

    // Filter table items based on passed in filter function
    const filteredItems = filterFunction && filter !== undefined
        ? data.flatMap(node =>
            node[contentFlag].filter(item => filterFunction(item, filter))
          )
        : data.flatMap(node => node[contentFlag] // return all items if no filter
    );

    return (
        <>
            {showSearch && setFilter && (
                <div className={searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        onChange={inputChange}
                        aria-label="search label"
                    />
                </div>
            )}
            <div className={tableDiv}>
                <table className={table}>
                    <thead>
                        <tr>
                            <th aria-label='image'></th>
                            {headers.map(column => (
                                <th>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => {
                                let imagePath = `${imgBasePath}/${item[firstKey].replaceAll(' ', '_')}.png`;
                            
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={imagePath}
                                                alt={item[0]}
                                            />
                                        </td>
                                        {contentNames.map(column => (
                                            <td>{item[column]}</td>
                                        ))}
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ValTableLayout