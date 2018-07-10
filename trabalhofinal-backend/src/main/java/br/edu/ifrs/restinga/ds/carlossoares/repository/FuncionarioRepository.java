package br.edu.ifrs.restinga.ds.carlossoares.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrs.restinga.ds.carlossoares.model.Funcionario;


/**
*
* @author carecarestinga
*/

@Repository
public interface FuncionarioRepository extends PagingAndSortingRepository<Funcionario, Integer> {
	
    Page<Funcionario> findByNome(String nome, Pageable pageable); 
    Iterable<Funcionario> findByNome(String nome); 
    
    Page<Funcionario> findByNomeContaining(String nome, Pageable pageable);
    Iterable<Funcionario> findByNomeContaining(String nome);
    
    Iterable<Funcionario> findBySalario(Float Salario);
    Iterable<Funcionario> findBySalarioGreaterThanEqual(Float Salario);
    public Iterable<Funcionario> findBySalarioLessThanEqual(Float menor);

    public Iterable<Funcionario> findBySalarioBetween(Float a1, Float a2);
    public Iterable<Funcionario> findBySalarioLessThanEqualAndSalarioGreaterThanEqual(
    Float menor, Float maior);

	
      
}
