import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bs from 'react-bootstrap';
import * as actions from '../actions';

class Front extends React.Component {

  componentDidMount() {
    this.props.actions.getPopularImages();
  }

  render() {
    return (
      <bs.Grid>
        <bs.Row>
          {this.props.results.map(image => {
            return (
            <bs.Col xs={6} md={4} key={image.id}>
              <bs.Thumbnail src={image.thumbnail.url}>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
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
  results: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return state.images;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Front);
