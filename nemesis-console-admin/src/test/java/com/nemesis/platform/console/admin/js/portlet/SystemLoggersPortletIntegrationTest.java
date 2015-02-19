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
package com.nemesis.platform.console.admin.js.portlet;

import com.nemesis.platform.console.admin.AbstractAdminConsoleBaseIntegrationTest;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * @version $Id$
 */
public class SystemLoggersPortletIntegrationTest extends AbstractAdminConsoleBaseIntegrationTest {

    private static RemoteWebDriver driver;

    @BeforeClass
    public static void setUp() throws Exception {

        //System.setProperty("webdriver.chrome.driver", "/home/petar/Downloads/chromedriver");

        DesiredCapabilities capabilities = DesiredCapabilities.chrome();

        //        driver = new ChromeDriver(
        //                        new ChromeDriverService.Builder().usingPort(7000).usingDriverExecutable(new File("/home/petar/Downloads/chromedriver")).build());

        driver = new FirefoxDriver();

        driver.get("http://localhost:8080/admin");
        //        driver.setJavascriptEnabled(true);

        //driver.waitForBackgroundJavaScriptStartingBefore(2 * DEFAULT_WAIT_TIME);

        assertEquals("Login Page", driver.getTitle());

        driver.findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        driver.findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        driver.findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Admin Console | Nemesis");
            }
        });

        assertEquals("Admin Console | Nemesis", driver.getTitle());

        waitForDom();
        waitForLoad();

    }

    @Test
    public void testPkAnalyzerPortlet() throws Exception {
        driver.findElementById("pk-input-field-inputEl").sendKeys("563567378827168");
        driver.findElementById("decode-pk-button").click();
        Thread.sleep(500);
        assertEquals("2", driver.findElementById("pk-input-field-inputEl").getAttribute("value"));
    }

    @Test
    public void testThreadDumpPortlet() throws InterruptedException {
        driver.findElementById("platform-actions-thread-dump").click();
        Thread.sleep(1500);
        driver.findElementByCssSelector("div#threadDumpResultWindow img.x-tool-close").click();
        Thread.sleep(500);
        assertTrue(driver.findElementsById("threadDumpResultWindow").size() == 0);
    }

    @Test
    @Ignore("Not implemented yet")
    public void testSystemPropertiesPortlet() throws InterruptedException {
        // System Properties
        assertEquals(4, driver.findElements(By.cssSelector("div#system-properties-grid-body table.x-grid-item")).size());
        driver.findElementByCssSelector("input[id^='system-properties-filter-input']").sendKeys("one");
        Thread.sleep(500);
        assertEquals(1, driver.findElementsByCssSelector("table.x-grid-item").size());
        driver.findElementById("system-properties-filter-trigger-clear").click();
        Thread.sleep(500);
        assertEquals(4, driver.findElementsByCssSelector("table.x-grid-item").size());
        driver.findElementByCssSelector("div#system-properties-grid-body table.x-grid-item td.x-grid-cell").click();
        driver.findElementByCssSelector("span[id^='system-properties-delete-btn']").click();
        assertEquals(3, driver.findElementsByCssSelector("table.x-grid-item").size());
        driver.findElementByCssSelector("span[id^='system-properties-save-btn']").click();
        assertEquals(3, driver.findElementsByCssSelector("table.x-grid-item").size());
    }

    @Test
    @Ignore("Not implemented yet")
    public void testLogLevelsPortlet() throws InterruptedException {
        driver.findElementByCssSelector("span.x-tab-inner-default:contains('Levels')").click();
        assertEquals(6, driver.findElementsByCssSelector("table.x-grid-item").size());
        driver.findElementByCssSelector("span.x-tab-inner-default:contains('Levels')").click();
        assertEquals(3, driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
        driver.findElementByCssSelector("input[id^='system-loggers-filter-input']").click();
        driver.findElementByCssSelector("input[id^='system-loggers-filter-input']").sendKeys("one");
        Thread.sleep(500);
        assertEquals(1, driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
        driver.findElementById("system-loggers-filter-trigger-clear").click();
        driver.findElementByCssSelector("div#system-loggers-grid-body table.x-grid-item td.x-grid-cell").click();
        driver.findElementById("system-loggers-delete-btn").click();
        assertEquals(2, driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
    }

    @Test
    public void testHeaderLinkReloadsPage() {
        driver.findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Admin Console | Nemesis");
            }
        });
    }

    @Test
    public void testChangeLocale() {
        //Change locale
        driver.executeScript("var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg'}); c.fireEvent('select', c, {'isoCode':'bg'});");

        // Wait for the page to load, timeout after 5 seconds
        (new WebDriverWait(driver, 5)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Admin Console | Nemesis");
            }
        });

        assertEquals("Изход", driver.findElementById("app-header-logout").getText());

    }

    private static void waitForDom() {
        driver.executeScript("Ext.onReady(function () {});");
    }

    private static void waitForLoad() {
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
}
