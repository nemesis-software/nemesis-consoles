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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;

import javax.annotation.Resource;

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

//        final UserData userData;
        //        try {
        //            SSLContext context = SSLContexts.custom().loadTrustMaterial(null, new TrustSelfSignedStrategy()).build();
        //            SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(context, SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
        //            Registry<ConnectionSocketFactory> registry = RegistryBuilder.<ConnectionSocketFactory>create().register("https", csf).build();
        //            HttpClientConnectionManager ccm = new PoolingHttpClientConnectionManager(registry);
        //
        //            HttpClient httpclient = HttpClientBuilder.create().setConnectionManager(ccm).build();
        //
        //            /**
        //             * It can't be POST because the CSRF is triggered.
        //             */
        //            HttpGet httpGet = new HttpGet(getRestBaseUrl() + "auth");
        //
        //            LOG.debug("Calling: " + getRestBaseUrl() + "auth");
        //
        //            httpGet.setHeader("X-Nemesis-Username", username);
        //            httpGet.setHeader("X-Nemesis-Password", password);
        //
        //            HttpResponse response2 = httpclient.execute(httpGet);
        //            HttpEntity entity2 = response2.getEntity();
        //            final String response = EntityUtils.toString(entity2, Charset.defaultCharset());
        //            LOG.info(response);
        //            ObjectMapper mapper = new ObjectMapper();
        //            mapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true);
        //            userData = mapper.readValue(response, UserData.class);
        //            if (userData.getToken() == null) {
        //                throw new BadCredentialsException("Invalid username/password");
        //            }

        final ConsoleUserPrincipal principal =
                        new ConsoleUserPrincipal(username, "nimda", AuthorityUtils.createAuthorityList("ROLE_EMPLOYEEGROUP", "ROLE_ADMINGROUP"));
        principal.setExpiryTime(-1L);
        principal.setToken("");

        return new UsernamePasswordAuthenticationToken(principal, password, principal.getAuthorities());
        //        } catch (NoSuchAlgorithmException | KeyManagementException | KeyStoreException | IOException e) {
        //            LOG.error(e.getMessage(), e);
        //            throw new InternalAuthenticationServiceException(e.getMessage());
        //        }
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
