package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.*;
import project.common_words_backend.models.dto.FlashCardDTO;
import project.common_words_backend.repositories.DeckRepository;
import project.common_words_backend.repositories.FlashCardRepository;
import java.util.List;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/api/flashCards")
public class FlashCardController {
    @Autowired
    FlashCardRepository flashCardRepository;

    @Autowired
    DeckRepository deckRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllFlashCards() {
        List<FlashCard> allFlashCards = flashCardRepository.findAll();
        return new ResponseEntity<>(allFlashCards, HttpStatus.OK); // 200
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFlashCardById(@PathVariable int id) {
        FlashCard flashCard = flashCardRepository.findById(id).orElse(null);
        return new ResponseEntity<>(flashCard, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewFlashCard(@RequestBody FlashCardDTO flashCardData){
        Deck deck = deckRepository.findById(flashCardData.getDeckId()).orElse(null);

        FlashCard newFlashCard = new FlashCard(deck, flashCardData.getDaysUntilDue(), flashCardData.getDateOfLastReview(),
                flashCardData.getWordText(), flashCardData.getImageUrl(), flashCardData.getSoundfilePath());
        flashCardRepository.save(newFlashCard);
        return new ResponseEntity<>(newFlashCard, HttpStatus.CREATED);
    }

    @PutMapping(value="/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateFlashCard(@PathVariable int id, @RequestBody FlashCardDTO flashCardData){
        Deck deck = deckRepository.findById(flashCardData.getDeckId()).orElse(null);

        FlashCard newFlashCard = new FlashCard(deck, flashCardData.getDaysUntilDue(), flashCardData.getDateOfLastReview(),
                flashCardData.getWordText(), flashCardData.getImageUrl(), flashCardData.getSoundfilePath());
        newFlashCard.setId(id);
        flashCardRepository.save(newFlashCard);
        return new ResponseEntity<>(newFlashCard, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteFlashCard(@PathVariable int id){
        flashCardRepository.deleteById(id);
    }
}
