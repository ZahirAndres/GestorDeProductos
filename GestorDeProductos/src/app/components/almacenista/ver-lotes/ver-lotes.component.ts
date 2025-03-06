import { Component, OnInit } from '@angular/core';
import { AlmacenistasService } from '../../../services/almacenistas/almacenistas.service';

@Component({
  selector: 'app-ver-lotes',
  templateUrl: './ver-lotes.component.html',
  styleUrls: ['./ver-lotes.component.css']
})
export class VerLotesComponent implements OnInit {
  lotes: any[] = [];
  filtroTexto: string = ''; // Campo de entrada para la búsqueda
  tipoBusqueda: string = ''; // Selección del tipo de búsqueda (código de lote o nombre)
  ordenamiento: string = 'asc';
  loteSeleccionado: any = null; 

  constructor(private almacenistasService: AlmacenistasService) {}

  ngOnInit(): void {
    this.obtenerLotes();
  }

  obtenerLotes(): void {
    this.almacenistasService.getLotes().subscribe((data) => {
      this.lotes = data.map(lote => ({
        ...lote,
        _id: lote._id || lote.id 
      }));
      this.ordenarLotes();
    });
  }

  /**
   * Filtrar lotes dependiendo de la selección del usuario
   */
  filtrarLotes(): void {
    if (!this.tipoBusqueda || this.tipoBusqueda === 'todos') {
      // Si no se selecciona filtro o se elige "Todos", se cargan todos los lotes
      this.obtenerLotes();
      return;
    }
  
    if (!this.filtroTexto.trim()) {
      
      return;
    }
  
    if (this.tipoBusqueda === 'codigo') {
      this.almacenistasService.filtrarLotesPorCodigoLote(this.filtroTexto).subscribe((data) => {
        this.lotes = data;
        this.ordenarLotes();
      });
    } else if (this.tipoBusqueda === 'nombre') {
      this.almacenistasService.filtrarLotesPorNombre(this.filtroTexto).subscribe((data) => {
        this.lotes = data;
        this.ordenarLotes();
      });
    }
  }
  

  ordenarLotes(): void {
    if (this.ordenamiento === 'asc') {
      this.lotes.sort((a, b) => new Date(a.fechaCaducidad).getTime() - new Date(b.fechaCaducidad).getTime());
    } else {
      this.lotes.sort((a, b) => new Date(b.fechaCaducidad).getTime() - new Date(a.fechaCaducidad).getTime());
    }
  }

  seleccionarLote(lote: any): void {
    this.loteSeleccionado = {
      ...lote,
      _id: lote._id || lote.id
    };
  }

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

  regresar(): void {
    this.loteSeleccionado = null;
  }
}
