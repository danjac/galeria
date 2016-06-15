import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Icon } from 'react-fa';
import * as bs from 'react-bootstrap';


import { getImagesWithOwnership } from '../selectors';
import actions from '../actions';

import Thumbnail from './thumbnail';

export class Front extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectPage = this.onSelectPage.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.page !== nextProps.location.query.page) {
      this.fetchData(nextProps);
    }
  }

  onSelectPage(pageNumber) {
    this.props.replace({
      pathname: this.props.location.pathname,
      query: {
        page: pageNumber,
      },
    });
  }

  fetchData(props) {
    const { page } = props.location.query;
    const pageNumber = page ? parseInt(page, 10) : 1;
    props.actions.fetchImagesPage(pageNumber);
  }

  renderImage(image) {
    const onDelete = () => this.props.actions.deleteImage(image.id);
    return (
      <Thumbnail
        image={image}
        url={`/image/${image.id}/`}
        onDelete={onDelete}
      />
    );
  }

  render() {
    if (this.props.isLoading) {
      return <div className="text-center"><Icon spin name="spinner" size="5x" /></div>;
    }
    const pager = this.props.pages > 1 ? (
      <bs.Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={this.props.pages}
        maxButtons={10}
        activePage={this.props.current}
        onSelect={this.onSelectPage}
      />
    ) : '';

    return (
      <div>
        {pager}
        <bs.Grid>
          <bs.Row>
            {this.props.images.map(image => {
              return (
              <bs.Col xs={6} md={4} key={image.id}>
                {this.renderImage(image)}
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
  pages: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  replace: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {
    current,
    previous,
    next,
    pages,
    isLoading } = state.images;
  return {
    current,
    previous,
    next,
    pages,
    isLoading,
    images: getImagesWithOwnership(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    replace: bindActionCreators(replace, dispatch),
    actions: bindActionCreators(actions.images, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Front);
