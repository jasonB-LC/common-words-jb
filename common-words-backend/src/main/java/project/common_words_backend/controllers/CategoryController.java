package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.*;
import project.common_words_backend.models.dto.CategoryDTO;
import project.common_words_backend.repositories.CategoryRepository;
import java.util.List;

@CrossOrigin(origins = "*", maxAge =50000)
@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return new ResponseEntity<>(allCategories, HttpStatus.OK); // 200
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable int id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return new ResponseEntity<>(category, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewCategory(@RequestBody CategoryDTO categoryData){

        Category newCategory= new Category(categoryData.getName());
        categoryRepository.save(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    //No put mapping for categories.

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable int id){
        categoryRepository.deleteById(id);
    }
}
