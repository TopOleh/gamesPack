import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';

import { GamesBoardComponent, TicTacToeComponent, GameNotFoundComponent, TicTacCellComponent, SnakeComponent } from './components';

@NgModule({
  declarations: [GamesBoardComponent, TicTacToeComponent, GameNotFoundComponent, TicTacCellComponent, SnakeComponent],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
