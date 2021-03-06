export class Tower {
    height: number = 0;

    constructor() {

    }
    
    getHeight() {
        return this.height;
    }

    setHeight(newHeight: number = 0) {
        this.height = newHeight;
    }
    
    isTowerEmpty () {
        if (this.height == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    isTowerFull() {
        if (this.height == 4) {
            return true;
        }
        else {
            return false;
        }
    }

    incrementHeight() {
        this.height++;
    }

    // Add a layer to the tower. True on success, False on failure
    addLayer() {
        if (!this.isTowerFull()) {
            this.incrementHeight();
            return true;
        }
        else {
            return false;
        }
    }

}

export function printTower(tower: Tower) {
    let resultTower = tower.getHeight();
    if (resultTower) {
        return resultTower.toString();
    }
    return "";    
}