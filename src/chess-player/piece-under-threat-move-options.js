import { pieces, playerTwoPieces, canGo, isItSafeToGo, middleBoxes } from './core';
import { doesMovingPutKingInDanger, doesMovingPutOthersInDanger } from './dangerous-moves';
import { allowedMoves } from './allowed-move-options';
import { trapOptions, eliminatedPieceWhileTrapMove } from './trap-options';

export default function pieceUnderThreatMoveOption(piecesInDager) {
	let piecesUnderThreat = piecesInDager; 

	if (piecesUnderThreat.length > 0){
        let pieceUnderThreat, pieceUnderThreatId, threatPiece;
        
        for (let item in piecesUnderThreat) {
            item = piecesUnderThreat[item];
            pieceUnderThreat = {
                ...pieces[item.pieceIndangerId],
                id : pieceUnderThreatId,
                player : "player2"
            }
            threatPiece = pieces[item.threatPieceId];

            //Eliminate threat
            let eliminationOption = eliminateThreat(pieceUnderThreat, item.pieceIndangerId, threatPiece, item.threatPieceId);
            if (eliminationOption !== null) {
                return eliminationOption;
            } else {
                let othrerOption;

                // Allow other piece to eliminate the threat
                othrerOption = otherThreatEliminationMove(threatPiece, item.threatPieceId);
                if (othrerOption !== null) {
                    return othrerOption
                }

                let trapOps = trapOptions(item.pieceIndangerId , true);
                if (trapOps.length > 0) {
                    let choosenMove = trapOps[0];
                    return {
                        piece : pieces[choosenMove.piece_id], 
                        pieceId : choosenMove.piece_id, 
                        move_to : choosenMove.position,
                        toBeEliminatedPieceId : eliminatedPieceWhileTrapMove(choosenMove.position).pieceId
                    }
                }

                // or call for backup protection
                if (piecesUnderThreat.length < 2 && threatPiece.name !== "pawn" && (pieceUnderThreat.name === "queen" && threatPiece.name !== "queen" ? false : true)) {
                    let backup = backupThePieceIndanger(piecesUnderThreat);
                    if (backup !== null) {
                        return {
                        	piece : pieces[backup.pieceId],
                        	pieceId : backup.pieceId,
                        	move_to : backup.move_to,
                        	toBeEliminatedPiece : ""
                        }
                    }
                }else {
                    let selected = chooseBetweenPiecesInDanger(piecesUnderThreat);
                    //return move(pieces[selected.pieceId], selected.pieceId, selected.move_to); 
                }

                // write a code for if the pawns block the threat or to be sacrificed
                let pawnOption = sacrificeAPawn(pieceUnderThreat, threatPiece);
                if (pawnOption !== null) {
                    return pawnOption;
                }

                // or runaway
                let runawayOption = runawayMove(item);
                if (runawayOption !== null) {
                    return runawayOption;
                }

                // without safe mode
                othrerOption = otherThreatEliminationMove(threatPiece, item.threatPieceId, false);
                if (othrerOption !== null) {
                    return othrerOption
                }
                // without safe mode
                eliminationOption = eliminateThreat(pieceUnderThreat, item.pieceIndangerId, threatPiece, item.threatPieceId, false);
                if (eliminationOption !== null) {
                    return eliminationOption;
                }

            }
        }
        return null
    } else {
    	return null
    }
}

function eliminateThreat(pieceUnderThreat, pieceIndangerId, threatPiece, threatPieceId, safeMode = true) {
    if (canGo(pieceUnderThreat, threatPiece.position) && (safeMode ? isItSafeToGo(threatPiece.position) : true) && !doesMovingPutKingInDanger(pieceUnderThreat.position, threatPieceId)) {
        return {
            piece : pieces[pieceIndangerId],
            pieceId : pieceIndangerId,
            move_to : threatPiece.position,
            toBeEliminatedPiece : threatPieceId
        }
    }
    return null
}

function otherThreatEliminationMove(threatPiece, threatPieceId, safeMode = true) {
    let pieceId, othrerOption;

    // Allow other piece to eliminate the threat
    for (let i = 0; i < playerTwoPieces.length; i++) {
        pieceId = playerTwoPieces[i];
        othrerOption = {
            ...pieces[pieceId],
            id : pieceId,
            player : "player2"
        }

        if (canGo(othrerOption, threatPiece.position) && (safeMode ? isItSafeToGo(threatPiece.position) : true) && !doesMovingPutKingInDanger(pieces[pieceId].position, threatPieceId)){
            return {
                piece : pieces[pieceId],
                pieceId : pieceId,
                move_to : threatPiece.position,
                toBeEliminatedPiece : threatPieceId
            }
        }

    }
    return null
}

