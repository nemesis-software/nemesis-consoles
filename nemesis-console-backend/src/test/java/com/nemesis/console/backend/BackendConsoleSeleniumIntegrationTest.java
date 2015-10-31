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
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
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
    public static void setUpClass() throws Exception {
        AbstractCommonConsoleSeleniumInterationTest.setUpClass();
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

        getWait().until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector("div#navigation-tree table.x-grid-item")));
    }

    @Before
    public void setUp() {
        waitForDom();
        waitForLoad();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
    }

    public void tearDown() {
        try {
            closeWindowAndTab();
            clearNavTreeFilter();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
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
    public void testChangeLocale() throws InterruptedException {
        LOG.info("testChangeLocale");

        //Change locale
        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'bg_BG'}); c.fireEvent('select', c, {data: {'isoCode':'bg_BG'}});");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
        assertEquals("Изход", getWebDriver().findElementById("app-header-logout").getText());

        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'en_GB'}); c.fireEvent('select', c, {data: {'isoCode':'en_GB'}});");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
        assertEquals("Logout", getWebDriver().findElementById("app-header-logout").getText());
    }

    @Test
    public void testFilterNavigation() throws InterruptedException {
        LOG.info("testFilterNavigation");

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree("media_format");

        int size = navTreeItems().size();

        assertTrue(size < 10 && size > 0);

        clearNavTreeFilter();

        assertTrue(navTreeItems().size() > 0);
    }

    @Test
    public void testSelectMediaContainer() throws InterruptedException {
        LOG.info("testSelectMediaContainer");

        String entityId = "media_container";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        int size = navTreeItems().size();

        assertTrue(size > 1);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        getWebDriver().findElementByCssSelector("span.x-tab-close-btn").click();

        assertEquals(0, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        clearNavTreeFilter();
    }

    @Test
    public void testFilterMediaContainer() throws InterruptedException {
        LOG.info("testFilterMediaContainer");

        final String entityId = "media_container";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        assertTrue(navTreeItems().size() > 0);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        Thread.sleep(2500);

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#" + entityId + "-searchform-fieldset-body div.x-form-item .field-restriction").size());

        (new WebDriverWait(getWebDriver(), 10)).until(ExpectedConditions.visibilityOfAllElements(resultsGridItems("media_container")));

        assertTrue(resultsGridItems(entityId).size() > 0);

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityId
                                                     + "-searchform-fieldset-restriction_uid'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        getWebDriver().findElementByCssSelector("div#" + entityId + "-searchform-fieldset-query_uid input[type='text']").sendKeys("default");

        getWebDriver().findElementsByCssSelector("div#" + entityId + "-search-form div.x-toolbar a.x-btn").iterator().next().click();

        sleep();

        assertEquals(1, resultsGridItems(entityId).size());
    }

    // #41
    @Test
    public void testReopenEntityWindow() throws InterruptedException {
        LOG.info("testReopenEntityWindow");
        String entityId = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        sleep();

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertTrue(1 <= resultsGridItems(entityId).size());

        doubleClick(resultsGridInnerItems(entityId).get(0));

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));

        closeEntityWindow();

        sleep();

        assertTrue(!existsElement("div[id^='w_id_']"));

        doubleClick(resultsGridInnerItems(entityId).get(0));

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));

        closeEntityWindow();

        sleep();

        assertTrue(!existsElement("div[id^='w_id_']"));
    }

    // #29
    @Test
    public void testEnumField() throws InterruptedException {

        clearNavTreeFilter();

        LOG.info("testEnumField");
        String entityId = "watermark";
        String entityFullId = "media_watermark";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityFullId)));

        openSearchGridItem(0, entityFullId);

        sleep();
        assertTrue(1 <= (Long) getWebDriver().executeScript("return Ext.ComponentQuery.query('nemesisEnumField')[0].getStore().totalCount;"));

    }

    // #42
    @Test
    public void testEntityWindowTitle() throws InterruptedException {
        LOG.info("testEntityWindowTitle");
        String entityId = "unit";
        String entityFullId = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityFullId)));

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        sleep();

        // #42: test the title is not empty - the header title should contain at least '[' and ']'
        assertTrue(2 <= getWebDriver().findElementByCssSelector("div[id^='w_id_'].x-window div.x-window-header-title div.x-title-text").getText().length());
    }

    // #43, #46
    @Test
    public void testEntityWindowUrl() throws InterruptedException {
        LOG.info("testEntityWindowUrl");

        clearNavTreeFilter();

        String entityId = "unit";
        String entityFullId = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        sleep();

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));

        sleep();

        String url = getWebDriver().findElementByCssSelector("div.x-window div[id^='entityPopupToolbar-'] a[id^='url-']").getText(); // e.g. https://

        //#46: test the url is not duplicated
        String urlPrefix = url.substring(0, 9); // e.g. https://x
        assertTrue(-1 == url.indexOf(urlPrefix, 9));
    }

    // #44
    // Note: I can't find a way to test resize of the window, so  I test only maximize and minimize
    @Test
    public void testMaximizeEntityWindow() throws InterruptedException {
        LOG.info("testMaximizeEntityWindow");
        String entityId = "unit";
        String entityFullId = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

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

    }

    // 49
    @Test
    public void testEditInCollectionFieldMustOpenEntityField() throws InterruptedException {
        LOG.info("testEditInCollectionFieldMustOpenEntityField");
        String entityId = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(2);

        List<WebElement> results = resultsGridItems(entityId);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityId).size());

        //search for africa-love-capri

        assertTrue(existsElement("#" + entityId + "-search-form-body"));

        WebElement searchForm = searchForm(entityId);

        assertTrue(existsElement("[id^=" + entityId + "-searchform-fieldset-restriction_uid]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityId
                                                     + "-searchform-fieldset-restriction_uid'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        assertTrue(existsElement("#" + entityId + "-searchform-fieldset-query_uid"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityId + "-searchform-fieldset-query_uid input[type='text']"));

        queryField.clear();
        queryField.sendKeys("africa-love-capri");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        //open it

        doubleClick(resultsGridInnerItems(entityId).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        WebElement entityWindow = entityWindow();

        assertNotNull(entityWindow);

        //find the third tab.

        WebElement tab = getEntityTab(2);
        assertNotNull(tab);
        tab.click();

        sleep();

        //right-click in the supercategories.

        assertTrue(existsElement("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        WebElement openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        WebElement superCategoriesEntityField = openedTab.findElement(By.cssSelector("[id^='nemesisCollectionField']"));

        assertNotNull(superCategoriesEntityField);

        rightClick(superCategoriesEntityField);

        assertTrue(existsElement(".collection-field-context-menu:not([style*='visibility: hidden'])"));
    }

    // 50
    @Test
    @Ignore
    public void testPaginationCorrectBehaviour() throws InterruptedException {
        LOG.info("testPaginationCorrectBehaviour");
        String entityId = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertEquals(9, resultsGridItems(entityId).size());

        WebElement searchResultGrid = resultsGrid(entityId);
        assertNotNull(searchResultGrid);

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityId + "-search-results-paging-size'); c.setValue('50'); c.fireEvent('select', c, '50');");

        assertEquals(49, resultsGridItems(entityId).size());

        List<WebElement> resultGridList = resultsGridInnerItems(entityId);
        assertNotNull(resultGridList);

        assertTrue(existsElement("a.x-btn[data-qtip='Next Page']"));
        WebElement nextPageBtn = getWebDriver().findElement(By.cssSelector("a.x-btn[data-qtip='Next Page']"));

        assertNotNull(nextPageBtn);
    }

    //56
    @Test
    public void testEntityFieldMustOpenTheRealEntityUrl() throws InterruptedException {
        LOG.info("testEntityFieldMustOpenTheRealEntityUrl");

        String entityId = "site";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertTrue(resultsGridItems(entityId).size() > 0);

        rightClick(resultsGridInnerItems(entityId).get(0));

        List<WebElement> menuElements = resultsGridContextMenuItems();
        assertTrue(menuElements.size() > 2);
        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));
        WebElement entityWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
        assertNotNull(entityWindow);

        WebElement tab = getEntityTab(2);
        assertNotNull(tab);
        tab.click();

        sleep();

        String value = getWebDriver().findElement(By.cssSelector("input[name='entity-startingPage']")).getAttribute("value");
        assertTrue(existsElement("div.x-form-entity-trigger.abstract_page"));
        WebElement entityFieldStartingPage = getWebDriver().findElement(By.cssSelector("div.x-form-entity-trigger.abstract_page"));
        entityFieldStartingPage.click();

        getWait().until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("div[id='w_id_" + value + "']")));

        assertTrue(existsElement("div[id='w_id_" + value + "']"));

        getWebDriver().findElement(By.cssSelector("div[id='w_id_" + value + "']")).findElement(By.cssSelector("img.x-tool-close")).click();
    }

    //#57
    @Test
    public void testChangeLocaleInDescriptionFieldMustChangeTheValue() throws InterruptedException {
        LOG.info("testChangeLocaleInDescriptionFieldMustChangeTheValue");

        String entityId = "category";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertTrue(resultsGridItems(entityId).size() > 0);

        rightClick(resultsGridInnerItems(entityId).get(0));

        List<WebElement> menuElements = resultsGridContextMenuItems();
        assertTrue(menuElements.size() > 2);
        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));
        WebElement entityWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
        assertNotNull(entityWindow);

        //change value of name field:
        WebElement nameField = entityWindow.findElement(By.cssSelector(".nemesisLocalizedField"));
        assertNotNull(nameField);

        String nameValue = nameField.findElement(By.cssSelector("input.x-form-text-default")).getAttribute("value");

        //Change language.

        assertTrue(existsElement(".richtext-localized-iso-dropdown"));

        getWebDriver().executeScript(
                        "var c = Ext.ComponentQuery.query('combobox[cls=localized-iso-dropdown]')[0]; c.setValue('bg_BG'); c.fireEvent('select', c, Ext.create('console.model.Language', {isoCode: 'bg_BG', language: 'Bulgarian' }));");

        String secondNameValue = nameField.findElement(By.cssSelector("input.x-form-text-default")).getAttribute("value");

        LOG.info(secondNameValue);

        assertFalse(nameValue.equals(secondNameValue));

        //change value of description field:

        WebElement iframeEditor = entityWindow.findElement(By.cssSelector("iframe[id^='htmleditor']"));
        assertNotNull(iframeEditor);

        getWebDriver().switchTo().frame(iframeEditor);

        WebElement iframeBody = getWebDriver().findElement(By.cssSelector("body"));
        String initialValue = iframeBody.getText();

        LOG.info(initialValue);

        getWebDriver().switchTo().parentFrame();

        //Change language.

        assertTrue(existsElement(".localized-iso-dropdown"));

        getWebDriver().executeScript(
                        "var c = Ext.ComponentQuery.query('combobox[cls=richtext-localized-iso-dropdown]')[0]; c.setValue('bg_BG'); c.fireEvent('select', c, Ext.create('console.model.Language', {isoCode: 'bg_BG', language: 'Bulgarian' }));");

        getWebDriver().switchTo().frame(iframeEditor);

        WebElement secondIframeBody = getWebDriver().findElement(By.cssSelector("body"));
        String newValue = secondIframeBody.getText();

        LOG.info(newValue);

        assertFalse(initialValue.equals(newValue));

        getWebDriver().switchTo().parentFrame();

        //        WebElement categoryDescriptionField = getWebDriver().findElement(By.cssSelector(".nemesisLocalizedRichtextField"));
        //        WebElement categoryDescriptionLanguageTriffer = getWebDriver().findElement(By.cssSelector(".localized-iso-dropdown"));
    }

    //#74
    @Test
    public void testRightClickOnEntityFieldMustShowContextMenu() throws InterruptedException {
        LOG.info("testRightClickOnEntityFieldMustShowContextMenu");
        String entityId = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(2);

        List<WebElement> results = resultsGridItems(entityId);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityId).size());

        //search for africa-love-capri

        assertTrue(existsElement("#" + entityId + "-search-form-body"));

        WebElement searchForm = searchForm(entityId);

        assertTrue(existsElement("[id^=" + entityId + "-searchform-fieldset-restriction_uid]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityId
                                                     + "-searchform-fieldset-restriction_uid'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        assertTrue(existsElement("#" + entityId + "-searchform-fieldset-query_uid"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityId + "-searchform-fieldset-query_uid input[type='text']"));

        queryField.clear();
        queryField.sendKeys("africa-love-capri");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        //open it

        doubleClick(resultsGridInnerItems(entityId).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        WebElement entityWindow = entityWindow();

        assertNotNull(entityWindow);

        //right-click it

        assertTrue(existsElement(".nemesis-entity-field"));

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".nemesis-entity-field")));

        WebElement unitEntityField = getWebDriver().findElement(By.cssSelector(".nemesis-entity-field"));
        rightClick(unitEntityField);
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".entity-field-context-menu:not([style*='visibility: hidden'])")));
        assertTrue(existsElement(".entity-field-context-menu:not([style*='visibility: hidden'])"));
    }

    //#95
    @Test
    public void testSearchFormMustSubmitOnEnter() throws InterruptedException {
        LOG.info("testSearchFormMustSubmitOnEnter");

        String entityId = "unit";
        String entityFullId = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityId)));

        assertTrue(1 <= resultsGridItems(entityFullId).size());

        assertTrue(existsElement("#unit-search-form-body"));

        WebElement searchForm = searchForm(entityId);

        assertTrue(existsElement("[id^=" + entityId + "-searchform-fieldset-restriction_uid]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityId
                                                     + "-searchform-fieldset-restriction_uid'); c.setValue('IsStartingWith'); c.fireEvent('select', c, 'IsStartingWith');");

        assertTrue(existsElement("#" + entityId + "-searchform-fieldset-query_uid"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityId + "-searchform-fieldset-query_uid input[type='text']"));

        queryField.clear();
        queryField.sendKeys("n");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        assertTrue(0 == resultsGridItems(entityFullId).size());

        queryField.clear();
        queryField.sendKeys("p");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        assertTrue(1 <= resultsGridItems(entityFullId).size());

    }

    //#102 & #4
    @Test
    public void testMustShowToastWhenCreatingNewEntitiesAsWellAsWhenSavingAndRemovingOldEntities() throws InterruptedException {
        LOG.info("testMustShowToastWhenCreatingNewEntitiesAsWellAsWhenSavingAndRemovingOldEntities");
        String entityId = "packaging";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeInnerItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityId);

        sleep();

        int position = navTreeItems().size() - 1;

        navTreeInnerItems().get(position).click();

        Actions action = new Actions(getWebDriver());
        action.contextClick(navTreeInnerItems().get(position)).build().perform();

        sleep();

        assertNotNull(getWebDriver().findElement(By.cssSelector(".x-menu")));

        getWebDriver().findElement(By.cssSelector(".x-menu a.x-menu-item-link")).click();

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));

        sleep();

        assertFalse(existsElement("[id^='toast-']"));

        getWebDriver().findElementByCssSelector("input[id^='nemesisTextField-'][name='uid']").sendKeys("testA");

        getWebDriver().findElement(By.cssSelector(".save-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        List<WebElement> rows = resultsGridItems(entityId);
        assertNotNull(rows);
        assertEquals(1, rows.size());

        assertEquals("testA", rows.get(0).findElement(By.cssSelector(".x-grid-cell-inner")).getText());

        closeEntityWindow();

        doubleClick(rows.get(0).findElement(By.cssSelector(".x-grid-cell-inner")));

        sleep();

        WebElement input = getWebDriver().findElementByCssSelector("input[id^='nemesisTextField-'][name='uid']");
        input.clear();
        input.sendKeys("testB");

        getWebDriver().findElement(By.cssSelector(".save-and-close-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        rows = resultsGridItems(entityId);
        assertNotNull(rows);
        assertEquals(1, rows.size());

        assertEquals("testB", rows.get(0).findElement(By.cssSelector(".x-grid-cell-inner")).getText());

        assertTrue(!existsElement("div[id^='w_id_']"));

        rightClick(rows.get(0).findElement(By.cssSelector(".x-grid-cell-inner")));

        assertTrue(existsElement(".x-menu-body"));

        List<WebElement> menuElements = resultsGridContextMenuItems();
        assertTrue(menuElements.size() > 2);
        assertEquals("Delete", menuElements.get(3).findElement(By.cssSelector(".x-menu-item-text")).getText());

        menuElements.get(3).findElement(By.cssSelector(".x-menu-item-text")).click();

        assertTrue(existsElement(".x-message-box"));

        WebElement messageBox = getWebDriver().findElement(By.cssSelector(".x-message-box"));
        List<WebElement> buttons = messageBox.findElements(By.cssSelector(".x-message-box a.x-btn:not([style*='display: none'])"));
        assertEquals(2, buttons.size());

        buttons.get(0).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        rows = resultsGridItems(entityId);
        assertNotNull(rows);
        assertEquals(0, rows.size());
    }

    /* private helpers */

    private void openNavTreeItem(Integer position) throws InterruptedException {
        assertTrue(navTreeItems().size() > 0);

        position = position != null ? position : navTreeItems().size() - 1;
        navTreeInnerItems().get(position).click();

        assertEquals(1, openedTabs().size());

        sleep();
    }

    private void openSearchGridItem(int itemIndex, String entityFullId) {
        assertTrue(itemIndex + 1 <= resultsGridItems(entityFullId).size());

        doubleClick(resultsGridInnerItems(entityFullId).get(0));
    }

    private void closeEntityWindow() {
        try {
            getWebDriver().findElementByCssSelector("div[id^='w_id_'].x-window img.x-tool-close").click();
        } catch (NoSuchElementException nsex) {
            //ignored
        }
    }

    private void minimizeEntityWindow() {
        getWebDriver().findElementByCssSelector("div.x-window img.x-tool-minimize").click();
    }

    private void maximizeEntityWindow() {
        getWebDriver().findElementByCssSelector("div.x-window img.x-tool-maximize").click();
    }

    private void filterNavTree(String filterText) throws InterruptedException {
        getWebDriver().findElementByCssSelector("input[id^='navigation-menu-filter-input']").sendKeys(filterText);
        sleep();
    }

    private void clearNavTreeFilter() {
        getWebDriver().findElement(By.id("navigation-menu-filter-trigger-clear")).click();
    }

    private void closeEntityTab(int itemIndex) throws InterruptedException {
        try {
            List<WebElement> elements = openedTabCloseButtons();
            int total = elements.size();
            if (total > 0) {
                elements.get(itemIndex).click();

                assertEquals(total - 1, openedTabs().size());

                sleep();
            }
        } catch (NoSuchElementException nsex) {
            //ignored
        }
    }

    private void closeWindowAndTab() throws InterruptedException {
        closeEntityWindow();
        closeEntityTab(0);
    }

    private WebElement getEntityTab(int index) {
        return entityWindow().findElements(By.cssSelector("a.x-tab")).get(index);
    }

    private WebElement entityWindow() {
        return getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
    }

    private List<WebElement> navTreeItems() {
        return getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item");
    }

    private List<WebElement> navTreeInnerItems() {
        return getWebDriver().findElementsByCssSelector("div#navigation-tree table.x-grid-item div.x-grid-cell-inner");
    }

    private WebElement resultsGrid(String entityId) {
        return getWebDriver().findElement(By.id(entityId + "-search-result"));
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

    private List<WebElement> resultsGridContextMenuItems() {
        WebElement menu = getWebDriver().findElement(By.cssSelector(".search-result-context-menu:not([style*='visibility: hidden'])"));
        return menu.findElements(By.cssSelector(".x-menu-item"));

    }

    private WebElement searchForm(String entityId) {
        return getWebDriver().findElement(By.cssSelector("#" + entityId + "-search-form-body"));
    }

}
