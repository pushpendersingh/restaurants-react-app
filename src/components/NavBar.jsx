
import React, { Component } from 'react'
import { Navbar,Container} from 'react-bootstrap';
import Logo from './Logo'

class NavBar extends Component {
    render() {
        return (
          <div className="bg-dark">
            <Container >
                <Navbar bg="dark" className="p-0">
                  <Navbar.Brand href="/">
                    <Logo />
                  </Navbar.Brand>
                </Navbar>
            </Container>
          </div>
        )
    }
}

export default NavBar
