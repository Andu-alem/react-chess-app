import { pieces, playerOnePieces, isItTheOnlyMiddlePiece } from './core';

export function doesMovingPutKingInDanger(currentPosition, excludedPieceId = null) {
    let kingPos = pieces["k2"].position;

    for (var i = 0; i < playerOnePieces.length; i++) {
        if (playerOnePieces[i] !== excludedPieceId) {
            let piecePosition = pieces[playerOnePieces[i]].position;
            let isItPawn = pieces[playerOnePieces[i]].name === "pawn";
            if (isItTheOnlyMiddlePiece(piecePosition, kingPos, isItPawn, currentPosition)) {
                return true
            }
        }
    }
    return false;
}

export function doesMovingPutOthersInDanger(currentPosition, excludedPieceId = null) {
    let queenPos = pieces["q2"].position;
    let bishopOnePos = pieces["b21"].position;
    let bishopTwoPos = pieces["b22"].position;
    let knightOnePos = pieces["h21"].position;
    let knightTwoPos = pieces["h22"].position;
    let rookOnePos = pieces["c21"].position;
    let rookTwoPos = pieces["c22"].position;

    for (var i = 0; i < playerOnePieces.length; i++) {
        let piecePosition = pieces[playerOnePieces[i]].position;
        let isItPawn = pieces[playerOnePieces[i]].name === "pawn";
        if (playerOnePieces[i] !== excludedPieceId) {
            if (isItTheOnlyMiddlePiece(piecePosition, queenPos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, knightOnePos, isItPawn, currentPosition)) {
                return true;

            } else if (isItTheOnlyMiddlePiece(piecePosition, knightTwoPos, isItPawn, currentPosition)) {
                return true;

            } else if (isItTheOnlyMiddlePiece(piecePosition, bishopOnePos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, bishopTwoPos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, rookOnePos, isItPawn, currentPosition)) {
                return true;
            } else if (isItTheOnlyMiddlePiece(piecePosition, rookTwoPos, isItPawn, currentPosition)) {
                return true;
            }
        }
    }
    return false;

}
