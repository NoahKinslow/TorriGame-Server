//import { Tile } from './tile'

class Builder {
    playerName: string = "name";
    playerNum: number = 0;
    currentTile: string;

    constructor(tileName: string) {
        this.currentTile = tileName;
    }

    getPlayerName() {
        return this.playerName;
    }

    setPlayerName(newName: string) {
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

    setCurrentTile(newTile: string) {
        this.currentTile = newTile;
    }
}

function printBuilder(builder: Builder) {
    return builder.playerNum.toString();
}

export { Builder, printBuilder };