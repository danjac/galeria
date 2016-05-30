import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Icon } from 'react-fa';
import * as bs from 'react-bootstrap';


import { getImagesWithOwnership } from '../selectors';
import * as actions from '../actions';

import Thumbnail from './thumbnail';

export class Front extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectPage = this.onSelectPage.bind(this);
  }

  componentDidMount() {
    const page = this.props.location.query.page ? parseInt(this.props.location.query.page, 10) : 1;
    this.props.actions.fetchImagesPage(page);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.page !== nextProps.location.query.page) {
      const page = parseInt(nextProps.location.query.page, 10);
      this.props.actions.fetchImagesPage(page);
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

  render() {
    if (this.props.isLoading) {
      return <div className="text-center"><Icon spin name="spinner" size="5x" /></div>;
    }
    const pager = (
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
    actions: bindActionCreators(actions, dispatch),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Front);
