import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

import './UserLogIn.css';
import { User } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { loginUserThunk, registerUserThunk } from '../../redux/thunks/user';

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
    .max(20, 'Too Long!')
    .required('Please enter your full name'),
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
  const message = useSelector(
    (state: RootState) => state.user.message
  );
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginHandler = (user: User) => {
    if (!user) {
      return;
    }
    if (user) {
      dispatch(loginUserThunk(user));
      setOpen(true)
    }
    setOpen(true)
  };

  const registerHandler = (user: User) => {
    if (!user) {
      return;
    }
    if (user) {
      dispatch(registerUserThunk(user));
      setOpen(true);
    }
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/')
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
                <input
                  placeholder='E-mail'
                  type='email'
                  name='email'
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p className='input-error'>*{errors.email}</p>
                ) : null}
                <input
                  placeholder='password'
                  type='text'
                  name='password'
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <p className='input-error'>*{errors.password}</p>
                ) : null}
                <button type='submit'>Log in</button>
                <Link to='/help' className='password-forget'>
                  Forgot password?
                </Link>
              </Form>
            )}
          </Formik>
        </div>
        <div className='register-div'>
          <h3>Register</h3>
          <div className='after-register'>
            <h4>You'll be able to :</h4>
            <p>✔️ ACCESS YOUT ORDER HISTORY</p>
            <p>✔️ SAVE ITEMS TO YOUR WISH LIST</p>
          </div>
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
                <input
                  placeholder='Name'
                  type='userName'
                  name='userName'
                  onChange={handleChange}
                />
                {errors.userName && touched.userName ? (
                  <p className='input-error'>*{errors.userName}</p>
                ) : null}
                <input
                  placeholder='E-mail'
                  type='email'
                  name='email'
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p className='input-error'>*{errors.email}</p>
                ) : null}
                <input
                  placeholder='password'
                  type='text'
                  name='password'
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <p className='input-error'>*{errors.password}</p>
                ) : null}
                <input
                  placeholder='confirm password'
                  type='text'
                  name='confirmPassword'
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className='input-error'>*{errors.confirmPassword}</p>
                ) : null}
                <button type='submit'>Register</button>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Message</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
