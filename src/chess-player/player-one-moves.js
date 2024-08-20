import { pieces, piecesMadeFirstMove, playerTwoPieces, playerOnePieces, canGo, board, isItSafeToGo } from './core';
import { allowedMoves } from './allowed-move-options';
let dangereousPieceId = null;

export function eliminationMove(movingPiece, pos, childPiece) {
	if(canGo(movingPiece, pos, false)){
        let pieceToBeEliminatedID = childPiece.id;
        if(canEliminate(movingPiece.id, pieceToBeEliminatedID)){
            if (dangereousPieceId !== null) {
                if (isKingOutOfDanger(movingPiece, pos) || pieceToBeEliminatedID === dangereousPieceId) {
                    dangereousPieceId = null;
                    return {
		               	movingPiece, 
		               	pieceId : movingPiece.id,
		               	move_to : pos,
		               	toBeEliminatedPieceId : pieceToBeEliminatedID
		            }
                    
                    //setTimeout(computer, 3000);
                } else {
                    alert("Move not allowed 01");
                    console.log(" movingPiece ", movingPiece, " and pos", pos);
                    if (isCheckMate()) {
                        return {
                            checkMate : true
                        }
                    }
                    return {
		            	movingPiece : null
		            }
                }
            }else {
               return {
	               	movingPiece, 
	               	pieceId : movingPiece.id,
	               	move_to : pos,
	               	toBeEliminatedPieceId : pieceToBeEliminatedID
               }
            }
            
        }else{
            alert("Move not allowed 05")
            return {
            	movingPiece : null
            }
        }
    } else {
    	return null
    }
}

export function normalMove(movingPiece, pos, childPiece) {
	if(canGo(movingPiece, pos, true)){
        if (dangereousPieceId !== null) {
            if (isKingOutOfDanger(movingPiece, pos)) {
                dangereousPieceId = null;
               return {
	               	movingPiece, 
	               	pieceId : movingPiece.id,
	               	move_to : pos,
	               	toBeEliminatedPieceId : ""
               }
                //setTimeout(computer, 3000);
            } else {
                alert("Move not allowed 02");
                if (isCheckMate()) {
                    return {
                        checkMate : true
                    }
                }
                return {
                	movingPiece : null
                }
            }
        } else {
            if (movingPiece.name === "rook" && piecesMadeFirstMove.indexOf(movingPiece.id) === -1 && piecesMadeFirstMove.indexOf("k1") === -1) {
                let movingrookPosition = movingPiece.position;
                let castelingMove = [];
                //let movingrookIndex = board.indexOf(currentrookPosition) + 1;
                let kingOnePosition = pieces["k1"].position;
                if (movingrookPosition === "a1" && kingOnePosition === "e1" && pos === "d1") {
                	castelingMove.push({
		               	piece : movingPiece, 
		               	pieceId : movingPiece.id,
		               	move_to : pos,
		               	toBeEliminatedPieceId : ""
	               	});

                	castelingMove.push({
		               	piece : pieces["k1"], 
		               	pieceId : "k1",
		               	move_to : "c1",
		               	toBeEliminatedPieceId : ""
	               	});

	               	return {
                        castelingMove : castelingMove
                    };
                } else if (movingrookPosition === "h1" && kingOnePosition === "e1" && pos === "f1") {
                  	castelingMove.push({
		               	piece : movingPiece, 
		               	pieceId : movingPiece.id,
		               	move_to : pos,
		               	toBeEliminatedPieceId : ""
	               	});

                	castelingMove.push({
		               	piece : pieces["k1"], 
		               	pieceId : "k1",
		               	move_to : "g1",
		               	toBeEliminatedPieceId : ""
	               	});

	               	return { castelingMove : castelingMove };
                } else {
                  return {
		               	movingPiece, 
		               	pieceId : movingPiece.id,
		               	move_to : pos,
		               	toBeEliminatedPieceId : ""
	               }
                }
            } else if (movingPiece.name === "king" && isKingOneInCheck(pieces, pos)) {
                //if new position is dangereous for the king
                alert("Move not allowed : king will get in danger");
                return {
                	movingPiece : null
                }
            } else {
            	return {
	               	movingPiece, 
	               	pieceId : movingPiece.id,
	               	move_to : pos,
	               	toBeEliminatedPieceId : ""
               }
            }
        }   
    } else {
    	return null
    }
}

