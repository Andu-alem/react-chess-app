import { pieces } from './core';
//import { allowedMoves } from './allowed-move-options';

export default function firstMoveOption() {
    let openingMoves = [
        { pieceId : "h22", position : "f6" },
        { pieceId : "p25", position : "e6" },
        { pieceId : "p23", position : "c6" },
        { pieceId : "p27", position : "g6" }
    ]
    let selectedMove = openingMoves[Math.floor(Math.random()*openingMoves.length)]

    return {
    	piece : pieces[selectedMove.pieceId],
    	pieceId : selectedMove.pieceId,
    	move_to : selectedMove.position,
    	toBeEliminatedPiece : ""
    }
}