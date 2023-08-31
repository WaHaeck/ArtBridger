import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectOptionComponent } from './connect-option.component';

describe('ConnectOptionComponent', () => {
  let component: ConnectOptionComponent;
  let fixture: ComponentFixture<ConnectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
