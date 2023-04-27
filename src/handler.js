const { nanoid } = require('nanoid');
const books = require('./books');

const responseBody = (status, { message, data }) => ({
  status,
  message,
  data,
});

const addBooksHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (name === undefined || readPage > pageCount) {
    const messageError = name === undefined ? 'Mohon isi nama buku' : 'readPage tidak boleh lebih besar dari pageCount';
    return h.response(responseBody('fail', { message: `Gagal menambahkan buku. ${messageError}` })).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response(responseBody('success', { message: 'Buku berhasil ditambahkan', data: { bookId: id } })).code(201);
  }

  return h.response(responseBody('error', { message: 'Buku gagal untuk ditambahkan' })).code(500);
};

const getAllBooksHandler = () => {
  const getBooksSpecified = [];
  books.forEach((objBook) => {
    const bookList = {
      id: objBook.id,
      name: objBook.name,
      publisher: objBook.publisher,
    };
    getBooksSpecified.push(bookList);
  });

  return responseBody('success', { data: { books: getBooksSpecified } });
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];
  if (book !== undefined) {
    return h.response(responseBody('success', { data: { book } })).code(200);
  }

  return h.response(responseBody('fail', { message: 'Buku tidak ditemukan' })).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (name === undefined || readPage > pageCount) {
    const messageError = name === undefined ? 'Mohon isi nama buku' : 'readPage tidak boleh lebih besar dari pageCount';
    return h.response(responseBody('fail', { message: `Gagal memperbarui buku. ${messageError}` })).code(400);
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    return h.response(responseBody('success', { message: 'Buku berhasil diperbarui' })).code(200);
  }

  return h.response(responseBody('fail', { message: 'Gagal memperbarui buku. Id tidak ditemukan' })).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response(responseBody('success', { message: 'Buku berhasil dihapus' })).code(200);
  }

  return h.response(responseBody('fail', { message: 'Buku gagal dihapus. Id tidak ditemukan' })).code(404);
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
