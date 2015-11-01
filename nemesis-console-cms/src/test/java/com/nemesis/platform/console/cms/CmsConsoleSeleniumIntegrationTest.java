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
package com.nemesis.platform.console.cms;

import com.nemesis.console.common.AbstractCommonConsoleSeleniumInterationTest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;

/**
 * A selenium test-case for the cms console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
public class CmsConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    protected final Logger LOG = LogManager.getLogger(getClass());

    @BeforeClass
    public static void setUpClass() throws Exception {
        AbstractCommonConsoleSeleniumInterationTest.setUpClass();
        getWebDriver().manage().window().maximize();
        getWebDriver().get("http://localhost:8080/cms");

        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        getWebDriver().findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        getWebDriver().findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().toLowerCase().startsWith("cms console | nemesis");
        });

        assertEquals("cms console | nemesis", getWebDriver().getTitle().toLowerCase());

        waitForDom();
        waitForLoad();
    }

    @Before
    public void setUp() {
        waitForDom();
        waitForLoad();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
    }

    @Override
    protected void tearDown() {

    }

    @AfterClass
    public static void tearDownClass() throws Exception {
        getWebDriver().findElementById("app-header-logout").click();
        Thread.sleep(500);
        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().quit();
    }

    @Test
    public void testHeaderLinkReloadsPage() {
        LOG.info("Header link reloads page");
        getWebDriver().findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().startsWith("CMS Console | Nemesis");
        });
    }

    @Test
    public void testChangeLocale() throws InterruptedException {
        LOG.info("Change locale");
        //Change locale
        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg_BG'}); c.fireEvent('select', c, {data : {'isoCode':'bg_BG'}});");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
        assertEquals("Изход", getWebDriver().findElementById("app-header-logout").getText());

        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'en_GB'}); c.fireEvent('select', c, {data : {'isoCode':'en_GB'}});");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
        assertEquals("Logout", getWebDriver().findElementById("app-header-logout").getText());

    }

    @Test
    public void testChangeSiteAndAutoSelectCorrespondingCatalogs() throws Exception{
        LOG.info("Change Site and Auto Select Coresponding Catalogs");

        getWebDriver().executeScript(
                "var c = Ext.getCmp('site-combo'); c.setValue('70933412403392736'); c.fireEvent('change', c, '70933412403392736');");

        // Wait for Catalogs Combo change listeners to be called and change the iframe url.
        getWebDriver().manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);

        WebElement webSiteIframeWebEl = getWebDriver().findElementById("website-iframe");
        String expectedUrl = "https://www.solarapparel.com/?site=nemesis&live_edit_view=true&site_preference=normal&clear=true&catalogs=nemesisContent";
        assertEquals(expectedUrl, webSiteIframeWebEl.getAttribute("src"));
    }

}
