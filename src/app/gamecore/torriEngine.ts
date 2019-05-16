import { Builder } from './builder'
import { Board } from './board'
import { Tile, hasPlayerWon } from './tile'



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