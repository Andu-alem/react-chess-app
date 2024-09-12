import {Component } from 'react';
import board from '../data/board';
import pieces from '../data/pieces';
import Board from './Board';
import DataDisplayArea from './DataDisplayArea';
import { playerOne, computer, isKingOneInCheck, updateData } from '../chess-player/index';

class Chess extends Component {
    constructor(){
        super();
        this.state = {
            board : board,
            pieces : pieces,
            clickedBox : "",
            movingPiece : null,
            isKingOneInCheck : false,
            playerOneGain : [],
            playerTwoGain : [],
            promotedPieces : [],
            checkMate : false,
            ispromotionMoveMade : false,
            lastMoves : []
        }        
    }

    componentDidMount(){
        for (const piece in this.state.pieces) {
            let position = this.state.pieces[piece].position
            board[position].pieceId = piece
        }
        
        this.setState({
            ...this.state,
            board : board
        })
    }

    boxClickHandler = (boxId, piece, pieceId) => {
        let moveResult, updatePromotion;
        let childPiece = null;
        let clickedBox = this.state.clickedBox !== boxId && piece !== null ? boxId : "";

        if (piece !== null) {
            childPiece = {
                ...piece,
                id : pieceId
            }
        }
        this.setState({clickedBox : clickedBox})

        updatePromotion = this.state.ispromotionMoveMade ?  this.state.promotedPieces[this.state.promotedPieces.length-1] : undefined
        moveResult = playerOne(boxId, this.state.pieces, childPiece, updatePromotion);
        this.setState({ ispromotionMoveMade : false })
        if (moveResult !== undefined) {
            this.props.setIsGameStarted(true);
            if(moveResult.checkMate !== undefined){
                this.setState({ checkMate : true })
                setTimeout(() => { this.reloadTheGame() }, 10000)
            } else if (moveResult.castelingMove !== undefined) {
                let castelingMove = moveResult.castelingMove;
                this.updateBoard(castelingMove[0])
                this.updateBoard(castelingMove[1])
            } else {
                this.updateBoard(moveResult)
            }
            if (!this.props.twoPlayerMode) {
                setTimeout(() => {
                    updatePromotion = this.state.ispromotionMoveMade ?  this.state.promotedPieces[this.state.promotedPieces.length-1] : undefined
                    moveResult = computer(this.state.pieces, updatePromotion)
                    this.setState({ ispromotionMoveMade : false })
                    if (moveResult !== undefined) {
                        if(moveResult.checkMate !== undefined){
                            this.setState({ checkMate : true })
                            setTimeout(() => { this.reloadTheGame() }, 10000)
                        } else if (moveResult.castelingMove !== undefined) {
                            let castelingMove = moveResult.castelingMove;
                            this.updateBoard(castelingMove[0])
                            this.updateBoard(castelingMove[1])
                        } else {
                            this.updateBoard(moveResult, true)
                        }
                    } 
                }, 3000)
            }
        }
    }

