package edu.utng.mx.backend.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.documentos.Producto;
import edu.utng.mx.backend.repository.LotesRepository;
import edu.utng.mx.backend.repository.FiltrosAlmacenistaRepository;

@Service
public class AlmacenistaServices {
    @Autowired
    private LotesRepository lotesRepository;

    @Autowired
    private FiltrosAlmacenistaRepository filtrosAlmacenista;

    @Autowired
    public AlmacenistaServices(LotesRepository lotesRepository, FiltrosAlmacenistaRepository filtrosAlmacenista) {
        this.lotesRepository = lotesRepository;
        this.filtrosAlmacenista = filtrosAlmacenista;
    }



    /**
     * DESUSO
     * @param codigoLote
     * @param fechaCaducidad
     * @param producto
     * @return
     */
    public List<Lote> filtrarLotes(String codigoLote, String fechaCaducidad, String producto) {
        // Convertir fechaCaducidad a Date
        Date fecha = null;
        try {
            if (fechaCaducidad != null && !fechaCaducidad.isEmpty()) {
                SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                formato.setTimeZone(TimeZone.getTimeZone("UTC"));
                fecha = formato.parse(fechaCaducidad);
            }
        } catch (ParseException e) {
            System.err.println("Error al convertir fecha: " + e.getMessage());
        }
        String codigoLoteParam = (codigoLote != null && !codigoLote.isEmpty()) ? codigoLote : "";
        String fechaCaducidadParam = (fechaCaducidad != null && !fechaCaducidad.isEmpty()) ? fechaCaducidad : "";
        String productoParam = (producto != null && !producto.isEmpty()) ? producto : "";

        return lotesRepository.filtroLotesCodigoFechaCaducidadNombre(codigoLoteParam, fecha, productoParam);
    }

    public List<Lote> filtrarLotesPorNombre(String producto) {
        return lotesRepository.filtroLotesPorNombre(
            (producto != null && !producto.isEmpty()) ? producto : ""
        );
    }

    public List<Lote> filtrarLotesPorCodigoLote(String codigoLote) {
        return lotesRepository.filtroLotesPorCodigoLote(
            (codigoLote != null && !codigoLote.isEmpty()) ? codigoLote : ""
        );
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
    //     return filtrosAlmacenista.findByExistenciasMinimas(10);
    // }
}
