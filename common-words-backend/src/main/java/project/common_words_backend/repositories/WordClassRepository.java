package project.common_words_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.common_words_backend.models.WordClass;

@Repository
public interface WordClassRepository extends JpaRepository<WordClass, Integer> {
}
