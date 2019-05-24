import { Builder } from './Builder'
import { Board, convertBoardToJson, convertJsonToBoard } from './Board'
import { Tile, hasPlayerWon, isValidTileMove } from './Tile'
import { Tower } from './Tower';
import { GameState, convertGameStateToJson, convertJsonToGameState } from './GameState'
import * as constantStrings from './ConstantStrings'

// Take part of a player's turn using specified action and actionParms. Return results
export function takeTurnAction(gameState: GameState, action: "moveAction" | "buildAction", actionParms: String[]) {
    let resultParms: String[] = new Array();
    
    if (action === constantStrings.moveAction) {
        // Make sure the current phase is correct
        if (gameState.getTurnState() === constantStrings.movePhase) {
            resultParms.push(...takeMoveAction(gameState, actionParms));
        }
        else {
            resultParms.push(constantStrings.invalidMove);
            resultParms.push(constantStrings.notMovePhase);
        }            
    }
    else {
        // Make sure the current phase is correct
        if (gameState.getTurnState() === constantStrings.buildPhase) {
            resultParms.push(...takeBuildAction(gameState, actionParms));
        }
        else {
            resultParms.push(constantStrings.invalidBuild);
            resultParms.push(constantStrings.notBuildPhase);
        }            
    }
    
    return resultParms;
}

// Take a player's move phase using actionParms. Return results
export function takeMoveAction(gameState: GameState, actionParms: String[]) {
    let resultParms: String[] = new Array();
    let board = gameState.getBoardState();
    let activeBuilder = gameState.getBuilder(gameState.getPlayerTurn());
    let actionString = actionParms[0];

    if (activeBuilder !== undefined && board !== undefined) {
        // Check move is valid
        if (isValidMove((board as Board), activeBuilder, activeBuilder.getCurrentTile(), actionString)) {
            resultParms.push(constantStrings.validMove);
            // Make move
            moveBuilder((board as Board), activeBuilder, activeBuilder.getCurrentTile(), actionString);
            // Check if the player has won
            if (hasPlayerWon(board.getTile(activeBuilder.getCurrentTile()) as Tile)) {
                resultParms.push(constantStrings.playerWon);
                resultParms.push(gameState.getPlayerTurn());
                resultParms.push(activeBuilder.getPlayerName());
            }
            else {
                // Advance phase; push new phase to result
                resultParms.push(advancePhase(gameState));
                resultParms.push(gameState.getPlayerTurn());
            }
        }
        else {
            resultParms.push(constantStrings.invalidMove);
            resultParms.push(constantStrings.moveNotPossible);
        }
    }
    return resultParms;
}

// Take a player's build phase using actionParms. Return results
export function takeBuildAction(gameState: GameState, actionParms: String[]) {
    let resultParms: String[] = new Array();
    let board = gameState.getBoardState();
    let activeBuilder = gameState.getBuilder(gameState.getPlayerTurn());
    let actionString = actionParms[0];

    if (activeBuilder !== undefined) {
        // Check build is valid
        if (isValidBuild((board as Board), activeBuilder, actionString)) {
            resultParms.push(constantStrings.validBuild);
            // Build
            buildLayer((board as Board), actionString);
            // Advance phase; push new phase to result
            resultParms.push(advancePhase(gameState));
            // Switch turns; push new player's turn to result
            resultParms.push(switchTurns(gameState));
        }
        else {
            resultParms.push(constantStrings.invalidBuild);
            resultParms.push(constantStrings.buildNotPossible);
        }
    }
    return resultParms;
}

// Switch the active player
export function switchTurns(gameState: GameState) {
    let nextPlayer: "builderA" | "builderB" = gameState.getPlayerTurn() === "builderA" ? "builderB" : "builderA";
    gameState.setPlayerTurn(nextPlayer);
    return nextPlayer;
}

// Change the current phase to the next phase
export function advancePhase(gameState: GameState) {
    let newPhase: "movePhase" | "buildPhase" = gameState.getTurnState() === "movePhase" ? "buildPhase" : "movePhase";
    gameState.setTurnState(newPhase);
    return newPhase;
}

