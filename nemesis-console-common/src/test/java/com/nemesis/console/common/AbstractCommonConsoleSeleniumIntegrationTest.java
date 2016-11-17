package com.nemesis.console.common;

import com.nemesis.platform.util.test.IntegrationTest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Rule;
import org.junit.experimental.categories.Category;
import org.junit.rules.MethodRule;
import org.junit.rules.TestName;
import org.junit.runner.RunWith;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AbstractTestExecutionListener;

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
@WebIntegrationTest
@RunWith(SpringJUnit4ClassRunner.class)
@Category(value = IntegrationTest.class)
public abstract class AbstractCommonConsoleSeleniumIntegrationTest extends AbstractTestExecutionListener {

    protected final Logger LOG = LogManager.getLogger(getClass());

    @Autowired
    protected RemoteWebDriver webDriver;

    protected WebDriverWait wait;

    @Rule
    public TestName testName = new TestName();

    @Rule
    public ScreenshotOnFailTestRule screenshotTestRule = new ScreenshotOnFailTestRule();

    public abstract void tearDown();

    class ScreenshotOnFailTestRule implements MethodRule {
        public Statement apply(final Statement statement, final FrameworkMethod frameworkMethod, final Object o) {
            return new Statement() {
                @Override
                public void evaluate() throws Throwable {
                    try {
                        statement.evaluate();
                    } catch (Throwable t) {
                        LOG.error(t.getMessage(), t);
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

    public RemoteWebDriver getWebDriver() {
        return webDriver;
    }

    public WebDriverWait getWait() {
        return wait;
    }

    protected void waitForDom() {
        getWebDriver().executeScript("Ext.onReady(function () {});");
    }

    protected void waitForLoad() {
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
