import { Board, findBuilders } from "./board";
import { Builder } from "./builder";

class GameState {
    boardState: Board | undefined;
    builderA: Builder | undefined;
    builderB: Builder | undefined;
    playerTurn: "builderA" | "builderB";
    turnState: "movePhase" | "buildPhase";

    constructor(activePlayer: "builderA" | "builderB", turn: "movePhase" | "buildPhase" = "movePhase", board: Board) {
        this.playerTurn = activePlayer;
        this.turnState = turn;
        this.boardState = board;
        let builders = findBuilders(board);
        if (builders !== undefined) {
            this.builderA = builders[0];
            this.builderB = builders[1];
        }
    }

    getBoardState() {
        return this.boardState;
    }

    setBoardState(board: Board) {
        this.boardState = board;
    }

    getBuilder(builderName: "builderA" | "builderB") {
        if (builderName === "builderA") {
            return this.builderA;
        }
        return this.builderB;
    }

    setBuilder(builderName: "builderA" | "builderB", builder: Builder) {
        if (builderName === "builderA") {
            this.builderA = builder;
        }
        this.builderB = builder;
    }

    getPlayerTurn() {
        return this.playerTurn;
    }

    setPlayerTurn(activePlayer: "builderA" | "builderB") {
        this.playerTurn = activePlayer;
    }

    getTurnState() {
        return this.turnState;
    }

    setTurnState(turn: "movePhase" | "buildPhase") {
        this.turnState = turn;
    }
}

export { GameState }