# React Native REST API Application

This project is a React Native application that retrieves data from a REST API. It is structured to provide a clean and efficient way to display data, handle loading states, and manage errors.

## Project Structure

- **src/**: Contains all the source code for the application.
  - **App.tsx**: Main entry point of the application.
  - **components/**: Contains reusable components.
    - **Loading.tsx**: Displays a loading indicator.
    - **ErrorView.tsx**: Displays an error message.
  - **screens/**: Contains the main screens of the application.
    - **HomeScreen.tsx**: Displays the main content and retrieves data from the API.
    - **DetailScreen.tsx**: Displays detailed information about a selected item.
  - **navigation/**: Contains navigation setup.
    - **AppNavigator.tsx**: Sets up the navigation structure.
  - **services/**: Contains API call functions.
    - **api.ts**: Functions for making API calls.
  - **hooks/**: Contains custom hooks.
    - **useFetch.ts**: Simplifies data fetching logic.
  - **store/**: Contains Redux store configuration.
    - **index.ts**: Redux store setup.
  - **types/**: Contains TypeScript interfaces and types.
    - **index.ts**: Type definitions.
  - **utils/**: Contains utility functions.
    - **format.ts**: Functions for formatting data.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd rn-rest-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

## Usage

- The application will display a loading indicator while fetching data from the API.
- If an error occurs during data fetching, an error message will be displayed.
- The main screen shows the list of items retrieved from the API, and selecting an item navigates to the detail screen.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.