package com.nemesis.console.common;

import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * @author Petar Tahchiev
 * @since 1.0
 */
@Configuration
public class CommonConsoleTestConfig {

    public static final Integer WEB_DRIVER_IMPLICIT_WAIT_IN_SECONDS = 15;

    @Bean
    public RemoteWebDriver defaultFirefoxWebDriver() {
        DesiredCapabilities capabilities = DesiredCapabilities.firefox();
        capabilities.setJavascriptEnabled(true);
        capabilities.setCapability("acceptSslCerts", true);
        final FirefoxProfile firefoxProfile = new FirefoxProfile();
        firefoxProfile.setPreference("xpinstall.signatures.required", false);
        capabilities.setCapability(FirefoxDriver.PROFILE, firefoxProfile);
        RemoteWebDriver webDriver = new FirefoxDriver(capabilities);
        webDriver.manage().window().maximize();
        //workaround to wait when some element is not visible instead of calling implicitly wait on 1000 places.
        webDriver.manage().timeouts().implicitlyWait(WEB_DRIVER_IMPLICIT_WAIT_IN_SECONDS, TimeUnit.SECONDS);

        return webDriver;
    }
}
