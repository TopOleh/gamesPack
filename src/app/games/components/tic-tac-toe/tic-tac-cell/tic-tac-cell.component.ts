import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tic-tac-cell',
  templateUrl: './tic-tac-cell.component.html',
  styleUrls: ['./tic-tac-cell.component.scss']
})
export class TicTacCellComponent {
  @Input() value: 'X' | 'O';
}