    updateBoard = (moveResult, computerTurn=false, fromUndo = false) => {
        let board, pieces, isKOneInCheck, promoteTo, lastMoves;
        if (moveResult.promotionAllowed) {
            this.setState({ ispromotionMoveMade : true })
            promoteTo = this.promotionMove(moveResult)
        }
        if (!fromUndo) {
            lastMoves = {
                    pieceId : moveResult.movingPieceId,
                    movedFrom : this.state.pieces[moveResult.movingPieceId].position,
                    movedTo : moveResult.moveTo,
                    eliminatedPieceID : moveResult.eliminatedPieceID,
            }
        }
        
        this.setState( prevState => {
            board = {
                ...prevState.board,
                [moveResult.moveFrom] : {
                    ...prevState.board[moveResult.moveFrom],
                    pieceId : null
                },
                [moveResult.moveTo] : {
                    ...prevState.board[moveResult.moveTo],
                    pieceId : promoteTo === undefined ? 
                                    moveResult.movingPieceId :
                                    promoteTo.id
                }
            }
            if (moveResult.eliminatedPieceID !== "") {
                pieces = {
                    ...prevState.pieces,
                    [moveResult.movingPieceId] : {
                        ...prevState.pieces[moveResult.movingPieceId],
                        position : promoteTo === undefined ? moveResult.moveTo : null
                    },
                    [moveResult.eliminatedPieceID] : {
                        ...prevState.pieces[moveResult.eliminatedPieceID],
                        position : null
                    }
                }
            } else {
                pieces = {
                    ...prevState.pieces,
                    [moveResult.movingPieceId] : {
                        ...prevState.pieces[moveResult.movingPieceId],
                        position : promoteTo === undefined ? moveResult.moveTo : null
                    }
                }
            }
            let promotedPiece
            if (promoteTo !== undefined) {
                pieces = {
                    ...pieces,
                    [promoteTo.id] : {
                        piece : promoteTo.piece,
                        position : moveResult.moveTo,
                        internalValue : promoteTo.value,
                        player : this.state.pieces[moveResult.movingPieceId].player
                    }
                }
                promotedPiece = prevState.promotedPieces
                promotedPiece.push({
                    id : moveResult.movingPieceId,
                    to : promoteTo.id,
                    player : this.state.pieces[moveResult.movingPieceId].player
                })
            }
            if (computerTurn) {
                if (isKingOneInCheck(pieces)) {
                    isKOneInCheck = true     
                } else {
                    isKOneInCheck = false
                }
            }

            return {
                ...prevState,
                board,
                pieces,
                isKingOneInCheck : isKOneInCheck,
                playerOneGain : moveResult.gain.playerOneGain,
                playerTwoGain : moveResult.gain.playerTwoGain,
                promotedPiece :  promoteTo !== undefined ? promotedPiece : prevState.promotedPieces,
                lastMoves : lastMoves !== undefined ? [...prevState.lastMoves, lastMoves] : prevState.lastMoves.slice(0, prevState.lastMoves.length-1)
            }
        });
    }

    undoLastMove = (lastMove) => {      
        if (lastMove !== undefined) {
            let moveResult = {
                moveFrom : lastMove.movedTo,
                moveTo : lastMove.movedFrom,
                movingPieceId : lastMove.pieceId,
                promotionAllowed : false,
                eliminatedPieceID : "",
                gain : {
                    playerOneGain : this.state.playerOneGain,
                    playerTwoGain : this.state.playerTwoGain
                }
            }
            this.updateBoard(moveResult, false, true);  

            if (lastMove.eliminatedPieceID !== "") {
                this.setState( prevState => {
                    let pieces = {
                        ...prevState.pieces,
                        [lastMove.eliminatedPieceID]: {
                            ...prevState.pieces[lastMove.eliminatedPieceID],
                            position : lastMove.movedTo
                        }
                    }
                    let board = {
                        ...prevState.board,
                        [lastMove.movedTo] : {
                            ...prevState.board[lastMove.movedTo],
                            pieceId : lastMove.eliminatedPieceID
                        }
                    }
                    let isPlayerOneMove = this.state.pieces[lastMove.pieceId].player === "player1";
                    let playerOneGain = null;
                    let playerTwoGain = null;
                    if (prevState.playerOneGain.indexOf(lastMove.eliminatedPieceID) !== -1) {
                        playerOneGain = prevState.playerOneGain.filter(item => {
                            return item !== lastMove.eliminatedPieceID;
                        })
                    }
                    if (prevState.playerTwoGain.indexOf(lastMove.eliminatedPieceID) !== -1) {
                        playerTwoGain = prevState.playerTwoGain.filter(item => {
                            return item !== lastMove.eliminatedPieceID;
                        })
                    }
                    if (prevState.pieces[lastMove.eliminatedPieceID].player === "player1") {
                        updateData(lastMove.eliminatedPieceID, null, playerOneGain, playerTwoGain);
                    } else {
                        updateData(null, lastMove.eliminatedPieceID, playerOneGain, playerTwoGain);
                    }
                    return {
                        ...prevState,
                        board : board,
                        pieces : pieces,
                        playerOneGain : playerOneGain !== null ? playerOneGain : prevState.playerOneGain,
                        playerTwoGain : playerTwoGain !== null ? playerTwoGain : prevState.playerTwoGain
                    }
                })
            }          
        }
    }
    undoLastTwoMoves = () => {
        this.undoLastMove(this.state.lastMoves[this.state.lastMoves.length-1]);
        this.undoLastMove(this.state.lastMoves[this.state.lastMoves.length-2]);
        if (this.state.lastMoves.length = 0) {
            updateData(null, null, null, null, true);
        }
    }

