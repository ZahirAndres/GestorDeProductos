package edu.utng.mx.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.repository.FiltrosCliente;

@Service
public class FiltrosClienteService {
    private final FiltrosCliente filtrosCliente;

    /**
     * 
     * @param filtrosCliente
     */
    public FiltrosClienteService(FiltrosCliente filtrosCliente) {
        this.filtrosCliente = filtrosCliente;
    }

    /**
     * 
     * @param categoria
     * @return
     */
    public List<Producto> findByCategoria(String categoria) {
        return filtrosCliente.findByCategoria(categoria);
    }

    /**
     * 
     * @param nombre
     * @return
     */
    public List<Producto> findByNombre(String nombre) {
        return filtrosCliente.findByNombreProducto(nombre);
    }

    /**
     * 
     * @param categoria
     * @param nombre
     * @return
     */
    public List<Producto> findByCategoriaYNombre(String categoria, String nombre) {
        return filtrosCliente.findByCategoriaYNombre(categoria, nombre);
    }

    /**
     * 
     * @return
     */
    public List<Producto> productosClienteDefecto() {
        return filtrosCliente.productosClienteDefecto();
    }

}
