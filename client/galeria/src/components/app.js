import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
//import * as bs from 'react-bootstrap';
//import * as actions from '../actions';

require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');


class App extends React.Component {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
  };
};


const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
