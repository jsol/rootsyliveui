import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromoterDialogComponent } from './edit-promoter-dialog.component';

describe('EditPromoterDialogComponent', () => {
  let component: EditPromoterDialogComponent;
  let fixture: ComponentFixture<EditPromoterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromoterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPromoterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
