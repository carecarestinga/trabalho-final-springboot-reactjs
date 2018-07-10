package br.edu.ifrs.restinga.ds.carlossoares.security.auth;


import static br.edu.ifrs.restinga.ds.carlossoares.controller.UsuarioController.SEGREDO;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import br.edu.ifrs.restinga.ds.carlossoares.model.Usuario;
import br.edu.ifrs.restinga.ds.carlossoares.repository.UsuarioRepository;

public class FiltroPorToken 
        extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
            HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String token;
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        } else {
            token = request.getParameter("token");
        }
        if (token != null && !token.isEmpty()) {
            Algorithm algorithm = Algorithm. HMAC256(SEGREDO);
            DecodedJWT decode = JWT.require(algorithm).build().verify(token);
            Integer id = decode.getClaim("id").asInt();
            Usuario usuario = usuarioRepository.findById(id).get();
            MeuUser usuarioAut = new MeuUser(usuario);
            UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(usuarioAut
                            , null, usuarioAut.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        chain.doFilter(request, response);
    }
    UsuarioRepository usuarioRepository;

    public FiltroPorToken(UsuarioRepository usuarioRepository) {
        super();
        this.usuarioRepository = usuarioRepository;

    }

}
