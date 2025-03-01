package edu.utng.mx.backend.documentos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Categorias")
public class Categoria {
    @Id
    private String _id; // MongoDB lo asignará automáticamente
    private String nombreCategoria;

    public Categoria(String _id, String nombreCategoria) {
        this._id = _id;
        this.nombreCategoria = nombreCategoria;
    }

    public String getId() { 
        return _id;
    }

    public void setId(String _id) { 
        this._id = _id;
    }

    public String getNombreCategoria() { 
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
}
