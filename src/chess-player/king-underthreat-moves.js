import { pieces, canGo, isItSafeToGo, playerTwoPieces, playerOnePieces } from './core';
import { doesMovingPutKingInDanger } from './dangerous-moves';
import { allowedMoves } from './allowed-move-options';

export function  moveTheKing() {
    let allowedPositions = allowedMoves(pieces["k2"], "k2");
    let goTo = "";

    if(allowedPositions.length > 0){
        for (var i = 0; i < allowedPositions.length; i++) {
            if (isItSafeToGo(allowedPositions[i])){
                goTo = allowedPositions[i];
                return goTo;
            }
        }
    }
    return goTo;
}

export function eliminateThreat(threat_piece, safemode=true){
    let piece_id;
    let threatEliminatingOptions = [];
    let threatPiece = pieces[threat_piece];

    for (var i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        let eliminatingPiece = {
            id: piece_id,
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(eliminatingPiece, threatPiece.position) && !doesMovingPutKingInDanger(eliminatingPiece.position)){
            threatEliminatingOptions.push(piece_id);
        }
    }

    if(threatEliminatingOptions.length > 0){
        let bestOption = [];
        let optionPiece;
        let requirement = safemode ? isItSafeToGo(threatPiece.position, true) : true;
        if(requirement){
            if (!safemode) {
                threatEliminatingOptions = threatEliminatingOptions.filter(function(item) {
                    return item !== "k2";
                });
            }

            for (let index = 0; index < threatEliminatingOptions.length; index++) {
                piece_id = threatEliminatingOptions[index];
                optionPiece = pieces[piece_id];

                let eliminateAndTrapMove = eliminateThreatAndTrapOtherPiece(optionPiece, piece_id, threatPiece.position)
                if (eliminateAndTrapMove !== null) {
                    bestOption.push(eliminateAndTrapMove);
                }
            }

            if (bestOption.length > 0) {
                let selectedMove;

                for (let i = 0; i < bestOption.length; i++) {
                    if (i === 0) {
                        selectedMove = bestOption[i];
                    }
                    if (bestOption[i].targetPiece === "king" || bestOption[i].targetPiece === "queen") {
                        selectedMove = bestOption[i];
                    }
                }
                if (selectedMove === undefined) {
                    selectedMove = bestOption[Math.floor(Math.random()*bestOption.length)]
                }
                return {
                    ...pieces[selectedMove.movingPieceId],
                    id : selectedMove.movingPieceId,
                    threatPieceId : threat_piece,
                    move_to : selectedMove.move_to
                }
            }

            if(bestOption.length < 1 && threatEliminatingOptions.length > 0){
                let p_id = "";
                for (let i = 0; i < threatEliminatingOptions.length; i++) {
                    p_id = threatEliminatingOptions[i];
                    if (pieces[p_id].name === "pawn") {
                        break
                    }
                    p_id = ""
                }
                if (p_id === "") {
                    p_id = threatEliminatingOptions[Math.floor(Math.random()*threatEliminatingOptions.length)];
                }

                return {
                    ...pieces[p_id],
                    id : p_id,
                    move_to : threatPiece.position,
                    threatPieceId : threat_piece
                }
            }
        }

    }
    return null;
}

export function canTheKingEliminateThreat(threat_piece) {
    let threatPiece = pieces[threat_piece];
    let kingPiece = {
        id : "",
        position : pieces["k2"].position,
        name : pieces["k2"].name,
        player : pieces["k2"].player
    }

    if (canGo(kingPiece, threatPiece.position) && isItSafeToGo(threatPiece.position, true)){
        return true; 
    }else{
        return false;
    }
}


function eliminateThreatAndTrapOtherPiece(piece, piece_id, newPosition) {
    let element = {
        id : piece_id,
        position : newPosition,
        name : piece.name,
        player: piece.player
    }

    for (let i = 0; i < playerOnePieces.length; i++) {
        let opponentPiece = pieces[playerOnePieces[i]];
        if (opponentPiece.name !== "pawn") {
            if (canGo(element, opponentPiece.position) && isItSafeToGo(newPosition)) {
                return {
                    targetPiece : opponentPiece,
                    move_to : newPosition,
                    movingPieceId : piece_id,
                }
            }
        }
    }

    return null
}

