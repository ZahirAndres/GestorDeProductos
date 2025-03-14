package edu.utng.mx.backend.documentos;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.List;
import java.util.Date;

@Document(collection = "historialPrecios")
public class HistorialPrecio {

    @Id 
    private String _id;  // MongoDB lo asignará automáticamente
    private String codigoBarras;
    private String producto;
    private List<PrecioHistorial> historialPrecios;

    // Constructor vacío
    public HistorialPrecio() {
    }

    // Constructor con parámetros
    public HistorialPrecio(String _id, String codigoBarras, String producto, List<PrecioHistorial> historialPrecios) {
        this._id = _id;
        this.codigoBarras = codigoBarras;
        this.producto = producto;
        this.historialPrecios = historialPrecios;
    }

    // Getters y Setters
    public String getId() {
        return _id;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public List<PrecioHistorial> getHistorialPrecios() {
        return historialPrecios;
    }

    public void setHistorialPrecios(List<PrecioHistorial> historialPrecios) {
        this.historialPrecios = historialPrecios;
    }

    // Clase separada para representar los elementos de historialPrecios
    public static class PrecioHistorial {
        private double precio;
        private Date fechaCambio;
        private Date fechaFin;  

        // Constructor
        public PrecioHistorial(double precio, Date fechaCambio, Date fechaFin) {
            this.precio = precio;
            this.fechaCambio = fechaCambio;
            this.fechaFin = fechaFin;  
        }
 
        // Getters y Setters
        public double getPrecio() {
            return precio;
        }

        public void setPrecio(double precio) {
            this.precio = precio;
        }

        public Date getFechaCambio() {
            return fechaCambio;
        }

        public void setFechaCambio(Date fechaCambio) {
            this.fechaCambio = fechaCambio;
        }

        public Date getFechaFin() {
            return fechaFin;
        }

        public void setFechaFin(Date fechaFin) {
            this.fechaFin = fechaFin;
        }
    }
}
