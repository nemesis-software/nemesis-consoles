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

import com.nemesis.console.cms.CmsConsoleApplication;
import com.nemesis.console.common.AbstractCommonConsoleSeleniumIntegrationTest;
import com.nemesis.console.common.CommonConsoleTestConfig;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * A selenium test-case for the cms console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
@TestExecutionListeners(listeners = { CmsConsoleSeleniumIntegrationTest.class, DependencyInjectionTestExecutionListener.class })
@SpringApplicationConfiguration(classes = { CommonConsoleTestConfig.class, CmsConsoleApplication.class })
public class CmsConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumIntegrationTest {

    @Override
    public void beforeTestClass(TestContext testContext) throws Exception {

        super.webDriver = testContext.getApplicationContext().getBean(RemoteWebDriver.class);

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
    public void testHeaderLinkReloadsPage() {
        getWebDriver().findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().startsWith("CMS Console | Nemesis");
        });
    }

    @Test
    public void testChangeLocale() throws InterruptedException {
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

    //#82
    @Test
    public void testOpenEditFilterWindow() throws InterruptedException {
        testEntityWindowMustNotShowEmpty();
        List<WebElement> tabs = getWebDriver().findElement(By.cssSelector("div[id^='tabbar-']")).findElements(By.cssSelector("a.x-tab"));
        WebElement filtersTab = null;
        for (WebElement tab : tabs) {
            if ("Filters".equals(tab.getText())) {
                filtersTab = tab;
                break;
            }
        }
        assertNotNull(filtersTab);
        filtersTab.click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("td .x-grid-cell-first")));
        WebElement filter = getWebDriver().findElement(By.cssSelector("td .x-grid-cell-first"));
        rightClick(filter);

        assertTrue(existsElement(".collection-field-context-menu:not([style*='visibility: hidden'])"));
        WebElement widgetContextMenu = getWebDriver().findElement(By.cssSelector(".collection-field-context-menu:not([style*='visibility: hidden'])"));
        assertNotNull(widgetContextMenu);
        List<WebElement> menuElements = widgetContextMenu.findElements(By.cssSelector(".x-menu-item"));

        assertNotNull(menuElements);
        assertTrue(1 < menuElements.size());

        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-link")).click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div#w_id_cms-normal-filter")));
        assertTrue(existsElement("div#w_id_cms-normal-filter"));
        WebElement filterWindow = getWebDriver().findElement(By.cssSelector("div#w_id_cms-normal-filter"));
        assertNotNull(filterWindow);
    }

    //#84
    @Test
    public void testChangeSiteAndAutoSelectCorrespondingCatalogs() {
        getWebDriver().executeScript("var c = Ext.getCmp('site-combo'), " +
                                                     "store = c.getStore()," +
                                                     "record = store.findRecord('code', 'nemesis');" +
                                                     "c.setValue(record.get('id')); " +
                                                     "c.fireEvent('change', c, record.get('id'));");

        // Waiting for Catalogs Combo change listeners to be called and change the iframe url.
        getWait().until((WebDriver input) -> input.findElement(By.id("website-iframe")).getAttribute("src").endsWith("catalogs=nemesisContent"));
    }

    //#97
    @Test
    public void testEntityWindowMustNotShowEmpty() {
        getWait().until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("website-iframe")));

        assertTrue(existsElement("a[name='sa-normal-logo']"));
        WebElement logo = getWebDriver().findElement(By.cssSelector("a[name='sa-normal-logo']"));
        rightClick(logo);

        getWebDriver().switchTo().parentFrame();

        assertTrue(existsElement(".widget-context-menu:not([style*='visibility: hidden'])"));

        WebElement widgetContextMenu = getWebDriver().findElement(By.cssSelector(".widget-context-menu:not([style*='visibility: hidden'])"));

        assertNotNull(widgetContextMenu);

        List<WebElement> menuElements = widgetContextMenu.findElements(By.cssSelector(".x-menu-item"));

        assertNotNull(menuElements);
        assertTrue(1 < menuElements.size());

        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));
        WebElement entityWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
        assertNotNull(entityWindow);

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='tabbar-']")));

        assertTrue(existsElement("div[id^='tabbar-']"));

        List<WebElement> tabs = getWebDriver().findElement(By.cssSelector("div[id^='tabbar-']")).findElements(By.cssSelector("a.x-tab"));

        assertTrue(1 < tabs.size());
    }

    //#100
    @Test
    public void testCatalogableWidgetsMustShowSynchronizeButton() {
        getWait().until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("website-iframe")));

        assertTrue(existsElement("a[name='sa-normal-logo']"));
        WebElement logo = getWebDriver().findElement(By.cssSelector("a[name='sa-normal-logo']"));
        rightClick(logo);

        getWebDriver().switchTo().parentFrame();

        assertTrue(existsElement(".widget-context-menu:not([style*='visibility: hidden'])"));

        WebElement widgetContextMenu = getWebDriver().findElement(By.cssSelector(".widget-context-menu:not([style*='visibility: hidden'])"));

        assertNotNull(widgetContextMenu);

        List<WebElement> menuElements = widgetContextMenu.findElements(By.cssSelector(".x-menu-item"));

        assertNotNull(menuElements);
        assertTrue(1 < menuElements.size());

        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));
        WebElement entityWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
        assertNotNull(entityWindow);

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("a.synchronize-btn")));

        assertTrue(existsElement("a.synchronize-btn"));
    }
}
