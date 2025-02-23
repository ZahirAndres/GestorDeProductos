package edu.utng.mx.backend.documentos;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "Productos")
public class Producto {
    @Id
    private String _id; // MongoDB lo asignará automáticamente

    private String codigoBarras;
    private String nombreProducto;
    private String tamano;
    private String marca;
    private String categoria;
    private double precioPieza;
    private double precioCaja;
    private int cantidadPiezasPorCaja;
    private String proveedor;

    // Constructor vacío
    public Producto() {
    }

    // Constructor con parámetros
    public Producto(String codigoBarras, String nombreProducto, String tamano, String marca, 
                    String categoria, double precioPieza, double precioCaja, int cantidadPiezasPorCaja, 
                    String proveedor) {
        this.codigoBarras = codigoBarras;
        this.nombreProducto = nombreProducto;
        this.tamano = tamano;
        this.marca = marca;
        this.categoria = categoria;
        this.precioPieza = precioPieza;
        this.precioCaja = precioCaja;
        this.cantidadPiezasPorCaja = cantidadPiezasPorCaja;
        this.proveedor = proveedor;
    }

    // Getters y Setters
    public String getId() {
        return _id;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getTamano() {
        return tamano;
    }

    public void setTamano(String tamano) {
        this.tamano = tamano;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public double getPrecioPieza() {
        return precioPieza;
    }

    public void setPrecioPieza(double precioPieza) {
        this.precioPieza = precioPieza;
    }

    public double getPrecioCaja() {
        return precioCaja;
    }

    public void setPrecioCaja(double precioCaja) {
        this.precioCaja = precioCaja;
    }

    public int getCantidadPiezasPorCaja() {
        return cantidadPiezasPorCaja;
    }

    public void setCantidadPiezasPorCaja(int cantidadPiezasPorCaja) {
        this.cantidadPiezasPorCaja = cantidadPiezasPorCaja;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }
}
