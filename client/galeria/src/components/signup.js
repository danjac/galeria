import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import * as bs from 'react-bootstrap';
import * as api from '../actions/api';

const fields = ['username', 'email', 'password', 'passwordConfirm'];

function getValidationState(field) {
  if (field.touched) {
    if (field.error) return 'error';
    return 'success';
  }
}

function submit(values, dispatch) {
  return new Promise((resolve, reject) => {
    api.post('api/auth-user-create/', values)
    .then(payload => {
      api.setAuthToken(payload.token);
      dispatch({ type: 'CURRENT_USER_SUCCESS', payload });
      dispatch(push('/'));
    })
    .catch(error => error.response.json().then(reject));
  });
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'You must include a username';
  }
  if (!values.email) {
    errors.email = 'You must include an email address';
  }
  if (!values.password) {
    errors.password = 'You must include a password';
  }
  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords don\'t match';
  }
  return errors;
}

class Signup extends React.Component {
  render() {
    const {
      fields: { username, email, password, passwordConfirm },
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        <bs.FormGroup validationState={getValidationState(username)}>
          <bs.FormControl placeholder="Username" type="text" {...username} />
          {username.touched && username.error && <bs.HelpBlock>{username.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>
        <bs.FormGroup validationState={getValidationState(email)}>
          <bs.FormControl placeholder="Email" type="email" {...email} />
          {email.touched && email.error && <bs.HelpBlock>{email.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>
        <bs.FormGroup validationState={getValidationState(password)}>
          <bs.FormControl placeholder="Password" type="password" {...password} />
          {password.touched && password.error && <bs.HelpBlock>{password.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>
        <bs.FormGroup validationState={getValidationState(passwordConfirm)}>
          <bs.FormControl placeholder="Confirm password" type="password" {...passwordConfirm} />
          {passwordConfirm.touched &&
          passwordConfirm.error &&
          <bs.HelpBlock>{passwordConfirm.error}</bs.HelpBlock>}
          <bs.FormControl.Feedback />
        </bs.FormGroup>
        <bs.Button
          bsStyle="primary"
          type="submit"
          disabled={submitting}
        >Sign up</bs.Button>
      </form>
    );
  }
}

Signup.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'signup',
  fields,
  validate,
})(Signup);
