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

import com.nemesis.console.common.AbstractCommonConsoleSeleniumIntegrationTest;
import com.nemesis.console.common.CommonConsoleTestConfig;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
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

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.core.IsNot.not;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

/**
 * A selenium test-case for the backend console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
@TestExecutionListeners(listeners = { BackendConsoleSeleniumIntegrationTest.class, DependencyInjectionTestExecutionListener.class })
@SpringApplicationConfiguration(classes = { CommonConsoleTestConfig.class, BackendConsoleApplication.class })
public class BackendConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumIntegrationTest {

    @Override
    public void beforeTestClass(TestContext testContext) throws Exception {

        super.webDriver = testContext.getApplicationContext().getBean(RemoteWebDriver.class);

        getWebDriver().manage().window().maximize();
        getWebDriver().get("http://localhost:8080/backend");

        assertEquals("Login Page", getWebDriver().getTitle());

        getWebDriver().findElement(By.cssSelector("input[name=username]")).sendKeys("admin");
        getWebDriver().findElement(By.cssSelector("input[name=password]")).sendKeys("nimda");
        getWebDriver().findElement(By.cssSelector("input[name=submit]")).click();

        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(getWebDriver(), 10)).until((WebDriver d) -> {
            return d.getTitle().toLowerCase().startsWith("backend console | nemesis");
        });

        assertEquals("backend console | nemesis", getWebDriver().getTitle().toLowerCase());

        super.wait = new WebDriverWait(getWebDriver(), 15, 200);
        waitForDom();
        waitForLoad();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
    }

    @Override
    public void afterTestClass(TestContext testContext) throws Exception {
        super.webDriver = testContext.getApplicationContext().getBean(RemoteWebDriver.class);
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
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

    }

    @Test
    public void testHeaderLinkReloadsPage() throws InterruptedException {
        getWebDriver().findElement(By.cssSelector("a#app-header-title")).click();
        // Wait for the page to load, timeout after 10 seconds
        getWait().until((WebDriver d) -> {
            return d.getTitle().startsWith("Backend Console | Nemesis");
        });
        waitForDom();
        waitForLoad();
    }

    @Test
    public void testChangeLocale() throws InterruptedException {
        /**
         * TODO: it blows with
         *
         * org.openqa.selenium.WebDriverException: TypeError: this.dom is null
         *
         * if I don't do it on a clean-loaded page.         *
         */
        getWebDriver().get("http://localhost:8080/backend");
        // Wait for the page to load, timeout after 10 seconds
        getWait().until((WebDriver d) -> {
            return d.getTitle().startsWith("Backend Console | Nemesis");
        });
        waitForDom();
        waitForLoad();

        //Change locale
        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue(Ext.create('console.model.Language', {isoCode: 'bg_BG', language: 'Bulgarian' })); c.fireEvent('select', c, Ext.create('console.model.Language', {isoCode: 'bg_BG', language: 'Bulgarian' }));");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
        assertEquals("Изход", getWebDriver().findElementById("app-header-logout").getText());

        getWebDriver().executeScript(
                        "var c = Ext.getCmp('app-header-language-selector'); c.setValue({'isoCode':'en_GB'}); c.fireEvent('select', c, {data: {'isoCode':'en_GB'}});");

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
        assertEquals("Logout", getWebDriver().findElementById("app-header-logout").getText());
    }

    @Test
    public void testFilterNavigation() throws InterruptedException {

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
        String entityName = "media_container";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        int size = navTreeItems().size();

        assertTrue(size > 1);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        getWebDriver().findElementByCssSelector("span.x-tab-close-btn").click();

        assertEquals(0, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        clearNavTreeFilter();
    }

    @Test
    public void testFilterMediaContainer() throws InterruptedException {
        final String entityName = "media_container";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        assertTrue(navTreeItems().size() > 0);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#tab-panel a.x-tab").size());

        Thread.sleep(2500);

        assertEquals(1, getWebDriver().findElementsByCssSelector("div#" + entityName + "-searchform-fieldset-body div.x-form-item .field-restriction").size());

        (new WebDriverWait(getWebDriver(), 10)).until(ExpectedConditions.visibilityOfAllElements(resultsGridItems("media_container")));

        assertTrue(resultsGridItems(entityName).size() > 0);

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityName
                                                     + "-searchform-fieldset-restriction_code'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        getWebDriver().findElementByCssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']").sendKeys("default");

        getWebDriver().findElementsByCssSelector("div#" + entityName + "-search-form div.x-toolbar a.x-btn").iterator().next().click();

        sleep();

        assertEquals(1, resultsGridItems(entityName).size());
    }

    //#28 & #103
    @Test
    public void testEntityFieldsShowCorrectValues() throws InterruptedException {

        String entityName = "price";
        String entityFullName = "price";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityFullName)));

        openSearchGridItem(0, entityFullName);

        WebElement entityWindow = getWait().until(ExpectedConditions.visibilityOf(entityWindow()));
        assertNotNull(entityWindow);

        WebElement currencyField = getWait().until(ExpectedConditions.visibilityOf(entityWindow.findElement(By.cssSelector(".nemesis-entity-field"))));

        getWait().until(ExpectedConditions.not(input -> getWebDriver().executeScript("return Ext.Ajax.isLoading();")));

        String id = currencyField.getAttribute("id");

        String currencyFieldValue =
                        (String) getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + id + "'); return c.getValue();}; return test();");

        assertNotNull(currencyFieldValue);
        assertFalse("".equals(currencyFieldValue));

        WebElement codeField = getWait().until(ExpectedConditions.visibilityOf(entityWindow.findElement(By.cssSelector("[id^='nemesisTextField-'] > input"))));
        assertNotNull(codeField);
        codeField.click();

        WebElement currencyInputField = getWait().until(ExpectedConditions.visibilityOf(entityWindow.findElement(By.cssSelector("[name='entity-currency']"))));

        currencyInputField.click();
        codeField.click();
        currencyInputField.click();

        currencyFieldValue = (String) getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + id + "'); return c.getValue();}; return test();");

        assertNotNull(currencyFieldValue);
        assertFalse("".equals(currencyFieldValue));
    }

    // #29
    @Test
    public void testEnumField() throws InterruptedException {

        clearNavTreeFilter();

        String entityName = "watermark";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(null);

        //create new
        int position = navTreeItems().size() - 1;

        navTreeInnerItems().get(position).click();

        rightClick(navTreeInnerItems().get(position));

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".x-menu:not([style*='visibility: hidden'])")));

        WebElement menu = getWebDriver().findElement(By.cssSelector(".x-menu:not([style*='visibility: hidden'])"));

        menu.findElement(By.cssSelector(".x-menu a.x-menu-item-link")).click();

        WebElement entityWindow = getWait().until(ExpectedConditions.visibilityOf(entityWindow()));
        assertNotNull(entityWindow);

        sleep();
        assertTrue(1 <= (Long) getWebDriver().executeScript("return Ext.ComponentQuery.query('nemesisEnumField')[0].getStore().totalCount;"));

    }

    // #40
    @Test
    public void testWhenCloseATabAndOpenItAgainSearchFieldsMustNotBeDuplicated() throws InterruptedException {
        String entityName = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(4);

        List<WebElement> results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //search for africa-love-capri

        assertTrue(existsElement("#" + entityName + "-search-form-body"));

        WebElement searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));
        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        List<WebElement> queryFields = searchForm.findElements(By.cssSelector("div[id^='" + entityName + "-searchform-fieldset-query'] input[type='text']"));

        int initialSize = queryFields.size();

        // close tab
        closeEntityTab(0);

        // open it again

        openNavTreeItem(4);

        results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //search for africa-love-capri

        assertTrue(existsElement("#" + entityName + "-search-form-body"));

        searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));
        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        List<WebElement> newQueryFields = searchForm.findElements(By.cssSelector("div[id^='" + entityName + "-searchform-fieldset-query'] input[type='text']"));

        assertEquals(newQueryFields.size(), initialSize);
    }

    // #41
    @Test
    public void testReopenEntityWindow() throws InterruptedException {
        String entityName = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        sleep();

        openNavTreeItem(4);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(1 <= resultsGridItems(entityName).size());

        doubleClick(resultsGridInnerItems(entityName).get(0));

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));

        closeEntityWindow();

        sleep();

        assertTrue(!existsElement("div[id^='w_id_']"));

        doubleClick(resultsGridInnerItems(entityName).get(0));

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));

        closeEntityWindow();

        sleep();

        assertTrue(!existsElement("div[id^='w_id_']"));
    }

    // #42
    @Test
    public void testEntityWindowTitle() throws InterruptedException {
        String entityName = "unit";
        String entityFullName = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityFullName)));

        assertTrue(1 <= resultsGridItems(entityFullName).size());

        doubleClick(resultsGridInnerItems(entityFullName).get(0));

        sleep();

        // #42: test the title is not empty - the header title should contain at least '[' and ']'
        assertTrue(2 <= getWebDriver().findElementByCssSelector("div[id^='w_id_'].x-window div.x-window-header-title div.x-title-text").getText().length());
    }

    // #43, #46
    @Test
    public void testEntityWindowUrl() throws InterruptedException {

        clearNavTreeFilter();

        String entityName = "unit";
        String entityFullName = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        sleep();

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(1 <= resultsGridItems(entityFullName).size());

        doubleClick(resultsGridInnerItems(entityFullName).get(0));

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
        String entityName = "unit";
        String entityFullName = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(1 <= resultsGridItems(entityFullName).size());

        doubleClick(resultsGridInnerItems(entityFullName).get(0));

        sleep();

        assertTrue(!(Boolean) getWebDriver().executeScript("return Ext.ComponentQuery.query('entityPopupWindow')[0].maximized == true"));

        maximizeEntityWindow();

        sleep();

        // I can't find css selector-based way to assert the window is maximized
        assertTrue((Boolean) getWebDriver().executeScript("return Ext.ComponentQuery.query('entityPopupWindow')[0].maximized == true"));

        minimizeEntityWindow();

        sleep();

        assertTrue(!getWebDriver().findElementByCssSelector("div[id^='w_id_']").isDisplayed()); // asert the window is hidden

        List<WebElement> minimizedEntities = getWebDriver().findElementsByCssSelector("a.x-toolbar-item span." + entityFullName);
        assertEquals(1, minimizedEntities.size());

        minimizedEntities.get(0).click();

        sleep();

        assertTrue(existsElement("div[id^='w_id_']"));
        assertTrue((Boolean) getWebDriver().executeScript("return Ext.ComponentQuery.query('entityPopupWindow')[0].maximized = true"));

    }

    //#49
    @Test
    public void testEditInCollectionFieldMustOpenEntityField() throws InterruptedException {
        String entityName = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(4);

        List<WebElement> results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //search for africa-love-capri

        assertTrue(existsElement("#" + entityName + "-search-form-body"));

        WebElement searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityName
                                                     + "-searchform-fieldset-restriction_code'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']"));

        queryField.clear();
        queryField.sendKeys("africa-love-capri");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        //open it

        doubleClick(resultsGridInnerItems(entityName).get(0));

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

    //#50
    @Test
    public void testPaginationCorrectBehaviour() throws InterruptedException {
        String entityName = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(4);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertEquals(10, resultsGridItems(entityName).size());

        WebElement searchResultGrid = resultsGrid(entityName);
        assertNotNull(searchResultGrid);

        getWebDriver().executeScript(
                        "var c = Ext.getCmp('" + entityName + "-search-results-paging-size'); c.setValue('50'); c.fireEvent('select', c, {'id':'50'});");

        // wait until ajax finishes loading
        getWait().until(ExpectedConditions.not(input -> getWebDriver().executeScript("return Ext.Ajax.isLoading();")));

        // looks like extjs is loading some parts of the grid dynamically so we can't really 'guess' how many values there will be in the grid.
        assertTrue(15 < resultsGridItems(entityName).size());

        getWebDriver().executeScript(
                        "var c = Ext.getCmp('" + entityName + "-search-results-paging-size'); c.setValue('10'); c.fireEvent('select', c, {'id':'10'});");

        // wait until ajax finishes loading
        getWait().until(ExpectedConditions.not(input -> getWebDriver().executeScript("return Ext.Ajax.isLoading();")));

        // looks like extjs is loading some parts of the grid dynamically so we can't really 'guess' how many values there will be in the grid.
        assertEquals(10, resultsGridItems(entityName).size());

        List<WebElement> resultGridList = resultsGridInnerItems(entityName);
        assertNotNull(resultGridList);
        List<String> initialProductCodes = new ArrayList<>();
        for (WebElement element : resultGridList) {
            initialProductCodes.add(element.getText());
        }

        assertTrue(existsElement("a.x-btn[data-qtip='Next Page']"));
        WebElement nextPageBtn = getWebDriver().findElement(By.cssSelector("a.x-btn[data-qtip='Next Page']"));

        assertNotNull(nextPageBtn);

        nextPageBtn.click();
        nextPageBtn.click();
        nextPageBtn.click();

        getWait().until(ExpectedConditions.not(input -> getWebDriver().executeScript("return Ext.Ajax.isLoading();")));

        List<WebElement> secondGridList = resultsGridInnerItems(entityName);
        assertNotNull(secondGridList);
        List<String> secondProductCodes = new ArrayList<>();
        for (WebElement element : secondGridList) {
            secondProductCodes.add(element.getText());
        }

        assertThat(initialProductCodes, not(containsInAnyOrder(secondProductCodes.toArray())));

        assertTrue(existsElement("a.x-btn[data-qtip='Last Page']"));
        WebElement lastPageBtn = getWebDriver().findElement(By.cssSelector("a.x-btn[data-qtip='Last Page']"));

        lastPageBtn.click();

        getWait().until(ExpectedConditions.not(input -> getWebDriver().executeScript("return Ext.Ajax.isLoading();")));

        List<WebElement> lastGridList = resultsGridInnerItems(entityName);
        assertNotNull(lastGridList);
        List<String> lastGridProductCodes = new ArrayList<>();
        for (WebElement element : lastGridList) {
            lastGridProductCodes.add(element.getText());
        }

        assertThat(initialProductCodes, not(containsInAnyOrder(lastGridProductCodes.toArray())));
        assertThat(secondProductCodes, not(containsInAnyOrder(lastGridProductCodes.toArray())));

        assertTrue(existsElement("a.x-btn[data-qtip='First Page']"));
        WebElement firstPageBtn = getWebDriver().findElement(By.cssSelector("a.x-btn[data-qtip='First Page']"));

        firstPageBtn.click();

        getWait().until(ExpectedConditions.not(input -> getWebDriver().executeScript("return Ext.Ajax.isLoading();")));

        List<WebElement> firstGridList = resultsGridInnerItems(entityName);
        assertNotNull(firstGridList);
        List<String> firstGridProductCodes = new ArrayList<>();
        for (WebElement element : firstGridList) {
            firstGridProductCodes.add(element.getText());
        }

        assertThat(initialProductCodes, containsInAnyOrder(firstGridProductCodes.toArray()));
    }

    //56
    @Test
    @Ignore("The id of the opened window is not the same as the value of the clicked field. Field is solar-homepage - solarContent:Staged and id of opened window is only solar-homepage")
    public void testEntityFieldMustOpenTheRealEntityUrl() throws InterruptedException {
        String entityName = "site";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(resultsGridItems(entityName).size() > 0);

        rightClick(resultsGridInnerItems(entityName).get(0));

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
        String entityName = "category";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(resultsGridItems(entityName).size() > 0);

        rightClick(resultsGridInnerItems(entityName).get(0));

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

        assertFalse(nameValue.equals(secondNameValue));

        //change value of description field:

        WebElement iframeEditor = entityWindow.findElement(By.cssSelector("iframe[id^='htmleditor']"));
        assertNotNull(iframeEditor);

        getWebDriver().switchTo().frame(iframeEditor);

        WebElement iframeBody = getWebDriver().findElement(By.cssSelector("body"));
        String initialValue = iframeBody.getText();

        getWebDriver().switchTo().parentFrame();

        //Change language.

        assertTrue(existsElement(".localized-iso-dropdown"));

        getWebDriver().executeScript(
                        "var c = Ext.ComponentQuery.query('combobox[cls=richtext-localized-iso-dropdown]')[0]; c.setValue('bg_BG'); c.fireEvent('select', c, Ext.create('console.model.Language', {isoCode: 'bg_BG', language: 'Bulgarian' }));");

        getWebDriver().switchTo().frame(iframeEditor);

        WebElement secondIframeBody = getWebDriver().findElement(By.cssSelector("body"));
        String newValue = secondIframeBody.getText();

        assertFalse(initialValue.equals(newValue));

        getWebDriver().switchTo().parentFrame();

        //        WebElement categoryDescriptionField = getWebDriver().findElement(By.cssSelector(".nemesisLocalizedRichtextField"));
        //        WebElement categoryDescriptionLanguageTriffer = getWebDriver().findElement(By.cssSelector(".localized-iso-dropdown"));
    }

    //#58
    @Test
    @Ignore("Cannot release the window - I believe it's a bug in extjs")
    public void testEntityWindowMustBeDraggableEvenIfWindowIdContainsSpecialCharacters() throws InterruptedException {
        String entityName = "customer";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(resultsGridItems(entityName).size() > 0);

        rightClick(resultsGridInnerItems(entityName).get(resultsGridInnerItems(entityName).size() - 1));

        List<WebElement> menuElements = resultsGridContextMenuItems();
        assertTrue(menuElements.size() > 2);
        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));
        WebElement entityWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
        assertNotNull(entityWindow);

        int x = entityWindow.getLocation().getX();

        WebElement title = entityWindow.findElement(By.cssSelector(".x-title-text"));
        dragAndDrop(title, 30, 30);

        sleep();

        int newX = entityWindow.getLocation().getX();

        assertNotEquals(x, newX);

        pressKey(entityWindow, Keys.ESCAPE);
    }

    //#59
    @Test
    public void testEntityOfTypeMediaMustShowCorrectTooltipOnMouseover() throws InterruptedException {
        String entityName = "category";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(resultsGridItems(entityName).size() > 0);

        rightClick(resultsGridInnerItems(entityName).get(0));

        List<WebElement> menuElements = resultsGridContextMenuItems();
        assertTrue(menuElements.size() > 2);
        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));
        WebElement entityWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_']"));
        assertNotNull(entityWindow);

        //open the first tab
        WebElement tab = getEntityTab(1);
        assertNotNull(tab);
        tab.click();

        sleep();

        assertTrue(existsElement("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        WebElement openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        List<WebElement> mediaFields = openedTab.findElements(By.cssSelector("input[id^='nemesisEntityField']"));

        assertEquals(2, mediaFields.size());

        mouseover(mediaFields.get(0));

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='tooltip-'].x-tip:not([style*='display: none'])")));

        sleep();

        mouseover(mediaFields.get(1));

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='tooltip-'].x-tip:not([style*='display: none'])")));
    }

    //#61
    @Test
    public void testFieldsMustBeMarkedAsDirtyWhenYouReassignTheirOriginalValue() throws InterruptedException {
        String entityName = "site";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(2);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //search for solarapparel

        assertTrue(existsElement("#" + entityName + "-search-form-body"));

        WebElement searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityName
                                                     + "-searchform-fieldset-restriction_code'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']"));

        queryField.clear();
        queryField.sendKeys("solarapparel");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        //open it

        doubleClick(resultsGridInnerItems(entityName).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        WebElement entityWindow = entityWindow();

        assertNotNull(entityWindow);

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='nemesisTextField-'].x-form-item-body")));

        assertTrue(existsElement("[id^='nemesisTextField-'].x-form-item-body"));

        //change name

        List<WebElement> textFields = getWebDriver().findElements(By.cssSelector("[id^='nemesisTextField-'].x-form-item-body"));
        assertTrue(1 < textFields.size());
        textFields.get(1).findElement(By.cssSelector("input[id^='nemesisTextField-']")).clear();
        textFields.get(1).findElement(By.cssSelector("input[id^='nemesisTextField-']")).sendKeys("Test-value");

        //save and close
        getWebDriver().findElement(By.cssSelector(".save-and-close-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        assertTrue(!existsElement("div[id^='w_id_']"));

        //open it again

        doubleClick(resultsGridInnerItems(entityName).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        entityWindow = entityWindow();

        assertNotNull(entityWindow);

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='nemesisTextField-'].x-form-item-body")));

        assertTrue(existsElement("[id^='nemesisTextField-'].x-form-item-body"));

        //change name again

        textFields = getWebDriver().findElements(By.cssSelector("[id^='nemesisTextField-'].x-form-item-default"));
        assertTrue(1 < textFields.size());
        String nameFieldId = textFields.get(1).getAttribute("id");

        String nameFieldValue = (String) getWebDriver().executeScript(
                        "function test() {var c = Ext.getCmp('" + nameFieldId + "'); return c.getValue();}; return test();");

        assertEquals("Test-value", nameFieldValue);

        textFields.get(1).findElement(By.cssSelector("input[id^='nemesisTextField-']")).clear();
        textFields.get(1).findElement(By.cssSelector("input[id^='nemesisTextField-']")).sendKeys("Solarapparel Nemesis Platform B2C Demo Store");

        //save and close again
        getWebDriver().findElement(By.cssSelector(".save-and-close-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        assertTrue(!existsElement("div[id^='w_id_']"));

        //finally open again
        doubleClick(resultsGridInnerItems(entityName).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        entityWindow = entityWindow();

        assertNotNull(entityWindow);

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='nemesisTextField-'].x-form-item-body")));

        textFields = getWebDriver().findElements(By.cssSelector("[id^='nemesisTextField-'].x-form-item-default"));
        assertTrue(1 < textFields.size());
        nameFieldId = textFields.get(1).getAttribute("id");

        nameFieldValue = (String) getWebDriver().executeScript(
                        "function test() {var c = Ext.getCmp('" + nameFieldId + "'); return c.getValue();}; return test();");

        assertEquals("Solarapparel Nemesis Platform B2C Demo Store", nameFieldValue);
    }

    //#28 & #66 & #68 & #71
    @Test
    @Ignore("At the moment it is not possible to set solarContent:Staged as catalogVersion")
    public void testCreateNewBlogEntryMustCreateNewBlogEntry() throws InterruptedException {
        String entityName = "blog_entry";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(1);

        List<WebElement> results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //create new
        int position = navTreeItems().size() - 1;

        navTreeInnerItems().get(position).click();

        rightClick(navTreeInnerItems().get(position));

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".x-menu:not([style*='visibility: hidden'])")));

        WebElement menu = getWebDriver().findElement(By.cssSelector(".x-menu:not([style*='visibility: hidden'])"));

        menu.findElement(By.cssSelector(".x-menu a.x-menu-item-link")).click();

        WebElement entityWindow = getWait().until(ExpectedConditions.visibilityOf(entityWindow()));
        assertNotNull(entityWindow);

        //enter data on first tab
        WebElement tab = getEntityTab(entityWindow, 0);
        assertNotNull(tab);
        tab.click();

        WebElement openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        openedTab.findElement(By.cssSelector("input[name='code']")).sendKeys("test-code");
        openedTab.findElement(By.cssSelector(".nemesisLocalizedField input[name^='textfield-']")).sendKeys("test-name");

        //find the second tab
        tab = getEntityTab(entityWindow, 1);
        assertNotNull(tab);
        tab.click();
        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        sleep();

        List<WebElement> localizedRichtextFields = openedTab.findElements(By.cssSelector(".nemesis-localized-richtext-field"));
        assertTrue(2 == localizedRichtextFields.size());

        String teaserId = localizedRichtextFields.get(0).getAttribute("id");
        String contentId = localizedRichtextFields.get(1).getAttribute("id");

        getWebDriver().executeScript("var c = Ext.getCmp('" + teaserId + "'); c.setValue({\"en_GB\" : {\"value\" : \"test-teaser\"}});");

        getWebDriver().executeScript("var c = Ext.getCmp('" + contentId + "'); c.setValue({\"en_GB\" : {\"value\" : \"test-content\"}});");

        //find the third tab.

        tab = getEntityTab(entityWindow, 2);
        assertNotNull(tab);
        tab.click();
        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        sleep();

        openedTab.findElement(By.cssSelector("div[id^='nemesisCollectionField-'] img.x-tool-plus")).click();

        WebElement searchInputField = getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[placeholder='Search...']")));
        searchInputField.sendKeys("news");

        WebElement checkbox = getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div.x-grid-row-checker")));
        checkbox.click();

        //find the fifth tab.

        tab = getEntityTab(entityWindow, 4);
        assertNotNull(tab);
        tab.click();
        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        sleep();

        WebElement catalogVersionField = getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("input[id^='nemesisEntityField-']")));
        catalogVersionField.sendKeys("Staged");

        sleep();

        getWebDriver().findElement(By.cssSelector(".save-and-close-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        //search for the new blog entry

        assertTrue(existsElement("#" + entityName + "-search-form-body"));

        WebElement searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityName
                                                     + "-searchform-fieldset-restriction_code'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']"));

        queryField.clear();
        queryField.sendKeys("test-code");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 == results.size());

        doubleClick(resultsGridInnerItems(entityName).get(0));

        entityWindow = getWait().until(ExpectedConditions.visibilityOf(entityWindow()));
        assertNotNull(entityWindow);

        //check values

        //on first tab
        tab = getEntityTab(entityWindow, 0);
        assertNotNull(tab);
        tab.click();

        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        String codeId = openedTab.findElement(By.cssSelector("div[id^='nemesisTextField-']")).getAttribute("id");
        assertEquals("test-code", getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + codeId + "'); return c.getValue();}; return test();"));
        String nameId = openedTab.findElement(By.cssSelector(".nemesis-localized-field ")).getAttribute("id");
        assertEquals("{\"en_GB\":{\"value\":\"test-name\"}}",
                     getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + nameId + "'); return c.getValue();}; return test();"));

        //on second tab
        tab = getEntityTab(entityWindow, 1);
        assertNotNull(tab);
        tab.click();
        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        sleep();

        localizedRichtextFields = openedTab.findElements(By.cssSelector(".nemesis-localized-richtext-field"));
        assertTrue(2 == localizedRichtextFields.size());

        teaserId = localizedRichtextFields.get(0).getAttribute("id");
        contentId = localizedRichtextFields.get(1).getAttribute("id");

        assertEquals("{\"en_GB\":{\"value\":\"test-teaser\"}}",
                     getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + teaserId + "'); return c.getValue();}; return test();"));
        assertEquals("{\"en_GB\":{\"value\":\"test-content\"}}",
                     getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + contentId + "'); return c.getValue();}; return test();"));

        //find the third tab.

        tab = getEntityTab(entityWindow, 2);
        assertNotNull(tab);
        tab.click();
        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        sleep();

        //        String categoriesId = openedTab.findElement(By.cssSelector(".nemesis-collection-field")).getAttribute("id");
        //        assertEquals("news",
        //                     getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + categoriesId + "'); return c.getValues();}; return test();"));

        //find the fourth tab.

        tab = getEntityTab(entityWindow, 3);
        assertNotNull(tab);
        tab.click();
        openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        sleep();

        String catalogVersionId = getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".nemesis-entity-field"))).getAttribute("id");
        assertEquals("Staged",
                     getWebDriver().executeScript("function test() {var c = Ext.getCmp('" + catalogVersionId + "'); return c.getValue();}; return test();"));

        //delete it

        getWebDriver().findElement(By.cssSelector(".delete-btn")).click();

        assertTrue(existsElement(".x-message-box"));

        WebElement messageBox = getWebDriver().findElement(By.cssSelector(".x-message-box"));
        List<WebElement> buttons = messageBox.findElements(By.cssSelector(".x-message-box a.x-btn:not([style*='display: none'])"));
        assertEquals(2, buttons.size());

        buttons.get(0).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        //TODO: uncomment this once the synchronization is fixed (it is depending on https://jira.spring.io/browse/DATAREST-704)
        //        //synchronize it.
        //        WebElement synchronizeBtn = entityWindow.findElement(By.cssSelector("a.synchronize-btn"));
        //        assertNotNull(synchronizeBtn);
        //        synchronizeBtn.click();
        //        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));
        //        closeEntityWindow();
        //
        //        queryField = searchForm.findElement(By.cssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']"));
        //
        //        queryField.clear();
        //        queryField.sendKeys("test-code");
        //        queryField.sendKeys(Keys.ENTER);
        //
        //        sleep();
        //
        //        results = resultsGridItems(entityName);
        //
        //        getWait().until(ExpectedConditions.visibilityOfAllElements(results));
        //
        //        assertTrue(2 == results.size());
        //
        //        //delete it
        //
        //        new Actions(getWebDriver()).keyDown(Keys.SHIFT).click(results.get(0)).click(results.get(1)).contextClick().keyUp(Keys.SHIFT).perform();
        //        assertTrue(existsElement(".x-menu-body"));
        //
        //        List<WebElement> menuElements = resultsGridContextMenuItems();
        //        assertTrue(menuElements.size() > 2);
        //        assertEquals("Delete", menuElements.get(3).findElement(By.cssSelector(".x-menu-item-text")).getText());
        //
        //        menuElements.get(3).findElement(By.cssSelector(".x-menu-item-text")).click();
        //        //        getWebDriver().findElement(By.cssSelector(".delete-btn")).click();
        //
        //        assertTrue(existsElement(".x-message-box"));
        //
        //        WebElement messageBox = getWebDriver().findElement(By.cssSelector(".x-message-box"));
        //        List<WebElement> buttons = messageBox.findElements(By.cssSelector(".x-message-box a.x-btn:not([style*='display: none'])"));
        //        assertEquals(2, buttons.size());
        //
        //        buttons.get(0).click();
        //
        //        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

    }

    //#67
    @Test
    public void testWhenOpenAnyBlogEntryTeaserAndContentFieldsMustBeShown() throws InterruptedException {
        String entityName = "blog_entry";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(1);

        List<WebElement> results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //open it

        doubleClick(resultsGridInnerItems(entityName).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        WebElement entityWindow = entityWindow();

        assertNotNull(entityWindow);

        //find the second tab.

        WebElement tab = getEntityTab(1);
        assertNotNull(tab);
        tab.click();

        sleep();

        List<WebElement> richtextFields = entityWindow.findElements(By.cssSelector("iframe[id^='htmleditor']"));
        assertNotNull(richtextFields);
        assertEquals(2, richtextFields.size());
    }

    //#69
    @Test
    public void testAutocompleteOfEntityFieldMustHaveCorrectBehaviour() {

    }

    //#74,#48
    @Test
    public void testRightClickOnEntityFieldMustShowContextMenu() throws InterruptedException {
        String entityName = "product";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(4);

        List<WebElement> results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //search for africa-love-capri

        assertTrue(existsElement("#" + entityName + "-search-form-body"));

        WebElement searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityName
                                                     + "-searchform-fieldset-restriction_code'); c.setValue('Equals'); c.fireEvent('select', c, 'Equals');");

        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']"));

        queryField.clear();
        queryField.sendKeys("africa-love-capri");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        //open it

        doubleClick(resultsGridInnerItems(entityName).get(0));

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

    //#78
    @Test
    public void testOpenTheSameEntityMustNotShowError() throws InterruptedException {
        String entityName = "search_facet_config";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(1);

        List<WebElement> results = resultsGridItems(entityName);

        getWait().until(ExpectedConditions.visibilityOfAllElements(results));

        assertTrue(1 <= resultsGridItems(entityName).size());

        //open it

        doubleClick(resultsGridInnerItems(entityName).get(0));

        getWait().until(ExpectedConditions.visibilityOf(entityWindow()));

        WebElement entityWindow = entityWindow();

        assertNotNull(entityWindow);

        //find the second tab.

        WebElement tab = getEntityTab(1);
        assertNotNull(tab);
        tab.click();

        sleep();

        //right-click in the index type.

        assertTrue(existsElement("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        WebElement openedTab = getWebDriver().findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(openedTab);

        WebElement indexTypes = openedTab.findElement(By.cssSelector("[id^='nemesisCollectionField'].x-panel-body"));

        assertNotNull(indexTypes);

        indexTypes.click();

        rightClick(indexTypes.findElement(By.cssSelector(".x-grid-row")));

        assertTrue(existsElement(".collection-field-context-menu:not([style*='visibility: hidden'])"));

        WebElement menu = getWebDriver().findElementByCssSelector(".collection-field-context-menu:not([style*='visibility: hidden'])");

        List<WebElement> menuElements = menu.findElements(By.cssSelector(".x-menu-item"));

        assertTrue(menuElements.size() > 2);
        assertEquals("Edit", menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).getText());

        menuElements.get(0).findElement(By.cssSelector(".x-menu-item-text")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_product']")));

        assertTrue(existsElement("div[id^='w_id_product']"));
        WebElement productWindow = getWebDriver().findElement(By.cssSelector("div[id^='w_id_product']"));
        assertNotNull(productWindow);

        WebElement productGeneralTab = productWindow.findElement(By.cssSelector("[id^='nemesisEntitySection'].x-tabpanel-child:not(.x-hidden-offsets)"));

        assertNotNull(productGeneralTab);

        assertTrue(existsElement("[id^=nemesisEntityField-].x-form-entity-trigger"));

        WebElement searchFacetConfigFieldTrigger = productGeneralTab.findElement(By.cssSelector("[id^=nemesisEntityField-].x-form-entity-trigger"));

        assertNotNull(searchFacetConfigFieldTrigger);

        searchFacetConfigFieldTrigger.click();

        sleep();

        getWebDriver().findElementByCssSelector("div[id^='w_id_product'].x-window img.x-tool-close").click();
    }

    //#95
    @Test
    public void testSearchFormMustSubmitOnEnter() throws InterruptedException {
        String entityName = "unit";
        String entityFullName = "unit";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        openNavTreeItem(null);

        getWait().until(ExpectedConditions.visibilityOfAllElements(resultsGridItems(entityName)));

        assertTrue(1 <= resultsGridItems(entityFullName).size());

        assertTrue(existsElement("#unit-search-form-body"));

        WebElement searchForm = searchForm(entityName);

        assertTrue(existsElement("[id^=" + entityName + "-searchform-fieldset-restriction_code]"));

        getWebDriver().executeScript("var c = Ext.getCmp('" + entityName
                                                     + "-searchform-fieldset-restriction_code'); c.setValue('IsStartingWith'); c.fireEvent('select', c, 'IsStartingWith');");

        assertTrue(existsElement("#" + entityName + "-searchform-fieldset-query_code"));

        WebElement queryField = searchForm.findElement(By.cssSelector("div#" + entityName + "-searchform-fieldset-query_code input[type='text']"));

        queryField.clear();
        queryField.sendKeys("n");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        assertTrue(0 == resultsGridItems(entityFullName).size());

        queryField.clear();
        queryField.sendKeys("p");
        queryField.sendKeys(Keys.ENTER);

        sleep();

        assertTrue(1 <= resultsGridItems(entityFullName).size());

    }

    //#102 & #4
    @Test
    public void testMustShowToastWhenCreatingNewEntitiesAsWellAsWhenSavingAndRemovingOldEntities() throws InterruptedException {
        String entityName = "packaging";

        getWait().until(ExpectedConditions.visibilityOfAllElements(navTreeInnerItems()));

        assertTrue(navTreeItems().size() > 0);

        filterNavTree(entityName);

        sleep();

        int position = navTreeItems().size() - 1;

        navTreeInnerItems().get(position).click();

        rightClick(navTreeInnerItems().get(position));

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".x-menu:not([style*='visibility: hidden'])")));

        WebElement menu = getWebDriver().findElement(By.cssSelector(".x-menu:not([style*='visibility: hidden'])"));

        menu.findElement(By.cssSelector(".x-menu a.x-menu-item-link")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div[id^='w_id_']")));

        assertTrue(existsElement("div[id^='w_id_']"));

        sleep();

        assertFalse(existsElement("[id^='toast-']"));

        getWebDriver().findElementByCssSelector("input[id^='nemesisTextField-'][name='code']").sendKeys("testA");

        getWebDriver().findElement(By.cssSelector(".save-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        List<WebElement> rows = resultsGridItems(entityName);
        assertNotNull(rows);
        assertEquals(1, rows.size());

        assertEquals("testA", rows.get(0).findElement(By.cssSelector(".x-grid-cell-inner")).getText());

        closeEntityWindow();

        doubleClick(rows.get(0).findElement(By.cssSelector(".x-grid-cell-inner")));

        sleep();

        WebElement input = getWebDriver().findElementByCssSelector("input[id^='nemesisTextField-'][name='code']");
        input.clear();
        input.sendKeys("testB");

        getWebDriver().findElement(By.cssSelector(".save-and-close-btn")).click();

        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[id^='toast-']")));

        sleep();

        rows = resultsGridItems(entityName);
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

        rows = resultsGridItems(entityName);
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

    private WebElement getEntityTab(WebElement window, int index) {
        return window.findElements(By.cssSelector("a.x-tab")).get(index);
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

    private WebElement resultsGrid(String entityName) {
        return getWebDriver().findElement(By.id(entityName + "-search-result"));
    }

    private List<WebElement> resultsGridItems(String entityName) {
        return getWebDriver().findElementsByCssSelector("div#" + entityName + "-search-result-body table.x-grid-item");
    }

    private List<WebElement> resultsGridInnerItems(String entityName) {
        return getWebDriver().findElementsByCssSelector("div#" + entityName + "-search-result-body table.x-grid-item div.x-grid-cell-inner");
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

    private WebElement searchForm(String entityName) {
        return getWebDriver().findElement(By.cssSelector("#" + entityName + "-search-form-body"));
    }
}
