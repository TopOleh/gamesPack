import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyFortyEightComponent } from './twenty-forty-eight.component';

describe('TwentyFortyEightComponent', () => {
  let component: TwentyFortyEightComponent;
  let fixture: ComponentFixture<TwentyFortyEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwentyFortyEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyFortyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
