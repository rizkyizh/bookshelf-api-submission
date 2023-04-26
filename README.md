# Bookshelf API Using Hapi

- [API dapat menyimpan buku](#menyimpanan-buku)
- [API dapat menampilkan seluruh buku](#menampilkan-seluruh-buku)
- [API dapat menampilkan detail buku](#menampilkan-detail-buku)
- [API dapat mengubah data buku](#mengubah-data-buku)
- [API dapat menghapus buku](#menghapus-buku)
- Project menggunakan port 9000
- project memiliki runner script dengan nama start

---

## Kriteria proyek

---

- jenis penyimpanan: Array JavaScript
- struktur dari objek buku yg disimpan
  ```js
  {
    id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    author: string,
    year: string,
    isComplete: boolean,
  }
  ```
  - contoh
  ```js
  {
    id: 'kj3g6gh5343hjg5',
    title: 'One Piece',
    createdAt: '2020-12-23T23:00:09.686Z',
    updatedAt: '2020-12-23T23:00:09.686Z',
    author: 'Oda Sensei',
    year: '1997',
    isComplete: true,
  }
  ```

### Menyimpanan buku

- Route
  - Method: `POST`
  - Path: `/books`
  - Request body
    ```json
    {
      "title": "judul buku",
      "author": "penulis",
      "year": "tahun terbit",
      "isComplate": "true"
    }
    ```
  - Respone success
    - respone code: `201` (created)
    - return JSON data
      ```json
      {
        "status": "success",
        "message": "buku berhasil ditambahkan",
        "data": {
          "bookId": "kj3g6gh5343hjg5"
        }
      }
      ```
  - Response fail
    - respone code: `500`
    - return JSON data
      ```json
      {
        "status": "error",
        "message": "Buku gagal untuk ditambahkan"
      }
      ```

### Menampilkan Seluruh Buku

- Route
  - Method: `GET`
  - path: `/books`
  - Response data is exist
    - response code: 200 (ok)
    - response body: JSON
    ```json
    {
      "status": "success",
      "data": {
        "books": [
          {
            "id": "kj3g6gh5343hjg5",
            "title": "One Piece",
            "createdAt": "2020-12-23T23:00:09.686Z",
            "updatedAt": "2020-12-23T23:00:09.686Z",
            "author": "Oda Sensei",
            "year": "1997",
            "isComplete": false
          },
          {
            "id": "kj3g6gh5343hjg5",
            "title": "Naruto",
            "createdAt": "2020-12-23T23:00:09.686Z",
            "updatedAt": "2020-12-23T23:00:09.686Z",
            "author": "Masashi Kishimoto",
            "year": "2000",
            "isComplete": true
          }
        ]
      }
    }
    ```

### Menampilkan detail buku

- Route
  - Method: `GET`
  - Path: `/books/{id}`
  - Response data is exist
    - response code: `200` (ok)
    - response body: JSON
      ```json
      {
        "status": "success",
        "data": {
          "book": {
            "id": "kj3g6gh5343hjg5",
            "title": "One Piece",
            "createdAt": "2020-12-23T23:00:09.686Z",
            "updatedAt": "2020-12-23T23:00:09.686Z",
            "author": "Oda Sensei",
            "year": "1997",
            "isComplete": false
          }
        }
      }
      ```
  - Response data is empty
    - response code: `404`
    - response body: JSON
      ```json
      {
        "status": "fail",
        "message": "Buku tidak ditemukan"
      }
      ```

### Mengubah data buku

- Route
  - Method: `PUT`
  - Path: `/books/{id}`
  - Request body:
    ```js
    {
      "title": "judul buku",
      "author": "penulis",
      "year": "tahun terbit",
      "isComplate": "true"
    }
    ```
  - Response id/data is exist
    - response code: `200` (ok)
    - response body:
      ```json
      {
        "status": "success",
        "message": "Buku berhasil diperbaharui"
      }
      ```
  - Response id/data is empty
    - response code: `404` (not found)
    - response body: JSON
      ```json
      {
        "status": "fail",
        "message": "Gagal memperbarui Buku. Id Buku tidak ditemukan"
      }
      ```

### menghapus buku

- Route
  - Method: `DELETE`
  - Path: `/books/{id}`
  - Response id/data is exist
    - response code: `200` (ok)
    - response body: JSON
      ```json
      {
        "status": "success",
        "message": "Buku berhasil dihapus"
      }
      ```
  - Response id/data is empty
    - response code: `404` (not found)
    - response body: JSON
      ```json
      {
        "status": "fail",
        "message": "Buku gagal dihapus. Id Buku tidak ditemukan"
      }
      ```
