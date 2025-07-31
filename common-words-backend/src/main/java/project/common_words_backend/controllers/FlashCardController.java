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
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/flashCards")
public class FlashCardController {
    @Autowired
    FlashCardRepository flashCardRepository;

    @Autowired
    DeckRepository deckRepository;

    @Value("${app.upload.directory}")
    private String uploadDirectory;
    //TODO error handling around directory path

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
//    @PutMapping(value="/soundfile", consumes=MediaType.)
    @DeleteMapping("/{id}")
    public void deleteFlashCard(@PathVariable int id){
        flashCardRepository.deleteById(id);
    }

    public void saveUploadedFile(MultipartFile file) throws IOException {
        String filePath = uploadDirectory + File.separator + file.getOriginalFilename();
        file.transferTo(new File(filePath));
    }
}
