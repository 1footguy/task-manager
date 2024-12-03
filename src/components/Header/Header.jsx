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
    
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand>Tasks to-do</Navbar.Brand>
              <Nav className="ml-auto gap-4 tracking-wider">
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
            </Container>
          </Navbar>
        </>
      );
    }
