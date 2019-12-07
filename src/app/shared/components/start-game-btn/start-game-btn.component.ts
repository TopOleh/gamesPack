import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-game-btn',
  templateUrl: './start-game-btn.component.html',
  styleUrls: ['./start-game-btn.component.scss']
})
export class StartGameBtnComponent {
  @Output() startGame = new EventEmitter();

  onStartGame() {
    this.startGame.emit();
  }
}
