package br.edu.ifrs.restinga.ds.carlossoares.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
*
* @author carecarestinga
*/

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RequisicaoInvalida extends RuntimeException {

    public RequisicaoInvalida(String msg) {
        super(msg);
        
    }
    
    
}
