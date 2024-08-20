import { pieces, playerOnePieces, playerTwoPieces, canGo } from './core';

export function piecesInDanger(){
    let piece_id, piece;
    let piecesInDanger = [];

    for (var i = 0; i < playerOnePieces.length; i++) {
        piece_id = playerOnePieces[i];
        piece = {
            ...pieces[piece_id],
            id : piece_id,
            player: pieces[piece_id].player
        }

        for (let index = 0; index < playerTwoPieces.length; index++) {
            let pTwoPiece = pieces[playerTwoPieces[index]];
            if (pTwoPiece.name !== "pawn" && pTwoPiece.name !== "king") {
                if (canGo(piece, pTwoPiece.position, false, true)) {
                    piecesInDanger.push({
                        pieceIndangerId : playerTwoPieces[index],
                        threatPieceId : piece_id
                    });
                }
            }
        }    }

    return piecesInDanger;
}

export function kingsThreatPiece(){
    let kingPosition = pieces["k2"].position;
    let opponentPiece, piece_id;
    let kingsThreatPiecesId = [];
    for (var i = 0; i < playerOnePieces.length; i++) {
        piece_id = playerOnePieces[i];
        opponentPiece = {
            id : "",
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(opponentPiece, kingPosition, false, true)){
            kingsThreatPiecesId.push(piece_id);
        }
    }
    return kingsThreatPiecesId;
}