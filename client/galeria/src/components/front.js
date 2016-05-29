import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import * as bs from 'react-bootstrap';


import { getImagesWithOwnership } from '../selectors';
import * as actions from '../actions';

import Thumbnail from './thumbnail';

export class Front extends React.Component {

  constructor(props) {
    super(props);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.getPopularImages();
  }

  onNextPage() {
    this.props.actions.fetchImagesPage(this.props.next);
  }

  onPrevPage() {
    this.props.actions.fetchImagesPage(this.props.previous);
  }

  render() {
    if (this.props.isLoading) {
      return <div className="text-center"><Icon spin name="spinner" size="5x" /></div>;
    }
    const pager = (
      <bs.Pager>
        <bs.PageItem
          previous
          onSelect={this.onPrevPage}
          disabled={!this.props.previous}
        >&larr; Previous</bs.PageItem>
        <bs.PageItem
          next
          onSelect={this.onNextPage}
          disabled={!this.props.next}
        >&rarr; Next</bs.PageItem>
      </bs.Pager>
    );

    return (
      <div>
        {pager}
        <bs.Grid>
          <bs.Row>
            {this.props.images.map(image => {
              const onDelete = () => this.props.actions.deleteImage(image.id);
              return (
              <bs.Col xs={6} md={4} key={image.id}>
                <Thumbnail image={image} onDelete={onDelete} />
              </bs.Col>
              );
            })}
          </bs.Row>
        </bs.Grid>
        {pager}
      </div>
    );
  }
}

Front.propTypes = {
  previous: PropTypes.any,
  next: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { previous, next, isLoading } = state.images;
  return {
    previous,
    next,
    isLoading,
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
