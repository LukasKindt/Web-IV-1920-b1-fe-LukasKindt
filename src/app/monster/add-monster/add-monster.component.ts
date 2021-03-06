import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Monster } from '../monster.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MonsterDataService } from '../monster-data.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Move } from '../move.model';

function validateMoveName(control: FormGroup): { [key: string]: any } {
  if (
    control.get('name').value.length < 2
  ) {
    return { amountNoName: true };
  }
  return null;
}

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.css']
})
export class AddMonsterComponent implements OnInit {
  //@Output() public newMonster = new EventEmitter<Monster>();
  public monster: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _monsterDataService: MonsterDataService
  ) { }

  get moves(): FormArray {
    return <FormArray>this.monster.get('moves');
  }

  ngOnInit(): void {
    this.monster = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]],
      attack: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      defense: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      hp: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      speed: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      moves: this.fb.array([this.createMoves()])    
    });

    this.moves.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(movList => {
      console.log(this.monster);
      const lastElement = movList[movList.length - 1];
      if (lastElement.name && lastElement.name.length >= 2 && movList.length < 4){
      this.moves.push(this.createMoves());
    } else if (movList.length >= 2) {
      const secondToLast = movList[movList.length - 2];
      if (
        !lastElement.name &&
        !lastElement.powerPoints &&
        !lastElement.basePower &&
        !lastElement.accuracy &&
        !lastElement.effect &&
        (!secondToLast.name || secondToLast.name.length < 2 )
        ) {
          this.moves.removeAt(this.moves.length - 1);
        }
    }
    });
  }

  createMoves(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      powerPoints: ['', [Validators.required, Validators.min(5), Validators.max(40)]],
      basePower: ['', [Validators.required, Validators.min(10), Validators.max(200)]],
      accuracy: ['', [Validators.required, Validators.min(30), Validators.max(100)]],
      effect: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]]
    },{
     validator: validateMoveName
    });
  }

  onSubmit(){
    let moves = this.monster.value.moves.map(Move.fromJSON);
    moves = moves.filter(mov => mov.name.length >= 2);
    this._monsterDataService.addNewMonster(
      new Monster(this.monster.value.name, this.monster.value.description, this.monster.value.attack, this.monster.value.defense, this.monster.value.hp, this.monster.value.speed, moves)
    );
    this.monster = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]],
      attack: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      defense: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      hp: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      speed: ['', [Validators.required, Validators.min(50), Validators.max(250)]],
      moves: this.fb.array([this.createMoves()])  
    });
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} characters (got ${errors.minlength.actualLength})`;
    } else if (errors.maxlength){
      return `can only have ${errors.maxlength.requiredLength} characters (got ${errors.maxlength.actualLength})`;
    } else if (errors.min) {
      return `the minimum value is ${errors.min.min}`;
    } else if (errors.max) {
      return `the maximum value is ${errors.max.max}`;
    } else if (errors.amountNoName) {
      return `if amount is set you must set a name`;
    }
  }

}
