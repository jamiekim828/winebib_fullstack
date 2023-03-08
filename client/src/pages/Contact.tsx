import React from 'react';
import emailjs from '@emailjs/browser';
import { Card, CardContent, Grid, TextField, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Contact() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const form = React.createRef<HTMLFormElement>();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(form);
    if (form.current === null) {
      return;
    }
    emailjs
      .sendForm(
        'service_7y1qg9c',
        'template_3g5m4aj',
        form.current,
        'OnLJ4Ok9kjYS26JCh'
      )
      .then(
        (result) => {
          console.log(result.text);
          handleClick();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5rem',
      }}
    >
      <h1>Contact</h1>
      <Card style={{ width: '60%', backgroundColor: 'seashell' }}>
        <CardContent>
          <form ref={form} onSubmit={(e) => sendEmail(e)}>
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
                  style={{
                    width: '30%',
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  fullWidth
                >
                  SUBMIT
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <MuiAlert
                    onClose={handleClose}
                    severity='success'
                    sx={{ width: '100%' }}
                  >
                    Your message has been sent successfully!
                  </MuiAlert>
                </Snackbar>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
