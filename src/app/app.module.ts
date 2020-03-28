import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonsterComponent } from './monster/monster.component';
import { MoveComponent } from './move/move.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterComponent,
    MoveComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
