package br.edu.ifrs.restinga.ds.carlossoares.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrs.restinga.ds.carlossoares.exception.NaoEncontrado;
import br.edu.ifrs.restinga.ds.carlossoares.model.Departamento;
import br.edu.ifrs.restinga.ds.carlossoares.model.Funcionario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.DepartamentoRepository;

/**
 *
 * @author carecarestinga
 */

@RestController
@RequestMapping(path = "/api")
public class DepartamentoController {

	@Autowired
	DepartamentoRepository departamentoRepository;

	@RequestMapping(path = "/departamentos/", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Departamento> listarTodosDepartamentos(@RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao) {
		return departamentoRepository.findAll(PageRequest.of(pagina, 
                tamanho,Sort.Direction.valueOf(direcao), ordem));
	}

    @RequestMapping(path = "/departamentos/pesquisar/nome", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Departamento> pesquisarNome(
            @RequestParam(required = false) String igual,
            @RequestParam(required = false) String contem,
            @RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao

            
            ) {
        if (igual != null && !igual.isEmpty()) {
            return departamentoRepository.findByNome(igual,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));
        } else {
            return departamentoRepository.findByNomeContaining(contem,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));

        }
    }

	@RequestMapping(path = "/departamentos/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Departamento recuperarDepartamento(@PathVariable Integer id) {

		Optional<Departamento> findById = departamentoRepository.findById(id);
		if (findById.isPresent()) {
			return findById.get();
		} else {
			throw new NaoEncontrado("Não encontrado");

		}
	}
	
	@RequestMapping(path = "/departamentos/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Departamento adicionarDepartamento(@RequestBody Departamento departamento) {
		departamento.setId(0);

		Departamento departamentoComId = departamentoRepository.save(departamento);
		return departamentoComId;
	}

	@RequestMapping(path = "/departamentos/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizarDepartamento(@PathVariable Integer id, @RequestBody Departamento departamento) {

		Optional<Departamento> optionalDepartamentoBanco = departamentoRepository.findById(id);
		if (!optionalDepartamentoBanco.isPresent())
			throw new NaoEncontrado("ID não encontrada");
		Departamento departamentoBanco = optionalDepartamentoBanco.get();
		departamentoBanco.setNome(departamento.getNome());
		departamentoBanco.setDescricao(departamento.getDescricao());
		departamentoRepository.save(departamentoBanco);
	}

	@RequestMapping(path = "/departamentos/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluirDepartamento(@PathVariable Integer id) {
		if (!departamentoRepository.existsById(id)) {
			throw new NaoEncontrado("ID não encontrada");
		}
		departamentoRepository.deleteById(id);
	}

	@RequestMapping(path = "/departamentos/{id}/funcionarios", method = RequestMethod.GET)
	public String recuperarListaFuncionariosPorDepartamento(@PathVariable Integer id) {
		Optional<Departamento> buscarPorId = departamentoRepository.findById(id);
		Funcionario mostraNome = buscarPorId.get().getFuncionarios().get(id);
		return mostraNome.getDepartamento().getNome().toString();
	}

}
