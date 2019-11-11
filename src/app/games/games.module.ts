import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';

import { GamesBoardComponent, TicTacCellComponent } from './components';
import { StartGameBtnComponent } from './../shared/';

@NgModule({
  declarations: [GamesBoardComponent, TicTacCellComponent, StartGameBtnComponent, GamesRoutingModule.components],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
