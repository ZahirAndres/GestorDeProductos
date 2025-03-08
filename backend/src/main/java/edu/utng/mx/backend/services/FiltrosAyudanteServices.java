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

    /**
     * Obtiene el codigo de barras
     * 
     * @param codigoBarras
     */

    public List<Producto> buscarPorCodigoBarras(String codigoBarras) {
        return filtroRepository.findByCodigoBarras(codigoBarras);
    }

    /**
     * Obtiene el nombre del Porducto
     * 
     * @param nombre
     */
    public List<Producto> buscarPorNombre(String nombre) {
        return filtroRepository.findByNombreProducto(nombre);
    }

    /**
     * Obtiene la categoria del producto
     * 
     * @param categoria
     */
    public List<Producto> buscarPorCategoria(String categoria) {
        return filtroRepository.findByCategoria(categoria);
    }

    public List<Producto> buscarPorNombreYCategoria(String texto) {
        return filtroRepository.findByNombreYCategoria(texto);
    }

    /**
     * No tiene parametros
     * 
     */
    public List<Producto> productosDefectoPasillo() {
        return filtroRepository.findByExistenciaExhibida();
    }

}