import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Monster } from '../monster.model';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.css']
})
export class AddMonsterComponent implements OnInit {
  @Output() public newMonster = new EventEmitter<Monster>();
  constructor() { }

  ngOnInit(): void {
  }

  addMonster(monsterId: HTMLInputElement, monsterName: HTMLInputElement, monsterDescription: HTMLInputElement, monsterAttack: HTMLInputElement, monsterDefense: HTMLInputElement, monsterHealth: HTMLInputElement, monsterSpeed: HTMLInputElement): boolean{
    const monster = new Monster(+monsterId.value, monsterName.value, monsterDescription.value, +monsterAttack.value, +monsterDefense.value, +monsterHealth.value, +monsterSpeed.value, []);
    this.newMonster.emit(monster);
    return false;
  }

}
