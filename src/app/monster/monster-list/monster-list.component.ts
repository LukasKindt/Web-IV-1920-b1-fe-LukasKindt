import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MonsterDataService} from '../monster-data.service';
import {Subject, Observable, EMPTY} from 'rxjs';
import {distinctUntilChanged, debounceTime, map, filter, catchError} from 'rxjs/operators';
import { Monster } from '../monster.model';
import { ThrowStmt } from '@angular/compiler';
import { cpus } from 'os';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css']
})

export class MonsterListComponent implements OnInit {
  public filterMonsterName: string;
  public filterMonster$ = new Subject<string>();
  private _monsters: Monster[];
  private _fetchMonsters$: Observable<Monster[]>;
  public errorMessage: string = '';
  public selectedMonsters: Monster[] = [];

  constructor(private _monsterDataService: MonsterDataService) {
    this.filterMonster$
    .pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase())
    )
    .subscribe(val => (this.filterMonsterName = val));
  }

  applyFilter(filter: string){
    this.filterMonsterName = filter;
  }

  get monsters$(): Observable<Monster[]> {
    return this._fetchMonsters$;
  }

  ngOnInit(): void{
    this._fetchMonsters$ = this._monsterDataService.monsters$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }


  handleClickMonster = e => {
    const monster$: Observable<Monster> = this._monsterDataService.getMonster$(e.currentTarget.id);

    if (e.currentTarget.classList.contains("selectedMonster")){
        e.currentTarget.classList.remove("selectedMonster");
        monster$.subscribe( function (e, val){
        this.selectedMonsters.forEach(monster =>{
          if (monster.id = val.id){
             console.log("test");
            this.selectedMonsters.splice(this, 1);
          }
        })
      }.bind(this, e.currentTarget));

    } else {
      if (this.selectedMonsters.length < 2){
      e.currentTarget.classList.add("selectedMonster");
      monster$.subscribe( function (e, val){
      
        this.selectedMonsters.push(val);
      
    }.bind(this, e.currentTarget));
    }
    }
    console.log(this.selectedMonsters);
    this._monsterDataService.selectedMonsters = this.selectedMonsters
  }

  select(): void{
    var $els = document.getElementsByClassName("monster");
    Array.from($els).forEach($el => {
      $el.addEventListener("click", this.handleClickMonster);
    });
  }
}