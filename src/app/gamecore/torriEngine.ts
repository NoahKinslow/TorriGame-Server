import { Builder } from './builder'
import { Board } from './board'
import { Tile, hasPlayerWon } from './tile'

// Move builder from one tile to another. True on success, False on failure
function moveBuilder(board: Board, builder: Builder, tileFromName: string, tileToName: string) {
    // Get tiles from map
    let tileFrom = board.getBoardMap().get(tileFromName);
    let tileTo = board.getBoardMap().get(tileToName);
    if (tileTo) {
        // Check that the tile is not blocked
        if (!tileTo.isTileBlocked()) {
            // Update builder location
            builder.setCurrentTile(tileToName);
            if (tileFrom) {
                tileFrom.setBuilder(null);
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
    if (currentTileName) {
        let currentTile = board.getBoardMap().get(currentTileName);
        if (currentTile) {
            return hasPlayerWon(currentTile);
        }
    }
    return false;
}