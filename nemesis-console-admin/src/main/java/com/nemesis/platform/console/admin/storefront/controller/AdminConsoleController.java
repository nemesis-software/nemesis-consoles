/*
 * nemesis Platform - NExt-generation Multichannel E-commerce SYStem
 *
 * Copyright (c) 2010 - 2013 nemesis
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of nemesis
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with nemesis.
 */
package com.nemesis.platform.console.admin.storefront.controller;

import com.nemesis.platform.console.admin.storefront.UploadFileData;
import com.nemesis.platform.consoles.common.core.ConsoleProperties;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Controller
public class AdminConsoleController {

    protected final Logger LOG = LogManager.getLogger(getClass());

    @Autowired
    private ConsoleProperties consoleProperties;

    @RequestMapping(value = { "/", "/console" }, method = RequestMethod.GET)
    public String home(final Model model, final HttpServletRequest request) {
        model.addAttribute("restBaseUrl", consoleProperties.getRestBaseUrl());
        model.addAttribute("websiteBaseUrl", consoleProperties.getWebsiteBaseUrl());
        return "index";
    }

    @RequestMapping(value = { "/login" }, method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @ResponseBody
    @RequestMapping(value = { "/upload", "/console/upload" }, method = RequestMethod.POST, produces = "application/json")
    public String fileUploaded(@ModelAttribute("uploadedFile") final UploadFileData uploadedFile, final BindingResult result)
                    throws ClientProtocolException, IOException {

        String res = "success";

        InputStream inputStream = null;

        final MultipartFile file = uploadedFile.getFile();

        if (result.hasErrors()) {
            return "error";
        }

        String csvContent = "";
        try {
            inputStream = file.getInputStream();
            csvContent = IOUtils.toString(inputStream);
        } catch (final IOException e) {
            LOG.error(e.getMessage(), e);
            return "error";
        } finally {
            IOUtils.closeQuietly(inputStream);
        }

        final CloseableHttpClient httpclient = HttpClientBuilder.create().build();

        final HttpPost httpost = new HttpPost(consoleProperties.getRestBaseUrl() + "/platform/content");
        final List<NameValuePair> nvps = new ArrayList<>();
        nvps.add(new BasicNameValuePair("content", csvContent));
        nvps.add(new BasicNameValuePair("validate", "false"));

        httpost.addHeader("Content-Type", "application/json");
        httpost.setEntity(new UrlEncodedFormEntity(nvps));
        //httpost.addHeader(CorsHeaderConstants.HEADER_AC_REQUEST_METHOD, "POST");

        try (CloseableHttpResponse response = httpclient.execute(httpost)) {
            final HttpEntity entity = response.getEntity();

            res = IOUtils.toString(entity.getContent());

            // do something useful with the response body
            // and ensure it is fully consumed
            EntityUtils.consume(entity);
        }

        return res;
    }
}
