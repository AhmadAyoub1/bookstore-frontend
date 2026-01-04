import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <Container fluid className="admin-dashboard py-4">
      {/* Header */}
      <div className="admin-dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Admin Dashboard</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Actions */}
      <Row>
        <Col md={4}>
          <Card className="admin-action-card">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-journal-bookmark-fill me-2"></i>
                Manage Books
              </Card.Title>{" "}
              <Card.Text>Add, edit, or delete books.</Card.Text>
              <Button variant="dark" onClick={() => navigate("/admin/books")}>
                <i className="bi bi-arrow-right-circle me-2"></i>
                Go
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
