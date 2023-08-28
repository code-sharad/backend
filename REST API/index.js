const express = require('express');
const path = require('path');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


const app = express();

app.use(express.urlencoded({ extended: true })); /// to understand the all api for express

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname + '/public')));


let posts = [
    {
        id: uuidv4(),
        username: 'nikhil',
        content: 'I love coding 💖'
    },
    {
        id: uuidv4(),
        username: 'sharad',
        content: 'hard work is important for success'
    }, {
        id: uuidv4(),
        username: 'sanket',
        content: 'I love coding 💖'
    }
];

app.get('/posts', (req, res) => {
    res.render('index', { posts: posts })
})


app.get('/posts/new', (req, res) => {
    res.render('new');
})

app.get('/posts/:id', (req, res) => {
    try {
        let post = posts.find((p) => p.id === req.params.id);
        res.render('post', { post: post })
    } catch (err) {
        res.render('err', { error: err });
    }
})

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    posts.push({
        id: uuidv4(),
        username,
        content
    });
    res.redirect('/posts') // this is get request to posts route
    // console.log(posts);
})

app.patch('/posts/:id',(req,res) => {
    let id = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((post) => post.id === id);
    post.content = newContent;
    // res.send('update')
    res.redirect('/posts')
})



app.get('/posts/:id/edit',(req,res) => {
    let editpost = posts.find((post) => post.id === req.params.id);
    res.render('editpost',{post:editpost})
})

app.delete('/posts/:id',(req,res) => {
    const id = req.params.id;
    posts = posts.filter((p) => p.id !== id);
    res.redirect('/posts')
})

app.listen(3000, () => {
    console.log('running of 3000 port');
})