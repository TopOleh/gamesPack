import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacCellComponent } from './tic-tac-cell.component';

describe('TicTacCellComponent', () => {
  let component: TicTacCellComponent;
  let fixture: ComponentFixture<TicTacCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
