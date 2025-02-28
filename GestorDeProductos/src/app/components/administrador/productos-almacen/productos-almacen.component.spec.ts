import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAlmacenComponent } from './productos-almacen.component';

describe('ProductosAlmacenComponent', () => {
  let component: ProductosAlmacenComponent;
  let fixture: ComponentFixture<ProductosAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosAlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
