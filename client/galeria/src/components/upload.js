import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import * as bs from 'react-bootstrap';
import * as api from '../actions/api';

const fields = ['title', 'description', 'image'];

function getValidationState(field) {
  if (field.touched) {
    if (field.error) return 'error';
    return 'success';
  }
}

function submit(values, dispatch) {
  const data = new window.FormData();
  data.append('title', values.title);
  data.append('description', values.description || '');
  data.append('image', values.image[0]);
  return new Promise((resolve, reject) => {
    api.post('api/images/', data)
    .then(() => dispatch(push('/')))
    .catch(error => error.response.json().then(reject));
  });
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'You must include a title';
  }
  return errors;
}

class Upload extends React.Component {
  render() {
    const {
      fields: { title, description, image },
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        <bs.FormGroup validationState={getValidationState(title)}>
          <bs.FormControl placeholder="Title" type="text" {...title} />
          {title.touched && title.error && <bs.HelpBlock>{title.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>

        <bs.FormGroup validationState={getValidationState(description)}>
          <bs.FormControl placeholder="Description" componentClass="textarea" {...description} />
          {description.touched && description.error && <bs.HelpBlock>{description.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>

        <bs.FormGroup validationState={getValidationState(image)}>
          <bs.FormControl placeholder="Password" type="file" {...image} value={undefined} />
          {image.touched && image.error && <bs.HelpBlock>{image.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>
        <bs.Button
          bsStyle="primary"
          type="submit"
          disabled={submitting}
        >Upload</bs.Button>
      </form>
    );
  }
}

Upload.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'upload',
  fields,
  validate,
})(Upload);
