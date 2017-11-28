var express = require('express')
var mysql = require('mysql')

var app = express()

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "test"
})
app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'pug')

app.get('/Delete/:id',(req,res)=>{
    var sql = "DELETE FROM user Where id='"+req.params.id+"'"
    con.query(sql,(err,result)=>{
        res.redirect('/')
    })
})

app.get('/Update/:id',(req,res)=>{
    var sql = "SELECT * FROM user Where id='"+req.params.id+"'"
    con.query(sql,(err,result)=>{
        res.render('update',{title:"UPDATE",data:result})
    })
})

app.post('/Update/:id',(req,res)=>{
    var input = JSON.parse(JSON.stringify(req.body))
    var data= {
        name:input.name,
        country:input.country
    }
    var sql = "UPDATE user SET name='"+data.name+"',country='"+data.country+"' WHERE id='"+req.params.id+"'"
    con.query(sql,(err,result)=>{
        if(err){
            console.log('error',err)
        }
        res.redirect('/')
    })
})

app.get('/Create',(req,res)=>{
    res.render('create',{title:"CREATE"})
})

app.post('/Create/add',(req,res)=>{
    var input = JSON.parse(JSON.stringify(req.body))
    var data= {
        name:input.name,
        country:input.country
    }
    var sql = "INSERT INTO user (name,country) value('"+data.name+"','"+data.country+"')"
    con.query(sql,(err,result)=>{
        if(err){
            console.log('error',err)
        }
        res.redirect('/')
    })
})

app.get('/',(req,res)=>{
    var sql = "SELECT * FROM user"
    con.query(sql,(err,result)=>{
        res.render('read',{title:"READ",data:result})
    })
})

app.listen(3000,()=>{

})