function canEliminate(moving_piece_id, current_piece_id){
    let current_piece = pieces[current_piece_id];
    let moving_piece = pieces[moving_piece_id];
    if(moving_piece.player === current_piece.player){
        return false;
    }else{
        return true;
    }
}

function isKingOutOfDanger(movingPiece, newPosition){
    let dangereousPiece = {
        position : pieces[dangereousPieceId].position,
        name : pieces[dangereousPieceId].name,
        player : pieces[dangereousPieceId].player,
        id : ""
    };
    let dangereousPieceIndex = board.indexOf(dangereousPiece.position) + 1;
    let kingoneIndex = board.indexOf(pieces["k1"].position) + 1;
    if (dangereousPiece.position === newPosition) {
        // it means if the move eliminates the danger
        return true;
    }
    if(movingPiece.name === "king"){
        return !canGo(dangereousPiece, newPosition) && !isKingOneInCheck(pieces, newPosition);
    }
    if ((kingoneIndex - dangereousPieceIndex)%9 === 0) {
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 9, newPosition);
    }
    if((kingoneIndex - dangereousPieceIndex)%7 === 0) {
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 7, newPosition);
    }
    if ((kingoneIndex - dangereousPieceIndex)%8 === 0){            
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 8, newPosition);
    }
    if (Math.ceil(kingoneIndex/8) === Math.ceil(dangereousPieceIndex/8)) {
        return canThePieceBlockTheDanger(kingoneIndex, dangereousPieceIndex, 1, newPosition);
    }
    return false;
}

function canThePieceBlockTheDanger(pos1, pos2, offset, movingPiecePos) {
    let index;
    let middleBoxes = [];
    if(pos1 > pos2 + offset){
        index = pos2 + offset;
        while(pos1 > index){
            middleBoxes.push(board[index-1]);
            index = index + offset;
        }
        if(middleBoxes.indexOf(movingPiecePos) !== -1){
            return true;
        }
        return false;
    }else if(pos1 < pos2 - offset){
        index = pos2 - offset;
        middleBoxes = [];
        while(index > pos1){
            middleBoxes.push(board[index-1]);
            index = index - offset;
        }
        
        if(middleBoxes.indexOf(movingPiecePos) !== -1){
            return true;
        }
        return false;
    }
}

function isKingOneInCheck(allPieces, newPosition=null){
    let kingPosition = newPosition === null ? pieces["k1"].position : newPosition;
    let opponentPiece, piece_id;
    for (var i = 0; i < playerTwoPieces.length; i++) {
        piece_id = playerTwoPieces[i];
        opponentPiece = {
            id : "",
            position : pieces[piece_id].position,
            name : pieces[piece_id].name,
            player : pieces[piece_id].player
        }
        if(canGo(opponentPiece, kingPosition, false, true, true)){
            dangereousPieceId = piece_id;
            return true;
        }
    }
    return false;
}

function isCheckMate() {
    //let kingPosition = pieces["k1"].position;
    let allowedMovePositions;

    for (let i = 0; i < playerOnePieces.length; i++) {
        if (playerOnePieces[i] !== "k1") {
            let allowedPositions = allowedMoves(pieces[playerOnePieces[i]], playerOnePieces[i]);
            if (allowedPositions.length > 0) {
                for (let pos = 0; pos < allowedPositions.length; pos++) {
                    if (isKingOutOfDanger(pieces[playerOnePieces[i]], allowedPositions[pos])) {
                        return false
                    } 
                }
            }
        }
    }
    allowedMovePositions = allowedMoves(pieces["k1"], "k1");
    if (allowedMovePositions.length > 0) {
        for (let i = 0; i < allowedMovePositions.length; i++) {
            if (isItSafeToGo(allowedMovePositions[i])) {
                return false
            } 
        }
    }
    return true
}