import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardDetailsComponent } from './deshboard-details.component';

describe('DeshboardDetailsComponent', () => {
  let component: DeshboardDetailsComponent;
  let fixture: ComponentFixture<DeshboardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeshboardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeshboardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
