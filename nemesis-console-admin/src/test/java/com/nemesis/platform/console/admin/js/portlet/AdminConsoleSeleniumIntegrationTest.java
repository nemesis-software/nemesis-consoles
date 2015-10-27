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

import com.nemesis.console.common.AbstractCommonConsoleSeleniumInterationTest;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Master selenium test-case for the admin console.
 *
 * @version $Id$
 */
public class AdminConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    @BeforeClass
    public static void setUpClass() throws Exception {
        AbstractCommonConsoleSeleniumInterationTest.setUpClass();
        getWebDriver().manage().window().maximize();
        getWebDriver().get("http://localhost:8080/admin");

        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        getWebDriver().findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        getWebDriver().findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().toLowerCase().startsWith("admin console | nemesis");
        });

        assertEquals("admin console | nemesis", getWebDriver().getTitle().toLowerCase());

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
    public void testPkAnalyzerPortlet() throws Exception {
        getWebDriver().findElementById("pk-input-field-inputEl").sendKeys("563567378827168");
        getWebDriver().findElementById("decode-pk-button").click();
        Thread.sleep(1500);
        assertEquals("2", getWebDriver().findElementById("pk-input-field-inputEl").getAttribute("value"));
    }

    @Test
    public void testThreadDumpPortlet() throws InterruptedException {
        getWebDriver().findElementById("platform-actions-thread-dump").click();
        Thread.sleep(1500);
        getWebDriver().findElementByCssSelector("div#threadDumpResultWindow img.x-tool-close").click();
        Thread.sleep(500);
        assertTrue(getWebDriver().findElementsById("threadDumpResultWindow").size() == 0);
    }

    @Test
    public void testPlatformInfoPortlet() throws Exception {
        // get the size of elements in both columns of application tab
        int applicationTabProperties = getWebDriver().findElementsByCssSelector("div#portlet-platform-info-body #applicationTabPropertyColumnId label").size();
        int applicationTabValues = getWebDriver().findElementsByCssSelector("div#portlet-platform-info-body #applicationTabValueColumnId label").size();

        // assert that there are one or more items and the number of properties is equal to the number of values for them
        assertTrue(applicationTabProperties > 0);
        assertTrue(applicationTabValues > 0);
        assertEquals(applicationTabProperties, applicationTabValues);

        getWebDriver().findElementByXPath("//span[@class='x-tab-inner-default']|//span[contains(text(),'Platform')]").click();
        Thread.sleep(500);

        // get the size of elements in both columns of platform tab
        int platformTabProperties = getWebDriver().findElementsByCssSelector("div#portlet-platform-info-body #platformTabPropertyColumnId label").size();
        int platformTabValues = getWebDriver().findElementsByCssSelector("div#portlet-platform-info-body #platformTabValueColumnId label").size();

        // assert that there are one or more items and the number of properties is equal to the number of values for them
        assertTrue(platformTabProperties > 0);
        assertTrue(platformTabValues > 0);
        assertEquals(platformTabProperties, platformTabValues);
    }

    @Test
    public void testSystemPropertiesPortlet() throws InterruptedException {
        int itemsInitialSize = getWebDriver().findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size();

        // assure that items have loaded from back-end
        assertTrue(itemsInitialSize > 0);

        // find items by key & test their size
        getWebDriver().findElementByCssSelector("input[id^='system-properties-filter-input']").sendKeys("project.home");
        Thread.sleep(500);
        assertTrue(getWebDriver().findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size() > 2);

        // remove filter & assure that size of items shown is the same as before
        getWebDriver().findElementById("system-properties-filter-trigger-clear").click();
        Thread.sleep(500);
        assertEquals(itemsInitialSize, getWebDriver().findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size());

        // TODO test add/save/delete functionality when ready
        // driver.findElementByCssSelector("div#system-properties-grid-body table.x-grid-item td.x-grid-cell").click();
        // driver.findElementByCssSelector("span[id^='system-properties-delete-btn']").click();
        // assertEquals(3, driver.findElementsByCssSelector("table.x-grid-item").size());
        // driver.findElementByCssSelector("span[id^='system-properties-save-btn']").click();
        // assertEquals(3, driver.findElementsByCssSelector("table.x-grid-item").size());
    }

    @Test
    public void testSpringBeansPortlet() throws InterruptedException {
        int itemsInitialSize = getWebDriver().findElementsByCssSelector("div#spring-beans-body table.x-grid-item").size();

        // assure that items have loaded from back-end
        assertTrue(itemsInitialSize > 0);

        // find items by bean name & test their size
        getWebDriver().findElementByCssSelector("input[id^='spring-beans-filter-inputEl']").sendKeys("storefrontSecurity");
        Thread.sleep(500);
        assertTrue(getWebDriver().findElementsByCssSelector("div#spring-beans-body table.x-grid-item").size() > 3);

        // remove filter & assure that size of items shown is the same as before
        getWebDriver().findElementById("spring-beans-filter-trigger-clear").click();
        Thread.sleep(500);
        assertEquals(itemsInitialSize, getWebDriver().findElementsByCssSelector("div#spring-beans-body table.x-grid-item").size());
    }

    @Test
    public void testLogLevelsPortlet() throws InterruptedException {
        getWebDriver().findElementByXPath("//span[@class='x-tab-inner-default']|//span[contains(text(),'Levels')]").click();
        assertTrue(getWebDriver().findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size() > 0);
        getWebDriver().findElementByCssSelector("input[id^='system-loggers-filter-input']").click();
        getWebDriver().findElementByCssSelector("input[id^='system-loggers-filter-input']").sendKeys("someloggerthatdoesnotexist");
        Thread.sleep(500);
        assertEquals(0, getWebDriver().findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
        getWebDriver().findElementById("system-loggers-filter-trigger-clear").click();
        assertTrue(getWebDriver().findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size() > 0);
        int size = getWebDriver().findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size();
        getWebDriver().findElementByCssSelector("div#system-loggers-grid-body table.x-grid-item td.x-grid-cell").click();
        getWebDriver().findElementById("system-loggers-delete-btn").click();
        assertEquals(size - 1, getWebDriver().findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
    }

    @Test
    public void testHeaderLinkReloadsPage() {
        getWebDriver().findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().startsWith("Admin Console | Nemesis");
        });
    }

    @Test
    public void testChangeLocale() {
        //Change locale
        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg_BG'}); c.fireEvent('select', c, {data : {'isoCode':'bg_BG'}});");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));

        assertEquals("Изход", getWebDriver().findElementById("app-header-logout").getText());

    }

    @Test
    public void testPortletsDropdownMenu() throws InterruptedException {
        List<WebElement> closeButtons = getWebDriver().findElementsByClassName("x-tool-close");
        List<WebElement> portlets = getWebDriver().findElementsByClassName("x-dashboard-panel");

        // close some portlets & check that they are not visible
        closeButtons.get(0).click();
        closeButtons.get(3).click();
        closeButtons.get(4).click();
        Thread.sleep(500);

        assertEquals("none", portlets.get(0).getCssValue("display"));
        assertEquals("block", portlets.get(1).getCssValue("display"));
        assertEquals("block", portlets.get(2).getCssValue("display"));
        assertEquals("none", portlets.get(3).getCssValue("display"));
        assertEquals("none", portlets.get(4).getCssValue("display"));

        // open the closed portlets one by one & check that they are visible now
        getWebDriver().findElementById("dropDownMenu").click();
        getWebDriver().findElementById("systemPropertiesPortletBtn").click();
        Thread.sleep(500);
        getWebDriver().findElementById("dropDownMenu").click();
        getWebDriver().findElementById("platformActionsPortletBtn").click();
        Thread.sleep(500);
        getWebDriver().findElementById("dropDownMenu").click();
        getWebDriver().findElementById("pkAnalyzerPortletBtn").click();
        Thread.sleep(500);

        assertEquals("block", portlets.get(0).getCssValue("display"));
        assertEquals("block", portlets.get(3).getCssValue("display"));
        assertEquals("block", portlets.get(4).getCssValue("display"));
    }

    @Test
    public void testPortletsStateIsSavedToCookie() throws InterruptedException {
        List<WebElement> closeButtons = getWebDriver().findElementsByClassName("x-tool-close");
        List<WebElement> portlets = getWebDriver().findElementsByClassName("x-dashboard-panel");
        List<WebElement> portletHeaders = getWebDriver().findElementsByClassName("x-header-draggable");
        List<WebElement> columns = getWebDriver().findElementsByClassName("x-dashboard-column");

        // close portlets
        closeButtons.get(0).click();
        closeButtons.get(1).click();
        closeButtons.get(2).click();
        Thread.sleep(500);

        // check that PK Analyzer Portlet is on its default position (second column)
        assertNotNull(columns.get(1).findElement(By.id("portlet-pk-analyzer")));

        // move PK Analyzer Portlet above Resource Usage Portlet (in third column)
        (new Actions(getWebDriver())).dragAndDrop(portletHeaders.get(4), portletHeaders.get(6)).perform();

        // Refresh page
        getWebDriver().navigate().refresh();

        //reinitialize objects after page refresh
        portlets = getWebDriver().findElementsByClassName("x-dashboard-panel");
        columns = getWebDriver().findElementsByClassName("x-dashboard-column");

        // Check that closed portlets are not visible after page is reloaded (& others are visible)
        assertEquals("none", portlets.get(0).getCssValue("display"));
        assertEquals("none", portlets.get(1).getCssValue("display"));
        assertEquals("none", portlets.get(2).getCssValue("display"));
        assertEquals("block", portlets.get(3).getCssValue("display"));
        assertEquals("block", portlets.get(4).getCssValue("display"));

        // Check that PK Analyzer Portlet is still in third column after page has reloaded
        assertNotNull(columns.get(2).findElement(By.id("portlet-pk-analyzer")));

        // open the closed portlets one by one before test is finished
        getWebDriver().findElementById("dropDownMenu").click();
        getWebDriver().findElementById("systemPropertiesPortletBtn").click();
        Thread.sleep(500);
        getWebDriver().findElementById("dropDownMenu").click();
        getWebDriver().findElementById("systemLoggersPortletBtn").click();
        Thread.sleep(500);
        getWebDriver().findElementById("dropDownMenu").click();
        getWebDriver().findElementById("platformTestsPortletBtn").click();
        Thread.sleep(500);
    }
}
