package project.common_words_backend.controllers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
public class FileGetController {
    @Value("${app.upload.directory}")
    private String uploadDirectory;

    @GetMapping("/api/download/{filename}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String filename) throws IOException {
        File file = new File(uploadDirectory + "/soundfiles/" + filename);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        System.out.printf("file " + file);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + filename + "\"");
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.ALL_VALUE); // Adjust based on actual file type

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .body(resource);
    }
}
