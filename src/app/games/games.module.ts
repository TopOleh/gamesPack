import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';

import { GamesBoardComponent, TicTacCellComponent } from './components';
import { StartGameBtnComponent } from './../shared/';
import { TetrisComponent } from './components/tetris/tetris.component';

@NgModule({
  declarations: [GamesBoardComponent, TicTacCellComponent, StartGameBtnComponent, GamesRoutingModule.components, TetrisComponent],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
