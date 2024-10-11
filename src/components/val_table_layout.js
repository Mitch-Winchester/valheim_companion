import * as React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import {
    tableHead,
    tableList,
    tableRow,
    qualityTableData
} from './val_layout.module.css'

const TableHead = styled.h1`
    display: flex;
    justify-content: center center;
    color: rgb(255, 98, 0);
    text-shadow: 0 0.2vh lightgrey;
    font-size: 3vw;
    font-weight: 700;
    padding: 5px 10px;
    margin: auto;
    width: fit-content;
    border-radius: 15px;
    background-color: rgb(94, 102, 111, 0.75);
`;
const TableCon = styled(Container)`
    justify-content: center;
    zoom: 85%;

    @media (max-width: 1200px) {
        zoom: 82%;
    }
    @media (max-width: 768px) {
        zoom: 80%;
    }
    
    @media (max-width: 576px) {
        zoom: 75%;
    }
`;

const ValTable = styled.table`
    border: 4px solid black;
    border-collapse: collapse;
    text-align: center;
    font-size: 3vw;
    color: white;
    background-color: rgb(94, 102, 111, 0.75);
    margin: 0 auto;
    max-width: 80vw;    

    @media (max-width: 576px) {
        font-size: 2.5vw;
        max-width: 90vw;
    }
`

const ValTableLayout = ({
    filter,
    filterFunction,
    data,
    headers,
    imgBasePath,
    contentFlag = 'content',
    contentNames = headers,
    showTitle = false
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
        <> 
        {showTitle && filteredItems.length !== 0 ?  (
            <div>
                <TableHead>{contentFlag.charAt(0).toUpperCase()+contentFlag.slice(1)}</TableHead>
            </div>
        ) : null}
        {/* If search returns no results, will not display table */}
        {filteredItems.length !== 0 ?  (
            <TableCon fluid>
                <ValTable>
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
                                                                    {quality.Recipe?.map((ingredient, ingIndex) => (
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
                </ValTable>
            </TableCon>
        ) : null}
        </>
    )
}

export default ValTableLayout