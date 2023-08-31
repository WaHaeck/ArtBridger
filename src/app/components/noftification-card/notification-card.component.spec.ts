import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoftificationCardComponent } from './noftification-card.component';

describe('NoftificationCardComponent', () => {
  let component: NoftificationCardComponent;
  let fixture: ComponentFixture<NoftificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoftificationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoftificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
