package com.nemesis.console.helpline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * @author Petar Tahchiev
 * @since 1.0
 */
@SpringBootApplication
public class HelplineConsoleApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HelplineConsoleApplication.class);
    }

    public static void main(String[] args) {

        SpringApplication application = new SpringApplication(HelplineConsoleApplication.class);
        application.setWebEnvironment(true);
        //application.setBanner(new NemesisResourceBanner(new ClassPathResource("nemesis-banner.txt")));

        application.run(args);
    }
}
