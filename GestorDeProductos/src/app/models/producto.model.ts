export interface Producto {
    _id?: string; // MongoDB usa ObjectId, pero en Angular lo manejamos como string
    codigoBarras: string;
    nombreProducto: string;
    tamano: string;
    marca: string;
    categoria: string;
    precioPieza: number;
    precioCaja: number;
    cantidadPiezasPorCaja: number;
    proveedor: string;
  }
  