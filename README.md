# Weather Web App Specification

## Description
Build a web app that displays weather details of different cities and allows a user to search for the weather details of a particular city.

## UI Layout Structure
The layout will consist of two tables:
1. **City List Table** (Single column on the left)
   - Column Header: "City List"
   
2. **Details Table** (6 columns)
   - Column Headers: ["City Name", "Temperature", "Humidity", "Weather", "Data Age", "Actions"]

### Additional Elements
- **Clickable Buttons:**
  - "Get Weather"
  - "Search"

### Data Handling
- If no data is present in the table, display **"No Data"**.
  
## User Interaction and Flow
1. User clicks on the **“Get Weather”** button.
2. The web app highlights the first row in the **“City List”** table with a green border.
3. The app fetches JSON information from the API:
   - **Method:** GET
   - **URL:** `https://python3-dot-parul-arena-2.appspot.com/test?cityname=<city name in the current row>`
   - Example: `https://python3-dot-parul-arena-2.appspot.com/test?cityname=London`
4. Weather information is fetched and inserted into the **Details** table.
5. The app highlights the next city and repeats steps 2 to 4.

## API Details

- **API Base URL:** `https://python3-dot-parul-arena-2.appspot.com/test`

- **Request Method:** `GET`

- **Query Parameter:**
  - `cityname`: This parameter should contain the name of the city for which you want to fetch weather information.


