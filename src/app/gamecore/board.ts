import { Tile, printTile } from './tile'
import { Tower } from './tower'
import { Builder } from './builder'

class Board {
    boardMap: Map<String, Tile> = new Map<String, Tile>();

    getBoardMap() {
        return this.boardMap;
    }

    setBoardMap(newBoardMap: Map<String, Tile> = new Map<String, Tile>()) {
        this.boardMap = newBoardMap;
    }

    addTile(name: string, tile: Tile) {
        this.boardMap.set(name, tile);
    }

}

function printBoard(board: Board) {
    let resultBoard: string[] = new Array();
    board.boardMap.forEach((value, key) => {
        let resultTile = `| TN: ${key} ${printTile(value)}`
        resultBoard.push(resultTile);
    });
    return resultBoard;
}

export { Board, printBoard };