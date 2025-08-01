package project.common_words_backend.controllers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*", maxAge =50000)
@RestController
@RequestMapping("/delete")
public class FileDeleteController {
    @Value("${app.upload.directory}")
    private String uploadDirectory;
    //TODO error handling around directory path
    //TODO give each user their own directory

    @DeleteMapping("/{filePath}")
    public boolean handleFileDelete(@PathVariable String filePath) throws IOException {
        Path path = Paths.get(uploadDirectory + "/"  + filePath);
        if (Files.exists(path)) {
            Files.delete(path); // Deletes the file
            System.out.printf("file " + filePath + " deleted");
            return true;
        }
        System.out.printf("couldn't delete " + filePath);
        return false; // File does not exist
    }


}
