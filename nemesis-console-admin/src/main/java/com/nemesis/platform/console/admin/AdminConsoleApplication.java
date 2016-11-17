package com.nemesis.platform.console.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * @author Petar Tahchiev
 * @since 1.0
 */
@SpringBootApplication
public class AdminConsoleApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(AdminConsoleApplication.class);
    }

    public static void main(String[] args) {

        SpringApplication application = new SpringApplication(AdminConsoleApplication.class);
        application.setWebEnvironment(true);
        //application.setBanner(new NemesisResourceBanner(new ClassPathResource("nemesis-banner.txt")));

        application.run(args);
    }
}
