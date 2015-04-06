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

import java.util.List;

import com.nemesis.console.common.AbstractCommonConsoleSeleniumInterationTest;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Master selenium test-case for the admin console.
 *
 * @version $Id$
 */
public class AdminConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    public static RemoteWebDriver driver;

    @BeforeClass
    public static void setUp() throws Exception {
        driver = new FirefoxDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:8080/admin");

        assertEquals("Login Page", driver.getTitle());

        driver.findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        driver.findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        driver.findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().toLowerCase().startsWith("admin console | nemesis");
            }
        });

        assertEquals("admin console | nemesis", driver.getTitle().toLowerCase());

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
    public void testPlatformInfoPortlet() throws Exception {
    	// get the size of elements in both columns of application tab
    	int applicationTabProperties = driver.findElementsByCssSelector("div#portlet-platform-info-body #applicationTabPropertyColumnId label").size();
    	int applicationTabValues = driver.findElementsByCssSelector("div#portlet-platform-info-body #applicationTabValueColumnId label").size();
    	
    	// assert that there are one or more items and the number of properties is equal to the number of values for them
    	assertTrue(applicationTabProperties > 0);
    	assertTrue(applicationTabValues > 0);
    	assertEquals(applicationTabProperties, applicationTabValues);
    	
    	driver.findElementByXPath("//span[@class='x-tab-inner-default']|//span[contains(text(),'Platform')]").click();
    	Thread.sleep(500);
    	
    	// get the size of elements in both columns of platform tab
    	int platformTabProperties = driver.findElementsByCssSelector("div#portlet-platform-info-body #platformTabPropertyColumnId label").size();
    	int platformTabValues = driver.findElementsByCssSelector("div#portlet-platform-info-body #platformTabValueColumnId label").size();
    	
    	// assert that there are one or more items and the number of properties is equal to the number of values for them
    	assertTrue(platformTabProperties > 0);
    	assertTrue(platformTabValues > 0);
    	assertEquals(platformTabProperties, platformTabValues);
    }
    
    @Test
    public void testSystemPropertiesPortlet() throws InterruptedException {
    	int itemsInitialSize = driver.findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size();
    	
    	// assure that items have loaded from back-end
    	assertTrue(itemsInitialSize>0);
    	
    	// find items by key & test their size
        driver.findElementByCssSelector("input[id^='system-properties-filter-input']").sendKeys("project.home");
        Thread.sleep(500);
        assertEquals(4, driver.findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size());
        
        // remove filter & assure that size of items shown is the same as before
        driver.findElementById("system-properties-filter-trigger-clear").click();
        Thread.sleep(500);
        assertEquals(itemsInitialSize, driver.findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size());
        
        // TODO test add/save/delete functionality when ready
        // driver.findElementByCssSelector("div#system-properties-grid-body table.x-grid-item td.x-grid-cell").click();
        // driver.findElementByCssSelector("span[id^='system-properties-delete-btn']").click();
        // assertEquals(3, driver.findElementsByCssSelector("table.x-grid-item").size());
        // driver.findElementByCssSelector("span[id^='system-properties-save-btn']").click();
        // assertEquals(3, driver.findElementsByCssSelector("table.x-grid-item").size());
    }

    @Test
    public void testSpringBeansPortlet() throws InterruptedException {
    	int itemsInitialSize = driver.findElementsByCssSelector("div#spring-beans-body table.x-grid-item").size();
    	
    	// assure that items have loaded from back-end
    	assertTrue(itemsInitialSize>0);
    	
    	// find items by bean name & test their size
        driver.findElementByCssSelector("input[id^='spring-beans-filter-inputEl']").sendKeys("storefrontSecurity");
        Thread.sleep(500);
        assertEquals(3, driver.findElementsByCssSelector("div#spring-beans-body table.x-grid-item").size());
        
        // remove filter & assure that size of items shown is the same as before
        driver.findElementById("spring-beans-filter-trigger-clear").click();
        Thread.sleep(500);
        assertEquals(itemsInitialSize, driver.findElementsByCssSelector("div#spring-beans-body table.x-grid-item").size());
    }
    
    @Test
    public void testLogLevelsPortlet() throws InterruptedException {
        driver.findElementByXPath("//span[@class='x-tab-inner-default']|//span[contains(text(),'Levels')]").click();
        assertTrue(driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size() > 0);
        driver.findElementByCssSelector("input[id^='system-loggers-filter-input']").click();
        driver.findElementByCssSelector("input[id^='system-loggers-filter-input']").sendKeys("someloggerthatdoesnotexist");
        Thread.sleep(500);
        assertEquals(0, driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
        driver.findElementById("system-loggers-filter-trigger-clear").click();
        assertTrue(driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size() > 0);
        int size = driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size();
        driver.findElementByCssSelector("div#system-loggers-grid-body table.x-grid-item td.x-grid-cell").click();
        driver.findElementById("system-loggers-delete-btn").click();
        assertEquals(size - 1, driver.findElementsByCssSelector("div#system-loggers-grid-body table.x-grid-item").size());
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
        driver.executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg'}); c.fireEvent('select', c, {data : {'isoCode':'bg'}});");

        // Wait for the page to load, timeout after 5 seconds
        (new WebDriverWait(driver, 5)).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.getTitle().startsWith("Admin Console | Nemesis");
            }
        });

        assertEquals("Изход", driver.findElementById("app-header-logout").getText());

    }
    
    @Test
    public void testPortletsDropdownMenu() throws InterruptedException {
    	List<WebElement> closeButtons = (List<WebElement>) driver.findElementsByClassName("x-tool-close");
    	List<WebElement> portlets = (List<WebElement>) driver.findElementsByClassName("x-dashboard-panel");
    	
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
    	driver.findElementById("dropDownMenu").click();
    	driver.findElementById("systemPropertiesPortletBtn").click();
    	Thread.sleep(500);
    	driver.findElementById("dropDownMenu").click();
    	driver.findElementById("platformActionsPortletBtn").click();
    	Thread.sleep(500);
    	driver.findElementById("dropDownMenu").click();
    	driver.findElementById("pkAnalyzerPortletBtn").click();
    	Thread.sleep(500);
    	
    	assertEquals("block", portlets.get(0).getCssValue("display"));
    	assertEquals("block", portlets.get(3).getCssValue("display"));
    	assertEquals("block", portlets.get(4).getCssValue("display"));
    }
    
	@Test
	public void testPortletsStateIsSavedToCookie() throws InterruptedException {
		List<WebElement> closeButtons = (List<WebElement>) driver.findElementsByClassName("x-tool-close");
		List<WebElement> portlets = (List<WebElement>) driver.findElementsByClassName("x-dashboard-panel");
		List<WebElement> portletHeaders = (List<WebElement>) driver.findElementsByClassName("x-header-draggable");
		List<WebElement> columns = (List<WebElement>) driver.findElementsByClassName("x-dashboard-column");		
		
		// close portlets
		closeButtons.get(0).click();
		closeButtons.get(1).click();
		closeButtons.get(2).click();
		Thread.sleep(500);

		// check that PK Analyzer Portlet is on its default position (second column) 
		assertNotNull(columns.get(1).findElement(By.id("portlet-pk-analyzer")));
		
		// move PK Analyzer Portlet above Resource Usage Portlet (in third column)
		(new Actions(driver)).dragAndDrop(portletHeaders.get(4), portletHeaders.get(6)).perform();
		
		// Refresh page
		driver.navigate().refresh();
		
		//reinitialize objects after page refresh
		portlets = (List<WebElement>) driver.findElementsByClassName("x-dashboard-panel");
		columns = (List<WebElement>) driver.findElementsByClassName("x-dashboard-column");	
		
		// Check that closed portlets are not visible after page is reloaded (& others are visible)
		assertEquals("none", portlets.get(0).getCssValue("display"));
		assertEquals("none", portlets.get(1).getCssValue("display"));
		assertEquals("none", portlets.get(2).getCssValue("display"));
		assertEquals("block", portlets.get(3).getCssValue("display"));
		assertEquals("block", portlets.get(4).getCssValue("display"));
		
		// Check that PK Analyzer Portlet is still in third column after page has reloaded
		assertNotNull(columns.get(2).findElement(By.id("portlet-pk-analyzer")));
		
		// open the closed portlets one by one before test is finished
		driver.findElementById("dropDownMenu").click();
		driver.findElementById("systemPropertiesPortletBtn").click();
		Thread.sleep(500);
		driver.findElementById("dropDownMenu").click();
		driver.findElementById("systemLoggersPortletBtn").click();
		Thread.sleep(500);
		driver.findElementById("dropDownMenu").click();
		driver.findElementById("platformTestsPortletBtn").click();
		Thread.sleep(500);
	}
}
