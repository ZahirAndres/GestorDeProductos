package edu.utng.mx.backend.controller;

import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.services.AlmacenistaServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almacenistas/")
public class AlmacenistaController {
    private final AlmacenistaServices almacenistaService;

    public AlmacenistaController(AlmacenistaServices almacenistaService) {
        this.almacenistaService = almacenistaService;
    }

    @GetMapping("filtros/categoria/{categoria}")
    public List<Producto> findByCategoria(@PathVariable String categoria) {
        return almacenistaService.buscarPorCategoria(categoria);
    }

    @GetMapping("filtros/nombreProducto/{nombre}")
    public List<Producto> findByNombreProducto(@PathVariable String nombre) {
        return almacenistaService.buscarPorNombre(nombre);
    }

    @GetMapping("filtros/codigoBarras/{codigoBarras}")
    public List<Producto> findByCodigoBarras(@PathVariable String codigoBarras) {
        return almacenistaService.buscarPorCodigoBarras(codigoBarras);
    }

    @GetMapping("filtros/categoriaYNomb/{categoria}/{nombre}")
    public List<Producto> findByCategoriaYNombreProducto(@PathVariable String filtro) {
        return almacenistaService.buscarPorNombreYCategoria(filtro);
    }

    // @GetMapping("filtros/existenciasMinimas/")
    // public List<Producto> findByExistenciasMinimas() {
    //     return almacenistaService.findByExistenciasMinimas();
    // }
}
