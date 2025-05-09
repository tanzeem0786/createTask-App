const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        // if(err) throw err;
        res.render('index', { files: files })
    })
})
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        if(err) throw err;
        res.render('show', { filename: req.params.filename, filedata: filedata })
    })
})
app.get('/edit/:filename', (req, res) => {
        res.render('edit', { filename: req.params.filename })
})
app.get('/delete/:filename', (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        if(err) throw err;        
        res.redirect('/')
    })
})
app.post('/edit', (req, res) => {
       fs.rename(`./files/${req.body.previous}`, `./files/${req.body.newname.split(' ').join('')}.txt`, (err) => {
        if(err) throw err;
        res.redirect('/');
       })
})
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detail, (err) => {
        if(err) throw err;
        res.redirect('/')
    })
})
app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
})


