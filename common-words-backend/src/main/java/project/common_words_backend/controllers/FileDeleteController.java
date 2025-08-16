package project.common_words_backend.controllers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*", maxAge =50000)
@RestController
@RequestMapping("/api/delete")
public class FileDeleteController {
    @Value("${app.upload.directory}")
    private String uploadDirectory;

    @DeleteMapping("/{filePath}")
    public boolean handleFileDelete(@PathVariable String filePath) throws IOException {
        Path path = Paths.get(uploadDirectory + "/soundfiles/"  + filePath);
        if (Files.exists(path)) {
            Files.delete(path); // Deletes the file
            System.out.printf("file " + filePath + " deleted");
            return true;
        }
        System.out.printf("couldn't delete " + filePath);
        return false; // File does not exist
    }


}
