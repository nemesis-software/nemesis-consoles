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

import com.nemesis.console.common.AbstractCommonConsoleSeleniumIntegrationTest;
import com.nemesis.console.common.CommonConsoleTestConfig;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Master selenium test-case for the helpline console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
@TestExecutionListeners(listeners = { HelplineConsoleSeleniumIntegrationTest.class, DependencyInjectionTestExecutionListener.class })
@SpringApplicationConfiguration(classes = { CommonConsoleTestConfig.class, HelplineConsoleApplication.class })
public class HelplineConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumIntegrationTest {

    @Override
    public void beforeTestClass(TestContext testContext) throws Exception {

        super.webDriver = testContext.getApplicationContext().getBean(RemoteWebDriver.class);

        getWebDriver().manage().window().maximize();
        getWebDriver().get("http://localhost:8080/helpline");

        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        getWebDriver().findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        getWebDriver().findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().toLowerCase().startsWith("helpline console | nemesis");
        });

        assertEquals("helpline console | nemesis", getWebDriver().getTitle().toLowerCase());

        super.wait = new WebDriverWait(getWebDriver(), 15, 200);
        waitForDom();
        waitForLoad();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
    }

    @Override
    public void afterTestClass(TestContext testContext) throws Exception {
        super.webDriver = testContext.getApplicationContext().getBean(RemoteWebDriver.class);
        getWebDriver().findElementById("app-header-logout").click();

        //We need this otherwise selenium will not wait for the logout to happen and the next assert will fail
        getWait().until(ExpectedConditions.titleIs("Login Page"));
        
        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().quit();
    }

    @Before
    public void setUp() {
        LOG.info(testName.getMethodName());
        super.wait = new WebDriverWait(getWebDriver(), 15, 200);
        waitForDom();
        waitForLoad();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
    }

    @Override
    public void tearDown() {
        try {
            getWebDriver().findElementByCssSelector("div[id^='w_id_'].x-window img.x-tool-close").click();
        } catch (NoSuchElementException nsex) {
            //ignored
        }
    }

    @Test
    public void testOrdersSearch() throws Exception {
        getWebDriver().findElementById("ordersPanel_header").click();
        Thread.sleep(500);

        getWebDriver().findElementByName("orderNumber").sendKeys("00000");
        getWebDriver().findElementById("orderSearchBtn").click();
        Thread.sleep(2500);

        assertNotNull("Popup not found", getWebDriver().findElementById("ordersResultsWindow"));
        //assertNotNull("Label not found", driver.findElementById("noResultsFoundLabel"));
        Thread.sleep(500);

        getWebDriver().findElementByCssSelector("div#ordersResultsWindow_header-targetEl .x-tool-close").click();
    }

    @Test
    public void testCusomersSearch() throws Exception {
        getWebDriver().findElementById("customersPanel_header").click();
        Thread.sleep(500);

        getWebDriver().findElementByName("user").sendKeys("admin");
        getWebDriver().findElementById("userSearchBtn").click();
        Thread.sleep(2500);

        assertNotNull("Popup not found", getWebDriver().findElementById("customersResultsWindow"));
        assertTrue("Admin user not found", getWebDriver().findElementsByCssSelector("div#customersResultsWindow table.x-grid-item").size() > 0);
        Thread.sleep(500);

        getWebDriver().findElementByCssSelector("div#customersResultsWindow_header-targetEl .x-tool-close").click();
    }

}
