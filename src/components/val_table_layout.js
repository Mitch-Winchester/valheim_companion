import * as React from 'react'
import {
    tableDiv,
    table,
    tableHead,
    tableList,
    tableRow,
    qualityTableData
} from './val_layout.module.css'

const ValTableLayout = ({
    filter,
    filterFunction,
    data,
    headers,
    imgBasePath,
    contentFlag = 'content',
    contentNames = headers
}) => {
    // get first column name
    let firstKey = contentNames[0];

    // Filter table items based on passed in filter function
    const filteredItems = filterFunction && filter !== undefined
        ? data.flatMap(node =>
            node[contentFlag].filter(item => filterFunction(item, filter))
          )
        : data.flatMap(node => node[contentFlag] // return all items if no filter
    );
    console.log(filteredItems);

    return (
        <> {/* If search returns no results, will not display table */}
        {filteredItems.length !== 0 ?  (
            <div className={tableDiv}>
                <table className={table}>
                    <thead>
                        <tr>
                            <th aria-label='image'></th>
                                {headers.map(column => (
                                    <th className={tableHead}>{column}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => {
                            let imagePath = `${imgBasePath}/${item[firstKey].replaceAll(' ', '_')}.png`;
                        
                            return (
                                <tr key={index} className={tableRow}>
                                    <td>
                                        <img src={imagePath} alt={item[0]}/>
                                    </td>
                                    {contentNames.map((column, colIndex) => {
                                        if (typeof item[column] === 'object' && item[column] !== null) {
                                            // Handle Qualities Object
                                            if (column === 'Qualities') {
                                                return (
                                                    <td key={colIndex} className={tableList} colSpan={4}>
                                                        {item[column].map((quality, qualIndex) => (
                                                            <tr key={qualIndex} className={tableRow}>
                                                                <td className={qualityTableData}>{quality.Level}</td>
                                                                <td className={qualityTableData}>{quality.Durability}</td>
                                                                <td className={qualityTableData}>
                                                                    {quality.Recipe.map((ingredient, ingIndex) => (
                                                                        <div key={ingIndex}>
                                                                            {ingredient.Material}: {ingredient.Quantity}
                                                                        </div>
                                                                    ))}
                                                                </td>
                                                                <td className={qualityTableData}>
                                                                    {quality.CraftingStation?.map((ingredient, ingIndex) => (
                                                                        <div key={ingIndex}>
                                                                            {ingredient.Station}: {ingredient.Level}
                                                                        </div>
                                                                    ))}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </td>
                                                );
                                            } else if (column === 'Recipe') { // Handle Recipes Object
                                                return (
                                                    <td key={colIndex} className={tableList}>
                                                        {item[column].map((ingredient, ingIndex) => (
                                                            <tr key={ingIndex}>
                                                                <td>{ingredient.Material}: {ingredient.Quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </td>
                                                );
                                            } else { // Handle array values
                                                return (
                                                    <td key={colIndex} className={tableList}>
                                                        {item[column].map((type, typeIndex) => (
                                                            <tr key={typeIndex}>
                                                                <td>{type}</td>
                                                            </tr>
                                                        ))}
                                                    </td>
                                                )
                                            }
                                        } else { // Handle non-object values
                                            return <td key={colIndex}>{item[column]}</td>;
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        ) : null}
        </>
    )
}

export default ValTableLayout