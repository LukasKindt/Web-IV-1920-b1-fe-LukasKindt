import { Injectable } from '@angular/core';
import { MONSTERS } from './monster/mock-monsters';
import {Monster} from './monster/monster.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterDataService {
  private _monsters$ = new BehaviorSubject<Monster[]>([]);
  private _monsters: Monster[];

  constructor(private http: HttpClient) {
    this.monsters$.subscribe((monsters: Monster[])  => {
      this._monsters = monsters;
      this._monsters$.next(this._monsters);
    });
  }

  get allMonsters$(): Observable<Monster[]> {
    return this._monsters$;
  }
  
  get monsters$(): Observable<Monster[]> {
    return this.http.get(`${environment.apiUrl}/monster/`).pipe(
      catchError(this.handleError),
      map((list: any[]): Monster[] => list.map(Monster.fromJSON))
    );
  }

  addNewMonster(monster: Monster){
    return this.http
    .post(`${environment.apiUrl}/monster/`, monster.toJSON())
    .pipe(catchError(this.handleError), map(Monster.fromJSON))
    .subscribe((mon: Monster) => {
      this._monsters = [...this._monsters, mon];
    });
  }

 handleError(err: any): Observable<never> {
   let errorMessage: string;
   if (err instanceof HttpErrorResponse){
     errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
   } else {
     errorMessage = `An unknown error occurred ${err}`;
   }
   console.error(err);
   return throwError(errorMessage);
 }
}
