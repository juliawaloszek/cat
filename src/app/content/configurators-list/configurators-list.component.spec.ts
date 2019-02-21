import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorsListComponent } from './configurators-list.component';

describe('ConfiguratorsListComponent', () => {
  let component: ConfiguratorsListComponent;
  let fixture: ComponentFixture<ConfiguratorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguratorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
