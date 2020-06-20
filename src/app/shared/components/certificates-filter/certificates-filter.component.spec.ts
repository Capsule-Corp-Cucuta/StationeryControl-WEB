import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesFilterComponent } from './certificates-filter.component';

describe('CertificatesFilterComponent', () => {
  let component: CertificatesFilterComponent;
  let fixture: ComponentFixture<CertificatesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
