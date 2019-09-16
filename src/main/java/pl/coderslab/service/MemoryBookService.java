package pl.coderslab.service;

import org.springframework.stereotype.Service;
import pl.coderslab.entity.Book;
import pl.coderslab.service.BookService;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemoryBookService implements BookService {

    private List<Book> list;
    private long lastId = 3;

    private long getNextId() {
        return ++lastId;
    }

    public MemoryBookService() {
    list = new ArrayList<>();
    list.add(new Book(1L, "9788324631766", "Thinking in Java", "Bruce Eckel", "Helion", "programming"));
    list.add(new Book(2L, "9788324627738", "Rusz glowa, Java.", "Sierra Kathy, Bates Bert", "Helion", "programming"));
    list.add(new Book(3L, "9780130819338", "Java 2. Podstawy", "Cay Horstmann, Gary Cornell", "Helion", "programming"));
}
    public List<Book> getList() {
        return list;
    }

    public void addBook(Book book) {
        book.setId(getNextId());
        list.add(book);
    }

    public Book getBook(long bookId) {
        Book book = list.stream().filter(n -> n.getId() == bookId).findFirst().orElseGet(() -> new Book());
        return book;
    }

    public Book updateBook(long id, Book book) {
        Book book1 = getBook(id);
        book1.setIsbn(book.getIsbn());
        book1.setAuthor(book.getAuthor());
        book1.setPublisher(book.getPublisher());
        book1.setTitle(book.getTitle());
        book1.setType(book.getType());
        return book1;
    }

    public void deleteBook(long id) {
        Book book = list.stream().filter(n -> n.getId() == id).findFirst().orElseGet(() -> null);
        list.remove(book);
    }

}
