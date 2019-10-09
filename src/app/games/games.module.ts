import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';

import { GamesBoardComponent, TicTacToeComponent, GameNotFoundComponent } from './components';

@NgModule({
  declarations: [GamesBoardComponent, TicTacToeComponent, GameNotFoundComponent],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
