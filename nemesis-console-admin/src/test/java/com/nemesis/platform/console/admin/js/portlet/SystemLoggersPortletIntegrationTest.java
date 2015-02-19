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

/**
 * @version $Id$
 */
public class SystemLoggersPortletIntegrationTest extends AbstractAdminConsoleBaseIntegrationTest {

    //    private Selenium selenium;
    //
    //    private FirefoxDriver driver;
    //
    //    @Before
    //    public void setUp() throws Exception {
    //        driver = new FirefoxDriver();
    //        //        driver.setJavascriptEnabled(true);
    //
    //        //driver.waitForBackgroundJavaScriptStartingBefore(2 * DEFAULT_WAIT_TIME);
    //
    //        String baseUrl = "http://localhost:8080/admin/";
    //        selenium = new WebDriverBackedSelenium(driver, baseUrl);
    //    }
    //
    //    @Test
    //    public void testAdminConsole() throws Exception {
    //        getSelenium().open("/admin/console");
    //        assertEquals("Login Page", getSelenium().getTitle());
    //
    //        getSelenium().open("/admin/");
    //        assertEquals("Login Page", getSelenium().getTitle());
    //
    //        getSelenium().type("name=username", "admin");
    //        getSelenium().type("name=password", "nimda");
    //        getSelenium().click("name=submit");
    //
    //        getSelenium().waitForPageToLoad("3000");
    //
    //        assertEquals("Admin Console | Nemesis", getSelenium().getTitle());
    //
    //        waitForDom();
    //        waitForLoad();
    //
    //        System.out.println(driver.getPageSource());
    //
    //        // Header link
    //        getDriver().findElement(By.cssSelector("a#app-header-title")).click();
    //        //        getSelenium().click("css=a#app-header-title");
    //        getSelenium().waitForPageToLoad("5000");
    //
    //        // System Properties
    //        assertEquals(4, getSelenium().getCssCount("div#system-properties-grid-body table.x-grid-item"));
    //        getSelenium().click("css=input[id^='system-properties-filter-input']");
    //        getSelenium().typeKeys("css=input[id^='system-properties-filter-input']", "one");
    //        Thread.sleep(500);
    //        assertEquals(1, getSelenium().getCssCount("table.x-grid-item"));
    //        getSelenium().click("id=system-properties-filter-trigger-clear");
    //        Thread.sleep(500);
    //        assertEquals(4, getSelenium().getCssCount("table.x-grid-item"));
    //        getSelenium().click("css=div#system-properties-grid-body table.x-grid-item td.x-grid-cell");
    //        getSelenium().click("css=span[id^='system-properties-delete-btn']");
    //        assertEquals(3, getSelenium().getCssCount("table.x-grid-item"));
    //        getSelenium().click("css=span[id^='system-properties-save-btn']");
    //        assertEquals(3, getSelenium().getCssCount("table.x-grid-item"));
    //        // Log Levels
    //        getSelenium().click("css=span.x-tab-inner-default:contains('Levels')");
    //        assertEquals(6, getSelenium().getCssCount("table.x-grid-item"));
    //        getSelenium().click("css=span.x-tab-inner-default:contains('Levels')");
    //        assertEquals(3, getSelenium().getCssCount("div#system-loggers-grid-body table.x-grid-item"));
    //        getSelenium().click("css=input[id^='system-loggers-filter-input']");
    //        getSelenium().typeKeys("css=input[id^='system-loggers-filter-input']", "one");
    //        Thread.sleep(500);
    //        assertEquals(1, getSelenium().getCssCount("div#system-loggers-grid-body table.x-grid-item"));
    //        getSelenium().click("id=system-loggers-filter-trigger-clear");
    //        getSelenium().click("css=div#system-loggers-grid-body table.x-grid-item td.x-grid-cell");
    //        getSelenium().click("id=system-loggers-delete-btn");
    //        assertEquals(2, getSelenium().getCssCount("div#system-loggers-grid-body table.x-grid-item"));
    //        // PKAnalyzer portlet.
    //        getSelenium().typeKeys("id=pk-input-field-inputEl", "123456");
    //        getSelenium().click("id=decode-pk-button");
    //        Thread.sleep(500);
    //        assertEquals("100", getSelenium().getValue("id=pk-input-field-inputEl"));
    //        // Thread dump
    //        getSelenium().click("id=platform-actions-thread-dump");
    //        Thread.sleep(500);
    //        assertTrue(getSelenium().isElementPresent("id=threadDumpResultWindow"));
    //        assertEquals("thread dump", getSelenium().getValue("id=threaddumpResultArea-inputEl"));
    //        getSelenium().click("css=div#threadDumpResultWindow img.x-tool-close");
    //        Thread.sleep(500);
    //        assertFalse(getSelenium().isElementPresent("id=threadDumpResultWindow"));
    //        // Change locale
    //        //getSelenium().runScript("var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg'}); c.fireEvent('select', c, {'isoCode':'bg'});");
    //        //getSelenium().waitForPageToLoad("5000");
    //        //assertEquals("Изход", getSelenium().getText("id=app-header-logout"));
    //        // Logout Link
    //        getSelenium().click("id=app-header-logout");
    //        Thread.sleep(500);
    //        assertEquals("Login Page", getSelenium().getTitle());
    //    }
    //
    //    private void waitForDom() {
    //        getDriver().executeScript("Ext.onReady(function () {});");
    //    }
    //
    //    private void waitForLoad() {
    //        ExpectedCondition<Boolean> pageLoadCondition = new ExpectedCondition<Boolean>() {
    //            public Boolean apply(WebDriver driver) {
    //                return ((JavascriptExecutor) driver).executeScript("return document.readyState").equals("complete");
    //            }
    //        };
    //        WebDriverWait wait = new WebDriverWait(driver, 30);
    //        wait.until(pageLoadCondition);
    //    }
    //
    //    //    protected HtmlPage getPage(final String example, final String htmlName) throws Exception {
    //    //        final String resource = "libraries/ExtJS/" + getVersion() + "/examples/" + example + "/" + htmlName + ".html";
    //    //        final URL url = getClass().getClassLoader().getResource(resource);
    //    //        assertNotNull(url);
    //    //        webClient_ = getWebClient();
    //    //        return webClient_.getPage(url);
    //    //    }
    //
    //    @After
    //    public void tearDown() throws Exception {
    //        selenium.stop();
    //    }
    //
    //    public Selenium getSelenium() {
    //        return selenium;
    //    }
    //
    //    public FirefoxDriver getDriver() {
    //        return driver;
    //    }
}
