package edu.utng.mx.backend.documentos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Marcas")
public class Marca {
    @Id
    private String _id; // MongoDB lo asignará automáticamente

    private String nombreMarca;
    
    public Marca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
    }

    public String getId() {
        return _id;
    }

    public String getNombreMarca() {
        return nombreMarca;
    }

    public void setNombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
    }

    public String get_id() {
        return _id;
    }   
}
