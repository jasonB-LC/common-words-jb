package project.common_words_backend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:C:/Users/jason/Documents/LaunchCode/Practice-Unit 2/uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080/**", "http://localhost:5173/**") // Specify allowed origins// Apply CORS to all endpoints
                .allowedHeaders("*") // Allow all headers (or specify specific headers)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .maxAge(3600); // Cache preflight requests for 1 hour
    }
}