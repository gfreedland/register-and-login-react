import React from 'react';
import {
  Field,
  reduxForm
} from 'redux-form';

import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class EmployeeForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const {
      handleSubmit,
      isEdit,
      handleUpdate,
      reset,
      initialize
    } = this.props;
    if (!isEdit) {
      handleSubmit();
      initialize();
      reset();
    } else {
      handleUpdate();
      reset();
    }
  };

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

  renderSelectField = ({
    input,
    label,
    meta,
    children,
    ...custom
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor={input.name}>{label}</label>
        <Select
          native
          {...input}
          {...custom}
          inputProps={{
            name: 'category',
            id: 'category-native-simple'
          }}
          id={input.name}
        >
          {children}
        </Select>
        {this.renderError(meta)}
      </div>
    );
  };

  renderBonus = (val) => {
    if (val) {
      return (
        <Field name="bonus" type="text" component={this.renderInputField} label="Enter Bonus Amount" />
      );
    }
    return (<div />);
  }

  renderCheckbox = ({ input, label }) => {
    // console.log(meta);
    return (
      <div className="field">
        <label htmlFor={input.name}>{label}</label>
        <FormControlLabel
          control={
            <Checkbox checked={!!input.value} onChange={input.onChange} />
          }
          id={input.name}
        />
        {this.renderBonus(input.value)}
      </div>
    );
  }

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
      pristine,
      reset,
      submitting,
      invalid,
      isEdit,
      id,
      // resetEdit,
      hideModal
    } = this.props;

    let title = <p><u>Add a user</u></p>;
    if (isEdit) {
      title = <p><u>Editing User {id}</u></p>;
    }

    let buttons = (
      <div>
        <button
          className="ui button primary"
          type="submit"
          onClick={hideModal}
          disabled={pristine || submitting || invalid}
        >Add User
        </button>
        <button
          className="ui button primary"
          type="button"
          onClick={reset}
          disabled={pristine}
        >Clear Values
        </button>
        <button
          className="ui button primary"
          type="button"
          onClick={hideModal}
        >Hide
        </button>
      </div>
    );

    if (isEdit) {
      buttons = (
        <div>
          <button
            className="ui button primary"
            type="submit"
            onClick={hideModal}
            disabled={pristine || submitting || invalid}
          >Save
          </button>
          <button
            className="ui button primary"
            type="button"
            onClick={reset}
            disabled={pristine}
          >Reset
          </button>
          <button
            className="ui button primary"
            type="button"
            onClick={hideModal}
          >Hide
          </button>
        </div>
      );
    }

    const options = [
      'Project Manager',
      'HR',
      'Developer',
      'Top Manager'
    ];

    return (
      <form onSubmit={(e) => this.onSubmit(e)} className="ui form error">
        {title}
        <Field name="email" type="email" component={this.renderInputField} label="Email" />
        <Field name="first_name" type="text" component={this.renderInputField} label="First Name" />
        <Field name="last_name" type="text" component={this.renderInputField} label="Last Name" />
        <Field name="salary" type="text" component={this.renderInputField} label="Salary" />
        <Field
          name="role"
          component={this.renderSelectField}
          label="Select Role"
        >
          <option value="">-</option>
          {options.map((entry, index) => <option value={entry} key={index}>{entry}</option>)}
        </Field>
        <Field name="isBonus" component={this.renderCheckbox} label="Annual Bonus?" />

        {buttons}
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

  if (!formValues.first_name) {
    errors.first_name = 'You must enter your first name ';
  }

  if (!formValues.last_name) {
    errors.last_name = 'You must enter your last name ';
  }

  if (!formValues.salary) {
    errors.salary = 'You must enter a number';
  } else if (+formValues.salary !== parseInt(formValues.salary, 10)) {
    errors.salary = 'You must enter a numerical value';
  } else if (parseInt(formValues.salary, 10) < 0) {
    errors.salary = 'You cannot enter a value less than zero';
  }

  if (!formValues.bonus) {
    errors.bonus = 'You must enter a number';
  } else if (+formValues.bonus !== parseInt(formValues.bonus, 10)) {
    errors.bonus = 'You must enter a numerical value';
  } else if (parseInt(formValues.bonus, 10) < 1) {
    errors.bonus = 'You must enter a value more than zero';
  }

  return errors;
};


export default reduxForm({
  form: 'employeeForm',
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(EmployeeForm);
