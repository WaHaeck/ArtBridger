import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftFilterComponent } from './nft-filter.component';

describe('NftFilterComponent', () => {
  let component: NftFilterComponent;
  let fixture: ComponentFixture<NftFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
