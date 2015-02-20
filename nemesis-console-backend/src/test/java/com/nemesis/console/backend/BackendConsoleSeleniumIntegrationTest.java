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
import org.junit.AfterClass;
import org.junit.BeforeClass;
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

    public static RemoteWebDriver driver;

    @BeforeClass
    public static void setUp() throws Exception {
        driver = new FirefoxDriver();

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
    public void testHeaderLinkReloadsPage() {
        driver.findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Backend Console | Nemesis");
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
                return d.getTitle().startsWith("Backend Console | Nemesis");
            }
        });

        assertEquals("Изход", driver.findElementById("app-header-logout").getText());

    }

    @Test
    public void testFilterNavigation() throws InterruptedException {

        assertTrue(driver.findElementsByCssSelector("div#navigation-tree .x-grid-item").size() > 0);

        driver.findElementByCssSelector("input[id^='navigation-menu-filter']").sendKeys("media");

        Thread.sleep(500);

        assertEquals(1, driver.findElementsByCssSelector("div#navigationTree .x-grid-item").size());

        driver.findElement(By.id("navigation-menu-filter-trigger-clear")).click();

        assertTrue(driver.findElementsByCssSelector("div#navigationTree .x-grid-item").size() > 0);

        //        driver.findElement(By.xpath("(//img[contains(@src,'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')])[3]")).click();
        //        driver.findElement(By.xpath("//table[@id='treeview-1016-record-17']/tbody/tr/td/div/span")).click();
        //        driver.findElement(By.id("button-1036-btnIconEl")).click();
        //        driver.findElement(By.id("button-1036-btnIconEl")).click();
        //        driver.findElement(By.cssSelector("#ext-element-17 > div.x-grid-cell-inner.")).click();
        //        driver.findElement(By.id("menuitem-1058-iconEl")).click();
        //        driver.findElement(By.id("tool-1100-toolEl")).click();
        //        driver.findElement(By.id("button-1007-btnEl")).click();
        //        driver.findElement(By.cssSelector("#ext-element-36 > div.x-grid-cell-inner.")).click();
        //        driver.findElement(By.cssSelector("#ext-element-36 > div.x-grid-cell-inner.")).click();
        //        driver.findElement(By.id("tool-1146-toolEl")).click();
        //        driver.findElement(By.id("button-1007-btnEl")).click();
    }

}
