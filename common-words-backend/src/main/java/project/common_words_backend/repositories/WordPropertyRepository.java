package project.common_words_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.common_words_backend.models.WordProperty;

@Repository
public interface WordPropertyRepository extends JpaRepository<WordProperty, Integer> {
    // Additional query methods can be defined here if needed
}
