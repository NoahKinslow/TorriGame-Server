import { Builder } from './builder'
import { Board } from './board'
import { Tile } from './tile'


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
        else {
            return false;
        }
    }
    return false;
}