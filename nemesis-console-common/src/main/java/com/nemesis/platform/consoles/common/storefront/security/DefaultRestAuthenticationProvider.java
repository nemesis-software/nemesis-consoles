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
package com.nemesis.platform.consoles.common.storefront.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;

import javax.annotation.Resource;
import java.nio.charset.Charset;
import java.security.cert.CertificateException;

/**
 * @version $Id$
 */
public class DefaultRestAuthenticationProvider implements AuthenticationProvider {

    protected final Logger LOG = LogManager.getLogger(getClass());

    @Resource(name = "restBaseUrl")
    private String restBaseUrl;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        final String username = (String) authentication.getPrincipal();
        final String password = (String) authentication.getCredentials();

        final UserData userData;
        try {
            TrustStrategy acceptingTrustStrategy = new TrustStrategy() {
                @Override
                public boolean isTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                    return true;
                }
            };
            SSLSocketFactory sf = new SSLSocketFactory(acceptingTrustStrategy, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
            SchemeRegistry registry = new SchemeRegistry();
            registry.register(new Scheme("https", 8112, sf));
            ClientConnectionManager ccm = new PoolingClientConnectionManager(registry);

            DefaultHttpClient httpclient = new DefaultHttpClient(ccm);

            /**
             * It can't be POST because the CSRF is triggered.
             */
            HttpGet httpGet = new HttpGet(getRestBaseUrl() + "auth");

            LOG.debug("Calling: " + getRestBaseUrl() + "auth");

            httpGet.setHeader("X-Nemesis-Username", username);
            httpGet.setHeader("X-Nemesis-Password", password);

            HttpResponse response2 = httpclient.execute(httpGet);
            HttpEntity entity2 = response2.getEntity();
            final String response = EntityUtils.toString(entity2, Charset.defaultCharset());
            LOG.info(response);
            ObjectMapper mapper = new ObjectMapper();
            userData = mapper.readValue(response, UserData.class);
            if (userData.getToken() == null) {
                throw new BadCredentialsException("Invalid username/password");
            }

            final ConsoleUserPrincipal principal =
                            new ConsoleUserPrincipal(userData.getUsername(), password, AuthorityUtils.createAuthorityList(userData.getAuthorities()));
            principal.setExpiryTime(userData.getExpiryTime());
            principal.setToken(userData.getToken());

            return new UsernamePasswordAuthenticationToken(principal, password, principal.getAuthorities());
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            throw new InternalAuthenticationServiceException(e.getMessage());
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }

    /* getters/setters */

    public String getRestBaseUrl() {
        return restBaseUrl;
    }

    public void setRestBaseUrl(String restBaseUrl) {
        this.restBaseUrl = restBaseUrl;
    }
}
