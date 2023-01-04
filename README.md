# Bookstore-Project

This is a simple Bookstore REST API that allows you to do basic CRUD functionalities with the API. Create a book/author, Read(GET) a book/author, Update a book/author detail, Delete a book/author.

Authentication was done with authO.

# (INCASE YOU WANT TO TEST THIS API OUT)

WHEN YOU ACCESS ONE OF THE ROUTES BELOW FOR THE FIRST TIME, authO WILL PROMPT YOU TO CREATE AN ACCOUNT OR LOG IN. AFTER THAT YOU'RE FINE. 🎉

# B00K API ROUTE

GET /api/v1/books = protected = return all books
POST /api/v1/books = protected = adds a book to DB
PUT /api/v1/books/:id = protected = update a book
DELETE /api/v1/books/:id = protected = delete a book by id
GET /api/v1/books/:id = protected = get a book by id

# AUTHOR API ROUTE

GET /api/v1/authors = protected = return all authors
POST /api/v1/authors = protected = adds a new author to DB
PUT /api/v1/authors/:id = protected = update author details
DELETE /api/v1/authors/:id = protected = delete an author by id
GET /api/v1/authors/:id = protected = get an author detail by id
