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
package com.nemesis.console.cms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * @author Petar Tahchiev
 * @since 1.0
 */
@SpringBootApplication
public class CmsConsoleApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(CmsConsoleApplication.class);
    }

    public static void main(String[] args) {

        SpringApplication application = new SpringApplication(CmsConsoleApplication.class);
        application.setWebEnvironment(true);
        //application.setBanner(new NemesisResourceBanner(new ClassPathResource("nemesis-banner.txt")));

        application.run(args);
    }
}
