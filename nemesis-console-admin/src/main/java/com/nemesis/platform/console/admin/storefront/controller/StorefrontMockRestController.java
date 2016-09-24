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
package com.nemesis.platform.console.admin.storefront.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @version $Id$
 */
@Controller
@RequestMapping(value = "/mock/storefront/rest/platform/")
public class StorefrontMockRestController {

    static final List<Map.Entry<String, String>> PROPERTIES = new ArrayList<>();

    static {
        PROPERTIES.add(new AbstractMap.SimpleEntry<>("one", "1"));
        PROPERTIES.add(new AbstractMap.SimpleEntry<>("two", "2"));
        PROPERTIES.add(new AbstractMap.SimpleEntry<>("three", "3"));
        PROPERTIES.add(new AbstractMap.SimpleEntry<>("four", "4"));
    }

    protected final Logger LOG = LogManager.getLogger(getClass());

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/property", method = RequestMethod.GET, produces = "application/json")
    public List<Map.Entry<String, String>> getSystemProperties() {
        return PROPERTIES;
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/property/{key}", method = RequestMethod.GET, produces = "application/json")
    public String getSystemProperty(@PathVariable(value = "key") final String key) {
        for (Map.Entry<String, String> e : PROPERTIES) {
            if (e.getKey().equals(key)) {
                return e.getValue();
            }
        }
        return null;
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/property/{property_id}", method = RequestMethod.PUT, consumes = "application/json")
    public void updateSystemProperty(@PathVariable(value = "property_id") final String propertyId, @RequestBody final Map<String, String> properties) {
        //dummy
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/property", method = RequestMethod.POST, consumes = "application/json")
    public void addSystemProperty(@RequestBody final Map<String, String> properties) {
        //dummy
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/property/{key}", method = RequestMethod.DELETE, consumes = "application/json")
    public void deleteSystemProperty(@PathVariable(value = "key") final String key) {
        //dummy
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/idDiscriminator/{pk}", method = RequestMethod.GET, produces = "application/json")
    public Integer getIdDiscriminatorForPK(@PathVariable(value = "pk") final Long pk) {
        return 100;
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/loglevel", method = RequestMethod.GET, produces = "application/json")
    public List<Map<String, String>> getLogLevels() {
        final List<Map<String, String>> result = new ArrayList<>();

        final Map<String, String> levelInfo = new HashMap<>();
        levelInfo.put("id", "INFO");

        final Map<String, String> levelDebug = new HashMap<>();
        levelDebug.put("id", "DEBUG");

        result.add(levelInfo);
        result.add(levelDebug);

        return result;
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/logger", method = RequestMethod.GET, produces = "application/json")
    public List<Map<String, String>> getLoggers() {
        final List<Map<String, String>> result = new ArrayList<>();

        final Map<String, String> logger1 = new HashMap<>();
        logger1.put("id", "logger-1");
        logger1.put("name", "logger one");
        logger1.put("parentName", "");
        logger1.put("level", "INFO");

        final Map<String, String> logger2 = new HashMap<>();
        logger2.put("id", "logger-2");
        logger2.put("name", "logger two");
        logger2.put("parentName", "");
        logger2.put("level", "WARN");

        final Map<String, String> logger3 = new HashMap<>();
        logger3.put("id", "logger-3");
        logger3.put("name", "logger three");
        logger3.put("parentName", "");
        logger3.put("level", "ERROR");

        result.add(logger1);
        result.add(logger2);
        result.add(logger3);

        return result;
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/logger/{logger_id}", method = RequestMethod.PUT, consumes = "application/json")
    public void updateLogger(@PathVariable(value = "logger_id") final String loggerId, @RequestBody final Object logger) {
        //dummy
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/logger", method = RequestMethod.POST, consumes = "application/json")
    public void addLogger(@RequestBody final Object logger) {
        //dummy
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/logger/{logger_id}", method = RequestMethod.DELETE, consumes = "application/json")
    public void deleteLogger(@PathVariable(value = "logger_id") final String loggerId) {
        //dummy
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/thread", method = RequestMethod.GET, produces = "application/json")
    public String threadDump() {
        return "thread dump";
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/cache", method = RequestMethod.DELETE, produces = "application/json", consumes = "application/json")
    public void clearCache() {
        //dummy
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/database", method = RequestMethod.POST)
    public void updatePlatformDatabase(@RequestParam(value = "action", defaultValue = "update") final String action) {
        //dummy
    }

    @ResponseBody
    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "/resource-usage", method = RequestMethod.GET, produces = "application/json")
    public Map<String, String> getResourceUsage() {

        final Map<String, String> result = new HashMap<>();
        result.put("percentageMemoryHeapUsage", "12");
        result.put("percentageCPUUsage", "12");
        result.put("threadCounts", "12");

        return result;
    }
}
