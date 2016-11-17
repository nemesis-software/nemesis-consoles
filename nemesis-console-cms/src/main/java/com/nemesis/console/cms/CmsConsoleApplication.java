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
