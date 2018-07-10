package br.edu.ifrs.restinga.ds.carlossoares.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrs.restinga.ds.carlossoares.model.Departamento;

/**
 *
 * @author carecarestinga
 */

@Repository
public interface DepartamentoRepository extends PagingAndSortingRepository<Departamento, Integer>{
	
	
    Page<Departamento> findByNome(String nome, Pageable pageable); 
    Iterable<Departamento> findByNome(String nome); 
    
    Page<Departamento> findByNomeContaining(String nome, Pageable pageable);
    Iterable<Departamento> findByNomeContaining(String nome);
    
}
