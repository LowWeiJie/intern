import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginTop: 10,
        marginBottom: 20
    },
    media: {
        height: 140,
    },
    form: {
        maxWidth: 180,
        height: 50,
        marginRight: 10,
    },
    button: {
        maxWidth: 100,
        height: 40,
        top: 10,
    },
});

export default function Home(props) {
    const token = '5d6c0b2c554943aaee43393021583d453d130e3cc43e30172fbfa37615c5a089';
    const [posts, setPosts] = useState(null);
    const [form, setForm] = useState({
        page: '',
        filter: ''
    });
    const requestUrl = 'https://gorest.co.in/public/v1/posts';
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    const classes = useStyles();

    function SendRequest(e) {
        e.preventDefault();
        let url = requestUrl;

        if (form.page > 0) {
            url = url + '?page=' + form.page;
        }
        if (form.filter !== '') {
            url = url + '?' + form.filter;
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, requestOptions)
            .then(
                response => {
                    if (response.status !== 200) {
                        alert("Error when sending the API request");
                    }
                    return response;
                }
            )
            .then(response => response.json())
            .then(
                response => {
                    setPosts(response.data);
                }
            );
    }



    function SendDeleteRequest(e, post) {
        e.preventDefault();
        let url = requestUrl + '/' + post.id;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer ' + token }
        };
        fetch(url, requestOptions)
            .then(
                response => {
                    if (response.status !== 204) {
                        alert("Fail to perform a delete request");
                    }
                    if (response.status === 204) {
                        alert("Delete the post successfully");
                        window.location.reload(false);
                    }
                }
            );
    }
    function GoToForm(action) {
        props.history.push({
            pathname: '/Form',
            state: action,
        });
    }

    function GetAllPost() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(requestUrl, requestOptions)
            .then(
                response => {
                    if (response.status !== 200) {
                        alert("Error when sending the API request");
                    }
                    return response;
                }
            )
            .then(response => response.json())
            .then(
                response => {
                    setPosts(response.data);
                }
            );
    }
    useEffect(() => { GetAllPost() }, [])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                Posts
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField className={classes.form} id="standard-basic" label="Filters" name="filter" onChange={handleChange} />
                <TextField className={classes.form} id="standard-basic" label="Page" name="page" onChange={handleChange} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={e => SendRequest(e)}
                >
                    Filter
                </Button>
            </form>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={e => GoToForm('Create')}
            >
                Create New Post
            </Button>
            <div>
                {posts &&
                    posts.map((post, index) => {
                        return (
                            <div key={index}>
                                <Grid item>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2" align='justify'>
                                                    {post.title}
                                                </Typography>
                                                <Typography variant="body1" color="textPrimary" component="p">
                                                    Posted By user {post.user_id}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                                                    {post.body}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={e => GoToForm('Update')}>
                                                Update
                                            </Button>
                                            <Button size="small" color="primary" onClick={e => SendDeleteRequest(e, post)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </div>
                        );
                    })}
            </div>
        </Container>
    );
}