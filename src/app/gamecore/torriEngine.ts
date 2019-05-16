import { Builder } from './builder'
import { Board } from './board'
import { Tile } from './tile'

function moveBuilder(board: Board, builder: Builder, tileFromName: string, tileToName: string) {
    // Get tiles from map
    let tileFrom = board.getBoardMap().get(tileFromName);
    let tileTo = board.getBoardMap().get(tileToName);
    // Update builder location
    builder.setCurrentTile(tileToName);
    if (tileFrom) {
        tileFrom.builder = null;
    }
    if (tileTo) {
        tileTo.setBuilder(builder);
    }
    
}