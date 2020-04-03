import { Move, MoveJson } from './move.model';

interface  MonsterJson{
  id: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  healthPoints: number;
  speed: number;
  moves: MoveJson[];
}

export class Monster {
    private _id: number;
    constructor(
      private _name: string,
      private _description: string,
      private _attack: number,
      private _defense: number,
      private _healthPoints: number,
      private _speed: number,
      private _moves = new Array<Move>()
    ) {}

    static fromJSON(json: MonsterJson): Monster{
        const mon = new Monster(json.name, json.description, json.attack, json.defense, json.healthPoints, json.speed, json.moves.map(Move.fromJSON));
        return mon;
    }

    toJSON(): MonsterJson {
        return <MonsterJson>{
          name: this.name,
          description: this.description,
          attack: this.attack,
          defense: this.defense,
          healthPoints: this.healthPoints,
          speed: this.speed,
          moves: this.moves.map(mov => mov.toJSON())
        };
      }
  
    get id(): number {
      return this._id;
    }
    
    get name(): string {
      return this._name;
    }

    get description(): string {
        return this._description;
    }

    get attack(): number{
        return this._attack;
    }

    get defense(): number{
        return this._defense;
    }

    get healthPoints(): number{
        return this._healthPoints;
    }

    get speed(): number{
        return this._speed;
    }

    get moves(): Move[]{
        return this._moves;
    }
   
    addMove(name: string, powerPoints: number, basePower: number, accuracy: number, effect: string) {
      this._moves.push(new Move(name, powerPoints, basePower, accuracy, effect));
    }
  }