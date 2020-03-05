import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import submit from './submit';

class ExistingUserForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit();
    // console.log(formValues);
  }

  renderInputField = ({
    input,
    label,
    type,
    meta
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <p>{label}</p>
        <div>
          <input {...input} type={type} autoComplete="off" placeholder={label} />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
    return (<div />);
  };

  render() {
    const {
      // error,
      // handleSubmit,
      pristine,
      reset,
      submitting,
      invalid
    } = this.props;
    return (
      <form onSubmit={(e) => this.onSubmit(e)} className="ui form error">
        <Field name="email" type="email" component={this.renderInputField} label="Email" />
        <Field name="password" type="password" component={this.renderInputField} label="Password" />
        {/* error && <strong>{error}</strong> */}
        <div>
          <button
            className="ui button primary"
            type="submit"
            disabled={pristine || submitting || invalid}
          >Log In
          </button>
          <button
            className="ui button primary"
            type="button"
            onClick={reset}
            disabled={pristine}
          >Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'You must enter an email';
  } else if (formValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Not a valid email';
  }

  if (!formValues.password) {
    errors.password = 'You must enter a password';
  }

  return errors;
};


export default reduxForm({
  form: 'existingUserForm',
  validate
})(ExistingUserForm);
