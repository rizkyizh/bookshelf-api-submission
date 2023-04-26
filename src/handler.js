const { nanoid } = require('nanoid');
const books = require('./books');

String.prototype.toJadenCase = function () {
  return this.replace(/^\w|\s\w|\b\s\w/g, (n) => n.toUpperCase());
};

const addBooksHandler = (request, h) => {
  const {
    titleRaw, authorRaw, year, iscomplate,
  } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const title = titleRaw.toJadenCase();
  const author = authorRaw.toJadenCase();
  const newBook = {
    id,
    title,
    createdAt,
    updatedAt,
    author,
    year,
    iscomplate,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const responseSuccess = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    responseSuccess.code(201);
    return responseSuccess;
  }

  const responseFail = h.response({
    status: 'error',
    message: 'Buku gagal untuk ditambahkan',
  });
  responseFail.code(500);
  return responseFail;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const responseIsEmpty = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  responseIsEmpty.code(404);
  return responseIsEmpty;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    titleRaw, authorRaw, year, iscomplate,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const title = titleRaw.toJadenCase();
  const author = authorRaw.toJadenCase();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      title,
      author,
      year,
      iscomplate,
      updatedAt,
    };
    const responseIsExist = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    responseIsExist.code(200);
    return responseIsExist;
  }

  const responseIsEmpty = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id buku tidak ditemukan',
  });
  responseIsEmpty.code(404);
  return responseIsEmpty;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const responseIsExist = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    responseIsExist.code(200);
    return responseIsExist;
  }

  const responseIsEmpty = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus, Id buku tidak ditemukan',
  });
  responseIsEmpty.code(404);
  return responseIsEmpty;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
