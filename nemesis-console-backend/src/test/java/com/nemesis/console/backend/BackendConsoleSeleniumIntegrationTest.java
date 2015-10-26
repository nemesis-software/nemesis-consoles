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
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * A selenium test-case for the backend console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
public class BackendConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumInterationTest {

    protected final Logger LOG = LogManager.getLogger(getClass());

    @BeforeClass
    public static void setUp() throws Exception {
        AbstractCommonConsoleSeleniumInterationTest.setUp();
        getWebDriver().manage().window().maximize();
        getWebDriver().get("http://localhost:8080/backend");

        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        getWebDriver().findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        getWebDriver().findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        getWait().until((WebDriver d) -> {
            return d.getTitle().toLowerCase().startsWith("backend console | nemesis");
        });

        assertEquals("backend console | nemesis", getWebDriver().getTitle().toLowerCase());

        waitForDom();
        waitForLoad();
    }

    @Test
    public void before() {
        waitForDom();
        waitForLoad();
    }

    protected static void waitForDom() {
        getWebDriver().executeScript("Ext.onReady(function () {});");
    }

    protected static void waitForLoad() {
        ExpectedCondition<Boolean> pageLoadCondition = driver -> ((JavascriptExecutor) driver).executeScript("return document.readyState").equals("complete");
        WebDriverWait wait = new WebDriverWait(getWebDriver(), 30);
        wait.until(pageLoadCondition);
    }

    @AfterClass
    public static void tearDown() throws Exception {
        getWebDriver().findElementById("app-header-logout").click();
        Thread.sleep(500);
        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().quit();
    }

