interface  MonsterJson{
  id: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  healthPoints: number;
  speed: number;
  moves: string[];
}

export class Monster {
    constructor(
      private _id: number,
      private _name: string,
      private _description: string,
      private _attack: number,
      private _defense: number,
      private _healthPoints: number,
      private _speed: number,
      private _moves = new Array<string>()
    ) {}

    static fromJSON(json: MonsterJson): Monster{
        const rec = new Monster(json.id, json.name, json.description, json.attack, json.defense, json.healthPoints, json.speed, json.moves);
        return rec;
    }

    toJSON(): MonsterJson {
        return <MonsterJson>{
          name: this.name
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

    get moves(): string[]{
        return this._moves;
    }
   
    addIngredient(name: string, amount?: number, unit?: string) {
      this._moves.push(`${amount || 1} ${unit || ''} ${name}`);
    }
  }