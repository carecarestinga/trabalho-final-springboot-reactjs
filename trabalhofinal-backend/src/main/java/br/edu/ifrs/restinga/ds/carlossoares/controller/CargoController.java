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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrs.restinga.ds.carlossoares.exception.NaoEncontrado;
import br.edu.ifrs.restinga.ds.carlossoares.model.Cargo;
import br.edu.ifrs.restinga.ds.carlossoares.model.Funcionario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.CargoRepository;


/**
*
* @author carecarestinga
*/

@RestController
@RequestMapping(path = "/api")
public class CargoController {

    @Autowired
    CargoRepository cargoRepository;

 
	@RequestMapping(path = "/cargos/", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Cargo> listarTodosCargos(@RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao) {
		return cargoRepository.findAll(PageRequest.of(pagina, 
                tamanho,Sort.Direction.valueOf(direcao), ordem));
	}



    @RequestMapping(path = "/cargos/pesquisar/nome", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Cargo> pesquisarNome(
            @RequestParam(required = false) String igual,
            @RequestParam(required = false) String contem,
            @RequestParam int pagina, 
            @RequestParam int tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao

            
            ) {
        if (igual != null && !igual.isEmpty()) {
            return cargoRepository.findByNome(igual,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));
        } else {
            return cargoRepository.findByNomeContaining(contem,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));

        }
    }
    
	@RequestMapping(path = "/cargos/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Cargo recuperarCargo(@PathVariable Integer id) {

		Optional<Cargo> findById = cargoRepository.findById(id);
		if (findById.isPresent()) {
			return findById.get();
		} else {
			throw new NaoEncontrado("Não encontrado");

		}
	}
	
	@RequestMapping(path = "/cargos/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Cargo adicionarCargo(@RequestBody Cargo cargo) {
		cargo.setId(0);

		Cargo cargoComId = cargoRepository.save(cargo);
		return cargoComId;
	}

	@RequestMapping(path = "/cargos/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizarCargo(@PathVariable Integer id, @RequestBody Cargo cargo) {
	
		Optional<Cargo> optionalCargoBanco = cargoRepository.findById(id);
		if (!optionalCargoBanco.isPresent())
			throw new NaoEncontrado("ID não encontrada");
		Cargo cargoBanco = optionalCargoBanco.get();
		cargoBanco.setNome(cargo.getNome());
		cargoBanco.setDescricao(cargo.getDescricao());
		cargoRepository.save(cargoBanco);
	}

	@RequestMapping(path = "/cargos/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluirFuncionario(@PathVariable Integer id) {
		if (!cargoRepository.existsById(id)) {
			throw new NaoEncontrado("ID não encontrada");
		}
		cargoRepository.deleteById(id);
	}
	
	@RequestMapping(path = "/cargos/{id}/funcionarios", method = RequestMethod.GET)
	@ResponseBody
    public String recuperarListaFuncionariosPorDepartamento(@PathVariable Integer id) {
		Optional<Cargo> buscarPorId = cargoRepository.findById(id);
		Funcionario mostraNome = buscarPorId.get().getFuncionarios().get(id);		
		return mostraNome.getCargo().getNome().toString();
    }

}
