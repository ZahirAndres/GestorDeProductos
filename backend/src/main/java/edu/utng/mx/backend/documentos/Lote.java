package main.java.edu.utng.mx.backend.documentos;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Lotes")
public class Lote {

    @Id
    private String id;
    private String codigoLote;
    private String producto;
    private Date fechaCaducidad;
    private int cantidadComprada;
    private Date fechaRegistro;

    public Lote() {
    }

    public Lote(String codigoLote, String producto, Date fechaCaducidad, int cantidadComprada, Date fechaRegistro) {
        this.codigoLote = codigoLote;
        this.producto = producto;
        this.fechaCaducidad = fechaCaducidad;
        this.cantidadComprada = cantidadComprada;
        this.fechaRegistro = fechaRegistro;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodigoLote() {
        return codigoLote;
    }

    public void setCodigoLote(String codigoLote) {
        this.codigoLote = codigoLote;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public Date getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(Date fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
    }

    public int getCantidadComprada() {
        return cantidadComprada;
    }

    public void setCantidadComprada(int cantidadComprada) {
        this.cantidadComprada = cantidadComprada;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    
}
