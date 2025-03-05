import { Component } from '@angular/core';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';
import { VerLotesComponent } from '../ver-lotes/ver-lotes.component';

@Component({
  selector: 'app-registrar-lote',
  templateUrl: './registrar-lote.component.html',
  styleUrls: ['./registrar-lote.component.css']
})
export class RegistrarLoteComponent {
  lote = {
    codigoLote: '',
    codigoBarras: '',
    producto: '',
    cantidadComprada: 0,
    fechaCaducidad: '',
    fechaRegistro: new Date()
  };

  constructor(private almacenistasService: AlmacenistasService,private verLotes : VerLotesComponent) {}

  /**
   * Busca el producto basado en el código de barras ingresado
   */
  buscarProductoPorCodigo(): void {
    if (this.lote.codigoBarras) {
      this.almacenistasService.buscarProductoPorCodigoBarras(this.lote.codigoBarras).subscribe(
        (producto) => {
          if (producto) {
            this.lote.producto = producto.nombreProducto;
          } else {
            this.lote.producto = '';
            alert('Producto no encontrado.');
          }
        },
        (error) => {
          console.error(error);
          alert('Error al buscar el producto.');
        }
      );
    }
  }


  

  /**
   * Envía el lote al backend para su registro
   */
  registrarLote(): void {
    if (!this.lote.codigoLote || !this.lote.codigoBarras || !this.lote.producto || this.lote.cantidadComprada <= 0 || !this.lote.fechaCaducidad) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.almacenistasService.createLote(this.lote).subscribe(
      () => {
        alert('Lote registrado exitosamente.');
        this.verLotes.ngOnInit();
        this.resetFormulario();
      },
      (error) => {
        alert('Error al registrar el lote.');
        console.error(error);
      }
    );
  }

  /**
   * Reinicia el formulario después de registrar el lote
   */
  resetFormulario(): void {
    this.lote = {
      codigoLote: '',
      codigoBarras: '',
      producto: '',
      cantidadComprada: 0,
      fechaCaducidad: '',
      fechaRegistro: new Date()
    };
  }
}
