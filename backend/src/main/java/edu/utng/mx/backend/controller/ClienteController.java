package edu.utng.mx.backend.controller;

import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.services.FiltrosClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cliente/")
public class ClienteController {
    private final FiltrosClienteService filtrosCliente;

    public ClienteController(FiltrosClienteService filtrosCliente) {
        this.filtrosCliente = filtrosCliente;
    }
    /*
     * Este Controller nos permite buscar  productos por su categoria
     */
    @GetMapping("filtrosCliente/categoria/{categoria}")
    public List<Producto> findByCategoria(@PathVariable String categoria) {
        return filtrosCliente.findByCategoria(categoria);
    }

    /*
     * Este Controller nos permite buscar  productos por su nombre
     */
    @GetMapping("filtrosCliente/nombreProducto/{nombre}")
    public List<Producto> findByNombreProducto(@PathVariable String nombre) {
        return filtrosCliente.findByNombre(nombre);
    }

    /*
     * Este Controller nos permite buscar  productos por su categoria y nombre
     */
    @GetMapping("filtrosCliente/nombreProductoYCategoria/{categoria}/{nombre}")
    public List<Producto> findByCategoriaYNombreProducto(@PathVariable String categoria, @PathVariable String nombre) {
        return filtrosCliente.findByCategoriaYNombre(categoria, nombre);
    }

    /*
     * Este Controller nos arroja los productos por defecto (Que su "Existencia_Exibhe" se mayor a 0)
     */
    @GetMapping("filtrosCliente/defecto/")
    public List<Producto> productosClienteDefecto() {
        return filtrosCliente.productosClienteDefecto();
    }
}