export function setupNewGame(playerNameA: String, playerNameB: String) {
    let board = createBoard(playerNameA, playerNameB);    
    let activePlayer: "builderA" | "builderB" = "builderA";
    let randomNum = Math.floor(Math.random() * 2);
    randomNum == 1 ? activePlayer = "builderA" : activePlayer = "builderB";
    let gameState = new GameState(activePlayer, "movePhase", undefined, undefined, board);
    return gameState;
}

export function loadGame(gameStateStrings: (string | String[])[]) {
    let gameState = convertJsonToGameState(gameStateStrings);
    if (gameState.getBoardState() !== undefined) {
        setupAdjacentTiles((gameState.getBoardState() as Board));
    }
    return gameState;
}

export function saveGame(gameState: GameState) {
    let savedGameState = convertGameStateToJson(gameState);
    return savedGameState;
}

export function createBoard(playerNameA: String, playerNameB: String) {
    let builderA = new Builder("C1");
    builderA.setPlayerName(playerNameA);
    let builderB = new Builder("C5");
    builderB.setPlayerName(playerNameB);
    let board = new Board();
    setupTiles(board);
    setupAdjacentTiles(board);
    // Set starting pos of builderA
    let tileC1 = board.getBoardMap().get("C1");
    if (tileC1 !== undefined) {
        tileC1.setBuilder(builderA);
    }
    // Set starting pos of builderB
    let tileC5 = board.getBoardMap().get("C5");
    if (tileC5 !== undefined) {
        tileC5.setBuilder(builderB);        
    }

    return board;
}

export function setupAdjacentTiles(board: Board) {
    // A Column (1st Column from the left) (Left most column)
    // Top left corner
    board.addAcjacentTiles("A1", ["A2", "B1", "B2"]);
    // Left most side
    board.addAcjacentTiles("A2", ["A1", "B1", "B2", "B3", "A3"]);
    board.addAcjacentTiles("A3", ["A2", "B2", "B3", "B4", "A4"]);
    board.addAcjacentTiles("A4", ["A3", "B3", "B4", "B5", "A5"]);
    // Bottom left corner
    board.addAcjacentTiles("A5", ["A4", "B4", "B5"]);
    // B Column (2nd Column from the left)
    board.addAcjacentTiles("B1", ["A1", "A2", "B2", "C2", "C1"]);
    board.addAcjacentTiles("B2", ["A1", "A2", "A3", "B3", "C3", "C2", "C1", "B1"]);
    board.addAcjacentTiles("B3", ["A2", "A3", "A4", "B4", "C4", "C3", "C2", "B2"]);
    board.addAcjacentTiles("B4", ["A3", "A4", "A5", "B5", "C5", "C4", "C3", "B3"]);
    board.addAcjacentTiles("B5", ["A5", "A4", "B4", "C4", "C5"]);
    // C Column (3rd Column from the left) (Middle column)
    board.addAcjacentTiles("C1", ["B1", "B2", "C2", "D2", "D1"]);
    board.addAcjacentTiles("C2", ["B1", "B2", "B3", "C3", "D3", "D2", "D1", "C1"]);
    board.addAcjacentTiles("C3", ["B2", "B3", "B4", "C4", "D4", "D3", "D2", "C2"]);
    board.addAcjacentTiles("C4", ["B3", "B4", "B5", "C5", "D5", "D4", "D3", "C3"]);
    board.addAcjacentTiles("C5", ["B5", "B4", "C4", "D4", "D5"]);
    // D Column (4th Column from the left)
    board.addAcjacentTiles("D1", ["C1", "C2", "D2", "E2", "E1"]);
    board.addAcjacentTiles("D2", ["C1", "C2", "C3", "D3", "E3", "E2", "E1", "D1"]);
    board.addAcjacentTiles("D3", ["C2", "C3", "C4", "D4", "E4", "E3", "E2", "D2"]);
    board.addAcjacentTiles("D4", ["C3", "C4", "C5", "D5", "E5", "E4", "E3", "D3"]);
    board.addAcjacentTiles("D5", ["C5", "C4", "D4", "E4", "E5"]);
    // E Column (5th Column from the left) (Right most column)
    // Top right corner
    board.addAcjacentTiles("E1", ["E2", "D1", "D2"]);
    // Right most side
    board.addAcjacentTiles("E2", ["E1", "D1", "D2", "D3", "E3"]);
    board.addAcjacentTiles("E3", ["E2", "D2", "D3", "D4", "E4"]);
    board.addAcjacentTiles("E4", ["E3", "D3", "D4", "D5", "E5"]);
    // Bottom right corner
    board.addAcjacentTiles("E5", ["E4", "D4", "D5"]);
}

