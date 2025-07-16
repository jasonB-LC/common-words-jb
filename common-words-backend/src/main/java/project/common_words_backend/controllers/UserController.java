package project.common_words_backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.UserDTO;
import project.common_words_backend.repositories.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    @GetMapping("")
//    public List<User> getAllUsers(){
//        return userRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public User getUser(@PathVariable int id) {
//        return userRepository.findById(id).orElse(null);
//    }

//    @PostMapping(value="", consumes=MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> createUser(UserDTO userData){
//        User newUser = new User(userData.getUserName(), userData.getFirstName(), userData.getLastName(), userData.getPassword());
//        System.out.println("userData.getUserName() " + userData.getUserName());
//        userRepository.save(newUser);
//        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
//    }

    @PostMapping(value="", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewUser(@RequestBody UserDTO userData){

        User newUser = new User(userData.getUserName(), userData.getFirstName(), userData.getLastName(), userData.getPassword());
        userRepository.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
//    @PutMapping("/{id}")
//    public User updateItem(@PathVariable int id, @RequestBody User user){
//        user.setId(id);
//        return userRepository.save(user);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteItem(@PathVariable int id){
//        userRepository.deleteById(id);
//    }
}
