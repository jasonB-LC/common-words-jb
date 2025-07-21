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
import project.common_words_backend.models.dto.CategoryDTO;
import project.common_words_backend.models.dto.EBookDTO;
import project.common_words_backend.models.dto.LanguageDTO;
import project.common_words_backend.repositories.CategoryRepository;
import project.common_words_backend.repositories.EBookRepository;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllEBooks() {
        List<Category> allCategories = categoryRepository.findAll();
        return new ResponseEntity<>(allCategories, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewCategory(@RequestBody CategoryDTO categoryData){

        Category newCategory= new Category(categoryData.getName());
        categoryRepository.save(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id){
        categoryRepository.deleteById(id);
    }
}
