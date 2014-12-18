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

import java.io.Serializable;

/**
 * @version $Id$
 */
public class UserData implements Serializable {

    private String username;

    private String token;

    private String[] authorities;

    private Long expiryTime;

    /* getters/setters */

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String[] getAuthorities() {
        return authorities != null ? authorities.clone() : null;
    }

    public void setAuthorities(String[] authorities) {
        if (authorities != null) {
            this.authorities = authorities.clone();
        }
    }

    public Long getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Long expiryTime) {
        this.expiryTime = expiryTime;
    }
}
