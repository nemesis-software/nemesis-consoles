package com.nemesis.platform.consoles.common.storefront.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * @version $Id$
 */
public class ConsoleUserPrincipal extends User {

    private Long expiryTime;

    private String token;

    public ConsoleUserPrincipal(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public Long getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Long expiryTime) {
        this.expiryTime = expiryTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    /* overriden delegates */

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsoleUserPrincipal)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }

        ConsoleUserPrincipal that = (ConsoleUserPrincipal) o;

        if (expiryTime != null ? !expiryTime.equals(that.expiryTime) : that.expiryTime != null) {
            return false;
        }
        if (token != null ? !token.equals(that.token) : that.token != null) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (expiryTime != null ? expiryTime.hashCode() : 0);
        result = 31 * result + (token != null ? token.hashCode() : 0);
        return result;
    }
}
