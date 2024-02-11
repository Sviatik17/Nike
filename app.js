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
app.get('/getorders',(req,res)=>{
    let fileData=fs.readFileSync('orders.txt','utf-8');
    res.send(JSON.stringify(fileData.split
        ('order:')));
    console.log(fileData.split('order:'))
})
app.post('/save-order', (req, res) => {
    const data = req.body;
    res.sendStatus(200);
    fs.appendFileSync('orders.txt',`order:${JSON.stringify(data)}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('good')
        }
        
    })
})



app.listen(PORT, () => {
    console.log(`Server work on PORT: ${PORT}`)
})

