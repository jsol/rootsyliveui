import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromoterComponent } from './edit-promoter.component';

describe('EditPromoterComponent', () => {
  let component: EditPromoterComponent;
  let fixture: ComponentFixture<EditPromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromoterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