export function setupTiles(board: Board) {
    board.addTile("A1", new Tile());
    board.addTile("A2", new Tile());
    board.addTile("A3", new Tile());
    board.addTile("A4", new Tile());
    board.addTile("A5", new Tile());
    board.addTile("B1", new Tile());
    board.addTile("B2", new Tile());
    board.addTile("B3", new Tile());
    board.addTile("B4", new Tile());
    board.addTile("B5", new Tile());
    board.addTile("C1", new Tile());
    board.addTile("C2", new Tile());
    board.addTile("C3", new Tile());
    board.addTile("C4", new Tile());
    board.addTile("C5", new Tile());
    board.addTile("D1", new Tile());
    board.addTile("D2", new Tile());
    board.addTile("D3", new Tile());
    board.addTile("D4", new Tile());
    board.addTile("D5", new Tile());
    board.addTile("E1", new Tile());
    board.addTile("E2", new Tile());
    board.addTile("E3", new Tile());
    board.addTile("E4", new Tile());
    board.addTile("E5", new Tile());
}

export function getAdjacentTiles(board: Board, tileFromName: String) {
    let adjacencyTiles = board.getAdjacencyMap().get(tileFromName);
    return adjacencyTiles;
}

// Ensure that a pending move is valid
export function isValidMove(board: Board, builder: Builder, tileFromName: String, tileToName: String) {
    // Check that the builder is on the correct tile
    if (builder.getCurrentTile() == tileFromName) {
        // Find tileTo in adjacencyMap
        let adjacencyTiles = getAdjacentTiles(board, tileFromName);
        if (adjacencyTiles !== undefined) {
            if (adjacencyTiles.includes(tileToName)) {
                // Check height
                let tileFrom = board.getBoardMap().get(tileFromName);
                let tileTo = board.getBoardMap().get(tileToName);
                return isValidTileMove((tileFrom as Tile), (tileTo as Tile));
            }
        }
    }
    return false;
}

// Move builder from one tile to another. True on success, False on failure
export function moveBuilder(board: Board, builder: Builder, tileFromName: String, tileToName: String) {
    // Get tiles from map
    let tileFrom = board.getBoardMap().get(tileFromName);
    let tileTo = board.getBoardMap().get(tileToName);
    if (tileTo !== undefined) {
        // Check that the tile is not blocked
        if (!tileTo.isTileBlocked()) {
            // Update builder location
            builder.setCurrentTile(tileToName);
            if (tileFrom !== undefined) {
                tileFrom.setBuilder(undefined);
            }
            tileTo.setBuilder(builder);
            return true;
        }
    }
    return false;
}

// Check that a build action is valid
export function isValidBuild(board: Board, builder: Builder, targetTileName: String) {
    let buildersTile = builder.getCurrentTile();
    let adjacentTiles = getAdjacentTiles(board, buildersTile);
    // Make sure the builder is adjacent to targetTile
    if (adjacentTiles !== undefined) {
        if (adjacentTiles.includes(targetTileName)) {
            // Check that the tile's tower height is not at max
            let targetTile = board.getBoardMap().get(targetTileName);
            if (targetTile) {
                if (targetTile.doesTileHaveTower()) {
                    return (!targetTile.isTileBlocked());
                }
                else {
                    return true;
                }
            }
        }
    }
    return false;
}

// Add a layer to the tile's tower
export function buildLayer(board: Board, tileName: String) {
    // Get tile from map
    let tile = board.getBoardMap().get(tileName);
    if (tile !== undefined) {
        // Check if the tile already has a tower
        if (tile.doesTileHaveTower()) {
            let tower = tile.getTower();
            if (tower !== undefined) {
                tower.addLayer();
            }
        }
        else {
            let tower = new Tower();
            tower.addLayer();
            tile.setTower(tower);
        }
    }
}

// Check if a player has won
export function isGameOver(board: Board, builder: Builder) {
    let currentTileName = builder.getCurrentTile();
    if (currentTileName !== undefined) {
        let currentTile = board.getBoardMap().get(currentTileName);
        if (currentTile !== undefined) {
            return hasPlayerWon(currentTile);
        }
    }
    return false;
}