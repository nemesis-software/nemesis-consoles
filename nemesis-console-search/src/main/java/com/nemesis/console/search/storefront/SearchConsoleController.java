package com.nemesis.console.search.storefront;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
public class SearchConsoleController {

    protected final Logger LOG = LogManager.getLogger(getClass());

    @Resource(name = "restBaseUrl")
    private String restBaseUrl;

    @RequestMapping(value = { "/", "/console" }, method = RequestMethod.GET)
    public String home(final Model model, final HttpServletRequest request) {
        model.addAttribute("restBaseUrl", restBaseUrl);
        return "redirect:/resources/index.html";
    }

    @RequestMapping(value = { "/login" }, method = RequestMethod.GET)
    public String login() {
        return "login";
    }
}
