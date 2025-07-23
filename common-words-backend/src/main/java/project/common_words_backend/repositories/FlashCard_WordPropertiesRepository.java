package project.common_words_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.common_words_backend.models.joins.FlashCard_WordProperties;

@Repository
public interface FlashCard_WordPropertiesRepository extends JpaRepository<FlashCard_WordProperties, Integer> {
}
