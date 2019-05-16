import { Builder } from './builder'
import { Tower } from './tower'

class Tile {
    
    builder: Builder | null = null;
    tower: Tower | null = null;

    constructor() {
    }

    getBuilder() {
        if (this.builder) {
            return this.builder;
        }
    }

    setBuilder(newBuilder: Builder | null) {
        this.builder = newBuilder;
    }

    getTower() {
        if (this.tower) {
            return this.tower;
        }
    }

    setTower(newTower: Tower | null) {
        this.tower = newTower;
    }

    doesTileHaveBuilder () {
        if (this.builder) {
            return true;
        }
        else {
            return false;
        }
    }

    doesTileHaveTower () {
        if (this.tower) {
            return true;
        }
        else {
            return false;
        }
    }

    isTileBlocked() {
        if (this.tower) {
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
    let resultTile: string = "";
    if (tile.tower) {
        resultTile = `| TH: ${tile.tower.getHeight()}`;
    }
    else {
        resultTile = `| TH: 0`;
    }
    if (tile.builder) {
        resultTile += ` | BN: ${tile.builder.playerNum.toString()}`;
    }
    else {
        resultTile += ` | BN: 0`;
    }

    return resultTile;
}

export { Tile, printTile };