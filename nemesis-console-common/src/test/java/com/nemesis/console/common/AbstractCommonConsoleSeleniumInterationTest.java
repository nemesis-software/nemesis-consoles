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
import org.junit.Rule;
import org.junit.experimental.categories.Category;
import org.junit.rules.MethodRule;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Base selenium tests for all consoles.
 *
 * @author Petar Tahchiev
 * @since 0.6
 */
@Category(value = IntegrationTest.class)
public abstract class AbstractCommonConsoleSeleniumInterationTest {

    protected static RemoteWebDriver webDriver;

    protected static WebDriverWait wait;

    public static void setUpClass() throws Exception {
        webDriver = new FirefoxDriver();
        wait = new WebDriverWait(getWebDriver(), 5);
    }

    @Rule
    public ScreenshotOnFailTestRule screenshotTestRule = new ScreenshotOnFailTestRule();

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
                    }
                }

                public void takeScreenshot(String fileName) throws IOException {
                    FileOutputStream out = null;
                    FileInputStream in = null;
                    try {
                        new File("target/surefire-reports/").mkdirs(); // Insure directory is there
                        out = new FileOutputStream("target/surefire-reports/screenshot-" + fileName + ".png");
                        in = new FileInputStream(((TakesScreenshot) webDriver).getScreenshotAs(OutputType.FILE));

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

    protected void rightClick(WebElement item) {
        new Actions(getWebDriver()).contextClick(item).build().perform();
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
