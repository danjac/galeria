import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-fa';
import * as bs from 'react-bootstrap';
import * as actions from '../actions';

export class Image extends React.Component {

  componentDidMount() {
    this.props.actions.fetchImage(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeParams.id !== this.props.routeParams.id) {
      this.props.actions.fetchImage(nextProps.routeParams.id);
    }
  }

  render() {
    const { isLoading, image } = this.props;
    if (isLoading || !image) {
      return <Icon spin name="spinner" size="5x" />;
    }
    return (
      <div>
        <h2>{image.title}</h2>
        <bs.Image src={image.image} thumbnail />
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  routeParams: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return Object.assign({}, state.image, { params: state.routeParams });
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
