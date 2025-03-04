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

    @GetMapping("filtrosCliente/categoria/{categoria}")
    public List<Producto> findByCategoria(@PathVariable String categoria) {
        return filtrosCliente.findByCategoria(categoria);
    }

    @GetMapping("filtrosCliente/nombreProducto/{nombre}")
    public List<Producto> findByNombreProducto(@PathVariable String nombre) {
        return filtrosCliente.findByNombre(nombre);
    }

    @GetMapping("filtrosCliente/nombreProductoYCategoria/{categoria}/{nombre}")
    public List<Producto> findByCategoriaYNombreProducto(@PathVariable String categoria, @PathVariable String nombre) {
        return filtrosCliente.findByCategoriaYNombre(categoria, nombre);
    }

    @GetMapping("filtrosCliente/defecto/")
    public List<Producto> productosClienteDefecto() {
        return filtrosCliente.productosClienteDefecto();
    }
}
