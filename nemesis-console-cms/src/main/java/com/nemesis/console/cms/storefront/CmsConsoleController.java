package com.nemesis.console.cms.storefront;

import com.nemesis.platform.consoles.common.core.ConsoleProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class CmsConsoleController {

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
}

