/*
 * nemesis Platform - NExt-generation Multichannel E-commerce SYStem
 *
 * Copyright (c) 2010 - 2013 nemesis
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of nemesis
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with nemesis.
 */
package com.nemesis.platform.console.admin.config;

import com.nemesis.platform.consoles.common.storefront.SessionTimeoutCookieFilter;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import java.util.EnumSet;

public class AdminConsoleWebConfig implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        final AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
        webCtx.register(AdminConsoleMVCConfig.class);
        webCtx.register(AdminConsoleConfig.class);

        servletContext.addListener(new ContextLoaderListener(webCtx));

        /* Spring Delegating Dispatcher Servlet */
        final Servlet dispatcherServlet = new DispatcherServlet(webCtx);
        ServletRegistration.Dynamic dispatcherServletReg = servletContext.addServlet("dispatcherServlet", dispatcherServlet);
        dispatcherServletReg.setLoadOnStartup(1);
        dispatcherServletReg.setInitParameter("contextConfigLocation", "");
        dispatcherServletReg.addMapping("/");

        /* Spring Security Delegating Filter */
        final FilterRegistration springSecurityFilterChainReg = servletContext.addFilter("springSecurityFilterChain", DelegatingFilterProxy.class);
        springSecurityFilterChainReg.addMappingForServletNames(EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ERROR, DispatcherType.ASYNC), false, dispatcherServletReg.getName());

        /* HiddenHttpMethodFilter Filter */
        final FilterRegistration hiddenHttpMethodFilterReg = servletContext.addFilter("hiddenHttpMethodFilter", HiddenHttpMethodFilter.class);
        hiddenHttpMethodFilterReg.addMappingForServletNames(null, false, dispatcherServletReg.getName());

        /* Session timeout filter */
        final FilterRegistration sessionTimeoutFilterChainReg = servletContext.addFilter("sessionTimeoutFilterChain", SessionTimeoutCookieFilter.class);
        sessionTimeoutFilterChainReg.addMappingForServletNames(null, false, dispatcherServletReg.getName());
    }
}
