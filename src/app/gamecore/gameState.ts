import { Builder, Board, encodeBoard, decodeBoard, findBuilders} from "./internal";

export class GameState {
    boardState: Board | undefined;
    builderA: Builder | undefined;
    builderB: Builder | undefined;
    playerTurn: "builderA" | "builderB";
    turnState: "movePhase" | "buildPhase";

    constructor(activePlayer: "builderA" | "builderB", turn: "movePhase" | "buildPhase" = "movePhase", buildA: Builder | undefined = undefined, buildB: Builder | undefined = undefined,  board: Board) {
        this.playerTurn = activePlayer;
        this.turnState = turn;
        this.boardState = board;
        if (buildA === undefined && buildB === undefined) {
            let builders = findBuilders(board);
            if (builders !== undefined) {
               this.builderA = builders[0];
              this.builderB = builders[1];
            }    
        }
        else {
            this.builderA = buildA;
            this.builderB = buildB;
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

export function convertGameStateToJson(gameState: GameState) {
    let builders = [ gameState.getBuilder("builderA"), gameState.getBuilder("builderB") ];

    let boardStateStrings = encodeBoard(gameState.getBoardState() as Board);
    let buildersStrings = JSON.stringify(builders);
    let playerTurnString = JSON.stringify(gameState.getPlayerTurn());
    let turnStateString = JSON.stringify(gameState.getTurnState());
    
    let resultStrings = [
        boardStateStrings,
        buildersStrings,
        playerTurnString,
        turnStateString,
    ];
    
    return resultStrings;
}

export function convertJsonToGameState(strings: (string | String[])[]) {
    let boardStateStrings: string = (strings[0] as string);
    let buildersStrings: String = (strings[1] as string);
    let playerTurnString: String = (strings[2] as string);
    let turnStateString: String = (strings[3] as string);

    let board: Board = decodeBoard(boardStateStrings);
    let builders: Builder[] = JSON.parse(buildersStrings.toString());
    let playerTurn: "builderA" | "builderB" = JSON.parse(playerTurnString.toString());
    let turnState: "movePhase" | "buildPhase" = JSON.parse(turnStateString.toString());
    let gameState = new GameState(playerTurn, turnState, builders[0], builders[1], board);

    return gameState;
}