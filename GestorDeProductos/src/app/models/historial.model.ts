export interface HistorialPrecio {
    _id?: string;
    codigoBarras: string;
    producto: string;
    historialPrecios : [
        { precio : number,
            fechaCambio : Date
        }
    ]
  }
  