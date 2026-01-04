import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  const token = localStorage.getItem("adminToken");

  // 🔄 Fetch all books
  const fetchBooks = async () => {
    const res = await fetch("https://bookstore-backend-render-awkc.onrender.com/api/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ➕ Add book
  const handleSubmitBook = async (e) => {
    e.preventDefault();

    const url = editingBook
      ? `https://bookstore-backend-render-awkc.onrender.com/api/books/${editingBook.id}`
      : "https://bookstore-backend-render-awkc.onrender.com/api/books";

    const method = editingBook ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        author,
        price,
        category,
        coverImage,
        description,
      }),
    });

    // reset form
    setTitle("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setCoverImage("");
    setDescription("");
    setEditingBook(null);

    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setCategory(book.category);
    setCoverImage(book.coverImage);
    setDescription(book.description);
  };

  // ❌ Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    await fetch(`https://bookstore-backend-render-awkc.onrender.com/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBooks();
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">Manage Books</h2>

      {/* Add Book Form */}
      <Form onSubmit={handleSubmitBook} className="mb-5">
        <Row className="g-3">
          <Col md={3}>
            <Form.Control
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Col>

          <Col md={3}>
            <Form.Control
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Col>

          <Col md={2}>
            <Form.Control
              placeholder="Price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Col>

          <Col md={2}>
            <Form.Control
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Col>

          <Col md={2}>
            <Button type="submit" variant="success" className="w-100">
              Add Book
            </Button>
          </Col>

          {/* REQUIRED IMAGE */}
          <Col md={6}>
            <Form.Control
              placeholder="Cover Image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />
          </Col>

          {/* REQUIRED DESCRIPTION */}
          <Col md={6}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Book Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Col>
        </Row>
      </Form>

      {/* Books Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>${book.price}</td>
              <td>{book.category}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
