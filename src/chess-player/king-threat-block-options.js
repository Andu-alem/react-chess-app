import { pieces, canGo, board, playerTwoPieces } from './core';
import { doesMovingPutKingInDanger } from './dangerous-moves';

export function blockPiece(threat_piece) {
    let middlePositions = [];
    let kingPosition = pieces["k2"].position;
    let threatPiece = pieces[threat_piece];
    let threatPosition = threatPiece.position;
    let kingIndex = board.indexOf(kingPosition) + 1;
    let threatIndex = board.indexOf(threatPosition) + 1;
    let tempIndex;

    if (pieces[threat_piece].name !== "knight") {    
        if ((kingIndex-threatIndex) % 9 === 0){
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 9;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 9;
                }
            }else{
                tempIndex = kingIndex + 9;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 9;
                }
            }
        } else if ((kingIndex-threatIndex) % 7 === 0){
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 7;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 7;
                }
            }else{
                tempIndex = kingIndex + 7;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 7;
                }
            }
        } else if (Math.ceil(kingIndex/8) === Math.ceil(threatIndex/8)){
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 1;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 1;
                }
            }else{
                kingIndex = kingIndex + 1;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 1;
                }
            }
        } else {
            if(kingIndex > threatIndex){
                tempIndex = kingIndex - 8;
                while(tempIndex > threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex - 8;
                }
            }else{
                tempIndex = kingIndex + 8;
                while(tempIndex < threatIndex){
                    middlePositions.push(board[tempIndex-1]);
                    tempIndex = tempIndex + 8;
                }
            }
        }

        if (middlePositions.length > 0){
            for (var index = 0; index < middlePositions.length; index++) {
                for (var i = 0; i < playerTwoPieces.length; i++) {
                    let piece = pieces[playerTwoPieces[i]];
                    if (piece.name !== "king") {
                         let block_piece = {
                            id : "",
                            position : piece.position,
                            name : piece.name,
                            player : piece.player
                        }
                        if (canGo(block_piece, middlePositions[index], true) && !doesMovingPutKingInDanger(block_piece.position)) {
                            return {
                                ...piece,
                                move_to : middlePositions[index],
                                piece_id : playerTwoPieces[i]
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}