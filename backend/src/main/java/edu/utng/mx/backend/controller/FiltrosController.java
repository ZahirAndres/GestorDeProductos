package edu.utng.mx.backend.controller;

import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.services.FiltrosAyudanteServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos/filtroAyudante/")
public class FiltrosController {

    private final FiltrosAyudanteServices filtroService;

    public FiltrosController(FiltrosAyudanteServices filtroService) {
        this.filtroService = filtroService;
    }

    @GetMapping("/buscarPorCodigo/{codigoBarras}")
    public List<Producto> buscarPorCodigo(@PathVariable String codigoBarras) {
        return filtroService.buscarPorCodigoBarras(codigoBarras);
    }

    @GetMapping("/buscarPorNombre/{nombre}")
    public List<Producto> buscarPorNombre(@PathVariable String nombre) {
        return filtroService.buscarPorNombre(nombre);
    }

    @GetMapping("/buscarPorCategoria/{categoria}")
    public List<Producto> buscarPorCategoria(@PathVariable String categoria) {
        return filtroService.buscarPorCategoria(categoria);
    }

    @GetMapping("/buscarPorCategoriaONombre/{Filtro}")
    public List<Producto> buscarPorCategoriaYNombre(@PathVariable String filtro){
        return filtroService.buscarPorNombreYCategoria(filtro);
    }
}
