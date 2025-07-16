package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.EBook;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.EBookDTO;
import project.common_words_backend.models.dto.UserDTO;
import project.common_words_backend.repositories.EBookRepository;
import project.common_words_backend.repositories.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/eBooks")
public class EBookController {

    @Autowired
    EBookRepository eBookRepository;

    @Autowired
    UserRepository userRepository;

    public EBookController(EBookRepository eBookRepository) {
        this.eBookRepository = eBookRepository;
    }
//    @GetMapping("")
//    public List<EBook> getAllItems(){
//        return eBookRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public EBook getItem(@PathVariable int id) {
//        return eBookRepository.findById(id).orElse(null);
//    }


    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewEBook(@RequestBody EBookDTO eBookData){
        User user = userRepository.findById(eBookData.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + eBookData.getUserId()));

        EBook newEBook = new EBook(eBookData.getLanguageID(), user, eBookData.getTitle(), eBookData.getCreator(), eBookData.getReleaseDate(), eBookData.getSubject(), eBookData.getReadingLevel(), eBookData.getOriginalPublication(), eBookData.getCategory());
        eBookRepository.save(newEBook);
        return new ResponseEntity<>(newEBook, HttpStatus.CREATED);
    }

//    @PutMapping("/{id}")
//    public EBook updateItem(@PathVariable int id, @RequestBody EBook eBook){
//        eBook.setId(id);
//        return eBookRepository.save(eBook);
//    }

//    @DeleteMapping("/{id}")
//    public void deleteItem(@PathVariable int id){
//        eBookRepository.deleteById(id);
//    }
}
