package project.common_words_backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.Category;
import project.common_words_backend.models.Deck;
import project.common_words_backend.models.EBook;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.EBookDTO;
import project.common_words_backend.models.dto.UserDTO;
import project.common_words_backend.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return new ResponseEntity<>(allUsers, HttpStatus.OK); // 200
}
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeckById(@PathVariable int id) {
        User user = userRepository.findById(id).orElse(null);
        return new ResponseEntity<>(user, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewUser(@RequestBody UserDTO userData){

        User newUser = new User(userData.getUserName(), userData.getFirstName(), userData.getLastName(), userData.getPassword());
        userRepository.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id){
        userRepository.deleteById(id);
    }

}
