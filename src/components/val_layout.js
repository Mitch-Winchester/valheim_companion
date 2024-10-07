import * as React from 'react'
import ValButton from './val_button'
import {
    backButtonDiv,
    valBody,
    header,
    mainHeader,
    searchContainer
} from './val_layout.module.css'

const ValLayout = ({
    background,
    title,
    children,
    showSearch = false
}) => {
    // Set initial filter & setFilter state
    const [filter, setFilter] = React.useState("");

    // Handle user input for the search
    const inputChange = (e) => {
        if (setFilter) {
            setFilter(e.target.value.toLowerCase());
        }
    };

    // Handle differences between home page and secondary pages
    let head = header;
    let navPath = "/";
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

    return (
        <>
            <body 
                className={valBody} 
                style={{backgroundImage: background}}
            >
                <header className={head}>{title}</header>
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
                {/* Pass filter & setFilter to children as props */}
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, { filter, setFilter })
                )}
                {showButton && (
                    <div className={backButtonDiv}>
                        <ValButton 
                            buttonText = {backButText}
                            navPath = {navPath}
                        />
                    </div>
                )}
            </body>
        </>
    )
}

export default ValLayout