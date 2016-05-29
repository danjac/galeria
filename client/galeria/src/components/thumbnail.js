import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import { Link } from 'react-router';
import { truncate } from 'lodash';

const Thumbnail = props => {
  const { image, onDelete } = props;

  const deleteBtn = image.isOwner && (
    <bs.Button bsStyle="danger" onClick={onDelete}>Delete</bs.Button>
  );

  return (
    <bs.Thumbnail src={image.thumbnail.url}>
      <h3><Link to={`/image/${image.id}/`}>{truncate(image.title, 30)}</Link></h3>
      {image.description && <p>{image.description}</p>}
      {deleteBtn}
    </bs.Thumbnail>
  );
};

Thumbnail.propTypes = {
  onDelete: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};

export default Thumbnail;
