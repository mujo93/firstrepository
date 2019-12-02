import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Footer.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <footer className="footer">
                <div className="container">
                    <span> &copy; 2019-Mucahit Bayrak</span>
                </div>
            </footer>
      </div>
    );
  }
}
