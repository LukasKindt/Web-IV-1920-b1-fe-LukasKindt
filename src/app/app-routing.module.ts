
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { MonsterListComponent } from './monster/monster-list/monster-list.component';
import { AddMonsterComponent } from './monster/add-monster/add-monster.component';
import { MonsterDetailComponent } from './monster/monster-detail/monster-detail.component';
import { MonsterResolver } from './monster/MonsterResolver';

const appRoutes: Routes = [
  {
    path: 'monster',
    loadChildren: () =>
      import('./monster/monster.module').then(mod => mod.MonsterModule),
    data: { preload: true }
  },
  { path: '', redirectTo: 'monster/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}