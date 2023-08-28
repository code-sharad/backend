
// express 4 basic usuage are
// 1. List
// 2. parse
// 3. Route
// 4. give Response to suitable request




const express = require('express');
const path = require('path');

const app = express();

app.set("view engine","ejs")
app.set('views',path.join(__dirname,'/views'));

const port = 3000;

// app.get('/',(res,req) => {
//     res.
// })


// app.use is listning for every  request on every route and send response
// app.use((req,res) => {
//     // res.send({
//     //     name:"apple",
//     //     color:"red"
//     // })
//     res.send('<p>Hi hello</p>')
// })


// app.get is listning to particular route for request
app.get('/',(req,res) => {
    // res.send('home')
    res.render('index.ejs');

})

app.get('/:username/:id',(req,res) => {
    const {username,id} = req.params;
    res.send(`<h1>Username is ${username} and ID id ${id}</h1>`)
})

app.get('*',(req,res) => {
    res.send('does not exit')
    res.status(404);
})

app.listen(port,(port) => {
    console.log(`app listing on port ${port}`);
})


