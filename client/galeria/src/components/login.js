import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bs from 'react-bootstrap';
import * as actions from '../actions/auth';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const username = findDOMNode(this.refs.username).value;
    const password = findDOMNode(this.refs.password).value;
    this.props.actions.login(username, password);
  }

  render() {
    return (
      <bs.Form onSubmit={this.onSubmit}>
        <bs.FormGroup>
          <bs.FormControl type="text" ref="username" placeholder="Username" />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl type="password" ref="password" placeholder="Password" />
        </bs.FormGroup>
        <bs.Button bsStyle="primary" type="submit">Login</bs.Button>
      </bs.Form>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
};


const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
