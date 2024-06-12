const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    fs.readdir(`./files`, function(err, files) {
        res.render('index', { files: files });
    });
});

app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
      res.render('show' , {filename : req.params.filename ,filedata:filedata})
    });
});

app.get('/edit/:filename', (req, res) => {
        res.render('edit',{filename:req.params.filename});   
})

app.get('/delete/:filename', (req, res) => {
    res.render('delete',{filename:req.params.filename});   
})

app.post('/delete', (req, res) => {
    fs.unlink(`./files/${req.body.filename}`, function(err) {
        
        res.redirect('/');
    });
});


 


app.post('/edit', (req, res) => {
       fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/")
       }) 
    })




app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.Title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect('/');
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})