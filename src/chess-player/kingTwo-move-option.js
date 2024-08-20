import { pieces, isThePathFree, isItSafeToGo, piecesMadeFirstMove } from './core';
import { kingsThreatPiece } from './pieces-under-threat';
import { moveTheKing, eliminateThreat, canTheKingEliminateThreat } from './king-underthreat-moves';
import { blockPiece } from './king-threat-block-options';

export function kingUnderThreatMoveOption() {
	let kings_threat_piece_id;
    let kingsThreat = kingsThreatPiece();
    if (kingsThreat.length > 0){
        //if the king is in danger or checkmated
        kings_threat_piece_id = kingsThreat[0];

        if (kingsThreat.length > 1) {
            if (moveTheKing() !== ""){

                console.log("Inside move the king");
                let goTo = moveTheKing();
                return { 
                	piece : pieces["k2"], 
                	pieceId : "k2", 
                	move_to : goTo,
                	toBeEliminatedPieceId : ""
                }
            }
        }
        let threatEliminatingPiece = eliminateThreat(kings_threat_piece_id, false);

       if (threatEliminatingPiece !== null){

            console.log("inside eliminate king's threat ", threatEliminatingPiece);
            return {
            	piece : threatEliminatingPiece,
            	pieceId : threatEliminatingPiece.id,
            	move_to : threatEliminatingPiece.move_to,
            	toBeEliminatedPieceId : kings_threat_piece_id
            }

        } else if (canTheKingEliminateThreat(kings_threat_piece_id)){

            console.log("The king eliminate the threat ....");
            let threatPiece = pieces[kings_threat_piece_id];
            return {
                piece : pieces["k2"], 
                pieceId : "k2",
                move_to : threatPiece.position,
                toBeEliminatedPieceId : kings_threat_piece_id
            }

        } else if (blockPiece(kings_threat_piece_id)){

            let piece = blockPiece(kings_threat_piece_id);
            return {
            	piece : piece,
            	pieceId : piece.piece_id,
            	move_to : piece.move_to,
            	toBeEliminatedPieceId : ""
            }

        }else if (moveTheKing() !== ""){

            console.log("Inside move the king");
            let goTo = moveTheKing();

            return {
            	piece : pieces["k2"],
            	pieceId : "k2",
            	move_to : goTo,
            	toBeEliminatedPieceId : ""
            }

        } else {

            return {
            	isCheckMate : true
            }
        }
    } else {
    	return null
    }
	
}

export function castelingMoveOption() {

    if (piecesMadeFirstMove.indexOf("k2") === -1) {
        if (piecesMadeFirstMove.indexOf("c22") === -1 && isThePathFree(pieces["k2"].position, pieces["c22"].position)) {
            if (isItSafeToGo("g8")) {
                let castelingMove = []
                castelingMove.push({
                    piece : pieces["c22"], 
                    pieceId : "c22",
                    move_to : "f8",
                    toBeEliminatedPieceId : ""
                });
                castelingMove.push({
                    piece : pieces["k2"], 
                    pieceId : "k2",
                    move_to : "g8",
                    toBeEliminatedPieceId : ""
                });

                return {
                    castelingMove : castelingMove
                }
            }
        }
        if (piecesMadeFirstMove.indexOf("c21") === -1 && isThePathFree(pieces["k2"].position, pieces["c21"].position)) {
            if (isItSafeToGo("c8")) {
                let castelingMove = []
                castelingMove.push({
                    piece : pieces["c21"], 
                    pieceId : "c21",
                    move_to : "d8",
                    toBeEliminatedPieceId : ""
                });
                castelingMove.push({
                    piece : pieces["k2"], 
                    pieceId : "k2",
                    move_to : "c8",
                    toBeEliminatedPieceId : ""
                });

                return {
                    castelingMove : castelingMove
                }
            }
        }
    }

    return null
}