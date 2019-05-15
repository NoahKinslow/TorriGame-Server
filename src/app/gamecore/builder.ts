

class Builder {
    playerName: string = "name";
    playerNum: number = 0;

}

function printBuilder(builder: Builder) {
    return builder.playerNum.toString();
}

export { Builder, printBuilder };