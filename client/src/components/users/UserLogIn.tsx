import React from 'react';
import {Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './UserLogIn.css';
import { User } from '../../types/type';

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Password should contain uppercase letter, lowercase letter and number'
    ),
});

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Password should contain uppercase letter, lowercase letter and number'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match')
    .required('Password confirmation is required'),
});

export default function UserLogIn() {
  const loginHandler = (user: User) => {
    if (user) {
    }
    if (!user) {
    }
  };

  const registerHandler = (user: User) => {
    if (user) {
    }
    if (!user) {
    }
  };

  return (
    <div className='user-page'>
      <h1>My account</h1>
      <div className='user-div'>
        <div className='login-div'>
          <h3>Log in</h3>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LogInSchema}
            onSubmit={(values) => {
              loginHandler(values);
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form className='login'>
                <input placeholder='E-mail' onChange={handleChange} />
                {errors.email && touched.email ? (<p className='input-error'>*{errors.email}</p>) : null}
                <input placeholder='password' onChange={handleChange} />
                {errors.password && touched.password ? (<p className='input-error'>*{errors.password}</p>) : null}
                <button>Log in</button>
                <Link to='/help' className='password-forget'>Forgot password?</Link>
              </Form>
            )}
          </Formik>
        </div>
        <div className='register-div'>
          <h3>Register</h3>
          <Formik
            initialValues={{
              userName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              registerHandler(values);
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form className='register'>
                <input placeholder='Name' onChange={handleChange} />
                {errors.userName && touched.userName ? (<p className='input-error'>*{errors.userName}</p>) : null}
                <input placeholder='E-mail' onChange={handleChange} />
                {errors.email && touched.email ? (<p className='input-error'>*{errors.email}</p>) : null}
                <input placeholder='password' onChange={handleChange} />
                {errors.password && touched.password ? (<p className='input-error'>*{errors.password}</p>) : null}
                <input placeholder='confirm password' onChange={handleChange} />
                {errors.confirmPassword && touched.confirmPassword ? (<p className='input-error'>*{errors.confirmPassword}</p>) : null}
                <button>Register</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
