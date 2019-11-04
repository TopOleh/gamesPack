import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';

import { GamesBoardComponent, TicTacCellComponent } from './components';

@NgModule({
  declarations: [GamesBoardComponent, TicTacCellComponent, GamesRoutingModule.components],
  imports: [
    CommonModule,
    FormsModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
