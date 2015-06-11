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
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

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
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg_BG'}); c.fireEvent('select', c, {data: {'isoCode':'bg_BG'}});");

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

        clearNavTreeFilter();

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

        clearNavTreeFilter();
    }

    @Test
    public void testFilterMediaContainer() throws InterruptedException {
        LOG.info("testFilterMediaContainer");
        assertTrue(driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item").size() > 0);

        driver.findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_container");

        Thread.sleep(1500);

        assertEquals(2, driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item").size());

        driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner").get(1).click();

        assertEquals(1, driver.findElementsByCssSelector("div#tab-panel a.x-tab").size());

        Thread.sleep(1500);

        assertEquals(1, driver.findElementsByCssSelector("div#media_container-searchform-fieldset-body div.x-form-item .field-restriction").size());

        assertEquals(10, driver.findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item").size());

        driver.executeScript(
                        "var c = Ext.getCmp('media_container-searchform-fieldset-restriction_uid'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        driver.findElementByCssSelector("div#media_container-searchform-fieldset-query_uid input[type='text']").sendKeys("default");

        driver.findElementsByCssSelector("div#media_container-search-form div.x-toolbar a.x-btn").iterator().next().click();

        Thread.sleep(1500);

        assertEquals(1, driver.findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item").size());
        
        closeEntityTab(0);

        clearNavTreeFilter();
    }

    // #41
    @Test
    public void testReopenEntityWindow() throws InterruptedException {
        LOG.info("testReopenEntityWindow");
        String entityId = "product";
        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        Thread.sleep(1500);

        openNavTreeItem(2);

        assertTrue(1 <= resultsGridItems(entityId).size());

        doubleClick(resultsGridInnerItems(entityId).get(0));

        Thread.sleep(1500);

        assertTrue(existsElement("div[id^='w_id_']"));

        closeEntityWindow();

        Thread.sleep(1500);

        assertTrue(!existsElement("div[id^='w_id_']"));

        doubleClick(resultsGridInnerItems(entityId).get(0));

        Thread.sleep(1500);

        assertTrue(existsElement("div[id^='w_id_']"));

        closeEntityWindow();

        Thread.sleep(1500);

        assertTrue(!existsElement("div[id^='w_id_']"));
        
        closeEntityTab(0);
    }

    // #29
    @Test
    public void testEnumField() throws InterruptedException {

        clearNavTreeFilter();

        LOG.info("testEnumField");
        String entityId = "watermark";
        String entityFullId = "media_watermark";
        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        Thread.sleep(1500);

        openNavTreeItem(1);

        openSearchGridItem(0, entityFullId);

        Thread.sleep(1500);
        assertTrue(1 <= (Long) driver.executeScript("return Ext.ComponentQuery.query('nemesisEnumField')[0].getStore().totalCount;"));

        closeWindowAndTab();

        clearNavTreeFilter();
    }

    // #42
    @Test
    public void testEntityWindowTitle() throws InterruptedException {
        LOG.info("testEntityWindowTitle");
        String entityId = "unit";
        String entityFullId = "unit";
        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        Thread.sleep(1500);

        openNavTreeItem(2);

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        Thread.sleep(1500);
        
        // #42: test the title is not empty - the header title should contain at least '[' and ']'
        assertTrue(2 <= driver.findElementByCssSelector("div.x-window div.x-window-header-title div.x-title-text").getText().length());

        closeWindowAndTab();

        clearNavTreeFilter();
    }
    
    // #43, #46
    @Test
    public void testEntityWindowUrl() throws InterruptedException {
        LOG.info("testEntityWindowUrl");
        String entityId = "unit";
        String entityFullId = "unit";
        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        Thread.sleep(1500);

        openNavTreeItem(2);

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        Thread.sleep(1500);
        
        // #43: test the url is not 'https'
        String url = driver.findElementByCssSelector("div.x-window div[id^='entityPopupToolbar-'] a[id^='url-']").getText(); // e.g. https://
        assertTrue(!"https".equals(url));
        
        //#46: test the url is not duplicated
        String urlPrefix = url.substring(0, 9); // e.g. https://x
        assertTrue(-1 == url.indexOf(urlPrefix, 9));
        
        closeWindowAndTab();

        clearNavTreeFilter();
    }
    
    private boolean existsElement(String selector) {
        try {
            driver.findElementByCssSelector(selector);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private void openNavTreeItem(int itemIndex) throws InterruptedException {
        assertEquals(itemIndex + 1, navTreeItems().size());

        navTreeInnerItems().get(itemIndex).click();

        assertEquals(1, openedTabs().size());

        Thread.sleep(1500);
    }

    private void openSearchGridItem(int itemIndex, String entityFullId) {
        assertTrue(itemIndex + 1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));
    }

    private void closeEntityWindow() {
        driver.findElementByCssSelector("div.x-window img.x-tool-close").click();
    }

    private void filterNavTree(String filterText) {
        driver.findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys(filterText);
    }

    private void clearNavTreeFilter() {
        driver.findElement(By.id("navigation-menu-filter-trigger-clear")).click();
    }

    private void closeEntityTab(int itemIndex) throws InterruptedException {
        List<WebElement> elements = openedTabCloseButtons();
        int total = elements.size();
        elements.get(itemIndex).click();

        assertEquals(total - 1, openedTabs().size());

        Thread.sleep(1500);
    }
    
    private void closeWindowAndTab() throws InterruptedException {
        closeEntityWindow();
        closeEntityTab(0);
    }

    private List<WebElement> navTreeItems() {
        return driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item");
    }

    private List<WebElement> navTreeInnerItems() {
        return driver.findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner");
    }

    private List<WebElement> resultsGridItems(String entityId) {
        return driver.findElementsByCssSelector("div#" + entityId + "-search-result-body table.x-grid-item");
    }

    private List<WebElement> resultsGridInnerItems(String entityId) {
        return driver.findElementsByCssSelector("div#" + entityId + "-search-result-body table.x-grid-item div.x-grid-cell-inner");
    }

    private List<WebElement> openedTabs() {
        return driver.findElementsByCssSelector("div#tab-panel a.x-tab");
    }

    private List<WebElement> openedTabCloseButtons() {
        return driver.findElementsByCssSelector("div#tab-panel a.x-tab span.x-tab-close-btn");
    }

    private void doubleClick(WebElement item) {
        new Actions(driver).doubleClick(item).build().perform();
    }
}
