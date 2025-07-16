package project.common_words_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.common_words_backend.models.Language;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Integer>  {
}
