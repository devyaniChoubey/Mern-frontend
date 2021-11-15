import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import { signout } from '../../actions/auth.actions';


const Header = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(signout());
    }
    
    const renderLoggedInLinks = () => {
        return(
            <Nav>
                <li className="nav-item" onClick={logout}><span className="nav-link">Signout</span></li>
            </Nav>
        )
    }

    const renderNonLoggedInLinks = () =>{
        return(
            <Nav>
                <li className="nav-item"><NavLink to="signin" className="nav-link">Signin</NavLink></li>
                <li className="nav-item"><NavLink to="signup" className="nav-link">Signup</NavLink></li>
            </Nav>
        )
    }

    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark"  style={{zIndex : 1}}>
            <Container fluid>
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> */}
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;