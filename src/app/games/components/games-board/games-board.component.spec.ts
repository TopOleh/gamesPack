import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesBoardComponent } from './games-board.component';

describe('GamesBoardComponent', () => {
  let component: GamesBoardComponent;
  let fixture: ComponentFixture<GamesBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
