package edu.utng.mx.backend.controller;

import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.repository.ProductoRepository;
import edu.utng.mx.backend.services.FiltrosAyudanteServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos/filtroAyudante/")
public class FiltrosAyudanteController {

    private final FiltrosAyudanteServices filtroService;

    @Autowired
    private ProductoRepository productoRepo;

    public FiltrosAyudanteController(FiltrosAyudanteServices filtroService) {
        this.filtroService = filtroService;
    }

    /*
     * Este Controller nos permite buscar productos por su codigo de barras
     */
    @GetMapping("/buscarPorCodigo/{codigoBarras}")
    public List<Producto> buscarPorCodigo(@PathVariable String codigoBarras) {
        return filtroService.buscarPorCodigoBarras(codigoBarras);
    }

    /*
     * Este Controller nos permite buscar productos por el nombre del producto
     */
    @GetMapping("/buscarPorNombre/{nombre}")
    public List<Producto> buscarPorNombre(@PathVariable String nombre) {
        return filtroService.buscarPorNombre(nombre);
    }

    /*
     * Este Controller nos permite buscar productos por la categoria del producto
     */
    @GetMapping("/buscarPorCategoria/{categoria}")
    public List<Producto> buscarPorCategoria(@PathVariable String categoria) {
        return filtroService.buscarPorCategoria(categoria);
    }

    @GetMapping("/buscarPorCategoriaONombre/{Filtro}")
    public List<Producto> buscarPorCategoriaYNombre(@PathVariable String filtro) {
        return filtroService.buscarPorNombreYCategoria(filtro);
    }

    /*
     * Este Controller nos arroja los productos por defectos (Menores a su
     * cantidad de productos minimos en estantes (stock_exibhe)) ordenados por la
     * cantidad de
     * Productos faltantes
     */
    @GetMapping("/ProductosDefectoPasillo")
    public List<Producto> productosDefectoPasillo() {
        return filtroService.productosDefectoPasillo();
    }

    /*Este controller nos permite solamente actualizar 
    la existencia de un producto */
    @PutMapping("/actualizarExistenciaPasillo/{codigoBarras}")
    public ResponseEntity<?> actualizarExistenciaPasillo(@PathVariable String codigoBarras,
            @RequestBody int cantidadAgregada) {
        try {
      Optional<Producto> optionalProducto = productoRepo.encontrarPorCodigoBarras(codigoBarras);

            if (optionalProducto.isPresent()) {
                Producto producto = optionalProducto.get();
                producto.setExistenciaExhibida(producto.getExistenciaExhibida() + cantidadAgregada);
                productoRepo.save(producto);
                return ResponseEntity.ok(Map.of("message", "Producto actualizado exitosamente", "producto", producto));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Producto no encontrado"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

}
