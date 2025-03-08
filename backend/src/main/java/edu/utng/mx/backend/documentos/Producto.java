package edu.utng.mx.backend.documentos;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;

@Document(collection = "Productos")
public class Producto {
    @Id
    private String _id; // MongoDB lo asignará automáticamente

    private String codigoBarras;
    private String nombreProducto;
    private String tamano;
    private String marca;
    private List<String> imagenUrl;
    private String categoria;
    private double precioPieza;
    private double precioCaja;
    private int cantidadPiezasPorCaja;
    private List<String> proveedor; // Ahora es una lista, ya que el JSON usa un array

    // Nuevos atributos
    private int stockExhibe = 0; // Valor predeterminado
    private int existenciaExhibida = 0; // Lo que se muestra
    private int stockAlmacen = 0; // Valor predeterminado
    private int cantidadAlmacen = 0; // Cantidad real en almacén

    // Constructor vacío
    public Producto() {
    }

    // Constructor con parámetros
    public Producto(String _id, String codigoBarras, String nombreProducto, String tamano, String marca,
    List<String> imagenUrl, String categoria, double precioPieza, double precioCaja,
                    int cantidadPiezasPorCaja, List<String> proveedor, int stockExhibe, int existenciaExhibida,
                    int stockAlmacen, int cantidadAlmacen) {
        this._id = _id;
        this.codigoBarras = codigoBarras;
        this.nombreProducto = nombreProducto;
        this.tamano = tamano;
        this.marca = marca;
        this.imagenUrl = imagenUrl;
        this.categoria = categoria;
        this.precioPieza = precioPieza;
        this.precioCaja = precioCaja;
        this.cantidadPiezasPorCaja = cantidadPiezasPorCaja;
        this.proveedor = proveedor;
        this.stockExhibe = stockExhibe;
        this.existenciaExhibida = existenciaExhibida;
        this.stockAlmacen = stockAlmacen;
        this.cantidadAlmacen = cantidadAlmacen;
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

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getTamano() {
        return tamano;
    }

    public void setTamano(String tamaño) {
        this.tamano = tamaño;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public List<String> getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(List<String> imagenUrl) {
        this.imagenUrl = imagenUrl;
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

    public List<String> getProveedor() {
        return proveedor;
    }

    public void setProveedor(List<String> proveedor) {
        this.proveedor = proveedor;
    }

    public int getStockExhibe() {
        return stockExhibe;
    }

    public void setStockExhibe(int stockExhibe) {
        this.stockExhibe = stockExhibe;
    }

    public int getExistenciaExhibida() {
        return existenciaExhibida;
    }

    public void setExistenciaExhibida(int existenciaExhibida) {
        this.existenciaExhibida = existenciaExhibida;
    }

    public int getStockAlmacen() {
        return stockAlmacen;
    }

    public void setStockAlmacen(int stockAlmacen) {
        this.stockAlmacen = stockAlmacen;
    }

    public int getCantidadAlmacen() {
        return cantidadAlmacen;
    }

    public void setCantidadAlmacen(int cantidadAlmacen) {
        this.cantidadAlmacen = cantidadAlmacen;
    }
}
