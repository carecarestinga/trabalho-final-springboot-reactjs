package br.edu.ifrs.restinga.ds.carlossoares.config;


import static br.edu.ifrs.restinga.ds.carlossoares.controller.UsuarioController.PASSWORD_ENCODER;
import java.util.Arrays;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import br.edu.ifrs.restinga.ds.carlossoares.model.Usuario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.UsuarioRepository;

/**
*
* @author carecarestinga
*/

@Component
public class Inicializador {
	
    @Autowired
    UsuarioRepository usuarioRepository;

    @PostConstruct
    public void init() {
        Usuario usuarioRoot = usuarioRepository.findByLogin("admin");
        if (usuarioRoot == null) {
            usuarioRoot = new Usuario();
            usuarioRoot.setNome("admin");
            usuarioRoot.setLogin("admin");
            usuarioRoot.setEmail("admin@admin.com");
            usuarioRoot.setSenha(PASSWORD_ENCODER.encode("12345"));
            usuarioRoot.setPermissoes(Arrays.asList("administrador" ));
            usuarioRepository.save(usuarioRoot);
        }
    }
}
