import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGigComponent } from './show-gig.component';

describe('ShowGigComponent', () => {
  let component: ShowGigComponent;
  let fixture: ComponentFixture<ShowGigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
