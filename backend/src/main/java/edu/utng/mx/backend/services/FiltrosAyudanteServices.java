package edu.utng.mx.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.repository.FiltrosAyudanteRepository;

@Service
public class FiltrosAyudanteServices {
 private final FiltrosAyudanteRepository filtroRepository;

    public FiltrosAyudanteServices(FiltrosAyudanteRepository filtroRepository) {
        this.filtroRepository = filtroRepository;
    }

    public List<Producto> buscarPorCodigoBarras(String codigoBarras) {
        return filtroRepository.findByCodigoBarras(codigoBarras);
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return filtroRepository.findByNombreProducto(nombre);
    }

    public List<Producto> buscarPorCategoria(String categoria) {
        return filtroRepository.findByCategoria(categoria);
    }
}
