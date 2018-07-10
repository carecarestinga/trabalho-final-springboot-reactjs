package br.edu.ifrs.restinga.ds.carlossoares.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrs.restinga.ds.carlossoares.model.Cargo;
import br.edu.ifrs.restinga.ds.carlossoares.model.Funcionario;

/**
 *
 * @author carecarestinga
 */

@Repository
public interface CargoRepository extends PagingAndSortingRepository<Cargo, Integer>{
	
    Page<Cargo> findByNome(String nome, Pageable pageable); 
    Iterable<Cargo> findByNome(String nome); 
    
    Page<Cargo> findByNomeContaining(String nome, Pageable pageable);
    Iterable<Cargo> findByNomeContaining(String nome);
    
    
}
