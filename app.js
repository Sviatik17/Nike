const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs =require('fs');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','admin','index.html'))
});

app.get('/getorders',(req,res)=>{
    let content=JSON.parse(fs.readFileSync('orders.txt','utf-8'));
    res.json(content);
})


app.post('/save-order', (req, res) => {
    const data = req.body;
    res.sendStatus(200);
    let content=JSON.parse(fs.readFileSync('orders.txt','utf-8'));
  
    content.push({
        list:data.list,
        name:data.name,
        phone:data.phone
    });

    fs.writeFile('orders.txt',JSON.stringify(content),(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`Замовлення збережено`)
        }
    })


 
})



app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`)
})

