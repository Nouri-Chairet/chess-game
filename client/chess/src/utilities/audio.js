import capture from './audio/capture.mp3';
import castle from './audio/castle.mp3';
import check from './audio/move-check.mp3';
import move from './audio/move-self.mp3';
import promotion from './audio/promote.mp3';
import gameEnd from './audio/game-end.mp3';

export const sounds = {
        capture: new Audio(capture),
        castle: new Audio(castle),
        check: new Audio(check),
        move: new Audio(move),
        promotion: new Audio(promotion),
        end: new Audio(gameEnd)
};