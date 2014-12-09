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
package com.nemesis.console.helpline.config;

import com.nemesis.platform.consoles.common.storefront.SessionTimeoutCookieFilter;
import org.atmosphere.cpr.ApplicationConfig;
import org.atmosphere.cpr.AtmosphereServlet;
import org.atmosphere.cpr.SessionSupport;
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

public class HelplineConsoleWebConfig implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
        webCtx.register(HelplineConsoleMVCConfig.class);
        webCtx.register(HelplineConsoleConfig.class);

        servletContext.addListener(new ContextLoaderListener(webCtx));
        servletContext.addListener(new SessionSupport());
        
        /* Spring Delegating Dispatcher Servlet */
        Servlet dispatcherServlet = new DispatcherServlet(webCtx);
        ServletRegistration.Dynamic dispatcherServletReg = servletContext.addServlet("dispatcherServlet", dispatcherServlet);
        dispatcherServletReg.setLoadOnStartup(1);
        dispatcherServletReg.setInitParameter("contextConfigLocation", "");
        dispatcherServletReg.addMapping("/");
        
        /* Atmosphere Servlet */
        ServletRegistration atmosphereServletRegistration = servletContext.addServlet("AtmosphereServlet", AtmosphereServlet.class);
        atmosphereServletRegistration.setInitParameter(ApplicationConfig.DISABLE_ONSTATE_EVENT, "true");
        atmosphereServletRegistration.setInitParameter(ApplicationConfig.PROPERTY_NATIVE_COMETSUPPORT, "true");
        //atmosphereServletRegistration.setInitParameter(ApplicationConfig.PROPERTY_SESSION_SUPPORT, "true");
        atmosphereServletRegistration.setInitParameter(ApplicationConfig.ENFORCE_ATMOSPHERE_VERSION, "false");
        atmosphereServletRegistration.setInitParameter(ApplicationConfig.BROADCASTER_CACHE, "org.atmosphere.cache.UUIDBroadcasterCache");
        atmosphereServletRegistration.setInitParameter(ApplicationConfig.ATMOSPHERE_INTERCEPTORS, "org.atmosphere.client.TrackMessageSizeInterceptor");
        atmosphereServletRegistration.addMapping("/chat/*");
        
        /* Spring Security Delegating Filter */
        FilterRegistration springSecurityFilterChainReg = servletContext.addFilter("springSecurityFilterChain", DelegatingFilterProxy.class);
        springSecurityFilterChainReg.addMappingForServletNames(EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ERROR, DispatcherType.ASYNC), false, dispatcherServletReg.getName());

        /* Session timeout filter */
        FilterRegistration sessionTimeoutFilterChainReg = servletContext.addFilter("sessionTimeoutFilterChain", SessionTimeoutCookieFilter.class);
        sessionTimeoutFilterChainReg.addMappingForServletNames(null, false, dispatcherServletReg.getName());
    }
}
