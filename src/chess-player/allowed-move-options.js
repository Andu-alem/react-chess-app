import { board, canGo, hasVerticalBlock, isTheDivBoxEmpty, piecesMadeFirstMove } from './core'

export function allowedMoves(piece, piece_id){
    //returns array of allowed positions for a piece to move
    let allowedPositions = [];
    let positionOnBoard = board.indexOf(piece.position) + 1;
    let element = {
        id : piece_id,
        position : piece.position,
        name : piece.name,
        player: piece.player
    }
    if(piece.name === "pawn"){
        if(canGo(element, positionOnBoard - 1, isTheDivBoxEmpty(board[positionOnBoard-2])) && !hasVerticalBlock(positionOnBoard, positionOnBoard - 1)){
            allowedPositions.push(board[positionOnBoard - 2]);
        }
        if(piecesMadeFirstMove.indexOf(piece_id) === -1){
            if(canGo(element, positionOnBoard - 2, isTheDivBoxEmpty(board[positionOnBoard-3])) && !hasVerticalBlock(positionOnBoard, positionOnBoard - 2)){
                allowedPositions.push(board[positionOnBoard - 3]);
            }
        }
        if(canGo(element, positionOnBoard + 7, isTheDivBoxEmpty(board[positionOnBoard+6]))){
            allowedPositions.push(board[positionOnBoard + 6]);
        }
        if(canGo(element, positionOnBoard - 9, isTheDivBoxEmpty(board[positionOnBoard-10]))){
            allowedPositions.push(board[positionOnBoard - 10]);
        }
    }else if(piece.name === "knight"){
        if(canGo(element, positionOnBoard + 10)){
            allowedPositions.push(board[positionOnBoard + 9]);
        }
        if(canGo(element, positionOnBoard - 10)){
            allowedPositions.push(board[positionOnBoard - 11]);
        }
        if(canGo(element, positionOnBoard + 6)){
            allowedPositions.push(board[positionOnBoard + 5]);
        }
        if(canGo(element, positionOnBoard - 6)){
            allowedPositions.push(board[positionOnBoard - 7]);
        }
        if(canGo(element, positionOnBoard + 15)){
            allowedPositions.push(board[positionOnBoard + 14]);
        }
        if(canGo(element, positionOnBoard - 15)){
            allowedPositions.push(board[positionOnBoard - 16]);
        }
        if(canGo(element, positionOnBoard + 17)){
            allowedPositions.push(board[positionOnBoard + 16]);
        }
        if(canGo(element, positionOnBoard - 17)){
            allowedPositions.push(board[positionOnBoard - 18]);
        }
    }else if(piece.name === "bishop"){
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 9));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -9));
    }else if(piece.name === "rook"){
        allowedPositions = allowedPositions.concat(allowedHorizontalPositions(element, positionOnBoard));
        allowedPositions = allowedPositions.concat(allowedVerticalPositions(element, positionOnBoard));
    }else if(piece.name === "queen"){
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -7));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 9));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -9));
        allowedPositions = allowedPositions.concat(allowedHorizontalPositions(element, positionOnBoard));
        allowedPositions = allowedPositions.concat(allowedVerticalPositions(element, positionOnBoard));
    }else{
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 7, "king"));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -7, "king"));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, 9, "king"));
        allowedPositions = allowedPositions.concat(allowedDiagonalPositions(element, positionOnBoard, -9, "king"));
        allowedPositions = allowedPositions.concat(allowedHorizontalPositions(element, positionOnBoard));
        allowedPositions = allowedPositions.concat(allowedVerticalPositions(element, positionOnBoard));
    }

    return allowedPositions;
}
function allowedDiagonalPositions(element, positionOnBoard, offset, piece=null){
    let positions = [];
    let tempPosition = positionOnBoard + offset;
    if(piece === null){
        while((0 < tempPosition) && (tempPosition < 65)){
            if(canGo(element, tempPosition)){
                positions.push(board[tempPosition - 1]);
            }
            tempPosition = tempPosition + offset;
        }
    }else{
        if(canGo(element, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
    }
    return positions;
}
function allowedHorizontalPositions(element, positionOnBoard){
    let positions = [];
    let tempPosition;
    tempPosition = positionOnBoard - 8;
    while(0 < tempPosition){
        if(canGo(element, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition - 8;
    }
    tempPosition = positionOnBoard + 8;
    while(tempPosition < 65){
        if(canGo(element, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition + 8;
    }
    return positions;
}
function allowedVerticalPositions(element, positionOnBoard){
    let positions = [];
    let tempPosition;
    tempPosition = positionOnBoard - 1;
    while(tempPosition % 8 !== 1 && tempPosition > 0){
        if(canGo(element, tempPosition) && !hasVerticalBlock(positionOnBoard, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition - 1;
    }
    tempPosition = positionOnBoard + 1;
    while(tempPosition % 8 !== 0 && tempPosition < 65){
        if(canGo(element, tempPosition) && !hasVerticalBlock(positionOnBoard, tempPosition)){
            positions.push(board[tempPosition - 1]);
        }
        tempPosition = tempPosition + 1;
    }
    return positions;
}