import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonDialogComponent } from './delete-button-dialog.component';

describe('DeleteButtonDialogComponent', () => {
  let component: DeleteButtonDialogComponent;
  let fixture: ComponentFixture<DeleteButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteButtonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
