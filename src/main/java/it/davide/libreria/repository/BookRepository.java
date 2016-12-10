package it.davide.libreria.repository;

import it.davide.libreria.domain.Author;
import it.davide.libreria.domain.Book;
import it.davide.libreria.domain.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the Book entity.
 */
@SuppressWarnings("unused")
public interface BookRepository extends JpaRepository<Book,Long> { 
	
	Page<Book> findAllByAuthor(Pageable pageable, Author author);

}
