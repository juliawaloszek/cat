import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpolateDialogComponent } from './interpolate-dialog.component';

describe('InterpolateDialogComponent', () => {
  let component: InterpolateDialogComponent;
  let fixture: ComponentFixture<InterpolateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpolateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpolateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
