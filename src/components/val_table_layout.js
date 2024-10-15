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

// Create styled-components
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
    max-width: 100vw;

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
    padding-left: 0;
    margin-bottom: 1rem;
`;
const QualCol = styled(Col)`
    padding-right: 0;
    flex: 1 1 30%;

    @media (max-width: 1300px) {
        flex: 1 1 40%;
    }
    @media (max-width: 768px) {
        flex: 1 1 50%;
    }
`;
const QualCard = styled(Card)`
    margin-bottom: 1rem;
    color: white;
    background-color: rgb(0, 0, 0, 0.3);
    width: fit-content;
`;
const DamageCard = styled(Card)`
    margin-bottom: 1rem;
    color: white;
    background-color: rgb(0, 0, 0, 0.3);
    width: fit-content;
`;
const QualBody = styled(CardBody)`
    padding: .1rem .25rem;
`;
const QualHeader = styled(CardHeader)`
    font-size: .9rem;
    font-weight: bold;
    padding-left: .5rem;
    padding-right: .5rem;
    padding-bottom: 0;
    white-space: nowrap;
    margin-bottom: .5rem;
    border-bottom: 2px solid white;
`;
const QualList = styled.ul`
    list-style: none;
    text-align: left;
    padding: 0;
`;
const EffectList = styled.ul`
    list-style: none;
    text-align: left;
    margin: 2rem;

    @media (max-width: 576px) {
        padding: 0;
        max-width: 6rem;
        margin: auto;
    }
`;
const Strong = styled.strong`
    @media (max-width: 576px) {
        font-size: 1.75vw;
    }
`;

// Create table
const ValTableLayout = ({
    filter,
    filterFunction,
    contentFilter,
    data,
    headers,
    imgBasePath,
    contentFlag = 'content',
    contentNames = headers,
    showTitle = false
}) => {
    // get first column name
    let firstKey = contentNames[0];

    // Determine if a contentFilter was selected
    const filteredContentFlag = contentFilter !== null ?
        contentFilter : contentFlag;

    // Filter table items based on passed in filter function
    const filteredItems = filterFunction && filter !== undefined
        ? data.flatMap(node =>
            node[filteredContentFlag].filter(item => filterFunction(item, filter))
          )
        : data.flatMap(node => node[filteredContentFlag] // return all items if no filter
    );

    const nonDetailCards = ['content', 'bait', 'crop', 'feed'];
    const usesItems = ['logging', 'mining'];
    const armor = ['capes', 'helmets', 'chest', 'legs'];
    const weapons = ['axes'];

    return (
        <> 
        {showTitle && filteredItems.length !== 0 && contentFlag === filteredContentFlag ?  (
            <div>
                <TableTitle>{contentFlag.charAt(0).toUpperCase()+contentFlag.slice(1)}</TableTitle>
            </div>
        ) : null}
        {/* If search returns no results, will not display table */}
        {filteredItems.length !== 0 && contentFlag === filteredContentFlag ?  (
            <TableCon fluid>
                <ValTable>
                    <thead>
                        <tr>
                            <th aria-label='image'></th> {/* header space for image column */}
                            { // handle standard headers
                            nonDetailCards.includes(contentFlag) ? (
                                headers.map(column => (
                                    <th>{column}</th>
                                ))
                            ) : (usesItems.includes(contentFlag) ? (
                            <> {/* Handle headers for tools with specific uses */}
                                <th>Item</th>
                                <th>Uses</th>
                                <th>Details</th>
                            </>
                            ) : (armor.includes(contentFlag)) ? (
                            <> {/* Handle headers for armor */}
                                <th>Item</th>
                                <th>Effects</th>
                                <th>Details</th>
                            </>
                            ) : (weapons.includes(contentFlag)) ? (
                            <> {/* Handle headers for weapons */}
                                <th>Item</th>
                                <th>Type</th>
                                <th>Effects</th>
                                <th>Stamina Use</th>
                                <th>Speed</th>
                                <th>Details</th>
                            </>
                            ) : (
                            <> {/* Handle headers for standard tools */}
                                <th>Item</th>
                                <th>Details</th>
                            </>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => {
                            // create image path for image directory and item name
                            let imagePath = `${imgBasePath}/${item[firstKey].replaceAll(' ', '_')}.png`;
                        
                            return (
                                <tr key={index}>
                                    <td> {/* Get image */}
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
                                                                    <QualCol key={qualIndex}>
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
                                                                                {quality.Damage ? (
                                                                                    <>
                                                                                    <p><strong>Damage:</strong></p>
                                                                                    {quality.Damage.Primary ? (
                                                                                    <Row style={{gap: '0', margin: '0', justifyContent: 'center'}}>
                                                                                        <Col xs={12} md={6}>
                                                                                            <DamageCard>
                                                                                                <QualBody>
                                                                                                    <CardText><strong>Primary:</strong></CardText>
                                                                                                    <QualList>
                                                                                                        {quality.Damage.Primary?.map((damage, damIndex) => (
                                                                                                            <li key={damIndex}>
                                                                                                                {damage.Type}: {damage.Amount}
                                                                                                            </li>
                                                                                                        ))}
                                                                                                    </QualList>
                                                                                                </QualBody>
                                                                                            </DamageCard>
                                                                                        </Col>
                                                                                        <Col xs={12} md={6}>
                                                                                            <DamageCard>
                                                                                                <QualBody>
                                                                                                    <CardText><strong>Secondary:</strong></CardText>
                                                                                                    <QualList>
                                                                                                        {quality.Damage.Secondary?.map((damage, damIndex) => (
                                                                                                            <li key={damIndex}>
                                                                                                                {damage.Type}: {damage.Amount}
                                                                                                            </li>
                                                                                                        ))}
                                                                                                    </QualList>
                                                                                                </QualBody>
                                                                                            </DamageCard>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    ) : null}
                                                                                    </>
                                                                                ) : null}
                                                                                {quality.Block ? (
                                                                                    <>
                                                                                    <strong>Block:</strong>
                                                                                    <QualList>
                                                                                        {quality.Block?.map((block, bloIndex) => (
                                                                                            <li key={bloIndex}>
                                                                                                {block.Type}: {block.Amount}
                                                                                            </li>
                                                                                        ))}
                                                                                    </QualList>
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
                                                                    </QualCol>
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
                                            } else if (column === 'Stamina' || column === 'Speed') {
                                                // Handle Stamina/Speed key-value pairs
                                                return (
                                                    <td>
                                                        <QualList>
                                                            <li>Primary: {item[column].Primary}</li>
                                                            <li>Secondary: {item[column].Secondary}</li>
                                                        </QualList>
                                                    </td>
                                                )
                                            } else { // Handle array values
                                                return (
                                                    <td>
                                                        <EffectList>
                                                            {item[column].map((type, typeIndex) => (
                                                                <li key={typeIndex}>
                                                                    {type}
                                                                </li>
                                                            ))}
                                                        </EffectList>
                                                    </td>
                                                );
                                            }
                                        } else { // Handle non-object values
                                            return (
                                                colIndex === 0 ? ( // gives title column the strong tag
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