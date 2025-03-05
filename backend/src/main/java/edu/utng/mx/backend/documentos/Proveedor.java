package edu.utng.mx.backend.documentos;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Proveedores")
public class Proveedor {
    @Id
    private String _id; // MongoDB lo asignará automáticamente

    private String nombreProveedor;
    private String direccion;   
    private String correo;  
    private  List<String> telefono;


    // Constructor vacío
    public Proveedor() {
    }

    // Constructor con parámetros
    public Proveedor(String _id, String nombreProveedor, String direccion, String correo, List<String> telefono) {
        this._id = _id;
        this.nombreProveedor = nombreProveedor;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
    }

    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getNombreProveedor() {
        return nombreProveedor;
    }
    public void setNombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
    }
    public String getDireccion() {
        return direccion;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public List<String> getTelefono() {
        return telefono;
    }
    public void setTelefono(List<String> telefono) {
        this.telefono = telefono;
    }
    
}
