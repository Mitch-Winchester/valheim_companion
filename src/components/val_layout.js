import * as React from 'react'
import ValButton from './val_button'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { useLocation } from '@reach/router'
import {
    header,
    mainHeader
} from './val_layout.module.css'

// styled-components
const ValBody = styled(Container)`
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto ;
`;
const BackButCon = styled(Container)`
    display: flex;
    justify-content: center;
    margin: 4rem auto 0;
`;
const SearchBar = styled(Container)`
    justify-content: center;
    margin: 1% auto;
    width: fit-content;
`;
const SearchInput = styled.input`
    max-width: 20vw;
    border: none;

    @media (max-width: 576px) {
        font-size: 3vw;
    }
`;

const ValLayout = ({
    background,
    title,
    children,
    showSearch = true
}) => {
    // Get the current pathname from the location object
    const location = useLocation();

    // Determine if val_comp is running as submodule or not
    const isStandalone = location.pathname.startsWith("/val_comp");

    // Set default values for back button logic
    let head = header;
    let navPath = isStandalone ? "/val_comp/src/pages" : "/";
    let backButText = "Back to Home Page";
    let showButton = true;

    if (title === "Main") {
        head = mainHeader;
        title = '';
        if (navPath === "/") {
            showButton = false;
        } else {
            navPath = "/";
            backButText = "Back to Main Site";
        }
    }
        
    // Set initial filter & setFilter state
    const [filter, setFilter] = React.useState("");

    // Handle user input for the search
    const inputChange = (e) => {
        if (setFilter) {
            setFilter(e.target.value.toLowerCase());
        }
    };

    return (
        <ValBody fluid
            style={{backgroundImage: background}}
        >
            <header className={head}>{title}</header>
            {showSearch && setFilter && (
                <SearchBar>
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
                React.cloneElement(child, { filter, setFilter })
            )}
            {showButton && (
                <BackButCon>
                    <ValButton 
                        buttonText = {backButText}
                        navPath = {navPath}
                    />
                </BackButCon>
            )}
            <div style={{margin: "2rem"}}></div>
        </ValBody>
    )
}

export default ValLayout