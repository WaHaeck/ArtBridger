import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftDetailViewComponent } from './nft-detail-view.component';

describe('NftDetailViewComponent', () => {
  let component: NftDetailViewComponent;
  let fixture: ComponentFixture<NftDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
