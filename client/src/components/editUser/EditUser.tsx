import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

import './EditUser.css';
import { User, UserData } from '../../types/type';
import { AppDispatch } from '../../redux/store';
import { getUserById } from '../../redux/thunks/user';

const EditSchema = Yup.object().shape({
  username: Yup.string().required('Please type your name'),
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

type Prop = {
  user: UserData;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUser({ user, setEditOpen }: Prop) {
  const [open, setOpen] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserById(user._id));
  }, [dispatch, user._id]);

  const editHandler = (newInfo: User) => {
    const userToken = localStorage.getItem('userToken');
    const url = `http://localhost:8000/user/${user._id}`;

    axios
      .put(url, newInfo, { headers: { Authorization: `Bearer ${userToken}` } })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getUserById(user._id));
          setWarning('Succesfully updated!');
          setOpen(true);
        }
        if (res.status === 401) {
          setWarning('Update failed. Please log in again');
          setOpen(true);
        }
      })
      .catch((err) => {
        setWarning('Something is wrong. Please log in again');
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='edit-div'>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={EditSchema}
        onSubmit={(values) => {
          editHandler(values);
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <div>
              <label>New user name</label>
              <input type='text' name='username' onChange={handleChange} />
            </div>
            <div>
              <label>New password</label>
              <input type='password' name='password' onChange={handleChange} />
            </div>
            {errors.password && touched.password ? (
              <p className='input-error'>*{errors.password}</p>
            ) : null}
            <div>
              <label>Confirm password</label>
              <input
                type='password'
                name='confirmPassword'
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <p className='input-error'>*{errors.confirmPassword}</p>
            ) : null}
            <button className='update-btn' type='submit'>
              SAVE
            </button>
          </Form>
        )}
      </Formik>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Message</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {warning}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setEditOpen(false);
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
