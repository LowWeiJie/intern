import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: 10,
    marginBottom: 20
  },
});

export default function PostForm(props) {
  const token = '5d6c0b2c554943aaee43393021583d453d130e3cc43e30172fbfa37615c5a089';
  const requestUrl = 'https://gorest.co.in/public/v1/users/1628/posts';
  const [form, setForm] = useState({
    Title: '',
    Body: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const classes = useStyles();

  function SendCreateOrUpdateRequest(e, action) {
    e.preventDefault();
    let url = requestUrl + '?title=' + form.Title + '&body=' + form.Body;
    let requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + token
      }
    };

    if (action === 'Update') {
      requestOptions.method = 'PUT';
    }
    if (action === 'Create') {
      requestOptions.method = 'POST';
    }
    fetch(url, requestOptions)
      .then(
        response => {
          if (response.status !== 201) {
            alert("Fail to perform a create request");  
          }
          if (response.status === 201) {
            alert("Create the post successfully");
            props.history.goBack();
          }
        },
        (error) => {
            console.log(error);
        }
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {props.location.state} Post
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="standard-basic" label="Title" name="Title" onChange={handleChange} />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="standard-basic" label="Body" name="Body" onChange={handleChange} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={e => SendCreateOrUpdateRequest(e, props.location.state)}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}