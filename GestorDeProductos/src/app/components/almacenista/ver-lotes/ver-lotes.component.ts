import { Component, OnInit } from '@angular/core';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';

@Component({
  selector: 'app-ver-lotes',
  templateUrl: './ver-lotes.component.html',
  styleUrls: ['./ver-lotes.component.css']
})
export class VerLotesComponent implements OnInit {
  lotes: any[] = [];
  filtroNombre: string = '';
  filtroCodigo: string = '';
  ordenamiento: string = 'asc';
  loteSeleccionado: any = null; // Almacena el lote seleccionado para la vista detalle

  constructor(private almacenistasService: AlmacenistasService) {}

  ngOnInit(): void {
    this.obtenerLotes();
  }

  obtenerLotes(): void {
    this.almacenistasService.getLotes().subscribe((data) => {
      this.lotes = data.map(lote => ({
        ...lote,
        _id: lote._id || lote.id // Asegurar que haya un identificador
      }));
      this.ordenarLotes();
    });
  }

  filtrarPorNombre(): void {
    if (!this.filtroNombre.trim()) {
      this.obtenerLotes();
      return;
    }

    this.almacenistasService.filtrarLotesPorNombre(this.filtroNombre).subscribe((data) => {
      this.lotes = data;
      this.ordenarLotes();
    });
  }

  filtrarPorCodigoLote(): void {
    if (!this.filtroCodigo.trim()) {
      this.obtenerLotes();
      return;
    }

    this.almacenistasService.filtrarLotesPorCodigoLote(this.filtroCodigo).subscribe((data) => {
      this.lotes = data;
      this.ordenarLotes();
    });
  }

  ordenarLotes(): void {
    if (this.ordenamiento === 'asc') {
      this.lotes.sort((a, b) => new Date(a.fechaCaducidad).getTime() - new Date(b.fechaCaducidad).getTime());
    } else {
      this.lotes.sort((a, b) => new Date(b.fechaCaducidad).getTime() - new Date(a.fechaCaducidad).getTime());
    }
  }

  /**
   * Maneja la selección de un lote para la vista detalle
   * @param lote Lote seleccionado
   */
  seleccionarLote(lote: any): void {
    this.loteSeleccionado = {
      ...lote,
      _id: lote._id || lote.id // Garantizar que haya un identificador válido
    };
  }

  /**
   * Elimina un lote seleccionado
   */
  eliminarLote(): void {
    if (!this.loteSeleccionado?._id) {
      alert('Error: El lote no tiene un identificador válido.');
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el lote ${this.loteSeleccionado.codigoLote}?`);
    if (!confirmacion) return;

    this.almacenistasService.deteleteLotes(this.loteSeleccionado._id).subscribe(
      () => {
        alert('Lote eliminado correctamente.');
        this.obtenerLotes();
        this.loteSeleccionado = null;
      },
      error => {
        alert('Error al eliminar el lote.');
        console.error(error);
      }
    );
  }

  /**
   * Regresa a la vista maestro
   */
  regresar(): void {
    this.loteSeleccionado = null;
  }
}
