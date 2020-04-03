import { Component, OnInit, Input } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { Monster } from '../monster.model';
import {  MonsterDataService } from '../monster-data.service'

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {
  @Input() public monster: Monster;

  constructor(private _monsterDataService: MonsterDataService) {}

  ngOnInit(): void {
  }

  deleteMonster(){
    this._monsterDataService.deleteMonster(this.monster);
  }

}
