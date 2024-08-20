import { pieces, playerTwoPieces, playerOnePieces, isItSafeToGo, canGo } from './core';
import { doesMovingPutKingInDanger, doesMovingPutOthersInDanger } from './dangerous-moves';
import { allowedMoves } from './allowed-move-options';


export function randomMoveOption(fullyRandomMove) {
    let counter = 0;
    let movingPiece_id, piece, allowedMovePositions, selectedPosition;

    while(counter < 30){
        movingPiece_id = playerTwoPieces[Math.floor(Math.random()*playerTwoPieces.length)];
        piece = pieces[movingPiece_id];
        if (piece.name === "pawn") {
            allowedMovePositions = allowedMoves(piece, movingPiece_id);

            if (allowedMovePositions.length > 0) {
                if (fullyRandomMove === "OFF") {
                    for (let i = 0; i < allowedMovePositions.length; i++) {
                        if (!doesMovingPutKingInDanger(piece.position)) {

                            if (isItSafeToGo(allowedMovePositions[i])) {
                                selectedPosition = allowedMovePositions[i];
                                break
                            }else if (willItHaveABackup(selectedPosition, movingPiece_id) && !doesMovingPutOthersInDanger(piece.position)) {
                                selectedPosition = allowedMovePositions[i];
                                break
                            } 
                        }
                    }
                } else {
                    let otherCounter = 0;
                    while(selectedPosition === undefined && otherCounter < 30){
                        selectedPosition = allowedMovePositions[Math.floor(Math.random()*allowedMovePositions.length)];
                        if (!doesMovingPutKingInDanger(piece.position)) {
                            if (isItSafeToGo(selectedPosition)) {
                                break
                            }else if (willItHaveABackup(selectedPosition, movingPiece_id) && !doesMovingPutOthersInDanger(piece.position)) {
                                break
                            }
                            selectedPosition = undefined;
                        }
                        otherCounter++
                    }
                }

                if (selectedPosition !== undefined) {
                    return {
                        piece : piece,
                        pieceId : movingPiece_id,
                        move_to : selectedPosition,
                        toBeEliminatedPieceId : eliminatedPieceWhileMoveing(selectedPosition).pieceId
                    }
                }
            }
        }
        counter++;
    }
    return null;
}

export function fallbackMoveOption() {
    for (let index = 0; index < playerTwoPieces.length; index++) {
        let id = playerTwoPieces[index];
        let piece = pieces[id];
        let allowedMovePositions = allowedMoves(piece, id);

        if (allowedMovePositions.length > 0) {
            for (let position = 0; position < allowedMovePositions.length; position++) {
                if(!doesMovingPutKingInDanger(piece.position)){
                    if (piece.name === "king") {
                        if (isItSafeToGo(allowedMovePositions[position])) {
                            return {
                                piece : piece,
                                pieceId : id,
                                move_to : allowedMovePositions[position],
                                toBeEliminatedPieceId : eliminatedPieceWhileMoveing(allowedMovePositions[position]).pieceId
                            }
                        }
                    } else {
                        return {
                            piece : piece,
                            pieceId : id,
                            move_to : allowedMovePositions[position],
                            toBeEliminatedPieceId : eliminatedPieceWhileMoveing(allowedMovePositions[position]).pieceId
                        }
                    }
                }
            }
        }
    }

    return null
}
function eliminatedPieceWhileMoveing(choosenPosition) {
    for (let i = 0; i < playerOnePieces.length; i++) {
        if (pieces[playerOnePieces[i]].position === choosenPosition) {
            return {
                pieceId : playerOnePieces[i]
            }
        }
    }
    return { pieceId : "" }
}

function willItHaveABackup(newPosition, selfId) {
    for (let i = 0; i < playerTwoPieces.length; i++) {
        let id = playerTwoPieces[i]
        if (id !== selfId && pieces[id].name !== "king") {
            if (canGo(pieces[id], newPosition, false)) {
                return true;
            }
        }
    }
    return false;
}