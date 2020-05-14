import React, { Component } from 'react'
import logo from '../logo.svg'

class Logo extends Component {
    render() {
        return (
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
        )
    }
}

export default Logo
