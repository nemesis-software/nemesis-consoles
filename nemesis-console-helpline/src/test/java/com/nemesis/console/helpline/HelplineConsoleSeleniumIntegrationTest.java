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
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Master selenium test-case for the helpline console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
public class HelplineConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    @BeforeClass
    public static void setUpClass() throws Exception {
        AbstractCommonConsoleSeleniumInterationTest.setUpClass();
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

        waitForDom();
        waitForLoad();
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
        getWebDriver().findElementById("app-header-logout").click();
        Thread.sleep(500);
        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().quit();
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
