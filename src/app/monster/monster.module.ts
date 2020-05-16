import {MaterialModule} from './../material/material.module';
import {MoveComponent} from './move/move.component';
import {MonsterComponent} from './monster/monster.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { AddMonsterComponent } from './add-monster/add-monster.component';
import { MonsterFilterPipe } from './monster-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MonsterDetailComponent } from './monster-detail/monster-detail.component';
import { MonsterResolver } from './MonsterResolver';
import { ReactiveFormsModule } from '@angular/forms';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  { path: 'list', component: MonsterListComponent },
  { path: 'add', component: AddMonsterComponent },
  {
    path: 'detail/:id',
    component: MonsterDetailComponent,
    resolve: { monster: MonsterResolver }
  },
  { path: 'battle', component: BattleComponent }
];
console.log(routes);
@NgModule({
  declarations: [
    MonsterComponent,
    MoveComponent,
    MonsterListComponent,
    AddMonsterComponent,
    MonsterFilterPipe,
    MonsterDetailComponent,
    BattleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MonsterListComponent, MonsterListComponent
  ]
})
export class MonsterModule { }