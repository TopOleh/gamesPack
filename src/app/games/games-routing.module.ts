import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesBoardComponent, TicTacToeComponent, GameNotFoundComponent, TwentyFourtyEightComponent } from './components';

const routes: Routes = [
  {
    path: 'board', component: GamesBoardComponent, children: [
      { path: 'tic-tac-toe', component: TicTacToeComponent },
      { path: '2048', component: TwentyFourtyEightComponent },
      { path: '**', component: GameNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GamesRoutingModule {
  static components = [GamesBoardComponent, TicTacToeComponent, GameNotFoundComponent, TwentyFourtyEightComponent];
}
