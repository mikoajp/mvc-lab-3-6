const Book = require("../models/Book");
const User = require("../models/User");

const getBookDetails = (request, response) => {
    const book = Book.getAll().find(b => b.id === parseInt(request.params.id));
    const user = User.getAll().find(u => u.id === request.session.userId);
    const didUserBorrowTheBook = user ? user.findBorrowedBookById(book.id) : false;
    response.render("book-details", { title: book.title, book, didUserBorrowTheBook });
};

const postBookBorrow = (request, response) => {
    const book = Book.getAll().find(b => b.id === parseInt(request.params.id));
    const user = User.getAll().find(u => u.id === request.session.userId);
    if (user && book.available) {
        book.borrow();
        user.borrowBook(book);
        response.redirect("/books/borrow/success");
    }
};

const getBookBorrowSuccess = (request, response) => {
    response.render("success", { title: "Borrow Book Success", message: "Book borrowed successfully" });
};

const postBookReturn = (request, response) => {
    const book = Book.getAll().find(b => b.id === parseInt(request.params.id));
    const user = User.getAll().find(u => u.id === request.session.userId);
    if (user && !book.available && user.findBorrowedBookById(book.id)) {
        book.return();
        user.returnBook(book.id);
        response.redirect("/books/return/success");
    }
};

const getBookReturnSuccess = (request, response) => {
    response.render("success", { title: "Return Book Success", message: "Book returned successfully" });
};
const getBooksList = (request, response) => {
    const userId = request.session.userId;
    const books = Book.getAll();
    response.render("books", { title: "Books", userId, books });
};

module.exports = {
    getBookDetails,
    postBookBorrow,
    getBookBorrowSuccess,
    postBookReturn,
    getBooksList,
    getBookReturnSuccess
};
