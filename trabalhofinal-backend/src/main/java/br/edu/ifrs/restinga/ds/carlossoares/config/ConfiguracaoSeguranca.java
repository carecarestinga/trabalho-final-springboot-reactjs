package br.edu.ifrs.restinga.ds.carlossoares.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import br.edu.ifrs.restinga.ds.carlossoares.controller.UsuarioController;
import br.edu.ifrs.restinga.ds.carlossoares.repository.UsuarioRepository;
import br.edu.ifrs.restinga.ds.carlossoares.security.auth.FiltroPorToken;
import br.edu.ifrs.restinga.ds.carlossoares.security.auth.MeuUserDetailsService;

/**
 *
 * @author caretronics
 */

@Component
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class ConfiguracaoSeguranca extends WebSecurityConfigurerAdapter {

    @Autowired
    MeuUserDetailsService detailsService;
    
    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(detailsService)
                .passwordEncoder(UsuarioController.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                //o GET login pode ser acessado sem autenticação 
                .antMatchers(HttpMethod.GET, "/api/usuarios/login/").permitAll()
                // Caso o sistema permita o autocadastro                
                .antMatchers(HttpMethod.POST, "/api/usuarios/").permitAll()
                // permite o acesso somente se autenticado
                .antMatchers("/api/**").authenticated()
                .and().httpBasic()
                 .and().
                addFilterBefore(new  FiltroPorToken(usuarioRepository)
                        , BasicAuthenticationFilter.class)
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().csrf().disable();
    }
}
