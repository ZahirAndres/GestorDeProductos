package edu.utng.mx.backend.documentos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Tamanios")
public class Tamanio {
    @Id
    private String _id; // MongoDB lo asignará automáticamente

    private String nombreTamanio;
    private String descripcion;
    
    
    public Tamanio(String nombreTamanio, String descripcion) {
        this.nombreTamanio = nombreTamanio;
        this.descripcion = descripcion;
    }


    public String getNombreTamanio() {
        return nombreTamanio;
    }

    public void setNombreTamanio(String nombreTamanio) {
        this.nombreTamanio = nombreTamanio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    
}
