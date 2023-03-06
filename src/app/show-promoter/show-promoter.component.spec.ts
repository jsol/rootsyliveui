import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPromoterComponent } from './show-promoter.component';

describe('ShowPromoterComponent', () => {
  let component: ShowPromoterComponent;
  let fixture: ComponentFixture<ShowPromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPromoterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
