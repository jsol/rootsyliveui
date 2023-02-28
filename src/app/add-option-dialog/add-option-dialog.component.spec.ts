import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionDialogComponent } from './add-option-dialog.component';

describe('AddOptionDialogComponent', () => {
  let component: AddOptionDialogComponent;
  let fixture: ComponentFixture<AddOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
