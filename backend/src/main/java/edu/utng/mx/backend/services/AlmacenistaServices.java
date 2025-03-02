package edu.utng.mx.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.utng.mx.backend.documentos.Lote;
import edu.utng.mx.backend.repository.LotesRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AlmacenistaServices {
    @Autowired
    private LotesRepository lotesRepository;
    
    @Autowired
    public AlmacenistaServices(LotesRepository lotesRepository) {
        this.lotesRepository = lotesRepository;
    }

    public List<Lote> filtrarLotes(String codigoLote, String fechaCaducidad, String producto) {
        return lotesRepository.filtroLotesCodigoFechaCaducidadNombre(codigoLote, fechaCaducidad, producto);
    }


}
