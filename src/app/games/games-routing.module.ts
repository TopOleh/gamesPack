import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesBoardComponent } from './components';

const routes: Routes = [
  { path: 'board', component: GamesBoardComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class GamesRoutingModule { }
