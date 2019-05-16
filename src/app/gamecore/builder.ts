//import { Tile } from './tile'

class Builder {
    playerName: string = "name";
    playerNum: number = 0;
    currentTile: string;

    constructor(tileName: string) {
        this.currentTile = tileName;
    }
}

function printBuilder(builder: Builder) {
    return builder.playerNum.toString();
}

export { Builder, printBuilder };