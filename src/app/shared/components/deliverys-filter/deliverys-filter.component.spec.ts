import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverysFilterComponent } from './deliverys-filter.component';

describe('DeliverysFilterComponent', () => {
  let component: DeliverysFilterComponent;
  let fixture: ComponentFixture<DeliverysFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverysFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverysFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
