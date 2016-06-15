import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { Icon } from 'react-fa';
import { LinkContainer } from 'react-router-bootstrap';
import * as bs from 'react-bootstrap';
import actions from '../actions';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('app.css');


const Navbar = props => {
  const authNav = props.isAuthenticated ? (
    <bs.Nav pullRight>
      <bs.NavItem href="#">{props.currentUser.username}</bs.NavItem>
      <bs.NavItem eventKey={4} href="#" onClick={props.actions.auth.logout}>Logout</bs.NavItem>
    </bs.Nav>
  ) : (
    <bs.Nav pullRight>
      <LinkContainer to="/login/">
        <bs.NavItem eventKey={4}>Login</bs.NavItem>
      </LinkContainer>
      <LinkContainer to="/signup/">
        <bs.NavItem eventKey={5}>Signup</bs.NavItem>
      </LinkContainer>
    </bs.Nav>
  );

  return (
    <bs.Navbar>
      <bs.Navbar.Header>
        <bs.Navbar.Brand>
          <IndexLink to={{ pathname: '/', query: { page: 1 } }}>Galeria</IndexLink>
        </bs.Navbar.Brand>
        <bs.Navbar.Toggle />
      </bs.Navbar.Header>
      <bs.Navbar.Collapse>
        <bs.Nav>
          <bs.NavItem eventKey={1} href="#">Popular</bs.NavItem>
          <bs.NavItem eventKey={2} href="#">Latest</bs.NavItem>
          <LinkContainer to="/upload/">
            <bs.NavItem eventKey={3}>Upload</bs.NavItem>
          </LinkContainer>
        </bs.Nav>
        <bs.Navbar.Form
          role="search"
          className="navbar-left"
        >
          <form onSubmit={props.onSearchSubmit}>
          <bs.FormGroup>
            <bs.InputGroup>
              <bs.InputGroup.Addon>
                <Icon name="search" />
              </bs.InputGroup.Addon>
              <bs.FormControl
                className="search"
                onChange={props.onSearchChange}
                type="search"
                placeholder="Search"
              />
            </bs.InputGroup>
          </bs.FormGroup>
        </form>
        </bs.Navbar.Form>
        {authNav}
        </bs.Navbar.Collapse>
    </bs.Navbar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.any,
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.props.actions.images.updateSearchQuery(event.target.value);
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.props.actions.images.search(this.props.searchQuery);
  }

  render() {
    return (
      <div>
        <Navbar
          onSearchChange={this.onSearchChange}
          onSearchSubmit={this.onSearchSubmit}
          {...this.props}
        />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.any,
  searchQuery: PropTypes.string,
  actions: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  const { isAuthenticated, currentUser } = state.auth;
  const { searchQuery } = state.images;
  return {
    isAuthenticated,
    currentUser,
    searchQuery,
  };
};


const mapDispatchToProps = dispatch => {
  const { images, auth } = actions;
  return {
    actions: {
      images: bindActionCreators(images, dispatch),
      auth: bindActionCreators(auth, dispatch),
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
