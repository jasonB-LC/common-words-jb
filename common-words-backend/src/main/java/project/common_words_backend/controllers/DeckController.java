package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.Deck;
import project.common_words_backend.models.Language;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.DeckDTO;
import project.common_words_backend.repositories.DeckRepository;
import project.common_words_backend.repositories.LanguageRepository;
import project.common_words_backend.repositories.UserRepository;
import java.util.List;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/decks")
public class DeckController {
    @Autowired
    DeckRepository deckRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LanguageRepository languageRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllDecks() {
        List<Deck> allDecks = deckRepository.findAll();
        return new ResponseEntity<>(allDecks, HttpStatus.OK); // 200
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeckById(@PathVariable int id) {
        Deck deck = deckRepository.findById(id).orElse(null);
        return new ResponseEntity<>(deck, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewDeck(@RequestBody Deck deck){
        Deck newDeck = new Deck(deck.getName(), deck.getLanguageId());
        deckRepository.save(newDeck);
        return new ResponseEntity<>(newDeck, HttpStatus.CREATED);
    }

    @PutMapping(value="/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateDeck(@PathVariable int id, @RequestBody DeckDTO deckData){
        Deck newDeck = new Deck(deckData.getName(), deckData.getLanguageId());
        newDeck.setId(id);
        deckRepository.save(newDeck);
        return new ResponseEntity<>(newDeck, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteDeck(@PathVariable int id){
        deckRepository.deleteById(id);
    }
}
