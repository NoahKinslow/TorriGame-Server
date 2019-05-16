import { Tile, printTile } from './tile'
import { Tower } from './tower'
import { Builder } from './builder'

class Board {
    boardMap: Map<String, Tile> = new Map<String, Tile>();

    adjacencyMap: Map<String, String[]> = new Map<String, String[]>();

    getBoardMap() {
        return this.boardMap;
    }

    setBoardMap(newBoardMap: Map<String, Tile> = new Map<String, Tile>()) {
        this.boardMap = newBoardMap;
    }

    addTile(name: String, tile: Tile) {
        this.boardMap.set(name, tile);
    }

    getAdjacencyMap() {
        return this.adjacencyMap;
    }

    setAdjacencyMap(newAdjacencyMap: Map<String, String[]> = new Map<String, String[]>()) {
        this.adjacencyMap = newAdjacencyMap;
    }

    addAdjacenctTile(tileA: String, tileB: String) {
        let adjacencyTiles: String[] | undefined = new Array();
        if (this.adjacencyMap.get(tileA) !== undefined) {
            adjacencyTiles = this.adjacencyMap.get(tileA);
        }
        if (adjacencyTiles !== undefined) {
            adjacencyTiles.push(tileB);
            this.adjacencyMap.set(tileA, adjacencyTiles);
        }
    }

    addAcjacentTiles(tileA: String, tiles: String[]) {
        tiles.forEach((value) => {
            this.addAdjacenctTile(tileA, value);
        });
    }

}

function printBoard(board: Board) {
    let resultBoard: String[] = new Array();
    board.boardMap.forEach((value, key) => {
        let resultTile = `| TN: ${key} ${printTile(value)}`
        resultBoard.push(resultTile);
    });
    return resultBoard;
}

function findBuilders(board: Board) {
    let builderA: Builder | undefined = undefined;
    let builderB: Builder | undefined = undefined;
    board.getBoardMap().forEach((tile) => {
        if (builderA === undefined) {
            if (tile.doesTileHaveBuilder()) {
                builderA = tile.getBuilder();
            }
        }
        else if (builderB === undefined) {
            if (tile.doesTileHaveBuilder()) {
                builderB = tile.getBuilder();
            }
        }
        else {
            
        }
    })
    return [ builderA, builderB ];
}

function convertBoardToJson(board: Board) {
    let boardMap = board.getBoardMap();
    let boardMapStrings: String[] = new Array();
    boardMap.forEach((tile, tileName) => {
        let jsonTile = JSON.stringify(tile);
        boardMapStrings.push(`${tileName}:${jsonTile}`);
    });
    return boardMapStrings;
}

function convertJsonToBoard(strings: String[]) {
    let boardMap = new Map<String, Tile>();
    strings.forEach((value) => {
        let tileName = value.substring(0, 2);
        let tileString = value.substring(3);
        let tile = JSON.parse(tileString);
        boardMap.set(tileName, (tile as Tile));
    });
    let board = new Board();
    board.setBoardMap(boardMap);
    return board;
}

export { Board, printBoard, findBuilders, convertBoardToJson, convertJsonToBoard };