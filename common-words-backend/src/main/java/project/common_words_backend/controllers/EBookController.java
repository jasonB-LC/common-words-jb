package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.Category;
import project.common_words_backend.models.EBook;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.EBookDTO;
import project.common_words_backend.models.dto.UserDTO;
import project.common_words_backend.repositories.CategoryRepository;
import project.common_words_backend.repositories.EBookRepository;
import project.common_words_backend.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/eBooks")
public class EBookController {

    @Autowired
    EBookRepository eBookRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

//    public EBookController(EBookRepository eBookRepository) {
//        this.eBookRepository = eBookRepository;
//    }
    @GetMapping("")
    public ResponseEntity<?> getAllEBooks() {
        List<EBook> allEBooks = eBookRepository.findAll();
        return new ResponseEntity<>(allEBooks, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewEBook(@RequestBody EBookDTO eBookData){
        User user = userRepository.findById(eBookData.getUserId()).orElse(null);
        List<Category> categories = new ArrayList<>();
        for (int categoryId : eBookData.getCategoryIds()) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                categories.add(category);
            }
        }
        EBook newEBook = new EBook(eBookData.getLanguageID(), user, eBookData.getTitle(), eBookData.getCreator(), eBookData.getReleaseDate(), eBookData.getSubject(), eBookData.getReadingLevel(), eBookData.getOriginalPublication(), categories);
        eBookRepository.save(newEBook);
        return new ResponseEntity<>(newEBook, HttpStatus.CREATED);
    }

    @PutMapping(value="/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public EBook updateEbook(@PathVariable int id, @RequestBody EBookDTO eBookData){
        User user = userRepository.findById(eBookData.getUserId()).orElse(null);
        List<Category> categories = new ArrayList<>();
        for (int categoryId : eBookData.getCategoryIds()) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                categories.add(category);
            }
        }
        EBook newEBook = new EBook(eBookData.getLanguageID(), user, eBookData.getTitle(), eBookData.getCreator(), eBookData.getReleaseDate(), eBookData.getSubject(), eBookData.getReadingLevel(), eBookData.getOriginalPublication(), categories);

        newEBook.setId(id);
        return eBookRepository.save(newEBook);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id){
        eBookRepository.deleteById(id);
    }
}
