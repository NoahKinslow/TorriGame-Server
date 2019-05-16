import { Builder } from './builder'
import { Tower } from './tower'

class Tile {
    
    builder: Builder | undefined = undefined;
    tower: Tower | undefined = undefined;

    constructor() {
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
        if (this.tower !== undefined) {
            if (this.tower.isTowerFull()) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
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

export { Tile, printTile, hasPlayerWon };