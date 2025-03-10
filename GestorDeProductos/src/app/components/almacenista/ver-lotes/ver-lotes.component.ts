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
   * Filtrar lotes dependiendo de la selección del usuario.
   */
  filtrarLotes(): void {
    if (!this.tipoBusqueda || this.tipoBusqueda === 'todos') {
      // Si no se selecciona filtro o se elige "Todos", se cargan todos los lotes.
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
  
  /**
   * Ordenar los lotes, colocando primero los que estén próximos a caducar (1, 3 o 5 días)
   * y luego el resto, respetando el orden ascendente o descendente según se seleccione.
   */
  ordenarLotes(): void {
    this.lotes.sort((a, b) => {
      // Determinar prioridad: 0 para prioridad, 1 para el resto.
      const aPriority = this.esPrioridad(a) ? 0 : 1;
      const bPriority = this.esPrioridad(b) ? 0 : 1;
  
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      } else {
        // Si tienen la misma prioridad, se ordena según la fecha de caducidad.
        const diff = new Date(a.fechaCaducidad).getTime() - new Date(b.fechaCaducidad).getTime();
        return this.ordenamiento === 'asc' ? diff : -diff;
      }
    });
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
   * Determina si un lote es prioritario (a 1, 3 o 5 días de caducar).
   */
  esPrioridad(lote: any): boolean {
    const diasRestantes = this.calcularDiasRestantes(lote.fechaCaducidad);
    return diasRestantes === 1 || diasRestantes === 3 || diasRestantes === 5;
  }
  
  /**
   * Determina si un lote ya está caducado (días restantes menor o igual a 0).
   */
  estaCaducado(lote: any): boolean {
    return this.calcularDiasRestantes(lote.fechaCaducidad) <= 0;
  }
  
  /**
   * Devuelve la fecha ajustada a la zona local en formato YYYY-MM-DD para mostrar en la card.
   */
  mostrarFecha(fechaCaducidad: Date | string): string {
    const fechaLocal = this.ajustarFecha(fechaCaducidad);
    return fechaLocal.toISOString().split('T')[0];
  }
}
