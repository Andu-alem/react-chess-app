
let isPlayerOneTurn;
export let board = [];
export let piecesMadeFirstMove;
export let pieces;
export let playerOnePieces;
export let playerTwoPieces;

export function setUp(allPieces, chessBoard, movedPieces, pOnePieces, pTwoPices, whoseTurn) {
    board = chessBoard;
    pieces = allPieces;
    piecesMadeFirstMove = movedPieces;
    playerOnePieces = pOnePieces;
    playerTwoPieces = pTwoPices;
    isPlayerOneTurn = whoseTurn;
}

export function canGo(element, newPosition, isEmpityBox , forAnalysis = false, forKOneAnalysis = false){
    if (newPosition !== null) {
        let {id, name, position} = element;
        //let id = element.id !== undefined ? element.id : ""; 
        let lastPos = board.indexOf(position)+1;
        let newPos = typeof(newPosition) === "string" ? board.indexOf(newPosition)+1 : newPosition;
        let isItOwnPiecePos = false;

        if (!forAnalysis) {
            isItOwnPiecePos = isPosOccupiedBySelf(element, newPos);
        }

        if(name === "knight"){
            let allowedPos = lastPos - newPos;
            if(!isItOwnPiecePos && (allowedPos === 10 || allowedPos === -10 || allowedPos===6 || allowedPos===-6 || allowedPos===17 || allowedPos===-17 || allowedPos===15 || allowedPos===-15)){
                if(newPos < 1 || newPos > 64){
                    return false;
                }else if(lastPos % 8 === 0){
                    if((newPos - 1) % 8 === 1){
                        return false;
                    }else if(newPos % 8 === 1){
                        return false;
                    }
                }else if(lastPos % 8 === 1){
                    if((newPos + 1) % 8 === 0 || newPos % 8 === 0){
                        return false;
                    }
                }else if(lastPos % 8 === 7){
                    if(newPos % 8 === 1){
                        return false;
                    }
                }else if(lastPos % 8 === 2){
                    if(newPos % 8 === 0){
                        return false;
                    }
                }
                return true;
            }else{
                return false;
            }
        }else if(name === "bishop"){
            if(canMoveDiagonal(lastPos, newPos) && !hasDiagonalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }else if(name === "rook"){
            if(canMoveHorizontal(lastPos, newPos) && !hasHorizontalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveVertical(lastPos, newPos) && !hasVerticalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }else if(name === "pawn"){
            if(isPlayerOneTurn && !forAnalysis){
                if(canMoveOnestepForward(lastPos, newPos) && !hasFrontBlock(lastPos, newPos+1)){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDiagonal(lastPos, newPos)){
                    return true;
                }else if(canMoveTwostepForward(lastPos, newPos, id) && !hasFrontBlock(lastPos, newPos+1)){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDownDiagonal(lastPos, newPos) && forAnalysis){
                    return true;
                }else{
                    return false;
                }
            }else{
                if(canMoveOnestepBackward(lastPos, newPos) && !hasFrontBlock(lastPos, newPos-1)){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDownDiagonal(lastPos, newPos) && !isItOwnPiecePos){
                    return true;
                }else if(canMoveTwostepBackward(lastPos, newPos, id) && !hasFrontBlock(lastPos, newPos-1)){
                    return true;
                }else if(!isEmpityBox && canMoveOnestepDiagonal(lastPos, newPos) && forAnalysis){
                    return true;
                }else{
                    return false;
                }
            }
        }else if(name === "queen"){
            if(canMoveHorizontal(lastPos, newPos) && !hasHorizontalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveVertical(lastPos, newPos) && !hasVerticalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveDiagonal(lastPos, newPos) && !hasDiagonalBlock(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }else if(name === "king"){
            if(canMoveOnestepHorizontal(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepForward(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepBackward(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepDiagonal(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else if(canMoveOnestepDownDiagonal(lastPos, newPos) && !isItOwnPiecePos){
                return true;
            }else{
                return false;
            }
        }
    } else {
        return false;
    }
}

function isPosOccupiedBySelf(movingPiece, newPosition) {
    for (let id in pieces) {
        if (pieces[id].position === board[newPosition-1]) {
            if (pieces[id].player === movingPiece.player) {
                return true;
            } else {
                return false;
            }
        }
    }
}

function canMoveVertical(lastPos, newPos){
    if(Math.ceil(lastPos/8)===Math.ceil(newPos/8) && lastPos - newPos !== 0){
        return true;
    }else{
        return false;
    }
}
function canMoveHorizontal(lastPos, newPos){
    if(Math.abs((newPos - lastPos)%8)===0 && lastPos - newPos !== 0){
        return true;
    }else{
        return false;
    }
}
export function areInTheSameDiagonal(pos1, pos2){
    if((pos1 - pos2)%9 === 0){
        if(pos1 > pos2){
            while(pos1 > pos2){
                if(pos2 % 8 === 0 || pos1 % 8 === 1){
                    return false
                }
                pos2 = pos2 + 9;
            }
            return true;
        }else {
            while(pos1 < pos2){
                if(pos1 % 8 === 0 || pos2 % 8 === 1){
                    return false
                }
                pos2 = pos2 - 9;
            }
            return true;
        }
    }else if((pos1 - pos2)%7 === 0){
        if(pos1 > pos2){
            while(pos1 > pos2){
                if(pos1 % 8 === 0 || pos2 % 8 === 1){
                    return false
                }
                pos2 = pos2 + 7;
            }
            return true;
        }else {
            while(pos1 < pos2){
                if(pos2 % 8 === 0 || pos1 % 8 === 1){
                    return false
                }
                pos2 = pos2 - 7;
            }
            return true;
        }
    }
}
function canMoveDiagonal(lastPos, newPos){
    if((((lastPos - newPos)%9 === 0) || ((lastPos - newPos)%7 === 0)) && lastPos - newPos !== 0){
        return areInTheSameDiagonal(lastPos, newPos);
    }else{
        return false;
    }
}
function canMoveOnestepDiagonal(lastPos, newPos){
    if(lastPos % 8 !== 0){
        if(((lastPos - 7) === newPos) || ((lastPos + 9) === newPos)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
function canMoveOnestepDownDiagonal(lastPos, newPos){
    if(lastPos % 8 !== 1){
        if(newPos < 1 ||  newPos > 64){
            return false;
        }else{
            if(((lastPos + 7) === newPos) || ((lastPos - 9) === newPos)){
                return true;
            }else{
                return false;
            }
        }
    }else{
        return false;
    }
}
function canMoveOnestepForward(lastPos, newPos){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos+1)){
        return true;
    }else{
        return false;
    }
}
function canMoveTwostepForward(lastPos, newPos, piece_id){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos+2)){
        if(piecesMadeFirstMove.length > 0){
            if(piecesMadeFirstMove.indexOf(piece_id) === -1){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
    }
}
function canMoveTwostepBackward(lastPos, newPos, piece_id){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos-2)){
        if(piecesMadeFirstMove.length > 0){
            if(piecesMadeFirstMove.indexOf(piece_id) === -1){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
    }
}
function canMoveOnestepBackward(lastPos, newPos){
    if((Math.ceil(lastPos/8)===Math.ceil(newPos/8)) && (newPos === lastPos-1)){
        return true;
    }else{
        return false;
    }
}
function canMoveOnestepHorizontal(lastPos, newPos){
    if(((lastPos - 8) === newPos) || ((lastPos + 8) === newPos)){
        return true;
    }else{
        return false;
    }
}
function hasHorizontalBlock(lastPos, newPos){
    return checkBlock(lastPos, newPos, 8);
}
export function hasVerticalBlock(lastPos, newPos){
    return checkBlock(lastPos, newPos, 1);
}
function hasDiagonalBlock(lastPos, newPos){
    if((lastPos - newPos)%7 === 0){
        return checkBlock(lastPos, newPos, 7);
    }else if((lastPos - newPos)%9 === 0){
        return checkBlock(lastPos, newPos, 9);
    }else{
        return false;
    }
}
function hasFrontBlock(lastPos, newPos){
    return checkBlock(lastPos, newPos, 1);
}

function checkBlock(lastPos, newPos, offset){
    let index;
    let middleBoxes = [];
    if(newPos > lastPos + offset){
        index = lastPos + offset;
        while(newPos > index){
            middleBoxes.push(board[index-1]);
            index = index + offset;
        }
        for (let piece in pieces) {
                if(middleBoxes.indexOf(pieces[piece].position) !== -1){
                    return true;
                }
        }
        return false;
    }else if(newPos < lastPos - offset){
        index = lastPos - offset;
        middleBoxes = [];
        while(index > newPos){
            middleBoxes.push(board[index-1]);
            index = index - offset;
        }
        for (let piece in pieces) {
                if(middleBoxes.indexOf(pieces[piece].position) !== -1){
                    return true;
                }
        }
        return false;
    }else{
        return false;
    }
}

export function middleBoxes(posOne, posTwo, pawn = false, onlyDiagonal=false) {
    let index;
    let middleBoxes = [];
    let offset = 0;
    let pos1 = board.indexOf(posOne) + 1;
    let pos2 = board.indexOf(posTwo) + 1;

    if (areInTheSameDiagonal(pos1, pos2)) {
        if ((pos1 - pos2) % 7 === 0) {
            offset = pawn && Math.abs((pos1 - pos2)) / 7 > 1 ? 0 : 7;
        } else {
            offset = pawn && Math.abs((pos1 - pos2)) / 9 > 1 ? 0 : 9;
        }
    } else if (canMoveVertical(pos1, pos2) && !onlyDiagonal) {
        offset = pawn ? 0 : 1;
    } else if (canMoveHorizontal(pos1, pos2) && !onlyDiagonal) {
        offset = pawn ? 0 : 8;
    }

    if (offset > 0) {
        if(pos1 > pos2 + offset){
            index = pos2 + offset;
            while(pos1 > index){
                middleBoxes.push(board[index-1]);
                index = index + offset;
            }
        }else if(pos1 < pos2 - offset){
            index = pos2 - offset;
            middleBoxes = [];
            while(index > pos1){
                middleBoxes.push(board[index-1]);
                index = index - offset;
            }
        }
    } 
    return middleBoxes;
}

export function isItTheOnlyMiddlePiece(posOne, posTwo, isItPawn, piecePosition, onlyDiagonal = false) {
    let middlePositions = middleBoxes(posOne, posTwo, isItPawn, onlyDiagonal);
    let notFreeBoxCounter = 0;

    for (let piece in pieces) {
        if (middlePositions.indexOf(pieces[piece].position) !== -1) {
            notFreeBoxCounter++
        }
    }

    if (notFreeBoxCounter === 1 && middlePositions.indexOf(piecePosition) !== -1) {
        return true;
    }
    return false;
}

export function isThePathFree(posOne, posTwo) {
    let middlePositions = middleBoxes(posOne, posTwo)
    for (let piece in pieces) {
        if (middlePositions.indexOf(pieces[piece].position) !== -1) {
            return false
        }
    }
    return true
}

export function isTheDivBoxEmpty(pos){
    for (let piece in pieces){
        if (pos === pieces[piece].position) {
            return false
        }
    }
    return true
}

export function isItSafeToGo(piece_position, isEmpityBox=false){
    for(var i = 0; i < playerOnePieces.length; i++){
        let piece = pieces[playerOnePieces[i]];
        let element = {
            id : playerOnePieces[i],
            position : piece.position,
            name : piece.name,
            player: piece.player
        }
        if(canGo(element, piece_position, isEmpityBox, true)){
            return false;
        }
    }
    return true;
}

export function isItToBePromotedPawn(pawnPosition) {
    if (pawnPosition.indexOf("6") !== -1 || pawnPosition.indexOf("7") !== -1) {
        for (let i = 0; i < playerTwoPieces.length; i++) {
            let playerTwoPiece = pieces[playerTwoPieces[i]];
            if (playerTwoPiece.name === "pawn" && pawnPosition[1] !== "7") {
                let pawnTwoPos = playerTwoPiece.position;
                // if any player two pawn blocks the movement of player one pawn
                if ((Number(pawnTwoPos[1]) === Number(pawnPosition[1]) + 1) && pawnTwoPos[0] === pawnPosition[0]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    return false;
}
