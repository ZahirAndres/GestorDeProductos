package edu.utng.mx.backend.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.repository.LotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class AlmacenistaServices {
    @Autowired
    private LotesRepository lotesRepository;

    @Autowired
    public AlmacenistaServices(LotesRepository lotesRepository) {
        this.lotesRepository = lotesRepository;
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
            // Ajustamos el formato para aceptar el formato con zona horaria
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

        return lotesRepository.filtroLotesCodigoFechaCaducidadNombre(codigoLoteParam, fecha,
                productoParam);

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
    

}
