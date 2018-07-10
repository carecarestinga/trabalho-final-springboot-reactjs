package br.edu.ifrs.restinga.ds.carlossoares.security.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import br.edu.ifrs.restinga.ds.carlossoares.model.Usuario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.UsuarioRepository;

/**
*
* @author carecarestinga
*/

@Component
public class MeuUserDetailsService implements UserDetailsService {
    @Autowired
    UsuarioRepository usuarioRepository;
    @Override
    public UserDetails loadUserByUsername(String login) 
            throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByLogin(login);
        System.out.println("br.edu.ifrs.restinga.ds.carlossoares.security.auth.MeuUserDetailsService.loadUserByUsername()");
        System.out.println("aqui:"+login);
        if (usuario == null) {
            throw new UsernameNotFoundException(login + " não existe!");
        }
        System.out.println("user:"+usuario.getNome());
        try {
        MeuUser meuUser = new MeuUser(usuario);    
        return meuUser;
        } catch (Exception e) {
            e.printStackTrace();
        }
        
                return null;
        
    }
}
