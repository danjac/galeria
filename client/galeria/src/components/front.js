import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bs from 'react-bootstrap';

import { getImagesWithOwnership } from '../selectors';
import * as actions from '../actions';

export class Front extends React.Component {

  componentDidMount() {
    this.props.actions.getPopularImages();
  }

  render() {
    return (
      <bs.Grid>
        <bs.Row>
          {this.props.images.map(image => {
            return (
            <bs.Col xs={6} md={4} key={image.id}>
              <bs.Thumbnail src={image.thumbnail.url}>
                <h3>{image.title}</h3>
                {image.description && <p>{image.description}</p>}
                {image.isOwner && <b>Mine!</b>}
              </bs.Thumbnail>
            </bs.Col>
            );
          })}
        </bs.Row>
      </bs.Grid>
    );
  }
}

Front.propTypes = {
  images: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    images: getImagesWithOwnership(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Front);
