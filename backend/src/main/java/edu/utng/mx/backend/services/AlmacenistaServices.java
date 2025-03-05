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
