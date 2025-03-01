import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosClienteComponent } from './ver-productos-cliente.component';

describe('VerProductosClienteComponent', () => {
  let component: VerProductosClienteComponent;
  let fixture: ComponentFixture<VerProductosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerProductosClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
