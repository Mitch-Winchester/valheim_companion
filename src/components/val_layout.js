import * as React from 'react'
import ValButton from './val_button'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
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
const MainHead = styled(Container)`
  background-image: url("/val_images/valheim_logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  margin: 0 auto 10vh;
  width: 80vw;
  height: 10rem;
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
    background,
    title,
    children,
    showSearch = true
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
        } else {
            showButton = false;
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
            {title === "Main" ? (
                <MainHead/>
            ) : (
                <PageHead>{title}</PageHead>
            )}
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
        </ValBody>
    )
}

export default ValLayout