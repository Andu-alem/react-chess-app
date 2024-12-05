import { useState, useEffect, useRef } from 'react';
import {Chess} from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { getBestMove } from './StockfishWorker';
import Wellcome from './components/Wellcome'
import ChessGame from './components/ChessGame';
import Header from './components/Header';
import SettingsBar from './components/SettingsBar';

const App = () => {
  const [menuClicked, setMenuClicked] = useState(false)
  const [background, setBackground] = useState({black:'#206040', white: '#94b8b8'})
  const [wellcoming, setWelloming] = useState(true)
  const [playerName, setPlayerName] = useState('')
  const [opponentName, setOpponentName] = useState('')
  const [sidePreference, setSidePreference] = useState('w')
  const [isAIPlaying, setIsAIPlaying] = useState(true)
  const [difficulty, setDifficulty] = useState(5)
  const [isGameStarted, setGameStarted] = useState(false)
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)
  const [makeFirstMove, setMakeFirstMove] = useState(false)

  useEffect(() => {
    if (sidePreference==='b') setMakeFirstMove(true)
  },[sidePreference])
  const setupData = (data) => {
    const { level, isWithAi, name, opponentName, sidePreference } = data

    setIsAIPlaying(isWithAi)
    setDifficulty(level)
    setPlayerName(name)
    setOpponentName(opponentName)
    setWelloming(false)
    if (sidePreference === 'b' && isWithAi) {
      setIsWhiteTurn(false)
      setMakeFirstMove(true)
    }
    setSidePreference(sidePreference)
  }

  const settingBarProps = {
    setBackground,
    isGameStarted,
    name: playerName,
    sidePreference,
    setSidePreference,
    setupData,
  }

  return (
    <div className="w-[96%] lg:w-[87%] min-h-[100vh] shadow-zinc-700 mx-auto">
      <Header menuClicked={menuClicked} setMenuClicked={setMenuClicked} settingBarProps={ settingBarProps } />
      <div className={`${wellcoming ? 'fixed':'hidden'} opacity-[.95] min-h-[100vh] w-[96%] lg:w-[87%] top-0 bg-zinc-900`}>
          <Wellcome setupData={ setupData } />
      </div>
      <div className={`${wellcoming || menuClicked ? 'relative -z-50':'static'} sm:flex sm:justify-between sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] mx-auto`}>
        <div className="mt-4 w-[90%] xs:w-[84%] ms:w-[67%] sm:w-[50%] md:w-[45%] lg:w-[42%] mx-auto">
          <ChessGame 
            background={background}
            playerName={playerName}
            opponentName={opponentName}
            sidePreference={sidePreference}
            isAIPlaying={isAIPlaying}
            difficulty={difficulty}
            setGameStarted={setGameStarted}
            isWhiteTurn={isWhiteTurn}
            setIsWhiteTurn={setIsWhiteTurn}
            makeFirstMove={makeFirstMove}
          />
        </div>
        <div className="hidden w-[45%] sm:block border-l py-2 px-3 md:px-4 border-zinc-700">
          <SettingsBar { ...settingBarProps } setMenuClicked={setMenuClicked} />
        </div>
      </div>
    </div>
  );
};

export default App;
