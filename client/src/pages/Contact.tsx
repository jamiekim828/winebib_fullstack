import React from 'react'
import emailjs from '@emailjs/browser';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const templateParams = {
    name: 'James',
    notes: 'Check this out!'
};

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
// });

export default function Contact() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const form = React.createRef();

  const sendEmail = (e:React.FormEventHandler<HTMLFormElement>) => {
    console.log(e)

    // emailjs
    //   .sendForm(
    //     'service_7y1qg9c',
    //     'template_3g5m4aj',
    //     form.current,
    //     'OnLJ4Ok9kjYS26JCh'
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       handleClick();
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    // e.target.reset();
  };


  return (
    <div><Card className=''>
    <CardContent>
    {/* ref={form} onSubmit={sendEmail} */}
      <form >
        <Grid container spacing={1}>
          <Grid xs={12} sm={6} item>
            <TextField
              label='First Name'
              name='First_Name'
              placeholder='Enter first name'
              variant='outlined'
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              label='Last Name'
              name='Last_Name'
              placeholder='Enter last name'
              variant='outlined'
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={12} item>
            <TextField
              type='email'
              label='Email'
              name='Email'
              placeholder='Enter your email address'
              variant='outlined'
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={12} item>
            <TextField
              type='number'
              label='Phone'
              name='Phone'
              placeholder='Enter phone number'
              variant='outlined'
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={12} item>
            <TextField
              multiline
              minRows={5}
              label='Message'
              name='Message'
              placeholder='Type your message'
              variant='outlined'
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={12} item>
            <Button
              type='submit'
              variant='contained'
              
              fullWidth
            >
              SUBMIT
            </Button>
            {/* <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity='success'
                sx={{ width: '100%' }}
              >
                This is a success message!
              </Alert>
            </Snackbar> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  </Card></div>
  )
}
