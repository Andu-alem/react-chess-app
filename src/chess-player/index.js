// author Andualem Fereja @andi
// chess-player application
import { setUp, canGo } from './core'
import { eliminationMove, normalMove } from './player-one-moves';
import { 
        kingUnderThreatMove,
        pieceUnderThreatMove, 
        opponentEliminationMove,
        trapMove,
        opponentPawnEliminationMove,
        randomMove,
        firstMove,
        castelingMove,
        fallbackMove } from "./moves";

var chessBoard = [];
var movingPiece = null;
var selectedElementId = "";
var pieces = [];
var playerOneGain = [];
var playerTwoGain = [];
var isPlayerOneTurn = true;
var piecesMadeFirstMove = [];
var isItFirstMove = true;
var full_random_move = "ON";
var playerOnePieces = ["p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "h11", "h12", "c11", "b11", "q1", "k1", "b12", "c12"];
var playerTwoPieces = ["p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "h21", "h22", "c21", "b21", "q2", "k2", "b22", "c22"];


boardSetup();
export function updateData(recoverdPOnePiece=null, recoverdPTwoPiece=null, newPOneGain=null, newPTwoGain=null, refreshPMadeFirstMove=false) {
    if (recoverdPOnePiece !== null) {
        playerOnePieces.push(recoverdPOnePiece);
    }
    if (recoverdPTwoPiece !== null) {
        playerTwoPieces.push(recoverdPTwoPiece);
    }
    if (newPOneGain !== null) {
        playerOneGain = newPOneGain;
    }
    if (newPTwoGain !== null) {
        playerTwoGain = newPTwoGain;
    }
    if (refreshPMadeFirstMove) {
        piecesMadeFirstMove = [];
    }

}
export function playerOne(boxId, allPieces, childPiece, promotedPiece){
    pieces = allPieces;
    let newPos = boxId;

    updatePromotion(promotedPiece)
    setUp(pieces, chessBoard, piecesMadeFirstMove, playerOnePieces, playerTwoPieces, isPlayerOneTurn)
    if(childPiece !== null){
        // if there is a piece in the board box
        if(movingPiece === null){
            let whichPlayer = whichPlayerPiece(childPiece.id);
                if(isPlayerOneTurn && whichPlayer !== "player1"){
                alert("Not Player Two Turn");
                
            }else if(!isPlayerOneTurn && childPiece.player === "player1"){
                alert("Not Player One Turn");
                
            }else{
                selectedElementId = boxId;
                movingPiece = {
                    id : childPiece.id,
                    name : childPiece.name,
                    position: newPos,
                    player: childPiece.player
                }
            }
        }else{
            if(selectedElementId === boxId){
                //if same piece clicked twice          
                movingPiece = null;
                selectedElementId = "";
            }else if(movingPiece.player === whichPlayerPiece(childPiece.id)){
                //to block making move on own's piece
                selectedElementId = boxId;
                movingPiece = {
                    id : childPiece.id,
                    name : childPiece.name,
                    position: newPos,
                    player : childPiece.player
                }
            }else{
                let eliminationOption = eliminationMove(movingPiece, newPos, childPiece);
                if(eliminationOption !== null){
                    if (eliminationOption.checkMate !== undefined) {
                        return gameOver()

                    } else if (eliminationOption.movingPiece !== null) {
                        return move(eliminationOption.movingPiece, eliminationOption.pieceId, eliminationOption.move_to, eliminationOption.toBeEliminatedPieceId);
                    }
                }else{
                    alert("Move not allowed 7")
                    movingPiece = null;
                }
            }
        }
    }else{
        if(movingPiece !== null){
            let normalMoveOption = normalMove(movingPiece, newPos, childPiece);
            if(normalMoveOption !== null){
                if (normalMoveOption.checkMate !== undefined) {
                    return gameOver()

                } else if (normalMoveOption.castelingMove !== undefined) {
                    return castelingOption(normalMoveOption.castelingMove)
                } else if (normalMoveOption.movingPiece !== null) {
                    return move(normalMoveOption.movingPiece, normalMoveOption.pieceId, normalMoveOption.move_to, normalMoveOption.toBeEliminatedPieceId);
                }
            }else{
                alert("Move not allowed 4");
                movingPiece = null;
            }
        }
    }
}

// computer player program.....

export function computer(allPieces, promotedPiece){
    pieces = allPieces;
    console.log(" pieces ", pieces);
    updatePromotion(promotedPiece);
    setUp(pieces, chessBoard, piecesMadeFirstMove, playerOnePieces, playerTwoPieces, isPlayerOneTurn);
    
    if(isItFirstMove){
        let moveOne = firstMove()
        isItFirstMove = false;
        return move(moveOne.piece, moveOne.pieceId, moveOne.move_to);
    } else {
        let kingUnderThreat = kingUnderThreatMove(pieces);
        if (kingUnderThreat !== null){

            if (castelingMove() !== null) {
                return castelingOption(castelingMove().castelingMove)
            } else if (kingUnderThreat.isCheckMate === undefined) {
                return move(kingUnderThreat.piece, kingUnderThreat.pieceId, kingUnderThreat.move_to, kingUnderThreat.toBeEliminatedPieceId);
            } else {
                return gameOver()
            }

        } else {
            let eliminationMovePiece = opponentEliminationMove();
            if(eliminationMovePiece !== null){
                return move(eliminationMovePiece.piece, eliminationMovePiece.pieceId, eliminationMovePiece.move_to, eliminationMovePiece.toBeEliminatedPieceId);
            } else {
                let pieceUnderThreat = pieceUnderThreatMove();
                if (pieceUnderThreat !== null) {
                    return move(pieceUnderThreat.piece, pieceUnderThreat.pieceId, pieceUnderThreat.move_to, pieceUnderThreat.toBeEliminatedPieceId);
                }
                
                let trapMoveOption = trapMove();
                if(trapMoveOption !== null){
                   return move(trapMoveOption.piece, trapMoveOption.pieceId, trapMoveOption.move_to, trapMoveOption.toBeEliminatedPieceId);
                }else{
                    if (eliminationMovePiece === null) {
                        let pawnEliminationMove = opponentPawnEliminationMove();
                        if (pawnEliminationMove !== null) {
                            return move(pawnEliminationMove.piece, pawnEliminationMove.pieceId, pawnEliminationMove.move_to, pawnEliminationMove.toBeEliminatedPieceId);
                        }
                    }
                    if (castelingMove() !== null) {
                        return castelingOption(castelingMove().castelingMove)
                    }
                    //choosing a move randomly
                    let randomOption = randomMove(full_random_move);
                    full_random_move === "ON" ? full_random_move = "OFF" : full_random_move = "ON";
                    if (randomOption !== null) {
                        return move(randomOption.piece, randomOption.pieceId, randomOption.move_to, randomOption.toBeEliminatedPieceId);
                    }                    
                }
            }
        }           
    }
    let fallbackOption = fallbackMove()
    if (fallbackOption !== null) {
        return move(fallbackOption.piece, fallbackOption.pieceId, fallbackOption.move_to, fallbackOption.toBeEliminatedPieceId);
    } else {
        return gameOver()
    }
}

function castelingOption(casteling_move) {
    let castelingMove = casteling_move
    let casteling = [
        move(castelingMove[0].piece, castelingMove[0].pieceId, castelingMove[0].move_to, castelingMove[0].toBeEliminatedPieceId),
        move(castelingMove[1].piece, castelingMove[1].pieceId, castelingMove[1].move_to, castelingMove[1].toBeEliminatedPieceId)
    ]
    isPlayerOneTurn = !isPlayerOneTurn;
    return {
        castelingMove : casteling
    }
}

function move(pieceToBeMoved, movingPieceId, nextPosition, pieceToBeEliminatedID = "") {
    if (pieceToBeEliminatedID !== "") {

        if(isPlayerOneTurn){
            playerOneGain.push(pieceToBeEliminatedID);
            playerTwoPieces = playerTwoPieces.filter(function(item){
                return item !== pieceToBeEliminatedID;
            });
        }else {
            playerTwoGain.push(pieceToBeEliminatedID);
            playerOnePieces = playerOnePieces.filter(function(item){
                return item !== pieceToBeEliminatedID;
            });
        }
        if (pieceToBeEliminatedID === "k1" || pieceToBeEliminatedID === "k2") {
            isPlayerOneTurn = !isPlayerOneTurn;
            return gameOver();
        }
    }
    if (piecesMadeFirstMove.indexOf(movingPieceId) === -1) {
        piecesMadeFirstMove.push(movingPieceId);
    }

    let promotionAllowed = false;
    if (pieceToBeMoved.name === "pawn") {
            let nextPositionIndex = chessBoard.indexOf(nextPosition) + 1;
            if (isPlayerOneTurn) {
                if (nextPositionIndex % 8 === 0) {
                    promotionAllowed = true
                } 
            } else{
                if (nextPositionIndex % 8 === 1) {
                    promotionAllowed = true
                }
            }
        }

    let data = {
        movingPieceId : movingPieceId,
        moveTo : nextPosition,
        moveFrom : pieceToBeMoved.position,
        eliminatedPieceID : pieceToBeEliminatedID,
        gain : {
            playerOneGain : playerOneGain,
            playerTwoGain : playerTwoGain
        },
        promotionAllowed : promotionAllowed
    }
    
    isPlayerOneTurn = !isPlayerOneTurn;
    movingPiece = null
    return data
}

function whichPlayerPiece(piece_id){
    return pieces[piece_id].player;
}

function boardSetup(){
    for (var i = 1; i < 65; i++) {
        if(i<9){
            chessBoard.push("a"+i);
        }else if(i < 17){
            chessBoard.push("b"+(i-8));
        }else if(i < 25){
            chessBoard.push("c"+(i-16));
        }else if(i < 33){
            chessBoard.push("d"+(i-24));
        }else if(i < 41){
            chessBoard.push("e"+(i-32));
        }else if(i < 49){
            chessBoard.push("f"+(i-40));
        }else if(i < 57){
            chessBoard.push("g"+(i-48));
        }else{
            chessBoard.push("h"+(i-56));
        }
    }
}

export function isKingOneInCheck(allPieces, newPosition=null){
    pieces = allPieces;
    let kingPosition = newPosition === null ? pieces["k1"].position : newPosition;
    let opponentPiece, piece_id;
    for (var i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        opponentPiece = {
            id : "",
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(opponentPiece, kingPosition, false, true)){
            //dangereousPieceId = piece_id;
            return true;
        }
    }
    return false;
}

function gameOver() {
    isPlayerOneTurn = true;
    piecesMadeFirstMove = [];
    isItFirstMove = true;
    full_random_move = "ON";
    playerTwoGain = [];
    playerOneGain = [];
    playerOnePieces = ["p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "h11", "h12", "c11", "b11", "q1", "k1", "b12", "c12"];
    playerTwoPieces = ["p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "h21", "h22", "c21", "b21", "q2", "k2", "b22", "c22"];

    return {
        checkMate : true
    }
}

function updatePromotion(promotedPiece) {
    if (promotedPiece !== undefined && promotedPiece.player === "player1") {
        if (playerOnePieces.indexOf(promotedPiece.to) === -1) {
            playerOnePieces.splice(playerOnePieces.indexOf(promotedPiece.id), 1, promotedPiece.to)
        }    
    } else if (promotedPiece !== undefined && promotedPiece.player === "player2") {
        if (playerTwoPieces.indexOf(promotedPiece.to) === -1) {
            playerTwoPieces.splice(playerTwoPieces.indexOf(promotedPiece.id), 1, promotedPiece.to)
        }
    }
}