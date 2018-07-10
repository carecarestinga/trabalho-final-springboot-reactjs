package br.edu.ifrs.restinga.ds.carlossoares.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.edu.ifrs.restinga.ds.carlossoares.exception.NaoEncontrado;
import br.edu.ifrs.restinga.ds.carlossoares.exception.Proibido;
import br.edu.ifrs.restinga.ds.carlossoares.model.Usuario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.UsuarioRepository;
import br.edu.ifrs.restinga.ds.carlossoares.security.auth.MeuUser;

/**
 *
 * @author carecarestinga
 */

@RestController
@RequestMapping(path = "/api")
public class UsuarioController {

	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@PreAuthorize("hasAuthority('administrador')")
	@RequestMapping(path = "/usuarios/", method = RequestMethod.GET)
	public Iterable<Usuario> listarTodosUsuarios(@RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao) {
		return usuarioRepository.findAll(PageRequest.of(pagina, 
                tamanho,Sort.Direction.valueOf(direcao), ordem));
	}
	
    @RequestMapping(path = "/usuarios/pesquisar/nome", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Usuario> pesquisarUsuarioPorNome(
            @RequestParam(required = false) String igual,
            @RequestParam(required = false) String contem,
            @RequestParam Integer pagina, 
            @RequestParam Integer tamanho,
            @RequestParam(required = false, defaultValue = "id") String ordem,
            @RequestParam(required = false, defaultValue = "ASC") String direcao

            
            ) {
        if (igual != null && !igual.isEmpty()) {
            return usuarioRepository.findByNome(igual,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));
        } else {
            return usuarioRepository.findByNomeContaining(contem,
                    PageRequest.of(pagina, tamanho,Sort.Direction.valueOf(direcao), ordem));

        }
    }

	@RequestMapping(path = "/usuarios/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario inserir(@AuthenticationPrincipal MeuUser usuarioAut, @RequestBody Usuario usuario) {
		usuario.setId(0);
		usuario.setSenha(PASSWORD_ENCODER.encode(usuario.getNovaSenha()));

		if (usuarioAut == null || !usuarioAut.getUsuario().getPermissoes().contains("administrador")) {
			ArrayList<String> permissao = new ArrayList<String>();
			permissao.add("usuario");
			usuario.setPermissoes(permissao);
		}
		Usuario usuarioSalvo = usuarioRepository.save(usuario);
		return usuarioSalvo;
	}



	@RequestMapping(path = "/usuarios/{id}", method = RequestMethod.GET)
	public Usuario recuperar(@AuthenticationPrincipal MeuUser usuarioAut, @PathVariable Integer id) {
		if (usuarioAut.getUsuario().getId() == id
				|| usuarioAut.getUsuario().getPermissoes().contains("administrador")) {
			return usuarioRepository.findById(id).get();
		} else {
			throw new Proibido("Não é permitido acessar dados de outro usuários");
		}
	}

	@RequestMapping(path = "/usuarios/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void atualizar(@PathVariable Integer id, @RequestBody Usuario usuario) {
		if (usuarioRepository.existsById(id)) {
			usuario.setId(id);
			usuarioRepository.save(usuario);
		}
	}

	@RequestMapping(path = "/usuarios/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void apagar(@PathVariable Integer id) {
		if (usuarioRepository.existsById(id)) {
			usuarioRepository.deleteById(id);
		}

	}

	public static final String SEGREDO = "string grande para c*, usada como chave para assinatura! Queijo!";

	@RequestMapping(path = "/usuarios/login/", method = RequestMethod.GET)
	public ResponseEntity<Usuario> loginToken(@RequestParam String usuario, @RequestParam String senha)
			throws UnsupportedEncodingException {
		Usuario usuarioBanco = usuarioRepository.findByLogin(usuario);
		if (usuarioBanco != null) {
			boolean achou = PASSWORD_ENCODER.matches(senha, usuarioBanco.getSenha());
			if (achou) {
				Algorithm algorithm = Algorithm.HMAC256(SEGREDO);
				Calendar agora = Calendar.getInstance();
				agora.add(Calendar.MINUTE, 4);
				Date expira = agora.getTime();
				String token = JWT.create().withClaim("id", usuarioBanco.getId()).withExpiresAt(expira).sign(algorithm);
				HttpHeaders respHeaders = new HttpHeaders();
				respHeaders.set("token", token);
				return new ResponseEntity<>(usuarioBanco, respHeaders, HttpStatus.OK);
			}
		}
		throw new NaoEncontrado("Usuário e/ou senha incorreto(s)");
		// return usuarioAut.getUsuario();
	}

}
