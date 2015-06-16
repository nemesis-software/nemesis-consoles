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
package com.nemesis.console.helpline;

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
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Master selenium test-case for the helpline console.
 *
 * @author Petar Tahchiev
 */
public class HelplineConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    public static RemoteWebDriver driver;

    @BeforeClass
    public static void setUp() throws Exception {
        driver = new FirefoxDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:8080/helpline");

        assertEquals("Login Page", driver.getTitle());

        driver.findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        driver.findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        driver.findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().toLowerCase().startsWith("helpline console | nemesis");
            }
        });

        assertEquals("helpline console | nemesis", driver.getTitle().toLowerCase());

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
    public void testOrdersSearch() throws Exception {
        driver.findElementById("ordersPanel_header").click();
        Thread.sleep(500);

        driver.findElementByName("orderNumber").sendKeys("00000");
        driver.findElementById("orderSearchBtn").click();
        Thread.sleep(2500);

        assertNotNull("Popup not found", driver.findElementById("ordersResultsWindow"));
        //assertNotNull("Label not found", driver.findElementById("noResultsFoundLabel"));
        Thread.sleep(500);

        driver.findElementByCssSelector("div#ordersResultsWindow_header-targetEl .x-tool-close").click();
    }

    @Test
    public void testCusomersSearch() throws Exception {
        driver.findElementById("customersPanel_header").click();
        Thread.sleep(500);

        driver.findElementByName("user").sendKeys("admin");
        driver.findElementById("userSearchBtn").click();
        Thread.sleep(2500);

        assertNotNull("Popup not found", driver.findElementById("customersResultsWindow"));
        assertTrue("Admin user not found", driver.findElementsByCssSelector("div#customersResultsWindow table.x-grid-item").size() > 0);
        Thread.sleep(500);

        driver.findElementByCssSelector("div#customersResultsWindow_header-targetEl .x-tool-close").click();
    }

}
