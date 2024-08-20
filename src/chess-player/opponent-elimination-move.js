import { pieces, playerTwoPieces, playerOnePieces, canGo, isTheDivBoxEmpty, isItSafeToGo, isItToBePromotedPawn } from './core';
import { doesMovingPutKingInDanger, doesMovingPutOthersInDanger } from './dangerous-moves';

export function opponentPawnEliminationMoveOption() {
    let piece, piece_id;
    for (let i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        piece = pieces[piece_id];

         for (let id = 0; id < playerOnePieces.length; id++) {
            let opponentId = playerOnePieces[id];

            if (pieces[opponentId].name === "pawn") {
                if (canEliminateOpponent(piece, piece_id, pieces[opponentId].position) && !doesMovingPutKingInDanger(piece.position, opponentId) && !doesMovingPutOthersInDanger(piece.position, opponentId)) {   
                    return {
                        piece : piece,
                        pieceId : piece_id,
                        move_to: pieces[opponentId].position,
                        toBeEliminatedPieceId : opponentId
                    }               
                }
            }
        }
    }
    return null;
}

export function opponentEliminationMoveOption(){
    let piece_id, piece;
    for (let i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        piece = pieces[piece_id];

        if(canEliminateOpponentKing(piece, piece_id)){
            return {
                piece : piece,
                pieceId : piece_id,
                move_to: pieces["k1"].position,
                toBeEliminatedPieceId : "k1"
            }   
        }
        for (let id = 0; id < playerOnePieces.length; id++) {
            let opponentId = playerOnePieces[id];

            if (pieces[opponentId].name !== "pawn" || isItToBePromotedPawn(pieces[opponentId].position)) {
                if (canEliminateOpponentAndTrapKing(piece, piece_id, pieces[opponentId].position) || (canEliminateOpponent(piece, piece_id, pieces[opponentId].position) && !doesMovingPutKingInDanger(piece.position, opponentId))) {   
                    return {
                        piece : piece,
                        pieceId : piece_id,
                        move_to: pieces[opponentId].position,
                        toBeEliminatedPieceId : opponentId
                    }               
                }
            }
        }
        
    }
    return null;
}

function canEliminateOpponent(piece, selfID, pos, pawnElimination=false){
    let opponentPosition = pos;
    let element = {
        id : selfID,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    return (pawnElimination ? canGo(element, opponentPosition, isTheDivBoxEmpty(opponentPosition)) : canGo(element, opponentPosition)) && (element.name === "pawn" ? true : isItSafeToGo(opponentPosition));
}

function canEliminateOpponentKing(piece, selfID){
    let opponentKingPosition = pieces["k1"].position;
    let element = {
        id : selfID,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    
    return canGo(element, opponentKingPosition);
}

function canEliminateOpponentAndTrapKing(piece, selfID, pos) {
    let opponentKingPosition = pieces["k1"].position;
    let opponentPosition = pos;
    let element = {
        id : selfID,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    let element2 = {
        id : selfID,
        position : opponentPosition,
        name : piece.name,
        player: piece.player
    }
    return canGo(element, opponentPosition, isTheDivBoxEmpty(opponentPosition)) && isItSafeToGo(opponentPosition) && canGo(element2, opponentKingPosition)
}
