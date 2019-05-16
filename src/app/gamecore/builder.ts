//import { Tile } from './tile'

class Builder {
    playerName: String = "name";
    playerNum: number = 0;
    currentTile: String;

    constructor(tileName: String) {
        this.currentTile = tileName;
    }

    getPlayerName() {
        return this.playerName;
    }

    setPlayerName(newName: String) {
        this.playerName = newName;
    }

    getPlayerNum() {
        return this.playerNum;
    }

    setPlayerNum(newPNum: number) {
        this.playerNum = newPNum;
    }

    getCurrentTile() {
        return this.currentTile;
    }

    setCurrentTile(newTile: String) {
        this.currentTile = newTile;
    }
}

function printBuilder(builder: Builder) {
    return builder.playerNum.toString();
}

export { Builder, printBuilder };