package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.Category;
import project.common_words_backend.models.EBook;
import project.common_words_backend.models.Language;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.EBookDTO;
import project.common_words_backend.repositories.CategoryRepository;
import project.common_words_backend.repositories.EBookRepository;
import project.common_words_backend.repositories.LanguageRepository;
import project.common_words_backend.repositories.UserRepository;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/eBooks")
public class EBookController {

    @Autowired
    EBookRepository eBookRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllEBooks() {
        List<EBook> allEBooks = eBookRepository.findAll();
        return new ResponseEntity<>(allEBooks, HttpStatus.OK); // 200
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEBookById(@PathVariable int id) {
        EBook eBook = eBookRepository.findById(id).orElse(null);
        return new ResponseEntity<>(eBook, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewEBook(@RequestBody EBookDTO eBookData){
        Language language = languageRepository.findById(eBookData.getLanguageId()).orElse(null);
        List<Category> categories = new ArrayList<>();
        for (int categoryId : eBookData.getCategoryIds()) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                categories.add(category);
            }
        }
        EBook newEBook = new EBook(language,  eBookData.getTitle(), eBookData.getCreator(), eBookData.getReleaseDate(), eBookData.getSubject(), eBookData.getReadingLevel(), eBookData.getOriginalPublication(), categories);
        eBookRepository.save(newEBook);
        return new ResponseEntity<>(newEBook, HttpStatus.CREATED);
    }

    @PutMapping(value="/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEBook(@PathVariable int id, @RequestBody EBookDTO eBookData){
        Language language = languageRepository.findById(eBookData.getLanguageId()).orElse(null);
        List<Category> categories = new ArrayList<>();
        for (int categoryId : eBookData.getCategoryIds()) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                categories.add(category);
            }
        }
        EBook newEBook = new EBook(language, eBookData.getTitle(), eBookData.getCreator(), eBookData.getReleaseDate(), eBookData.getSubject(), eBookData.getReadingLevel(), eBookData.getOriginalPublication(), categories);

        newEBook.setId(id);
        eBookRepository.save(newEBook);
        return new ResponseEntity<>(newEBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteEBook(@PathVariable int id){
        eBookRepository.deleteById(id);
    }
}
