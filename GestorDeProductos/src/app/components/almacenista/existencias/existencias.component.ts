import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { VerProductosComponent } from '../ver-productos/ver-productos.component';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css']
})
export class ExistenciasComponent implements OnChanges {
  @Input() currentProducto: Producto = this.initProducto(); // Recibe el producto desde el componente padre

  isExistenciasDialogOpen: boolean = false;
  cantidadSeleccionada: number = 0;
  productoExistencias: any = {
    _id: '',
    codigoBarras: '',
    nombreProducto: '',
    stockNuevo: 0,
    loteSeleccionado: null
  };

  productos: any[] = [];
  lotesDisponibles: any[] = [];

  constructor(
    private productoService: ProductoService,
    private verProducto: VerProductosComponent,
    private almacenistaService: AlmacenistasService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProducto'] && this.currentProducto) {
      console.log('Producto recibido:', this.currentProducto);
      console.log('Código de Barras del producto recibido:', this.currentProducto.codigoBarras);

      this.productoExistencias._id = this.currentProducto._id;
      this.productoExistencias.codigoBarras = this.currentProducto.codigoBarras;
      this.productoExistencias.nombreProducto = this.currentProducto.nombreProducto;

      this.cargarLotesDisponibles();
    }
  }

  private initProducto(): Producto {
    return {
      _id: '',
      codigoBarras: '',
      nombreProducto: '',
      tamano: '',
      marca: '',
      imagenUrl: [],
      categoria: '',
      precioPieza: 0,
      precioCaja: 0,
      cantidadPiezasPorCaja: 0,
      proveedor: [],
      stockExhibe: 0,
      existenciaExhibida: 0,
      stockAlmacen: 0,
      cantidadAlmacen: 0
    };
  }


  actualizarStock(): void {
    try {
      console.log('Lote seleccionado para validación antes de cualquier validación:', this.productoExistencias.loteSeleccionado);

      // Validaciones de stock
      if (this.productoExistencias.stockNuevo <= 0) {
        alert('La cantidad de stock nuevo debe ser mayor a 0');
        return;
      }

      if (!this.productoExistencias.loteSeleccionado) {
        alert('Debe seleccionar un lote');
        return;
      }

      // Encontrar el lote seleccionado por código de lote
      const loteSeleccionado = this.lotesDisponibles.find(lote => lote.codigoLote === this.productoExistencias.loteSeleccionado);
      console.log('Lote encontrado:', loteSeleccionado);

      if (!loteSeleccionado) {
        alert('El lote seleccionado no es válido.');
        return;
      }

      // Verificación de stock en el lote
      if (Number(loteSeleccionado.cantidadComprada) < Number(this.productoExistencias.stockNuevo)) {
        alert('La cantidad ingresada supera la cantidad disponible en el lote.');
        return;
      }

      // Actualización del lote con el nuevo stock
      const nuevaCantidadComprada = loteSeleccionado.cantidadComprada - this.productoExistencias.stockNuevo;
      const loteActualizado = {
        ...loteSeleccionado,
        cantidadComprada: nuevaCantidadComprada
      };

      // Llamada al servicio para actualizar el lote
      this.almacenistaService.updateLote(loteSeleccionado.id, loteActualizado).subscribe(
        (response) => {
          console.log('Lote actualizado:', response);
          alert('Stock actualizado correctamente');
          this.verProducto.isExistenciasDialogOpen = false;
          this.cargarLotesDisponibles();
        },
        (error) => {
          console.error('Error al actualizar el lote:', error);
          alert('Hubo un error al actualizar el lote.');
        }
      );

      // Actualización del stock del producto
      if (this.currentProducto.cantidadAlmacen <= 0) {
        alert('La cantidad de almacen no puede ser menor o igual a 0');
        return;
      }

      // Aquí, actualizamos el stock del producto basado en el código de barras
      this.productoExistencias._id = this.currentProducto.codigoBarras;
      console.log('ID del producto:', this.productoExistencias._id);
      console.log('Código de barras:', this.productoExistencias.codigoBarras);

      if (!this.productoExistencias._id) {
        alert('ID del producto es necesario');
        return; // Detén la ejecución si no hay ID
      }

      // Llamada al servicio para actualizar el stock del producto
      this.productoService.updateStock(this.productoExistencias._id, this.productoExistencias.stockNuevo).subscribe(
        (response) => {
          console.log('Stock del producto actualizado:', response);
        },
        (error) => {
          console.error('Error al actualizar stock del producto:', error);
        }
      );

    } catch (error) {
      console.error('Error en actualizarStock:', error);
      alert('Error inesperado al actualizar el stock.');
      this.verProducto.isExistenciasDialogOpen = false;
    }
  }


  onLoteChange(): void {
    console.log('Lote seleccionado (ngModelChange):', this.productoExistencias.loteSeleccionado);
  }

  cargarLotesDisponibles(): void {
    if (!this.currentProducto.codigoBarras) {
      console.warn('No hay código de barras disponible para buscar lotes.');
      return;
    }

    console.log('Buscando lotes para el código de barras:', this.currentProducto.codigoBarras);

    this.almacenistaService.getLotes().subscribe(
      (lotes: any[]) => {
        console.log('Lotes obtenidos desde el servicio:', lotes);

        // Filtrar lotes que coincidan con el código de barras del producto actual
        this.lotesDisponibles = lotes.filter(lote => lote.codigoBarras === this.currentProducto.codigoBarras);

        console.log('Lotes disponibles después del filtro:', this.lotesDisponibles);

        // Verificar si hay lotes disponibles
        if (this.lotesDisponibles.length === 0) {
          console.warn('No se encontraron lotes disponibles para el código de barras:', this.currentProducto.codigoBarras);
        }
      },
      (error) => {
        console.error('Error al obtener lotes:', error);
      }
    );
  }


  closeExistenciasDialog(): void {
    this.verProducto.isExistenciasDialogOpen = false;
  }

  /*
  Determina si esta caducado un lote.
  */
  estaCaducado(lote: any): boolean {
    return this.calcularDiasRestantes(lote.fechaCaducidad) <= 0;
  }

  /**
 * Calcula el número de días restantes hasta la fecha de caducidad.
 * Se normalizan ambas fechas a la medianoche para evitar desfases.
 */
  calcularDiasRestantes(fechaCaducidad: Date | string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliza la fecha actual a la medianoche

    // Ajusta la fecha de caducidad y la normaliza
    const fecha = this.ajustarFecha(fechaCaducidad);
    fecha.setHours(0, 0, 0, 0);

    const diffTime = fecha.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  }

  /**
* Función auxiliar que ajusta la fecha obtenida desde la base de datos (UTC)
* a la zona horaria local.
*/
  ajustarFecha(fechaCaducidad: Date | string): Date {
    const fecha = new Date(fechaCaducidad);
    // Suma el desfase de la zona horaria para obtener la fecha local
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    return fecha;
  }
  /**
   * Determina si un lote es prioritario a menos o igual de 5 dias de caducar
   */
  esPrioridad(lote: any): boolean {
    const diasRestantes = this.calcularDiasRestantes(lote.fechaCaducidad);
    return diasRestantes <= 5;
  }


}
