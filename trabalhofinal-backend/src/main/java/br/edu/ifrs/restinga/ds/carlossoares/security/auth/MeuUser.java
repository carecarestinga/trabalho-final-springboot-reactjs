package br.edu.ifrs.restinga.ds.carlossoares.security.auth;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import br.edu.ifrs.restinga.ds.carlossoares.model.Usuario;

/**
*
* @author carecarestinga
*/

public class MeuUser extends User {
    private Usuario usuario;
    public MeuUser(Usuario usuario) {
        super(usuario.getLogin(),
                usuario.getSenha(),
                AuthorityUtils.createAuthorityList(
                    usuario.getPermissoes().toArray(new String[]{})));
        this.usuario=usuario;
    }
    public Usuario getUsuario() {
        return usuario;
    }
}
