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
import br.edu.ifrs.restinga.ds.carlossoares.exception.RequisicaoInvalida;
import br.edu.ifrs.restinga.ds.carlossoares.model.Funcionario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.CargoRepository;
import br.edu.ifrs.restinga.ds.carlossoares.repository.FuncionarioRepository;


/**
*
* @author carecarestinga
*/

@RestController
@RequestMapping("/api")
public class FuncionarioController {

	@Autowired
	FuncionarioRepository funcionarioRepository;
	
	@Autowired
	CargoRepository cargoRepository;

	@RequestMapping(path = "/funcionarios/", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Iterable<Funcionario> listarTodosFuncionarios(@RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao) {
		return funcionarioRepository.findAll(PageRequest.of(pagina, 
                tamanho,Sort.Direction.valueOf(direcao), ordem));
	}


    @RequestMapping(path = "/funcionarios/pesquisar/nome", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Funcionario> pesquisarNome(
            @RequestParam(required = false) String igual,
            @RequestParam(required = false) String contem,
            @RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao

            
            ) {
        if (igual != null && !igual.isEmpty()) {
            return funcionarioRepository.findByNome(igual,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));
        } else {
            return funcionarioRepository.findByNomeContaining(contem,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));

        }
    }

    @RequestMapping(path = "/funcionarios/pesquisar/salario", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Funcionario> pesquisarSalario(
            @RequestParam(required = false) Float igual,
            @RequestParam(required = false) Float intervaloInicial,
            @RequestParam(required = false) Float intervaloFinal) {
        if(igual!=null) {
            return funcionarioRepository.findBySalario(igual);
        } else if(intervaloInicial!=null&&intervaloFinal!=null) {
            System.out.println("Aqui: maior:"+intervaloInicial+" menor:"+intervaloFinal);
            return funcionarioRepository.findBySalarioBetween(intervaloInicial, intervaloFinal);
        } else if(intervaloInicial!=null) {
            return funcionarioRepository.findBySalarioGreaterThanEqual(intervaloInicial);
        } else if(intervaloFinal!=null){
            return funcionarioRepository.findBySalarioLessThanEqual(intervaloFinal);
        } else {
            throw new RequisicaoInvalida("Erro: informar igual ou maior");
        }
    }

	@RequestMapping(path = "/funcionarios/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Funcionario recuperarFuncionario(@PathVariable Integer id) {

		Optional<Funcionario> findById = funcionarioRepository.findById(id);
		if (findById.isPresent()) {
			return findById.get();
		} else {
			throw new NaoEncontrado("Não encontrado");

		}
	}

	@RequestMapping(path = "/funcionarios/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Funcionario adicionarFuncionario(@RequestBody Funcionario funcionario) {
		funcionario.setId(0);

		if (funcionario.getSalario() <= 700) {
			throw new RequisicaoInvalida("Valor deve ser maior que 1000");
		}

		Funcionario funcionarioComId = funcionarioRepository.save(funcionario);
		return funcionarioComId;
	}

	@RequestMapping(path = "/funcionarios/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizarFuncionario(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
		if (funcionario.getSalario() <= 0) {
			throw new RequisicaoInvalida("Valor deve ser maior que 0");
		}
		Optional<Funcionario> optionalFuncionarioBanco = funcionarioRepository.findById(id);
		if (!optionalFuncionarioBanco.isPresent())
			throw new NaoEncontrado("ID não encontrada");
		Funcionario funcionarioBanco = optionalFuncionarioBanco.get();
		funcionarioBanco.setNome(funcionario.getNome());
		funcionarioBanco.setEmail(funcionario.getEmail());
		funcionarioBanco.setSalario(funcionario.getSalario());
		funcionarioBanco.setDepartamento(funcionario.getDepartamento());
		funcionarioBanco.setCargo(funcionario.getCargo());
		funcionarioBanco.setUsuario(funcionario.getUsuario());
		funcionarioRepository.save(funcionarioBanco);
	}

	@RequestMapping(path = "/funcionarios/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluirFuncionario(@PathVariable Integer id) {
		if (!funcionarioRepository.existsById(id)) {
			throw new NaoEncontrado("ID não encontrada");
		}
		funcionarioRepository.deleteById(id);
	}
	
	@RequestMapping(value = "/funcionarios/{id}/nome", method = RequestMethod.GET)
	public String buscarFuncionarioIdPorNome(@PathVariable("id") Integer id) {
		return this.recuperarFuncionario(id).getNome();
	}
	
	@RequestMapping(value = "/funcionarios/{id}/cargo/", method = RequestMethod.GET)
	public String buscarFuncionarioIdPorCargo(@PathVariable("id") Integer id) {
		return this.recuperarFuncionario(id).getCargo().getNome();
	}
	
	@RequestMapping(value = "/funcionarios/{id}/departamento", method = RequestMethod.GET)
	public String buscarFuncionarioIdPorDepartamento(@PathVariable("id") Integer id) { 	
		return this.recuperarFuncionario(id).getDepartamento().getNome();
	}
	
	@RequestMapping(value = "/funcionarios/{id}/nome/cargo", method = RequestMethod.GET)
	public String buscarFuncionarioIdPorNome_Cargo(@PathVariable("id") Integer id) {
		String mostraNomeCargo = ( this.recuperarFuncionario(id).getNome() + " e " 
				+ this.recuperarFuncionario(id).getCargo().getNome());
		
		return mostraNomeCargo;
	}
	

}
