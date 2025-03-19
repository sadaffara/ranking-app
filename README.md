# Ranking App

A small test application that displays a static list of users and their scores.
You can add new users or add new scores to existing users. It also supports importing user data from an Excel file.

# Getting Started

- Prerequisites
Node.js (version 16 or above recommended)
npm (comes with Node.js) or yarn

- Installation:

1. Clone the repository: 

`git clone https://github.com/sadaffara/ranking-app.git`

2. Install dependencies:

`npm install`
or
`yarn install`


3. Run the development server:

`npm run start`
or
`yarn start`

4. Open the app in your browser:

http://127.0.0.1:5173/

5. To run the tests,
`npm run test`
or 
`yarn test`

# Features

- View a list of users and their highest scores.
- Add new users with an initial score.
- Add new scores to existing users.
- Import users and scores from an Excel file.


# Tech Stack
- React
- Chakra UI / Northlight UI
- TypeScript
- Vite (for development server)
- Jest (Unit Testing)


# Folder Structure 

src/
├── components/        // Reusable UI components (UserItem, ExcelDropzone, etc.)
├── containers/        // Main container components (UserListContainer, CreateUserContainer)
├── data/              // Static data (initial users and scores)
├── tests/             // Tests for helper functions
├── types/             // TypeScript types
├── utils/             // Helper functions (getUsersHighestScores, processSheetData, etc.)




