import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabDetailsComponent } from './cab-details.component';

describe('CabDetailsComponent', () => {
  let component: CabDetailsComponent;
  let fixture: ComponentFixture<CabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
