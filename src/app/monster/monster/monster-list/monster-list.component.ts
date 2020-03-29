import {Component, OnInit} from '@angular/core';
import {MonsterDataService} from '../../monster-data.service';
import {Subject, Observable, EMPTY} from 'rxjs';
import {distinctUntilChanged, debounceTime, map, filter, catchError} from 'rxjs/operators';
import { Monster } from '../monster.model';

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

  constructor(private _monsterDataService: MonsterDataService) {}

  applyFilter(filter: string){
    this.filterMonsterName = filter;
  }

  get monsters$(): Observable<Monster[]> {
    return this._fetchMonsters$;
  }

  addNewMonster(monster){
    this._monsterDataService.addNewMonster(monster);
  }

  ngOnInit(): void{
    this._fetchMonsters$ = this._monsterDataService.monsters$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }
}