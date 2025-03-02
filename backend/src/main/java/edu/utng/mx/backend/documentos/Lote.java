package edu.utng.mx.backend.documentos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "Lotes")
public class Lote {
    @Id
    private String _id; // MongoDB lo asignará automáticamente
    private String codigoLote;
    private String producto;
    private Date fechaCaducidad;
    private int cantidadComprada;
    private Date fechaRegistro;

    // Constructor vacío (necesario para Spring Boot)
    public Lote() {
    }

    // Constructor con todos los parámetros
    public Lote(String _id, String codigoLote, String producto, Date fechaCaducidad, int cantidadComprada, Date fechaRegistro) {
        this._id = _id;
        this.codigoLote = codigoLote;
        this.producto = producto;
        this.fechaCaducidad = fechaCaducidad;
        this.cantidadComprada = cantidadComprada;
        this.fechaRegistro = fechaRegistro;
    }

    // Getters y Setters
    public String getId() { return _id; }
    public void setId(String _id) { this._id = _id; }

    public String getCodigoLote() { return codigoLote; }
    public void setCodigoLote(String codigoLote) { this.codigoLote = codigoLote; }

    public String getProducto() { return producto; }
    public void setProducto(String producto) { this.producto = producto; }

    public Date getFechaCaducidad() { return fechaCaducidad; }
    public void setFechaCaducidad(Date fechaCaducidad) { this.fechaCaducidad = fechaCaducidad; }

    public int getCantidadComprada() { return cantidadComprada; }
    public void setCantidadComprada(int cantidadComprada) { this.cantidadComprada = cantidadComprada; }

    public Date getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(Date fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}
