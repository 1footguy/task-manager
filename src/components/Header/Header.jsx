import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/authentication";
import { useAuth } from "../../context/Auth";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import MyModal from "../Modal/MyModal";

export default function Header(props) {
    
    const navigate = useNavigate();
    const { autenticado } = useAuth();

    return (
        <>
          <MyModal {...props} />
    
          <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container style={{maxWidth: '82%'}}>
              <Navbar.Brand>Tasks to-do</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-nav" className="mb-2"/>
              <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto gap-4 tracking-wider">
                {(!autenticado) ? (
                  <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/signup" className="nav-link">Signup</Link>
                  </>
                ) : (
                  <>
                    <Button variant="outline-light" onClick={() => props.toggleForm()}>Adicionar tarefa</Button>
                    <Button variant="outline-light" onClick={() => {
                        logout();
                        navigate("/login");
                        }}>Sair</Button>
                  </>
                )}
              </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      );
    }
