package project.common_words_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.common_words_backend.models.FlashCard;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCard, Integer>  {

}
