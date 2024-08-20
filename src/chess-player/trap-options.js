import { pieces, canGo, isItSafeToGo, playerTwoPieces, playerOnePieces, middleBoxes, isItTheOnlyMiddlePiece, isItToBePromotedPawn } from './core';
import { allowedMoves } from './allowed-move-options';
import { doesMovingPutKingInDanger, doesMovingPutOthersInDanger } from './dangerous-moves';

export default function trapMoveOption() {
    let moveMiddlePiece = movingTheMiddlePiece();
    if (moveMiddlePiece !== null) {
        return movingTheMiddlePiece();
    }

    let trapMovePositions = opponentPreciousPieceTrapMoves();
    if (trapMovePositions.length > 0) {
        let choosenMove;
        console.log("Moves from opponent trap .... best move options are ");
        for (let index = 0; index < trapMovePositions.length; index++) {
            let trapPieceId = trapMovePositions[index].piece_id;
            if(isItBestChoiceForTrap(trapPieceId)){
                choosenMove = trapMovePositions[index];
                if (pieces[trapPieceId].name === "pawn") {
                    break
                }
            }else if(trapMovePositions[index].target === "king" || trapMovePositions[index].target === "queen"){
                choosenMove = trapMovePositions[index];
            }
        }
        if (choosenMove === undefined) {
            choosenMove = trapMovePositions[0]
        }
        return {
            piece : pieces[choosenMove.piece_id], 
            pieceId : choosenMove.piece_id, 
            move_to : choosenMove.position,
            toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(choosenMove.position).pieceId
        }
    } else {
        return null
    }
}

function opponentPreciousPieceTrapMoves() {
    let bestTrapMoves = [];
    for (let i = 0; i < playerTwoPieces.length; i++) {
        let playerTwoId = playerTwoPieces[i];
        let piece = pieces[playerTwoId];
        let isItPawn = piece.name === "pawn";
        if (!isItAlreadyTrapingOtherPiece(playerTwoId) && !doesMovingPutKingInDanger(piece.position)) {
            let trapOps = trapOptions(playerTwoId);
            if (trapOps.length > 0) {
                bestTrapMoves.concat(trapOps);
            }
        }
    }

    return bestTrapMoves;
}
export function trapOptions(playerTwoId, pieceInDanger = false) {
    let bestTrapMoves = [];
    let piece = pieces[playerTwoId];
    let isItPawn = piece.name === "pawn";
    let allowedMovePositions = allowedMoves(piece, playerTwoId);

    if (allowedMovePositions.length > 0 && piece.name !== "king") {
        for (let pos = 0; pos < allowedMovePositions.length; pos++) {
            let allowedPosition = allowedMovePositions[pos];
            let element = {
                ...piece,
                id : playerTwoId,
                position : allowedPosition
            }
            for (let index = 0; index < playerOnePieces.length; index++) {
                let playerOneId = playerOnePieces[index];

                if (pieces[playerOneId].name !== "pawn" || isItToBePromotedPawn(pieces[playerOneId].position)) {
                    let safeMode;
                    if (pieceInDanger) {
                        safeMode = willItHaveABackup(allowedMovePositions[pos], playerTwoId) || isItSafeToGo(allowedPosition);
                    } else {
                        safeMode = isItPawn ? willItHaveABackup(allowedMovePositions[pos], playerTwoId) : isItSafeToGo(allowedPosition);
                    }
                    if (canGo(element, pieces[playerOneId].position, false) && safeMode && 
                    (pieces[playerOneId].name !== "king" ? !doesMovingPutOthersInDanger(piece.position) : true)) {

                        bestTrapMoves.push({
                            target : pieces[playerOneId].piece,
                            position : allowedPosition,
                            piece_id : playerTwoId,
                        })
                    }
                }
            }
        }
    }
    return bestTrapMoves;
}

function isItAlreadyTrapingOtherPiece(piece_id) {
    let element = {
        id : piece_id,
        ...pieces[piece_id]
    }

    for (let i = 0; i < playerOnePieces.length; i++) {
        let opponentId = playerOnePieces[i];
        if (pieces[opponentId].name !== "pawn") {
            if (canGo(element, pieces[opponentId].position)) {
                return true;
            }
        }
    }
    return false;
}


function isItBestChoiceForTrap(piece_id) {
    let piece = pieces[piece_id];
    let pos = piece.position;

    if (piece.name === "queen" || piece.name === "bishop" || piece.name === "castle") {

        if (middleBoxes(pos, pieces["k1"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["q1"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["c12"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["c11"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["b11"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["b12"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["h12"].position, false, true).length === 1) {
            return false
        } else if (middleBoxes(pos, pieces["h11"].position, false, true).length === 1) {
            return false
        }
    }

    return true
}

function movingTheMiddlePiece() {
    let queenPos = pieces["q2"].position;
    let bishopOnePos = pieces["b21"].position;
    let bishopTwoPos = pieces["b22"].position;

    for (let i = 0; i < playerTwoPieces.length; i++) {
        let playerTwoId = playerTwoPieces[i];
        let piece = pieces[playerTwoId];
        if (piece.name !== "queen" || piece.name !== "bishop") {
            for (let index = 0; index < playerOnePieces.length; index++) {
                let playerOnePiece = pieces[playerOnePieces[index]]
                if (playerOnePiece.name === "rook" || playerOnePiece.name === "knight" || playerOnePiece.name === "king") {
                    let allowedMovePositions;
                    if (isItTheOnlyMiddlePiece(playerOnePiece.position, queenPos, false, piece.position, true)) {
                        allowedMovePositions = allowedMoves(piece, playerTwoId);
                        if (allowedMovePositions.length > 0) {
                            for (let pos = 0; pos < allowedMovePositions.length; pos++) {
                                if (isItSafeToGo(allowedMovePositions[pos])) {
                                    return {
                                        piece : piece,
                                        pieceId : playerTwoId,
                                        move_to : allowedMovePositions[pos],
                                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(allowedMovePositions[pos]).pieceId
                                    }
                                }
                            }
                        }

                    }
                    
                    if (isItTheOnlyMiddlePiece(playerOnePiece.position, bishopOnePos, false, piece.position, true)) {
                        allowedMovePositions = allowedMoves(piece, playerTwoId);
                        if (allowedMovePositions.length > 0) {
                            for (let pos = 0; pos < allowedMovePositions.length; pos++) {
                                if (isItSafeToGo(allowedMovePositions[pos])) {
                                    return {
                                        piece : piece,
                                        pieceId : playerTwoId,
                                        move_to : allowedMovePositions[pos],
                                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(allowedMovePositions[pos]).pieceId
                                    }
                                }
                            }
                        }
                    }

                    if (isItTheOnlyMiddlePiece(playerOnePiece.position, bishopTwoPos, false, piece.position, true)) {
                        allowedMovePositions = allowedMoves(piece, playerTwoId);
                        if (allowedMovePositions.length > 0) {
                            for (let pos = 0; pos < allowedMovePositions.length; pos++) {
                                if (isItSafeToGo(allowedMovePositions[pos])) {
                                    return {
                                        piece : piece,
                                        pieceId : playerTwoId,
                                        move_to : allowedMovePositions[pos],
                                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(allowedMovePositions[pos]).pieceId
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}

export function eliminatedPieceWhileTrapMove(choosenPosition) {
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