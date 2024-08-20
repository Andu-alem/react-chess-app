
import trapMoveOption from './trap-options';
import { piecesInDanger } from './pieces-under-threat';
import { opponentEliminationMoveOption, opponentPawnEliminationMoveOption } from "./opponent-elimination-move";
import { randomMoveOption, fallbackMoveOption } from './random-move-options';
import { kingUnderThreatMoveOption, castelingMoveOption } from './kingTwo-move-option';
import firstMoveOption from './first-move-options';
import pieceUnderThreatMoveOption from './piece-under-threat-move-options';

export function trapMove(pieces, playerTwoPieces) {
	return trapMoveOption();
}

export function castelingMove() {
    return castelingMoveOption();
}

export function kingUnderThreatMove() {
	return kingUnderThreatMoveOption()
}

export function pieceUnderThreatMove() {
	return pieceUnderThreatMoveOption(piecesInDanger())
}

export function opponentEliminationMove() {
	return opponentEliminationMoveOption();
}

export function opponentPawnEliminationMove(argument) {
	return opponentPawnEliminationMoveOption()
}

export function randomMove(random_move) {
	return randomMoveOption(random_move)
}

export function fallbackMove() {
    return fallbackMoveOption()
}

export function firstMove() {
	return firstMoveOption()
}