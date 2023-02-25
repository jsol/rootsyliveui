import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgigComponent } from './editgig.component';

describe('EditgigComponent', () => {
  let component: EditgigComponent;
  let fixture: ComponentFixture<EditgigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditgigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditgigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
