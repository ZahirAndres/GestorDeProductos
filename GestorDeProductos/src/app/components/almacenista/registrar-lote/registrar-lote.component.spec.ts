import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLoteComponent } from './registrar-lote.component';

describe('RegistrarLoteComponent', () => {
  let component: RegistrarLoteComponent;
  let fixture: ComponentFixture<RegistrarLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarLoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
