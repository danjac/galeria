import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-fa';
import * as bs from 'react-bootstrap';
import actions from '../actions';

export class Image extends React.Component {

  componentDidMount() {
    this.props.actions.fetchImage(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeParams.id !== this.props.routeParams.id) {
      this.props.actions.fetchImage(nextProps.routeParams.id);
    }
  }

  componentDidUpdate() {
    const title = this.refs.title && findDOMNode(this.refs.title);
    if (title) {
      title.select();
    }
  }

  renderTitle() {
    const {
      image,
      editTitle,
      actions: {
        editImageTitle,
        changeImageTitle,
      },
    } = this.props;

    const onSubmit = (event) => {
      event.preventDefault();
      const title = findDOMNode(this.refs.title).value;
      if (title) {
        changeImageTitle(image.id, title);
      }
    };

    // editTitle could more easily be handled as internal state.
    if (editTitle) {
      return (
        <form className="form-horizontal" onSubmit={onSubmit}>
          <bs.FormGroup>
            <bs.FormControl bsSize="lg" type="text" ref="title" defaultValue={image.title} />
          </bs.FormGroup>
        </form>
      );
    }
    return <h2 onClick={editImageTitle}>{image.title}</h2>;
  }

  render() {
    const { isLoading, image } = this.props;
    if (isLoading || !image) {
      return <Icon spin name="spinner" size="5x" />;
    }
    return (
      <div>
        {this.renderTitle()}
        <bs.Image src={image.image} thumbnail />
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.any,
  editTitle: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  routeParams: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return Object.assign({}, state.image, { params: state.routeParams });
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions.image, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
