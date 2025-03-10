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
    fechaRegistro: this.getLocalDateString()
  };

  // Variable para indicar error en el input de código de barras
  codigoBarrasError: boolean = false;

  constructor(private almacenistasService: AlmacenistasService, private verLotes: VerLotesComponent) {}

  /**
   * Devuelve la fecha actual local en formato YYYY-MM-DD.
   */
  getLocalDateString(): string {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  /**
   * Busca el producto basado en el código de barras ingresado.
   */
  buscarProductoPorCodigo(): void {
    if (this.lote.codigoBarras) {
      this.almacenistasService.buscarProductoPorCodigoBarras(this.lote.codigoBarras).subscribe(
        (producto) => {
          if (producto) {
            this.lote.producto = producto.nombreProducto;
          } else {
            this.lote.producto = '';
            window.alert('Producto no encontrado.');
          }
        },
        (error) => {
          console.error(error);
          window.alert('Error al buscar el producto.');
        }
      );
    }
  }

  /**
   * Envía el lote al backend para su registro.
   */
  registrarLote(): void {
    if (!this.lote.codigoLote || !this.lote.codigoBarras || !this.lote.producto || this.lote.cantidadComprada <= 0 || !this.lote.fechaCaducidad) {
      window.alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    
    // Actualiza la fechaRegistro para asegurarse de tener el día actual en formato correcto.
    this.lote.fechaRegistro = this.getLocalDateString();

    this.almacenistasService.createLote(this.lote).subscribe(
      (response) => {
        window.alert('Lote registrado exitosamente.');
        this.verLotes.ngOnInit();
        this.resetFormulario();
      },
      (error) => {
        console.error(error);
        if (error.status === 409) {  // Si ya existe
          window.alert('El lote con el código de lote ' + this.lote.codigoLote + ' ya existe.');
          this.codigoBarrasError = true;
        } else {
          window.alert('Error al registrar el lote.');
        }
      }
    );
  }

  /**
   * Reinicia el formulario después de registrar el lote.
   */
  resetFormulario(): void {
    this.lote = {
      codigoLote: '',
      codigoBarras: '',
      producto: '',
      cantidadComprada: 0,
      fechaCaducidad: '',
      fechaRegistro: this.getLocalDateString()
    };
    this.codigoBarrasError = false;
  }
}
