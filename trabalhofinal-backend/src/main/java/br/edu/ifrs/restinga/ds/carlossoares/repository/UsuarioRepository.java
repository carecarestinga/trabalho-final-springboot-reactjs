package br.edu.ifrs.restinga.ds.carlossoares.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrs.restinga.ds.carlossoares.model.Funcionario;
import br.edu.ifrs.restinga.ds.carlossoares.model.Usuario;

/**
*
* @author carecarestinga
*/

@Repository("usuarioRepository") //anotação que defini a classe como classe de repositorio
public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Integer>{
    public Usuario findByLogin(String login);
    
    Page<Usuario> findByNome(String nome, Pageable pageable); 
    Iterable<Usuario> findByNome(String nome); 
    
    Page<Usuario> findByNomeContaining(String nome, Pageable pageable);
    Iterable<Usuario> findByNomeContaining(String nome);
    
}
