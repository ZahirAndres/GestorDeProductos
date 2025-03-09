package edu.utng.mx.backend.services;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.documentos.Proveedor;
import edu.utng.mx.backend.repository.LotesRepository;
import edu.utng.mx.backend.repository.ProveedorRepository;
import edu.utng.mx.backend.repository.FiltrosAlmacenistaRepository;

@Service
public class AlmacenistaServices {
    @Autowired
    private LotesRepository lotesRepository;

    @Autowired
    private FiltrosAlmacenistaRepository filtrosAlmacenista;

    @Autowired
    private ProveedorRepository proveedorRepository;

    public AlmacenistaServices(LotesRepository lotesRepository, FiltrosAlmacenistaRepository filtrosAlmacenista) {
        this.lotesRepository = lotesRepository;
        this.filtrosAlmacenista = filtrosAlmacenista;
    }

    public List<Lote> filtrarLotesPorNombre(String producto) {
        return lotesRepository.filtroLotesPorNombre(
                (producto != null && !producto.isEmpty()) ? producto : "");
    }

    public List<Lote> filtrarLotesPorCodigoLote(String codigoLote) {
        return lotesRepository.filtroLotesPorCodigoLote(
                (codigoLote != null && !codigoLote.isEmpty()) ? codigoLote : "");
    }

    // ========== MÉTODOS PARA FILTRAR PRODUCTOS ==========
    public List<Producto> buscarPorCategoria(String categoria) {
        return filtrosAlmacenista.findByCategoria(categoria);
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return filtrosAlmacenista.findByNombreProducto(nombre);
    }

    public List<Producto> buscarPorCodigoBarras(String codigoBarras) {
        return filtrosAlmacenista.findByCodigoBarras(codigoBarras);
    }

    public List<Producto> buscarPorNombreYCategoria(String texto) {
        return filtrosAlmacenista.findByCategoriaYNombre(texto);
    }

    // public List<Producto> findByExistenciasMinimas() {
    // return filtrosAlmacenista.findByExistenciasMinimas(10);
    // }

    // =========Metodo para ver los datos completos de los provedores de cada
    // producto =======
    public List<Proveedor> provedoresPorProducto(List<String> nombreProvedor) {
        if (nombreProvedor == null || nombreProvedor.isEmpty()) {
            return Collections.emptyList(); // Retornar lista vacía si no hay nombres
        }
        return proveedorRepository.provedoresDelProducto(nombreProvedor);
    }

}
