package com.nemesis.console.backend.storefront;

import com.nemesis.platform.consoles.common.core.ConsoleProperties;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;

@Controller
public class BackendConsoleController {

    @Autowired
    private ConsoleProperties consoleProperties;

    @RequestMapping(value = { "/", "/console" }, method = RequestMethod.GET)
    public String home(final Model model, final HttpServletRequest request) {
        model.addAttribute("websiteBaseUrl", consoleProperties.getWebsiteBaseUrl());
        model.addAttribute("restBaseUrl", consoleProperties.getRestBaseUrl());
        return "index";
    }

    @RequestMapping(value = { "/login" }, method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value = { "/media/**" }, method = RequestMethod.GET)
    public void media(final HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuilder stringUrl = new StringBuilder(consoleProperties.getWebsiteBaseUrl());
        if (!consoleProperties.getWebsiteBaseUrl().endsWith("/")) {
            stringUrl.append("/");
        }

        final String mediaUrl =
                        request.getRequestURI().substring(request.getRequestURI().indexOf(request.getContextPath()) + request.getContextPath().length() + 1);

        stringUrl.append(mediaUrl);

        final URL url = new URL(stringUrl.toString());
        final URLConnection uc = url.openConnection();

        response.setContentType(uc.getContentType());
        response.setContentLength(uc.getContentLength());

        IOUtils.copy(uc.getInputStream(), response.getOutputStream());
    }
}
