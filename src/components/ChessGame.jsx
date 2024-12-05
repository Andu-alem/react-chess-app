import { useState, useEffect, useRef } from 'react'
import {Chess} from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { getBestMove } from '../StockfishWorker'
import pieces from './../pieces'
import CapturedList from './CapturedList'
import CheckMate from './CheckMate'
import ControlArea from './ControlArea'

const ChessGame = (props) => {
  const { 
    difficulty, 
    background,
    isAIPlaying,
    playerName,
    opponentName,
    sidePreference,
    isWhiteTurn,
    setIsWhiteTurn,
    makeFirstMove,
    setGameStarted } = props
    
  const [game, setGame] = useState(new Chess())
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [fen, setFen] = useState([])
  const [capturedBlacks, setCapturedBlacks] = useState([])
  const [capturedWhites, setCapturedWhites] = useState([])
  const [whoWins, setWhoWins] = useState('no-one')
  const [gameOver, setGameOver] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [isInCheck, setIsInCheck] = useState(false)
  
  useEffect(() => {
    if(makeFirstMove) {
      makeAiMove()
      setGameStarted(true)
    }
  },[makeFirstMove])
  
  const onSquareClick = (square) => {
    if (selectedSquare === null) {
      if (game.get(square)) {
        setSelectedSquare(square)
      }
    } else {
      if (selectedSquare === square) {
        // if a user click the same square twice
        return
      } else if (game.get(square).color === game.get(selectedSquare).color) {
        //if the user moves mistakingly on self pieces
        setSelectedSquare(square)
        return
      }

      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q', // Optional: Promote pawn to queen
        })

        if (move) {
          setGameStarted(true)
          setIsInCheck(false)
          setGame(new Chess(game.fen()));
          setSelectedSquare(null);
          setIsWhiteTurn(!isWhiteTurn)

          if (game.isGameOver()) {
            if (game.isDraw()) {
              setWhoWins('draw')
            } else {
              setWhoWins('one')
            }
            setGameOver(true)
            return 
            
          } else {
            setIsWhiteTurn(!isWhiteTurn)
            if (isAIPlaying) { 
              makeAiMove()
            } else {
              addCaptured(game._history)
            }
          }

        } else {
          setSelectedSquare(null)
        }
        return
      } catch (error) {

        setInvalid(true)
        setTimeout(() => setInvalid(false), 3000)
        setSelectedSquare(null)
      }
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {

    try {
      
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', 
      });
      if (move === null) return false
      setGameStarted(true)
      setIsInCheck(false)
      setGame(new Chess(game.fen()))

      if (game.isGameOver()) {
        if (game.isDraw()) {
          setWhoWins('draw')
        } else {
          setWhoWins('one')
        }
        setGameOver(true)
        return false
      } else {
        setIsWhiteTurn(!isWhiteTurn)
        if (isAIPlaying) { 
          makeAiMove()
        } else {
          addCaptured(game._history)
        }

        return true
      }
      
    } catch (error) {
      //notify user with invalid move message          
      setInvalid(true)
      setTimeout(() => setInvalid(false), 3000)
      return false
    }
  }

  const makeAiMove = () => {
    getBestMove(game.fen(), difficulty, (bestMove) => {
      game.move(bestMove)
  
      if (game.isGameOver()) {
        if (game.isDraw()) {
          setWhoWins('draw')
        } else {
          setWhoWins('opponent')
        }
        setGameOver(true)
        return
      }
      addCaptured(game._history)
      setGame(new Chess(game.fen()))
      setFen([...fen, game.fen()])
      setIsWhiteTurn(sidePreference==='w' ? true:false)

      if (game.inCheck()) {
        setIsInCheck(true)
        return
      }
      
    })
  }
  const addCaptured = (history) => {
      
      for (let i in history) {
          let move = history[i].move
                    
          if (move.captured !== undefined) {
              if (move.color == "b") {
                switch (move.captured) {
                  case 'n':
                    setCapturedWhites([...capturedWhites, pieces.wN])
                    break
                  case 'b':
                      setCapturedWhites([...capturedWhites, pieces.wB])
                      break
                  case 'r':
                      setCapturedWhites([...capturedWhites, pieces.wR])
                      break
                  case 'q':
                      setCapturedWhites([...capturedWhites, pieces.wQ])
                      break                
                  default:
                      setCapturedWhites([...capturedWhites, pieces.wP])
                    break
                }
              } else {
                switch (move.captured) {
                  case 'n':
                    setCapturedBlacks([...capturedBlacks, pieces.bN])
                    break
                  case 'b':
                      setCapturedBlacks([...capturedBlacks, pieces.bB])
                      break
                  case 'r':
                      setCapturedBlacks([...capturedBlacks, pieces.bR])
                      break
                  case 'q':
                      setCapturedBlacks([...capturedBlacks, pieces.bQ])
                      break                
                  default:
                      setCapturedBlacks([...capturedBlacks, pieces.bP])
                    break
                }
              }
          }
      }
  }

  const resetHandler = () => {
    game.reset()
    setGame(new Chess(game.fen()))
    setCapturedBlacks([])
    setCapturedWhites([])
    setGameOver(false)
    setGameStarted(false)
    setIsWhiteTurn(true)
    setIsInCheck(false)
    setFen([])
    if (makeFirstMove) {
      makeAiMove()
      setGameStarted(true)
    }
  }

  const undoHandler = () => {
    let lastFen = fen.length > 0 ? fen[fen.length-2] : null
    if (lastFen) {
        setGame(new Chess(lastFen))
        setFen(fen.slice(0, fen.length-1))
    } else {
        setGame(new Chess())
        setCapturedBlacks([])
        setCapturedWhites([])
    }
  }


  return (
    <div className="">
        <div className={`flex justify-start px-1 my-1 min-h-[50px] border border-gray-700 ${isInCheck && (sidePreference==='w'? !isWhiteTurn:isWhiteTurn) ? 'text-red-500 border-red-500': (sidePreference==='w'? isWhiteTurn:!isWhiteTurn) ? 'text-white border-gray-700':'text-green-500 border-green-500'}`}>
            <h2 className="font-bold text-sm capitalize mt-1 px-1 border-r border-green-500">
              { opponentName }<br/><span className={`${isInCheck && !(sidePreference==='w'? isWhiteTurn:!isWhiteTurn) ? 'block':'hidden'} text-sm text-red-500`}>Check</span>
            </h2>
            <CapturedList pieces={ sidePreference === 'w' ? capturedWhites:capturedBlacks } />
        </div>

        <div className="shadow-md shadow-zinc-700">
            <Chessboard
                position={ game.fen() }
                onSquareClick={ onSquareClick }
                onPieceDrop={ onDrop }
                boardOrientation={sidePreference === 'w' ? 'white':'black'}
                squareStyles={{
                    [selectedSquare]: { backgroundColor: 'rgba(255, 255, 110, 0.5)' },
                }}
                customDarkSquareStyle={{
                  backgroundColor: background.black
                }}
                customLightSquareStyle={{
                  backgroundColor: background.white
                }}
            />
        </div>
        <div className={`flex justify-start px-1 my-2 min-h-[50px] border border-gray-700 ${isInCheck && (sidePreference==='w'? isWhiteTurn:!isWhiteTurn) ? 'text-red-500 border-red-500': !(sidePreference==='w'? isWhiteTurn:!isWhiteTurn) ? 'text-white border-gray-700':'text-green-500 border-green-500'}`}>
            <h2 className="font-bold text-sm mt-1 px-1 border-r border-green-500 capitalize">
              { playerName } <br/><span className={`${isInCheck && (sidePreference==='w'? isWhiteTurn:!isWhiteTurn) ? 'block':'hidden'} text-sm text-red-500`}>Check</span>
            </h2>
            <CapturedList pieces={ sidePreference === 'w' ? capturedBlacks:capturedWhites } />
        </div>

        <div className="my-3 py-2 border border-zinc-700 rounded-lg p-1">
            <ControlArea 
              difficulty={ difficulty }
              undoHandler={ undoHandler }
              resetHandler={ resetHandler }
              isAIPlaying={ isAIPlaying }
              />
        </div>
        <CheckMate gameOver={gameOver} whoWins={whoWins} reset={ resetHandler } playerName={playerName} />

        <div className={`${invalid ? 'fixed':'hidden'} top-[30vh] left-[30vw] ms:left-[30vw] sm:left-[22vw] w-[40vw] sm:w-[23vw] h-[8vh] bg-red-500 text-center  rounded-md shadow-lg shadow-zinc-700`}>
          <h1 className="text-white font-bold m-1">Invalid move!!</h1>
        </div>
    </div>
  );
};

export default ChessGame;
