import { Navbar , Nav , Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

  const navbar = () =>{

    return (
    <>
   
    <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand href as={NavLink} to='/'>React App</Navbar.Brand>
      <Nav className="me-auto">        
        {/* <Nav.Link href="#features">Features</Nav.Link> */}
        <Nav.Link href as={NavLink} to='/dashboard'>Dashboard</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  
  </>

    )
}

export default navbar