## Link 

- https://react-chess-app-vert.vercel.app/


# ChessZone

A fully functional web-based chess game application to play chess with stockfish powerd AI opponent or with a friend.

## Features

- **Play Chess**: Play against the AI powered by Stockfish or with your friend.
-**Chess Rules**: All of chess rules are allowed.
- **Asks Preference**: The app asks you your name, side preference and if you are playing with AI it asks you to set difficulty level or if you are playing with your friend it asks you your friend name the default is JD when the game first starts.
- **Change Preferences**: You can change prefernces after the game loads by going to the side bar or if you are using small screen devices by pressing the menu bar you can set your new prefernces.
- **Select Side**: Choose white or black side before the game starts. Note: the White side makes the first move.
- **Change Board Color**: Customize the chessboard with different predefined color combinations that suits your prefernce.
- **Set Difficulty Level**: Adjust the AI difficulty to match your skill level.
- **Responsive Design**: Optimized for both desktop and mobile platforms.
- **Undo**: Undo the moves that are made mistakingly.
- **Reset**: Retrun the game state to the begining level / Reloads the game.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Stockfish**: Open-source chess engine for AI.
- **Chess.js**: JavaScript library for chess move generation, validation, and game state management.
- **React Chess Board**: React component for rendering the chessboard.
- **Vite ⚡**: Next Generation Frontend Tooling


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Andu-alem/react-chess-app.git
   cd react-chess-app

2. **Install dependencies**:
   npm install

3. **Start development server**:
   npm run dev


## Usage

1. Open the application in your browser and fill the following
	1.1 - Fill your name
	1.2 - Choose who you want to play
		1.2.1 - If AI set difficulty level that matche your skill level. And choose your side preference if want to make the first move choose White else Black.
		1.2.1 - If you want to play with your friend set your friend name the default is JD for John Doe. And choose your side preference if want to make the first move choose White else Black.
2. Change filled preferences by going to the side bar if you want to. If you are using small screen devices like mobile phone you can get the settings by clicking the menu bar on the top left of the screen.

3. Enjoy playing.


Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

License

This project is licensed under the MIT License.

Acknowledgements

React
Tailwind CSS
Stockfish
Chess.js
React Chess Board
Vite

Thank you for using ChessZone! If you have any questions or feedback, feel free to open an issue or contact us.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
