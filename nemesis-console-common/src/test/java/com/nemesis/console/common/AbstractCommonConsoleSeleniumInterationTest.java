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
package com.nemesis.console.common;

import com.nemesis.platform.util.test.IntegrationTest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Rule;
import org.junit.experimental.categories.Category;
import org.junit.rules.MethodRule;
import org.junit.rules.TestName;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Base selenium tests for all consoles.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
@Category(value = IntegrationTest.class)
public abstract class AbstractCommonConsoleSeleniumInterationTest {

    protected final Logger LOG = LogManager.getLogger(getClass());

    protected static RemoteWebDriver webDriver;

    protected static WebDriverWait wait;

    @Rule
    public TestName testName = new TestName();

    @Rule
    public ScreenshotOnFailTestRule screenshotTestRule = new ScreenshotOnFailTestRule();

    public static void setUpClass() throws Exception {
        DesiredCapabilities capabilities = DesiredCapabilities.firefox();
        capabilities.setJavascriptEnabled(true);
        capabilities.setCapability("acceptSslCerts", true);
        final FirefoxProfile firefoxProfile = new FirefoxProfile();
        firefoxProfile.setPreference("xpinstall.signatures.required", false);
        capabilities.setCapability(FirefoxDriver.PROFILE, firefoxProfile);
        webDriver = new FirefoxDriver(capabilities);
        webDriver.manage().window().maximize();
        //workaround to wait when some element is not visible instead of calling implicitly wait on 1000 places.
        webDriver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
        wait = new WebDriverWait(getWebDriver(), 15, 200);
    }

    @Before
    public void setUp() {
        LOG.info(testName.getMethodName());
        waitForDom();
        waitForLoad();
        getWait().until(ExpectedConditions.visibilityOfElementLocated(By.id("app-header-logout")));
    }

    protected abstract void tearDown();

    class ScreenshotOnFailTestRule implements MethodRule {
        public Statement apply(final Statement statement, final FrameworkMethod frameworkMethod, final Object o) {
            return new Statement() {
                @Override
                public void evaluate() throws Throwable {
                    try {
                        statement.evaluate();
                    } catch (Throwable t) {
                        takeScreenshot(frameworkMethod.getName());
                        throw t; // rethrow to allow the failure to be reported to JUnit
                    } finally {
                        tearDown();
                    }
                }

                public void takeScreenshot(String fileName) throws IOException {
                    FileOutputStream out = null;
                    FileInputStream in = null;
                    try {
                        new File("target/surefire-reports/").mkdirs(); // Insure directory is there
                        out = new FileOutputStream("target/surefire-reports/screenshot-" + fileName + ".png");
                        in = new FileInputStream(webDriver.getScreenshotAs(OutputType.FILE));

                        int read = 0;
                        byte[] bytes = new byte[1024];
                        while ((read = in.read(bytes)) != -1) {
                            out.write(bytes, 0, read);
                        }

                        out.close();
                    } catch (Exception e) {
                        // No need to crash the tests if the screenshot fails
                    } finally {
                        if (in != null) {
                            try {
                                in.close();
                            } catch (IOException e) {
                                //ignore
                            }
                        }
                        if (out != null) {
                            try {
                                out.close();
                            } catch (IOException e) {
                                //ignore
                            }
                        }
                    }
                }
            };
        }
    }

    public static RemoteWebDriver getWebDriver() {
        return webDriver;
    }

    public static WebDriverWait getWait() {
        return wait;
    }

    protected static void waitForDom() {
        getWebDriver().executeScript("Ext.onReady(function () {});");
    }

    protected static void waitForLoad() {
        ExpectedCondition<Boolean> pageLoadCondition = driver -> ((JavascriptExecutor) driver).executeScript("return document.readyState").equals("complete");
        WebDriverWait wait = new WebDriverWait(getWebDriver(), 30);
        wait.until(pageLoadCondition);
    }

    protected void doubleClick(WebElement item) {
        new Actions(getWebDriver()).doubleClick(item).build().perform();
    }

    protected void dragAndDrop(WebElement item, int x, int y) {
        new Actions(getWebDriver()).clickAndHold(item).moveByOffset(x, y).release().build().perform();
    }

    protected void pressKey(WebElement item, Keys keys) {
        new Actions(getWebDriver()).keyDown(item, keys).keyUp(keys).build().perform();
    }

    protected void rightClick(WebElement item) {
        new Actions(getWebDriver()).contextClick(item).build().perform();
    }

    protected void mouseover(WebElement item) {
        new Actions(getWebDriver()).moveToElement(item).build().perform();
    }

    protected void sleep() throws InterruptedException {
        Thread.sleep(1500);
    }

    protected boolean existsElement(String selector) {
        try {
            getWebDriver().findElementByCssSelector(selector);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
