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
package com.nemesis.console.backend;

import com.nemesis.console.common.AbstractCommonConsoleSeleniumInterationTest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * A selenium test-case for the backend console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
public class BackendConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    protected final Logger LOG = LogManager.getLogger(getClass());

    public static RemoteWebDriver driver;

    @BeforeClass
    public static void setUp() throws Exception {
        driver = new FirefoxDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:8080/backend");

        assertEquals("Login Page", driver.getTitle());

        driver.findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        driver.findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        driver.findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().toLowerCase().startsWith("backend console | nemesis");
            }
        });

        assertEquals("backend console | nemesis", driver.getTitle().toLowerCase());

        waitForDom();
        waitForLoad();
    }

    @Test
    public void before() {
        waitForDom();
        waitForLoad();
    }

    protected static void waitForDom() {
        driver.executeScript("Ext.onReady(function () {});");
    }

    protected static void waitForLoad() {
        ExpectedCondition<Boolean> pageLoadCondition = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver driver) {
                return ((JavascriptExecutor) driver).executeScript("return document.readyState").equals("complete");
            }
        };
        WebDriverWait wait = new WebDriverWait(driver, 30);
        wait.until(pageLoadCondition);
    }

    @AfterClass
    public static void tearDown() throws Exception {
        driver.findElementById("app-header-logout").click();
        Thread.sleep(500);
        assertEquals("Login Page", driver.getTitle());

        driver.quit();
    }

    @Test
    public void testHeaderLinkReloadsPage() throws InterruptedException {
        LOG.info("testHeaderLinkReloadsPage");
        driver.findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Backend Console | Nemesis");
            }
        });
        waitForDom();
        waitForLoad();
    }

    @Test
    public void testChangeLocale() {
        LOG.info("testChangeLocale");
        //Change locale
        driver.executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg'}); c.fireEvent('select', c, {data: {'isoCode':'bg'}});");

        // Wait for the page to load, timeout after 5 seconds
        (new WebDriverWait(driver, 5)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Backend Console | Nemesis");
            }
        });

        assertEquals("Изход", driver.findElementById("app-header-logout").getText());

    }

    @Test
    public void testFilterNavigation() throws InterruptedException {
        LOG.info("testFilterNavigation");

        Thread.sleep(1500);

        assertTrue(driver.findElementsByCssSelector("div#navigation-tree .x-grid-item").size() > 0);

        driver.findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_format");

        Thread.sleep(1500);

        assertEquals(2, driver.findElementsByCssSelector("div#navigation-tree .x-grid-item").size());

        driver.findElement(By.id("navigation-menu-filter-trigger-clear")).click();

        assertTrue(driver.findElementsByCssSelector("div#navigation-tree .x-grid-item").size() > 0);
    }

    @Test
    public void testSelectMediaContainer() throws InterruptedException {
        LOG.info("testSelectMediaContainer");

        Thread.sleep(1500);

        assertTrue(driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item").size() > 0);

        driver.findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_container");

        Thread.sleep(1500);

        assertEquals(2, driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item").size());

        driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner").get(1).click();

        assertEquals(1, driver.findElementsByCssSelector("div#tab-panel a.x-tab").size());

        driver.findElementByCssSelector("span.x-tab-close-btn").click();

        assertEquals(0, driver.findElementsByCssSelector("div#tab-panel a.x-tab").size());

        driver.findElement(By.id("navigation-menu-filter-trigger-clear")).click();
    }

    @Test
    @Ignore("https://github.com/paranoiabla/nemesis-consoles/issues/15")
    public void testFilterMediaContainer() throws InterruptedException {
        LOG.info("testFilterMediaContainer");
        assertTrue(driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item").size() > 0);

        driver.findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_container");

        Thread.sleep(1500);

        assertEquals(2, driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item").size());

        driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner").get(1).click();

        assertEquals(1, driver.findElementsByCssSelector("div#tab-panel a.x-tab").size());

        Thread.sleep(1500);

        assertEquals(1, driver.findElementsByCssSelector("div#media_container-searchform-fieldset-body div.x-form-item").size());

        assertEquals(10, driver.findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item").size());

        //driver.executeScript("var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg'}); c.fireEvent('select', c, {'isoCode':'bg'});");

        driver.findElementByCssSelector("div#media_container-searchform-fieldset-body div.x-form-item input[type='text']").sendKeys("default");

        driver.findElementsByCssSelector("div#media_container-search-form-fieldset-body div.x-toolbar a.x-btn").iterator().next().click();

        assertEquals(10, driver.findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item").size());
    }

}
