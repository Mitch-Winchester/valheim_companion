import * as React from 'react'
import ValButton from './val_button'
import styled from 'styled-components'
import { Container, Dropdown } from 'react-bootstrap'
import { useLocation } from '@reach/router'

// styled-components
const ValBody = styled(Container)`
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2rem 0;
`;
const BackButCon = styled(Container)`
    display: flex;
    justify-content: center;
    margin: 4rem auto 0;
`;
const SearchBar = styled(Container)`
    display: flex;
    justify-content: center;
    margin: 1% auto;
    width: fit-content;
`;
const SearchInput = styled.input`
    max-width: 25vw;

    @media (max-width: 576px) {
        font-size: 3vw;
    }
`;
const DropFilter = styled(Dropdown)`
    margin-right: 10px;
`;
const DropFilterToggle = styled(Dropdown.Toggle)`
    margin: auto;
    background-color: rgb(94, 102, 111);
    border: none;

    &:hover,
    &.active,
    &.show {
        background-color: rgb(80, 85, 91);
    }    
    @media (max-width: 576px) {
        font-size: 3vw;
    }
`;
const DropFilterItem = styled(Dropdown.Item)`
    &:hover {
        color: white;
        background-color: rgb(94, 102, 111);
    }    
    @media (max-width: 576px) {
        font-size: 3vw;
    }
`;
const MainHead = styled(Container)`
  background-image: url("/val_images/valheim_logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  margin: 0 auto 10vh;
  width: 80vw;
  height: 8rem;
`;
const PageHead = styled.header`
  display: flex;
  justify-content: center center;
  color: rgb(255, 98, 0);
  text-shadow: 0 0.25vh lightgrey;
  font-size: 5vw;
  font-weight: 700;
  margin: 3rem auto;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 15px;
  background-size: contain;
  background-color: rgb(94, 102, 111, 0.75);
`;

const ValLayout = ({
    background = `url("/val_images/backgrounds/ebrithil_base.png")`,
    title,
    children,
    showSearch = true,
    content = null,
    damage = null
}) => {
    // Get the current pathname from the location object
    const location = useLocation();

    // Determine if val_comp is running as submodule or not
    const isSubmodule = location.pathname.startsWith("/val_comp");

    // Set default values for back button logic
    let navPath = isSubmodule ? "/val_comp/src/pages" : "/";
    let backButText = "Back to Home Page";
    let showButton = true;

    // determine if val_comp home page needs a back button
    // and set text
    if (title === "Main") {
        if (isSubmodule) {
            backButText = "Back to Main Site";
            navPath = "/";
        } else {
            showButton = false;
        }
    }

    // Set initial filter & setFilter state
    const [filter, setFilter] = React.useState("");
    const [contentFilter, setContentFilter] = React.useState(null);
    const [damTypeFilter, setDamTypeFilter] = React.useState();

    // Handle user input for the search
    const inputChange = (e) => {
        if (setFilter) {
            setFilter(e.target.value.toLowerCase());
        }
    };
    // Handle dropdown menu input
    const typeSelect = (e) => {
        if (setContentFilter) {
            setContentFilter(e);
        }
    };
    const damTypeSelect = (e) => {
        if (setDamTypeFilter) {
            setDamTypeFilter(e?.toLowerCase());
        }
    };

    return (
        <ValBody fluid
            style={{backgroundImage: background}}
        >
            {title === "Main" ? (
                <MainHead/>
            ) : (
                <PageHead>{title}</PageHead>
            )}
            {showSearch && setFilter && (
                <SearchBar>
                    {content !== null ? (
                    <DropFilter onSelect={typeSelect}>
                        <DropFilterToggle id="typeDropdown">
                            {contentFilter === null ? (
                                title.replaceAll('Recipes', 'Types')
                            ) : contentFilter.charAt(0).toUpperCase()+contentFilter.slice(1)
                            }
                        </DropFilterToggle>
                        <Dropdown.Menu>
                            <DropFilterItem eventKey={null}>All</DropFilterItem>
                            {content.map((type, typeIndex) => (
                                <DropFilterItem key={typeIndex} eventKey={type}>
                                    {type.charAt(0).toUpperCase()+type.slice(1)}
                                </DropFilterItem>
                            ))}
                        </Dropdown.Menu>
                    </DropFilter>
                    ) : null}
                    {damage !== null ? (
                    <DropFilter onSelect={damTypeSelect}>
                        <DropFilterToggle id="damageDropdown">
                            {damTypeFilter === undefined ? (
                                'Damage Types'
                            ) : damTypeFilter?.charAt(0).toUpperCase()+damTypeFilter?.slice(1)
                            }
                        </DropFilterToggle>
                        <Dropdown.Menu>
                            <DropFilterItem eventKey={null}>All</DropFilterItem>
                            {damage.map((type, typeIndex) => (
                                <DropFilterItem key={typeIndex} eventKey={type}>
                                    {type.charAt(0).toUpperCase()+type.slice(1)}
                                </DropFilterItem>
                            ))}
                        </Dropdown.Menu>
                    </DropFilter>
                    ) : null}
                    <SearchInput 
                        type="text" 
                        placeholder="Search..." 
                        onChange={inputChange}
                        aria-label="search label"
                    />
                </SearchBar>
            )}
            {/* Pass filter & setFilter to children as props */}
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { filter, setFilter, contentFilter, damTypeFilter })
            )}
            {showButton && (
                <BackButCon>
                    <ValButton 
                        buttonText = {backButText}
                        navPath = {navPath}
                    />
                </BackButCon>
            )}
        </ValBody>
    )
}

export default ValLayout