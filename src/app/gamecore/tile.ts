import { Builder } from './builder'
import { Tower } from './Tower'

class Tile {
    
    builder: Builder | undefined = undefined;
    tower: Tower | undefined = undefined;

    constructor() {
        this.tower = new Tower();
    }

    getBuilder() {
        if (this.builder !== undefined) {
            return this.builder;
        }
    }

    setBuilder(newBuilder: Builder | undefined) {
        this.builder = newBuilder;
    }

    getTower() {
        if (this.tower !== undefined) {
            return this.tower;
        }
    }

    setTower(newTower: Tower | undefined) {
        this.tower = newTower;
    }

    doesTileHaveBuilder () {
        if (this.builder !== undefined) {
            return true;
        }
        else {
            return false;
        }
    }

    doesTileHaveTower () {
        if (this.tower !== undefined) {
            return true;
        }
        else {
            return false;
        }
    }

    isTileBlocked() {
        if (this.doesTileHaveBuilder()) {
            return true;
        }
        if (this.tower !== undefined) {
            if (this.tower.isTowerFull()) {
                return true;
            }
        }
        return false;
    }
}

function printTile(tile: Tile) {
    let resultTile: String = "";
    if (tile.tower !== undefined) {
        resultTile = `| TH: ${tile.tower.getHeight()}`;
    }
    else {
        resultTile = `| TH: 0`;
    }
    if (tile.builder !== undefined) {
        resultTile += ` | BN: ${tile.builder.playerNum.toString()}`;
    }
    else {
        resultTile += ` | BN: 0`;
    }

    return resultTile;
}

// If the player's builder is on a tower of height 3 they won
function hasPlayerWon(tile: Tile) {
    if (tile.builder !== undefined) {
        if (tile.tower !== undefined) {
            if (tile.tower.getHeight() == 3) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}

// Checks that a tile is not blocked and that the move is possible
function isValidTileMove(tileFrom: Tile, tileTo: Tile) {
    // Check that the tileTo is not blocked
    if (tileTo.isTileBlocked()) {
        return false;
    }
    // Check that the height difference is valid
    if (tileTo.getTower() !== undefined && tileFrom.getTower() !== undefined) {
        return (((tileTo.getTower() as Tower).getHeight() - (tileFrom.getTower() as Tower).getHeight()) <= 1);
    }
    return false;
}

// Encodes a tile into a string format of (TileHeight|IsBuilderPresent?)
function encodeTile(tileToEncode: Tile) {
    let encodedTile: String = "";
    if (tileToEncode.tower !== undefined) {
        encodedTile += tileToEncode.tower.getHeight().toString();
    }
    /*
    if (tileToEncode.doesTileHaveBuilder()) {
        encodedTile += "Y";
    }
    else {
        encodedTile += "N";
    }
    */
    return encodedTile;
}

// Decodes a tile from a string in the format of (TileHeight|IsBuilderPresent?)
function decodeTile(tileToDecode: String) {
    let decodedTile: Tile = new Tile();
    let tower: Tower = new Tower();
    tower.setHeight(parseInt(tileToDecode.substr(0, 1)));
    decodedTile.setTower(tower);
    return decodedTile;
}

export { Tile, printTile, hasPlayerWon, isValidTileMove };