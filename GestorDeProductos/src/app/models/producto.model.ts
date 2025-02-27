export interface Producto {
  _id?: string;
  codigoBarras: string;
  nombreProducto: string;
  tamano: string;
  marca: string;
  imagenUrl?: string;
  categoria: string;
  precioPieza: number;
  precioCaja: number;
  cantidadPiezasPorCaja: number;
  proveedor: string[];
  stockExhibe: number;
  existenciaExhibida: number;
  stockAlamcen: number;
  cantidadAlamcen: number;

  // 🔹 Nueva propiedad opcional para el formulario
  cantidadAgregada?: number;
  mostrarFormulario?: boolean;
}
