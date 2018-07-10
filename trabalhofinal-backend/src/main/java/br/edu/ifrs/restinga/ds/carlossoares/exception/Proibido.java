package br.edu.ifrs.restinga.ds.carlossoares.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
*
* @author carecarestinga
*/

@ResponseStatus(HttpStatus.FORBIDDEN)
public class Proibido extends RuntimeException {
    public Proibido(String erro) {
        super(erro);
    }
    
}
