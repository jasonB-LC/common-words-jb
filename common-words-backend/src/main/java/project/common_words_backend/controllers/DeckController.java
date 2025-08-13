package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.*;
import project.common_words_backend.repositories.DeckRepository;
import java.util.List;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/decks")
public class DeckController {
    @Autowired
    DeckRepository deckRepository;

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
        deckRepository.save(deck);
        return new ResponseEntity<>(deck, HttpStatus.CREATED);
    }

    @PutMapping(value="/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateDeck(@PathVariable int id, @RequestBody Deck updatedDeck){
        return deckRepository.findById(id)
                .map(deck -> {
                    // Update deck properties
                    deck.setName(updatedDeck.getName());
                    deck.setLanguageId(updatedDeck.getLanguageId());
                    deck.getFlashCards().clear();
                    if (updatedDeck.getFlashCards() != null) {
                        for (FlashCard flashCard : updatedDeck.getFlashCards()) {
                            flashCard.setDeck(deck); // Set the deck reference
                            deck.getFlashCards().add(flashCard);
                        }
                    }
                    System.out.printf("deck " + deck.getName());
                    Deck savedDeck = deckRepository.save(deck);
                    return ResponseEntity.ok(savedDeck);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteDeck(@PathVariable int id){
        deckRepository.deleteById(id);
    }
}
