import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesAlmacenComponent } from './lotes-almacen.component';

describe('LotesAlmacenComponent', () => {
  let component: LotesAlmacenComponent;
  let fixture: ComponentFixture<LotesAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LotesAlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotesAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
