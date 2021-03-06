import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../monster.model';
import { MonsterDataService } from '../monster-data.service';
import { Observable, concat } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { promise } from 'protractor';
import { Move } from '../move.model';

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

  public activeMonster: Monster;
  public commentary: string;
  constructor(private _monsterDataService: MonsterDataService) { 

  }

  get monster1$(){
    return this._monster1$
  }

  get monster2$(){
    return this._monster2$
  }

  ngOnInit(): void {
    console.log(this._monsterDataService.selectedMonsters);
    const selectedMonsters = this._monsterDataService.selectedMonsters;

    if(selectedMonsters.length != 2){
      this.commentary = "Please go to Monsters and select 2 monsters"
    const monster1Id: number = 6;
    const monster2Id: number = 9;
    this._monster1$ = this._monsterDataService.getMonster$(monster1Id);
    this._monster2$ = this._monsterDataService.getMonster$(monster2Id);
    const result$ = concat(this._monster1$, this._monster2$);
    const $battle = document.getElementById("battle");
    $battle.innerHTML = "";
    result$.subscribe(mon => {
      if (mon.id == monster1Id){this.monster1 = mon}
      if (mon.id == monster2Id){this.monster2 = mon}
      
    });
  } else {
    this.monster1 = selectedMonsters[0];
    this.monster2 = selectedMonsters[1];
  }
  this.startBattle();
  }

  startBattle(): void {
    this.monster1.currentHp = this.monster1.healthPoints;
    this.monster2.currentHp = this.monster2.healthPoints;
    this.monster1.moves.forEach(move => {move.currentPp = move.powerPoints});
    this.monster2.moves.forEach(move => {move.currentPp = move.powerPoints});


    console.log(this.monster1);
    if (this.monster1.speed > this.monster2.speed){
      this.activeMonster = this.monster1;
    } else {
      this.activeMonster = this.monster2;
    }

    this.commentary = this.activeMonster.name + " can start first!";

    console.log(this.activeMonster);
      this.turn();
      
  }

  turn(){
    this.activateMoves();
  }

  activateMoves(){
    if (this.activeMonster.id == this.monster1.id){
      var $movesSection = document.getElementById("battleMoves1");
    } else {
      var $movesSection = document.getElementById("battleMoves2");
    }
    
      this.activeMonster.moves.forEach(move => {
        var $moveArticle = document.createElement("article");
        var $moveNameP = document.createElement("p");
        var $movePpP = document.createElement("p");
        $moveNameP.innerHTML = move.name;
        $movePpP.innerHTML = move.currentPp + "/" + move.powerPoints;
        $moveArticle.appendChild($moveNameP);
        $moveArticle.appendChild($movePpP);
        $movesSection.appendChild($moveArticle);
        $moveArticle.classList.add("battleMove");
        $moveArticle.addEventListener("click", () => {this.handleClickMoveArticle(move)});
      })
  };

  handleClickMoveArticle(move){
    var opponent;
    if (this.activeMonster.id == this.monster1.id){
      opponent = this.monster2;
    } else {
      opponent = this.monster1;
    }

    const chance = Math.round(Math.random() * 100);
    if (move.currentPp <= 0){
      this.commentary = "You don't have enough power points"
      this.handleClickMoveArticle(move);
    } else if (chance > move.accuracy){
      this.commentary = "Ohh... The attack missed!"
    } else {
      move.currentPp = move.currentPp - 1;
      const attackBonus = Math.random()/2+0.5;
      console.log(attackBonus);
      const damage = Math.round((this.activeMonster.attack*(1/(100+opponent.defense))*move.basePower)*attackBonus);
      console.log(damage);

      switch(true){
        case attackBonus >= 0.9: 
          this.commentary = "It was a Critical Hit! " + move.effect + " It caused a whopping " + damage + " damage!";
          break;
        case attackBonus <= 0.6: 
          this.commentary = "That was rather sloppy... " + move.effect + " It caused merely " + damage + " damage";
          break;
        default:
          this.commentary = this.activeMonster.name + " used " + move.name + ". " + move.effect + " It caused " + damage + " damage!";
          break;
      }


      opponent.currentHp = opponent.currentHp - damage;
      if (opponent.currentHp < 0){opponent.currentHp = 0}
    }
    this.endTurn();
  };

  endTurn(){
    if (this.activeMonster.id == this.monster1.id){
      var $movesSection = document.getElementById("battleMoves1");
    } else {
      var $movesSection = document.getElementById("battleMoves2");
    }

    $movesSection.innerHTML = "";

    if (this.monster1.currentHp <= 0 || this.monster2.currentHp <= 0){

      this.commentary = this.activeMonster.name + " won!"
 
    }else{
      if (this.activeMonster.id == this.monster1.id){
        this.activeMonster = this.monster2;
      } else {
        this.activeMonster = this.monster1;
      }
      this.turn();
    }
  };
}
