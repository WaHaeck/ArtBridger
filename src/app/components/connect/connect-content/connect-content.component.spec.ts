import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectContentComponent } from './connect-content.component';

describe('ConnectContentComponent', () => {
  let component: ConnectContentComponent;
  let fixture: ComponentFixture<ConnectContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
