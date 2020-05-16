import { Injectable } from '@angular/core';
import { MONSTERS } from './mock-monsters';
import {Monster} from './monster.model';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterDataService {
  private _monsters$ = new BehaviorSubject<Monster[]>([]);
  private _monsters: Monster[];
  private _selectedMonsters: Monster[] = [];
  private _reloadMonsters$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.monsters$
    .pipe(catchError(err => {
      this._monsters$.error(err);
      return throwError(err);
    })).
    subscribe((monsters: Monster[])  => {
      this._monsters = monsters;
      this._monsters$.next(this._monsters);
    });
  }

  get selectedMonsters(){
    console.log(this._selectedMonsters);
    return this._selectedMonsters;
  }

  get allMonsters$(): Observable<Monster[]> {
    return this._monsters$;
  }
  
  get monsters$(): Observable<Monster[]> {
    return this.http.get(`${environment.apiUrl}/monster/`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Monster[] => list.map(Monster.fromJSON))
    );
  }

  getMonster$(id: number): Observable<Monster> {
    return  this.http.get(`${environment.apiUrl}/monster/${id}`)
    .pipe(tap(console.log), catchError(this.handleError), map(Monster.fromJSON));
  }

/*
  getMonsters$(name?: string, attack?: number, defense?: number, healthPoints?: number, speed?: number, move?: string){
    return this._reloadMonsters$.pipe(
      switchMap(() => this.fetchMonsters$(name, attack, defense, healthPoints, speed, move))
    );
  }

  fetchMonsters$(name?: string, attack?: number, defense?: number, healthPoints?: number, speed?: number, move?: string) {
    let params = new HttpParams();
    params = name ? params.append('name', name): params;
    params = attack ? params.append('attack', attack): params;
    params = defense ? params.append('defense', defense): params;
    params = healthPoints ? params.append('healthPoints', healthPoints): params;
    params = speed ? params.append('speed', speed): params;
    params = move ? params.append('move', move): params;
    return this.http.get(`${environment.apiUrl}/monster/`, { params }).pipe(
      catchError(this.handleError),
      map((list: any[]): Monster[] => list.map(Monster.fromJSON))
    );
  }
*/

  addNewMonster(monster: Monster){
    return this.http
    .post(`${environment.apiUrl}/monster/`, monster.toJSON())
    .pipe(catchError(this.handleError), map(Monster.fromJSON))
    .pipe(catchError(err => {
      this._monsters$.error(err);
      return throwError(err);
    }))
    .subscribe((mon: Monster) => {
      this._monsters = [...this._monsters, mon];
      this._monsters$.next(this._monsters);
    });
  }

  set selectedMonsters(monsters: Monster[]){
    this._selectedMonsters = monsters;
    console.log(this._selectedMonsters);
  }

  deleteMonster(monster: Monster){
    return this.http.delete(`${environment.apiUrl}/monster/${monster.id}`)
    .pipe(catchError(this.handleError))
    .subscribe(() => {
      this._monsters = this._monsters.filter(mon =>  mon.id  != monster.id);
      this._monsters$.next(this._monsters);
    })
  }

 handleError(err: any): Observable<never> {
   let errorMessage: string;
   if (err.error instanceof ErrorEvent) {
     errorMessage = `An error occurred: $(err.error.message)`;
   } else if (err instanceof HttpErrorResponse){
     errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
   } else {
     errorMessage = `An unknown error occurred ${err}`;
   }
   console.error(err);
   return throwError(errorMessage);
 }
}