    promotionMove = (piece) => {
        let upgradeTo, promotedLength;
        if (this.state.pieces[piece.movingPieceId].player === "player1") {
            promotedLength = this.state.promotedPieces.length
            upgradeTo = prompt("Choose a piece number to upgrade: \n 1. Queen \n 2. rook \n 3. Bishop \n 4. knight");
            if (upgradeTo === "1") {
                return {
                    piece : "queen",
                    value : "pieces/queen-w.png",
                    id : `q1${promotedLength + 1}`
                }
            } else if (upgradeTo === "2") {
                return {
                    piece : "rook",
                    value : "pieces/horse-w.png",
                    id : `c1${promotedLength + 3}`
                }
            } else if (upgradeTo === "3") {
                return {
                    piece : "bishop",
                    value : "pieces/bishop-w.png",
                    id : `b1${promotedLength + 3}`
                }
            } else if (upgradeTo === "4") {
                return {
                    piece : "knight",
                    value : `pieces/horse-w.png`,
                    id : `h1${promotedLength + 3}`
                }
            }
        } else {
            let upgrade = ["1", "2", "3", "4"]
            upgradeTo = upgrade[Math.floor(Math.random()*4)];
            if (upgradeTo === "1") {
                return {
                    piece : "queen",
                    value : "pieces/queen-b.png",
                    id : `q2${promotedLength + 1}`
                }
            } else if (upgradeTo === "2") {
                return {
                    piece : "rook",
                    value : "pieces/rook-b.png",
                    id : `c2${promotedLength + 3}`
                }
            } else if (upgradeTo === "3") {
                return {
                    piece : "bishop",
                    value : "pieces/bishop-b.png",
                    id : `b2${promotedLength + 3}`
                }
            } else if (upgradeTo === "4") {
                return {
                    piece : "knight",
                    value : `pieces/horse-b.png`,
                    id : `h2${promotedLength + 3}`
                }
            }
        }
    } 

    reloadTheGame = () => {
        this.setState({
            board : board,
            pieces : pieces,
            clickedBox : "",
            movingPiece : null,
            isKingOneInCheck : false,
            playerOneGain : [],
            playerTwoGain : [],
            promotedPieces : [],
            checkMate : false,
            lastMoves : []
        })
        this.componentDidMount()
    }
    
    render (){ 
        return (
            <div className="row">
                <DataDisplayArea 
                                player={"Computer"} 
                                pieces={ this.state.pieces }
                                gain={ this.state.playerTwoGain } />
                <Board 
                        board = { this.state.board }
                        pieces = { this.state.pieces }
                        boxClickHandler = { this.boxClickHandler }
                        isKOneInCheck = { this.state.isKOneInCheck }
                        clickedBox = { this.state.clickedBox }
                        checkMate = { this.state.checkMate }
                        undoLastTwoMoves = { this.undoLastTwoMoves } />                    
                <DataDisplayArea 
                                player={"Human"} 
                                pieces={ this.state.pieces }
                                gain={ this.state.playerOneGain } />
            </div>
            
        );
    }
}

export default Chess