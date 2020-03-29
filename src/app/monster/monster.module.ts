import {MaterialModule} from './../material/material.module';
import {MoveComponent} from './move/move.component';
import {MonsterComponent} from './monster/monster.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonsterListComponent } from './monster/monster-list/monster-list.component';
import { AddMonsterComponent } from './monster/add-monster/add-monster.component';
import { MonsterFilterPipe } from './monster-filter.pipe';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MonsterComponent,
    MoveComponent,
    MonsterListComponent,
    AddMonsterComponent,
    MonsterFilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    MonsterListComponent
  ]
})
export class MonsterModule { }