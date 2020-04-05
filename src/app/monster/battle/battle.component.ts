import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster.model';
import { MonsterDataService } from '../monster-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  private _monster1$: Observable<Monster>;
  private _monster2$: Observable<Monster>;
  public monster1: Monster;
  public monster2: Monster;
  constructor(private _monsterDataService: MonsterDataService) { 

  }

  get monster1$(){
    return this._monster1$
  }

  get monster2$(){
    return this._monster2$
  }

  ngOnInit(): void {
    this._monster1$ = this._monsterDataService.getMonster$("6");
    this._monster1$.subscribe(val => this.monster1 = val);

    this._monster2$ = this._monsterDataService.getMonster$("9");
    this._monster2$.subscribe(val => this.monster2 = val);
  }

}
