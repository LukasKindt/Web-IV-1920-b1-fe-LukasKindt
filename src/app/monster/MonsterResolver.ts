import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
  } from '@angular/router';
  import { Monster } from './monster.model';
  import { Injectable } from '@angular/core';
  import { MonsterDataService } from './monster-data.service';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class MonsterResolver implements Resolve<Monster> {
    constructor(private monsterService: MonsterDataService) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Monster> {
      return this.monsterService.getMonster$(route.params['id']);
    }
  }