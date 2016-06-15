import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Thumbnail = props => {
  const { image, url } = props;
  return (
    <LinkContainer to={url}>
      <bs.Thumbnail src={image.thumbnail.url} title={image.title} />
    </LinkContainer>
  );
};

Thumbnail.propTypes = {
  image: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};
export default Thumbnail;