function sacrificeAPawn(pieceUnderThreat, threatPiece) {
    let othrerOption;
    let middlePositions = middleBoxes(pieceUnderThreat.position, threatPiece.position);
    if (middlePositions.length > 0 && pieceUnderThreat.name !== "knight") {
        for (let index = 0; index < playerTwoPieces.length; index++) {
            let playerTwoId = playerTwoPieces[index];

            for (let pos = 0; pos < middlePositions.length; pos++) {
                othrerOption = {
                    ...pieces[playerTwoId],
                    id : playerTwoId,
                    player : "player2"
                }
                if (othrerOption.name === "pawn" && canGo(othrerOption, middlePositions[pos], true) && !doesMovingPutKingInDanger(pieces[playerTwoId].position)){
                    return {
                        piece : pieces[playerTwoId],
                        pieceId : playerTwoId,
                        move_to : middlePositions[pos],
                        toBeEliminatedPiece : ""
                    }
                }
            }

        }
    }
    return null
}

function runawayMove(item) {
    let allowedMovePositions = allowedMoves(pieces[item.pieceIndangerId], item.pieceIndangerId);
    if (allowedMovePositions.length > 0) {
        let item_id = item.pieceIndangerId;
        for (let pos = 0; pos < allowedMovePositions.length; pos++) {
            if (isItSafeToGo(allowedMovePositions[pos]) && !doesMovingPutKingInDanger(pieces[item_id].position) && !doesMovingPutOthersInDanger(pieces[item_id].position)) {
                return {
                    piece : pieces[item_id],
                    pieceId : item_id,
                    move_to : allowedMovePositions[pos],
                    toBeEliminatedPiece : ""
                }
            }
        }
    }
    return null
}

// moves to protect the piece in danger
function backupThePieceIndanger(piece_indanger) {
    let piece_id;
    let allowedMovesForApiece;
    let itAlreadyHasBackup = false;

    for (let index = 0; index < playerTwoPieces.length; index++){
        piece_id = playerTwoPieces[index];
        if (piece_id !== "k2" && piece_indanger[0].pieceIndangerId !== piece_id) {
            if (canGo(pieces[piece_id], pieces[piece_indanger[0].pieceIndangerId].position, false, true) && !doesMovingPutKingInDanger(pieces[piece_id].position)){
                itAlreadyHasBackup = true;
            }
        }
    }

    if (!itAlreadyHasBackup) {
        for (let index = 0; index < playerTwoPieces.length; index++) {
            piece_id = playerTwoPieces[index];
            if (piece_id !== "k2" && piece_indanger[0].pieceIndangerId !== piece_id) {
                allowedMovesForApiece = allowedMoves(pieces[piece_id], piece_id);
                if (allowedMovesForApiece.length > 0) {
                    for (var i = 0; i < allowedMovesForApiece.length; i++) {
                        if (canGo({ ...pieces[piece_id], position : allowedMovesForApiece[i] }, pieces[piece_indanger[0].pieceIndangerId].position, false, true) && isItSafeToGo(allowedMovesForApiece[i]) && !doesMovingPutKingInDanger(allowedMovesForApiece[i])) {
                            return {
                                pieceId : piece_id,
                                move_to : allowedMovesForApiece[i]
                            }
                        }
                    }
                }
            }
        }
        return null;
    } else {
        return null;
    }
}

function chooseBetweenPiecesInDanger(pieces_under_threat) {
    for (var i = 0; i < pieces_under_threat.length; i++) {
        let piece_id = pieces_under_threat[i].pieceIndangerId;
        let allowedMovesForApiece = allowedMoves(pieces[piece_id], piece_id);

        if (allowedMovesForApiece.length > 0) {    
            for (var index = 0; index < allowedMovesForApiece.length; index++) {
                for (var p = 0; p < pieces_under_threat.length; p++) {
                    if (pieces_under_threat[p] !== piece_id) {
                        if (canGo({ ...pieces[piece_id], position : allowedMovesForApiece[index] }, pieces[pieces_under_threat[p].pieceIndangerId].position)) {
                            return {
                                pieceId : piece_id,
                                move_to : allowedMovesForApiece
                            }
                        }
                    }
                }
            }
        }    
    }
    return null;
}