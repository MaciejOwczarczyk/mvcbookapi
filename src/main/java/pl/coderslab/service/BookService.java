package pl.coderslab.service;

import pl.coderslab.entity.Book;

import java.util.List;


public interface BookService {

    List<Book> getList();
    public void addBook(Book book);
    public Book getBook(long bookId);
    public Book updateBook(long id, Book book);
    public void deleteBook(long id);
}
