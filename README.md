<h1 align="center">
  Valheim Companion App
</h1>

## Instructions

**HOW TO USE:**
  - To run the web app, first download the files into a directory titled "valheim_companion". Next navigate into your new site’s directory and start it up.

    ```shell
    cd valheim_companion/
    npm run develop
    ```
  - The home page will now be available at localhost:8000
  - Once the home page loads, use the buttons to select a secondary page to open. The buttons labeled, "Tools", "Weapons", and "Armor" currently only display a pop-up informing the user that they are under construction.
  - To go back to the home page, simply click the "Back to Home" button at the bottom of the page, or close the browser tab.

**TIPS:**
  - The Food and Mead pages allow the user to filter results in the table. 
  - For mead, the user can search by item name, ingredient name, or effect. 
  - For food, the user can search by item name, ingredient name, biome, or stat type.
    - When filtering by stat type, the user can type, "health" and the app determines which attribute (health, stamina, or eitr) is the highest, and displays the foods that have health as their primary stat.