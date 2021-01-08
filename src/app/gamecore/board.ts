import { Tile, printTile, encodeTile, decodeTile, Builder } from './internal';

export class Board {
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

    getTile(name: String) {
        return this.boardMap.get(name);
    }

    getAdjacencyMap() {
        return this.adjacencyMap;
    }

    setAdjacencyMap(newAdjacencyMap: Map<String, String[]> = new Map<String, String[]>()) {
        this.adjacencyMap = newAdjacencyMap;
    }

    addAdjacentTile(tileA: String, tileB: String) {
        let adjacencyTiles: String[] | undefined = new Array();
        if (this.adjacencyMap.get(tileA) !== undefined) {
            adjacencyTiles = this.adjacencyMap.get(tileA);
        }
        if (adjacencyTiles !== undefined) {
            adjacencyTiles.push(tileB);
            this.adjacencyMap.set(tileA, adjacencyTiles);
        }
    }

    addAdjacentTiles(tileA: String, tiles: String[]) {
        tiles.forEach((value) => {
            this.addAdjacentTile(tileA, value);
        });
    }

}

// Print the board in a readable format
export function printBoard(board: Board) {
    let resultBoard: String[] = new Array();
    board.boardMap.forEach((value, key) => {
        let resultTile = `| TN: ${key} ${printTile(value)}`
        resultBoard.push(resultTile);
    });
    return resultBoard;
}

// Loop through tiles to find builders
export function findBuilders(board: Board) {
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

export function convertBoardToJson(board: Board) {
    let boardMap = board.getBoardMap();
    let boardMapStrings: String[] = new Array();
    boardMap.forEach((tile, tileName) => {
        let jsonTile = JSON.stringify(tile);
        boardMapStrings.push(`${tileName}:${jsonTile}`);
    });
    return boardMapStrings;
}

export function convertJsonToBoard(strings: String[]) {
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

// Encode board as a series of tile heights in a comma separated string
export function encodeBoard(boardToEncode: Board) {
    let boardMap = boardToEncode.getBoardMap();
    let boardMapStrings: String[] = new Array();

    boardMap.forEach((tile, tileName) => {
        let encodedTile = encodeTile(tile);
        boardMapStrings.push(encodedTile);
    });

    let boardMapString = boardMapStrings.join();
    
    return boardMapString;
}

// Decode board from a series of tile heights
export function decodeBoard(boardToDecode: string) {
    let boardMap = new Map<String, Tile>();

    // Values to loop through for tile names
    let tileNameLetters: string[] = [ "A", "B", "C", "D", "E" ];
    let tileNameNumbers: string[] = [ "1", "2", "3", "4", "5" ];
    let tileNameL: number = 0;
    let tileNameN: number = 0;

    let boardToDecodeArray = boardToDecode.split(",");

    // Decode each tile in String array representing the board's game state
    for (let index = 0; index < boardToDecodeArray.length; index++) {
        let tileName = tileNameLetters[tileNameL] + tileNameNumbers[tileNameN];
        let tile = decodeTile(boardToDecode[index]);        
        boardMap.set(tileName, (tile as Tile));
        tileNameL++;
        if (index % 5 == 0) {
            tileNameL = 0;
            tileNameN++;
        }
    }

    let board = new Board();
    board.setBoardMap(boardMap);
    return board;
}