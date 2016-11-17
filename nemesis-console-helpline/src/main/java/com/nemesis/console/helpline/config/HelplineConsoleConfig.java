package com.nemesis.console.helpline.config;

import com.nemesis.platform.consoles.common.core.CommonConsoleConfig;
import com.nemesis.platform.consoles.common.core.ConsoleProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.AdviceMode;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.annotation.Resource;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = { "com.nemesis.console.helpline", "com.nemesis.platform.util" })
@Import(value = CommonConsoleConfig.class)
@EnableConfigurationProperties(ConsoleProperties.class)
@EnableGlobalMethodSecurity(prePostEnabled = true, mode = AdviceMode.PROXY)
public class HelplineConsoleConfig extends WebSecurityConfigurerAdapter {

    @Resource(name = "defaultAuthenticationFailureHandler")
    private AuthenticationFailureHandler defaultAuthenticationFailureHandler;

    @Resource(name = "defaultAccessDeniedHandler")
    private AccessDeniedHandler defaultAccessDeniedHandler;

    // @formatter:off

    @Override
    public void configure(final WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/favicon.ico", "/resources/images/*");
    }
    
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/resources/img/**").permitAll()
                .antMatchers("/chat/**").permitAll()
                .antMatchers("/console/**").hasRole("EMPLOYEEGROUP")
            .anyRequest()
                .authenticated().and()
            .formLogin()
                .loginProcessingUrl("/j_spring_security_check")
                .loginPage("/login")
                .failureHandler(defaultAuthenticationFailureHandler)
                .permitAll()
                .and()
            .logout()
                .logoutUrl("/j_spring_security_logout")
                .logoutSuccessUrl("/login")
                .permitAll()
                .and()
            .exceptionHandling().accessDeniedHandler(defaultAccessDeniedHandler);
    }
    
    // @formatter:on
}
