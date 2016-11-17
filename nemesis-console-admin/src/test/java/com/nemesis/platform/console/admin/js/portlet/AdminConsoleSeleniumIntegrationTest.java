package com.nemesis.platform.console.admin.js.portlet;

import com.nemesis.console.common.AbstractCommonConsoleSeleniumIntegrationTest;
import com.nemesis.console.common.CommonConsoleTestConfig;
import com.nemesis.platform.console.admin.AdminConsoleApplication;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
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
 * Master selenium test-case for the admin console.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
@TestExecutionListeners(listeners = { AdminConsoleSeleniumIntegrationTest.class, DependencyInjectionTestExecutionListener.class })
@SpringApplicationConfiguration(classes = { CommonConsoleTestConfig.class, AdminConsoleApplication.class })
public class AdminConsoleSeleniumIntegrationTest extends AbstractCommonConsoleSeleniumIntegrationTest {

    @Override
    public void beforeTestClass(TestContext testContext) throws Exception {

        super.webDriver = testContext.getApplicationContext().getBean(RemoteWebDriver.class);

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

    @Test
    public void testIdAnalyzerPortlet() throws Exception {
        getWebDriver().findElementById("id-input-field-inputEl").sendKeys("563567378827168");
        getWebDriver().findElementById("decode-id-button").click();
        getWait().until(ExpectedConditions.textToBePresentInElementValue(By.id("id-input-field-inputEl"), "2"));
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
        getWebDriver().findElementByCssSelector("input[id^='system-properties-filter-input']").sendKeys("flyway.enabled");
        Thread.sleep(500);
        LOG.info(getWebDriver().findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size());
        assertTrue(getWebDriver().findElementsByCssSelector("div#system-properties-grid-body table.x-grid-item").size() >= 1);

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
        getWebDriver().findElementById("idAnalyzerPortletBtn").click();
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

        // check that ID Analyzer Portlet is on its default position (second column)
        assertNotNull(columns.get(1).findElement(By.id("portlet-id-analyzer")));

        // move ID Analyzer Portlet above Resource Usage Portlet (in third column)
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

        // Check that ID Analyzer Portlet is still in third column after page has reloaded
        assertNotNull(columns.get(2).findElement(By.id("portlet-id-analyzer")));

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

    @Override
    public void tearDown() {

    }
}
