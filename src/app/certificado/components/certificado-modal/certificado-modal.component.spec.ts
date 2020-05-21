import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoModalComponent } from './certificado-modal.component';

describe('CertificadoModalComponent', () => {
  let component: CertificadoModalComponent;
  let fixture: ComponentFixture<CertificadoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
