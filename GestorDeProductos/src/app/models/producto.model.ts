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
  stockAlmacen: number;
  cantidadAlmacen: number;

  // 🔹 Nueva propiedad opcional para el formulario
  cantidadAgregada?: number;
  mostrarFormulario?: boolean;
  faltanteEnEstante?: number;
  mensajeExistencia?: string;
  colorMensaje?: string;
  mensajeExistenciaAlmacen?: string;
  colorMensajeAlmacen?:string;
}
