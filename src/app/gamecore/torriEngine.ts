import { Builder } from './builder'
import { Board } from './board'
import { Tile, hasPlayerWon } from './tile'

function createBoard(playerNameA: String, playerNameB: String) {
    let builderA = new Builder(playerNameA);
    let builderB = new Builder(playerNameB);
    let board = new Board();
    setupTiles(board);
    setupAdjacentTiles(board);
    // Set starting pos of builderA
    builderA.setCurrentTile("C1");
    let tileC1 = board.getBoardMap().get("C1");
    if (tileC1 !== undefined) {
        tileC1.setBuilder(builderA);        
    }
    // Set starting pos of builderB
    builderB.setCurrentTile("C5");
    let tileC5 = board.getBoardMap().get("C5");
    if (tileC5 !== undefined) {
        tileC5.setBuilder(builderA);        
    }

    return board;
}

function setupAdjacentTiles(board: Board) {
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

function setupTiles(board: Board) {
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

function getAdjacentTiles(board: Board, tileFromName: String) {
    let adjacencyTiles = board.getAdjacencyMap().get(tileFromName);
    return adjacencyTiles;
}

// Ensure that a pending move is valid
function isValidMove(board: Board, builder: Builder, tileFromName: String, tileToName: String) {
    // Check that the builder is on the correct tile
    if (builder.getCurrentTile() == tileFromName) {
        // Find tileTo in adjacencyMap
        let adjacencyTiles = board.getAdjacencyMap().get(tileFromName);
        if (adjacencyTiles !== undefined) {
            return adjacencyTiles.includes(tileToName);
        }
    }
    return false;
}

// Move builder from one tile to another. True on success, False on failure
function moveBuilder(board: Board, builder: Builder, tileFromName: String, tileToName: String) {
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

// Check if a player has won
function isGameOver(board: Board, builder: Builder) {
    let currentTileName = builder.getCurrentTile();
    if (currentTileName !== undefined) {
        let currentTile = board.getBoardMap().get(currentTileName);
        if (currentTile !== undefined) {
            return hasPlayerWon(currentTile);
        }
    }
    return false;
}