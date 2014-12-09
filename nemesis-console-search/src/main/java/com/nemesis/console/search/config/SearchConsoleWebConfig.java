/*
 * nemesis Platform - NExt-generation Multichannel E-commerce SYStem
 *
 * Copyright (c) 2010 - 2014 nemesis
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of nemesis
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with nemesis.
 */
package com.nemesis.console.search.config;

import com.nemesis.platform.consoles.common.storefront.SessionTimeoutCookieFilter;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import java.util.EnumSet;

public class SearchConsoleWebConfig implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
        webCtx.register(SearchConsoleMVCConfig.class);
        webCtx.register(SearchConsoleConfig.class);

        servletContext.addListener(new ContextLoaderListener(webCtx));
        
        /* Spring Delegating Dispatcher Servlet */
        Servlet dispatcherServlet = new DispatcherServlet(webCtx);
        ServletRegistration.Dynamic dispatcherServletReg = servletContext.addServlet("dispatcherServlet", dispatcherServlet);
        dispatcherServletReg.setLoadOnStartup(1);
        dispatcherServletReg.setInitParameter("contextConfigLocation", "");
        dispatcherServletReg.addMapping("/");
        
        /* Spring Security Delegating Filter */
        FilterRegistration springSecurityFilterChainReg = servletContext.addFilter("springSecurityFilterChain", DelegatingFilterProxy.class);
        springSecurityFilterChainReg.addMappingForServletNames(EnumSet.<DispatcherType>of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ERROR, DispatcherType.ASYNC), false, dispatcherServletReg.getName());

        /* Session timeout filter */
        FilterRegistration sessionTimeoutFilterChainReg = servletContext.addFilter("sessionTimeoutFilterChain", SessionTimeoutCookieFilter.class);
        sessionTimeoutFilterChainReg.addMappingForServletNames(null, false, dispatcherServletReg.getName());
    }
}
