package com.nemesis.platform.console.admin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@EnableWebMvc
@Configuration
@ComponentScan(basePackages = { "com.nemesis.platform.console.admin.storefront" })
public class AdminConsoleMvcConfig extends WebMvcConfigurerAdapter {

    @Bean
    public MultipartResolver multipartResolver() {
        return new CommonsMultipartResolver();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/").setCachePeriod(31556926);
        registry.addResourceHandler("/favicon.ico").addResourceLocations("/");
        registry.addResourceHandler("/robots.txt").addResourceLocations("/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("/webjars/");
    }

    @Bean(name = { "defaultViewResolver", "viewResolver" })
    protected ViewResolver defaultViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(org.springframework.web.servlet.view.JstlView.class);
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");
        viewResolver.setRedirectHttp10Compatible(false);

        return viewResolver;
    }
}

