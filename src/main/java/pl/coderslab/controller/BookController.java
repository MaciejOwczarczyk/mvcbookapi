package pl.coderslab.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.entity.Book;
import pl.coderslab.service.BookService;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/")
        public List<Book> books() {
                return bookService.getList();
        }

        @PostMapping("/")
        public void addBook(@RequestBody Book book) {
                bookService.addBook(book);
        }

        @GetMapping("/{bookId}")
        public Book book(@PathVariable String bookId) {
            long bookid = Long.parseLong(bookId);
            return bookService.getBook(bookid);
        }

        @PutMapping("/{bookId}")
        public Book updatebook(@PathVariable String bookId, @RequestBody Book book) {
            long bookid = Long.parseLong(bookId);
            return bookService.updateBook(bookid, book);
        }

        @DeleteMapping("/{bookId}")
        public void deleteBook(@PathVariable String bookId) {
            long bookid = Long.parseLong(bookId);
            bookService.deleteBook(bookid);
        }
}
