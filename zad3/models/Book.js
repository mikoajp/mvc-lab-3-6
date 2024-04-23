class Book {
    constructor(id, title, author, year, available = true) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = available;
    }

    static getAll() {
        return [
            new Book(1, "Book One", "Author One", 2001),
            new Book(2, "Book Two", "Author Two", 2002),
            new Book(3, "Book Three", "Author Three", 2003),
            new Book(4, "Book Four", "Author Four", 2004),
            new Book(5, "Book Five", "Author Five", 2005)
        ];
    }
    borrow() {
        this.available = false;
    }

    return() {
        this.available = true;
    }
}

module.exports = Book;
