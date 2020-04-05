import { Injectable } from '@angular/core';
import { MONSTERS } from './mock-monsters';
import {Monster} from './monster.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterDataService {
  private _monsters$ = new BehaviorSubject<Monster[]>([]);
  private _monsters: Monster[];

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

  getMonster$(id: string): Observable<Monster> {
    return  this.http.get(`${environment.apiUrl}/monster/${id}`)
    .pipe(tap(console.log), catchError(this.handleError), map(Monster.fromJSON));
  }

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
