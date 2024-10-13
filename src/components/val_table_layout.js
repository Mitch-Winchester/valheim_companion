import * as React from 'react'
import styled from 'styled-components'
import { 
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardText
} from 'react-bootstrap'

const TableTitle = styled.h1`
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
`;

const ValTable = styled.table`
    border: 4px solid black;
    border-collapse: collapse;
    text-align: center;
    font-size: 1vw;
    color: white;
    background-color: rgb(94, 102, 111, 0.75);
    margin: 0 auto;
    max-width: 90vw;

    th {
        text-align: center;
        font-size: 2vw;
    }

    @media (max-width: 768px) {
        font-size: 1.5vw;
        th {
            font-size: 3vw;
        }
    }
    @media (max-width: 576px) {
        font-size: 2vw;
        th {
            font-size: 1.75vw;
        }
    }
`;
const QualCon = styled(Container)`
    margin-bottom: 1rem;
`;
const QualCard = styled(Card)`
    margin-bottom: 1rem;
    color: white;
    background-color: rgb(0, 0, 0, 0.3);
    width: fit-content;
`;
const QualBody = styled(CardBody)`
    padding: .1rem .75rem;
`;
const QualHeader = styled(CardHeader)`
    font-size: .9rem;
    font-weight: bold;
    padding-bottom: 0;
    margin-bottom: .5rem;
    border-bottom: 2px solid white;
`;
const QualList = styled.ul`
    list-style: none;
    text-align: left;
    padding: 0;
`;
const Strong = styled.strong`
    @media (max-width: 576px) {
        font-size: 1.75vw;
    }
`;

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
    //console.log(filteredItems);

    const nonDetailCards = ['content', 'bait', 'crop', 'feed'];
    const usesItems = ['logging', 'mining'];
    const armor = ['capes', 'helmets', 'chest', 'leg'];

    return (
        <> 
        {showTitle && filteredItems.length !== 0 ?  (
            <div>
                <TableTitle>{contentFlag.charAt(0).toUpperCase()+contentFlag.slice(1)}</TableTitle>
            </div>
        ) : null}
        {/* If search returns no results, will not display table */}
        {filteredItems.length !== 0 ?  (
            <TableCon fluid>
                <ValTable>
                    <thead>
                        <tr>
                            <th aria-label='image'></th>
                            {nonDetailCards.includes(contentFlag) ? (
                                headers.map(column => (
                                    <th>{column}</th>
                                ))
                            ) : (usesItems.includes(contentFlag) ? (
                            <>
                                <th>Item</th>
                                <th>Uses</th>
                                <th>Details</th>
                            </>
                            ) : (armor.includes(contentFlag)) ? (
                            <>
                                <th>Item</th>
                                <th>Effects</th>
                                <th>Details</th>
                            </>
                            ) : (
                            <>
                                <th>Item</th>
                                <th>Details</th>
                            </>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => {
                            let imagePath = `${imgBasePath}/${item[firstKey].replaceAll(' ', '_')}.png`;
                        
                            return (
                                <tr key={index}>
                                    <td>
                                        <img src={imagePath} alt={item[0]}/>
                                    </td>
                                    {contentNames.map((column, colIndex) => {
                                        if (typeof item[column] === 'object' && item[column] !== null) {
                                            // Handle Qualities Object
                                            if (column === 'Qualities') {
                                                return (
                                                    <td>
                                                        <QualCon>
                                                            <Row>
                                                                {item[column].map((quality, qualIndex) => (
                                                                    <Col key={qualIndex}>
                                                                        <QualCard>
                                                                            <QualBody>
                                                                                <QualHeader>Level: {quality.Level}</QualHeader>
                                                                                {quality.Durability ? (
                                                                                    <>
                                                                                    <CardText>
                                                                                        <strong>Durability:</strong> {quality.Durability}
                                                                                    </CardText>
                                                                                    </>
                                                                                ) : null}
                                                                                {quality.Armor ? (
                                                                                    <>
                                                                                    <CardText>
                                                                                        <strong>Armor:</strong> {quality.Armor}
                                                                                    </CardText>
                                                                                    </>
                                                                                ) : null}
                                                                                {quality.Recipe ? (
                                                                                    <>
                                                                                    <strong>Recipe:</strong>
                                                                                    <QualList>
                                                                                        {quality.Recipe?.map((ingredient, ingIndex) => (
                                                                                            <li key={ingIndex}>
                                                                                                {ingredient.Material}: {ingredient.Quantity}
                                                                                            </li>
                                                                                        ))}
                                                                                    </QualList>
                                                                                    </>
                                                                                ) : null}
                                                                                {quality.CraftingStation ? (
                                                                                    <>
                                                                                    <strong>Crafting Station:</strong>
                                                                                    <QualList style={{textAlign: 'center'}}>
                                                                                        {quality.CraftingStation?.map((station, staIndex) => (
                                                                                            <li key={staIndex}>
                                                                                                {station.Station}: {station.Level}
                                                                                            </li>
                                                                                        ))}
                                                                                    </QualList>
                                                                                    </>
                                                                                ) : null}
                                                                            </QualBody>
                                                                        </QualCard>
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </QualCon>
                                                    </td>
                                                );
                                            } else if (column === 'Recipe') { // Handle Recipes Object
                                                return (
                                                    <td>
                                                        <QualList style={{paddingLeft: '1rem'}}>
                                                            {item[column].map((ingredient, ingIndex) => (
                                                                <li key={ingIndex}>
                                                                    {ingredient.Material}: {ingredient.Quantity}
                                                                </li>
                                                            ))}
                                                        </QualList>
                                                    </td>
                                                );
                                            } else { // Handle array values
                                                return (
                                                    <td>
                                                        <QualList>
                                                            {item[column].map((type, typeIndex) => (
                                                                <li key={typeIndex}>
                                                                    {type}
                                                                </li>
                                                            ))}
                                                        </QualList>
                                                    </td>
                                                );
                                            }
                                        } else { // Handle non-object values
                                            return (
                                                colIndex === 0 ? (
                                                    <td key={colIndex}><Strong>{item[column]}</Strong></td>
                                                ) : (
                                                    <td key={colIndex}>{item[column]}</td>
                                                )
                                            );
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