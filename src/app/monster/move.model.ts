export interface MoveJson{
    name: string;
    powerPoints: number;
    basePower: number;
    accuracy: number;
    effect: string;
}
export class Move{
    private _currentPp;
    constructor(
        private _name: string,
        private _powerPoints: number,
        private _basePower: number,
        private _accuracy: number,
        private _effect: string
    ){
        this._currentPp = _powerPoints;
    }

    static fromJSON(json: MoveJson): Move {
        const mov = new Move(json.name, json.powerPoints, json.basePower, json.accuracy, json.effect);
        return mov;
    }


toJSON(): MoveJson{
    return { name: this.name, powerPoints: this.powerPoints, basePower: this.basePower, accuracy: this.accuracy, effect: this.effect }
}

get name(){
    return this._name;
}

get currentPp(){
    return this._currentPp;
}

get powerPoints(){
    return this._powerPoints;
}

get basePower(){
    return this._basePower;
}

get accuracy(){
    return this._accuracy;
}

get effect(){
    return this._effect;
}
}