    @Test
    public void testHeaderLinkReloadsPage() throws InterruptedException {
        LOG.info("testHeaderLinkReloadsPage");
        getWebDriver().findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().startsWith("Backend Console | Nemesis");
        });
        waitForDom();
        waitForLoad();
    }

    @Test
    public void testChangeLocale() {
        LOG.info("testChangeLocale");
        //Change locale
        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg_BG'}); c.fireEvent('select', c, {data: {'isoCode':'bg_BG'}});");

        // Wait for the page to load, timeout after 5 seconds
        (new WebDriverWait(getWebDriver(), 5)).until((WebDriver d) -> {
            return d.getTitle().startsWith("Backend Console | Nemesis");
        });

        assertEquals("Изход", getWebDriver().findElementById("app-header-logout").getText());

    }

    @Test
    public void testFilterNavigation() throws InterruptedException {
        LOG.info("testFilterNavigation");

        Thread.sleep(2500);

        assertTrue(getWebDriver().findElementsByCssSelector("div#navigation-tree .x-grid-item").size() > 0);

        getWebDriver().findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_format");

        sleep();

        int size = getWebDriver().findElementsByCssSelector("div#navigation-tree .x-grid-item").size();

        assertTrue(size < 10 && size > 0);

        clearNavTreeFilter();

        assertTrue(getWebDriver().findElementsByCssSelector("div#navigation-tree .x-grid-item").size() > 0);
    }

    @Test
    public void testSelectMediaContainer() throws InterruptedException {
        LOG.info("testSelectMediaContainer");

        Thread.sleep(1500);

        assertTrue(getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item").size() > 0);

        getWebDriver().findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_container");

        Thread.sleep(1500);

        int size = getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item").size();

        assertTrue(size > 1);

        getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner").get(size - 1).click();

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        getWebDriver().findElementByCssSelector("span.x-tab-close-btn").click();

        assertEquals(0, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        clearNavTreeFilter();
    }

    @Test
    public void testFilterMediaContainer() throws InterruptedException {

        LOG.info("testFilterMediaContainer");
        assertTrue(getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item").size() > 0);

        getWebDriver().findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys("media_container");

        Thread.sleep(1500);

        int size = getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item").size();

        assertTrue(size > 0);

        getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner").get(size - 1).click();

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        Thread.sleep(2500);

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#media_container-searchform-fieldset-body div.x-form-item .field-restriction").size());

        (new WebDriverWait(getWebDriver(), 10)).until(ExpectedConditions.visibilityOfAllElements(
                        getWebDriver().findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item")));

        assertTrue(getWebDriver().findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item").size() > 0);

        getWebDriver().executeScript(
                        "var c = Ext.getCmp('media_container-searchform-fieldset-restriction_uid'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        getWebDriver().findElementByCssSelector("div#media_container-searchform-fieldset-query_uid input[type='text']").sendKeys("default");

        getWebDriver().findElementsByCssSelector("div#media_container-search-form div.x-toolbar a.x-btn").iterator().next().click();

        Thread.sleep(1500);

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#media_container-search-result-body table.x-grid-item").size());

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

        openNavTreeItem(null);

        openSearchGridItem(0, entityFullId);

        Thread.sleep(1500);
        assertTrue(1 <= (Long) getWebDriver().executeScript("return Ext.ComponentQuery.query('nemesisEnumField')[0].getStore().totalCount;"));

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

        openNavTreeItem(null);

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        Thread.sleep(1500);

        // #42: test the title is not empty - the header title should contain at least '[' and ']'
        assertTrue(2 <= getWebDriver().findElementByCssSelector("div.x-window div.x-window-header-title div.x-title-text").getText().length());

        closeWindowAndTab();

        clearNavTreeFilter();
    }

    // #43, #46
    @Test
    public void testEntityWindowUrl() throws InterruptedException {
        LOG.info("testEntityWindowUrl");

        clearNavTreeFilter();

        String entityId = "unit";
        String entityFullId = "unit";
        //List<WebElement> navTreeItems = getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));
        Thread.sleep(1500);
        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        Thread.sleep(1500);

        openNavTreeItem(null);

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        Thread.sleep(1500);

        // #43: test the url is not 'https'
        String url = getWebDriver().findElementByCssSelector("div.x-window div[id^='entityPopupToolbar-'] a[id^='url-']").getText(); // e.g. https://
        assertTrue(!"https".equals(url));

        //#46: test the url is not duplicated
        String urlPrefix = url.substring(0, 9); // e.g. https://x
        assertTrue(-1 == url.indexOf(urlPrefix, 9));

        closeWindowAndTab();

        clearNavTreeFilter();
    }

    // #44
    // Note: I can't find a way to test resize of the window, so  I test only maximize and minimize
    @Test
    public void testMaximizeEntityWindow() throws InterruptedException {
        LOG.info("testMaximizeEntityWindow");
        String entityId = "unit";
        String entityFullId = "unit";
        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        sleep();

        openNavTreeItem(null);

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        sleep();

        assertTrue(!(Boolean) getWebDriver().executeScript("return Ext.ComponentQuery.query('entityPopupWindow')[0].maximized == true"));

        maximizeEntityWindow();

        sleep();

        // I can't find css selector-based way to assert the window is maximized
        assertTrue((Boolean) getWebDriver().executeScript("return Ext.ComponentQuery.query('entityPopupWindow')[0].maximized == true"));

        minimizeEntityWindow();

        sleep();

        assertTrue(!getWebDriver().findElementByCssSelector("div[id^='w_id_']").isDisplayed()); // asert the window is hidden

        List<WebElement> minimizedEntities = getWebDriver().findElementsByCssSelector("a.x-toolbar-item span." + entityFullId);
        assertEquals(1, minimizedEntities.size());

        minimizedEntities.get(0).click();

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));
        assertTrue((Boolean) getWebDriver().executeScript("return Ext.ComponentQuery.query('entityPopupWindow')[0].maximized = true"));

        closeWindowAndTab();

        clearNavTreeFilter();
    }

    //#102
    @Test
    @Ignore("TODO")
    public void testMustShowToastWhenCreatingNewEntitiesAsWellAsWhenSavingAndRemovingOldEntities() throws InterruptedException {
        LOG.info("testMustShowToastWhenCreatingNewEntitiesAsWellAsWhenSavingAndRemovingOldEntities");
        String entityId = "unit";
        String entityFullId = "unit";

        sleep();

        assertTrue(navTreeItems().size() > 0);

        sleep();

        filterNavTree(entityId);

        sleep();

        int position = navTreeItems().size() - 1;

        Actions action = new Actions(getWebDriver());
        action.contextClick(navTreeInnerItems().get(position)).build().perform();

        sleep();

        assertNotNull(getWebDriver().findElement(By.cssSelector("x-menu")));

        getWebDriver().findElement(By.cssSelector("x-menu")).click();

        Thread.sleep(1500);

        assertTrue(existsElement("div[id^='w_id_']"));

        Thread.sleep(1500);

        closeEntityWindow();

        Thread.sleep(1500);

        assertTrue(!existsElement("div[id^='w_id_']"));

        closeEntityTab(0);
    }

    private void sleep() throws InterruptedException {
        Thread.sleep(1500);
    }

    private boolean existsElement(String selector) {
        try {
            getWebDriver().findElementByCssSelector(selector);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private void openNavTreeItem(Integer position) throws InterruptedException {
        assertTrue(navTreeItems().size() > 0);

        position = position != null ? position : navTreeItems().size() - 1;
        navTreeInnerItems().get(position).click();

        assertEquals(1, openedTabs().size());

        Thread.sleep(1500);
    }

    private void openSearchGridItem(int itemIndex, String entityFullId) {
        assertTrue(itemIndex + 1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));
    }

    private void closeEntityWindow() {
        getWebDriver().findElementByCssSelector("div.x-window img.x-tool-close").click();
    }

    private void minimizeEntityWindow() {
        getWebDriver().findElementByCssSelector("div.x-window img.x-tool-minimize").click();
    }

    private void maximizeEntityWindow() {
        getWebDriver().findElementByCssSelector("div.x-window img.x-tool-maximize").click();
    }

    private void filterNavTree(String filterText) {
        getWebDriver().findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys(filterText);
    }

    private void clearNavTreeFilter() {
        getWebDriver().findElement(By.id("navigation-menu-filter-trigger-clear")).click();
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
        return getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item");
    }

    private List<WebElement> navTreeInnerItems() {
        return getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner");
    }

    private List<WebElement> resultsGridItems(String entityId) {
        return getWebDriver().findElementsByCssSelector("div#" + entityId + "-search-result-body table.x-grid-item");
    }

    private List<WebElement> resultsGridInnerItems(String entityId) {
        return getWebDriver().findElementsByCssSelector("div#" + entityId + "-search-result-body table.x-grid-item div.x-grid-cell-inner");
    }

    private List<WebElement> openedTabs() {
        return getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab");
    }

    private List<WebElement> openedTabCloseButtons() {
        return getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab span.x-tab-close-btn");
    }

    private void doubleClick(WebElement item) {
        new Actions(getWebDriver()).doubleClick(item).build().perform();
    }
}
